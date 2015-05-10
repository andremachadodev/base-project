(function(window, angular, undefined){
  'use strict';

  var config = ['CONFIG', '$routeProvider', '$httpProvider', '$locationProvider', function(CONFIG, $routeProvider, $httpProvider, $locationProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
      // Access
      .when('/', {templateUrl: CONFIG.views + 'access/login.html', controller: 'Login'}
      )
      .when(
        '/foo',
        {templateUrl: CONFIG.views + 'access/login.html', controller: 'Login'}
      )

      // Error page
      .when(
        '/error/:status',
        {templateUrl: CONFIG.views + 'error/index.html', controller: 'Error'}
      )

      /*
        * 'xpto' is a fake route.

        * Why???
          * Let's go: if user call a absent section the route will call the 'xpto' describe on below otherwise condition.
          * AuthInterceptor will take 404 error because 'xpto' not have, the flow will changed calling /error section and passing status and statusText
          * The /error page showing the cause of error and a button to continue flow
      */
      .when(
        '/xpto',
        {templateUrl: 'xpto.html'}
      )
      .otherwise({
        redirectTo: '/xpto'
      });
  }];

  var ready = ['$rootScope', '$location', 'UserSession', function($rootScope, $location, UserSession){
    $rootScope.user_authenticated = false;

    $rootScope.$on("$routeChangeStart", function(event, next, current){
      $rootScope.user_authenticated = UserSession.Check();

      //console.log('$routeChangeStart', $location.$$path);
    });

    $rootScope.$on("$routeChangeSuccess", function(){
      //console.log('$routeChangeSuccess');
    });

    $rootScope.$on('$viewContentLoaded', function(scope){
      //console.log('$viewContentLoaded');
    });

    $rootScope.$on("$routeChangeError", function(){
      //console.log('$routeChangeError');
    });
  }];

  angular
    .module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'Directives', 'Helpers', 'Interceptors'])
    .constant("CONFIG", {
      "api": "../mockdata/",
      "views": "../views/",
      "session_ns": "MTSSess"
    })
    .config(config)
    .run(ready);

})(window, window.angular);
