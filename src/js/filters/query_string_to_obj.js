(function(window, angular, undefined) {
  'use strict';

  /** 
   * Create an object by querystring
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var QueryStringToObj = function(){
    return function(input){
      var out = {};

      angular.forEach(input.split('&'), function(pair, i){
        var arr = pair.split('=');
        
        out[arr[0]] = arr[1];
      });

      return out;
    };
  };

  angular
    .module('app')
    .filter('query_string_to_obj', QueryStringToObj);

})(window, window.angular);










