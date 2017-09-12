import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';

@Component({
    selector: 'canvas-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    //Variables
    public loggedInUserData;
    public templates;

    //Constructor parameters
    static get parameters() {
        return [
            Router,
            SharedService
        ];
    }
    

    //Constructor
    constructor(
        private _router,
        private _sharedService) {

        this.loggedInUserData = this._sharedService.getAuthService().getLoggedInUserData();
    }

    //Angular Hooks
    ngOnInit() {
        this.templates = [
            {
                img: '',
                title: 'Presentation',
                size: '1024 x 768 px'
            },
            {
                img: '',
                title: 'Desktop Wallpaper',
                size: '1024 x 768 px'
            }
        ];
    }

    //Custom Methods
    loadTemplate(template) {
        
    }
    
    logout() {
        this._sharedService.getAuthService().logout();
        this._sharedService.loginEventEmitter.emit(false);
        this._router.navigate(['']);
    }
}
