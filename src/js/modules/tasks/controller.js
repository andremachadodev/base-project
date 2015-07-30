(function(window, angular, undefined) {

  'use strict';

  var Tasks = ['$scope', '$stateParams', '$filter', 'BoardsData', 'ProjectsData', 'MembersData', 'TasksData', function($scope, $stateParams, $filter, BoardsData, ProjectsData, MembersData, TasksData){

    var vm = this;

    // Transform queryString in object
    vm.params = $filter('query_string_to_obj')($stateParams.param);

    // Populate boards
    BoardsData.GetBoards().then(
      function(res){
        var arr = res.data.my_boards.concat(res.data.invited_boards);

        angular.forEach(arr, function(item, i){
          if(vm.params.board_id){
            item.selected = vm.params.board_id.indexOf(item.board_id) != -1;
          }
        });

        vm.board_list = arr;
      }
    );

    // Listenners
    $scope.$watch('fields.board', function(update, current){
      if( update === undefined && vm.board_id ){
        update = vm.board_id;
      }

      if( update === current ){
        return false;
      }

      console.log('BOARDS: ', update, update.id);

      vm.update_filter(null, 'boards', JSON.parse(update));

      ProjectsData.GetProjects({
        board_id: update.id
      }).then(
        function(res){
          angular.forEach(res.data.data, function(item, i){
            if(vm.params.project_id){
              item.selected = vm.params.project_id.indexOf(item.project_id) != -1;
            }
          });

          vm.project_list = res.data.data;
        }
      );

      MembersData.GetMembers({
        board_id: update.id
      }).then(
        function(res){
          angular.forEach(res.data.data, function(item, i){
            if(vm.params.user_id){
              item.selected = vm.params.user_id.indexOf(item.user_id) != -1;
            }
          });

          vm.member_list = res.data.data;
        }
      );


    });

    $scope.$watch('fields.project', function(update, current){
      if( update === undefined && vm.project_id ){
        update = vm.project_id;
      }

      if( update === current ){
        return false;
      }

      vm.update_filter(null, 'projects', JSON.parse(update));

      // Atualiza filtro
    });

    $scope.$watch('fields.member', function(update, current){
      if( update === undefined && vm.member_id ){
        update = vm.member_id;
      }

      if( update === current ){
        return false;
      }

      vm.update_filter(null, 'members', JSON.parse(update));

      // Atualiza filtro
    });

    $scope.$watchCollection('[fields.task_start_date, fields.task_end_date]', function(update, current){
      if( update[1] !== undefined && $scope.task_filter.$valid ){
        vm.fields.period = {label: 'Weekly', task_start_date: update[0], task_end_date: update[1]};
      }

      // Atualiza filtro
    });

    $scope.$watch('fields.period', function(update, current){
      if( update === undefined || update === current ){
        return false;
      }

      vm.update_filter(null, 'period', JSON.parse(update));

      // Atualiza filtro
    });

    vm.filters = {
      boards: [],
      projects: [],
      members: [],
      period: {},
      status: []
    };

    $scope.$watch('filters', function(update, current){
      if( update === undefined || update === current ){
        return false;
      }

      console.log('FILTERS: ', update, current);

      // Ajax
    }, true);

    vm.update_filter = function(e, key, obj){
      if(e){
        e.preventDefault();
      }

      console.log(vm.filters[key], key, obj);

      if(vm.filters[key] instanceof Array){
        if(!vm.filters[key].length){
          vm.filters[key].push(obj);

        }else{
          angular.forEach(vm.filters[key], function(item, i){
            if(item.id == obj.id){
              vm.filters[key].splice(i, 1);
            }else{
              vm.filters[key].push(obj);
            }
          });

        }

      }else{
        vm.filters[key] = obj;

      }
    };

    vm.remove_filter = function(e, key, obj){

    };

  }];

  angular
    .module('app')
    .controller('Tasks', Tasks);

})(window, window.angular);