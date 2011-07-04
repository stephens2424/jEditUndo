jQuery.undoManager = new UndoManager({
  undoChange:function() {
    console.log("Undo stack changed.");
  }
});
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
