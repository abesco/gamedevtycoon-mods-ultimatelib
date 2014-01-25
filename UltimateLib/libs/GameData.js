/**
 * @class GameData
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @description GameData is a class intended for easy polling/searching of data from within the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @since 1.2.0
 * @beta
 */ 
 
UltimateLib.GameData = (function (self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.GameData loading...");



    /**
     * @method
     * @description Initializes the module.
    */
    self.init = function () {
    };

    var GM = GameManager;
    var GMC = GameManager.company;

    /**
     * @method timeTilNextEvent
     * @description Returns time till next random event in milliseconds
     * @return {Integer} Time till next event (ms).
    */  
    self.timeTilNextEvent = function(){
        return GameManager.company.flags.nextRandomEvent - GameManage.gameTime;
    }

    self.News = function () {

        var self = this;

        /**
         * @method oldStories
         * @description Returns all stories/events which have already taken place.
         * @return {Array} Array of old Story Objects.
         * @example
            UltimateLib Story Object
            {
	            id      :   "UniqueID",
	            header  :   "Header Text",
                text    :   "Story text",
                date    :   "xx/xx/xx", //Date the story was triggered.
                image   :   imageUrl //null if no url present
            }
        */   
        self.oldStories = function () {
            var oldid = GMC.scheduledStoriesShown;
            var stories = [];
            oldid.forEach(stories.push(self.findStory));

            return stories;
        };

        /**
         * @method findStory
         * @description Searches all stories by it's unique id.
         * @param {String} story Unique Story Id
         * @return {Object} Returns Story Object.
         * @example
            UltimateLib Story Object
            {
	            id      :   "UniqueID",
	            header  :   "Header Text",
                text    :   "Story text",
                date    :   "xx/xx/xx", //Date the story was or will be triggered.
                image   :   imageUrl //null if no url present
            }
        */  
        self.findStory = function (story) {

            var id = UltimateLib.Utils.getIds(story, Media.allScheduledStories);
            var a = Media.allScheduledStories[id[0]];
            var b = {
                id      :   a.id,
                header  :   a.notification.header, 
                text    :   a.notification.text, 
                date    :   a.date, 
                image   :   a.notification.image ?  a.notification.image : null
            }

            return b;
        };

        return self;
    }

    self.Staff = function () {
        var self = this;

        /**
         * @method findStaff
         * @description Finds a staff member by their name and returns that staff members object.
         * @param {String} name Staff members name
         * @return {Object} Staff member object
        */   
        self.findStaff = function (name) {
            var games = GMC.staff;
            return games[jQuery.inArray(name, staff)];
        };

        /**
         * @method getStaff
         * @description Allows the querying of staff member objects.
         * @param {Object} options Options object.
         * @example
            UltimateLib.GameData.Staff.getStaff Options Object
            {
	            mode: chosenMode,       // Default      :   "all",
                                        // Type         :   {String},
                                        // "all"        :   Returns objects of all elements after applied filter/comparisons,
                                        // "filter"     :   Returns only the "filter" field of all elements after applied filter/comparisons,
                                        // "sum"        :   Returns sum of all the "filter" field elements across all objects after applied filter/comparisons,
                                        // "id"         :   Returns id's of all elements after applied filter/comparisons

	            filter: chosenFilter,   // Default      :   "all",
                                        // Type         :   {String},
                                        // "all"        :   Does not filter anything,
                                        // "id"         :   Filters and compares id values to filterVal,
                                        // "name"       :   Filters and compares staff name values to filterVal,
                                        // "sex"        :   Filters and compares male/female values to filterVal,        
                                        // "salary"     :   Filters and compares staff salary values to filterVal,    
                                        // "experience" :   Filters and compares staff experience values to filterVal,   
                                        // "speed"      :   Filters and compares staff speedFactor values to filterVal,   
                                        // "technology" :   Filters and compares staff techFactor values to filterVal,   
                                        // "research"   :   Filters and compares staff researchFactor values to filterVal,   
                                        // "design"     :   Filters and compares staff designFactor values to filterVal,   
                                        // "quality"    :   Filters and compares staff qualityFactor values to filterVal,   
                                        // "efficiency" :   Filters and compares staff efficiencyFactor values to filterVal  

	            filterVal: value,       // Default      :   null,
                                        // Type         :   {String}||{Integer},
                                        // value        :   Contains value to which filter is compared. If null returns true for all comparisons.
                                        
	            compare: operator,      // Default      :   "=",
                                        // Type         :   {String},
                                        // "="||"eq"    :   Uses the comparison operator "equal to" for comparisons,
                                        // ">"||"gt"    :   Uses the comparison operator "greater than" for comparisons,
                                        // "<"||"lt"    :   Uses the comparison operator "less than" for comparisons

	            sortKey: key,           // Default      :   "none",
                                        // Type         :   {String},
                                        // "none"       :   Applies no sort method,
                                        // "id"         :   Sorts objects by id values in descending numerical order,
                                        // "name"       :   Sorts objects by name values in descending alphabetical order,
                                        // "sex"        :   Sorts objects by sex values in descending male/female order,        
                                        // "salary"     :   Sorts objects by salary values in descending numerical order,    
                                        // "experience" :   Sorts objects by experience values in descending numerical order,   
                                        // "speed"      :   Sorts objects by speed values in descending numerical order,   
                                        // "technology" :   Sorts objects by technology values in descending numerical order,   
                                        // "research"   :   Sorts objects by research values in descending numerical order,   
                                        // "design"     :   Sorts objects by design values in descending numerical order,   
                                        // "quality"    :   Sorts objects by quality values in descending numerical order,   
                                        // "efficiency" :   Sorts objects by efficiency values in descending numerical order 

	            sortAsc: bool,          // Default      :   null,
                                        // Type         :   {Boolean},
                                        // true         :   Sorted array returned in ascending order,
                                        // false||null  :   Sorted array returned in descending order
            }
        * @return {Array} This will return either a staff object, string or integer array depending on the query.
        */   
        self.getStaff = function (options) {
            var opt = options;
            var mode = opt.mod ? opt.mod : "all";
            var filter = opt.filter ? opt.filter : "all";
            var filterVal = opt.filterVal ? opt.filterVal : null;
            var compare = opt.compare ? opt.compare : "=";
            var sortkey = opt.sortKey ? opt.sortKey : "none";
            var sortasc = opt.sortAsc ? opt.sortAsc : null;
            var query;

            var staff = GMC.staff;

            if (mode == "all" ||
                mode == "filter" ||
                mode == "sum" ||
                mode == "id") {

                query = runFilter(staff, filter, filterVal, compare); 

                query = runSort(query, sortkey, sortasc);

                if (mode == "filter") {
                    query = modeFilter(query, filter);
                }
                if (mode == "sum") {
                    query = modeSum(query, filter, filterVal);
                }
                if (mode == "id") {
                    query = UltimateLib.Utils.getIds(query, filter);
                }
            };
            return query;
        };


        /**
         * @private
         * @method modeSum
         * @description Returns an array of all elements summed by the filter.
         * @param {Array} arr Array of Staff objects.
         * @param {String} fil Filter option.
         * @param {String|Integer} val Array of Staff objects.
         * @return {Array} Array of summed elements.
        */
        function modeSum(arr, fil, val) {
            if (fil  == "all") {
                return undefined;
            }
            var newArr = [];
            $.grep(arr, function (e, i) {
                switch (fil) {
                    case "all":        
                        newArr.push(e);
                        break;
                    case "id":        
                        newArr.push(e.id);
                        break;
                    case "name":
                        newArr[0] += e.name + ", ";
                        break;
                    case "sex":
                        if (e.sex == "male")
                        {
                            newArr.push("male");
                        };
                        if (e.sex == "female")
                        {
                            newArr.push("female");
                        };
                        break;
                    case "salary":
                        newArr[0] += e.salary;
                        break;
                    case "experience":
                        newArr[0] += e.experience;
                        break;
                    case "speed":
                        newArr[0] += e.speadFactor;
                        break;
                    case "technology":
                        newArr[0] += e.techFactor;
                        break;
                    case "research":
                        newArr[0] += e.researchFactor;
                        break;
                    case "design":
                        newArr[0] += e.designFactor;
                        break;
                    case "quality":
                        newArr[0] += e.qualityFactor;
                        break;
                    case "efficiency":
                        newArr[0] += e.efficiency;
                        break;
                    default:
                        newArr = undefined;
                        break;
                };

                return false;
            })

            if (fil == name) {
                newArr[0].substring(0, str.length - 2);

                var and = " and ";
                newArr[0].replace(/,\s([^,]+)$/, and + '$1')

            }

            if (fil == "sex"){
                var nna = newArr;
                newArr = [0,0];
                $.grep(arr, function (e, i) {
                    if (e == "male"){
                        newArr[0] += 1;
                    }
                    if (e == "female"){
                        newArr[1] += 1;
                    }
                });
            }


                return newArr;
        };

        /**
         * @private
         * @method modeFilter
         * @description Returns an array object values determined by the filter option.
         * @param {Array} arr Array of Staff objects.
         * @param {String} fil Filter option.
         * @return {Array} Array of object values determined by the filter option.
        */
        function modeFilter(arr, fil) {
            var newArr = [];
            $.grep(arr, function (e, i) {
                switch (fil) {
                    case "all":
                        newArr.push(e);
                        break;
                    case "id":
                        newArr.push(e.id);
                        break;
                    case "name":
                        newArr.push(e.name);
                        break;
                    case "sex":
                        newArr.push(e.sex);
                        break;
                    case "salary":
                        newArr.push(e.salary);
                        break;
                    case "experience":
                        newArr.push(e.experience);
                        break;
                    case "speed":
                        newArr.push(e.speadFactor);
                        break;
                    case "technology":
                        newArr.push(e.techFactor);
                        break;
                    case "research":
                        newArr.push(e.researchFactor);
                        break;
                    case "design":
                        newArr.push(e.designFactor);
                        break;
                    case "quality":
                        newArr.push(e.qualityFactor);
                        break;
                    case "efficiency":
                        newArr.push(e.efficiency);
                        break;
                    default:
                        newArr = undefined;
                        break;
                };

                return false;
            })

            return newArr;
        };

        /**
         * @private
         * @method runFilter
         * @description Filters and compares an array of staff objects.
         * @param {Array} arr Array of Staff objects.
         * @param {String} fil Filter option.
         * @param {String|Interger} val Filter value.
         * @param {String} com Comparison operator.
         * @return {Array} Array of filtered and compared objects.
        */
        function runFilter(arr, fil, val, com) {
            var newArr = $.grep(arr, function (e, i) {
                switch (fil) {
                    case "all":
                        result = true;
                        break;
                    case "id":
                        result = runCompare(e.id, val, com);
                        break;
                    case "name":
                        result = runCompare(e.name, val, com);
                        break;
                    case "sex":
                        result = runCompare(e.sex, val, com);
                        break;
                    case "salary":
                        result = runCompare(e.salary, val, com);
                        break;
                    case "experience":
                        result = runCompare(e.experience, val, com);
                        break;
                    case "speed":
                        result = runCompare(e.speadFactor, val, com);
                        break;
                    case "technology":
                        result = runCompare(e.techFactor, val, com);
                        break;
                    case "research":
                        result = runCompare(e.researchFactor, val, com);
                        break;
                    case "design":
                        result = runCompare(e.designFactor, val, com);
                        break;
                    case "quality":
                        result = runCompare(e.qualityFactor, val, com);
                        break;
                    case "efficiency":
                        result = runCompare(e.efficiency, val, com);
                        break;
                    default:
                        result = undefined;
                        break;
                };

                return result;
            })

            return newArr;
        };


        /**
         * @private
         * @method runCompare
         * @description Compares two values together.
         * @param {String|Interger} val1 Comparison value 1.
         * @param {String|Interger} val2 Comparison value 2.
         * @param {String} op Comparison operator.
         * @return {Boolean} Returns true if comparison is true, else false.
        */
        function runCompare(val1, val2, op) {
            return UltimateLib.Utils.compare(val1,val2,op);
        }

        /**
         * @private
         * @method runSort
         * @description Sorts staff object array by sort key.
         * @param {Array} arr Staff Object Array.
         * @param {String} key Sort key in which the array is sorted by.
         * @param {Boolean} asc If true array will be sorted in ascending order.
         * @return {Array} Sorted array.
        */
        function runSort(arr, key, asc) {

            var newArr;

            switch (key) {
                case "none":
                    newArr = arr;
                    break;
                case "id":
                    newArr = arr.sort(function (a, b) {
                        return a.id > b.id ? 1 : -1;
                    });
                    break;
                case "name":
                    newArr = arr.sort(function (a, b) {
                        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
                    });
                    break;
                case "sex":
                    newArr = arr.sort(function (a, b) {
                        return a.sex == b.sex ? 1 : -1;
                    });
                    break;
                case "salary":
                    newArr = arr.sort(function (a, b) {
                        return a.salary > b.salary ? 1 : -1;
                    });
                    break;
                case "experience":
                    newArr = arr.sort(function (a, b) {
                        return a.experience > b.experience ? 1 : -1;
                    });
                    break;
                case "speed":
                    newArr = arr.sort(function (a, b) {
                        return a.speedFactor > b.speedFactor ? 1 : -1;
                    });
                    break;
                case "technology":
                    newArr = arr.sort(function (a, b) {
                        return a.techFactor > b.techFactor ? 1 : -1;
                    });
                    break;
                case "research":
                    newArr = arr.sort(function (a, b) {
                        return a.researchFactor > b.researchFactor ? 1 : -1;
                    });
                    break;
                case "design":
                    newArr = arr.sort(function (a, b) {
                        return a.designFactor > b.designFactor ? 1 : -1;
                    });
                    break;
                case "quality":
                    newArr = arr.sort(function (a, b) {
                        return a.qualityFactor > b.qualityFactor ? 1 : -1;
                    });
                    break;
                case "efficiency":
                    newArr = arr.sort(function (a, b) {
                        return a.efficiency > b.efficiency ? 1 : -1;
                    });
                    break;
                default:
                    break;
            };

            if (key != "none" && asc === true) {
                newArr.reverse();
            }
            return newArr;
        };

        return self;
    };

    /*
    self.findGame = function (gameName) {
        var games = GMC.games;
        return games[jQuery.inArray(gameName, games)];
    };
    */

    return self;
})(UltimateLib.GameData || {});