(function(window, angular, undefined) {'use strict';

  var Dashboard = ['$scope', 'BoardsData', function($scope, BoardsData){

    var vm = this;

    $scope.my_boards = [];

    $scope.invited_boards = [];

    BoardsData.GetBoards()
      .then(
        function(res){

          vm.my_boards = res.data.my_boards;

          vm.invited_boards = res.data.invited_boards;

        }
      );
    
  }];

  angular
    .module('app')
    .controller('Dashboard', Dashboard);

})(window, window.angular);