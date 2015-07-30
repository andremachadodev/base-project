(function(window, angular, undefined) {
  'use strict';

  /** 
   * Number of days in each period
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var HelperDate = [function(){
    var _this = this;

    _this.GetTotalDays = function(start, end){
      
    };

    _this.DaysInTheMonth = function(month, year){
      return( new Date( year, month, 0 ).getDate() );
    };

    _this.DifferenceDays = function(date){
      date = new Date(date).getTime();

      var result = {left: 0, late: 0},
          now    = new Date().getTime(),
          day    = (24 * 60 * 60 * 1000),
          diff   = (now - date);

      if( diff < 0 ){
        result.left = parseInt( Math.abs(diff) / day);
      }else if( diff > 0 ){
        result.late = parseInt( diff / day);
      }

      return( result );
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('HelperDate', HelperDate);

})(window, window.angular);
