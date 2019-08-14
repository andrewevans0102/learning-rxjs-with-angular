const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
// app will run on port 3000 locally
const port = 3000;
const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
        item: [ 'creator', 'title', 'link', 'pubDate', 'content:encoded', 'content']
    }
});
const striptags = require('striptags');

// endpoint that retrieves the posts with the traditional fetch/promise method
app.get('/traditional', (req, res) => {
  (async () => {
      const output = [];
      // feed addresses to use in call to rss parser
      let feedInput = [
          {
            sourceURL: "https://medium.com/feed/@Andrew_Evans"
          },
          {
            sourceURL: "https://rhythmandbinary.com/feed"
          },
          {
            sourceURL: 'https://dev.to/feed/andrewevans0102'
          }
      ];
      const promises = [];
      feedInput.forEach((feed) => {
        promises.push(callRSS(feed, output));
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        res.status(500).send(error);
      }

      output.forEach((post) => {
        post.pubDate = formatDate(post.pubDate);

        if(post.sourceURL === 'https://blog.angularindepth.com/feed') {
          post.sourceURL = "Angular-In-Depth";
        } else if (post.sourceURL === 'https://itnext.io/feed') {
          post.sourceURL = 'ITNext';
        } else if (post.sourceURL === 'https://medium.com/feed/@Andrew_Evans') {
          post.sourceURL = 'Medium';
        } else if (post.sourceURL === 'https://rhythmandbinary.com/feed') {
          post.sourceURL = 'Rhythm and Binary';
        } else if (post.sourceURL === 'https://dev.to/feed/andrewevans0102') {
          post.sourceURL = 'DEV.TO';
        }
      });

      // send an HTTP 200 with the output array here
      res.status(200).send(output);

      // helper function for date formatting
      function formatDate(input) {
        const inputDate = new Date(input);
        return inputDate.toLocaleDateString('en-us') + ' at ' + inputDate.toLocaleTimeString('en-us');
      }

      // helper function that calls the rss-parser npm module
      async function callRSS(input, output) {
        const response = await parser.parseURL(input.sourceURL)
        response.items.forEach(item => {
            // when categories is undefined that is normally a comment or other type of post
            if(item.categories !== undefined || item.link.includes('dev.to')) {
              let snippet = '';
              if(item.link.includes('dev.to')) {
                  snippet = striptags(item['content']);
              } else {
                  snippet = striptags(item['content:encoded']);
              }

              if(snippet !== undefined) {
                  if(snippet.length > 200) {
                      snippet = snippet.substring(0, 200);
                  }
              }

              const outputItem = {
                  sourceURL: input.sourceURL,
                  creator: item.creator,
                  title: item.title,
                  link: item.link,
                  pubDate: item.pubDate,
                  contentSnippet: snippet,
                  categories: item.categories
              };
              output.push(outputItem);
            }
        });
      }
    })();
});

// endpoint that retrieves the posts as single HTTP requests
// these requests are aggreagated by the client with RxJS operators and Observables
app.get('/reactive/:source', (req, res) => {
  (async () => {
    try{
      const output = [];
      let sourceURL = '';
      if(req.params.source === 'medium') {
        sourceURL = 'https://medium.com/feed/@Andrew_Evans';
      } else if (req.params.source === 'wordpress'){
        sourceURL = 'https://rhythmandbinary.com/feed';
      } else if (req.params.source === 'devto'){
        sourceURL = 'https://dev.to/feed/andrewevans0102';
      }

      const feedOutput = await parser.parseURL(sourceURL)
      feedOutput.items.forEach(item => {
        // when categories is undefined that is normally a comment or other type of post
        if(item.categories !== undefined || item.link.includes('dev.to')) {
          let snippet = '';
          if(item.link.includes('dev.to')) {
              snippet = striptags(item['content']);
          } else {
              snippet = striptags(item['content:encoded']);
          }

          if(snippet !== undefined) {
              if(snippet.length > 200) {
                  snippet = snippet.substring(0, 200);
              }
          }

          const outputItem = {
              sourceURL: sourceURL,
              creator: item.creator,
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              contentSnippet: snippet,
              categories: item.categories
          };
          output.push(outputItem);
        }
      });

      res.status(200).send(output);
    } catch(error) {
      res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);