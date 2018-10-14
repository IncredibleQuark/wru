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
          console.warn(user);

          return resolve(true);
        }, err => {
          this.router.navigate(['/auth']);
          return resolve(false);
        })
    })
  }
}
