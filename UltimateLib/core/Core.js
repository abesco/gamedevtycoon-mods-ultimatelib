  /**
 * @class Core
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @description Core class providing the basic functionality for the UltimateLib.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Core = (function(self) {       
    /**
     * @method init
     * @description Called for global initialization after Base.init()
     * @public
    */        
    self.init = function(){

        // Initializes the logger
        UltimateLib.Logger.log("--- UltimateLib main library successfully loaded, now loading additional libs...");
               
        // Call "init" methods on all loaded libraries where applicable
        $.each( UltimateLib.libraries, function(i,v){
            var lib     = UltimateLib.getObjByName("UltimateLib." + v.name);
            var init    = lib ? lib.init : null;    

            if(init != null){
                UltimateLib.Logger.log("# Calling UltimateLib internal init function on "+v.name+" ("+v.file+").");
                init();
            }
        });

        UltimateLib.Logger.log("UltimateLib fully loaded.");
        UltimateLib.Logger.log("----------------------------------------------------------------------");

        // Now that the all the library have been loaded and initialized, we try to call the ulInit method on every module's main class
        var availMods = ModSupport.availableMods;
        
        /*
        $.each(availMods, function(i,mod){
           if(mod.active){
               if(mod.ultimatelib){
                
                   // try to get pointer to mod
                   var modptr  =   UltimateLib.getObjByName(mod.ultimatelib);
                   var ulinit  = modptr ? modptr.ulInit : null
                   if(ulinit){
                       UltimateLib.Logger.log("# Calling ulInit function on " + mod.name +" ("+mod.main+").");
                       ulinit();
                       UltimateLib.Logger.log("----------------------------------------------------------------------");
                   }
               }
           }
        });
        */
    };
    
    return self;
})(UltimateLib.Core || {});




