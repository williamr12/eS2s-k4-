// AuthService is handling authentication and storing our data in firestore as of now

// Imports
import { Injectable, NgZone } from '@angular/core';

// Import User
import { User } from '../services/user';

// Firebase Imports
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// Import Router
import { Router } from '@angular/router';

// Import RxJs
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userData: any; // Save logged in user data
  private isAuthenticated = false;
  authChange = new Subject<boolean>();
  private user: User;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {

      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }

    });
  }


  // This method is for registering a user
  registerUser(email, password, displayName): void{

    // Call the firebase createUserWithEmailAndPassword method
    this.afAuth.createUserWithEmailAndPassword(
      email,
      password).then(result => {

      // Sends Verification Email
      this.SendVerificationMail();

      // Set the User Data
      this.SetUserData(result.user);

      // Updating Display Name with Input
      this.updateDisplayName(displayName);

      // Logs Success Message
      window.alert(result);

    })
      .catch(error => {

        // Logs Error Message
        window.alert(error);

      });
  }

  // Login Method
  login(email, password): void{

    // Calling the firebase signInWithEmailAndPassword method
    this.afAuth.signInWithEmailAndPassword(
      email,
      password).then(result => {

      // then
      // Log the result to the console
      console.log(result);

      // Setting User Data
      this.SetUserData(result.user);

      // Setting authChange to true when logged in
      this.authChange.next(true);

      // Navigating Home
      this.router.navigate(['home']);

    })
      .catch(error => {
        window.alert(error);
      });

  }

  // Logout Method
  logout(): void{

    this.user = null;
    // Setting authChange to false when logged out
    this.authChange.next(true);

  }

  // Get User Method
  getUser(): User{
    return {...this.userData};
  }

  // isAuth Method
  isAuth(): boolean{
    return this.user != null;
  }

  // Reloads Page
  reloadPage(): void{
    window.location.reload();
  }

  // Send email verification when new user sign up
  SendVerificationMail(): any {
    return this.afAuth.currentUser.then((user) => {
      return user.sendEmailVerification();
    }).then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  // Reset Password
  ForgotPassword(userEmail): any{
    return this.afAuth.sendPasswordResetEmail(userEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Auth logic to run auth providers
  // tslint:disable-next-line:typedef
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // tslint:disable-next-line:typedef
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      userID: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Saving message to firestore
  // tslint:disable-next-line:typedef
  saveMessage(userMessage) {
    const messageRef: AngularFirestoreDocument<any> = this.afs.doc(`messages/${this.afs.createId()}`);
    const messageData = {
      date: new Date(),
      message: userMessage,
      displayName: this.userData.displayName,
    };
    return messageRef.set(messageData, {
      merge: true
    });

  }

  // Updates Display Name in Firestore
  updateDisplayName(newDisplayName): void {

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: newDisplayName
    }).then(() => {
      window.alert('Name updated!');
      firebase.auth().currentUser.reload();
    }).catch((error) => {
      window.alert('FAILED!');
    });

  }

  // Sign out
  // tslint:disable-next-line:typedef
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
      this.reloadPage();
    });
  }

}
