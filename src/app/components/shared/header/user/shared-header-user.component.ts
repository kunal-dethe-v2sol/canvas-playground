import {Component, OnInit} from '@angular/core';

import {SharedService} from './../../service/shared.service';

@Component({
    selector: 'canvas-shared-header-user',
    templateUrl: './shared-header-user.component.html'
})
export class SharedHeaderUserComponent implements OnInit {

    //Variables
    public loggedInUser = [];

    //Constructor parameters
    static get parameters() {
        return [
            SharedService
        ];
    }

    //Constructor
    constructor(
        private _sharedService) {


    }

    //Angular Hooks
    ngOnInit() {
        this.loggedInUser = this._sharedService.getAuthService().getLoggedInUserData();
    }

    //Custom Methods
}
