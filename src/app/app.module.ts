import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ValidatorServiceProvider } from '../providers/validator-service/validator-service';

//INYECTAR ANGULAR FIRE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { FireDatabaseProvider } from '../providers/fire-database/fire-database';


import { Geolocation } from '@ionic-native/geolocation'
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { AlertMessagesProvider } from '../providers/alert-messages/alert-messages';

import { GoogleMaps } from '@ionic-native/google-maps';


export const firebaseConfig = {
  apiKey: "AIzaSyCLUwct6mFhFwyAkM4aGo-E7p9efkxx7Ho",
  authDomain: "accentureapp-a506d.firebaseapp.com",
  databaseURL: "https://accentureapp-a506d.firebaseio.com",
  projectId: "accentureapp-a506d",
  storageBucket: "accentureapp-a506d.appspot.com",
  messagingSenderId: "46920529051"
};

@NgModule({
  declarations: [
  MyApp,
  ],
  imports: [
  BrowserModule,
  IonicModule.forRoot(MyApp),
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ValidatorServiceProvider,
    AngularFireDatabase,
    FireDatabaseProvider,
    Geolocation,
    GeolocationProvider,
    AlertMessagesProvider,

    GoogleMaps
  ]
})
export class AppModule {}
