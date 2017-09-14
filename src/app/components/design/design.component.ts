import {Component, OnInit, ViewChild, Renderer2} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';
import {templateList} from './../shared/data/templates';
import {textList} from './../shared/data/texts';

declare var jQuery: any;
declare var $: any;

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
            Renderer2,
            SharedService
        ];
    }

    //Constructor
    constructor(
        private _router,
        private _activatedRoute,
        private _renderer,
        private _sharedService) {

        if (this._activatedRoute.snapshot.url[0].path == 'design') {
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

        if (!this._template_id) {
            this._template_id = this._sharedService.getStorageService().getLocal().retrieve('activeTemplateId');
        }

        this.design['pages'] = [
            []
        ];
        var that = this;
        var first_page_element = $('.single_page_wrapper[data-page_no="' + this._current_page_no + '"]');
        $(first_page_element).on('click', function($event) {
            that.elementFocused($event);
        });
        $(first_page_element).find('.single_page_options').on('click', function($event) {
            that.elementFocused($event);
        });
        $(first_page_element).find('.copy_btn').on('click', function($event) {
            that.clonePage($(this).attr('data-page_no'));
        });
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

        if (type == 'layouts') {
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

    clonePage(page_no) {
        var current_page_element = $('.single_page_wrapper[data-page_no="' + page_no + '"]');

        page_no++;
        this.design['pages'][page_no - 1] = [];

        //Clone current page
        var current_page_clone_element = $(current_page_element).clone();
        
        //Add attributes
        $(current_page_clone_element).attr('data-page_no', page_no);
        $(current_page_clone_element).find('.page_no').text(page_no);
        $(current_page_clone_element).find('.copy_btn').attr('data-page_no', page_no);

        //Copy elements from cloned element to the this.design array
        

        //Event Listener
        var that = this;
        $(current_page_clone_element).on('click', function($event) {
            that.elementFocused($event);
        });
        $(current_page_clone_element).find('.copy_btn').on('click', function() {
            that.clonePage($(this).attr('data-page_no'));
        });

        //Append to the wrapper
        $(current_page_clone_element).appendTo('#design_wrapper');
    }

    elementFocused($event) {
        var page_no = 
        page_no = $($event.target).attr('data-page_no');
        if(page_no) {
            page_no = $($event.target).parent().attr('data-page_no');
        }
        
        this.selected_element = $event.target;
        if ($(this.selected_element).hasClass('single_page_wrapper')) {
            console.log('wrapper');
            page_no = $(this.selected_element).attr('data-page_no');
        } else if ($(this.selected_element).hasClass('single_page') || $(this.selected_element).hasClass('single_page_options')) {
            console.log('page');
            page_no = $(this.selected_element).parent().attr('data-page_no');
        }

        if(page_no) {
            this._current_page_no = page_no;
        }
        console.log('page_no', page_no);
        console.log('this._current_page_no', this._current_page_no);
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
        console.log('this.design', this.design);
        console.log('this._current_page_no', this._current_page_no);
        
        
        var current_page_element = $('.single_page_wrapper[data-page_no="' + this._current_page_no + '"] > .single_page');
        var current_page_no = this._current_page_no - 1;

        var element = document.createElement('span');

        var styles = {};
        if (text.type == 'header') {
            element.innerHTML = text.text;
            styles = this.formatTextStyle(text);
                }

//        var attribute = document.createAttribute("(click)");       // Create a "class" at        tribute
//        attribute.value = "elementFocused($event)";                           // Set the value of the class at        tribute
//        element.setAttributeNode(attribut        e);   

//        element.setAttribute("(click)", "elementFocused($event)");

        var max_z_index = this.design['pages'][current_page_no].length;
        styles['z-index'] = max_z_index++;

        var styleString = JSON.stringify(styles, null, '\t')
            .replace(/"/g, '')
            .replace(/,\n/g, ';')
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