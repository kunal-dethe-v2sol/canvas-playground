import {Injectable, EventEmitter} from '@angular/core';

import {SharedAuthService} from './shared-auth.service';
import {SharedHttpService} from './shared-http.service';
import {SharedStorageService} from './shared-storage.service';
import {SharedToastrService} from './shared-toastr.service';
import {SharedCustomValidationService} from './../../shared/service/shared-custom-validation.service';

@Injectable()
export class SharedService {

    //Variables
    public loginEventEmitter: EventEmitter<boolean> = new EventEmitter();

    //Constructor parameters
    static get parameters() {
        return [
            SharedAuthService,
            SharedHttpService,
            SharedStorageService,
            SharedToastrService,
            SharedCustomValidationService
        ];
    }

    //Constructor
    constructor(
        private _authService,
        private _httpService,
        private _storageService,
        private _toastrService,
        private _customValidationService) {

        
    }

    //Custom Methods
    /**
     * Returns the Auth Service instance.
     */
    getAuthService() {
        return this._authService;
    }

    /**
     * Returns the Http Service instance.
     */
    getHttpService() {
        return this._httpService;
    }

    /**
     * Returns the Storage Service instance.
     */
    getStorageService() {
        return this._storageService;
    }
    
    /**
     * Returns the Toastr Service instance.
     */
    getToastrService() {
        return this._toastrService;
    }
    
    /**
     * Returns the Custom Validation Service instance.
     */
    getCustomValidationService() {
        return this._customValidationService;
    }
    
    /**
     * Returns the loggedInUserUserData
     */
    getLoggedInUserData() {
        return this.getAuthService().getLoggedInUserData();
    }
}