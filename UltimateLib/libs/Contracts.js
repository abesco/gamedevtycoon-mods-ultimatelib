/**
 * @fileOverview This is an API for adding contracts to the game
 * @version 0.1.0b
 * @author SirEverard
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.Contracts = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loading...");

    /**
     * @description Initializes the module.
     * @public
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
     * @description Adds a custom contract.
     * @public
     * @param {contract object}
    */    
	/* UltimateLib Contract Format
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
     * @description Checks the contract for errors.
     * @private
     * @param {contract object}
     * @return {bool} Pass or Fail the check
    */  
	function contractCheck(contract){
		if (!(Checks.checkPropertiesPresent(contract, ['name', 'description', 'requiredD', 'requiredT', 'payment','penalty','weeksToFinish','rF','size']) 
		   )) {
		   	return false;
		};
		return true;	
	};
		
	/**
     * @description Formats the contract object to full contract object
     * @private
     * @param {contract object}
     * @return {full-contract object}
    */  
     /* Real Contract Format
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
     * @description Adds custom contracts.
     * @private
     * @return {contract object array}
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
     * @description Returns all pertinent collected contracts.
     * @public
     * @param {GDT company object}
     * @return {contract object array}
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