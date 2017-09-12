import {Component, OnInit} from '@angular/core';

import {SharedService} from './components/shared/service/shared.service';

@Component({
    selector: 'canvas-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    //Variables
    public isLoggedIn = false;

    //Constructor parameters
    static get parameters() {
        return [
            SharedService
        ];
    }

    //Constructor
    constructor(
        private _sharedService) {

        /**
         * Listens to the emit fired to change the main layout after login and logout.
         */
        this._sharedService.loginEventEmitter.subscribe(
            (status) => {
                this.isLoggedIn = status;
            });
    }

    //Angular Hooks
    ngOnInit() {
        this.isLoggedIn = this._sharedService.getAuthService().isLoggedIn();
    }

    //Custom Methods
}
