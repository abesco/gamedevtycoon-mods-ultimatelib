/**
 * @class Compatibility
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @description Fixes any compatibility issues mods have between each other and/or the vanilla game.
 * @fileOverview  Fixes any compatibility issues mods have between each other and/or the vanilla game.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Compatibility = (function (self) {
    /**
     * @method init
     * @description Called for global initialization after Core.init()
     * @public
    */        
    self.init = function () {

       // noGameFix();
       // earlyContextBugFix();

    };

    /**
     * @method noGameFix
     * @description Fixes issue where the game will crash when training in the second office if no game has been created previously.
     * @protected
    */
    
    function noGameFix() {

        var keepme = Character.prototype._doTraining;
        var keepme2 = Character.prototype._doResearch;
        
        Character.prototype._doTraining = function (research, delta) {

            if (GameManager.company.gameLog.length == 0) {
                var game = {
                    releaseWeek: GameManager.company.currentWeek
                }
                GameManager.company.gameLog.push(game);

                keepme(research, delta);
                GameManager.company.gameLog = [];

            }


            if (GameManager.company.gameLog.length >= 1) {
                keepme(research, delta);
            }

        };
        GameManager.company.staff[0].currentResearch.lastSpawnTick = 0;

    };

    /**
     * @method earlyContextBugFix
     * @description Fixes issue where it is possible to start a new working task before a contract is completed. 
     * @protected
    */    
    function earlyContextBugFix() { };



    return self;
})(UltimateLib.Compatibility || {});

