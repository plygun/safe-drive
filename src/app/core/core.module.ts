import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';

import {AuthModule} from '../auth/auth.module';
import {MapModule} from '../map/map.module';

import {NavbarComponent} from './navbar/navbar.component';

import {CommonService} from './services/common/common.service';
import {AuthHelperService} from './services/auth-helper/auth-helper.service';
import {FirebaseService} from './services/firebase/firebase.service';
import {ObstacleService} from './services/obstacle/obstacle.service';
import {MapService} from './services/map/map.service';

import {AppRoutingModule} from './app-routing.module';
import {LoadingModule} from './loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        AuthModule,
        MapModule,
        AppRoutingModule,
        LoadingModule
    ],
    declarations: [
        NavbarComponent
    ],
    exports: [
        RouterModule,
        MaterialModule,
        LoadingModule,
        NavbarComponent
    ],
    providers: [
        AuthHelperService,
        CommonService,
        FirebaseService,
        ObstacleService,
        MapService
    ]
})
export class CoreModule { }