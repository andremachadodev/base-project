

  var Loader = function(){
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

    var position_type = _this.Settings.parent.tagName.toLowerCase() != 'body' ? 'relative' : '';

    var svg = [
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="white" id="[ID]" class="[CLASS]" style="[STYLE]">',
                  '<path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>',
                  '<path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">',
                    '<animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.3s" repeatCount="indefinite" />',
                  '</path>',
                '</svg>'
              ].join('');

    _this.Start = function(){
      _this.Settings.id = 'loader_' + new Date().getTime();

      console.log( 'Start: ', _this.Settings.id );

      var pos = [
                  'top: '+ _this.Settings.y + (_this.Settings.y.toString().indexOf('%')!=-1 ? '' : 'px'),
                  'left: '+ _this.Settings.x + (_this.Settings.x.toString().indexOf('%')!=-1 ? '' : 'px')
                ];

      var buffer = svg
                    .replace('[ID]', _this.Settings.id)
                    .replace('[CLASS]', 'loader ' + _this.Settings.className +' show')
                    .replace('[STYLE]', pos.join(';'));

      angular.element( _this.Settings.parent ).css('position', position_type).append(buffer);

      _this.Settings.el = angular.element( document.querySelector( '#'+_this.Settings.id ) );

      if(typeof _this.Settings.callbackStart === 'function'){
        _this.Settings.callbackStart();
      }
    };

    _this.End = function(el){
      if(el){
        el.remove();
      }else{
        _this.Settings.el.remove();
      }

      if(typeof _this.Settings.callbackEnd === 'function'){
        _this.Settings.callbackEnd();
      }
    };

    if(typeof _this.Settings.callback === 'function'){
      _this.Settings.callback(_this);
    }
  };




