(function(window, angular, undefined){
  'use strict';

  var Config = ['$stateProvider', '$httpProvider', '$urlRouterProvider', 'CONFIG', function($stateProvider, $httpProvider, $urlRouterProvider, CONFIG){
    $httpProvider.interceptors.push('AuthInterceptor');

    ////console.log('Config');

    $stateProvider
      // Access
      /*.state('start', {
        url:'',
        views: {
          'access': {
            templateUrl: CONFIG.views + 'access/login.html',
            controller: 'Login',
            controllerAs: 'vm_login'
          }
        }
      })*/
      .state('login', {
        url:'/login',
        views: {
          'access': {
            templateUrl: CONFIG.views + 'access/login.html',
            controller: 'Login',
            controllerAs: 'vm_login'
          }
        }
      })
      .state('recover_password', {
        url:'/recover-password',
        views: {
          'access': {
            templateUrl: CONFIG.views + 'access/recover_password.html',
            controller: 'RecoverPassword',
            controllerAs: 'vm_recover_password'
          }
        }
      })
      .state('account_validate', {
        url:'/account-validate/:user_login',
        views: {
          'access': {
            templateUrl: CONFIG.views + 'access/account_validate.html',
            controller: 'RequestValidationAccount',
            controllerAs: 'vm_account_validate'
          }
        }
      })
      .state('activation_account', {
        url:'/activation-account/:ticket',
        views: {
          'access': {
            templateUrl: CONFIG.views + 'access/activation_account.html',
            controller: 'ActivationAccount',
            controllerAs: 'vm_activation_account'
          }
        }
      })
      
      .state('registration', {
        url:'/registration',
        views: {
          'access': {
            templateUrl: CONFIG.views + 'access/registration.html',
            controller: 'Registration',
            controllerAs: 'vm_registration'
          }
        }
      })
      .state('success', {
        url:'/success',
        views: {
          'access': {
            templateUrl: CONFIG.views + 'access/success.html'
          }
        }
      })

      // Dashboard
      .state('dashboard', {
          url:'/dashboard',
          templateUrl: CONFIG.views + 'boards/dashboard.html',
          controller: 'Dashboard',
          controllerAs: 'vm_dashboard'
      })

      // Board overview
      .state('board_overview', {
          url:'/board-overview/:board_title/:board_id',
          templateUrl: CONFIG.views + 'boards/board_overview.html',
          controller: 'BoardOverview',
          controllerAs: 'vm_board'
      })

      // Boards
      .state('boards', {
          url:'/boards',
          templateUrl: CONFIG.views + 'boards/boards.html',
          controller: 'Boards',
          controllerAs: 'vm_boards'
      })

      // Tasks
      .state('tasks', {
          url:'/tasks/:params',

          /*url:'/tasks/:param',*/
          //{board_title:.*?}{slash:[/]?}{board_id:[0-9]*?}{slash:[/]?}{start_date:[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]?}

          templateUrl: CONFIG.views + 'tasks/index.html',
          controller: 'Tasks', 
          controllerAs: 'vm_tasks'
      })

      .state('task_detail', {
          url:'/task/:task_id/:task_title',
          templateUrl: CONFIG.views + 'tasks/detail.html',
          controller: 'TaskDetail', 
          controllerAs: 'vm_task'
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
          templateUrl: CONFIG.views + 'error/index.html',
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

      /*.state('xpto_', {
          url:'',
          templateUrl: 'xpto.html'
      })*/
      .state('xpto', {
          url:'/xpto',
          templateUrl: 'xpto.html'
      });

      $urlRouterProvider.otherwise('/xpto');
  }];

  var Ready = ['$rootScope', '$state', 'UserSession', 'Storage', 'CONFIG', function($rootScope, $state, UserSession, Storage, CONFIG){
    $rootScope.user_authenticated = false;
    $rootScope.last_section = null;

    if( UserSession.CheckToken() ){
      $rootScope.user_name_display = Storage.Get(CONFIG.session_ns).user_first_name +' '+ Storage.Get(CONFIG.session_ns).user_last_name;

    }else{
      $rootScope.user_name_display = '';

    }

    /*$rootScope.changing_view = false;

    var loader_view = new Loader();

    loader_view.Settings.x = '50%';
    loader_view.Settings.y = '300';
    loader_view.Settings.className = 'view_loader';*/

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      $rootScope.user_authenticated = UserSession.CheckToken();

      $rootScope.last_section = fromState;

      //console.log('stateChangeStart: ', toState, fromState);

      /*loader_view.Start();*/

      /*$rootScope.changing_view = true;*/

      //console.log('   CHANGE START');
    });
 
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
      ////console.log('$routeChangeSuccess');

      //console.log('   CHANGE SUCCESS');
    });

    $rootScope.$on('$viewContentLoading', function(event, viewConfig){
      ////console.log('$viewContentLoaded');
      
      //console.log('   CHANGE CONTENT LOADING');
    });

    $rootScope.$on('$viewContentLoaded', function(event){
      //console.log('$viewContentLoaded');
      
      /*if($rootScope.changing_view){
        loader_view.End();

        $rootScope.changing_view = false;

        console.log('   CHANGE CONTENT LOADED', $rootScope.changing_view);
      }*/

      
    });

    $rootScope.$on("$stateNotFound", function(event, unfoundState, fromState, fromParams){
      ////console.log('$routeChangeError');

      //loader_view.End();

      $state.go('error', {status: 404});

      //console.log('   CHANGE NOT FOUND: ', event, unfoundState, fromState, fromParams);
    });

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
      ////console.log('$routeChangeError');

      //loader_view.End();

      $state.go('error', {status: 404});
      
      //console.log('   CHANGE ERROR: ', event, toState, toParams, fromState, fromParams, error);
    });
  }];

  angular
    .module('app')
    .config(Config)
    .run(Ready);

})(window, window.angular);
