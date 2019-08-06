import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent {

  posts$: Observable<any>;
  unsubscribe: Subject<void> = new Subject();

  constructor(public http: HttpClient) { }

  async load() {
    const medium = this.http.get(environment.reactiveEndpoint + '/medium');
    const wordpress = this.http.get(environment.reactiveEndpoint + '/wordpress');
    const devto = this.http.get(environment.reactiveEndpoint + '/devto');
    const manualEntries = this.http.get(environment.manualEntries);

    this.posts$ =
      merge(medium, wordpress, devto, manualEntries)
        .pipe(takeUntil(this.unsubscribe))
        .pipe(map((output: []) => {
          output.forEach((post: any) => {
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
          });

          output.sort((a: any, b: any) => {
          // https://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date
            const aDate = new Date(b.sortDate);
            const bDate = new Date(a.sortDate);
            return bDate.getMilliseconds() - aDate.getMilliseconds();
          });

          return output;
        }));
  }

  clear() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.posts$ = null;
  }

}
