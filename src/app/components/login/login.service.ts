import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {SharedService} from './../shared/service/shared.service';

@Injectable()
export class LoginService {

    //Variables
    _endpoint = 'login';

    //Constructor parameters
    static get parameters() {
        return [
            SharedService
        ];
    }

    //Constructor
    constructor(
        private _sharedService) {


    }

    //Custom Methods
    login(data): Observable<any> {
        return this._sharedService.getHttpService().post(this._endpoint, data);
    }
}
