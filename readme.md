#jEditUndo

This library builds upon [jQuery](http://jquery.com/), facilitating the use of [jeditable](http://www.appelsiini.net/projects/jeditable) and [jsUndoable together](http://jscott.me/jsundoable.html). It allows elements marked as editable-in-place to be tracked by the undo manager.

To use this plugin, simply include the script on your page following the three plugins it augments. Follow the respective instructions for jeditable and jsUndoable to implement their functionality. This plugin will automatically provide you with an undo manager instance, accessible at jQuery.undoManager. This plugin uses both the ```onsubmit``` and ```plugin``` options on jeditable, and until a later revision, they conflict with any other uses of these options.

###License

(c) 2011 Stephen Searles

jEditUndo is dual licensed under both MIT and GPL.

http://stephensearles.com/Site/jEditUndo.html

