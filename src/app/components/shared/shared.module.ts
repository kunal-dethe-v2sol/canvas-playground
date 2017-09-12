import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {SharedService} from './service/shared.service';
import {SharedAuthService} from './service/shared-auth.service';
import {SharedHttpService} from './service/shared-http.service';
import {SharedStorageService} from './service/shared-storage.service';
import {SharedToastrService} from './service/shared-toastr.service';
import {SharedCustomValidationService} from './service/shared-custom-validation.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    providers: [
        SharedAuthService,
        SharedHttpService,
        SharedService,
        SharedStorageService,
        SharedToastrService,
        SharedCustomValidationService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    bootstrap: [],
})
export class SharedModule {}
