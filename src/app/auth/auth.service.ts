import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {FirebaseAuth, AngularFireAuth, AngularFire, FirebaseAuthState, AuthProviders} from 'angularfire2';
import {EmailPasswordCredentials, AuthConfiguration} from 'angularfire2/auth/auth_backend';


@Injectable()
export class AuthService {
    private _redirectUrl: string;

    constructor(public firebaseAuth: FirebaseAuth) { }

    createUser(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
        return this.firebaseAuth.createUser(credentials);
    }

    login(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
        return this.firebaseAuth.login(credentials);
    }

    logout(): void {
        this.firebaseAuth.logout();
    }

    // class accessors
    get redirectUrl(): string {
        return this._redirectUrl ? this._redirectUrl : '/';
    }

    set redirectUrl(redirectUrl: string) {
        this._redirectUrl = redirectUrl;
    }
}