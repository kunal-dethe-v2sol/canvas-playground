import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';

@Component({
    selector: 'canvas-design',
    templateUrl: './design.component.html'
})
export class DesignComponent implements OnInit {

    //Variables
    private _action;
    private _type;
    public design_id;

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


    }

    //Angular Hooks
    ngOnInit() {
        this._activatedRoute
            .queryParams
            .subscribe(params => {
                this._action = params['action'];
                this._type = params['type'];

                if (this._action == 'create' && this._type) {
                    this.createDesign();
                }
            });
    }

    //Custom Methods
    generateId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 30; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    createDesign() {
        this.design_id = this.generateId();
        this._sharedService.getStorageService().getLocal().store('activeDesignId', this.design_id);

        this._router.navigate(['/design', this.design_id, 'edit']);
    }
}