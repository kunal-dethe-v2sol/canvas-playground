import {Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../../shared/service/shared.service';
import {textList, formatTextStyle} from './../../shared/data/texts';

declare var $: any;

@Component({
    selector: 'canvas-design-edit',
    templateUrl: './design-edit.component.html'
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
        this.design['pages'] = [
            {
                page_no: 1,
                elements: []
            }
        ];
    }

    //Custom Methods
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
    
    clonePage0(page_no, empty = true) {
        var current_page_element = $('.single_page_wrapper[data-page_no="' + page_no + '"]');

        //Copy elements from cloned element to the this.design array
        console.log("this.design['pages'][page_no]", this.design['pages'][page_no]);

        page_no++
        this.design['pages'][page_no -1] = [];
        
        //Clone current page
        var current_page_clone_element = $(current_page_element).clone();
        
        //Add attributes
        $(current_page_clone_element).attr('data-page_no', page_no);
        $(current_page_clone_element).find('.page_no').text(page_no);
        $(current_page_clone_element).find('.copy_btn').attr('data-page_no', page_no);

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
    
    clonePage(page, empty = true) {
        var page_no = page.page_no;
        page_no++;
        
        this.design['pages'][page_no - 1] = {
            page_no: page_no,
            elements: []
        }
        console.log('this.design', this.design);
    }

    formatTextStyle(text) {
        return formatTextStyle(text);
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
        
    }
}