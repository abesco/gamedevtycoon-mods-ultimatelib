 /**
 * @class Publishers
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This API provides functionality for adding Publishers to the game
 * @fileOverview This API provides functionality for adding Publishers to the game
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 */ 
 
UltimateLib.Publishers = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loading...");

    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
    	/*
    	// Zero Contract Stores
    	var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames = [];
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");
        */
    };
    
    /**
     * @method addPublisherName
     * @description Adds publisher name to array
     * @param {String} name Publisher id/name
    */  
    self.addPublisherName = function(name){
 		var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames.push(name);
    };
    
    /**
     * @private
     * @method hijackgetAvailable
     * @description Gets available publishers.
     * @return {Object} An array containig object items with the UltimateLib Publisher Format specification
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
     * @method collection
     * @description Returns all custom contracts.
     * @return {Object} An array containig a list of publisher names
    */  
	self.collection = function () {
		var getstore = GDT.getDataStore("UltimateLib").settings;
		return getstore.publisherNames;
	};
    	
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loaded :-)");
        
    return self;
})(UltimateLib.Publishers || {});