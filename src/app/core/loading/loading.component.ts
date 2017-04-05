import {Component} from '@angular/core';
import {CommonService} from '../../core/services/common/common.service';

@Component({
    selector: 'saferoad-loading-component',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    private show: boolean;

    constructor(private commonService: CommonService){
        this.show = commonService.isloading;
    }

}