import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import {AuthService} from "../auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../environments/environment";
import {IUser} from "../../types/IUser";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  user: IUser;

  constructor(public db: AngularFirestore, public authService: AuthService, private af: AngularFireAuth) {

    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.authService.user.subscribe((res: IUser) => {
      this.user = res;
    });

  }

  saveUserLocation(position) {

    if (this.user && position) {
      const locationData = new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
      this.db.doc(`users/${this.user.uid}`).update({location: locationData}).then(res => {
        return true
      }, err => console.warn(err))
    }
  }


  getMarkers(): any {
    return this.db.collection('users').snapshotChanges();
  }


}
