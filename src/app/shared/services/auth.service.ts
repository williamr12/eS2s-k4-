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
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Observables for Authentication
  user$: Observable<User>;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router, // Inject Router
  ) {

    // Authenticating User Data
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // User is Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          // User is Logged out
          return of(null);
        }
      })
    );

    this.afAuth.authState.subscribe(user => {
      if (user && user.uid) {
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    });

  }

  // This method is for registering a user
  registerUser(email, password, displayName): any{

    // Call the firebase createUserWithEmailAndPassword method
    return this.afAuth.createUserWithEmailAndPassword(
      email,
      password).then(result => {

      // Sends Verification Email
      this.SendVerificationMail();

      // Set the User Data
      this.SetUserData(result.user);

      // Updating Display Name with Input
      this.updateDisplayName(displayName);

      // Logs Success Message
      console.log(result);

    })
      .catch(error => {

        // Logs Error Message
        window.alert(error);

      });
  }

  // Login Method
  login(email, password): any{

    // Calling the firebase signInWithEmailAndPassword method
    return this.afAuth.signInWithEmailAndPassword(
      email,
      password).then(result => {

      // then
      // Log the result to the console
      console.log(result);

      // Setting User Data
      this.SetUserData(result.user);


      // Navigating Home
      this.router.navigate(['dashboard']);

    })
      .catch(error => {
        window.alert(error);
      });

  }

  // Logout Method
  logout(): any{

    // Sign out
    return this.afAuth.signOut().then(() => {

      // then
      // Removing user from local Storage
      localStorage.removeItem('user');

      // Navigating to Home
      this.router.navigate(['home']);

      // Reloading Page
      this.reloadPage();

    });

  }

  // Reloads Page
  reloadPage(): void{
    window.location.reload();
  }

  // Send email verification when new user sign up
  SendVerificationMail(): any {
    this.afAuth.currentUser.then((user) => {
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

  // Setting User Data
  SetUserData(user): any {

    // Getting User Reference from Firestore
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    //  Setting up userData constant
    const userData: User = {
      userID: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: {
        baseUser: true,
        adminUser: false
      }
    };

    // Merging with Firestore collection
    return userRef.set(userData, {
      merge: true
    });

  }

  // Saving message to firestore
  saveMessage(userMessage): any {

    // Creating an ID and getting firestore Reference
    const messageRef: AngularFirestoreDocument<any> = this.afs.doc(`messages/${this.afs.createId()}`);

    // Creating our message data const
    const messageData = {
      date: new Date(),
      message: userMessage,
      displayName: 'Test Name'
    };

    // Storing to firestore
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

    this.afs.doc(`users/${user.uid}`).update({
      displayName : newDisplayName
    });

  }

}
