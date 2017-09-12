import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';

@Injectable()
export class SharedStorageService {
    
    //Variables

    //Constructor parameters
    static get parameters() {
        return [
            LocalStorageService,
            SessionStorageService
        ];
    }

    //Constructor
    constructor(
        private _localStorageService,
        private _sessionStorageService) {


    }

    //Custom Methods
    /**
     * Returns the LocalStorage instance.
     */
    getLocal() {
        return this._localStorageService;
    }

    /**
     * Returns the SessionStorage instance.
     */
    getSession() {
        return this._sessionStorageService;
    }
}