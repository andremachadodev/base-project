(function(window, angular, undefined) {
  'use strict';

  var MembersData = ['$http', 'CONFIG', function($http, CONFIG){
    var _this = this;

    var url = {
      members: CONFIG.api + 'members-GET.js'
    };

    _this.GetMembers = function(params){
      params = params ? params : {};
      
      var request = $http.get(url.members, params);

      return request;
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('MembersData', MembersData);

})(window, window.angular);