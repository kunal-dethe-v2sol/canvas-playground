import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

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
        DesignRoutes
    ],
    providers: []
})
export class DesignModule {}
