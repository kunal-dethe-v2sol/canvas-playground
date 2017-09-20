import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../../shared/service/shared.service';
import {textList, displayText} from './../../shared/data/texts';
import {imageList, getImage} from './../../shared/data/images';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
 

declare var $: any;

@Component({
    selector: 'canvas-design-edit',
    templateUrl: './design-edit.component.html',
    styleUrls: ['./design-edit.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class DesignEditComponent implements OnInit {
    
    //Variables
    private _design_id: any = '';
    
    public loggedInUserData;
    public _current_page_no = 1;

    public design: any = [];
    public selected_element: any;
    
    public show1 = false;
    public show2 = false;
    public show3 = false;
    public imageStyle;
    public cropperSettings: CropperSettings;
    public data: any;
    
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

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth =100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.data = {};
    }

    //Angular Hooks
    ngOnInit() {
        this._design_id = this._sharedService.getStorageService().getLocal().retrieve('activeDesignId');
        
        //Check if some design is already saved in the local storage
        var savedDesign = this._sharedService.getStorageService().getLocal().retrieve('design.' + this.loggedInUserData.uuid + '.' + this._design_id);
        if(savedDesign) {
            this.design = savedDesign;
        } else {
            this.design.header_text = '';
            this.design.last_page_no = 1;
            this.design.pages = [
                {
                    page_no: 1,
                    elements: []
                }
            ];
            this.saveDesign();
        }
    }

    showdiv(){
         this.show1 = !this.show1;
    }
    showfilter(){
         this.show3 = !this.show3;
    }
    showCopy(){
         this.show2 = !this.show2;
    }

    //Custom Methods
    saveDesign() {
        var storageData = {
            header_text: this.design.header_text,
            last_page_no: this.design.last_page_no,
            pages: this.design.pages
        };
        this._sharedService.getStorageService().getLocal().store('design.' + this.loggedInUserData.uuid + '.' + this._design_id, storageData);
    }
    
    elementFocused(page_no) {
        this._current_page_no = page_no;
        //console.log('scrolled to page_no', this._current_page_no);
    }
    
    getCurrentPage() {
        return this._current_page_no;
    }

    displayElement(element) {
        var html = '';
        switch(element.type) {
            case 'text':
               //console.log('element.type', element.type);
                html = displayText(element);
                break;
            case 'image':
               //console.log('element.type', element.type);
                html = getImage(element);
                break;
                
            default:
        }
        
        this.saveDesign();
        return html;
    }
    
    createEmptyPage() {
        //console.log('this.design.last_page_no', this.design.last_page_no);
        var max_page_no = this.design.last_page_no;
        max_page_no++;
        this.design['pages'][max_page_no - 1] = Object.assign({}, this.design['pages'][max_page_no - 1]);
        this.design['pages'][max_page_no - 1].page_no = max_page_no;
        this.design['pages'][max_page_no - 1].elements = [];
        
        this.design.last_page_no++;
        //console.log('this.design.last_page_no', this.design.last_page_no);
        
        this.saveDesign();
    }
    
    clonePage(page, empty = true) {
        var clone_page_no = page.page_no;
        var new_page_no = 0;
        
        if(this.design.last_page_no == 1) {
            //there is only one page in the design
            //console.log('only one page');
        } else if(clone_page_no != this.design.last_page_no) {
            //if cloning page is not the last page, so inserting in-between the pages
            //increment page_no by 1 for all further pages
            //console.log('in-between pages');
            for(var i = this.design.last_page_no; i > clone_page_no; i--) {
                this.design['pages'][i] = this.design['pages'][i - 1];
                this.design['pages'][i].page_no++;
            }
        } else {
            //there are multiple pages and cloning the last page
            //console.log('multiple pages');
        }
        
        new_page_no = clone_page_no + 1;
        this.design.last_page_no++;
        
        this.design['pages'][new_page_no - 1] = $.extend(true, {}, this.design['pages'][clone_page_no - 1]);
        this.design['pages'][new_page_no - 1].page_no = new_page_no;
        if(empty) {
            this.design['pages'][new_page_no - 1].elements = [];
        }
        
        console.log("this.design", this.design);
        
        this.saveDesign();
    }

    insertText(text) {
        //load a element in the current page.
        console.log('this._current_page_no', this._current_page_no);
        
        var current_page_no = this._current_page_no - 1;
        this.design['pages'][current_page_no].elements.push(text);
        
        console.log('this.design', this.design);
    }

    insertImage(image) {
        //console.log('image:', image);
        //load a element in the current page.
        //console.log('this._current_page_no', this._current_page_no);
        var current_page_no = this._current_page_no - 1;
        this.design['pages'][current_page_no].elements.push(image);
        //console.log('this.design', this.design);
    }
    
    setElementLocation(element) {
        
    }

    brightness(value) {
        var brightness = {
            "-webkit-filter": "brightness(" + value + "%)",
            "filter": "brightness(" + value + "%)",
        }
        this.imageStyle = brightness;
    }
    
    contrast(value) {
        var contrast = {
            "-webkit-filter": "contrast(" + value + "%)",
            "filter": "contrast(" + value + "%)",
        }
        this.imageStyle = contrast;
    }

    saturate(value) {
        var saturate = {
            "-webkit-filter": "saturate(" + value + "%)",
            "filter": "saturate(" + value + "%)",
        }
        this.imageStyle = saturate;
    }

    grayscale(value) {
        //console.log('value', value);
        var grayscale = {
            "-webkit-filter": "grayscale(" + value + "%)",
            "filter": "grayscale(" + value + "%)",
        }
        this.imageStyle = grayscale;
    }

    opacity(value) {
        //console.log('value', value);
        var grayscale = {
            "-webkit-filter": "opacity(" + value + "%)",
            "filter": "opacity(" + value + "%)",
        }
        this.imageStyle = grayscale;
    }

    rotate() {
        var rotate = {
            "-webkit-transform": "rotate("+ 180 + "deg)", 
            "transform": "rotate("+ 180 + "deg)", 
        }
        this.imageStyle = rotate;
    }

    blur(value) {
        var blur = {
             "-webkit-filter":  "blur(" + 5 + "px)",
             "filter": "blur(" + 5 + "px)",
        }
        this.imageStyle = blur;
        var blur_dis = {
             "-webkit-filter":  "blur(" + 0 + "px)",
             "filter": "blur(" + 0 + "px)",
        }
        if(value < 10){
            this.imageStyle = blur_dis;
        }
        
    }
}