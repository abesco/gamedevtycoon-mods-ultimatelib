/**
 * @class Test
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description  This is a simple test module that can be used as a base for creating a custom library module.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 UltimateLib.Test = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Test loading...");
        
    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Test init ran.");
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Test loaded :-)");
    
    return self;
})(UltimateLib.Test || {});