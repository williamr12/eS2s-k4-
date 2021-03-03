import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// App Routing
import {RouterModule} from '@angular/router';

// App Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProviderMapComponent } from './components/provider-map/provider-map.component';
import { MessageBoardComponent } from './components/message-board/message-board.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Forms
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// Firebase Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';

// Firebase Config Import
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';

// Google Maps
import { GoogleMapsModule} from '@angular/google-maps';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProviderMapComponent,
    MessageBoardComponent,
    NavbarComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
