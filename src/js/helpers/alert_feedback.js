(function(window, angular, undefined) {
  'use strict';

  /** 
   * Server Feedbacks
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var AlertFeedback = ['$timeout', '$document', 'Position', function($timeout, $document, Position){
    var _this = this;

    var stack = [];

    var display = function(settings){
      var id = 'fs_' + new Date().getTime();

      stack.push( id );

      var tmpl = [
                    '<div class="server_feedback server_feedback__'+ settings.type +' server_feedback__'+ settings.position +'" id="'+ id +'">',
                      '<span class="server_feedback__title">',
                        settings.title,
                      '</span>',
                      settings.message,
                    '</div>'
                 ].join('');

      if( settings.target && settings.target.length && settings.position.indexOf('tooltip') < 0 ){
        settings.target.css('position', 'relative').append( tmpl );

      }else{
        $document.find('body').append( tmpl );

      }

      var el = angular.element( document.querySelector('#' + id) );

      // Tooltip, like a balloon
      if( settings.position.indexOf('tooltip') !== -1 ){
        if( settings.position.indexOf('left') !== -1 && settings.position.indexOf('right') !== -1 && !settings.target && !settings.target.length ){
          console.info('AlertFeedback: You cannot set left and right position and the same element.');

          return false;

        }

        var target_coord = Position.Get( settings.target[0] );

        if(settings.position.indexOf('top') !== -1){
          el.css({
            top: (target_coord.top - el[0].offsetHeight - 10) + 'px'
          });

        }

        if(settings.position.indexOf('bottom') !== -1){
          el.css({
            top: (target_coord.top + settings.target[0].offsetHeight + 10) + 'px'
          });

        }

        if(settings.position.indexOf('left') !== -1){
          el.css({
            left: (target_coord.left) + 'px'
          });

        }

        if(settings.position.indexOf('right') !== -1){
          el.css({
            left: (target_coord.left - Math.abs(el[0].offsetWidth - settings.target[0].offsetWidth)) + 'px'
          });

        }

        if(settings.position.indexOf('center') !== -1){
          el.css({
            left: '50%',
            marginLeft: (el[0].offsetWidth / 2)*-1 + 'px'
          });

        }

      }else{

        if( settings.position.indexOf('center') !== -1 ){
          el.css({
            marginLeft: (el[0].offsetWidth / 2)*-1 + 'px'
          });

        }

        if( settings.position.indexOf('middle') !== -1 ){
          el.css({
            marginTop: (el[0].offsetHeight / 2)*-1 + 'px'
          });

        }

      }

      $timeout(function(){
        el.addClass('show');

      }, 300);

      $timeout(function(){
        el.removeClass('show');

      }, 3500);

      $timeout(function(){
        el.remove();

      }, 3800);

    };

    _this.Success = function(custom){
      var settings = {
        title: custom.title ? custom.title : '',
        message: custom.message ? custom.message : '',
        position: custom.position ? custom.position : 'top_left',
        target: custom.target ? custom.target : ''
      };

      settings.type = 'success';

      display( settings );

    };

    _this.Error = function(custom){
      var settings = {
        title: custom.title ? custom.title : '',
        message: custom.message ? custom.message : '',
        position: custom.position ? custom.position : 'top_left',
        target: custom.target ? custom.target : ''
      };

      settings.type = 'error';

      display( settings );

    };

    _this.Warning = function(custom){
      var settings = {
        title: custom.title ? custom.title : '',
        message: custom.message ? custom.message : '',
        position: custom.position ? custom.position : 'top_left',
        target: custom.target ? custom.target : ''
      };

      settings.type = 'warning';

      display( settings );

    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('AlertFeedback', AlertFeedback);

})(window, window.angular);
