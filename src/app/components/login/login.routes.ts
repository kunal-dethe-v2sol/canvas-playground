import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login.component';

import {SharedCanActivateAuthService} from './../shared/service/shared-can-activate-auth.service';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
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
export class LoginRoutes {}
