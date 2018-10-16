import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import { switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<User>;

  constructor(public af: AngularFireAuth, private db: AngularFirestore) {

    this.user = this.af.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )

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

  getCurrentUserUid() {
    console.warn(this.af.auth.currentUser.uid);
    // return this.af.auth.currentUser.uid;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {

        this.updateUserData(res.user).then( () => resolve(res), err1 => reject(err1));


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

          if (res.additionalUserInfo.isNewUser) {
            this.updateUserData(res.user).then( () => resolve(res), err1 => reject(err1));
          } else {
            resolve(res);
          }

        }, err2 => reject(err2))
    })
  }

  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true })

  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.af.auth.signOut();
        resolve();
      }
      else {
        reject();
      }
    });
  }
}
