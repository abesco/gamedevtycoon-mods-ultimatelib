 /**
 * @class Research
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @description This is an API for adding differnt types of research to the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 * @example
        Special Research Format
        {
            id: "UniqueID",
            name: "Research Name".localize(),
            pointsCost: 100, //Number of research points
            duration: 3E4, //Time taken to research
            cost: 50E4, //Cost of the research (cash)
            canResearch: function (company) {
                return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
            },
            category: "Debugging", //Category for classing your research. Can be a new category.
            categoryDisplayName: "Debugging".localize(), //Name shown for the Category
            complete: function () {
                //Stuff that happens when the research completes.
            }
        };
        
        Lab Research Format
        {
            id: "UniqueID",
            name: "Research Name".localize(),
            pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
            canResearch: function (company) {
                return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
            },
            iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
            description: "Description of your research.".localize(),
            targetZone: 2, //Unconfirmed what the hell this does. Poke it and see.
            complete: function () {
                //Stuff that happens when the research completes.
            }
        };
                
 */ 
 
UltimateLib.Research = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Research loading...");

    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Research init ran.");
    };
    
	/**
     * @method addSpecial
     * @description Adds a special/oneoff research.
     * @param {Object} research An object of using the UltimateLib Special Research Format
     * @example
        Special Research Format
        {
            id: "UniqueID",
            name: "Research Name".localize(),
            pointsCost: 100, //Number of research points
            duration: 3E4, //Time taken to research
            cost: 50E4, //Cost of the research (cash)
            canResearch: function (company) {
                return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
            },
            category: "Debugging", //Category for classing your research. Can be a new category.
            categoryDisplayName: "Debugging".localize(), //Name shown for the Category
            complete: function () {
                //Stuff that happens when the research completes.
            }
        }; 
	*/
	self.addSpecial = function (research) {
		
		if (!specialCheck(research)) {
			UltimateLib.Logger.log("Special Research Failed Compatiblity Check. " + research);
			return; 
		};
		Research.SpecialItems.push(research);
		UltimateLib.Logger.log("Special Research Added");
	};
	
	/**
     * @private
     * @method specialCheck
     * @description Adds a special/oneoff research.
     * @return {Boolean} Pass or Fail the check
     * @param {Object} research An object of using the UltimateLib Special Research Format
     * @example
        Special Research Format
        {
            id: "UniqueID",
            name: "Research Name".localize(),
            pointsCost: 100, //Number of research points
            duration: 3E4, //Time taken to research
            cost: 50E4, //Cost of the research (cash)
            canResearch: function (company) {
                return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
            },
            category: "Debugging", //Category for classing your research. Can be a new category.
            categoryDisplayName: "Debugging".localize(), //Name shown for the Category
            complete: function () {
                //Stuff that happens when the research completes.
            }
        }; 
    */
	function specialCheck(research){
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'duration', 'cost','category','categoryDisplayName']) 
		   && Checks.checkUniqueness(research, 'id', Research.getAllItems()))) {
		   	return false;
		};
		return true;	
	};
	
	/**
     * @method addLab
     * @description Adds a big/lab research.
     * @param {Object} research An object of using the UltimateLib Lab Research Format
     * @example
        Lab Research Format
        {
	        id: "UniqueID",
	        name: "Research Name".localize(),
	        pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
	        canResearch: function (company) {
		        return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
	        },
	        iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
	        description: "Description of your research.".localize(),
	        targetZone: 2, //Unconfirmed what the hell this does. Poke it and see.
	        complete: function () {
		        //Stuff that happens when the research completes.
	        }
        };
	*/  
	self.addLab = function (research) {
		if (!labCheck(research)) {
			UltimateLib.Logger.log("Lab Research Failed Compatiblity Check. " + research);
			return; 
		};
		Research.bigProjects.push(research);	
		UltimateLib.Logger.log("Lab Research Added");
	};

	/**
     * @private
     * @method labCheck
     * @description Adds a lab research.
     * @param {Object} research An object of using the UltimateLib Lab Research Format
     * @return {Boolean} Pass or Fail the check
     * @example
        Lab Research Format
        {
            id: "UniqueID",
            name: "Research Name".localize(),
            pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
            canResearch: function (company) {
                return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
            },
            iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
            description: "Description of your research.".localize(),
            targetZone: 2, //Unconfirmed what the hell this does. Poke it and see.
            complete: function () {
                //Stuff that happens when the research completes.
            }
        }; 
    */ 
	function labCheck(research){
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'iconUri', 'description']) 
		   && Checks.checkUniqueness(research, 'id', Research.getAllItems()))) {
		   	return false;
		};
		return true;
		
	};

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Research loaded :-)");
        
    return self;
})(UltimateLib.Research || {});