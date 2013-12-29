/**
 * @fileOverview This is a simple test module
 * @version 1.0.0
 * @author alphabit
 * @constructor
 * @augments UltimateLib
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