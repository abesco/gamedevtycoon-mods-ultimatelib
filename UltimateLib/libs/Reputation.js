/**
 * @class Reputation
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @since 1.4.0
 * @author Chad Keating (SirEverard) and Francesco Abbattista (alphabit)
 * @description Reputation is a class intended to provide mods with communal method of rating a company.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 */

UltimateLib.Reputation = (function (self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Reputation loading...");

    self.init = function () {
    };

    self.Rating = (function (self) {

        self.cash = function () {
        };

        self.games = function () {
        };

        self.sales = function () {
        };

        self.profit = function () {
        };

        self.staff = function () {
        };


        self.engine = function () {
        };

        self.fans = function () {
        };

        return self;
    })(self.Rating || {});

    self.Company = (function (self) {

        self.get = function () {
        };

        self.getModifier = function () {
        };

        self.addModifier = function () {
        };

        self.removeModifier = function () {
        };

        self.setModifier = function () {
        };

        self.exsistsModifier = function () {
        };

        return self;
    })(self.Company || {});







    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Reputation loaded :-)");

    return self;
})(UltimateLib.Reputation || {});