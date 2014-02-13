/**
 * @class Graphs
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description Graphs class providing various flot based graphical operations.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */

UltimateLib.Graphs = (function (self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Graphs loading...");

    /**
     * @method init
     * @description Initializes the module.
    */
    self.init = function () {
        UltimateLib.Logger.log("UltimateLib.Graphs init ran.");
    };

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Graphs loaded :-)");

    return self;
})(UltimateLib.Graphs || {});