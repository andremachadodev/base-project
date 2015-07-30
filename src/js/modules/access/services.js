(function(window, angular, undefined) {
  'use strict';

  var AccessData = ['$http', 'CONFIG', function($http, CONFIG){
    var _this = this;

    var url = {
      login: CONFIG.api + 'login-POST.js',
      recover_password: CONFIG.api + 'recover_password-POST.js',
      request_validation_account: CONFIG.api + 'request_validation_account-POST.js'
    };

    _this.Login = function(params){
      params = params ? params : {};

      var request = $http.post(url.login, params);

      return request;
    };

    _this.RecoverPassword = function(params){
      params = params ? params : {};

      var request = $http.post(url.recover_password, params);

      return request;
    };

    _this.AccountValidate = function(){
      var request = $http.post(url.recover_password);

      return request;
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('AccessData', AccessData);

})(window, window.angular);