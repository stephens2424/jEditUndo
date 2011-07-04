$(document).ready(function () {
  var undo = new UndoManager({
    undoChange:function () {
      console.log("Undo registered");
    }
  });
  $('#testDiv').editable(function (value) {
    console.log("Test div is '" + value + "'.");
    return value;
  },{
  plugin:jsundoableplugin
  });
  $('#undoButton').click(function () {
    undo.undo();
  });
});