import { Injectable } from '@angular/core';

import {AngularFireAuthModule} from "@angular/fire/auth";
import * as firebase from 'firebase/app';


import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public af: AngularFireAuthModule) {console.warn(firebase) }


  isLoggedIn() {
    return new Promise<any>((resolve, reject) => {
      let user = firebase.auth().onAuthStateChanged((user) =>{
        if (user) {
          // console.warn(user);
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }
}
