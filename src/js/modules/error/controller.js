(function(window, angular, undefined) {'use strict';

  App.controller('Error', ['$scope', '$routeParams', function($scope, $routeParams){

    if($routeParams.status){
      $scope.status = $routeParams.status;
    }else{
      $scope.status = 404;
    }

    switch(status){
        case 400:
          // Bad Request
          break;

        case 401:
          // Unautorize
          break;

        case 403:
          // Forbidden
          break;

        case 404:
          // Not found
          break;

        case 405:
          // Method not allowed
          break;

        case 408:
          // Request timeout
          break;

        case 414:
          // Request too long
          break;

        case 500:
          // Internal server error
          break;

        case 502:
          // Bad gateway
          break;

        case 502:
          // Service unavailable
          break;

        case 502:
          // Gateway timeout
          break;

        case 505:
          // Http version is not supported
          break;

      }

  }]);

})(window, window.angular);