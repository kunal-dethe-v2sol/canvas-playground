import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

import {SharedStorageService} from './shared-storage.service';

@Injectable()
export class SharedAuthService {

    //Variables
    private _isLoggedIn = false;
    private _loggedInUserToken = '';
    private _loggedInUserData: any = {};
    private _salt = 'qwertyuiopasdfghjklzxcvbnm';
    private _jwtHelper: JwtHelper = new JwtHelper();

    //Constructor parameters
    static get parameters() {
        return [
            SharedStorageService
        ];
    }

    //Constructor
    constructor(
        private _storageService) {


    }

    //Custom Methods
    /**
     * Logs in the user by storing the data in localstorage.
     */
    login(data) {
        this.setLoggedIn(true);
        this.setLoggedInUserToken(data.token);
        
        //Decode the token and fetch the user data out of it.
        this.retrieveLoggedInUserToken();
    }

    /**
     * Logs out the logged in user by clearing the localstorage data.
     */
    logout() {
        this._loggedInUserToken = '';
        this._storageService.getLocal().store('isLoggedIn', false);
        this._storageService.getLocal().clear('loggedInUserToken');
        this._storageService.getLocal().clear('loggedInUserData');
    }
    /**
     * Sets whether User is logged in or not.
     */
    setLoggedIn(status) {
        this._isLoggedIn = status;
        this._storageService.getLocal().store('isLoggedIn', this._isLoggedIn);
    }

    /**
     * Returns if the User is logged in or not.
     */
    isLoggedIn() {
        this._isLoggedIn = this._storageService.getLocal().retrieve('isLoggedIn');
        return this._isLoggedIn;
    }

    /**
     * Sets the logged in user's token.
     */
    setLoggedInUserToken(token) {
        this._loggedInUserToken = token;
        this._storageService.getLocal().store('loggedInUserToken', this._loggedInUserToken);
    }

    /**
     * Returns the logged in user's token.
     */
    getLoggedInUserToken() {
        this._loggedInUserToken = this._storageService.getLocal().retrieve('loggedInUserToken');
        return this._loggedInUserToken;
    }

    /**
     * Retrieves the user data from the token.
     */
    retrieveLoggedInUserToken() {
        var decodedToken = this._jwtHelper.decodeToken(this.getLoggedInUserToken());
        if(decodedToken) {
            this.setLoggedInUserData(decodedToken.user);
        }
    }

    /**
     * Sets the logged in user's data.
     */
    setLoggedInUserData(user) {
        this._loggedInUserData = user;
    }

    /**
     * Returns the logged in user's data.
     */
    getLoggedInUserData() {
        if (!this._loggedInUserData.uuid) {
            this.retrieveLoggedInUserToken();
        }
        return this._loggedInUserData;
    }

}