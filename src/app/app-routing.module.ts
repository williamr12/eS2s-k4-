import { NgModule } from '@angular/core';

// Importing Router
import { Routes, RouterModule } from '@angular/router';

// Importing Components
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent} from './components/home/home.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
