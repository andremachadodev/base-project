(function(window, angular, undefined) {
  'use strict';

  /** 
   * Remove empty index of an array
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var ArrayClean = function(){
    return function(input){
      var arr = input.filter(function(item){
        return item !== undefined;
      });

      return arr;
    };
  };

  /** 
   * Check if element has in array
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var ArrayIndexOf = function(){
    return function(input, value){
      var arr = input.filter(function(item){
        return item === value;
      });

      return arr;
    };
  };

  /** 
   * Check if element has in deep level of array
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var ArrayDeepIndexOf = function(){
    return function(input, value, key, sub_key){
      var arr = input.filter(function(item){
        if(sub_key){
          return item[key][sub_key] === value;

        }else{
          return item[key] === value;

        }
        
      });

      return arr;
    };
  };

  angular
    .module('app')
    .filter('array_clean', ArrayClean)
    .filter('array_indexOf', ArrayIndexOf)
    .filter('array_deep_indexOf', ArrayDeepIndexOf);

})(window, window.angular);










