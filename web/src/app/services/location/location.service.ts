import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import {AuthService} from "../auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import { tap, map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public db: AngularFirestore, public authService: AuthService, private af: AngularFireAuth) { }

  saveUserLocation(position) {
this.authService.user.pipe(take(1), tap(uid => console.warn(uid)));
// this.authService.getCurrentUserUid();
    const locationData = new firebase.firestore.GeoPoint(10, 20);
    // this.db.doc(`users/${this.authService.getCurrentUserUid()}`).update({location: locationData})
  }
}
