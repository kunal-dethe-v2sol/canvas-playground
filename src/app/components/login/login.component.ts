import {Component, OnInit, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {SharedService} from './../shared/service/shared.service';
import {LoginService} from './login.service';

@Component({
    selector: 'canvas-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    //Variables
    loginForm: FormGroup;
    email: FormControl;
    password: FormControl;

    //Constructor parameters
    static get parameters() {
        return [
            LoginService,
            SharedService,
            Router,
            ActivatedRoute,
            Location
        ];
    }

    //Constructor
    constructor(private _loginService,
        private _sharedService,
        private _router,
        private _activeroute,
        private _socialService,
        private _location) {


    }

    //Angular Hooks
    ngOnInit() {
        this.createFormControls();
        this.createForm();

    }

    createFormControls() {
        this.email = new FormControl('kunal.dethe@v2solutions.com', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.password = new FormControl('admin@123', [
            Validators.required,
            Validators.maxLength(10)
        ]);
    }

    createForm() {
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password,
        });
    }

    onSubmit(data): void {
        if(data.email && data.password) {
            if(data.email == 'kunal.dethe@v2solutions.com' && data.password == 'admin@123') {
                var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRjYTZiOGMxLTliYTQtNGMwNy1hN2M4LTNiNjNmNTU4MGI0NSIsInN1YiI6ImRjYTZiOGMxLTliYTQtNGMwNy1hN2M4LTNiNjNmNTU4MGI0NSIsImV4cCI6MTUwNTgyMTUzMywidXNlciI6eyJ1dWlkIjoiZGNhNmI4YzEtOWJhNC00YzA3LWE3YzgtM2I2M2Y1NTgwYjQ1IiwicmVnaXN0cmF0aW9uX3R5cGUiOiJhZG1pbi1pbnZpdGUiLCJzb2NpYWxfdHlwZSI6ImxpbmtjeG8iLCJmaXJzdG5hbWUiOiJLdW5hbCIsImxhc3RuYW1lIjoiRGV0aGUiLCJtb2JpbGVfbm8iOiI3ODk0NjUxMzIwIiwiYWx0X21vYmlsZSI6bnVsbCwibWFyaXRhbF9zdGF0dXMiOm51bGwsImdlbmRlciI6bnVsbCwiZG9iIjpudWxsLCJjb3VudHJ5X2lkIjpudWxsLCJzdGF0ZV9pZCI6bnVsbCwiY2l0eV9pZCI6bnVsbCwiemlwY29kZSI6bnVsbCwicHJvZmlsZV9pbWFnZSI6bnVsbCwiaGVhZGxpbmUiOm51bGwsInRva2VucyI6bnVsbCwiZmxhZ19tb2JpbGUiOiJ1bi12ZXJpZmllZCIsImZsYWdfYWx0X21vYmlsZSI6InVuLXZlcmlmaWVkIiwicm9sZV9pZCI6IjRkY2ZlN2Q0LWMxNjgtNGQyNS1iZWU1LTE3NWY2ZDM4MDU5ZSIsInRvdGFsX2V4cCI6bnVsbCwia2V5X3NraWxscyI6bnVsbCwic3VtbWFyeSI6bnVsbCwicmVzdW1lMSI6bnVsbCwicmVzdW1lMiI6bnVsbCwicmVzdW1lX3R5cGUxIjpudWxsLCJyZXN1bWVfdHlwZTIiOm51bGwsInByb2ZpbGVfc25hcHNob3QiOm51bGwsInN0YXR1cyI6ImFjdGl2ZSIsImZ1bGxfbmFtZSI6Ikt1bmFsIERldGhlIn19.QY2NU8DxP0J2gDQbAyN4wIiJNw9mzGIzvJWG03bybvw';
                this._sharedService.getAuthService().login({token: token});
                this._sharedService.loginEventEmitter.emit(true);
                this._router.navigate(['home']);
            } else {
                this._sharedService.getToastrService().pop('error', 'Error', 'Invalid Email or Password!');
            }
        }

    }
}
