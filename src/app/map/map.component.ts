import {Component, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {FirebaseListObservable} from 'angularfire2';

import {ObstacleDialog} from './obstacle-dialog/obstacle-dialog.component';

import {ObstacleService} from '../core/services/obstacle/obstacle.service';
import {MapService} from '../core/services/map/map.service';


@Component({
    selector: 'saferoad-map',
    templateUrl: './map.component.html'
})
export class MapComponent implements OnInit, OnDestroy {
    items: FirebaseListObservable<any[]>;
    dialogRef: MdDialogRef<ObstacleDialog>;


    constructor(
        private obstacleService: ObstacleService,
        private mapService: MapService,
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef
    ){
        this.items = obstacleService.list();
    }


    ngOnInit(): void {
        this.mapService.initMap({
            'click': (map) => {map.on('click', (e) => {
                    let markerSelected: ol.Feature ;
                    this.mapService.clickedCoordinate = e.coordinate;

                    map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                        if(layer instanceof ol.layer.Vector){
                            markerSelected = feature
                        }
                        return feature;
                    });

                    if(markerSelected) {
                        this.obstacleService.currentItem = markerSelected.get('item');
                    }

                    this.obstacleService.obstacleDialogType = markerSelected ? 'show' : 'edit';
                    this.openDialog();
                }
            )}
        });
    }

    ngOnDestroy(): void {
        //need to re-build map after each view reload
        this.mapService.destroyMap();
    }

    openDialog() {
        let config = new MdDialogConfig();

        config.viewContainerRef = this.viewContainerRef;

        this.dialogRef = this.dialog.open(ObstacleDialog, config);
    }

}