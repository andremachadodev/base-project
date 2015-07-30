(function(window, angular, undefined) {
  'use strict';

  /** 
   * Helper to manipulate localStorage with values as a object
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var Storage = [function(){
    var _this = this;

    _this.Get = function(name){
      return( JSON.parse( window.localStorage.getItem(name) ) );
    };

    _this.Set = function(name, value){
      window.localStorage.setItem(name, JSON.stringify(value));
    };

    _this.Update = function(name, value){
      window.localStorage.removeItem(name);
      window.localStorage.setItem(name, JSON.stringify(value));
    };

    _this.Remove = function(param){
      if(!(param instanceof Array) && typeof param !== 'string' ){
        return( false);
      }

      if(param instanceof Array){
        var len = param.length;

        for(var i=0; i<len; i++){
          window.localStorage.removeItem(param[i]);
        }
      }else{
        window.localStorage.removeItem(param);
      }
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('Storage', Storage);

})(window, window.angular);




