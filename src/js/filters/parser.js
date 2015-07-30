(function(window, angular, undefined) {
  'use strict';

  /** 
   * Transform object data in query string
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var ObjToQueryString = function(){  
    return function(input){
      var out = [];

      angular.forEach(input, function(val, key){
        out.push(key + '=' + val);
      });

      return out.join('&');
    };
  };

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
    .filter('obj_to_query_string', ObjToQueryString)
    .filter('query_string_to_obj', QueryStringToObj);

})(window, window.angular);










