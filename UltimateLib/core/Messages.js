/**
 * @class Messages
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @description Messages class providing customized javascript messaging and notification capabilities at a lower level.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Messages = (function(self) {

	/**
     * @private
     * @method overrideAlert 
     * @description Overrides the window.alert to allow for better error messages.
    */
    function overrideAlert() {
        // m = message 
        // t = type
    	window.alert = function (m, t) {
    		console.log(t);
    		console.log(m);
    		self.show(m, t);
        };
    }


    /**
     * @property stack
     * @type Array
     * @default "[]"
     * @description Messages stack.
    */
    self.stack = [];

    /**
     * @method info
     * @description Shows an overlay info message.
     * @param {String} message The message to output to the window
    */
    self.info = function(message) {
        self.show(message, "INFO");
    };

    /**
     * @method warn
     * @description Shows an overlay warning message.
     * @param {String} message The message to output to the window
    */
    self.warn = function (message) {
        self.show(message, "WARN");
    };

    /**
     * @method error
     * @description Shows an overlay error message.
     * @param {String} message The message to output to the window
    */
    self.error = function (message) {
        self.show(message, "ERR");
    };

    /**
     * @method response
     * @description Shows an overlay response message.
     * @param {String} message The message to output to the window
    */
    self.response = function (message) {
        self.show(message, "RESP");
    };

    /**
     * @method success
     * @description Shows an overlay success message.
     * @param {String} message The message to output to the window
    */
    self.success = function (message) {
        self.show(message, "SUCC");
    };

    /**
     * @method tutorial
     * @description Shows an overlay tutorial message.
     * @param {String} message The message to output to the window
    */
    self.tutorial = function (message) {
        self.show(message, "TUT");
    };

    /**
     * @method hint
     * @description Shows an overlay hint message.
     * @param {String} message The message to output to the window
    */
    self.hint = function (message) {
        self.show(message, "HINT");
    };

    /**
     * @method show
     * @description Shows an overlay message window (replacement for alert).
     * @param {String} message The message to output to the window
     * @param {String} type Type of the message window. Allowed types are "ERROR", "SUCCESS", "HINT", "WARN", "INFO", "RESPONSE", "TUTORIAL"
     * @param {String} [title=undefined] Optional custom title
     * @param {String} [url=undefined] Optional custom url
    */
    self.show = function (message, type, title, url) {

        var bodyText = "" + message;
        type = type ? type.toUpperCase() : "ERROR";

    	var doc = $(document);
    	var docWidth = doc.width();
    	var docHeight = doc.height();
    	var docCenterX = (docWidth * 0.5) - 360;
    	var docCenterY = 20;

    	var notifier = $(document.createElement('div'));
    	var notifierCloseButton = $(document.createElement('div'));
    	var notifierUrlButton = $(document.createElement('div'));
    	var notifierIconClass = '';

    	var externalUrl = url ? url : "http://forum.greenheartgames.com";

    	notifier.addClass('message window');
    	notifier.addClass('ul-vt-textbox');
    	notifier.css({ left: docCenterX, top: docCenterY });

    	notifierCloseButton.addClass('icon-remove-sign');
    	notifierCloseButton.addClass('message button close');
    	notifierCloseButton.attr('title', "Close this update notification");


    	notifierUrlButton.addClass('icon-external-link');
    	notifierUrlButton.addClass('message button url');


        if (title) {
            notifierUrlButton.attr('title', title);
        } else {
            notifierUrlButton.attr('title', "Click here to head to the Greenheart Games Forums (http://forum.greenheartgames.com/)");
        }

        switch (type) {
    		case "ERR" || "ERROR":
    		    headerText = "Error Alert";
    		    notifier.addClass('msg-error');
    		    notifierIconClass = 'icon-warning-sign';
    		    break;
    		case "SUCC" || "SUCCESS":
    			headerText = "Success Alert";
    			notifier.addClass('msg-success');
    			notifierIconClass = 'icon-ok-circle';
    			break;
    		case "HINT":
    			headerText = "Hint Alert";
    			notifier.addClass('msg-hint');
    			notifierIconClass = 'icon-eye-open';
    			break;
    		case "WARN" || "WARNING":
    			headerText = "Warning Alert";
    			notifier.addClass('msg-warning');
    			notifierIconClass = 'icon-exclamation-sign';
    			break;
    		case "INFO" || "INFORMATION":
    			headerText = "Information Alert";
    			notifier.addClass('msg-info');
    			notifierIconClass = 'icon-info-sign';
    			break;
    		case "RESP" || "RESPONSE":
    			headerText = "Information Alert";
    			notifier.addClass('msg-response');
    			notifierIconClass = 'icon-envelope';
    			break;
    		case "TUT" || "TUTORIAL":
    			headerText = "Tutorial Alert";
    			notifier.addClass('msg-tutorial');
    			notifierIconClass = 'icon-comment';
    			break;
    		default:
    			headerText = "Error Alert";
    			notifier.addClass('msg-default');
    			notifierIconClass = 'icon-exclamation-sign';
    			break;
    	}

    	$('#gameContainerWrapper').append(notifier);

    	notifier.html('<h3><i class="' + notifierIconClass + ' icon-2x">&nbsp;&nbsp;<span class="message-header">' + headerText + '</span></i></h3>' + '<p class="message">' + bodyText + '</p>');

    	if (type === "ERROR" || type === "ERR") {
    		notifier.append('<p class="message">Enabled Mods: ' + DataStore.getValue('enabledMods') + '</p>');
    	}

    	notifierCloseButton.prependTo(notifier);
    	notifierUrlButton.prependTo(notifier);

    	console.log(notifier);

    	notifierCloseButton.click(function () {
    	    var index = self.stack.indexOf(notifier);
            if (index > -1) {
                self.stack.splice(index, 1);
            }
    		notifier.remove();
    	});

    	notifierUrlButton.click(function () {
    	    PlatformShim.openUrlExternal(externalUrl);
    		notifier.remove();
    	});

        // Push message to stack
    	self.stack.push(notifier);

        // Setup position offset based on stack length
    	if (self.stack && self.stack.length > 0) {
	        var offsetX = -(5 * self.stack.length);
	        var offsetY = (5 * self.stack.length);
	        notifier.css({ left: '+=' + offsetX, top: '+=' + offsetY });
	    }
    };

    // Perform internal operations
	overrideAlert();

    return self;
})(UltimateLib.Messages || {});