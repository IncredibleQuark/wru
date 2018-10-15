import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public af: AngularFireAuth) {

  }


  isLoggedIn() {
    return new Promise<any>((resolve, reject) => {
      let user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          console.warn(res);
          // res.auth.updateProfile({
          //   displayName: <UserName>,
          //   photoURL: <UserPhotoURLString>
          // })
          resolve(res);
        }, err => {
          reject(err)
        })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.af.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }
}
