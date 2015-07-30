(function(window, angular, undefined) {
  'use strict';

  /** 
   * Compare if a date is less than today
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var DateAgo = function(){
    return function(input){
      var now  = new Date().getTime(),
          date = new Date( input ).getTime();

        //console.log(now, date, date<now);

      return date<now;
    };
  };

  /** 
   * Compare if a date is greather than today
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var DateComing = function(){
    return function(input){
      var now  = new Date().getTime(),
          date = new Date( input ).getTime();

      return date>now;
    };
  };

  /** 
   * Compare if a date is equal today
   *
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var DateIsToday = function(){
    return function(input){
      var now  = new Date(),
          date = new Date(input);

      now  = now.getMonth() + now.getDate() + now.getFullYear();
      date = date.getMonth() + date.getDate() + date.getFullYear();

      return date === now;
    };
  };

  angular
    .module('app')
    .filter('date_ago', DateAgo)
    .filter('date_coming', DateComing)
    .filter('date_is_today', DateIsToday);

})(window, window.angular);










