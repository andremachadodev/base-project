(function(window, angular, undefined) {
  'use strict';

  var TasksData = ['$http', 'CONFIG', function($http, CONFIG){
    var _this = this;

    var url = {
      tasks: CONFIG.api + 'tasks-GET.js'
    };

    _this.GetTasks = function(params){
      params = params ? params : {};

      var request = $http.get(url.tasks, params);

      return request;
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('TasksData', TasksData);

})(window, window.angular);