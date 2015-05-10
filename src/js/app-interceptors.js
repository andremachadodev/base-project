(function(window, angular, undefined) {
  'use strict';

  var AuthInterceptor = ['$location', '$q', 'CONFIG', 'Storage', 'UserSession', 'Loader', function($location, $q, CONFIG, Storage, UserSession, Loader){

    var error_handler = function(rejection){
      var is_service = rejection.config.url.indexOf(CONFIG.api) !=-1;

      console.log('Error Handler: ', is_service, rejection.status);

      if(is_service){
        // Feedback quando um serviço der problema
      }else{
        $location.path('/error/' + rejection.status);
      }
    };

    return({
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

          Loader.Settings.className = 'loader_service';
        }else{
          config.headers.ContentType = 'text/html';

          Loader.Settings.className = 'loader_view';
        }

        Loader.Start();

        return config;
      },
      requestError: function(rejection){
        console.log('AuthInterceptor - Request Error: ', rejection);

        Loader.End();

        return $q.reject(rejection);
      },
      response: function(response){
        console.log('AuthInterceptor - Response: ', response);

        console.log('RESPONSE: ', Loader);

        Loader.End();

        return response;
      },
      responseError: function(rejection){
        console.log('AuthInterceptor - Response Error: ', rejection);

        error_handler(rejection);

        Loader.End();

        return $q.reject(rejection);
      }
    });
  }];

  angular
    .module('Interceptors', [])
    .factory('AuthInterceptor', AuthInterceptor);

})(window, window.angular);










