(function(window, angular, undefined) {
  'use strict';

  /** 
   * Authentication interceptor
   * 
   * Intercept all $http requests, setting specific headers for a web-service request and contextualize loader icon to btoh cases
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var AuthInterceptor = ['$q', 'CONFIG', 'Storage', 'UserSession', 'Loader', function($q, CONFIG, Storage, UserSession, Loader){

    var error_handler = function(type, rejection){
      console.log('AuthInterceptor - '+ type +' Error: ', rejection);

      var is_service   = rejection.config ? rejection.config.url.indexOf(CONFIG.api) !=-1 : true,
          status_error = rejection.status ? rejection.status : "000";

      console.log('Error Handler: ', is_service, status_error);

      if(is_service){
        // TODO: Decidir como será o feedback para esses casos
        console.log('IS SERVICE');
      }else{
        console.log('IS NOT SERVICE', '/error/' + status_error);

        //$state.go('/error', {status: status_error});
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

        //Loader.Start();

        return config;
      },
      requestError: function(rejection){
        error_handler('Request', rejection);

        //Loader.End();

        return $q.reject(rejection);
      },
      response: function(response){
        console.log('AuthInterceptor - Response: ', response);

        //Loader.End();

        return response;
      },
      responseError: function(rejection){
        error_handler('Response', rejection);

        //Loader.End();

        return $q.reject(rejection);
      }
    });
  }];

  angular
    .module('app')
    .factory('AuthInterceptor', AuthInterceptor);

})(window, window.angular);










