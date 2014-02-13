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

        window.alert = function (alertMessage) {

            headerText = "Information Alert";
            bodyText = "" + alertMessage;

            var doc = $(document);
            var docWidth = doc.width();
            var docHeight = doc.height();
            var docCenterX = (docWidth * 0.5) - 360;
            var docCenterY = (docHeight * 0.5) - 20;


            var notifier = $(document.createElement('div'));
            var notifierCloseButton = $(document.createElement('div'));
            var notifierUrlButton = $(document.createElement('div'));

            notifier.addClass('UltimateLibAlertNotifierElement');
            notifier.css({
                width: 720, height: "auto", border: '4px solid #ffffff', opacity: 1, textAlign: 'center',

                backgroundColor: '#eeeeee', position: 'absolute', top: '30px', zIndex: 10000, left: docCenterX
            });
            notifierCloseButton.addClass('icon-remove-sign');
            notifierCloseButton.css({ width: 16, height: 16, position: 'absolute', top: '9px', right: '16px', cursor: 'pointer', margin: 0, padding: 0 });
            notifierCloseButton.attr('title', "Close this update notification");

            notifierUrlButton.addClass('icon-external-link');
            notifierUrlButton.css({ width: 16, height: 16, position: 'absolute', top: '10px', right: '38px', cursor: 'pointer', margin: 0, padding: 0 });
            notifierUrlButton.attr('title', "Click here to head to the Greenheart Games Forums (http://forum.greenheartgames.com/)");

            $('#gameContainerWrapper').append(notifier);

            notifier.html('<h3>' + headerText + '</h3>' + '<p style="-webkit-user-select: text">' + bodyText + '</p>');
            notifierCloseButton.prependTo(notifier);
            notifierUrlButton.prependTo(notifier);

            notifierCloseButton.click(function () {
                notifier.remove();
            });

            notifierUrlButton.click(function () {
                PlatformShim.openUrlExternal("http://forum.greenheartgames.com/");
                notifier.remove();
            });

        };


    } 


    // Perform internal operations
    overrideAlert();

})(UltimateLib.Messages || {});