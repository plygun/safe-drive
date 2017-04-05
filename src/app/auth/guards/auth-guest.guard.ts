import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {FirebaseAuthState} from 'angularfire2';

import {AuthService} from '../auth.service';

@Injectable()
export class AuthGuestGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(){

        return this.authService
            .firebaseAuth
            .map((authenticated: FirebaseAuthState) => {

                if(!authenticated) {
                    return true;
                }

                this.router.navigate(['/']);

                return false;
            }).first();
    }

    canActivateChild(): Observable<boolean> {
        return this.canActivate();
    }
}