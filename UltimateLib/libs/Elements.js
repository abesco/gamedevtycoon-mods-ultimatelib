/**
 * @fileOverview Elements is an UltimateLib library providing easy dom elements access capabilities to UltimateLib
 * @author alphabit and SirEverard
 * @version 1.0.0
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

    /**
     * @description The Head element of the document.
     * @returns The Head DOM Element wrappen in a jQuery element object.
     * @property {dom} head
     * @public
    */         
    self.Head           = $('head');

    /**
     * @description The Body element of the document.
     * @returns The Body DOM Element wrappen in a jQuery element object.
     * @property {dom} Body
     * @public
    */         
    self.Body           = $('body');

    /**
     * @description The Settings Panel element of the game.
     * @returns The Settings Panel DOM Element wrapped in a jQuery element object.
     * @property {dom} SettingsPanel
     * @public
    */         
    self.SettingsPanel  = $('#settingsPanel');
      
    /**
     * @description The gameContainerWrapper.
     * @returns The gameContainerWrapper of the GDT wrapped in a jQuery element object.
     * @property {dom} GameContainerWrapper
     * @public
    */         
    self.GameContainerWrapper  = $('#gameContainerWrapper');
      
    /**
     * @description The gameContainerWrapper.
     * @returns The gameContainerWrapper of the GDT wrapped in a jQuery element object.
     * @property {dom} SimpleModalContainer
     * @public
    */   
    self.SimpleModalContainer  = $('#simplemodal-container');
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loaded :-)");

    return self;
})(UltimateLib.Elements || {});
