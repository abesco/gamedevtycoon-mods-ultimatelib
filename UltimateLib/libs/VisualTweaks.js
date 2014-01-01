/**
 * @fileOverview This is a library that provides and API for tweaking visual elements within the game.
 * @version 0.1.0b
 * @author SirEverard
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.VisualTweaks = (function(self) {    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.VisualTweaks loading...");
    var store = GDT.getDataStore("UltimateLib");
    
    /**
     * @description Sets up the style tags for the rest of the module.
     * @public
    */ 
   	self.init = function(){
   		UltimateLib.Logger.log("UltimateLib.VisualTweaks init ran.");
		$('head').append('<style id="visualTweaks" type="text/css"></style>');
	};
	
    /**
     * @description Give windows rounded edges.
     * @public
     * @param {radius} Rounded edge radius on the window.
    */ 
	 self.setRoundedWindows = function(radius){
		if (store.settings.roundedCorners === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedWindows = false."); return; };
		if (!(radius >= 0)) { radius = 15;}
			var tweak = $('#visualTweaks');
			tweak.append('.windowBorder { border-radius: ' + radius + 'px !important; }');
			UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedWindows set."); 
	};
	
    /**
     * @description Adds a style to the overflow scrollbar
     * @public
     * @param {scrollbar style} 1 = default scrollbar styles
    */ 
	self.setScrollBar = function(style){
		if (store.settings.scrollBar === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.scrollBar = false."); return; };
		var tweak = $('#visualTweaks');
		switch (style){
			case 1:
				tweak.append ("::-webkit-scrollbar { width: 12px; }");
				tweak.append ("::-webkit-scrollbar-track-piece { width: 6px; }");
				tweak.append ("::-webkit-scrollbar-track { width: 12px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);  border-radius: 8px; }");
				tweak.append ("::-webkit-scrollbar-thumb { border-radius: 8px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);  background: radial-gradient(ellipse at center, rgba(250,198,149,1) 0%,rgba(245,171,102,1) 47%,rgba(239,141,49,1) 100%); }"); 
				UltimateLib.Logger.log("UltimateLib.VisualTweaks.setScrollBar set."); 
			break;
			default: 
				tweak.append ("::-webkit-scrollbar { width: 12px; }");
				tweak.append ("::-webkit-scrollbar-track-piece { width: 6px; }");
				tweak.append ("::-webkit-scrollbar-track { width: 12px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);  border-radius: 8px; }");
				tweak.append ("::-webkit-scrollbar-thumb { border-radius: 8px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);  background: radial-gradient(ellipse at center, rgba(250,198,149,1) 0%,rgba(245,171,102,1) 47%,rgba(239,141,49,1) 100%); }"); 
				UltimateLib.Logger.log("UltimateLib.VisualTweaks.setScrollBar set."); 
			break;
		}
	};
	
    /**
     * @description Gives buttons a rounded edge.
     * @public
     * @param {radius} Rounded edge radius on the button.
    */ 
	self.setRoundedButtons = function (radius) {
		if (store.settings.roundedButtons === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.roundedButtons = false."); return; };
		if (!(radius >= 0)) { radius = 10;}
		var tweak = $('#visualTweaks');
		tweak.append ('.orangeButton, .deleteButton, .whiteButton, .selectorButton, .baseButton, .contextMenuButton { border-radius: ' + radius + 'px; }');
		UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedButtons set."); 
	};
	
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.VisualTweaks loaded :-)");

    return self;
})(UltimateLib.VisualTweaks || {});