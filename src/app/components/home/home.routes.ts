import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';

import {SharedCanActivateAuthService} from './../shared/service/shared-can-activate-auth.service';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [SharedCanActivateAuthService]
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutes {}
