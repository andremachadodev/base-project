(function(window, angular, undefined) {'use strict';

  var Foo = ['$scope', function($scope){
    // Foo
  }]

  angular
    .module('app')
    .controller('Foo', Foo);

})(window, window.angular);