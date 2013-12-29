/**
 * @fileOverview This is an API for adding differnt types of research to the game.
 * @version 0.1.0b
 * @author SirEverard
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.Research = (function() {
    var self = this;
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Research loading...");

	/**
     * @description Adds a special/oneoff research.
     * @public
     * @param {special research object}
    */    
    /* Special Research Format
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
     * @description Adds a special/oneoff research.
     * @private
     * @param {special research object}
     * @return {bool} Pass or Fail the check
    */  
	function specialCheck(research){
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'duration', 'cost','category','categoryDisplayName']) 
		   && Checks.checkUniqueness(research, 'id', Research.getAllItems()))) {
		   	return false;
		};
		return true;	
	};
	
	
	/**
     * @description Adds a big/lab research.
     * @public
     * @param {big research object}
    */  
    /* Lab Research Format
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
     * @description Adds a lab research.
     * @private
     * @param {lab research object}
     * @return {bool} Pass or Fail the check
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
})();
