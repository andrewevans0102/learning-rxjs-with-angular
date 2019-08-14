import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, Subject } from 'rxjs';
import { map, takeUntil, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent {

  posts$: Observable<any>;
  output = [];
  unsubscribe: Subject<void> = new Subject();

  constructor(public http: HttpClient) { }

  load() {
    const medium = 
      this.http.get(environment.reactiveEndpoint + '/medium')
      .pipe(
        catchError(err => {
          throw 'error in source observable. Message: ' + err.message;
        })
      );

    const wordpress = 
      this.http.get(environment.reactiveEndpoint + '/wordpress')
      .pipe(
        catchError(err => {
          throw 'error in source observable. Message: ' + err.message;
        })
      );

    const devto = 
      this.http.get(environment.reactiveEndpoint + '/devto')
      .pipe(
        catchError(err => {
          throw 'error in source observable. Message: ' + err.message;
        })
      );

    const manualEntries = 
      this.http.get(environment.manualEntries)
      .pipe(
        catchError(err => {
          throw 'error in source observable. Message: ' + err.message;
        })
      );

    try {
      this.posts$ =
        merge(medium, wordpress, devto, manualEntries)
          .pipe(takeUntil(this.unsubscribe))
          .pipe(map((response: []) => {
            response.forEach((post: any) => {
              const inputDate = new Date(post.pubDate);
              post.pubDate = inputDate.toLocaleDateString('en-us') + ' at ' + inputDate.toLocaleTimeString('en-us');

              if (post.sourceURL === 'https://blog.angularindepth.com/feed') {
                post.sourceURL = 'Angular-In-Depth';
              } else if (post.sourceURL === 'https://itnext.io/feed') {
                post.sourceURL = 'ITNext';
              } else if (post.sourceURL === 'https://medium.com/feed/@Andrew_Evans') {
                post.sourceURL = 'Medium';
              } else if (post.sourceURL === 'https://rhythmandbinary.com/feed') {
                post.sourceURL = 'Rhythm and Binary';
              } else if (post.sourceURL === 'https://dev.to/feed/andrewevans0102') {
                post.sourceURL = 'DEV.TO';
              }

              this.output.push({
                ...post, 
                sortDate: inputDate.getTime()
              });
            });

            this.output.sort((a: any, b: any) => {
              return b.sortDate - a.sortDate;
            });

            return this.output;
          }));
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }

  clear() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.posts$ = null;
    this.output = [];
  }

  handleError(endpoint: string) {
    return 'error occured when calling ' + endpoint;
  }

}
