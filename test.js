$(document).ready(function () {
  var undo = new UndoManager();
  $('#testDiv').editable(function (value) {
    console.log("Test div is '" + value + "'.");
    return value;
  });
});