import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-traditional',
  templateUrl: './traditional.component.html',
  styleUrls: ['./traditional.component.scss']
})
export class TraditionalComponent {

  posts = [];
  showSpinner: boolean;

  constructor(public http: HttpClient) {
    this.showSpinner = false;
  }

  async load() {
    // show spinner while fetching posts
    this.showSpinner = true;

    // retrieve the posts by calling the endpoint that uses promise.all for fetching
    // all of the rss feeds and waiting (synchronously) for them to complete
    this.posts = [];
    const response = await axios.get(environment.traditionalEndpoint);
    this.posts = response.data;

    // retrieve the manual entries
    const manualEntries: any
      = await axios.get(environment.manualEntries);
    manualEntries.data.forEach((entry: any) => {
      if (entry.contentSnippet.length > 200) {
        entry.contentSnippet = entry.contentSnippet.substring(0, 200);
      }
      this.posts.push(entry);
    });

    // sort by date here
    this.posts.sort((a: any, b: any) => {
      // https://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date
        const aDate = new Date(b.sortDate);
        const bDate = new Date(a.sortDate);
        return bDate.getMilliseconds() - aDate.getMilliseconds();
      });

    // stop showing spinner when fetch completes
    this.showSpinner = false;
  }

  clear() {
    this.posts = [];
    this.showSpinner = false;
  }

}
