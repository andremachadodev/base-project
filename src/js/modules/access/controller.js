(function(window, angular, undefined) {
  'use strict';

  /** 
   * Recover Password page's Controller
   * 
   * Send user_name/user_password returning the status of operation and complete informations
   * In success, will create a session with user informations and token also
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var Login = ['$scope', 'UserSession', 'AccessData', '$stateParams', function($scope, UserSession, AccessData, $stateParams){
    var vm = this;

    console.log( '$stateParams: ', $stateParams );

    vm.send = function(e){
      e.preventDefault();

      if($scope.frm.$valid){
        AccessData.Login(vm.fields)
          .then(
            function(res){
              UserSession.Create(res.data);
            }
          );
      }
    };
  }];

  /**
   * Recover password of an user
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var RecoverPassword = ['$scope', 'AccessData', function($scope, AccessData){
    var vm = this;

    vm.sent = false;

    vm.send = function(e){
      e.preventDefault();

      if($scope.frm.$valid){
        AccessData.RecoverPassword(vm.fields)
          .then(
            function(res){
              vm.sent = true;
            }
          );
      }

    };
  }];

  /**
   * User confirming your account to use 
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var AccountValidate = ['$scope', 'AccessData', function($scope, AccessData){
    var vm = this;

    vm.sent = false;

    vm.send = function(e){
      e.preventDefault();

      AccessData.AccountValidate(vm.fields)
        .then(
          function(res){
            vm.sent = true;
          }
        );
    };
  }];

  angular
    .module('app')
    .controller('Login', Login)
    .controller('RecoverPassword', RecoverPassword)
    .controller('AccountValidate', AccountValidate);

})(window, window.angular);