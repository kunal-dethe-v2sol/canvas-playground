import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CompileModule} from "p3x-angular-compile"

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
        DesignRoutes
    ],
    providers: []
})
export class DesignModule {}
