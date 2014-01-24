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
