import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public af: AngularFireAuth, private db: AngularFirestore) {

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
          this.db.collection('users').add({name: 'asd'}).then( (r) => {
            resolve(res);
          }, err1 => reject(err1));

        }, err2 => {
          reject(err2);
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
          console.warn(res);
          if (res.additionalUserInfo.isNewUser) {
            this.db.collection('users').add({email: res.user.email}).then( (r) => {
              resolve(res);
            }, err1 => reject(err1));
          } else {
            resolve(res);
          }

        }, err2 => reject(err2))
    })
  }

}
