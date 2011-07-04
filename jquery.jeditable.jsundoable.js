//add undo manager object to jQuery namespace
jQuery.undoManager = new UndoManager({
  undoChange:function() {
    console.log("Undo stack changed.");
  }
});
//extend textbox type of jeditable to handle undo
$.extend($.editable.types.text,{
  plugin:function (settings,self) {
    var form = this;
    $.undoManager.undoable('undo change',function() {
      var functionArray = new Array();
      form.find('input').each(function () {
        var originalText = $(this).val();
        functionArray.push(function() {
          $(self).text(originalText);
        });
      });
      return function () {
        for (var i in functionArray) {
          functionArray[i].apply(form);
        }
      }
    }());
  }
});
//extend textarea type with the same plugin for text
$.extend($.editable.types.textarea,{
  plugin:$.editable.types.text.plugin
});
