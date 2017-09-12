import {Injectable} from '@angular/core';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class SharedToastrService {

    //Variables

    //Constructor parameters
    static get parameters() {
        return [
            ToasterService
        ];
    }

    //Constructor
    constructor(
        private _toastrService) {
        
        return this._toastrService;
    }
}