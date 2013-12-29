UltimateLib.Test = (function(){
    var self = this;
    
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
})();