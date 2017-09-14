import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';
import {templateList} from './../shared/data/templates';
import {textList} from './../shared/data/texts';

declare var jQuery:any;
declare var $ :any;

@Component({
    selector: 'canvas-design',
    templateUrl: './design.component.html'
})
export class DesignComponent implements OnInit {

    //Variables
    private _action;
    private _templates;
    private _template;
    private _template_id;
    public _current_page_no = 1;
    
    public textList = textList;
    public showLayoutList = false;
    public showTextList = false;
    public showElementList = false;
    public showBackgroundList = false;
    public showUploadList = false;
    
    public design_id;
    public design = [];
    public selected_element;
    
    @ViewChild('design_wrapper') design_wrapper;
    
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
        this._templates = templateList;
        
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
            
        if(!this._template_id) {
            this._template_id = this._sharedService.getStorageService().getLocal().retrieve('activeTemplateId');
        }
        
        this.design['pages'] = [
            [
                
            ]
        ];
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
    
    elementFocused($event) {
        this.selected_element = $event.target;
        if($(this.selected_element).hasClass('single_page')) {
            this._current_page_no = $(this.selected_element).attr('data-page_no');
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
    
    insertText(text) {
        //load a element in the current page.
        var current_page_element = $('.single_page[data-page_no="' + this._current_page_no+'"]');
        var current_page_no = this._current_page_no - 1;
        
        var element = document.createElement('span');
        
        var styles = {};
        if(text.type == 'header') {
            element.innerHTML = text.text;
            styles = this.formatTextStyle(text);
        }
        
//        var attribute = document.createAttribute("(click)");       // Create a "class" attribute
//        attribute.value = "elementFocused($event)";                           // Set the value of the class attribute
//        element.setAttributeNode(attribute);   

//        element.setAttribute("(click)", "elementFocused($event)");
        
        var max_z_index = this.design['pages'][current_page_no].length;
        styles['z-index'] = max_z_index++;
        
        var styleString = JSON.stringify(styles,null,'\t')
                          .replace(/"/g,'')
                          .replace(/,\n/g,';')
                          .replace(/\{/g, '')
                          .replace(/\}/g, ';')
                          .replace(/\s/g, '');
        element.setAttribute('style', styleString);
                          
        $(element).addClass('checkFocus');
        
        this.design['pages'][current_page_no].push(element);
        current_page_element.append(element);
        this.setElementLocation(element);
        
        console.log('max_z_index', max_z_index);
        console.log('styles', styles);
        console.log('styleString', styleString);
        console.log('element', element);
        console.log('this.design', this.design);
        //console.log(current_page_element);
    }
    
    setElementLocation(element) {
        //element
    }
}