//add undo manager object to jQuery namespace
jQuery.undoManager = new UndoManager({
  undoChange:function() {
    console.log("Undo stack changed.");
  }
});
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
  $.undoManager.undoable('undo name',function() {
    return $.editable.types.text.undoFunction;
  }(),[submitFunction,form,settings]);
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
      for (var i in functionArray) {
        functionArray[i].apply($form);
      }
      $form.find('input').prop('type','hidden');
      $form.submit(submitFunction);
      $('body').append($form);
      $form.triggerHandler('submit');
      $form.remove();
      console.log("I passed submit");
    };
  }
});
//extend textarea type with the same plugin for text
$.extend($.editable.types.textarea,{
  plugin:$.editable.types.text.plugin
});
