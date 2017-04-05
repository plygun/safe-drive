import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {EmailPasswordCredentials} from 'angularfire2/auth/auth_backend';

import {AuthService} from '../auth.service';
import {MapService} from '../../core/services/map/map.service';
import {CommonService} from '../../core/services/common/common.service';

@Component({
    selector: 'saferoad-auth-sign-in',
    templateUrl: './auth-sign-in.component.html',
    styleUrls: ['./auth-sign-in.component.scss']
})
export class AuthSignInComponent {

    signInForm: FormGroup;
    email: FormControl;
    password: FormControl;
    signInErrorMessage: string;

    constructor(private authService: AuthService,
                private commonService: CommonService,
                private router: Router,
                private builder: FormBuilder) {
        this.email = new FormControl('', [
            Validators.required
        ]);
        this.password = new FormControl('', [
            Validators.required
        ]);
        this.signInForm = builder.group({
            email: this.email,
            password: this.password
        });
    }

    signIn(): void {
        this.commonService.showLoading();

        this.authService
            .login(<EmailPasswordCredentials>this.signInForm.value)
            .then(
                () => this.router.navigate([this.authService.redirectUrl]),
                err => this.signInErrorMessage = err.message
            )
            .then(() => this.commonService.hideLoading());
    }

}