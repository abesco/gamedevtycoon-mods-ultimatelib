/**
 * @class Stats
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description Statistics class providing various statistical information about the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 
UltimateLib.Stats = (function (self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Stats loading...");

    /**
     * @method init
     * @description Initializes the module.
    */
    self.init = function () {
        UltimateLib.Logger.log("UltimateLib.Stats init ran.");
    };

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Stats loaded :-)");

    return self;
})(UltimateLib.Stats || {});
