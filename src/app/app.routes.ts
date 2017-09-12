import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';

import {SharedCanActivateAuthService} from './components/shared/service/shared-can-activate-auth.service';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [SharedCanActivateAuthService]
    },
    {path: '**', pathMatch: 'full', redirectTo: '/login'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutes {}
