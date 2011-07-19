/*! Copyright (c) 2010 Stephen Searles (http://stephensearles.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.2
 * Docs: http://stephensearles.com/Site/jEditUndo.html
 */

//add undo manager object to jQuery namespace
jQuery.undoManager = new UndoManager();

$.editable.jEditUndo = function () {
  //add default callback to jeditable
  var undoableOnsubmit = function(settings,element) {
    var form = this;
    var submitFunction;
    $.each(form.data('events'),function (i,events){
      $.each(events,function(i,event) {
        if (event.type === 'submit') {
          submitFunction = event.handler;
        }
      });
    });
    if ('text' === settings.type) {
      $.undoManager.undoable('undo changing value to ' + $(this).find('input').val(),function() {
        return $.editable.types.text.undoFunction;
      }(),[submitFunction,form,settings],element);
    }
    else if ('textarea' === settings.type) {
      $.undoManager.undoable('undo changing value to ' + $(this).find('textarea').val(),function() {
        return $.editable.types.textarea.undoFunction;
      }(),[submitFunction,form,settings],element);
    }
    else if ('select' === settings.type) {
      $.undoManager.undoable('undo changing value to ' + $(this).find('option:selected').text(),function() {
        return $.editable.types.select.undoFunction;
      }(),[submitFunction,form,settings],element);
    }
  }
  //extend textbox type of jeditable to handle undo
  var textPlugin = {
    plugin:function (settings,self) {
      var $element = $(self);
      var $form = this;
      var functionArray = new Array();
      $form.find('input').each(function (i,input) {
        var originalText = $(input).val();
        var newText;
        functionArray.push(function() {
          newText = $element.text();
          $element.text(originalText);
          $(input).val(originalText);
          originalText = newText;
        });
      });
      $.editable.types.text.undoFunction = function (submitFunction,form,settings) {
        $.editable.types.text.plugin.apply(form, [settings, this]);
        for (var i in functionArray) {
          functionArray[i].apply(form);
        }
        form.find('input').prop('type','hidden');
        form.submit(submitFunction);
        $('body').append(form);
        form.triggerHandler('submit');
        form.remove();
      };
    }
  }
  //extend textarea type with similar plugin as text
  var textAreaPlugin = {
    plugin:function(settings,self) {
      var $element = $(self);
      var $form = this;
      var functionArray = new Array();
      $form.find('textarea').each(function (i,textarea) {
        var originalText = $(textarea).val();
        var newText;
        functionArray.push(function() {
          newText = $element.text();
          $element.text(originalText);
          $(textarea).val(originalText);
          originalText = newText;
        });
      });
      $.editable.types.textarea.undoFunction = function (submitFunction,form,settings) {
        $.editable.types.textarea.plugin.apply(form, [settings, this]);
        for (var i in functionArray) {
          functionArray[i].apply(form);
        }
        form.append($('input').prop('type','hidden').val(form.find('textarea').val()));
        form.submit(submitFunction);
        $('body').append(form);
        form.triggerHandler('submit');
        form.remove();
      };
    }
  };
  //extend select type with similar plugin as text
  var selectPlugin = {
    plugin:function(settings,self) {
      var $element = $(self);
      var functionArray = new Array();
      this.find('select').each(function (i,select) {
        var originalIndex = $(select).find('option:selected').index();
        var newIndex;
        functionArray.push(function() {
          newIndex = this.find('option:selected').index();
          this.find('option:selected').prop('selected',false);
          this.find('option').eq(originalIndex).prop('selected',true);
          originalIndex = newIndex;
        });
      });
      $.editable.types.select.undoFunction = function (submitFunction,form,settings) {
        $.editable.types.select.plugin.apply(form, [settings, this]);
        for (var i in functionArray) {
          functionArray[i].apply(form);
        }
        form.append($('form').prop('type','hidden').val(form.find('option:selected').val()));
        form.submit(submitFunction);
        $('body').append(form);
        form.triggerHandler('submit');
        form.remove();
      };
    }
  };
  
  //apply plugins
  jQuery.fn.editable.defaults.onsubmit = undoableOnsubmit;
  $.extend($.editable.types.text,textPlugin);
  $.extend($.editable.types.textarea,textAreaPlugin);
  $.extend($.editable.types.select,selectPlugin);

  $.editable.packageCustomPlugin = function (type,customFunction) {
    $.editable.unpackageCustomPlugin(type);
    var undoablePlugin = $.editable.types[type].plugin;
    $.editable.unpackageCustomPlugin = function (_type) {
      $.editable.types[_type].plugin = undoablePlugin; //TODO Fix this. undoablePlugin needs to not be obtained from the closure scope
    }
    $.editable.types[type].plugin = function (settings,self) {
      undoablePlugin.apply(this,[settings,self]);
      return customFunction.apply(this,[settings,self]);
    }
  }
  
  $.editable.packageCustomOnsubmit = function (customFunction) {
    $.editable.unpackageCustomOnsubmit();
    var undoableOnsubmit = jQuery.fn.editable.defaults.onsubmit;
    $.editable.unpackageCustomOnsubmit = function () {
      jQuery.fn.editable.defaults.onsubmit = undoableOnsubmit;
    }
    jQuery.fn.editable.defaults.onsubmit = function(settings,self) {
      undoableOnsubmit.apply(this,[settings,self]);
      return customFunction.apply(this,[settings,self]);
    }
  };
  
  $.editable.unpackageCustomPlugin = $.noop;
  $.editable.unpackageCustomOnsubmit = $.noop;
}();
