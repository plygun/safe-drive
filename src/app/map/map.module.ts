import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import {MapComponent} from './map.component';

import {ObstacleDialog} from './obstacle-dialog/obstacle-dialog.component';

import {MapRoutingModule} from './map-routing.module';


@NgModule({
    imports: [
        SharedModule,
        MapRoutingModule
    ],
    declarations: [
        MapComponent,
        ObstacleDialog
    ],
    exports: [MapComponent],
    entryComponents: [ObstacleDialog]
})
export class MapModule { }