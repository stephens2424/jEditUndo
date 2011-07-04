$(document).ready(function () {
  var undo = new UndoManager();
  $('#testDiv').editable(function (value) {
    console.log("Test div is '" + value + "'.");
    return value;
  },{
  "plugin":function (settings,self) {
    var form = this;
    undo.undoable('undo change',function () {
      form.find('input').each(function () {
        this.val(this.val());
      });
    form.submit();
    });
  }});
  $('#undoButton').click(function () {
    undo.undo();
  });
});