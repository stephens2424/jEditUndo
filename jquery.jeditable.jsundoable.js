var jsundoableplugin = function (settings,self) {
  var form = this;
  undo.undoable('undo change',function () {
    form.find('input').each(function () {
      this.val(this.val());
    });
  form.submit();
  });
}