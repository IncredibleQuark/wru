import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import {AuthService} from "../auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(public db: AngularFirestore, public authService: AuthService, private af: AngularFireAuth) {

  }

  saveUserLocation(position) {

    this.authService.user.subscribe( (res) => {
      const locationData = new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
        this.db.doc(`users/${res.uid}`).update({location: locationData}).then(res => {
          return true
        }, err => console.warn(err))
      });
    }

}
