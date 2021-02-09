import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule} from '@angular/google-maps';

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
import { NavbarBottomComponent } from './components/navbar-bottom/navbar-bottom.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { ProviderMapComponent } from './components/provider-map/provider-map.component';

// Firebase Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';

// Firebase Config Import
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavbarBottomComponent,
    NavbarTopComponent,
    ProviderMapComponent,
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        GoogleMapsModule
    ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
