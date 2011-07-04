var undo = new UndoManager({
    undoChange:function () {
      console.log("Undo registered");
    }
  });
$.extend(jQuery,new UndoManager({
  undoChange:function() {
    console.log("Undo registered.");
  }
}));
$.extend($.editable.types.text,{
  plugin:function (settings,self) {
    console.log("plugin applied");
    var form = this;
    undo.undoable('undo change',function () {
      form.find('input').each(function () {
        this.val(this.val());
      });
      form.submit();
    });
  }
});
