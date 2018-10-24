import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MapComponent} from './components/board/map/map.component';

import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AuthComponent} from './components/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AuthGuard} from "./guards/auth.guard";
import {AuthService} from "./services/auth/auth.service";
import {NotFoundComponent} from './components/common/not-found/not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import * as firebase from "firebase";
import { MainComponent } from './components/board/main/main.component';
import {LocationService} from "./services/location/location.service";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthGuard, AuthService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
