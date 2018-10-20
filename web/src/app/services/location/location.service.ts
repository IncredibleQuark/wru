import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import {AuthService} from "../auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../environments/environment";
import {FirebaseListObservable} from "@angular/fire/database-deprecated";

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(public db: AngularFirestore, public authService: AuthService, private af: AngularFireAuth) {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  saveUserLocation(position) {

    this.authService.user.subscribe( (res) => {
      const locationData = new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
        this.db.doc(`users/${res.uid}`).update({location: locationData}).then(res => {
          return true
        }, err => console.warn(err))
      });
    }

  // getMarkers(): any {
  //   return this.db.collection('/markers')
  // }
  //
  // createMarker(data: GeoJson) {
  //   return this.db.collection('/markers')
  //     .push(data)
  // }
  //
  // removeMarker($key: string) {
  //   return this.db.object('/markers/' + $key).remove()
  // }

}
