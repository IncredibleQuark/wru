import {Component, OnInit, ViewChild} from '@angular/core';
import { AgmMap } from '@agm/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {LocationService} from '../../../services/location/location.service';
import {AuthService} from '../../../services/auth/auth.service';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public location: any = {
    zoom: 18
  };

  public users: any;

items;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(public db: AngularFirestore, private locationService: LocationService, private authService: AuthService) {

    }

  ngOnInit() {
    this.initUserLocation();
    this.users = this.db.collection('users').valueChanges();

  }


  initUserLocation() {

    const geoOptions = {
      enableHighAccuracy: true
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.showUserPosition(position);
      }, (err) => {
        console.warn(err);
      }, geoOptions);
    } else {
      alert('Geolocation is not supported by this browser.');
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
