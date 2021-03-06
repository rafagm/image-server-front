import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ImageComponent } from './image/image.component';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgwWowModule } from 'ngx-wow';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    NgwWowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
