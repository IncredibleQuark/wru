import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


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
}
