import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AngularFireAuth, private readonly router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable((observer) => {
      this.auth.user
        .subscribe((user) => {
          console.log(user);

          if (user) {
            observer.next(true);
          } else {
            observer.next(this.router.createUrlTree([
              `/`
            ]));
          }
          observer.complete();
        }, (user) => {
          observer.next(this.router.createUrlTree([
            `/`
          ]));
          observer.complete();
        })
    });
  }
}
