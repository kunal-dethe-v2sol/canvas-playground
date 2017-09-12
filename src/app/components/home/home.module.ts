import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {HomeRoutes} from './home.routes';
import {HomeComponent} from './home.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutes
    ],
    providers: []
})
export class HomeModule {}
