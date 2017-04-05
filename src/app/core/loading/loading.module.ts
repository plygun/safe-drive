import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {LoadingComponent} from './loading.component.ts';

@NgModule({
    imports: [SharedModule],
    declarations: [LoadingComponent],
    exports: [LoadingComponent]
})
export class LoadingModule { }