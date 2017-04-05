import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MapComponent} from './map.component';
import {AuthUserGuard} from '../auth/guards/auth-user.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'map',
                component: MapComponent,
                canActivate: [AuthUserGuard]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MapRoutingModule { }