 /**
 * @fileOverview Logger is an UltimateLib library providing simple logger capabilities to UltimateLib
 * @author alphabit
 * @version 1.0.0
 * @class Logger
 * @description Simple logger for the UltimateLib class. This class is used for simple console based logging purposes related to this package.
 * @constructor
 * @namespace GDT
 * @augments UltimateLib
*/
UltimateLib.Logger = (function(self) {
    /**
     * @method formatDate 
     * @description Format a date to iso standard yyyy-mm-dd hh:mm:nn
     * @private
     * @param {Date} Date object
     * @returns A string containing a formatted representation of the date in the ISO format (yy-M-dd)
    */        
    function formatDate(dt){
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }   
        return [[AddZero(dt.getFullYear()), AddZero(dt.getMonth() + 1), dt.getDate()].join("-"), [AddZero(dt.getHours()), AddZero(dt.getMinutes()), AddZero(dt.getHours())].join(":")].join(" ");
    }
    
    /**
     * @description Enables / Disables logging
     * @public
     * @param {bool} Enable / Disable logging
    */    
    self.enabled = false;
    
    /**
     * @description Outputs a message to console using a friendly output
     * @public
     * @param {string} The message to output to console
     * @param {string} Optional argument to automatically log an exception
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
