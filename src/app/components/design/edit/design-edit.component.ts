import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../../shared/service/shared.service';
import {textList, displayText} from './../../shared/data/texts';

declare var $: any;

@Component({
    selector: 'canvas-design-edit',
    templateUrl: './design-edit.component.html',
    styleUrls: ['./design-edit.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class DesignEditComponent implements OnInit {

    //Variables
    public _current_page_no = 1;

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

        
    }

    //Angular Hooks
    ngOnInit() {
        //Check if some design is already saved in the local storage
        var savedDesign = this._sharedService.getStorageService().getLocal().retrieve('activeDesign');
        if(savedDesign) {
            this.design.last_page_no = savedDesign.last_page_no;
            this.design.pages = savedDesign.pages;
        } else {
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
            last_page_no: this.design.last_page_no,
            pages: this.design.pages
        };
        this._sharedService.getStorageService().getLocal().store('activeDesign', storageData);
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
                html = displayText(element);
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
    }

    insertText(text) {
        //load a element in the current page.
        console.log('this._current_page_no', this._current_page_no);
        
        var current_page_no = this._current_page_no - 1;
        this.design['pages'][current_page_no].elements.push(text);
        
        console.log('this.design', this.design);
    }

    setElementLocation(element) {
        
    }
}