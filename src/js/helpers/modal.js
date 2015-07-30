(function(window, angular, undefined) {
  'use strict';

  var Modal = ['$rootScope', '$compile', '$timeout', '$document', '$http', 'CONFIG', function($rootScope, $compile, $timeout, $document, $http, CONFIG){
    var _this = this;

    _this.Close = function(e){
      if(e){
        e.preventDefault();
      }

      var modal = angular.element( document.querySelectorAll('.modal') );

      modal.removeClass('modal__show');

      $document.off();

      $timeout(function(){
        modal.remove();

      }, 300);
    };

    _this.Open = function(config){

      var target = angular.element( document.querySelector( config.target ? config.target : 'body' ) );

      if( !target.length ){
        console.info('Modal: target is not specified');
      }

      var modal_id = 'modal_' + parseInt(new Date().getTime());

      target.append( '<div class="modal" id="'+ modal_id +'"><div></div></div>' );

      var modal_el       = angular.element( document.querySelector('#' + modal_id) ),
          modal_replacer = modal_el.find('div');

      modal_el.addClass('modal__show');

      // Starting loading here
      
      var scope = config.scope ? config.scope : $rootScope.$new();

      console.log(scope);

      var promise = $http
                      .get(CONFIG.views + config.url)
                      .then(function(res){
                        modal_replacer.replaceWith( $compile(res.data)(scope) );

                        var modal_content = angular.element( document.querySelector('#' + modal_id + ' .modal__content') );

                        modal_content.addClass('modal__content_show');

                        console.log('THEN');

                        angular.element( document.querySelectorAll('[close-modal]') ).on('click', function(e){
                          if( angular.element( this ).attr('href') === '#' || angular.element( this ).attr('href') === '#/' ){
                            e.preventDefault();    

                          }

                          _this.Close();                          
                        });

                      });

      $document.on('keyup', function(e){
        if(e.keyCode == 27){
          _this.Close();

        }
      });

      return( promise );

    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('Modal', Modal);

})(window, window.angular);