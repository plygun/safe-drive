import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AuthComponent} from './auth.component';
import {AuthSignInComponent} from './auth-sign-in/auth-sign-in.component';
import {AuthSignUpComponent} from './auth-sign-up/auth-sign-up.component';
import {AuthGuestGuard} from './guards/auth-guest.guard';
import {AuthUserGuard} from './guards/auth-user.guard';
import {AuthLogoutComponent} from './auth-logout/auth-logout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'auth',
                component: AuthComponent,
                children: [
                    {
                        path: '',
                        canActivate: [AuthGuestGuard],
                        children: [
                            {
                                path: 'sign-in',
                                component: AuthSignInComponent,
                            },
                            {
                                path: 'sign-up',
                                component: AuthSignUpComponent
                            }
                        ]
                    },
                    {
                        path: 'logout',
                        canActivate: [AuthUserGuard],
                        component: AuthLogoutComponent
                    }

                ]
            }
        ])
    ],
    exports: [ RouterModule],
    providers: [
        AuthUserGuard,
        AuthGuestGuard
    ]
})
export class AuthRoutingModule { }