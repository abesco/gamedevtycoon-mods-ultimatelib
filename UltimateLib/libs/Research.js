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
        
        Hardware/Rnd Research Format
        {
            id: "UniqueID",
            name: "Research Name".localize(),
            pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
            canResearch: function (company) {
                return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
            },
            iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
            description: "Description of your research.".localize(),
            complete: function () {
                //Stuff that happens when the research completes.
            },
            repeatable: false // Allows the research to repeat after it's been completed.
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
     * @private
     * @method formatBigResearch
     * @description Adds a special/oneoff research.
     * @return {Boolean} Formatted research object
     * @param {Object} r 
     * @param {Integer} z An object of using the UltimateLib Special Research Format
     * @example
        Hardware/Rnd Research Format
        {
            id: "UniqueID",
            name: "Research Name".localize(),
            pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
            canResearch: function (company) {
                return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
            },
            iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
            description: "Description of your research.".localize(),
            complete: function () {
                //Stuff that happens when the research completes.
            },
            repeatable: false // Allows the research to repeat after it's been completed.
        };
    */

    function formatBigResearch(r, z) {

        try {
            var test = GDT.getDataStore("UL-Research").data[r.id].complete;
        }
        catch (e) {
            GDT.getDataStore("UL-Research").data[r.id] = {
                complete: false
            };
        }

        if (z === 0) {
            var keepme = r.canResearch;
            r.canResearch = function (a) {
                return a.flags.hwLabUnlocked === true && keepme(a);
            };
        }

        if (r.repeatable === false) {
            var keepme1 = r.complete;
            var keepme2 = r.canResearch;
            r.complete = function (a) {
                    GDT.getDataStore("UL-Research").data[r.id].complete = true;
                keepme1(a);
            };
            r.canResearch = function (a) {
                return GDT.getDataStore("UL-Research").data[r.id].complete !== true && keepme2(a);
            };
        }

        if (r.repeatable === true) {
            var keepme3 = r.complete;
            r.complete = function (a) {
                    GDT.getDataStore("UL-Research").data[r.id].complete = true;
                keepme3(a);
            };
        }

        if (!(r.iconUri.length > 0)) {
            r.iconUri = "./mods/UltimateLib/img/defaultResearch.png";
        }

        var research =   {
                        id: "UL-Research-" + r.id,
                        name: r.name,
                        pointsCost: r.pointsCost, 
                        canResearch: r.canResearch,
                        iconUri: r.iconUri,
                        description: r.description,
                        targetZone: z,
                        complete: r.complete                    
        };

        return research;

    }




	/**
     * @method addSpecial
     * @description Adds a special/oneoff research.
     * @deprecated Use addSpecialResearch
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
		}
		Research.SpecialItems.push(research);
		UltimateLib.Logger.log("Special Research Added");
	};

    /**
     * @method addSpecialResearch
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
	self.addSpecialResearch = function (research) {

	    if (!specialCheck(research)) {
	        UltimateLib.Logger.log("Special Research Failed Compatiblity Check. " + research);
	        return;
	    }
	    Research.SpecialItems.push(research);
	    UltimateLib.Logger.log("Special Research Added");
	};

    /**
     * @method addEngineResearch
     * @description Adds an engine research.
     * @param {Object} research An object of using the GDT Engine Research Format
     * @example
        Engine Research Format
	    {
		    id: "Better dialogues",
		    name: "Better dialogues".localize(),
		    v: 1,
		    canResearch: function (company) {
			    return LevelCalculator.getMissionLevel('Dialogs') > 2;
		    },
		    category: category,
		    categoryDisplayName: categoryDisplayName
	    };
	*/
	self.addEngineResearch = function (research) {
	    GDT.addResearchItem(research);
	    UltimateLib.Logger.log("Engine Research Added");
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
            },
            repeatable: false // Allows the research to repeat after it's been completed.
        }; 
    */
	function specialCheck(research){        
	    return (Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'duration', 'cost', 'category', 'categoryDisplayName']) && Checks.checkUniqueness(research, 'id', Research.getAllItems()));
	}
	
	/**
     * @method addLab
     * @description Adds a big/lab research.
     * @param {Object} research An object of using the UltimateLib Lab Research Format
     * @deprecated
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
	        targetZone: 2, // HardwareLab: 0, RndLab: 2
	        complete: function () {
		        //Stuff that happens when the research completes.
	        }
        };
	*/  
	self.addLab = function (research) {
		if (!labCheck(research)) {
			UltimateLib.Logger.log("Lab Research Failed Compatiblity Check. " + research);
			return; 
		}
		Research.bigProjects.push(research);	
		UltimateLib.Logger.log("Lab Research Added");
	};


    /**
     * @method addRndResearch
     * @description Adds a RnD lab research.
     * @param {Object} research An object of using the UltimateLib Lab Research Format
     * @example
        RnD Lab Research Format
        {
	        id: "UniqueID",
	        name: "Research Name".localize(),
	        pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
	        canResearch: function (company) {
		        return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
	        },
	        iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
	        description: "Description of your research.".localize(),
	        targetZone: 2, // HardwareLab: 0, RndLab: 2
	        complete: function () {
		        //Stuff that happens when the research completes.
	        },
            repeatable: false // Allows the research to repeat after it's been completed.
        };
	*/
	self.addRndResearch = function (research) {
	    research = formatBigResearch(research, 2);
	    if (!labCheck(research)) {
	        UltimateLib.Logger.log("RnD Lab Research Failed Compatiblity Check. " + research);
	        return;
	    }
	    Research.bigProjects.push(research);
	    UltimateLib.Logger.log("RnD Lab Research Added");
	};


    /**
     * @method addHardwareResearch
     * @description Adds a hardware lab research.
     * @param {Object} research An object of using the UltimateLib Lab Research Format
     * @example
        Hardware Research Research Format
        {
	        id: "UniqueID",
	        name: "Research Name".localize(),
	        pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
	        canResearch: function (company) {
		        return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
	        },
	        iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
	        description: "Description of your research.".localize(),
	        targetZone: 0, // HardwareLab: 0, RndLab: 2
	        complete: function () {
		        //Stuff that happens when the research completes.
	        },
            repeatable: false // Allows the research to repeat after it's been completed.
        };
	*/
	self.addHardwareResearch = function (research) {
	   
	    research = formatBigResearch(research, 0);
	    if (!labCheck(research)) {
	        UltimateLib.Logger.log("Hardware Research Failed Compatiblity Check. " + research);
	        return;
	    } 
	    Research.bigProjects.push(research);
	    UltimateLib.Logger.log("Hardware Research Research Added");
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
            targetZone: 2, // HardwareLab: 0, RndLab: 2
            complete: function () {
                //Stuff that happens when the research completes.
            }
        }; 
    */ 
	function labCheck(research){
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'iconUri', 'description']) && Checks.checkUniqueness(research, 'id', Research.getAllItems()))) {
		   	return false;
		}
		return true;	
	}

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Research loaded :-)");
        
    return self;
})(UltimateLib.Research || {});