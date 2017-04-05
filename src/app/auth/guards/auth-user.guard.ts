import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {FirebaseAuthState} from 'angularfire2';

import {AuthService} from '../auth.service';

@Injectable()
export class AuthUserGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.authService
            .firebaseAuth
            .map((authenticated: FirebaseAuthState) => {

                if(authenticated){
                    return true;
                }

                this.authService.redirectUrl = state.url;
                this.router.navigate(['/auth/sign-in']);

                return false;
            }).first();
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }

}