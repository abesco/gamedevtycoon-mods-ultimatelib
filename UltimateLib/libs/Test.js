UltimateLib.Test = (function(){
    var self = this;
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Test loading...");
        
     UltimateLib.loaded = function(){
        UltimateLib.Logger.log("UltimateLib.Test init :-)");
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Test loaded :-)");
    
    return self;
})();