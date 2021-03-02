// AuthGuard restricts access to users who are not signed in

// Imports
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// AuthService Import
import { AuthService } from '../../shared/services/auth.service';

// Observable import
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.userLoggedIn$) {
      this.router.navigate(['sign-in']);
    }
    return true;
  }
}
