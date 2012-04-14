var injectHtml = function () {
    var ourScriptTag = $('script[src*="todoapp.js"]').first(),
    	src = ourScriptTag.attr('src'),
    	rootUrl = src.substring(0, src.indexOf('widget')),
    	stylesheetUrl = rootUrl + 'stylesheets/todoapp.css';

    if (typeof document.createStyleSheet !== 'undefined') {
        document.createStyleSheet(stylesheetUrl);
    } else {
        $('<link href="' + stylesheetUrl + '" rel="stylesheet" type="text/css">').prependTo($('head'));
    }
};

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

	injectHtml();

  	// Finally, we kick things off by creating the **App**.
  	var App = new AppView();

});