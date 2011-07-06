$(document).ready(function () {
  $('#testDiv').editable(function (value) {
    return value;
  });
  $('#undoButton').click(function () {
    $.undoManager.undo();
  });
  $('#redoButton').click(function() {
    $.undoManager.redo();
  });
});