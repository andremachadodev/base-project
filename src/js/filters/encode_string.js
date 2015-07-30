(function(window, angular, undefined) {
  'use strict';

  /** 
   * Prepare a string to a valid and scaped query string
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var EncodeString = function(){
    return function(input){
      var out = encodeURIComponent(input);

      console.log( out );

      return out;
    };
  };

  angular
    .module('app')
    .filter('encode_string', EncodeString);

})(window, window.angular);










