"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.signupURL = 'http://localhost:3000/user/signup';
        this.loginURL = 'http://localhost:3000/user/login';
    }
    UserService.prototype.signupUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.signupURL, user, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.loginUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log("Login process...");
        return this.http.post(this.loginURL, user, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        console.error("User function error");
        console.error('An error occured (user)', error);
        return Promise.reject(error.message || error);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map