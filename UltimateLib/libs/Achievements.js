/**
 * @class Achievements
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @since 1.3.0
 * @author Chad Keating (SirEverard)
 * @description Achievements is an Ultimate Lib class intended to provide an API for adding achievements to the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @example 
        Ultimate Acheivements Example Object
        {
                id: "UltimateLib",
                title: "UltimateLib",
                description: "Played a game with UltimateLib installed.",
                isAchieved: function (a) {
                    return true;
                },
                tint: "#FFFFFF",
                value: 10,
                hidden: true,
                canEarnMultiple: false
        };

 * @beta
 */

UltimateLib.Achievements = (function (self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Achievements loading...");
    
    /*
                Previously used colours:

                #78BA00 = Lime Green
                #E5E4E2 = "Platinum"
                #F4F4F4 = white
                #4E0000 =  Dark red
                #F4B300 =  Yellow orangey
                #00AAAA = Turquoise
                #FF981D = Orange       
                white
                green
    */

    /**
     * @method init 
     * @description Initializes the module.
    */
    self.init = function () {
        achievmentHook();
        self.add(ultimate);
    };

    /**
     * @method achievmentHook
     * @description Hooks into Achievements.getAllItems and adds the custom achievements.
     * @param {Object} options An object with acheivement options.
     * @private 
    */
    function achievmentHook() {

        var keepme = Achievements.getAllItems;

        Achievements.getAllItems = function () {

            var keep = keepme();
            keep.addRange(self.collection);
            return keep;

        };
    }


    /**
     * @method getTotalCount
     * @description Returns the number of all achievements in the game.
     * @return {Integer} Returns the number of all achievements in the game.
    */
    self.getTotalCount = function () {
       return Achievements.getAllItems.length;
    };

    /**
     * @method getCustomCount
     * @description Returns the number of all custom achievements in the game.
     * @return {Integer} Returns the number of all custom achievements in the game.
    */
    self.getCustomCount = function () {
        return self.collection.length;
    };


    /**
     * @method getAllItems
     * @description Returns an array of all achievements in the game.
     * @return {Array} Returns an array of all achievements in the game.
    */
    self.getAllItems = function () {
        return Achievements.getAllItems;
    };
    /**
     * @method getCustomItems
     * @description Returns an array of all custom achievements in the game.
     * @return {Array} Returns an array of all custom achievements in the game.
    */
    self.getCustomItems = function () {
        return self.collection;
    };


    /**
     * @method exists
     * @description Checks to see if the given achievement id exsists in the game.
     * @param {String} id An Id string relating to an achievement.
     * @return {Boolean} True if id exists false otherwise.
    */
    self.exists = function (id) {
        var exists = false;
        $.grep(id, function (e, i) {
            if (e.id === id) {
                exists = true;
            }
        });
        return exists;
    };


    /**
     * @method get
     * @description Returns the acheivement object relating to the
     * @param {String} id An Id string relating to an achievement.
     * @return {String} Returns achievement or "undefined".
    */
    self.get = function (id) {
        var ach = $.grep(self.getAllItems(), function (e, i) {
            return e.id === id;
        });
        if (ach.length < 1) {
            ach = ["undefind"];
        }
        return ach[0];
    };


    /**
     * @property {Object} ultimate
     * @description An UltimateLib Achievement Object
     * @private
    */
    var ultimate = {
        id: "UltimateLib",
        title: "UltimateLib",
        description: "Played a game with UltimateLib installed.",
        isAchieved: function (a) {
            return true;
        },
        tint: "white",
        value: 10,
        hidden: true,
        canEarnMultiple: false
    };

    /**
     * @method create
     * @description Creates a achievement object with the parameters given via the options object
     * @param {Object} options An object with acheivement options.
     * @example 
            Ultimate Achievements Example Object
            {
                    id: "UltimateLib",
                    title: "UltimateLib",
                    description: "Played a game with UltimateLib installed.",
                    isAchieved: function (a) {
                        return true;
                    },
                    tint: "#FFFFFF",
                    value: 10,
                    hidden: true,
                    canEarnMultiple: false
            };
     * @return {Object} Returns an UL achievement object ready to be added. 
    */
    self.create = function (options) {
        if (typeof Object.create !== 'function') {
            Object.create = function (o) {
                function F() { }
                F.prototype = o;
                return new F();
            };
        }
            var that = Object.create(UltimateLib.Achievements.create.prototype);
            that.id = options.id;
            that.title = options.title;
            that.description = options.description;
            that.isAchieved = options.isAchieved;
            that.tint = options.tint ? options.tint : "green";
            that.value = options.value ? options.value : 10;
            that.hidden = options.hidden ? options.hidden : false;
            that.canEarnMultiple = options.canEarnMultiple ? options.canEarnMultiple : false;
            that.toString = function () {
                return 'UltimateLib.Achievements ' + that.title + ": " + that.description;
            };
            return that;
    };

    /**
     * @property {Array} collection
     * @description An array that contains all custom UL Achievements.
     * @public
    */
    self.collection = [];

    /**
     * @method add
     * @description Adds an achievement object to the game.
     * @param {Object} achievement 
    */
    self.add = function (achievement) {

        if (achievement instanceof UltimateLib.Achievements.create) {
            achievement.id = "UltimateLibAchievement-" + achievement.id;
            var i = 1;
            while (self.exists(achievement.id)) {
                achievement.id += "-" + i;
                i++;
            }
            self.collection.push(achievement);
        }
    };






    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Achievements loaded :-)");

    return self;
})(UltimateLib.Achievements || {});