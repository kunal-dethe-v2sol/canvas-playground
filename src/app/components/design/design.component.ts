import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {DesignEditComponent} from './edit/design-edit.component';

import {SharedService} from './../shared/service/shared.service';
import {textList, displayText} from './../shared/data/texts';

@Component({
    selector: 'canvas-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

    //Variables
    @ViewChild(DesignEditComponent)
    private childComponent: DesignEditComponent;
    
    private _action: any = '';
    private _template_id: any = '';

    public textList = textList;
    public showSearchBar = false;
    public showLayoutList = false;
    public showTextList = false;
    public showElementList = false;
    public showBackgroundList = false;
    public showUploadList = false;

    public design_id: any = '';
    public design: any = [];
    public selected_element: any;

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

        if (this._activatedRoute.snapshot.url[0].path == 'design') {
            //on load of the design edit route.
            this.loadList('layouts');
        }
    }

    //Angular Hooks
    ngOnInit() {
        //When creating a new design.
        //ie. clicked ona template on the home page
        this._activatedRoute
            .queryParams
            .subscribe(params => {
                this._action = params['action'];
                this._template_id = params['template'];

                if (this._action == 'create' && this._template_id) {
                    this.createDesign();
                }
            });

        if (!this._template_id) {
            this._template_id = this._sharedService.getStorageService().getLocal().retrieve('activeTemplateId');
        }
    }

    //Custom Methods
    generateId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 30; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    createDesign() {
        this.design_id = this.generateId();
        this._sharedService.getStorageService().getLocal().store('activeDesignId', this.design_id);
        this._sharedService.getStorageService().getLocal().store('activeTemplateId', this._template_id);
        this._sharedService.getStorageService().getLocal().clear('activeDesign');

        this._router.navigate(['/design', this.design_id, 'edit']);
    }

    loadList(type) {
        this.showSearchBar = false;
        this.showLayoutList = false;
        this.showTextList = false;
        this.showElementList = false;
        this.showBackgroundList = false;
        this.showUploadList = false;

        if (type == 'search') {
            this.showSearchBar = true;
        } else if (type == 'layouts') {
            this.showLayoutList = true;
        } else if (type == 'elements') {
            this.showElementList = true;
        } else if (type == 'text') {
            this.showTextList = true;
        } else if (type == 'background') {
            this.showBackgroundList = true;
        } else if (type == 'uploads') {
            this.showUploadList = true;
        }
    }

    displayText(text) {
        return displayText(text);
    }

    insertText(text) {
        this.childComponent.insertText(text);
    }
}