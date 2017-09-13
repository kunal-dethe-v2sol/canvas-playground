import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Ng2Webstorage} from 'ng2-webstorage';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule} from 'angular2-toaster';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SharedHeaderGuestComponent} from './components/shared/header/guest/shared-header-guest.component';
import {SharedNavigationTopGuestComponent} from './components/shared/navigation/top/guest/shared-navigation-top-guest.component';
import {SharedFooterGuestComponent} from './components/shared/footer/guest/shared-footer-guest.component';
import {SharedHeaderUserComponent} from './components/shared/header/user/shared-header-user.component';
import {SharedNavigationTopUserComponent} from './components/shared/navigation/top/user/shared-navigation-top-user.component';
import {SharedFooterUserComponent} from './components/shared/footer/user/shared-footer-user.component';

import {AppRoutes} from './app.routes';

import {SharedModule} from './components/shared/shared.module';
import {HomeModule} from './components/home/home.module';
import {LoginModule} from './components/login/login.module';

import {SharedCanActivateAuthService} from './components/shared/service/shared-can-activate-auth.service';

@NgModule({
    declarations: [
        AppComponent,
        SharedHeaderGuestComponent,
        SharedNavigationTopGuestComponent,
        SharedFooterGuestComponent,
        SharedHeaderUserComponent,
        SharedNavigationTopUserComponent,
        SharedFooterUserComponent
    ],
    imports: [
        BrowserModule,
        Ng2Webstorage,
        Ng2Webstorage.forRoot({prefix: 'linkcxo', separator: '.', caseSensitive: true}),
        BrowserAnimationsModule,
        ToasterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        SharedModule,
        HomeModule,
        LoginModule,
        AppRoutes,
    ],
    providers: [
        SharedCanActivateAuthService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}
