(function(window, angular, undefined){
  'use strict';

  var Config = ['CONFIG', '$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', function(CONFIG, $stateProvider, $httpProvider, $urlRouterProvider, $locationProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

    //console.log('Config');

    $stateProvider
      // Access
      .state('start', {
          url:'/',
          templateUrl: CONFIG.views + 'access/login.html',
          controller: 'Login',
          controllerAs: 'vm_login'
      })
      .state('login', {
          url:'/login',
          templateUrl: CONFIG.views + 'access/login.html',
          controller: 'Login',
          controllerAs: 'vm_login'
      })
      .state('recover_password', {
          url:'/recover-password',
          templateUrl: CONFIG.views + 'access/recover_password.html',
          controller: 'RecoverPassword',
          controllerAs: 'vm_recover_password'
      })
      .state('account_validate', {
          url:'/account-validate',
          templateUrl: CONFIG.views + 'access/account_validate.html',
          controller: 'AccountValidate',
          controllerAs: 'vm_account_validate'
      })

      // Dashboard
      .state('dashboard', {
          url:'/dashboard',
          templateUrl: CONFIG.views + 'dashboard/index.html',
          controller: 'Dashboard',
          controllerAs: 'vm_dashboard'
      })

      // Tasks
      .state('tasks', {
          url:'/tasks/:param',

          //{board_title:.*?}{slash:[/]?}{board_id:[0-9]*?}{slash:[/]?}{start_date:[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]?}

          templateUrl: CONFIG.views + 'tasks/index.html',
          controller: 'Tasks', 
          controllerAs: 'vm_tasks'
      })

      // Boards
      .state('boards', {
          url:'/boards',
          templateUrl: CONFIG.views + 'boards/index.html',
          controller: 'Boards',
          controllerAs: 'vm_boards'
      })
      .state('boards.id', {
          url:'/boards/:id',
          templateUrl: CONFIG.views + 'boards/index.html',
          controller: 'Boards',
          controllerAs: 'vm_boards'
      })
      .state('boards.new', {
          url:'/boards/new',
          templateUrl: CONFIG.views + 'boards/new.html',
          controller: 'Boards',
          controllerAs: 'vm_boards'
      })

      // Members
      .state('members', {
          url:'/members',
          templateUrl: CONFIG.views + 'members/index.html',
          controller: 'Members',
          controllerAs: 'vm_members'
      })
      .state('members.id', {
          url:'/members/:id',
          templateUrl: CONFIG.views + 'members/detail.html',
          controller: 'Members',
          controllerAs: 'vm_members'
      })

      // Projects
      .state('projects', {
          url:'/projects',
          templateUrl: CONFIG.views + 'projects/index.html',
          controller: 'Projects',
          controllerAs: 'vm_projects'
      })
      .state('projects.id', {
          url:'/projects/:id',
          templateUrl: CONFIG.views + 'projects/detail.html',
          controller: 'Projects',
          controllerAs: 'vm_projects'
      })

      // My Account
      .state('account', {
          url:'/account',
          templateUrl: CONFIG.views + 'projects/index.html',
          controller: 'Account',
          controllerAs: 'vm_account'
      })
      .state('account.id', {
          url:'/account/:id',
          templateUrl: CONFIG.views + 'projects/informations.html',
          controller: 'Account',
          controllerAs: 'vm_account'
      })

      // Reports
      .state('reports', {
          url:'/reports',
          templateUrl: CONFIG.views + 'reports/index.html',
          controller: 'Reports',
          controllerAs: 'vm_reports'
      })
      .state('reports.id', {
          url:'/reports/board/:board_id',
          templateUrl: CONFIG.views + 'reports/detail.html',
          controller: 'Reports',
          controllerAs: 'vm_reports'
      })

      // Error page
      .state('error', {
          url:'/error/:status',
          templateUrl: CONFIG.views + 'error/detail.html',
          controller: 'Error',
          controllerAs: 'vm_error'
      })

      // Xpto
      /*
        * 'xpto' is a fake route. 

        * Why???
          * Let's go: if user call a absent section the route will call the 'xpto' describe on below otherwise condition.
          * AuthInterceptor will take 404 error because 'xpto' not have, the flow will changed calling /error section and passing status and statusText
          * The /error page showing the cause of error and a button to continue flow
      */
      .state('xpto', {
          url:'/xpto',
          templateUrl: 'xpto.html'
      });

      $urlRouterProvider.otherwise('/xpto');
  }];

  var Ready = ['$rootScope', '$location', 'UserSession', function($rootScope, $location, UserSession){
    $rootScope.user_authenticated = false; 

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      $rootScope.user_authenticated = UserSession.Check();
    });

    $rootScope.$on("$stateChangeSuccess", function(){
      //console.log('$routeChangeSuccess');
    });

    $rootScope.$on('$viewContentLoading', function(scope){
      //console.log('$viewContentLoaded');
    });

    $rootScope.$on('$viewContentLoaded', function(scope){
      //console.log('$viewContentLoaded');
    });

    $rootScope.$on("$stateNotFound", function(){
      //console.log('$routeChangeError');
    });

    $rootScope.$on("$stateChangeError", function(){
      //console.log('$routeChangeError');
    });
  }];

  angular
    .module('app')
    .config(Config)
    .run(Ready);

})(window, window.angular);
