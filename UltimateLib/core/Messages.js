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

    	window.alert = function (alertMessage, alertType) {
    		console.log(alertType);
    		console.log(alertMessage);
    		self.popup(alertMessage, alertType);
        };
    } 

    self.popup = function (alertMessage, alertType) {

    	var bodyText = "" + alertMessage;
    	alertType = alertType ? alertType.toUpperCase() : "ERROR";

    	var doc = $(document);
    	var docWidth = doc.width();
    	var docHeight = doc.height();
    	var docCenterX = (docWidth * 0.5) - 360;
    	var docCenterY = (docHeight * 0.5) - 20;

    	var notifier = $(document.createElement('div'));
    	var notifierCloseButton = $(document.createElement('div'));
    	var notifierUrlButton = $(document.createElement('div'));

    	notifier.addClass('message window');
    	notifier.addClass('ul-vt-textbox');
    	notifier.css({ left: docCenterX });

    	notifierCloseButton.addClass('icon-remove-sign');
    	notifierCloseButton.addClass('message button close');
    	notifierCloseButton.attr('title', "Close this update notification");


    	notifierUrlButton.addClass('icon-external-link');
    	notifierUrlButton.addClass('message button url');
    	notifierUrlButton.attr('title', "Click here to head to the Greenheart Games Forums (http://forum.greenheartgames.com/)");

    	switch (alertType) {
    		case "ERROR":
    			headerText = "Error Alert";
    			notifier.css({ //Red
    				borderColor: "#c24242",
    				backgroundColor: "#a61717"
    			});
    			break;
    		case "SUCCESS":
    			headerText = "Success Alert";
    			notifier.css({ //Green
    				borderColor: "#6cd864",
    				backgroundColor: "#1d8615"
    			});
    			break;
    		case "HINT":
    			headerText = "Hint Alert";
    			notifier.css({ //Blue
    				borderColor: "#3c59ad",
    				backgroundColor: "#153286"
    			});
    			break;
    		case "WARNING":
    			headerText = "Warning Alert";
    			notifier.css({ //Yellow
    				borderColor: "#edda72",
    				backgroundColor: "#dab903"
    			});
    			break;
    		case "INFORMATION":
    			headerText = "Information Alert";
    			notifier.css({ //White
    				borderColor: "#ffffff",
    				backgroundColor: "#eeeeee"
    			});
    			break;
    		case "RESPONSE":
    			headerText = "Information Alert";
    			notifier.css({ //White
    				borderColor: "#ffffff",
    				backgroundColor: "#eeeeee"
    			});
    			break;
    		case "TUTORIAL":
    			headerText = "Tutorial Alert";
    			notifier.css({ //Purple
    				borderColor: "#8164a5",
    				backgroundColor: "#5c368b"
    			});
    			break;
    		default:
    			headerText = "Error Alert";
    			notifier.css({ //Red
    				borderColor: "#c24242",
    				backgroundColor: "#a61d1d"
    			});

    			break;
    	}

    	$('#gameContainerWrapper').append(notifier);

    	notifier.html('<h2>' + headerText + '</h2>' + '<p class="message">' + bodyText + '</p>');

    	if (alertType === "ERROR") {
    		notifier.append('<p class="message">Enabled Mods: ' + DataStore.getValue('enabledMods') + '</p>');
    	}


    	notifierCloseButton.prependTo(notifier);
    	notifierUrlButton.prependTo(notifier);

    	console.log(notifier);

    	notifierCloseButton.click(function () {
    		notifier.remove();
    	});

    	notifierUrlButton.click(function () {
    		PlatformShim.openUrlExternal("http://forum.greenheartgames.com/");
    		notifier.remove();
    	});


    };

    // Perform internal operations
	overrideAlert();

    return self;
})(UltimateLib.Messages || {});