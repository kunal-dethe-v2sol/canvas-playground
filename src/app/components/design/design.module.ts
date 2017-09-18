import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DesignRoutes } from './design.routes';
import { DesignComponent } from './design.component';
import { ImageCropperComponent } from 'ng2-img-cropper';

@NgModule({
    declarations: [
        DesignComponent,
        ImageCropperComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DesignRoutes
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: []
})
export class DesignModule {}
