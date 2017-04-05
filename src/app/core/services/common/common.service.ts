import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {
    isloading: boolean;

    constructor() { }

    showLoading(){
        this.isloading = true;
    }

    hideLoading(){
        this.isloading = false;
    }

    notify(message: any, type: string = 'success'){
        console.log(message);
    }

}