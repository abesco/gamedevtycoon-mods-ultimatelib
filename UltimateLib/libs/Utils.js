/**
 * @class Utils
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.0
 * @description Utility library with useful functions for your code.
 * @fileOverview Utility library with useful functions for your code.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Utils = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loading...");

        /**
         * @public
         * @function getFormattedNumber
         * @description Returns a formatted numbers in the scientific format 124E5
         * @param {int} num The number to format
         * @returns A scientifical formatted value
        */    
        self.getFormattedNumber = function (num) {
			var s = num.toString().replace(",", ".");
			var n = "";

			if (s.indexOf(".") >= 0) {
				var i = s.substring(0, s.lastIndexOf("."));
				var l = i.length - 1;
				if (l > 0) {
					n = s.substring(0, 1) + "E" + l;
				} else {

					n = s;
				}
			} else {
				var l = s.length - 1;
				if (l > 0) {
					n = s.substring(0, 1) + "E" + l;
				} else {
					n = s;
				}
			}

			return n;
		};

        /**
         * @public
         * @function wait4
         * @description Waits for the specified "what" variable/object to be defined an "ms" amount of time (in milliseconds) and if set, assigns the "val" value to it
         * @param {any} what The target variable/object to check and wait for
         * @param {any} val A value to assign when @see what  
         * @param {int} ms Interval time in milliseconds when to repeat check
        */           
        self.wait4 = function (what, val, ms){
            if(typeof what !== "undefined"){
                // variable exists, do what you want
                UltimateLib.Logger.log("Done waiting!");
                what = val;
            }
            else{
                UltimateLib.Logger.log("I wait4 " + ms + " ms...");
                setTimeout(function(){wait();},ms);
            }
        }

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loaded :-)");
        
    return self;
})(UltimateLib.Utils || {});