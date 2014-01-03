/**
 * @fileOverview This is an API for adding Publishers to the game
 * @version 0.1.0b
 * @author SirEverard
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.Publishers = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loading...");

    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
    	
    	// Zero Contract Stores
    	var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames = [];
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");
        
    };
    
    
    /**
     * @description Adds publisher name to array
     * @param {publisher id/name object}
     * @private
    */  
    self.addPublisherName = function(name){
 		var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames.push(name);
    	
    };
    
    
    /**
     * @description Adds publisher contracts.
     * @private
     * @return {publisher object array}
    */  
	function hijackgetAvailable () {
		var keep = ProjectContracts.getAvailable;
		ProjectContracts.getAvailable  = function(company, type){
			var contracts = keep(company, type);
			if (type == "gameContract"){publishers.addRange(UltimateLib.Publisher.collection()); UltimateLib.Logger.log("Publisher Collection Added");}
			return contracts;				
		};
	};
	
	
	
	/**
     * @description Returns all custom contracts.
     * @public
     * @param {GDT company object}
     * @return {contract object array}
    */  
	self.collection = function () {
		var getstore = GDT.getDataStore("UltimateLib").settings;
		return getstore.publisherNames;
	};
	
	
    	
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loaded :-)");
        
    return self;
})(UltimateLib.Publishers || {});