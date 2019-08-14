# learning-rxjs-with-angular

[StackBlitz ⚡️](https://stackblitz.com/edit/learning-rxjs-with-angular)

This project showcases a very simple usecase for RxJS in an Angular application.

This project shows both an `imperative` and a `declarative` method to retrieve a set of RSS feeds.
- `imperative` = defined by traditional promise/fetch methods
- `declarative` = relying on RxJS streams to handle the fetch and retrieval logic in a reactive way

In both cases, the application attempts to aggregate the different RSS feeds into one uniform array.

The application makes use of the RxJS operators, for more [read the RxJS documentation here](https://rxjs.dev/).

## the server
- The folder `functions` has a very basic [ExpressJS](https://expressjs.com/) API that is deployed on Firebase
- The API has endpoints (and helper functions) that the Angular application uses to make HTTP requests to the RSS feeds
- The HTTP requests make use of the [npm module rss-parser](https://www.npmjs.com/package/rss-parser) to parse the RSS feeds and return back the post information as an array

## the client
- The `traditional` component retrieves the values with the traditional promise/fetch (`imperative`) approach
- The `reactive` component retrieves the post values with the RxJS stream (`declarative`) approach
- Styling is done with [Angular Material](https://material.angular.io/)
- Start the client with a standard `ng serve` at the project root