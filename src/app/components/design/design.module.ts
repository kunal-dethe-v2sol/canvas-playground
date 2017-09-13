import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DesignRoutes} from './design.routes';
import {DesignComponent} from './design.component';

@NgModule({
    declarations: [
        DesignComponent,
    ],
    imports: [
        CommonModule,
        DesignRoutes
    ],
    providers: []
})
export class DesignModule {}
