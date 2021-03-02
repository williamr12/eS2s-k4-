// AuthGuard restricts access to users who are not signed in

// Imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// AuthService Import
import { AuthService } from '../../shared/services/auth.service';

// Observable import
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(): any{
    return this.authService.user$.pipe(map(user => {
      if (user) {return true;
      }else{
        this.router.navigate(['/sign-in']);
        return false;
      }
    }));
  }

}
