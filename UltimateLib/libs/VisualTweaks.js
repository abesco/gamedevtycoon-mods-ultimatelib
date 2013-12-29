/**
 * @fileOverview This is a library that provides and API for tweaking visual elements within the game.
 * @version 0.1.0b
 * @author SirEverard
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.VisualTweaks = (function() {
    var self = this;
    UltimateLib.Logger.log("UltimateLib.VisualTweaks is tweaking!");
    
    /**
     * @description Sets up the style tags for the rest of the module.
     * @public
    */ 
   	self.init = function(){
   		UltimateLib.Logger.log("UltimateLib.VisualTweaks init ran.");
		UltimateLib.Elements.Head.append('<style id="visualTweaks" type="text/css"></style>');
	};
	
    /**
     * @description Give windows rounded edges.
     * @public
    */ 
	 self.setRoundedWindows = function(){
		if (store.settings.roundedCorners === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedWindows = false."); return; };
		var tweak = $('#visualTweaks');
		tweak.append('.windowBorder { border-radius: 15px !important; }');
		UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedWindows set."); 
	};
	
    /**
     * @description Adds a style to the overflow scrollbar
     * @public
    */ 
	self.setScrollBar = function(){
		if (store.settings.scrollBar === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.scrollBar = false."); return; };
		
		var tweak = $('#visualTweaks');
		tweak.append ("::-webkit-scrollbar { width: 12px; }");
		tweak.append ("::-webkit-scrollbar-track-piece { width: 6px; }");
		tweak.append ("::-webkit-scrollbar-track { width: 12px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);  border-radius: 8px; }");
		tweak.append ("::-webkit-scrollbar-thumb { border-radius: 8px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);  background: radial-gradient(ellipse at center, rgba(250,198,149,1) 0%,rgba(245,171,102,1) 47%,rgba(239,141,49,1) 100%); }"); 
		UltimateLib.Logger.log("UltimateLib.VisualTweaks.setScrollBar set."); 
	};
	
    /**
     * @description Gives buttons a rounded edge.
     * @public
    */ 
	self.setRoundedButtons = function () {
		if (store.settings.roundedButtons === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.roundedButtons = false."); return; };
		var tweak = $('#visualTweaks');
		tweak.append ('.orangeButton, .deleteButton, .whiteButton, .selectorButton, .baseButton { border-radius: 10px; }');
		UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedButtons set."); 
	};
	
    return self;
})();