(function(window, angular, undefined){
  'use strict';

  var constants = {
    "api": "../mockdata/",
    "views": "../views/",
    "session_ns": "ProjectSess"
  };

  angular
    .module('app', ['ui.router'])
    .constant("CONFIG", constants);

})(window, window.angular);
