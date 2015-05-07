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

    // Default
    .when(
      '/xpto',
      {templateUrl: 'xpto.html'}
    )
    
    .otherwise({
      redirectTo: '/xpto' // Causing error that taked by interceptor, then will call erro page passing status code
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








