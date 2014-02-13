/**
 * @class Logger
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @description Simple logger for the UltimateLib class. This class is used for simple console based logging purposes related to this package.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Logger = (function(self) {
    /**
     * @private
     * @method formatDate 
     * @description Format a date to iso standard yyyy-mm-dd hh:mm:nn
     * @param {Date} dt Date object
     * @return A string containing a formatted representation of the date in the ISO format (yy-M-dd)
    */        
    function formatDate(dt){
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }   
        return [[AddZero(dt.getFullYear()), AddZero(dt.getMonth() + 1), dt.getDate()].join("-"), [AddZero(dt.getHours()), AddZero(dt.getMinutes()), AddZero(dt.getHours())].join(":")].join(" ");
    }
    
    /**
     * @private
     * @method alertOverride 
     * @description Overrides the window.alert to allow for better error messages.
    */
    function alertOverride() {

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


    } alertOverride();






    /**
     * @property enabled 
     * @type Boolean
     * @default false
     * @description Enables / Disables logging
    */    
    self.enabled = false;
    
    /**
     * @method log
     * @description Outputs a message to console using a friendly output
     * @param {String} msg The message to output to console
     * @param {String} ex Optional argument to automatically log an exception
    */    
    self.log = function(msg, ex){
        if(!self.enabled){
            return;
        }
        
        var now = formatDate(new Date());
        
        var m = '';
        if(typeof ex == 'undefined'){
            m = now + ": " + msg;
        }
        else {
            m = now + ": Error! " + msg + "\n" +  ex.message;
        }
        console.log(m);
    };
    
    return self;
})(UltimateLib.Logger || {});
