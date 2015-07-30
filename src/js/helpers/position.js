(function(window, angular, undefined) {
  'use strict';

  /** 
   * Take a element position on the screen
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var Position = [function(){
    var _this = this;
    
    _this.Get = function(el){
      var _x = 0;
      var _y = 0;

      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
      }

      return { top: _y, left: _x };
    };

    return( _this );
  }];

  angular
    .module('app')
    .service('Position', Position);

})(window, window.angular);




