/**
 * @class Test
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description This is a simple test module.
 * @fileOverview This is a simple test module.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

 UltimateLib.Test = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Test loading...");
        
    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Test init ran.");
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Test loaded :-)");
    
    return self;
})(UltimateLib.Test || {});