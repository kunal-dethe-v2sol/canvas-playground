import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CompileModule} from "p3x-angular-compile";
//import {ViewportModule} from 'angular2-viewport';
//import {InViewportModule} from 'ng-in-viewport';
//import 'intersection-observer';
import {ImageUploadModule} from 'angular2-image-upload';

import {DesignRoutes} from './design.routes';
import {DesignComponent} from './design.component';
import {DesignEditComponent} from './edit/design-edit.component';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@NgModule({
    declarations: [
        DesignComponent,
        DesignEditComponent,
        ImageCropperComponent
    ],
    imports: [
        CommonModule,
        CompileModule.forRoot({
            module: {
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }
        }),
        //ViewportModule,
        //InViewportModule.forRoot(),
        ImageUploadModule.forRoot(),
        FormsModule,
        DesignRoutes
    ],
    providers: []
})
export class DesignModule {}
