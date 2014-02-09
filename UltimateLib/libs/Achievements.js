/**
 * @class Achievements
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @since 1.3.0
 * @author Chad Keating (SirEverard)
 * @description Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
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
    
    self.init = function () {
        achievmentHook();
        self.add(ultimate);
    };
    
    function achievmentHook() {

        var keepme = Achievements.getAllItems;

        Achievements.getAllItems = function () {

            var keep = keepme();
            keep.addRange(self.collection);
            return keep;

        };
    }

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
            that.hidden = options.hidden;
            that.canEarnMultiple = options.canEarnMultiple;
            that.toString = function () {
                return 'UltimateLib.Achievements ' + that.title + ": " + that.description;
            };
            return that;
    };

    self.collection = [];

    /**
     * @method add
     * @description Creates a dialog button and returns it as a wrapped jQuery element object for further usage
     * @param {String} name 
    */
    self.add = function (achievement) {

        if (achievement instanceof UltimateLib.Achievements.create) {
            achievement.id = "UltimateLibAchievment." + achievement.id;
            self.collection.push(achievement);
        }
    };






    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Achievements loaded :-)");

    return self;
})(UltimateLib.Achievements || {});