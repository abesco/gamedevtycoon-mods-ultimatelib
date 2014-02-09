 /**
 * @class Compatibility
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @description Fixes any compatibility issues mods have between each other and/or the vanilla game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 
UltimateLib.Compatibility = (function (self) {
    /**
     * @method init
     * @description Called for global initialization after Core.init()
    */        
    self.init = function () {

       // noGameFix();
        // earlyContextBugFix();
        //levelCalculator();

    };



    function levelCalculator() {
        var keep = LevelCalculator.getFeatureLevel;

        LevelCalculator.getFeatureLevel = function (company, id) {
            var level;
            try{
                level = keep(company, id);
            }
            catch (e) {
                level = 0;
            }
            return level
        };

    }





    /**
     * @method noGameFix
     * @description Fixes issue where the game will crash when training in the second office if no game has been created previously.
     * @private
    */
    function noGameFix() {

        var keepme = Character.prototype._doTraining;
        var keepme2 = Character.prototype._doResearch;
        
        Character.prototype._doTraining = function (research, delta) {

            if (GameManager.company.gameLog.length === 0) {
                var game = {
                    releaseWeek: GameManager.company.currentWeek
                };
                GameManager.company.gameLog.push(game);

                keepme(research, delta);
                GameManager.company.gameLog = [];

            }


            if (GameManager.company.gameLog.length >= 1) {
                keepme(research, delta);
            }

        };
        GameManager.company.staff[0].currentResearch.lastSpawnTick = 0;

    }

    /**
     * @method earlyContextBugFix
     * @description Fixes issue where it is possible to start a new working task before a contract is completed. 
     * @private
    */    
    function earlyContextBugFix() { }

    return self;
})(UltimateLib.Compatibility || {});

