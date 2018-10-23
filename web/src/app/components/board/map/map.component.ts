import {Component, OnInit, ViewChild} from '@angular/core';
import { AgmMap } from '@agm/core';
import {AngularFireAction, AngularFireDatabase} from "@angular/fire/database";
import {BehaviorSubject, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {LocationService} from "../../../services/location/location.service";

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface GMapLocation {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public location:any = {
    zoom: 18
  };

  public userMarker: Marker;
  public markers: any;

items;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(public db: AngularFirestore, private locationService: LocationService) {

    }

  ngOnInit() {
    this.initUserLocation();
    this.markers = this.db.collection('users').valueChanges();
  }


  initUserLocation() {

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000,
      maximumAge: 1000
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        console.warn('change');
        this.showUserPosition(position);
      }, (err) => {
        console.warn(err);
      }, geoOptions);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  showUserPosition(position) {

    this.location.lat = position.coords.latitude;
    this.location.lng = position.coords.longitude;

    this.locationService.saveUserLocation(position);

  }

  //
  // addOtherUsers(position) {
  //   this.markers.push({
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude,
  //     draggable: false
  //   })
  // }

}
