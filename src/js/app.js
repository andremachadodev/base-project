var App = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'appDirectives', 'appHelpers']);

App.constant("PATH", {
  "api": "../../mockdata/",
  "views": "../../views/"
});

App.config(['PATH', '$routeProvider', '$locationProvider', function(PATH, $routeProvider, $locationProvider){

  $routeProvider
    // Access
    .when(
      '/',
      {templateUrl: PATH.views + 'home/index.html', controller: 'Home'}
    )

    // Error handlers
    .when(
      '/404',
      {templateUrl: PATH.views + 'handlers/404.html', controller: 'ErrorHandler'}
    )
    .when(
      '/401',
      {templateUrl: PATH.views + 'handlers/401.html', controller: 'ErrorHandler'}
    )
    .when(
      '/405',
      {templateUrl: PATH.views + 'handlers/405.html', controller: 'ErrorHandler'}
    )
    .when(
      '/500',
      {templateUrl: PATH.views + 'handlers/500.html', controller: 'ErrorHandler'}
    )
    .otherwise({
      redirectTo: '/404'
    });

}]);

App.run(function($rootScope){
  $rootScope.$on("$routeChangeStart", function(event, next, current){
    console.log('ROUTE CHANGE START', event, next, current);
  });

  $rootScope.$on("$routeChangeSuccess", function(){
    console.log('ROUTE CHANGE SUCCESS');
  });

  $rootScope.$on('$viewContentLoaded', function(scope){
    console.log('VIEW CONTENT LOADED');
  });

  $rootScope.$on("$routeChangeError", function(){
    console.log('ROUTE CHANGE ERROR');
  });
});








