(function(window, angular, undefined) {
  'use strict';

  var AccessData = ['$http', 'CONFIG', function($http, CONFIG){
    var _this = this;

    var url = {
      login: CONFIG.api + 'login' + CONFIG.api_post,
      recover_password: CONFIG.api + 'recover_password' + CONFIG.api_post,
      request_validation_account: CONFIG.api + 'request_validation_account' + CONFIG.api_post,
      registration: CONFIG.api + 'registration' + CONFIG.api_post,
      activation_account: CONFIG.api + 'validation_account' + CONFIG.api_post
    };

    _this.Login = function(params){
      params = params ? params : {};

      console.log('Login params: ', params);

      var request = $http({method: 'post', url: url.login, data: params});

      return request;
    };

    _this.RecoverPassword = function(params){
      params = params ? params : {};

      var request = $http({method: 'post', url: url.recover_password, data: params});

      return request;
    };

    _this.RequestValidationAccount = function(params){
      params = params ? params : {};

      var request = $http({method: 'post', url: url.request_validation_account, data: params});

      return request;
    };

    _this.Registration = function(params){
      params = params ? params : {};

      var request = $http({method: 'post', url: url.registration, data: params});

      return request;
    };

    _this.ActivationAccount = function(params){
      params = params ? params : {};

      var request = $http({method: 'post', url: url.activation_account, data: params});

      return request;
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('AccessData', AccessData);

})(window, window.angular);