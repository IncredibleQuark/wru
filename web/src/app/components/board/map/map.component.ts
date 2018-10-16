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
  public markers: Marker[] = [];
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  private i;

items;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(public db: AngularFirestore, private locationService: LocationService) {

      this.items = db.collection('users').valueChanges();
      // console.warn(db);
    this.i = db.collection('users').ref.doc('fNbnw3atEoRkDVPlOLkH').get().then( (res) => {
      // console.warn(res.data());
    });
  // console.warn();

    }

  ngOnInit() {
    this.initUserLocation();
  }

  test() {
    // this.db.list('/items').push({ content: 'dfg' });
  }

  initUserLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        // console.warn(position);
        this.showUserPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showUserPosition(position) {

    this.location.lat = position.coords.latitude;
    this.location.lng = position.coords.longitude;
    this.userMarker = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      draggable: false
    };

    this.locationService.saveUserLocation(position);

  }


  addOtherUsers(position) {
    this.markers.push({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      draggable: false
    })
  }

}
