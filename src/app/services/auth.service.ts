import { Injectable } from '@angular/core';
import firebase from 'firebase/app';


@Injectable()
export class AuthService {

  private loggedInStatus = JSON.parse(
    localStorage.getItem('loggedIn') || 'false'
  );

  setLoginStatus(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get loginStatus() {
    return JSON.parse(
      localStorage.getItem('loggedIn') || this.loggedInStatus.toString()
    );
  }

  signUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInUser(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
  }
}
