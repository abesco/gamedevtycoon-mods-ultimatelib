/**
 * @class Elements
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @description Elements provides quick access to some important dom elements. 
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 
UltimateLib.Elements = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loading...");
    
    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Elements init ran.");
    };

    /**
     * @property Head
     * @type DOM
     * @default "$('head')"
     * @description The Head element of the document. This is the Head DOM Element wrapped in a jQuery element object.
    */         
    self.Head           = $('head');

    /**
     * @property Body
     * @type DOM
     * @default "$('body')"
     * @description The Body element of the document. This is the Body DOM Element wrapped in a jQuery element object.
    */         
    self.Body           = $('body');

    /**
     * @property SettingsPanel
     * @type DOM
     * @default "$('#settingsPanel')"
     * @description The Settings Panel element of the game. The Settings Panel DOM Element wrapped in a jQuery element object.
    */         
    self.SettingsPanel  = $('#settingsPanel');
      
    /**
     * @property GameContainerWrapper
     * @type DOM
     * @default "$('#gameContainerWrapper')"
     * @description The gameContainerWrapper. This is the gameContainerWrapper of the GDT document wrapped in a jQuery element object.
     */    
    self.GameContainerWrapper  = $('#gameContainerWrapper');
   
    /**
     * @property SimpleModalContainer
     * @type DOM
     * @default "$('#simplemodal-container')"
     * @description The simple modal container div. This is the simplemodal-container element of the GDT document wrapped in a jQuery element object.
      */      
    self.SimpleModalContainer  = $('#simplemodal-container');
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loaded :-)");

    return self;
})(UltimateLib.Elements || {});
