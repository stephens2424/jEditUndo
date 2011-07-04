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
    var form = this;
    undo.undoable('undo change',function () {
      form.find('input').each(function () {
        var $this = $(this);
        $this.val($this.val());
      });
      form.submit();
    });
  }
});
