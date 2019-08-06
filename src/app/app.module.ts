import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TraditionalComponent } from './traditional/traditional.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      
    [ 
      BrowserModule, 
      FormsModule, 
      MaterialModule 
    ],
  declarations: 
    [ 
      AppComponent, 
      HelloComponent, 
      TraditionalComponent, 
      ReactiveComponent,
      HttpClientModule
    ],
  bootstrap:    
    [ 
      AppComponent 
    ]
})
export class AppModule { }
