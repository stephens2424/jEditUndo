/*! Copyright (c) 2010 Stephen Searles (http://stephensearles.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0
 * Docs: http://stephensearles.com/Site/jEditUndo.html
 */

//add undo manager object to jQuery namespace
jQuery.undoManager = new UndoManager();
//add default callback to jeditable
jQuery.fn.editable.defaults.onsubmit = function(settings,element) {
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
}
//extend textbox type of jeditable to handle undo
$.extend($.editable.types.text,{
  plugin:function(settings,self) {
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
});
//extend textarea type with similar plugin as text
$.extend($.editable.types.textarea,{
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
});
