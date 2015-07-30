(function(window, angular, undefined) {
  'use strict';

  /** 
   * Create a loader icon to sinalize a request or lazzy any operation
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var Loader = ['$timeout', function($timeout){
    var _this = this;

    _this.Settings = {
      id: null,
      y: 0,
      x: 0,
      className: ' ',
      parent: document.querySelector('body'),
      el: null,
      originalSettings: null,
      callback: null,
      callbackStart: null,
      callbackEnd: null
    };

    var position_type = _this.Settings.parent.tagName.toLowerCase() != 'body' ? 'relative' : '';

    _this.Start = function(){
      _this.Settings.id = 'loader_' + new Date().getTime();

      console.log( 'Start: ', _this.Settings.id );

      var buffer = '<div id="'+_this.Settings.id+'" class="loader ' + _this.Settings.className +' show" style="top: '+ _this.Settings.y + (_this.Settings.y.toString().indexOf('%')!=-1 ? '' : 'px') +'; left: '+ _this.Settings.x + (_this.Settings.x.toString().indexOf('%')!=-1 ? '' : 'px') +'">  </div>';

      angular.element( _this.Settings.parent ).css('position', position_type).append(buffer);

      _this.Settings.el = angular.element( document.querySelector( '#'+_this.Settings.id ) );

      if(typeof _this.Settings.callbackStart === 'function'){
        _this.Settings.callbackStart();
      }
    };

    _this.End = function(el){
      if(el){
        el.remove();
      }else{
        _this.Settings.el.remove();
      }

      if(typeof _this.Settings.callbackEnd === 'function'){
        _this.Settings.callbackEnd();
      }
    };

    if(typeof _this.Settings.callback === 'function'){
      _this.Settings.callback(_this);
    }

    //return( _this );
  }];

  angular
    .module('app')
    .service('Loader', Loader);

})(window, window.angular);




