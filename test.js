$.editable.packageCustomPlugin("text",function (settings,self) {
  alert("Plugin called!");
});
$.editable.packageCustomOnsubmit(function (settings,self) {
  alert("Onsubmit!");
});
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
  $('#testDiv-select').editable(function (value) {
    return value;
  },{
    type:'select',
    submit:'save',
    data:{"opt1":"Editable with select","opt2":"I've been edited with select","opt3":"I've been edited with select again"}
  });
  $('#undoButton').click(function () {
    $.undoManager.undo();
  });
  $('#redoButton').click(function() {
    $.undoManager.redo();
  });
});
