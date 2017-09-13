import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';
import {textList} from './design.text';

@Component({
    selector: 'canvas-design',
    templateUrl: './design.component.html'
})
export class DesignComponent implements OnInit {

    //Variables
    private _action;
    private _type;
    public design_id;
    public showLayoutList = false;
    public showTextList = false;
    public showElementList = false;
    public showBackgroundList = false;
    public showUploadList = false;

    public textList = textList;

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

        if(this._activatedRoute.snapshot.url[0].path == 'design') {
            this.loadList('text');
        }
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
    
    loadList(type) {
        this.showLayoutList = false;
        this.showTextList = false;
        this.showElementList = false;
        this.showBackgroundList = false;
        this.showUploadList = false;
        
        if(type == 'layouts') {
            this.showLayoutList = true;
        } else if(type == 'elements') {
            this.showElementList = true;
        } else if(type == 'text') {
            this.showTextList = true;
        } else if(type == 'background') {
            this.showBackgroundList = true;
        } else if(type == 'uploads') {
            this.showUploadList = true;
        }
    }
    
    formatTextStyle(text) {
        return {
            'display': text.style.display,
            'font-size': text.style.fontsize,
            'margin-top': text.style.margintop,
            'margin-bottom': text.style.marginbottom,
            'margin-left': text.style.marginleft,
            'margin-right': text.style.marginright,
            'font-weight': text.style.fontweight
        }
    }
    
}