import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Push } from "@ionic-native/push";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from "angularfire2";
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AddItemPage } from '../pages/add-item/add-item';
import { EditItemPage } from '../pages/edit-item/edit-item';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddItemPage,
    EditItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddItemPage,
    EditItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
