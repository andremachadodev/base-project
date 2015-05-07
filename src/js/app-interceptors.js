(function(window, angular, undefined) {'use strict';

  var Interceptors = angular.module('Interceptors', []);

  Interceptors.factory('AuthInterceptor', ['$location', '$q', 'CONFIG', 'Storage', 'UserSession', function($location, $q, CONFIG, Storage, UserSession){

    var error_handler = function(is_service, status, status_text){
      console.log('Error Handler: ', is_service, status, status_text);

      if(is_service){
        // Feedback quando um serviço der problema
      }else{
        $location.path('/error/' + status);
      }
    };

    return {
      request: function(config){
        console.log(' ');
        console.info('AuthInterceptor - Request: ', config.url);

        UserSession.Check(function(){ $q.reject(config); });

        var is_service = config.url.indexOf(CONFIG.api) !=-1;

        if(is_service){
          config.useXDomain = true;

          delete config.headers['X-Requested-With'];

          config.headers.Accept      = 'application/json, text/javascript';
          config.headers.ContentType = 'application/json';

          if(config.method == 'POST'){
            config.headers.ContentType = "application/x-www-form-urlencoded";
          }

          var user_session = Storage.Get(CONFIG.session_ns);

          if( user_session && user_session.user_token ){
            config.headers.Authorization = user_session.user_token_type +' '+ user_session.user_token;
          }
        }else{
          config.headers.ContentType = 'text/html';
        }

        return config;
      },
      requestError: function(rejection){
        console.log('AuthInterceptor - Request Error: ', rejection);

        return $q.reject(rejection);
      },
      response: function(response){
        console.log('AuthInterceptor - Response: ', response);

        return response;
      },
      responseError: function(rejection){
        console.log('AuthInterceptor - Response Error: ', rejection);

        var is_service = rejection.config.url.indexOf(CONFIG.api) !=-1;

        error_handler(is_service, rejection.status, rejection.statusText);

        return $q.reject(rejection);
      }
    };

  }]);

})(window, window.angular);










