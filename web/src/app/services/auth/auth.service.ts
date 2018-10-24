import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import { switchMap} from 'rxjs/operators';
import {IUser} from '../../types/IUser';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<IUser>;

  constructor(public af: AngularFireAuth, private db: AngularFirestore) {

    this.user = this.af.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }


  isLoggedIn() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getCurrentUserUid() {
    return this.af.auth.currentUser.uid;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {

        this.updateUserData(res.user).then( () => resolve(res), err1 => reject(err1));


        }, err2 => {
          reject(err2);
        });
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
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

        }, err2 => reject(err2));
    });
  }

  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || 'https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103596_960_720.png'
    };

    return userRef.set(data, { merge: true });

  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.af.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
