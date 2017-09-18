import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService } from './../shared/service/shared.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
    selector: 'canvas-design',
    templateUrl: './design.component.html',
    animations: [
          // Each unique animation requires its own trigger. The first argument of the trigger function is the name
          trigger('rotatedState', [
                                state('default', style({ transform: 'rotate(0)' })),
                                state('rotated', style({ transform: 'rotate(-180deg)' })),
                                transition('rotated => default', animate('400ms ease-out')),
                                transition('default => rotated', animate('400ms ease-in'))
        ]),
        trigger('transparentState', [
                                state('default', style({ opacity: 1 })),
                                state('transparent', style({  opacity: 0.9 })),
                                state('transparent1', style({  opacity: 0.8 })),
                                state('transparent2', style({  opacity: 0.7 })),
                                state('transparent3', style({  opacity: 0.6 })),
                                state('transparent4', style({  opacity: 0.5 })),
                                state('transparent5', style({  opacity: 0.4 })),
                                state('transparent6', style({  opacity: 0.3 })),
                                state('transparent7', style({  opacity: 0.2 })),
                                state('transparent8', style({  opacity: 0.1 })),
                                transition('default => transparent', animate('400ms ease-in')),
                                transition('transparent => transparent1', animate('400ms ease-in')),
                                transition('transparent1 => transparent2', animate('400ms ease-in')),
                                transition('transparent2 => transparent3', animate('400ms ease-in')),
                                transition('transparent3 => transparent4', animate('400ms ease-in')),
                                transition('transparent4 => transparent5', animate('400ms ease-in')),
                                transition('transparent5 => transparent6', animate('400ms ease-in')),
                                transition('transparent6 => transparent7', animate('400ms ease-in')),
                                transition('transparent7 => transparent8', animate('400ms ease-in')),
                                transition('transparent8 => default', animate('400ms ease-out')),
                                
        ])
    ]
})
export class DesignComponent implements OnInit {

    //Variables
    private _action;
    private _type;
    public design_id;
    public show = false;
    public show1 = false;
    public show2 = false;
    public imageStyle;

    data: any;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;
    cropperSettings: CropperSettings;

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
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.noFileInput = true;

        this.data = {};
    }

    //Angular Hooks
    ngOnInit() {
        this._activatedRoute
            .queryParams
            .subscribe(params => {
                this._action = params['action'];
                this._type = params['type'];

                if (this._action == 'create' && this._type) {
                    this.createDesign();
                }
            });
    }
    showdiv(): void { 
         this.show = !this.show;
    }
    showdiv1(): void {
        this.show1 = !this.show1;
    }
    showdiv2(): void {
        this.show2 = !this.show2;
    }

    //Custom Methods
    generateId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 30; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    createDesign() {
        this.design_id = this.generateId();
        this._sharedService.getStorageService().getLocal().store('activeDesignId', this.design_id);

        this._router.navigate(['/design', this.design_id, 'edit']);
    }

    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    }

    state: string = 'default';
    transparent() {
        this.state = (this.toggleStates());
    }

    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }

    filter() {
        var grayscale = {
             "-webkit-filter": "grayscale(100%)",
             "filter": "grayscale(100%)",
        }
        this.imageStyle = grayscale;
    }

    toggleStates() {
        switch(this.state) {
            case 'default':
                this.state = 'transparent';
                break;

            case 'transparent':
                this.state = 'transparent1';
                break;

            case 'transparent1':
                this.state = 'transparent2';
                break;

            case 'transparent2':
                this.state = 'transparent3';
                break;

            case 'transparent3':
                this.state = 'transparent4';
                break;
            
            case 'transparent4':
                this.state = 'transparent5';
                break;
            
            case 'transparent5':
                this.state = 'transparent6';
                break;
            
            case 'transparent6':
                this.state = 'transparent7';
                break;
            
            case 'transparent7':
                this.state = 'transparent8';
                break;

            case 'transparent8':
                this.state = 'default';
                break;

            default:
        }
        return this.state;
    }

}





