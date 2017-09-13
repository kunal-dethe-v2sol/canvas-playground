import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';

@Component({
    selector: 'canvas-design',
    templateUrl: './design.component.html'
})
export class DesignComponent implements OnInit {

    //Variables
    
    //Constructor parameters
    static get parameters() {
        return [
            Router,
            ActivatedRoute,
            SharedService
        ];
    }
    

    //Constructor
    constructor(
        private _router,
        private _activatedRoute,
        private _sharedService) {

        if(this._activatedRoute.snapshot.url[0].path == 'create-a-design') {
            
        }
    }

    //Angular Hooks
    ngOnInit() {
        
    }

    //Custom Methods
    
}