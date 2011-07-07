$(document).ready(function () {
  $('#testDiv-text').editable(function (value) {
    return value;
  });
  $('#testDiv-textarea').editable(function (value) {
    return value;
  },{
  type:"textarea",
  submit:"save"
  });
  $('#undoButton').click(function () {
    $.undoManager.undo();
  });
  $('#redoButton').click(function() {
    $.undoManager.redo();
  });
});