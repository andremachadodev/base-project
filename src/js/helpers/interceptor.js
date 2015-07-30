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
  var AuthInterceptor = ['$q', '$injector', 'CONFIG', 'Storage', 'UserSession', 'Loader', function($q, $injector, CONFIG, Storage, UserSession, Loader){

    var error_handler = function(type, rejection){
      //console.log('AuthInterceptor - '+ type +' Error: ', rejection);

      var is_service   = rejection.config ? rejection.config.url.indexOf(CONFIG.api) !=-1 : true,
          status_error = rejection.status ? rejection.status : "500";

      //console.log('Error Handler: ', is_service, status_error);

      if(is_service){
        // TODO: Decidir como será o feedback para esses casos
        console.log('SERVICE ERROR!', type, rejection);

        //console.log('IS SERVICE');
      }
    };

    return({
      request: function(config){
        //console.log(' ');

        var is_service = config.url.indexOf(CONFIG.api) !=-1;

        if(is_service){
          UserSession.CheckToken(function(){ $q.reject(config); });

          if( config.headers['Content-Type'] === 'content-file' ){
            config.headers = {
              'Content-Type': undefined
            };

          }else{
            config.headers = {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/javascript'
            };

          }

          var user_session = Storage.Get(CONFIG.session_ns);

          if( user_session && user_session.user_token ){
            config.headers.Token = user_session.user_token;

          }

          console.info('AuthInterceptor - Request: ', config, config.url);

          //Loader.Settings.className = 'loader_service';

        }else{
          UserSession.CheckArea(function(){ $q.reject(config); });
        }

        //Loader.Start();
        
        console.log(config.headers);

        return config;
      },
      requestError: function(rejection){
        error_handler('Request', rejection);

        //Loader.End();

        return $q.reject(rejection);
      },
      response: function(response){
        //console.log('AuthInterceptor - Response: ', response);

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










