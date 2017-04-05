import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';

import {SharedModule} from '../shared/shared.module';

import {AuthRoutingModule} from './auth-routing.module';

import {AuthComponent} from './auth.component';
import {AuthSignInComponent} from './auth-sign-in/auth-sign-in.component';
import {AuthSignUpComponent} from './auth-sign-up/auth-sign-up.component';
import {AuthLogoutComponent} from './auth-logout/auth-logout.component';

import {AuthService} from './auth.service';

import {firebaseConfig} from '../config/firebase.config';
import {firebaseAuthConfig} from '../config/firebase-auth.config';


@NgModule({
    imports: [
        SharedModule,
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent,
        AuthSignInComponent,
        AuthSignUpComponent,
        AuthLogoutComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }