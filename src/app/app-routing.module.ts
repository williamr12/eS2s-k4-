// Handles page routing

// Imports
import { NgModule } from '@angular/core';

// Importing Router
import { Routes, RouterModule } from '@angular/router';

// Importing Components
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent} from './components/home/home.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {ProviderMapComponent} from './components/provider-map/provider-map.component';
import { MessageBoardComponent } from './compenents/message-board/message-board.component';

// Importing the AuthGuard
import { AuthGuard } from './shared/guard/auth.guard';


// Routes
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'verify-email-address', component: VerifyEmailComponent},
  { path: 'provider-map', component: ProviderMapComponent, canActivate: [AuthGuard] },
  { path: 'message-board', component: MessageBoardComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
