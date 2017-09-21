import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../../shared/service/shared.service';

import {templateList} from './../../shared/data/templates';
import {textList, fontFamilyList, fontSizeList, getText} from './../../shared/data/texts';
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
    private _current_page_no = 1;
    
    public loggedInUserData;

    public design: any = [];
    public page_size: any = {};
    public selected_element: any;

    public letterSpacing = 0;
    public lineHeight = 1.4;

    public brightness = 50;
    public contrast = 50;
    public saturation = 0;
    public tint = 50;
    public blur = 0;
    public x_process = 50;
    public vignette = 50;
    public opacity = 1;
    public rotateX = 180;
    public rotateY = 180;

    public fontFamilyList = fontFamilyList;
    public fontSizeList = fontSizeList;

    public showOptions = false;
    public showTextOptions = false;
    public showImageOptions = false;
    
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
        
        var template_id = this._design_id.split('-');
        template_id = template_id[0];
        var template = {};
        for(var templateIndex in templateList) {
            if(template_id == templateList[templateIndex].uuid) {
                this.page_size.width = templateList[templateIndex].width;
                this.page_size.height = templateList[templateIndex].height;
            }
        }

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

    //Custom Methods
    saveDesign() {
        var storageData = {
            header_text: this.design.header_text,
            last_page_no: this.design.last_page_no,
            pages: this.design.pages
        };
        this._sharedService.getStorageService().getLocal().store('design.' + this.loggedInUserData.uuid + '.' + this._design_id, storageData);
    }
    
    pageFocused(page_no) {
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
                html = getText(element, true);
                break;

            case 'image':
               //console.log('element.type', element.type);
                html = getImage(element, true);
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
        
        //console.log("this.design", this.design);
        
        this.saveDesign();
    }

    updateDesignHeader(header_text) {
        this.design.header_text = header_text;
        this.saveDesign();
    }

    hideToolbar() {
        this.showOptions = false;
        this.showTextOptions = false;
        this.showImageOptions = false;
        $('.single_element').removeClass('focused_element');
    }

    /**
     * Sets the selected element.
     * @param element 
     */
    selectedElement(element) {
        $('.single_element').removeClass('focused_element');
        $(element).addClass('focused_element');
        this.selected_element = element;
        //console.log('this.selected_element', this.selected_element);
        //console.log("this.design", this.design);
    }

    manageElement($event) {
        console.log('in manageElement', $event);
        this.showOptions = false;
        this.showTextOptions = false;
        this.showImageOptions = false;

        if($event) {
            switch($event.target.dataset.type) {
                case 'text':
                    this.selectedElement($event.target);
                    this.showOptions = true;
                    this.showTextOptions = true;
                    break;

                case 'image':
                    this.selectedElement($event.target);
                    this.showOptions = true;
                    this.showImageOptions = true;
                    break;

                default:
            }
        }
    }

    generateId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 30; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    cloneElement() {
        //get guid from the selected element
        var guid = this.selected_element.dataset.guid;

        //find the element object from the design variable for this guid
        var elements = this.design['pages'][this._current_page_no - 1].elements;
        for(var i in elements) {
            if(guid == elements[i].guid) {
                this.pushElementToDesignObject(this._current_page_no - 1, elements[i]);
                return;
            }
        }
    }

    deleteElement() {
        //get guid from the selected element
        var guid = this.selected_element.dataset.guid;

        //find the element object from the design variable for this guid
        var elements = this.design['pages'][this._current_page_no - 1].elements;
        for(var i in elements) {
            if(guid == elements[i].guid) {
                this.design['pages'][this._current_page_no - 1].elements.splice(i, 1);
                return;
            }
        }
    }

    setElementLocation(element) {
        //element.style[''] = 'translate(476px, 304px)';
    }

    pushElementToDesignObject(current_page_no, element) {
        //generate a random identifier for this element
        var elem = $.extend(true, {}, element);

        elem.guid = this.generateId();
        this.setElementLocation(elem);
        this.design['pages'][current_page_no].elements.push(elem);
    }

    updateSelectedElementStyle(newStyles) {
        //get guid from the selected element
        var guid = this.selected_element.dataset.guid;
        
        //find the element object from the design variable for this guid
        var elements = this.design['pages'][this._current_page_no - 1].elements;
        for(var i in elements) {
            if(guid == elements[i].guid) {
                for(var newStyleIndex in newStyles) {
                    this.design['pages'][this._current_page_no - 1].elements[i].style[newStyleIndex] = newStyles[newStyleIndex];
                }
                return;
            }
        }
    }

    fontPropertyChanged(type, $event) {
        var newStyles = {};
        
        switch(type) {
            case 'font-family':
            case 'line-height':
            case 'opacity':
                newStyles[type] = $event.target.value;
                break;
                
            case 'font-size':
            case 'letter-spacing':
                newStyles[type] = $event.target.value + 'px';
                break;
            
            case 'font-style':
                if($event == 'normal') {
                    newStyles['font-weight'] = $event;
                    newStyles['font-style'] = $event;
                } else {
                    newStyles[type] = $event;
                }
                break;
                    
            case 'font-weight':
            case 'text-align':
            case 'text-transform':
                newStyles[type] = $event;
                break;
                
            case 'brightness':
            case 'contrast':
                newStyles['-webkit-filter'] = type + "(" + $event.target.value + "%)";
                newStyles['filter'] = type + "(" + $event.target.value + "%)";
                break;

            case 'saturate':
                newStyles['-webkit-filter'] = type + "(" + $event.target.value + ")";
                newStyles['filter'] = type + "(" + $event.target.value + ")";
                break;

            case 'blur':
                newStyles['-webkit-filter'] = type + "(" + $event.target.value + "px)";
                newStyles['filter'] = type + "(" + $event.target.value + "px)";
                break;

            case 'rotateX':
                this.rotateX = this.rotateX == 180 ? 0 : 180;
                newStyles['-webkit-transform'] = type + "(" + this.rotateX + "deg)";
                newStyles['transform'] = type + "(" + this.rotateX + "deg)";
                break;

            case 'rotateY':
                this.rotateY = this.rotateY == 180 ? 0 : 180;
                newStyles['-webkit-transform'] = type + "(" + this.rotateY + "deg)";
                newStyles['transform'] = type + "(" + this.rotateY + "deg)";
                break;

            case 'tint':
            case 'x_process':
            case 'vignette':
                break;

            default:
        }
        
        if(Object.keys(newStyles).length) {
            this.updateSelectedElementStyle(newStyles);
        }
    }
    
    /**
     * Start :: Text Options
     */
    insertText(text) {
        //load a element in the current page.
        //console.log('this._current_page_no', this._current_page_no);
        this.pushElementToDesignObject(this._current_page_no - 1, text);
        //console.log('this.design', this.design);
    }
    /**
     * End :: Text Options
     */

    /**
     * Start :: Image Options
     */
    insertImage(image) {
        //load a element in the current page.
        //console.log('this._current_page_no', this._current_page_no);
        this.pushElementToDesignObject(this._current_page_no - 1, image);
        //console.log('this.design', this.design);
    }
    rotate() {
        var rotate = {
            "-webkit-transform": "rotate("+ 180 + "deg)", 
            "transform": "rotate("+ 180 + "deg)", 
        }
        this.imageStyle = rotate;
    }
    /**
     * End :: Text Options
     */
}