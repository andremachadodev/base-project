(function(window, angular, undefined) {
  'use strict';

  /** 
   * Login
   * 
   * Send user_name/user_password returning the status of operation and complete informations
   * In success, will create a session with user informations and token also
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var Login = ['$scope', 'Loader', 'Position', '$rootScope', '$location', '$stateParams', 'UserSession', 'AccessData', function($scope, Loader, Position, $rootScope, $location, $stateParams, UserSession, AccessData){
    var vm = this;

    vm.send = function(e){
      console.log( e );

      //e.preventDefault();

      // if( !$scope.frm.$invalid ){
        var pos = Position.Get( document.querySelector('.bt__rose') );

        Loader.Settings.y = pos.top + 5;
        Loader.Settings.x = pos.left + 5;
        Loader.Settings.className = 'button_loader';

        Loader.Start();

        AccessData.Login(vm.fields)
          .then(
            function(res){

              if(res.data.user_account_active){
                UserSession.Create(res.data);

                $rootScope.user_name_display = res.data.user_first_name +' '+ res.data.user_last_name;

              }else{
                $location.path('/account-validate/' + res.data.user_login);

              }

              Loader.End();

            },
            function(res){

              /*vm.fields.user_login    = '';
              vm.fields.user_password = '';*/

              vm.error_message = res.data.message;

              Loader.End();

            }
          );
      /*}*/

    };
  }];

  angular
    .module('app')
    .controller('Login', Login);

})(window, window.angular);
