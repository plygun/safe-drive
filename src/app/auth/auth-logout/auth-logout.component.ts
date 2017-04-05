import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {AuthService} from '../auth.service';
import {CommonService} from '../../core/services/common/common.service';

@Component({
    selector: 'saferoad-auth-logout',
    template: ''
})
export class AuthLogoutComponent implements OnDestroy{

    private subscription: any;

    constructor(private authService: AuthService,
                private route: Router,
                private commonService: CommonService) {
        authService.logout();

        commonService.showLoading();

        this.subscription = authService
            .firebaseAuth
            .subscribe(state => {
                if(!state){
                    commonService.hideLoading();
                    route.navigate(['/']);
                }
            });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}