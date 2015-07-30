(function(window, angular, undefined) {
  'use strict';

  var BoardsData = ['$http', 'CONFIG', function($http, CONFIG){
    var _this = this;

    var url = {
      boards: CONFIG.api + 'boards-GET.js'
    };

    _this.GetBoards = function(params){
      params = params ? params : {};
      
      var request = $http.get(url.boards, params);

      return request;
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('BoardsData', BoardsData);

})(window, window.angular);