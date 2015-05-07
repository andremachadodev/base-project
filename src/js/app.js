var App = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'Directives', 'Helpers', 'Interceptors']);

App.constant("CONFIG", {
  "api": "../mockdata/",
  "views": "../views/",
  "session_ns": "Sess"
});

App.config(['CONFIG', '$routeProvider', '$httpProvider', '$locationProvider', function(CONFIG, $routeProvider, $httpProvider, $locationProvider){

  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    // Access
    .when(
      '/',
      {templateUrl: CONFIG.views + 'foo/index.html', controller: 'Foo'}
    )
    .when(
      '/foo',
      {templateUrl: CONFIG.views + 'foo/index.html', controller: 'Foo'}
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

}]);

App.run(function($rootScope, $location){
  $rootScope.$on("$routeChangeStart", function(event, next, current){
    //console.log('ROUTE CHANGE START', $location.$$path);
  });

  $rootScope.$on("$routeChangeSuccess", function(){
    //console.log('ROUTE CHANGE SUCCESS');
  });

  $rootScope.$on('$viewContentLoaded', function(scope){
    //console.log('VIEW CONTENT LOADED');
  });

  $rootScope.$on("$routeChangeError", function(){
    //console.log('ROUTE CHANGE ERROR');
  });
});








