import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {SharedAuthService} from './shared-auth.service';

@Injectable()
export class SharedCanActivateAuthService implements CanActivate {

    //Variables


    //Constructor parameters
    static get parameters() {
        return [
            Router,
            SharedAuthService
        ];
    }

    //Constructor
    constructor(
        private _router,
        private _sharedAuthService) {


    }

    //Custom Methods
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var path = '';
        if(route.url.length) {
            path = route.url[0].path;
        }
        return this.checkPermission(path);
    }

    checkPermission(path) {
        var allow = false;
        var isLoggedIn = this._sharedAuthService.isLoggedIn();
        
        switch (path) {
            case '':
                if(isLoggedIn) {
                    this._router.navigate(['home']);
                } else {
                    allow = true;
                }
                break;
                
            case 'home':
                if(isLoggedIn) {
                    allow = true;
                } else {
                    this._router.navigate(['login']);
                }
                break;
                
            case 'login':
                if(isLoggedIn) {
                    this._router.navigate(['home']);
                } else {
                    allow = true;
                }
                break;
                
            default:
                allow = false;
        }
        return allow;
    }
}