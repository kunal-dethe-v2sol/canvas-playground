import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../../shared/service/shared.service';
import {textList, fontFamilyList, fontSizeList, getText} from './../../shared/data/texts';

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

    public fontFamilyList = fontFamilyList;
    public fontSizeList = fontSizeList;

    public showTextOptions = false;
    
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

    hideToolbar() {
        this.showTextOptions = false;
        $('.single_element').removeClass('focused_element');
    }

    setElementLocation(element) {
        
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
        //console.log('in manageElement', $event);

        this.showTextOptions = false;

        if($event) {
            switch($event.target.dataset.type) {
                case 'text':
                    this.selectedElement($event.target);
                    this.showTextOptions = true;
                    break;

                default:
                    this.showTextOptions = false;
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

    pushElementToDesignObject(current_page_no, element) {
        //generate a random identifier for this element
        element.guid = this.generateId();
        this.design['pages'][current_page_no].elements.push(element);
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
                newStyles[type] = $event.target.value;
                break;
                
            case 'font-size':
                newStyles['font-size'] = $event.target.value + 'px';
                break;
            
            case 'font-style':
                if($event == 'normal') {
                    newStyles['font-weight'] = 'normal';
                    newStyles['font-style'] = 'normal';
                } else {
                    newStyles[type] = $event;
                }
                break;
                    
            case 'font-weight':
            case 'text-align':
            case 'text-transform':
                newStyles[type] = $event;
                break;
                
            default:
        }
        
        if(Object.keys(newStyles).length) {
            this.updateSelectedElementStyle(newStyles);
        }
    }
    /**
     * End :: Text Options
     */
}