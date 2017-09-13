import {Component, OnInit, ViewChild, animate, transition, trigger, state, style} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

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
        ])
    ]
})
export class DesignComponent implements OnInit {

    //Variables
    private _action;
    private _type;
    public design_id;

    data:any;

    @ViewChild('cropper', undefined)
    cropper:ImageCropperComponent;
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
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
}


state: string = 'default';

    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }

}





