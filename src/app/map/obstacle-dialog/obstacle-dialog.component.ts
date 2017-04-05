import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';

import {ObstacleService} from '../../core/services/obstacle/obstacle.service';
import {MapService} from '../../core/services/map/map.service';
import {CommonService} from '../../core/services/common/common.service';
import {Obstacle} from '../../classes/obstacle.interface';


@Component({
    selector: 'obstacle-dialog',
    templateUrl: './obstacle-dialog.component.html',
    styleUrls: ['./obstacle-dialog.component.scss']
})
export class ObstacleDialog {

    private createObstacleForm: FormGroup;
    private name: FormControl;
    private description: FormControl;
    private images: FormControl;
    private type: string = 'show';
    private existingObstacle: Obstacle;

    constructor(
        public dialogRef: MdDialogRef<ObstacleDialog>,
        private obstacleService: ObstacleService,
        private mapService: MapService,
        private commonService: CommonService,
        private builder: FormBuilder
    ) {
        this.type = obstacleService.obstacleDialogType;
        this.existingObstacle = obstacleService.currentItem;

        //form builder
        this.name = new FormControl('', [
            Validators.required
        ]);
        this.description = new FormControl('', [
            Validators.required
        ]);
        this.images = new FormControl();
        this.createObstacleForm = builder.group({
            name: this.name,
            description: this.description,
            images: this.images
        });
    }

    createObstacle(): void {
        let data: Obstacle = {
            name: this.createObstacleForm.get('name').value,
            description: this.createObstacleForm.get('description').value,
            coordinates: this.mapService.clickedCoordinate,
            images: this.createObstacleForm.get('images').value
        };

        this.commonService.showLoading();
        this.obstacleService
            .createObstacle(data)
            .then(
                () => this.dialogClose(),
                err => this.commonService.notify(err)
            )
            .then(() => this.commonService.hideLoading());
    }

    deleteObstacle(key: string): void {
        this.commonService.showLoading();

        this.obstacleService
            .deleteObstacle(key)
        .then(
            () => this.dialogClose(),
            err => this.commonService.notify(err)
        )
        .then(() => this.commonService.hideLoading());
    }

    dialogClose(): void {
        this.dialogRef.close();
    }
}
