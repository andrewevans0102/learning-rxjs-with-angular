// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  traditionalEndpoint: 'https://us-central1-learning-rxjs-with-angular.cloudfunctions.net/app/traditional',
  reactiveEndpoint: 'https://us-central1-learning-rxjs-with-angular.cloudfunctions.net/app/reactive',
  manualEntries: 'https://raw.githubusercontent.com/andrewevans0102/learning-rxjs-with-angular/master/src/app/posts.json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
