import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { SharedLibModule } from './shared-folder/shared-lib/shared-lib.module';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedLibModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
