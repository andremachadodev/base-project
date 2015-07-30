(function(window, angular, undefined) {
  'use strict';

  var ProjectsData = ['$http', 'CONFIG', function($http, CONFIG){
    var _this = this;

    var url = {
      projects: CONFIG.api + 'projects-GET.js'
    };

    _this.GetProjects = function(params){
      params = params ? params : {};
      
      var request = $http.get(url.projects, params);

      return request;
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('ProjectsData', ProjectsData);

})(window, window.angular);