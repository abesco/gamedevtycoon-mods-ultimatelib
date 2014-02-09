 /**
 * @class Publishers
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @description This API provides functionality for adding Publishers to the game
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 * @since 1.3.0
 * @example
        UltimateLib Publisher Contract Object
        {
					ulid : "uniqueID", //Contract ID
					name : "Topic/Genre or custom name", // Optional
					publisher : "Publisher name!", Name of publisher
					isRandom: true, // If true will be randomly added when publisher contracts are requested (only if trigger conditions are met).
					randomChance: 10, // Will have a 1 in 10 chance of appearing in contract list // Optional
					canTrigger: function (company) {
					    return company.gameLog.length > 3; // Bool value determining whether the contract can be taken or not.
					},
					complete: c.complete,
					repeatable: c.repeatable,
					topic : topic, // topic id or undefined for any topic // Optional
					genre : genre, // genre id or undefined for any genre // Optional
					platform : platform, // platform id or undefined for any platform // Optional
					gameSize : size, // small, medium, large, aaa??? mmo???
					gameAudience : audience, // young, everyone, or mature
					minScore : minScore, // Score requirement
					payment : pay, // Payment for taking the contract 
					penalty : penalty, // Pelenty charged if score requirement not met, should be higher than 
					royaltyRate : royaltyRate, // Decimal percentage of sales 
		}

        Injected Publisher Contract Object
        {
					id : "publisherContracts",
					ulid: "uniqueID",  //Contract ID
					refNumber : Math.floor(Math.random() * 65535), //Ignore
					type : "gameContract", // Defines that it is a publisher contract
					name : "Topic/Genre or custom name", 
					description : "Publisher: {0}".localize().format("Publisher name!"),
					publisher : "Publisher name!", Name of publisher
					isRandom: true, // If true will be randomly added when publisher contracts are requested (only if trigger conditions are met).
					randomChance: 10, // Will have a 1 in 10 chance of appearing in contract list
					canTrigger: function (company) {
					    return company.gameLog.length > 3; // Bool value determining whether the contract can be taken or not.
					},
					complete: c.complete,
					repeatable: c.repeatable,
					topic : topic ? topic.id : undefined, // topic id or undefined for any topic
					genre : genre ? genre.id : undefined, // genre id or undefined for any genre
					platform : platform ? platform.id : undefined, // platform id or undefined for any platform
					gameSize : size, // small, medium, large, aaa??? mmo???
					gameAudience : audience, // young, everyone, or mature
					minScore : minScore, // Score requirement
					payment : pay, // Payment for taking the contract 
					penalty : penalty, // Pelenty charged if score requirement not met, should be higher than 
					royaltyRate : royaltyRate, // Decimal percentage of sales 
					disabled: true //Whether or not it can currently be used.
		}


 */ 
 
