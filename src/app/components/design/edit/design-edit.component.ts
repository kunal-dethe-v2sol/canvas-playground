import { Component, OnInit, ViewEncapsulation, trigger, transition, style, animate } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService } from './../../shared/service/shared.service';

import { templateList } from './../../shared/data/templates';
import { textList, fontFamilyList, fontSizeList, getText } from './../../shared/data/texts';
import { imageList, getImage } from './../../shared/data/images';

declare var $: any;

@Component({
    selector: 'canvas-design-edit',
    templateUrl: './design-edit.component.html',
    styleUrls: ['./design-edit.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(500, style({ opacity: 0 }))
            ])
        ]),
        trigger('slideInOut', [
            transition('* => void', [
                style({ height: '*' }),
                animate(500, style({ height: 0 }))
            ]),
            transition('void => *', [
                style({ height: '0' }),
                animate(500, style({ height: '*' }))
            ])
        ])
    ]
})

export class DesignEditComponent implements OnInit {

    //Variables
    private _design_id: any = '';
    private _current_page_no = 1;

    public loggedInUserData;

    public design: any = [];
    public page_wrapper_size: any = {};
    public page_size: any = {};
    public selected_element: any;
    public selected_element_object_id: any;

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

    public showDeletePageBtn = false;

    public fontFamilyList = fontFamilyList;
    public fontFamily: any = '';
    public fontSizeList = fontSizeList;
    public fontSize: any = '';

    public showOptions = false;
    public showTextOptions = false;
    public showImageOptions = false;
    public showImageCropOptions= false;

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

        var header_text = '';
        var template_id = this._design_id.split('-');
        template_id = template_id[0];
        var template = {};
        for (var templateIndex in templateList) {
            if (template_id == templateList[templateIndex].uuid) {
                header_text = templateList[templateIndex].title;
                this.page_size.width = templateList[templateIndex].width;
                this.page_size.height = templateList[templateIndex].height;

                this.page_wrapper_size.height = parseInt(this.page_size.height) + 100;
            }
        }

        //Check if some design is already saved in the local storage
        var savedDesign = this._sharedService.getStorageService().getLocal().retrieve('design.' + this.loggedInUserData.uuid + '.' + this._design_id);
        if (savedDesign && savedDesign.last_page_no) {
            this.design = savedDesign;
        } else {
            this.design.header_text = header_text || '';
            this.design.last_page_no = 1;
            this.design.pages = [
                {
                    page_no: 1,
                    elements: []
                }
            ];
        }

