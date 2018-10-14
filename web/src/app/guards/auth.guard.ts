import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.isLoggedIn()
        .then(user => {
          this.router.navigate(['/user']);
          return resolve(false);
        }, err => {
          return resolve(true);
        })
    })
  }
}
