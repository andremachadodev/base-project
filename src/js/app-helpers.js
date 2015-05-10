(function(window, angular, undefined) {
  'use strict';

  var UserSession = ['$location', 'Storage', 'CONFIG', function($location, Storage, CONFIG){
    var _this = this;

    var sess_name           = CONFIG.session_ns, // Prefix of session storage object
        forbidden_has_loged = ['login', 'recover-password', 'account-validate'], // Forbiden section if has loged
        login_section       = '/login', // Login section...
        start_section       = '/dashboard', // Starting section after login or access site loged
        expire_section      = '/error/expired'; // When expire the token

    _this.Data = null;

    _this.Message = null;

    _this.Create = function(obj){
      if( Storage.Get(sess_name) ){
        Storage.Remove(sess_name);
      }

      var data = obj;

      data.user_dob           = new Date(data.user_dob).getTime();
      data.user_creation_date = new Date(data.user_creation_date).getTime();
      data.user_token_expire  = new Date(data.user_token_expire).getTime();

      Storage.Set(sess_name, data);

      if( Storage.Get(sess_name)!==null ){
        _this.Data = data;
      }

      $location.path(start_section);

      console.info('UserSession - Create: The storage '+sess_name+' was created.', Storage.Get(sess_name));
    };

    _this.Delete = function(){
      Storage.Remove(sess_name);

      _this.Data = null;

      $location.path(expire_section);

      console.info('UserSession - Delete: The storage '+sess_name+' is deleted.');
    };

    _this.Update = function(newItem){
      _this.Data[newItem.attr] = newItem.value;

      Storage.Remove(sess_name);
      Storage.Set(sess_name, _this.Data);

      console.info('UserSession - Update: The storage '+sess_name+' was updated.', Storage.Get(sess_name));
    };

    _this.PopulateData = function(){
      if( !_this.Data ){
        _this.Data = Storage.Get(sess_name);
      }
    };

    _this.Check = function(obj_rejected){
      var section    = $location.$$path.split('/')[1],
          session_ok = false;

      var loged = false;

      _this.Message = 'Fatiou, passou!';

      if( Storage.Get(sess_name) ){ // Existe sessão
        _this.PopulateData();

        if( new Date().getTime() > Storage.Get(sess_name).user_token_expire ){
          _this.Message = 'Token expired.';

          _this.Delete();

          $location.path(expire_section);

        }else if(forbidden_has_loged.join(',').indexOf(section) >= 0){
          _this.Message = 'Unauthorized section for user has loged.';

          if(typeof obj_rejected === 'function'){
            obj_rejected();
          }

          $location.path(start_section);

        }

        session_ok = true;

      }else if( forbidden_has_loged.join(',').indexOf(section) == -1 ){
        _this.Message = 'Unauthorized section for user non loged.';

        if(typeof obj_rejected === 'function'){
          obj_rejected();
        }

        $location.path(login_section);

      }

      console.info('UserSession Check: ', _this.Message);

      return( session_ok );
    };

    return( _this );
  }];

  var Storage = [function(){
    var _this = this;

    _this.Get = function(name){
      return( JSON.parse( window.localStorage.getItem(name) ) );
    };

    _this.Set = function(name, value){
      window.localStorage.setItem(name, JSON.stringify(value));
    };

    _this.Update = function(name, value){
      window.localStorage.removeItem(name);
      window.localStorage.setItem(name, JSON.stringify(value));
    };

    _this.Remove = function(param){
      if(!(param instanceof Array) && typeof param !== 'string' ){
        return( false);
      }

      if(param instanceof Array){
        var len = param.length;

        for(var i=0; i<len; i++){
          window.localStorage.removeItem(param[i]);
        }
      }else{
        window.localStorage.removeItem(param);
      }
    };

    return( _this );
  }];

  var Loader = ['$timeout', function($timeout){
    var _this = this;

    _this.Settings = {
      id: null,
      y: 0,
      x: 0,
      className: ' ',
      parent: document.querySelector('body'),
      el: null,
      originalSettings: null,
      callback: null,
      callbackStart: null,
      callbackEnd: null
    };

    var ng_el         = null,
        position_type = _this.Settings.parent.tagName.toLowerCase() != 'body' ? 'relative' : '';

    _this.Start = function(callback){
      _this.Settings.id = 'loader_' + new Date().getTime();

      console.log( 'Start: ', _this.Settings.id );

      var buffer = '<div id="'+_this.Settings.id+'" class="loader ' + _this.Settings.className +' show" style="top: '+ _this.Settings.y + (_this.Settings.y.toString().indexOf('%')!=-1 ? '' : 'px') +'; left: '+ _this.Settings.x + (_this.Settings.x.toString().indexOf('%')!=-1 ? '' : 'px') +'">  </div>';

      angular.element( _this.Settings.parent ).css('position', position_type).append(buffer);

      _this.Settings.ng_el = angular.element( document.querySelector( '#'+_this.Settings.id ) );

      if(typeof _this.Settings.callbackStart === 'function'){
        _this.Settings.callbackStart();
      }
    };

    _this.End = function(callback){
      _this.Settings.ng_el.remove();

      if(typeof _this.Settings.callbackEnd === 'function'){
        _this.Settings.callbackEnd();
      }
    };

    if(typeof _this.Settings.callback === 'function'){
      _this.Settings.callback(_this);
    }

    //return( _this );
  }];

  var DateHandler = [function(){
    return( _this );
  }];

  var ImageQueue = function(){
    return( _this );
  };

  var Modal = function(){
    return( _this );
  };

  angular
    .module('Helpers', [])
    .factory('UserSession', UserSession)
    .factory('Storage', Storage)
    .factory('DateHandler', DateHandler)
    .service('Loader', Loader);

})(window, window.angular);




