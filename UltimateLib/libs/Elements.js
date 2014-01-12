/**
 * @class Elements
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.0
 * @description Elements provides quick access to some important dom elements. This class handles all the loading work for including the libraries related to this package.
 * @fileOverview Elements provides quick access to some important dom elements. This class handles all the loading work for including the libraries related to this package.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Elements = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loading...");
    
    /**
     * @method
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Elements init ran.");
    };

    /**
     * @description The Head element of the document. This is the Head DOM Element wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.Head           = $('head');

    /**
     * @description The Body element of the document. This is the Body DOM Element wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.Body           = $('body');

    /**
     * @description The Settings Panel element of the game. The Settings Panel DOM Element wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.SettingsPanel  = $('#settingsPanel');
      
    /**
     * @description The gameContainerWrapper. This is the gameContainerWrapper of the GDT document wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.GameContainerWrapper  = $('#gameContainerWrapper');
      
    /**
     * @description The gameContainerWrapper.
     * @returns The gameContainerWrapper of the GDT wrapped in a jQuery element object.
     * @property {dom} SimpleModalContainer
     * @public
    */   

    /**
     * @description The simple modal container div. This is the simplemodal-container element of the GDT document wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.SimpleModalContainer  = $('#simplemodal-container');
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loaded :-)");

    return self;
})(UltimateLib.Elements || {});
