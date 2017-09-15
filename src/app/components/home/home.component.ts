import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SharedService} from './../shared/service/shared.service';
import {templateList} from './../shared/data/templates';

@Component({
    selector: 'canvas-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    //Variables
    public loggedInUserData;
    public templates;
    public show_my_designs = true;

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

        if (this._activatedRoute.snapshot.url[0].path == 'create-a-design') {
            //Hide the "My Designs" section and load all the designs.
            this.show_my_designs = false;
        }

        this.loggedInUserData = this._sharedService.getLoggedInUserData();
    }

    //Angular Hooks
    ngOnInit() {
        this.templates = templateList;
        
        this._sharedService.getStorageService().getLocal().clear('activeDesignId');
        this._sharedService.getStorageService().getLocal().clear('activeTemplateId');
        this._sharedService.getStorageService().getLocal().clear('activeDesign');
    }

    //Custom Methods
    loadTemplate(template) {
        this._router.navigate(['/design'], {queryParams: {action: 'create', template: template.uuid}});
    }

    logout() {
        this._sharedService.getAuthService().logout();
        this._sharedService.loginEventEmitter.emit(false);
        this._router.navigate(['']);
    }
}