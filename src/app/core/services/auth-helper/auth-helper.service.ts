import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {FirebaseAuthState} from 'angularfire2';

import {AuthService} from '../../../auth/auth.service';

@Injectable()
export class AuthHelperService {

    constructor(private authService: AuthService) { }

    isLoggedIn(): Observable<boolean> {
        return this.authService
            .firebaseAuth
            .map((authenticated: FirebaseAuthState) => {return !!authenticated});
    }

}