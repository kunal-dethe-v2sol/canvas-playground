import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD:src/app/components/editor/editor.routes.ts
import { EditorComponent } from './editor.component';
=======
import {DesignComponent} from './design.component';
>>>>>>> master:src/app/components/design/design.routes.ts

import { SharedCanActivateAuthService } from './../shared/service/shared-can-activate-auth.service';

const routes: Routes = [
    {
        path: 'design',
        component: DesignComponent,
        canActivate: [SharedCanActivateAuthService]
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ],
})
<<<<<<< HEAD:src/app/components/editor/editor.routes.ts
export class EditorRoutes {}
=======
export class DesignRoutes {}
>>>>>>> master:src/app/components/design/design.routes.ts
