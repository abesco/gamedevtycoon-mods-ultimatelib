/**
 * @class Utils
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @description  Utility library with useful functions for your code.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Utils = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loading...");
    
        /**
         * @private
         * @method sortAlpha
         * @description Comparer method for alphanumeric sorting
         * @param {String} a First string 
         * @param {String} b Second string
         * @return {Integer} 1 if a is greater than b else -1.
        */      
        function sortAlpha(a, b) {
           return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        }

        /**
         * @private
         * @method sortNum
         * @description Comparer method for numeric sorting
         * @param {Number} a First number
         * @param {Number} b Second number
         * @return {Integer} 1 if a is greater than b else -1.
        */           
        function sortNum(a, b) {
           return a > b ? 1 : -1;
        }
       
        /**
         * @method getFormattedNumber
         * @description Returns a formatted numbers in the scientific format 124E5
         * @param {Integer} num The number to format
         * @return {Integer} A scientifical formatted value
        */    
        self.getFormattedNumber = function(num) {
			var s = num.toString().replace(",", ".");
			var n = "";
			var l; 
			if (s.indexOf(".") >= 0) {
				var i = s.substring(0, s.lastIndexOf("."));
				l = i.length - 1;
				if (l > 0) {
					n = s.substring(0, 1) + "E" + l;
				} else {

					n = s;
				}
			} else {
				l = s.length - 1;
				if (l > 0) {
					n = s.substring(0, 1) + "E" + l;
				} else {
					n = s;
				}
			}

			return n;
		};

        /**
         * @method wait4
         * @description Waits for the specified "what" variable/object to be defined an "ms" amount of time (in milliseconds) and if set, assigns the "val" value to it
         * @param {any} what The target variable/object to check and wait for
         * @param {any} val A value to assign when @see what  
         * @param {Integer} ms Interval time in milliseconds when to repeat check
        */           
        self.wait4 = function (what, val, ms) {
            if (typeof what !== "undefined") {
                // variable exists, do what you want
                UltimateLib.Logger.log("Done waiting!");
                what = val;
            }
            else {
                UltimateLib.Logger.log("I wait4 " + ms + " ms...");
                setTimeout(function () { wait(); }, ms);
            }
        };
        
        /**
         * @method sort
         * @description Sorts the specified array using the desired type and sorting direction
         * @param {Array} array The array to sort
         * @param {String} typ A string indicating the type of sorting. alpha for alphanumeric or num for numeric.
         * @param {Boolean} asc True for sorting in ascending direction, false for descending direction.
         * @return {Array} The sorted input array.
        */           
       self.sort = function (array, typ, asc) {
           var sorted = [];
           if (typ == "alpha") {
               sorted = array.sort(sortAlpha);
           }
           if (typ == "num") {
               sorted = array.sort(sortNum);
           }
           if (asc === false) {
               sorted.reverse();
           }
           return sorted;
       };

        /**
         * @method compare
         * @description Compares the 1st value with the 2nd value using compare operators.
         * @param {String|Number} val1 A number or string to compare. 
         * @param {String|Number} val2 A number or string to compare. 
         * @param {String} op Compare operator. Allowed values are "=" for equals, "<" for less than and ">" for greater than.
         * @return {Boolean} True is comparison matched, false otherwise
        */          
       self.compare = function (val1, val2, op) {

           var newArr = false;

           if ((op == "=" || op == "eq")&& val1 == val2) {
               newArr = true;
           }

           if ((op == "<" || op == "lt") && val1 < val2) {
               newArr = true;
           }

           if ((op == ">" || op == "gt") && val1 > val2) {
               newArr = true;
           }

           return newArr;
       };

        /**
         * @method getIds
         * @description Returns an array containing the id field of an object that provides an id property.
         * @param {Array} arr The array containing objects providing an id property.
         * @return {Array} An array of ids
        */           
       self.getIds = function (arr) {

           var newArr = [];

           $.grep(arr, function (e, i) {
               newArr.push(e.id);
           });

           return newArr;
       };
        
	/**
	 * @method percentage
	 * @description Returns the percentage of a number
	 * @param {Integer} small The small number.
	 * @param {Integer} big The big number.
	 * @param {Boolean} floor Whether to round the number or not. Default: false.
	 * @return {Integer} Calculated percentage.
	*/
       self.percentage = function (small, big, floor) {

       	floor = floor ? true : false;

       	if (small === 0 || big === 0) {

       		return 0;
       	}

       	var percent = small / big * 100;

       	if (floor === true) {
       		percent = Math.floor(percent);
       	}

       	return percent;

       };


       self.devStats = function () {
       	var c = function (line, type) {
       		var color;
       		var r = "";
       		var l = "";
       		switch(type){
       			case "h1":

       				color = 'background: #333; color: #bada55; font-weight:bold;';
       				line = "--- " + line + " ---";
       				r = Array((38 - line.length) + 1).join(" ");
       				l = Array(Math.floor((r.length / 2)) + 1).join(" ");
       				r = Array((r.length - l.length) + 1).join(" ");
       				break;
       			case "h2":
       				color = 'background: #333; color: #bada55; font-weight:bold;';
       				line = "-- " + line + " --";
       				r = Array((38 - line.length) + 1).join(" ");
       				l = Array(Math.floor((r.length / 2)) + 1).join(" ");
       				r = Array((r.length - l.length) + 1).join(" ");
       				break;
       			case "h3":
       				color = 'background: #333; color: #bada55; font-weight:bold;';
       				line = "- " + line + " -";
       				r = Array((38 - line.length) + 1).join(" ");
       				l = Array(Math.floor((r.length / 2)) + 1).join(" ");
       				r = Array((r.length - l.length) + 1).join(" ");
       				break;
       			default:
       				r = Array((38 - line.length) + 1).join(" ");
       				color = 'background: #333; color: #fff';
       				break;
       		}

			
       		


			line = " #  " + l + line + r + "  # ";

			if (type == "div") {

				console.log("%c" + " " + (Array((38 + 6) + 1).join("#")) + " ", color);
				return
			}
       		if (color) {
       			console.log(("%c" + line), color);
       		} else {
       			console.log(line)
       		}

       		return;
       	}

       	var r = Research;

       	c("", "div");
       	c("Development Stats", "h1");
		c("", "div");
       	c("");
       	c("", "div");
       	c("Research Items", "h2");
       	c("Basic Items: " + r.BasicItems.length);
       	c("Special Items: " + r.SpecialItems.length);
       	c("One Time Items: " + r.OneTimeItems.length);
       	c("Lab Researches: " + r.bigProjects.length);
       	c("");
       	c("Game Engine Items", "h3");
       	c("Engine Items: " + r.engineItems.length);
       	c("Gameplay Items: " + r.gameplayItems.length);
       	c("Story Items: " + r.storyItems.length);
       	c("Dialog Items: " + r.dialogItems.length);
       	c("Level Design Items: " + r.levelDesignItems.length);
       	c("A.I. Items: " + r.aiItems.length);
       	c("World Design Items: " + r.worldDesignItems.length);
       	c("Graphic Items: " + r.graphicItems.length);
       	c("Sound Items: " + r.soundItems.length);
       	c("");
       	c(" -- Total: " + (r.getAllItems().length + r.bigProjects.length));

       	c("", "div");
       	c("");
       	c("", "div");
       	c("Misc.", "h2");
       	c("", "div");
       	c("Achivements: " + Achievements.getAllItems().length);
       	c("Platforms: " + Platforms.allPlatforms.length);
       	c("Events: " + DecisionNotifications.getAllNotificationsObjects().length);
       	c("Topics: " + Topics.topics.length);
       	c("Mods: " + ModSupport.availableMods.length);
       	c(" --Enabled: " + JSON.parse(DataStore.getValue('enabledMods')).length);
       	c("", "div");
       	c(" Powered by UltimateLib");
       	c("", "div");
       };




    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loaded :-)");
        
    return self;
})(UltimateLib.Utils || {});