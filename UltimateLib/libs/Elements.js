/**
 * @fileOverview Elements is an UltimateLib library providing easy dom elements access capabilities to UltimateLib
 * @author alphabit and SirEverard
 * @version 1.0.0
 */
  
/**
 * @description Elements provides quick access to some important dom elements. This class handles all the loading work for including the libraries related to this package.
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.Elements = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loading...");
    
    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Elements init ran.");
    };
        
    self.Body           = $('body');
    self.SettingsPanel  = $('#settingsPanel');
    self.Head           = $('head');
      
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loaded :-)");

    return self;
})(UltimateLib.Elements || {});
