(function(window, angular, undefined) {
  'use strict';

  /** 
   * The simple trigger to call modal with directive way
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var OpenModal = ['Modal', function(Modal){
    return ({
      restrict: 'A',
      link: function(scope, element, attrs){

        element.on('click', function(e){
          e.preventDefault();

          Modal.Open({url: attrs.openModal})
            .then(
              function(){

                if(typeof attrs.openModalCallback === 'function'){
                  attrs.openModalCallback();
                }
                
              }
            );

        });

      } 
    });
  }];

  angular
    .module('app')
    .directive('openModal', OpenModal);

})(window, window.angular);










