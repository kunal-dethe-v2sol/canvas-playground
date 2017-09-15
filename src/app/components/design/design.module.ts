import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CompileModule} from "p3x-angular-compile"
import {ViewportModule} from 'angular2-viewport';
import {InViewportModule} from 'ng-in-viewport';
import 'intersection-observer';

import {DesignRoutes} from './design.routes';
import {DesignComponent} from './design.component';
import {DesignEditComponent} from './edit/design-edit.component';

@NgModule({
    declarations: [
        DesignComponent,
        DesignEditComponent
    ],
    imports: [
        CommonModule,
        CompileModule.forRoot({
            module: {
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }
        }),
        ViewportModule,
        InViewportModule.forRoot(),
        DesignRoutes
    ],
    providers: []
})
export class DesignModule {}
