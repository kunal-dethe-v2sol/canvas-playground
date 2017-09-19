import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DesignComponent} from './design.component';

import { SharedCanActivateAuthService } from './../shared/service/shared-can-activate-auth.service';

const routes: Routes = [
    {
        path: 'design',
        component: DesignComponent,
        canActivate: [SharedCanActivateAuthService]
    },
    {
        path: 'design/:design_id',
        pathMatch: 'full',
        redirectTo: 'design/:design_id/edit'
    },
    {
        path: 'design/:design_id/edit',
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
export class DesignRoutes {}
