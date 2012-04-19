var injectHtml = function () {
    var ourScriptTag = $($.find('script[src*="todoapp.js"]')[0] || $.find('body script')[0]),
    	src = ourScriptTag.attr('src'),
    	rootUrl = src.substring(0, src.indexOf('widget')),
    	stylesheetUrl = rootUrl + 'stylesheets/todoapp.css';

    if (!document.getElementById('todoapp')) {
        $('<div id="todoapp"></div>').insertBefore(ourScriptTag);
    }

    if (typeof document.createStyleSheet !== 'undefined') {
        document.createStyleSheet(stylesheetUrl);
    } else {
        $('<link href="' + stylesheetUrl + '" rel="stylesheet" type="text/css">').prependTo($('head'));
    }
};

var configureRpc = function() {
    todoapp.xhr = new easyXDM.Rpc({
                            remote: 'http://localhost:8000/javascripts/easyXDM/cors/index.html',
                        }, {
                            remote: {
                                request: {}
                            }
                        });
}

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

	injectHtml();
    configureRpc();

  	// Finally, we kick things off by creating the **App**.
  	var App = new AppView();

});