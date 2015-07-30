(function(window, angular, undefined) {
  'use strict';

  /** 
   * Filter for Friendly Url's
   * 
   * Replace hiphens, bars and spaces to plus sign
   * Replace vogals acentued for cleaned vogals
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var FriendlyUrl = function(){
    return function(input){
      var out = input
                  .toLowerCase()
                  .replace(/[àáâãäå]/g, 'a')
                  .replace(/[èéêë]/g, 'e')
                  .replace(/[ìíîï]/g, 'i')
                  .replace(/[òóôõö]/g, 'o')
                  .replace(/[ùúûü]/g, 'u')
                  .replace(/[ñ]/g, 'n')
                  .replace(/[ç]/g, 'c')
                  .replace(/[ýÿ]/g, 'y')
                  .replace(/[\-\/\\\s]/g, '+');

      return out;
    };
  };

  angular
    .module('app')
    .filter('friendly_url', FriendlyUrl);

})(window, window.angular);










