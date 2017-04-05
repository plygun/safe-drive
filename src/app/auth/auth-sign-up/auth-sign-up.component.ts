import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {EmailPasswordCredentials} from 'angularfire2/auth/auth_backend';

import {AuthService} from '../auth.service';
import {MapService} from '../../core/services/map/map.service';
import {CommonService} from '../../core/services/common/common.service';

@Component({
    selector: 'saferoad-auth-sign-up',
    templateUrl: './auth-sign-up.component.html',
    styleUrls: ['./auth-sign-up.component.scss']
})
export class AuthSignUpComponent {

    signUpForm: FormGroup;
    email: FormControl;
    password: FormControl;
    passwordCheck: FormControl;
    signUpErrorMessage: string;

    constructor(private authService: AuthService,
                private commonService: CommonService,
                private router: Router,
                private builder: FormBuilder) {
        this.email = new FormControl('', [
            Validators.required,
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
        ]);
        this.passwordCheck = new FormControl('', [
            Validators.required
        ]);

        this.signUpForm = builder.group({
            email: this.email,
            password: this.password,
            passwordCheck: this.passwordCheck
        }, {validator: this.passwordMatchValidator});
    }

    signUp(): void{
        let credentials: EmailPasswordCredentials = {
            email: this.signUpForm.get('email').value,
            password: this.signUpForm.get('password').value
        };

        this.commonService.showLoading();

        this.authService
            .createUser(<EmailPasswordCredentials>credentials)
            .then(
                () => this.router.navigate([this.authService.redirectUrl]),
                err => this.signUpErrorMessage = err.message
            )
            .then(() => this.commonService.hideLoading());
    }

    // Custom validator to check passwords match
    private passwordMatchValidator(group: FormGroup) {
        return group.get('password').value === group.get('passwordCheck').value ? null : {'passwordsMismatch': true}
    }

}