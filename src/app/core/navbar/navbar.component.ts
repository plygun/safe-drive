import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {AuthHelperService} from '../services/auth-helper/auth-helper.service';

@Component({
    selector: 'saferoad-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    private tabSelected: number = 0;

    constructor(private auth: AuthHelperService, private router: Router) {
    }


    tabChanged(data: any): void {
        console.log(data);
    }

}