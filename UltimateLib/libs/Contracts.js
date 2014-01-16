/**
 * @class Contracts
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This API provides functionality for adding contracts to the game.
 * @fileOverview This API provides functionality for adding contracts to the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 * @example
 
        UltimateLib Contract Format
        {
        name : "Contract Name",
        description : "Contract description",
        requiredD : 10, // Design points required
        requiredT : t, // tech points required
        payment : 3E4, // Payment on completion 
        penalty : -2E3, // Penelty for not completing on time.
        weeksToFinish : 4, // Number of weeks to complete the contract.
        rF : template.rF, 
        size : "size" //"small", "medium", or "large"
        }

        Real Contract Format
        {
        name : "Contract Name",
        description : "Contract description",
        requiredD : 10, // Design points required
        requiredT : t, // tech points required
        spawnedD : 0,
        spawnedT : 0,
        payment : 3E4, // Payment on completion 
        penalty : -2E3, // Penelty for not completing on time.
        weeksToFinish : 4, // Number of weeks to complete the contract.
        rF : template.rF, 
        isGeneric : true, 
        size : "size" //"small", "medium", or "large"
        }
 */ 
UltimateLib.Contracts = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loading...");

    /**
     * @method init 
     * @description Initializes the module.
    */ 
    self.init = function(){
    	/*
    	// Zero Contract Stores
    	var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.largeContracts = [];
        getstore.mediumContracts = [];
        getstore.smallContracts = [];
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");
        */
    };
    
	/**
     * @method addContract
     * @description Adds a custom contract.
     * @param {Object} contract An object that has the specification shown in the example box (UltimateLib Contract Format)
     * @example
	UltimateLib Contract Format
		{
			name : "Contract Name",
			description : "Contract description",
			requiredD : 10, // Design points required
			requiredT : t, // tech points required
			payment : 3E4, // Payment on completion 
			penalty : -2E3, // Penelty for not completing on time.
			weeksToFinish : 4, // Number of weeks to complete the contract.
			rF : template.rF, 
			size : "size" //"small", "medium", or "large"
		}
	*/
	self.addContract = function (contract) {
		
		var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.largeContracts = [];
        getstore.mediumContracts = [];
        getstore.smallContracts = [];
		
		if (!contractCheck(contract)) {
			UltimateLib.Logger.log("Contract Failed Compatiblity Check. " + contract);
			return; 
		};
		
		var fcontract = formatContract(contract);
		console.log(fcontract);
		console.log(fcontract.size);
		switch (fcontract.size){
			case "small":
				getstore.smallContracts.push(fcontract);
				console.log("small pushed");
				break;
			case "medium":
				getstore.mediumContracts.push(fcontract);
				break;
			case "large":
				getstore.largeContracts.push(fcontract);
				break;
		}
		
		UltimateLib.Logger.log("Contract Added: " + fcontract.name);
	};
		
	/**
     * @private
     * @method contractCheck
     * @description Checks the contract for errors.
     * @param {Object} contract An object that has the specification shown in the example box (UltimateLib Contract Format)
     * @return {Boolean} Pass or Fail the check
     * @example
    UltimateLib Contract Format
        {
            name : "Contract Name",
            description : "Contract description",
            requiredD : 10, // Design points required
            requiredT : t, // tech points required
            payment : 3E4, // Payment on completion 
            penalty : -2E3, // Penelty for not completing on time.
            weeksToFinish : 4, // Number of weeks to complete the contract.
            rF : template.rF, 
            size : "size" //"small", "medium", or "large"
        }
    */
	function contractCheck(contract){
		if (!(Checks.checkPropertiesPresent(contract, ['name', 'description', 'requiredD', 'requiredT', 'payment','penalty','weeksToFinish','rF','size']) 
		   )) {
		   	return false;
		};
		return true;	
	};
		
	/**
     * @private
     * @method formatContract
     * @description Formats the contract object to full contract object
     * @param {Object} contract An object that has the UltimateLib Contract Format specification
     * @return {Object} An object that has the specification shown in the example box (Real Contract Format)
     * @example 
     Real Contract Format
		{
			name : "Contract Name",
			description : "Contract description",
			requiredD : 10, // Design points required
			requiredT : t, // tech points required
			spawnedD : 0,
			spawnedT : 0,
			payment : 3E4, // Payment on completion 
			penalty : -2E3, // Penelty for not completing on time.
			weeksToFinish : 4, // Number of weeks to complete the contract.
			rF : template.rF, 
			isGeneric : true, 
			size : "size" //"small", "medium", or "large"
		}
	*/
	function formatContract(contract){
		var c = contract;
		return {
				name : c.name,
				description : c.description,
				requiredD : c.requiredD, // Design points required
				requiredT : c.requiredT, // tech points required
				spawnedD : 0,
				spawnedT : 0,
				payment : c.payment, // Payment on completion 
				penalty : c.penalty, // Penelty for not completing on time.
				weeksToFinish : c.weeksToFinish, // Number of weeks to complete the contract.
				rF : c.rF, 
				isGeneric : true, 
				size : c.size // "small", "medium", or "large"
		};
	};

	/**
     * @private
     * @method hijackgetAvailable
     * @description Gets available contracts.
     * @return {Object} An array containig object items with the UltimateLib Contract Format specification
    */  
	function hijackgetAvailable () {
		var keep = ProjectContracts.getAvailable;
		ProjectContracts.getAvailable  = function(company, type){
			var contracts = keep(company, type);
			if (type == "generic"){contracts.addRange(UltimateLib.Contracts.collection(company)); UltimateLib.Logger.log("Contract Collection Added");}
			return contracts;				
		};
	};
	
	/**
     * @method collection
     * @description A collection of all pertinent contracts.
     * @param {GDT.company} company The GDT company object
     * @return {Array} An array of objects containing UltimateLib Contract Format items.
    */  
	self.collection = function (company) {
		
		var getstore = GDT.getDataStore("UltimateLib").settings;
		var collectedContracts = [];
		
			collectedContracts.addRange(getstore.smallContracts);
			UltimateLib.Logger.log("Small Contracts Added");
		if (company.flags.mediumContractsEnabled){
			collectedContracts.addRange(getstore.mediumContracts);
			UltimateLib.Logger.log("Medium Contracts Added");
		}
		if (company.flags.largeContractsEnabled) {
			collectedContracts.addRange(getstore.largeContracts);
			UltimateLib.Logger.log("Large Contracts Added");
		}
		
		return collectedContracts;
	};

	// Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loaded :-)");
        
    return self;
})(UltimateLib.Contracts || {});