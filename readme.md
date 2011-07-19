#jEditUndo

This library builds upon [jQuery](http://jquery.com/), facilitating the use of [jeditable](http://www.appelsiini.net/projects/jeditable) and [jsUndoable](http://jscott.me/jsundoable.html) together. It allows elements marked as editable-in-place to be tracked by the undo manager.

To use this plugin, simply include the script on your page following the three plugins it augments:

    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jsundoable.js"></script>
    <script type="text/javascript" src="jquery.jeditable.js"></script>
    <script type="text/javascript" src="jEditUndo.js"></script>

Follow the respective instructions for jeditable and jsUndoable to implement their functionality. This plugin will automatically provide you with an undo manager instance, accessible at ```jQuery.undoManager```. This plugin uses both the ```onsubmit``` and ```plugin``` options on jeditable, so, to incorporate your own additions to jeditable, you need to package them with jEditUndo using the following functions:

    $.editable.packageCustomPlugin(type,customFunction);

```type``` is a string designating the input type your plugin extends.

    $.editable.packageCustomOnsubmit(customFunction);

###License

(c) 2011 Stephen Searles

jEditUndo is dual licensed under both MIT and GPL.

http://stephensearles.com/jEditUndo/

