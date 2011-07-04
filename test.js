$(document).ready(function () {
  $('#testDiv').editable(function (value) {
    console.log("Test div is '" + value + "'.");
    return value;
  });
  $('#undoButton').click(function () {
    $.undoManager.undo();
  });
});