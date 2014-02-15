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

    	var c = GameManager.company;

    	self.cash = function (company) {
    		var cash = company ? company.cash : c.cash;
    		var score = 0;
    		switch (cash) {
    			case cash > 1E10:
    				score = 5;
    				break
    			case cash > 1E9:
    				score = 4;
    				break;
    			case cash > 1E8:
    				score = 3;
    				break;
    			case cash > 1E7:
    				score = 2;
    				break;
    			case cash > 1E6:
    				score = 1;
    				break;
    			default:
    				break;
    		}
    		return score;
        };


		


    	self.games = function (company) {
    		var log = company ? company.gameLog : c.gameLog;
    		if (log.length > 0){

    			var i = 0;
    			var firstScore = 9;

    			do{

    				$.grep(log, function (ele, ind) {
    					UltimateLib.Utils.compare(ele.score, firstScore  );
    				});
    				i++;

    			} while (i < log.length);

    		}

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