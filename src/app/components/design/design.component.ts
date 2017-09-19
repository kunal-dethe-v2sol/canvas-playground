import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {DesignEditComponent} from './edit/design-edit.component';

import {SharedService} from './../shared/service/shared.service';
import {textList, displayText} from './../shared/data/texts';
import {imageList, getImage} from './../shared/data/images';

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

        this.loggedInUserData = this._sharedService.getLoggedInUserData();

        if (this._activatedRoute.snapshot.url[0].path == 'design') {
            //on load of the design edit route.
            this.loadList('layouts');
        }
        //console.log('imageList', imageList)
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

        //When existing deisgn is loaded.
        this._activatedRoute.params.subscribe(
            params => {
                this._design_id = params['design_id'];
            }
        );    

        if (this._design_id) {
            var designExists = this._sharedService.getStorageService().getLocal().retrieve('design.' + this.loggedInUserData.uuid + '.' + this._design_id);
            if(designExists) {
                //console.log('from storage', designExists);
                //console.log('header from storage', designExists.header_text);
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
        this.design_id = this.generateId();
        this._sharedService.getStorageService().getLocal().store('activeDesignId', this.design_id);
        this._sharedService.getStorageService().getLocal().clear('activeDesign');

        this._router.navigate(['/design', this.design_id, 'edit']);
    }

    loadList(type, sub_type = '') {
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
            this.showTextList = true;
        } else if (type == 'background') {
            this.showBackgroundList = true;
        } else if (type == 'uploads') {
            this.showUploadList = true;
        }
    }

    updateDesignHeader($event) {
        var savedDesign = this._sharedService.getStorageService().getLocal().retrieve('design.' + this.loggedInUserData.uuid + '.' + this._design_id);
        if(savedDesign) {
            savedDesign.header_text = $event.target.value;
            var storageData = {
                header_text: savedDesign.header_text,
                last_page_no: savedDesign.last_page_no,
                pages: savedDesign.pages
            };
            this._sharedService.getStorageService().getLocal().store('design.' + this.loggedInUserData.uuid + '.' + this._design_id, storageData);
        }
    }

    displayText(text) {
        //console.log('displayText text', text);
        return displayText(text);
    }

    insertText(text) {
        this.designEditComponent.insertText(text);
    }

    displayImage(image) {
        return getImage(image);
    }

    insertImage(image) {
        //console.log('image1:', image);
        this.designEditComponent.insertImage(image);
    }
}