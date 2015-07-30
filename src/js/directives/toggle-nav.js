(function(window, angular, undefined) {
  'use strict';

  /** 
   * Action for open/close menu
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var ToggleNav = ['$document', function($document){
    return ({
      restrict: 'A',
      link: function(scope, element, attrs){

        var html      = angular.element( document.querySelector('html') ),
            nav_links = angular.element( document.querySelectorAll('.nav a') );

        var toggle = function(){
          if(html.hasClass('nav_opened')){
            html.removeClass('nav_opened');

          }else{
            html.addClass('nav_opened');

          }
        };

        element.on('click', function(e){
          e.preventDefault();

          toggle();
        });

        nav_links.on('click', function(e){
          if( this.href.split('#')[1] === '' ){
            e.preventDefault();

          }

          toggle();
        });

        var wrap = angular.element( document.querySelector('.wrap') );

        wrap.bind('click', function(e){
          if(e.target.className !== 'icon_menu'){
            html.removeClass('nav_opened');

          }

        });

        $document.on('keyup', function(e){
          if(e.keyCode === 27){
            html.removeClass('nav_opened');

          }

        });

      }
    });
  }];

  angular
    .module('app')
    .directive('toggleNav', ToggleNav);

})(window, window.angular);










