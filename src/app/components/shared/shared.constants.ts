export let mode: string = 'dev'; //possible values dev, qa, stg, prod

//API Url
if (mode == 'dev') {
    var apiURL: string = 'http://localhost/canvas-api/api/';
} else if (mode == 'qa') {
    var apiURL: string = 'http://localhost/canvas-api/api/';
} else if (mode == 'stg') {
    var apiURL: string = 'http://localhost/canvas-api/api/';
} else if (mode == 'prod') {
    var apiURL: string = 'http://localhost/canvas-api/api/';
}

//Pagination
var paginationLimitShortListing: number = 5;

//Ng2MDFValidationMessagesConfig
var ng2MDFValidationMessagesConfig = {
    defaultErrorMessages: {
        required: 'This field is required!',
        pattern: 'The input value does not match the pattern required!',
        email: 'Enter valid email address!',
        minLength: 'Minimum length is {0}!',
        maxLength: 'Maximum length is {0}!',
        minNumber: 'Minimal value is {0}!',
        maxNumber: 'Maximal value is {0}!',
        noEmpty: 'Only blank spaces are not allowed!',
        rangeLength: 'The input must be between {0} and {1} symbols long!',
        range: 'The input must be between {0} and {1}!',
        digit: 'The input must be a number!',
        equal: 'The input must be equal to {0}!',
        url: 'The input must be a valid URL!',
        date: 'The input must be a valid date!',
        areEqual: 'The input values in the group must match!',
        passwords: 'Both fields "Password" and "Confirm Password" must match!',
        unknownError: 'Unknown Error!'
    }
}

export let CONST: Object = {
    apiURL: apiURL,
    paginationLimitShortListing: paginationLimitShortListing,
    ng2MDFValidationMessagesConfig: ng2MDFValidationMessagesConfig,
};