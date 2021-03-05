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

// Imports For RxJs
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // User Observable
  user$: Observable<User>;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router, // Inject Router
  ) {

    // Getting Authenticated User Data
    this.user$ = this.afAuth.authState.pipe(

      switchMap(user => {

        // User is Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }

        // User is Logged out
        else {
          return of(null);
        }

      })
    );
  }

  // Create User Method
  createUser(createAccountForm): any{

    // Destructuring Form Values
    const {email, password, displayName} = createAccountForm;

    // Call the firebase createUserWithEmailAndPassword method
    return this.afAuth.createUserWithEmailAndPassword(
      email,
      password).then(result => {

      // Sends Verification Email
      this.sendVerificationMail();

      // Set the User Data
      this.setUserData(result.user);

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
  logIn(loginForm): any{

    // Destructuring Form Values
    const {email , password } = loginForm;

    // Calling the firebase signInWithEmailAndPassword method
    return this.afAuth.signInWithEmailAndPassword(
      email,
      password).then(result => {

      // Then
      // Log the result to the console
      console.log(result);

      // Setting User Data
      this.setUserData(result.user);

      // Navigating Home
      this.router.navigate(['dashboard']);

    })
      .catch(error => {
        window.alert(error);
      });
  }

  // Log Out Method
  logOut(): any{

    // Sign out
    return this.afAuth.signOut().then(() => {

      // Then
      // Navigating to Home
      this.router.navigate(['home']);

      // Reload Page
      window.location.reload();

    });
  }

  // Send Email Verification For New Account
  sendVerificationMail(): any {

    this.afAuth.currentUser.then((user) => {

      // Calling the firebase sendEmailVerification method
      return user.sendEmailVerification();

    }).then(() => {

      // Then
      // Navigate To verify-email-address Component
      this.router.navigate(['verify-email-address']);

    });
  }

  // Reset Password
  resetPassword(resetPasswordForm): any{

    // Destructuring Form Values
    const {email} = resetPasswordForm;

    // Calling the firebase sendEmailVerification method
    return this.afAuth.sendPasswordResetEmail(email)

      .then(() => {

        // Then
        // Alert User
        window.alert('Password reset email sent, check your inbox.');

        // Navigate Home
        this.router.navigate(['home']);

      }).catch((error) => {
        window.alert(error);
      });
  }

  // Setting User Data
  setUserData(user): any {

    // Getting User Reference from Firestore
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    //  userData
    const userData = {
      userID: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      userPermissions: {
        baseUser: true
      }
    };

    // Merging with Firestore collection
    return userRef.set(userData, {
      merge: true
    });
  }

  // Saving message to firestore
  saveMessage(userMessage, name, id): any {

    // Creating an ID and getting firestore Reference
    const messageRef: AngularFirestoreDocument<any> = this.afs.doc(`messages/${this.afs.createId()}`);

    // Creating our message data const
    const messageData = {

      // Message Data
      date: new Date(),
      message: userMessage,

      // User Info For Posted Message
      userInfo: {
        userID: id,
        displayName: name
      }

    };

    // Storing to firestore
    return messageRef.set(messageData, {
      merge: true
    });
  }

  // Updates Display Name in Firestore
  updateDisplayName(newDisplayName): void {

    // Getting Current User
    const user = firebase.auth().currentUser;

    // Firebase updateProfile MEthod
    user.updateProfile({

      displayName: newDisplayName

    }).then(() => {

      // Then
      // Log Result
      console.log('Name updated!');

      // Reload User
      firebase.auth().currentUser.reload();

    }).catch((error) => {
      window.alert('FAILED!');
    });

    // Update Firestore User Information
    this.afs.doc(`users/${user.uid}`).update({
      displayName : newDisplayName
    });
  }

  // Updates Display Name in Firestore
  updateInformation(newDisplayName, newPhotoURL): any {

    // Getting Current User
    const user = firebase.auth().currentUser;

    // Firebase updateProfile Method
    user.updateProfile({

      displayName: newDisplayName,
      photoURL: newPhotoURL

    }).then(() => {

      // Then
      // Log Result
      window.alert('Information Updated Successfully');

      // Reload User
      firebase.auth().currentUser.reload();

    }).catch((error) => {
      window.alert('FAILED!');
    });

    // Update Firestore User Information
    this.afs.doc(`users/${user.uid}`).update({
      displayName : newDisplayName,
      photoURL: newPhotoURL
    });
  }

}
