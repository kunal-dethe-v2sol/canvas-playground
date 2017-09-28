import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {DesignEditComponent} from './edit/design-edit.component';

import {SharedService} from './../shared/service/shared.service';

import {textList, getText} from './../shared/data/texts';
import {imageList, getImage} from './../shared/data/images';

declare var $: any;

@Component({
    selector: 'canvas-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

    //Variables
    @ViewChild(DesignEditComponent)
    private designEditComponent: DesignEditComponent;
    
    private _action: any = '';
    private _template_id: any = '';
    private _design_id: any = '';

    public loggedInUserData;

    public textList = textList;
    public imageList = imageList;
    public showMainList = true;
    public showSearchBar = false;
    public showLayoutList = false;
    public showTextList = false;
    public showElementList = false;
    public showImageList = false;
    public showShapeList = false;
    public showBackgroundList = false;
    public showUploadList = false;

    public design_id: any = '';
    public design: any = [];
    public design_header_text = '';

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

        this.loggedInUserData = this._sharedService.getLoggedInUserData();

        if (this._activatedRoute.snapshot.url[0].path == 'design') {
            //on load of the design edit route.
            //this.loadList('layouts');
        }
    }

    //Angular Hooks
    ngOnInit() {
        this.designEditComponent.clearDesignObject();

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

        //When existing deisgn is loaded.
        this._activatedRoute.params.subscribe(
            params => {
                this._design_id = params['design_id'];
            }
        );    

        if (this._design_id) {
            var designExists = this._sharedService.getStorageService().getLocal().retrieve('design.' + this.loggedInUserData.uuid + '.' + this._design_id);
            if(designExists) {
                this.design_header_text = designExists.header_text;
                this._sharedService.getStorageService().getLocal().store('activeDesignId', this._design_id);
            } else {
                this._sharedService.getStorageService().getLocal().store('activeDesignId', this._design_id);
                this._sharedService.getStorageService().getLocal().store('design.' + this.loggedInUserData.uuid + '.' + this._design_id, []);
            }
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
        this.design_id = this._template_id + '-' + this.generateId();
        this._sharedService.getStorageService().getLocal().store('activeDesignId', this.design_id);
        this._sharedService.getStorageService().getLocal().clear('activeDesign');

        this._router.navigate(['/design', this.design_id, 'edit']);
    }

    loadList(type, sub_type = '') {
        this.showMainList = false;
        this.showSearchBar = false;
        this.showLayoutList = false;
        this.showTextList = false;
        this.showElementList = false;
        this.showBackgroundList = false;
        this.showUploadList = false;

        if (type == 'main') {
            this.showMainList = true;
        } else if (type == 'search') {
            this.showSearchBar = true;
        } else if (type == 'layouts') {
            this.showLayoutList = true;
        } else if (type == 'elements') {
            this.showElementList = true;
            this.showImageList = false;
            this.showShapeList = false;
            switch(sub_type) {
                case 'image':
                    this.showImageList = true;
                    break;
                case 'shape':
                    this.showShapeList = true;
                    break;
            }
        } else if (type == 'text') {
            this.showMainList = false;
            this.showTextList = true;
        } else if (type == 'background') {
            this.showBackgroundList = true;
        } else if (type == 'uploads') {
            this.showUploadList = true;
        }
    }

    handleClickOnAnyElement($event) {
        //console.log('clicked here', $event.target);
        //is child of toolbar
        //or
        //is .focused_element
        if(document.getElementsByClassName('element_options').length) {
            if($.contains(document.getElementsByClassName('element_options')[0], $event.target)
                || $($event.target).hasClass('focused_element')) {

                //console.log('valid element');
            } else {
                //console.log('invalid element');
                this.designEditComponent.hideToolbar();    
            }
        }
    }

    updateDesignHeader($event) {
        this.designEditComponent.updateDesignHeader($event.target.value);
    }

    saveDesign() {
        this.designEditComponent.saveDesign();
    }

    displayElement(type, element) {
        var html = '';
        switch(type) {
            case 'text':
                html = getText(element);
                break;

            case 'image':
                html = getImage(element);
                break;

            default:

        }
        return html;
    }
    
    insertElement(type, element) {
        switch(type) {
            case 'text':
                this.designEditComponent.insertElement(element);
                break;

            case 'image':
                this.designEditComponent.insertElement(element);
                break;

            default:

        }
    }
}