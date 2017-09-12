import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditorRoutes } from './editor.routes';
import {EditorComponent} from './editor.component';

@NgModule({
    declarations: [
        EditorComponent,
    ],
    imports: [
        CommonModule,
        EditorRoutes
    ],
    providers: []
})
export class HomeModule {}
