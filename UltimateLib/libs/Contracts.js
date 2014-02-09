/**
 * @class Contracts
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @description This API provides functionality for adding contracts to the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @since 1.3.0
 * @beta
 * @example
        UltimateLib Contract Format 
        {
            title: "Contract Name",
            ulid: uniqueID,
            description: "Contract description",
            isRandom: true, // If true will be randomly added when contracts are requested (only if trigger conditions are met).
            randomChance: 10, // Will have a 1 in 10 chance of appearing in contract list
            canTrigger: function (company) {
                return company.gameLog.length > 3; // Bool value determining whether the contract can be taken or not.
            },
            complete: c.complete,
            repeatable: c.repeatable,
            requiredD: 54, // Design points required
            requiredT: 10, // tech points required
            payment: 2E6, // Payment on completion 
            penalty: -2E3, // Penelty for not completing on time.
            weeksToFinish: 4, // Number of weeks to complete the contract.
            rF: 1, // Research Factor Standard Range: 0.2 - 1.5  
            size: "small" //"small", "medium", or "large"
        };

 */ 
UltimateLib.Contracts = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loading...");

    /**
     * @method init 
     * @description Initializes the module.
    */ 
    self.init = function(){             

        hijackgetAvailable();
        hijackContractComplete();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");


    };

    /**
     * @property {Array} Small
     * @description An array that contains small sized UL Contracts
     * @public
    */
    self.Small = [];

    /**
     * @property {Array} Medium
     * @description An array that contains medium sized UL Contracts
     * @public
    */
    self.Medium = [];

    /**
     * @property {Array} Large
     * @description An array that contains large sized UL Contracts
     * @public
    */
    self.Large = [];

	/**
     * @method add
     * @description Adds a custom contract.
     * @param {Object} contract An object that has the specification shown in the example box (UltimateLib Contract Format)
     * @example
        UltimateLib Contract Format 
        {
            title: "Contract Name",
            ulid: uniqueID,
            description: "Contract description",
            isRandom: true, // If true will be randomly added when contracts are requested (only if trigger conditions are met).
            randomChance: 10, // Will have a 1 in 10 chance of appearing in contract list
            canTrigger: function (company) {
                return company.gameLog.length > 3; // Bool value determining whether the contract can be taken or not.
            },
            complete: c.complete,
            repeatable: c.repeatable,
            requiredD: 54, // Design points required
            requiredT: 10, // tech points required
            payment: 2E6, // Payment on completion 
            penalty: -2E3, // Penelty for not completing on time.
            weeksToFinish: 4, // Number of weeks to complete the contract.
            rF: 1, // Research Factor Standard Range: 0.2 - 1.5  
            size: "small" //"small", "medium", or "large"
        };
	*/
	self.add = function (contract) {
	
		if (!contractCheck(contract)) {
		    UltimateLib.Logger.log("Contract Failed Compatiblity Check: " + contract.name);
		    
			return; 
		}
		
		var fcontract = formatContract(contract);
		switch (fcontract.size){
			case "small":
			    self.Small.push(fcontract);
				break;
			case "medium":
			    self.Medium.push(fcontract);
				break;
			case "large":
			    self.Large.push(fcontract);
			    break;
		    default:
		        break;
		}
		console.log("Contract Added: " + fcontract.name);
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
            title: "Contract Title",
            ulid: uniqueID,
            description: "Contract description",
            isRandom: true, // If true will be randomly added when contracts are requested (only if trigger conditions are met).
            randomChance: 10, // Will have a 1 in 10 chance of appearing in contract list
            canTrigger: function (company) {
                return company.gameLog.length > 3; // Bool value determining whether the contract can be taken or not.
            },
            complete: function (company) {
                //complete fuction
            },
            repeatable: false,
            requiredD: 54, // Design points required
            requiredT: 10, // tech points required
            payment: 2E6, // Payment on completion 
            penalty: -2E3, // Penelty for not completing on time.
            weeksToFinish: 4, // Number of weeks to complete the contract.
            rF: 1, // Research Factor Standard Range: 0.2 - 1.5  
            size: "small" //"small", "medium", or "large"
        };
    */
	function contractCheck(contract){
	    return (Checks.checkPropertiesPresent(contract, ['title', 'description', 'requiredD', 'requiredT', 'payment', 'penalty', 'weeksToFinish', 'rF', 'size']));
	}
		

    /**
     * @private
     * @method setContractComplete
     * @description Sets the contract's flag to complete.
     * @param {String} id A contracts UL Id
    */
	function setContractComplete(id) {
	    try {
	        GDT.getDataStore("UL-Contracts").data[id].complete = true;
	    }
	    catch (e) {
	        GDT.getDataStore("UL-Contracts").data[id] = {
	            complete: true
	        };

	    }

	}

    /**
     * @private
     * @method getContractComplete
     * @description Sets the contract's flag to complete.
     * @param {String} id A contracts UL Id
     * @return {Boolean} Returns true if the contract is complete. Else false.
    */
	function getContractComplete(id) {
	    var test;
	    try {
	        test = GDT.getDataStore("UL-Contracts").data[id].complete;
	    }
	    catch (e) {
	        test = false;
	    }
	    return test;
    }


	/**
     * @private
     * @method formatContract
     * @description Formats the contract object to full contract object
     * @param {Object} contract An object that has the UltimateLib Contract Format specification
     * @return {Object} An object that has the specification shown in the example box (Real Contract Format)
     * @example 
         Injected Contract Format
		    {
	            id: "genericContracts",
                ulid: "uniqueId",
				name : c.title,
				description: c.description,
				isRandom: c.isRandom,
				canTrigger: c.canTrigger,
				complete: c.complete,
                repeatable: c.repeatable,
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
                
		    }
	*/
	function formatContract(contract){


	    if (contract.repeatable === false) {
	        var keepme1 = contract.complete;
	        var keepme2 = contract.canTrigger;
	        contract.complete = function (a) {
	            setContractComplete(this.ulid);
	            keepme1(a);
	        };
	        contract.canTrigger = function (a) {
	            return getContractComplete(this.ulid) !== true && keepme2(a);
	        };
	    }

	    if (contract.repeatable === true) {
	        var keepme3 = contract.complete;
	        contract.complete = function (a) {
	            setContractComplete(this.ulid);
	            keepme3(a);
	        };
	    }


	    var c = contract;
	    return {
	        id: "genericContracts",
	        ulid: "UL-Contracts-" + c.ulid,
				name : c.title,
				description: c.description,
				isRandom: c.isRandom,
				canTrigger: c.canTrigger,
				complete: c.complete,
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
	}

	/**
     * @private
     * @method hijackgetAvailable
     * @description Gets available contracts.
     * @return {Object} An array containig object items with the UltimateLib Contract Format specification
    */  
	function hijackgetAvailable () {
		var keep = ProjectContracts.getAvailable;
		ProjectContracts.getAvailable = function(company, ctype){
		    var contracts = keep(company, ctype);
		    if (ctype === "generic") {
			    contracts.addRange(UltimateLib.Contracts.collection(company));
			    UltimateLib.Logger.log("Contract Collection Added");
			}
			return contracts;				
		};
	}
	
    /**
     * @private
     * @method hijackContractComplete
     * @description Injects a complete callback for custom contracts.
     * @return {Object} An array containig object items with the UltimateLib Contract Format specification
    */
	function hijackContractComplete() {
	    var keep = ProjectContracts.genericContracts.complete;

	    ProjectContracts.genericContracts.complete = function (company, success, data) {
	        try {
	            data.complete(company);
	        }
	        catch (e) { }
	        keep(company, success, data);
	    };
	}



    /**
     * @private
     * @method randomContract
     * @description Decides whether a random contract is chosen or not.
     * @param {Boolean} random True if the contract is a random contract.
     * @param {Integer} chance A number larger than 1 donating the chance that the contract is giving.
     * @return {Boolean} random True indicating that the contract is chosen.
    */
	function randomContract(random, chance) {
	    if (random === true) {
	        if ((1 === Math.floor((Math.random() * chance) + 1)) === false) {
	            random = false;
	        }
	    }
	    if (random === false) {
	        random = true;
	    }
        return random;
	}
    
	/**
     * @method collection
     * @description A collection of all pertinent contracts.
     * @param {Object} company The GDT company object
     * @return {Array} An array of objects containing UltimateLib Contract Format items.
    */  
	self.collection = function (company) {

		var collectedContracts = [];
		
			collectedContracts.addRange(self.Small);
			UltimateLib.Logger.log("Small Contracts Added");

		if (company.flags.mediumContractsEnabled){
		    collectedContracts.addRange(self.Medium);
			UltimateLib.Logger.log("Medium Contracts Added");
		}

		if (company.flags.largeContractsEnabled) {
		    collectedContracts.addRange(self.Large);
			UltimateLib.Logger.log("Large Contracts Added");
		}
		collectedContracts = $.grep(collectedContracts,
                function (e, i) {
                    return e.canTrigger(company) && randomContract(e.isRandom, e.randomChance);
                }
            );

		return collectedContracts;
	};

	// Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loaded :-)");
        
    return self;
})(UltimateLib.Contracts || {});