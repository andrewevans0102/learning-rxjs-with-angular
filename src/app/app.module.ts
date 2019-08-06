import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TraditionalComponent } from './traditional/traditional.component';
import { ReactiveComponent } from './reactive/reactive.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, TraditionalComponent, ReactiveComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
