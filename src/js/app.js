(function(window, angular, undefined){
  'use strict';

  var constants = {
    "api": "../mockdata/",
    "views": "../views/",
    "session_ns": "MTSSess"
  };

  angular
    .module('app', ['ui.router'])
    .constant("CONFIG", constants);

})(window, window.angular);
