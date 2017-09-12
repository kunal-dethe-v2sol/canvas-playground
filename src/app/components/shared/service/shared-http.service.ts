import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import {CONST} from './../shared.constants';
import {SharedToastrService} from './shared-toastr.service';
import {SharedAuthService} from './../service/shared-auth.service';

@Injectable()
export class SharedHttpService {
    private _headers: Headers;
    private _options: RequestOptions;
    private _apiUrl = CONST['apiURL'];

    //Constructor parameters
    static get parameters() {
        return [
            Http,
            SharedToastrService,
            SharedAuthService
        ];
    }

    constructor(
        private _http,
        private _sharedToastrService,
        private _sharedAuthService) {

        
    }

    prepareHeaders() {
        this._headers = new Headers({
            'Authorization': 'Bearer ' + this._sharedAuthService.getLoggedInUserToken(),
            //'Content-Type': 'multipart/form-data'
        });
        
        this._options = new RequestOptions({
            headers: this._headers
        });
    }

   get(endpoint, params = null) {
       this.prepareHeaders();

        var that = this;
        endpoint += '.json';
        var queryString = params ? that._objectToQueryString(params) : '';
        endpoint = endpoint + (queryString ? '?' + queryString : '');
        return that._http
            .get(that._apiUrl + endpoint, that._options)
            .map(function (response) {
                return that._extractData(response);
            })
            .catch(function (error) {
                return that._handleError(error);
            });
    }

    post(endpoint, data, params = null) {
        this.prepareHeaders();

        var that = this;
        endpoint += '.json';
        var queryString = params ? this._objectToQueryString(params) : '';
        endpoint = endpoint + (queryString ? '?' + queryString : '');
        return this._http
            .post(this._apiUrl + endpoint, data, this._options)
            .map(function (response) {
                return that._extractData(response);
            })
            .catch(function (error) {
                return that._handleError(error);
            });
    }

    put(endpoint, data, params = null) {
        this.prepareHeaders();

        var that = this;
        endpoint += '.json';
        var queryString = params ? this._objectToQueryString(params) : '';
        endpoint = endpoint + (queryString ? '?' + queryString : '');
        return this._http
            .put(this._apiUrl + endpoint, data, this._options)
            .map(function (response) {
                return that._extractData(response);
            })
            .catch(function (error) {
                return that._handleError(error);
            });
    }

    delete(endpoint, data = {}, params = null) {
        this.prepareHeaders();
        
        var that = this;
        endpoint += '.json';
        var queryString = params ? this._objectToQueryString(params) : '';
        endpoint = endpoint + (queryString ? '?' + queryString : '');

        var options = JSON.parse(JSON.stringify(this._options));
        options['method'] = RequestMethod.Delete;
        options['body'] = data;
        
        return this._http
            .delete(this._apiUrl + endpoint, options)
            .map(function (response) {
                return that._extractData(response);
            })
            .catch(function (error) {
                return that._handleError(error);
            });
    }

    private _objectToQueryString(object) {
        return Object
            .keys(object)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
            .join('&');
    }

    private _extractData(res: Response) {
        var that = this;
        if (res.status == 500) {
            let body = <any> res.json().response;
            that._sharedToastrService.pop('error', 'Error', body);
        } else {
            let body = <any> res.json().response;
            if (body) {
                body = Object.keys(body).map(key => body[key]);
            }
            return body || {};
        }
    }

    private _handleError(error: any) {
        var that = this;
        let errMsg = error.status ? error.statusText : 'Some error occured.';
        that._sharedToastrService.pop('error', 'Error', errMsg);
        return Observable.throw(error);
    }
}
