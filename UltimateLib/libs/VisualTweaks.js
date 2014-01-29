/**
 * @class VisualTweaks
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @description This is a library that provides and API for tweaking visual elements within the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 * @deprecated
 */ 
UltimateLib.VisualTweaks = (function(self) {    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.VisualTweaks loading... - Deprecated");
    
    /**
     * @method init
     * @description Sets up the style tags for the rest of the module.
     * @deprecated Visuals.Tweak.init
    */
    self.init = function () {
        //Deprecated. Now Visuals.Tweak.init
    };
    
    /**
     * @method setAllTweaks
     * @description Enables all available tweaks. 
     * @param {String} style The style to apply **not yet implemented
     * @deprecated 
    */   
    self.setAllTweaks = function (style) {
        UltimateLib.Visuals.Tweaks.setAllTweaks(style);
    };


    /**
     * @method setRoundedWindows
     * @description Give windows rounded edges.
     * @param {Integer} radius Rounded edge radius on the window.
     * @deprecated
    */ 
    self.setRoundedWindows = function(radius){
        UltimateLib.Visuals.Tweaks.setRoundedWindows(radius);
    };
    
    /**
     * @method setScrollBar
     * @description Adds a style to the overflow scrollbar
     * @param {Integer} scrollbar style 1 = default scrollbar styles (available style: 1,2 and 3)
     * @deprecated
    */ 
    self.setScrollBar = function(style){
        UltimateLib.Visuals.Tweaks.setScrollBar(style);
    };
    
    /**
     * @method setRoundedButtons
     * @description Gives buttons a rounded edge.
     * @param {Integer} radius Rounded edge radius on the button.
     * @deprecated
    */ 
    self.setRoundedButtons = function (radius) {
        UltimateLib.Visuals.Tweaks.setRoundedButtons(radius);
    };
    
    /**
     * @method setRoundedBars
     * @description Gives "bars" a rounded edge.
     * @param {Integer} radius Rounded edge radius on the bar.
     * @deprecated
    */ 
    self.setRoundedBars = function (radius){
        UltimateLib.Visuals.Tweaks.setRoundedBars(radius);
    };

    /**
     * @method setTextBox
     * @description Gives text boxes a rounded edge.
     * @param {Integer} radius Rounded edge radius on textboxes.
     * @deprecated
    */ 
    self.setTextBox = function (radius){
        UltimateLib.Visuals.Tweaks.setTextBox(radius);
    };

    /**
     * @method setTextBox
     * @description Gives text boxes a rounded edge.
     * @param {Integer} style The style of the fancy grads. 1 or default.
     * @deprecated
    */     
    self.setFancyGrads = function (style) {
        UltimateLib.Visuals.Tweaks.setFancyGrads(style);
    };
    
    /**
     * @method setWatermarks
     * @description Gives text boxes a rounded edge.
     * @param {String} object ID of the DOM object element.
     * @param {String} url Image url of the watermark.
     * @deprecated
    */     
    self.setWatermarks = function (object, url) {
        UltimateLib.Visuals.Tweaks.setWatermarks(object, url);
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.VisualTweaks loaded :-) - Deprecated");

    return self;
})(UltimateLib.VisualTweaks || {});