        this.toggleDeletePageButton();
        this.setDefaultOptions();
        this.setUIOptions();
    }

    //Custom Methods
    clearDesignObject() {
        this.design = [];
    }

    saveDesign() {
        var storageData = {
            header_text: this.design.header_text,
            last_page_no: this.design.last_page_no,
            pages: this.design.pages
        };
        this._sharedService.getStorageService().getLocal().store('design.' + this.loggedInUserData.uuid + '.' + this._design_id, storageData);

        this.toggleDeletePageButton();
    }

    pageFocused(page_no) {
        this._current_page_no = page_no;
    }

    getCurrentPage() {
        return this._current_page_no;
    }

    toggleDeletePageButton() {
        if (this.design.pages.length > 1) {
            this.showDeletePageBtn = true;
        } else {
            this.showDeletePageBtn = false;
        }
    }

    displayElement(element) {
        var html = '';
        switch (element.type) {
            case 'text':
                html = getText(element, true);
                break;

            case 'image':
                html = getImage(element, true);
                break;

            default:
        }

        return html;
    }

    createEmptyPage() {
        var max_page_no = this.design.last_page_no;
        max_page_no++;
        this.design['pages'][max_page_no - 1] = Object.assign({}, this.design['pages'][max_page_no - 1]);
        this.design['pages'][max_page_no - 1].page_no = max_page_no;
        this.design['pages'][max_page_no - 1].elements = [];

        this.design.last_page_no++;

        this.toggleDeletePageButton();
    }

    clonePage(page, empty = true) {
        var clone_page_no = page.page_no;
        var new_page_no = 0;

        if (this.design.last_page_no == 1) {
            //there is only one page in the design
        } else if (clone_page_no != this.design.last_page_no) {
            //if cloning page is not the last page, so inserting in-between the pages
            //increment page_no by 1 for all further pages
            for (var i = this.design.last_page_no; i > clone_page_no; i--) {
                this.design['pages'][i] = this.design['pages'][i - 1];
                this.design['pages'][i].page_no++;
            }
        } else {
            //there are multiple pages and cloning the last page
        }

        new_page_no = clone_page_no + 1;
        this.design.last_page_no++;

        this.design['pages'][new_page_no - 1] = $.extend(true, {}, this.design['pages'][clone_page_no - 1]);
        this.design['pages'][new_page_no - 1].page_no = new_page_no;
        if (empty) {
            this.design['pages'][new_page_no - 1].elements = [];
        }

        this.toggleDeletePageButton();
    }

    deletePage(pageIndex) {
        this.design['pages'].splice(pageIndex, 1);

        //decrement the page_nos of all the pages below this page_no.
        if (this.design['pages'].length > 1) {
            for (var i = 0; i < this.design['pages'].length; i++) {
                this.design['pages'][i].page_no--;
            }
        } else {
            this.design['pages'][0].page_no = 1;
        }
        this.design.last_page_no--;

        this.toggleDeletePageButton();
    }

    updateDesignHeader(header_text) {
        this.design.header_text = header_text;
    }

    hideAllOptions() {
        this.showOptions = false;
        this.showTextOptions = false;
        this.showImageOptions = false;
        //this.showImageCropOptions = false;
    }

    hideToolbar() {
        this.hideAllOptions();
        $('.single_element').removeClass('focused_element');
        if ($('.ui-resizable').length) {
            $('.ui-resizable').resizable("destroy");
        }
        if($('.ui-rotatable-handle').length) {
            $('.ui-rotatable-handle').parent().rotatable("destroy");
        }
    }

    setDefaultOptions() {
        this.fontFamily = 'sans-serif';
        this.fontSize = 'sans-serif';
        this.letterSpacing = 0
        this.lineHeight = 1.4;
        this.opacity = 1;
    }

    retainElementStyles(element) {
        var guid = element.dataset.guid;

        //find the element object from the design variable for this guid
        var elements = this.design['pages'][this._current_page_no - 1].elements;
        for (var i in elements) {
            if (guid == elements[i].guid) {
                var styles = elements[i].style;

                this.setDefaultOptions();

                if (styles['font-family']) {
                    this.fontFamily = styles['font-family'];
                }
                if (styles['font-size']) {
                    this.fontSize = styles['font-size'];
                }
                if (styles['letter-spacing']) {
                    this.letterSpacing = parseInt(styles['letter-spacing']);
                }
                if (styles['line-height']) {
                    this.lineHeight = styles['line-height'];
                }
                if (styles['opacity']) {
                    this.opacity = styles['opacity'];
                }
                return;
            }
        }
    }

    cropImage() {
        this.showImageCropOptions = false;
        this.showImageOptions = true;
        this.showOptions = true;
        
        if ($('.cropper-hidden').length) {
            $('.cropper-hidden').cropper("destroy");
        }

        var croppedImageData = $(this.selected_element).cropper('getCroppedCanvas').toDataURL();
        this.design['pages'][this._current_page_no - 1].elements[this.selected_element_object_id].src = croppedImageData;
    }

    cancelImageCrop() {
        if ($('.cropper-hidden').length) {
            $('.cropper-hidden').cropper("destroy");
        }
        this.showImageCropOptions = false;
        this.showImageOptions = true;
        this.showOptions = true;
    }
    
    loadCropper() {
        var that = this;

        var height = parseInt(that.selected_element.style.height);
        var width = parseInt(that.selected_element.style.width);
        
        that.showImageOptions = false;
        that.showOptions = false;
        that.showImageCropOptions = true;

        $(that.selected_element).cropper({
            minContainerHeight: 225,
            minContainerWidth: width,
        });
    }

    setSelectedElementObjectId() {
        var guid = this.selected_element.dataset.guid;
        var elements = this.design['pages'][this._current_page_no - 1].elements;
        for (var i in elements) {
            if (guid == elements[i].guid) {
                this.selected_element_object_id = i;
                return;
            }
        }
        return;
    }

    /**
     * Sets the selected element.
     * @param element 
     */
    selectedElement(element) {
        $('.single_element').removeClass('focused_element');
        //if ($('.ui-resizable').length) {
            //console.log("destroying resizable for elements", $('.ui-resizable').length);
            //$('.ui-resizable').resizable("destroy");
        //}

        $(element).addClass('focused_element');
        this.selected_element = element;
        this.setSelectedElementObjectId();
        this.retainElementStyles(element);

        var that = this;
        //console.log("$(that.selected_element)", $(that.selected_element));

        var oldRotateStyleValue = that.selected_element.style.transform;
        
        $(that.selected_element).resizable({
            animate: true,
            //containment: "#single_page_"+(this._current_page_no - 1),
            //containment: "parent",
            helper: "ui-resizable-helper",
            //minWidth: parseInt(that.selected_element.style.width),
            //maxWidth: this.page_size.width - parseInt(that.selected_element.style.width),
            //handles: 'n, e, s, w',
            handles: that.selected_element.dataset.type == 'text' ? 'e, w' : 'n, e, s, w',
            resize: function (event, ui) {
                //console.log('resize on element', event.target);

                ui.size.height = Math.round(ui.size.height / 30) * 30;
                ui.size.width = Math.round(ui.size.width / 30) * 30;

                //console.log('ui', ui);
                //console.log('ui.originalSize', ui.originalSize);

                var elementIndex: any = 0;
                var guid = event.target.dataset.guid;
                //find the element object from the design variable for this guid
                var elements = that.design['pages'][that._current_page_no - 1].elements;
                for (var i in elements) {
                    if (guid == elements[i].guid) {
                        elementIndex = i;
                    }
                }
                
                var changeWidth: any = 0;
                if (ui.size.width > ui.originalSize.width) {
                    //width increased
                    changeWidth = ui.size.width - ui.originalSize.width;

                    // console.log('ui.size.width', ui.size.width);
                    // console.log('ui.originalSize.width', ui.originalSize.width);
                    // console.log('changeWidth', changeWidth);

                    // console.log("that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']", that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']);
                    // console.log("that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']", that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']);

                    // var transformX = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']) - parseInt(changeWidth);
                    // var transformY = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']);
                    // that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transform'] = 'translate(' + transformX + 'px# ' + transformY + 'px)';
                    // that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX'] = transformX;
                    // that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY'] = transformY;
                } else {
                    //width decreased
                    changeWidth = ui.originalSize.width - ui.size.width;

                    // var transformX = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']) - parseInt(changeWidth);
                    // var transformY = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']);
                    // that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transform'] = 'translate(' + transformX + 'px# ' + transformY + 'px)';
                    // that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX'] = transformX;
                    // that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY'] = transformY;
                }

                that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['height'] = ui.size.height + 'px';
                that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['width'] = ui.size.width + 'px';
            }
        }).rotatable({
            start: function(event, ui) {
                that.selected_element.style.transform = oldRotateStyleValue;
            },
            rotate: function(event, ui) {
                //console.log('ui', ui);
                that.fontPropertyChanged('rotate', ui.angle.current);
            },
        });

        that.selected_element.style.transform = oldRotateStyleValue;

        this.setUIOptions();
    }

    manageElement($event) {
        this.hideAllOptions();

        if ($event) {
            switch ($event.target.dataset.type) {
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
        this.pushElementToDesignObject(this._current_page_no - 1, this.design['pages'][this._current_page_no - 1].elements[this.selected_element_object_id]);
    }

    deleteElement() {
        this.design['pages'][this._current_page_no - 1].elements.splice(this.selected_element_object_id, 1);

        //hide all the options
        this.hideAllOptions();
    }

    
    setElementLocation(element) {
        //get the middle of the page
        var x = parseInt(this.page_size.width) / 2;
        var y = parseInt(this.page_size.height) / 3;

        //x = 0;
        //y = 0;

        element.style['transform'] = 'translate(' + x + 'px# ' + y + 'px)';
        element.style['transformX'] = x;
        element.style['transformY'] = y;
        return element;
    }

    setUIOptions() {
        var that = this;

        setTimeout(function() {
            $(".single_element").on({
                mouseenter: function () {
                    //console.log('hovered in');
                    $(this).draggable({
                        cursor: "move",
                        containment: "#single_page_"+(that._current_page_no - 1),
                        scroll: false,
                        drag: function(event, ui) {
                            //console.log('dragged event', event);
                            //console.log('dragged ui', ui);

                            var elementIndex: any = 0;
                            var guid = event.target.dataset.guid;
                            //find the element object from the design variable for this guid
                            var elements = that.design['pages'][that._current_page_no - 1].elements;
                            for (var i in elements) {
                                if (guid == elements[i].guid) {
                                    elementIndex = i;
                                }
                            }

                            that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['top'] = ui.position.top+"px";
                            that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['left'] = ui.position.left+"px";

                            // var changeTop: any = 0;
                            // if (ui.position.top > ui.originalPosition.top) {
                            //     //dragged downwards
                            //     changeTop = ui.originalPosition.top - ui.position.top;
                                
                            //     var transformX = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']);
                            //     var transformY = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']) + parseInt(changeTop);
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transform'] = 'translate(' + transformX + 'px# ' + transformY + 'px)';
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX'] = transformX;
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY'] = transformY;
                            // } else {
                            //     //dragged upwards
                            //     changeTop = ui.position.top - ui.originalPosition.top;

                            //     var transformX = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']);
                            //     var transformY = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']) - parseInt(changeTop);
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transform'] = 'translate(' + transformX + 'px# ' + transformY + 'px)';
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX'] = transformX;
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY'] = transformY;
                            // }

                            // var changeLeft: any = 0;
                            // if (ui.position.left > ui.originalPosition.left) {
                            //     //dragged leftwards
                            //     changeLeft = ui.originalPosition.left - ui.position.left;

                            //     var transformX = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']) - parseInt(changeLeft);
                            //     var transformY = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']);
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transform'] = 'translate(' + transformX + 'px# ' + transformY + 'px)';
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX'] = transformX;
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY'] = transformY;
                            // } else {
                            //     //dragged rightwards
                            //     changeLeft = ui.position.left - ui.originalPosition.left;

                            //     var transformX = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX']) + parseInt(changeLeft);
                            //     var transformY = parseInt(that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY']);
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transform'] = 'translate(' + transformX + 'px# ' + transformY + 'px)';
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformX'] = transformX;
                            //     that.design['pages'][that._current_page_no - 1].elements[elementIndex].style['transformY'] = transformY;
                            // }
                        },
                    });
                },
            });
        }, 100);
    }

    pushElementToDesignObject(current_page_no, element) {
        //generate a random identifier for this element
        var elem = $.extend(true, {}, element);

        elem.guid = this.generateId();
        //elem = this.setElementLocation(elem);
        this.design['pages'][current_page_no].elements.push(elem);
        
        this.setUIOptions();
    }

    updateSelectedElementStyle(newStyles) {
        for (var newStyleIndex in newStyles) {
            if(newStyleIndex == 'z-index') {
                var oldZIndex = parseInt(this.design['pages'][this._current_page_no - 1].elements[this.selected_element_object_id].style['z-index']);
                var newZIndex = 0;

                if(newStyles[newStyleIndex] == 'increment') {
                    if(oldZIndex) {
                        newZIndex = oldZIndex + 1;
                    } else {
                        newZIndex = 1;
                    }
                } else if(newStyles[newStyleIndex] == 'decrement') {
                    if(oldZIndex) {
                        newZIndex = oldZIndex - 1;
                    } else {
                        newZIndex = -1;
                    }
                }
                if(newZIndex < 0) {
                    newZIndex = 0;
                }
                this.design['pages'][this._current_page_no - 1].elements[this.selected_element_object_id].style[newStyleIndex] = newZIndex;
            } else {
                this.design['pages'][this._current_page_no - 1].elements[this.selected_element_object_id].style[newStyleIndex] = newStyles[newStyleIndex];
            }
        }
    }

    fontPropertyChanged(type, $event) {
        var newStyles = {};

        switch (type) {
            case 'font-family':
            case 'font-size':
            case 'line-height':
            case 'opacity':
                newStyles[type] = $event.target.value;
                break;

            case 'letter-spacing':
                newStyles[type] = $event.target.value + 'px';
                break;

            case 'font-style':
                if ($event == 'normal') {
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

            case 'filter':
                switch ($event) {
                    case 'normal':
                        //brightness
                        this.brightness = 50;
                        newStyles['-webkit-filter'] = "brightness(50%)";
                        newStyles['filter'] = "brightness(50%)";

                        //contrast
                        this.contrast = 50;
                        newStyles['-webkit-filter'] = "contrast(50%)";
                        newStyles['filter'] = "contrast(50%)";

                        //saturate
                        this.saturation = 0;
                        newStyles['-webkit-filter'] = "saturate(0)";
                        newStyles['filter'] = "saturate(0)";

                        //blur
                        this.blur = 0;
                        newStyles['-webkit-filter'] = "blur(0px)";
                        newStyles['filter'] = "blur(0px)";
                        break;

                    default:
                        break;
                }
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

            case 'rotate':
                newStyles['-webkit-transform'] = "rotate(" + $event + "rad)";
                newStyles['transform'] = "rotate(" + $event + "rad)";
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

            case 'z-index':
                newStyles['z-index'] = $event;
                break;

            case 'tint':
            case 'x_process':
            case 'vignette':
                break;

            default:
        }

        if (Object.keys(newStyles).length) {
            this.updateSelectedElementStyle(newStyles);
        }
    }

    insertElement(element) {
        this.pushElementToDesignObject(this._current_page_no - 1, element);
    }
}