UltimateLib.Publishers = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loading...");

    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        hijackContractComplete();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");

    };
    

    /**
     * @property {Array} Small
     * @description An array that contains small sized UL Publisher Contracts
     * @public
    */
    self.Small = [];

    /**
     * @property {Array} Medium
     * @description An array that contains medium sized UL Publisher Contracts
     * @public
    */
    self.Medium = [];

    /**
     * @property {Array} Large
     * @description An array that contains large sized UL Publisher Contracts
     * @public
    */
    self.Large = [];



    /**
     * @property {Array} AAA
     * @description An array that contains AAA sized UL Publisher Contracts
     * @public
    */
    self.AAA = [];

    /**
     * @property {Array} MMO
     * @description An array that contains MMO sized UL Publisher Contracts
     * @public
    */
    self.MMO = [];






    /**
     * @method add
     * @description Adds a custom contract.
     * @param {Object} contract An object that has the specification shown in the example box (UltimateLib Contract Format)
     * @example
        UltimateLib Publisher Contract Format 

	*/
    self.add = function (contract) {

        if (!contractCheck(contract)) {
            console.log("failed");
            UltimateLib.Logger.log("Contract Failed Compatiblity Check: " + contract.ulid);
            return;
        }

        var fcontract = formatContract(contract);
        console.log(fcontract);
        switch (fcontract.gameSize) {
            case "small":
                self.Small.push(fcontract);
                break;
            case "medium":
                self.Medium.push(fcontract);
                break;
            case "large":
                self.Large.push(fcontract);
                break;
            case "AAA":
                self.AAA.push(fcontract);
                break;
            case "MMO":
                self.MMO.push(fcontract);
                break;
            default:
                console.log("Incorrect Size");
                break;
        }
        console.log("Publisher Contract Added: " + fcontract.name);
        UltimateLib.Logger.log("Publisher Contract Added: " + fcontract.name);
    };

    /**
     * @private
     * @method contractCheck
     * @description Checks the contract for errors.
     * @param {Object} contract An object that has the specification shown in the example box (UltimateLib Contract Format)
     * @return {Boolean} Pass or Fail the check
     * @example
        UltimateLib Publisher Contract Format 
    */
    function contractCheck(contract) {
        return (Checks.checkPropertiesPresent(contract, ['gameAudience', 'minScore', 'payment', 'penalty', 'royaltyRate']));
    }


    /**
     * @private
     * @method setContractComplete
     * @description Sets the publisher's contract flag to complete.
     * @param {String} id A publisher contracts UL Id
    */
    function setContractComplete(id) {
        try {
            GDT.getDataStore("UL-Publishers").data[id].complete = true;
        }
        catch (e) {
            GDT.getDataStore("UL-Publishers").data[id] = {
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
            test = GDT.getDataStore("UL-Publishers").data[id].complete;
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
        Injected Publisher Contract Object
        {
					id : "publisherContracts", //Contract ID
					refNumber : Math.floor(Math.random() * 65535), //Ignore
					type : "gameContract", // Defines that it is a publisher contract
					name : "Topic/Genre or custom name", 
					description : "Publisher: {0}".localize().format("Publisher name!"),
					publisher : "Publisher name!", Name of publisher
                    isRandom: true, // If true will be randomly added when publisher contracts are requested (only if trigger conditions are met).
                    randomChance: 10, // Will have a 1 in 10 chance of appearing in contract list
                    canTrigger: function (company) {
                        return company.gameLog.length > 3; // Bool value determining whether the contract can be taken or not.
                    },
                    complete: c.complete,
                    repeatable: c.repeatable,
					topic : topic ? topic.id : undefined, // topic id or undefined for any topic
					genre : genre ? genre.id : undefined, // genre id or undefined for any genre
					platform : platform ? platform.id : undefined, // platform id or undefined for any platform
					gameSize : size, // small, medium, large, aaa??? mmo???
					gameAudience : audience, // young, everyone, or mature
					minScore : minScore, // Score requirement
					payment : pay, // Payment for taking the contract 
					penalty : penalty, // Pelenty charged if score requirement not met, should be higher than 
					royaltyRate : royaltyRate, // Decimal percentage of sales 
                    disabled: true //Whether or not it can currently be used.
		}

	*/
    function formatContract(contract) {


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

        var name = c.name ? c.name : (c.topic ? c.topic : "Any Topic".localize()) + " / " + (c.genre ? c.genre : "Any Genre".localize());

        return {
            id: "publisherContracts",
            ulid : "UL-Publishers-" + c.ulid, //Contract ID
            refNumber : Math.floor(Math.random() * 65535), //Ignore
            type : "gameContract", // Defines that it is a publisher contract
            name : name, 
            description : "Publisher: {0}".localize().format(c.publisher),
            publisher: c.publisher, // Name of publisher
            isRandom: c.isRandom, // If true will be randomly added when publisher contracts are requested (only if trigger conditions are met).
            randomChance: c.randomChance ? c.randomChance : 1, // Will have a 1 in 10 chance of appearing in contract list
            canTrigger: c.canTrigger,
            complete: c.complete,
            repeatable: c.repeatable,
            topic: c.topic ? c.topic : undefined, // topic id or undefined for any topic
            genre: c.genre ? c.genre : undefined, // genre id or undefined for any genre
            platform: c.platform ? c.platform : undefined, // platform id or undefined for any platform
            gameSize: c.gameSize, // small, medium, large, aaa??? mmo???
            gameAudience: c.audience, // young, everyone, or mature
            minScore: c.minScore, // Score requirement
            payment: c.payment, // Payment for taking the contract 
            penalty: c.penalty, // Pelenty charged if score requirement not met, should be higher than 
            royaltyRate: c.royaltyRate, // Decimal percentage of sales 
            disabled: false //Whether or not it can currently be used.
        };
    }



    /**
     * @private
     * @method hijackgetAvailable
     * @description Gets available publisher contracts.
     * @return {Object} An array containig object items with the UltimateLib Contract Format specification
    */
    function hijackgetAvailable() {
        var keep = ProjectContracts.getAvailable;
        ProjectContracts.getAvailable = function (company, ctype) {
            var contracts = keep(company, ctype);
            if (ctype === "gameContract") {
                contracts.addRange(UltimateLib.Publishers.collection(company));
                UltimateLib.Logger.log("Publisher Collection Added");
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
        var keep = ProjectContracts.publisherContracts.complete;

        ProjectContracts.publisherContracts.complete = function (company, success, data) {
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
     * @private
     * @method checkPlatforms
     * @description Checks whether a platform is current on the market.
     * @param {String} platform Id of platform
     * @param {Object} company GDT company object
     * @return {Boolean} Returns true if platform is on the market.
    */
    function checkPlatforms(platform, company) {

        var match = false;

        $.grep(Platforms.getPlatformsOnMarket(company),
                function (e, i) {
                    if (platform === e.id || platform === undefined) {
                        match = true;
                    }
                }
            );


        return match;
    }


    /**
     * @method collection
     * @description A collection of all pertinent contracts.
     * @param {Object} company The GDT company object
     * @return {Array} An array of objects containing UltimateLib Publisher Contract Format items.
    */
    self.collection = function (company) {

        var collectedContracts = [];

            collectedContracts.addRange(self.Small);
            UltimateLib.Logger.log("Small Contracts Added");

            collectedContracts.addRange(self.Medium);
            UltimateLib.Logger.log("Medium Contracts Added");
      
        if (company.canDevelopLargeGames()) {
            collectedContracts.addRange(self.Large);
            UltimateLib.Logger.log("Large Contracts Added");
        }

        if (company.canDevelopAAAGames) {
            collectedContracts.addRange(self.AAA);
            UltimateLib.Logger.log("AAA Contracts Added");
        }

        if (company.canDevelopMMOGames) {
            collectedContracts.addRange(self.MMO);
            UltimateLib.Logger.log("MMO Contracts Added");
        }


        collectedContracts = $.grep(collectedContracts,
                function (e, i) {
                    return e.canTrigger(company) && randomContract(e.isRandom, e.randomChance) && checkPlatforms(e.platform, company);
                }
            );

        return collectedContracts;
    };




    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loaded :-)");
        
    return self;
})(UltimateLib.Publishers || {});