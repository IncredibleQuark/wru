import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";
import { tap, map, take } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  // canActivate(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.authService.isLoggedIn()
  //       .then(user => {
  //         return resolve(true);
  //       }, err => {
  //         this.router.navigate(['/auth']);
  //         return resolve(false);
  //       })
  //   })
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/login']);
        }
      })
    )
  }

}
