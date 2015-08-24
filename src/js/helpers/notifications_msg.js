(function(window, angular, undefined) {
  'use strict';

  /** 
   * Normalize notifications message
   * 
   * @author Andre Machado
   * @lastupdate Andre Machado
   */
  var NotificationsMsg = [function(){
    var _this = this;

    _this.Parse = function(obj){

      var new_obj = obj;

      angular.forEach(obj, function(item, i){
        switch( item.notification_scope ){
          case 'board_invite':
            var owner_name = item.notification_data.board_owner.user_first_name +' '+ item.notification_data.board_owner.user_last_name;

            new_obj[i].notification_feedback = owner_name + ' invite you to participate on a board "' + item.notification_data.board_title +'".';

            //console.log('board_invite: ', new_obj[i].notification_feedback);

            break;

          case 'task_invite':
            new_obj[i].notification_feedback = 'You are assign on a task "'+ item.notification_data.task_title +'".';

            //console.log('task_invite: ', new_obj[i].notification_feedback);

            break;

          case 'task_update':
            new_obj[i].notification_feedback = 'The status of task "'+ item.notification_data.task_title +'"" are changed to "' + item.notification_data.task_status.name + '".';

            //console.log('task_update: ', new_obj[i].notification_feedback);

            break;

          case 'comment':
            new_obj[i].notification_feedback = 'New comment for the task "'+ item.notification_data.task.task_title +'".';

            //console.log('comment: ', new_obj[i].notification_feedback);

            break;

          default:
            //

            break;
        }

      });

      return( new_obj );
    };

    return( _this );
  }];

  angular
    .module('app')
    .factory('NotificationsMsg', NotificationsMsg);

})(window, window.angular);
