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
     * @private
     * @method isDefined
     * @param obj The object to check 
     * @description Checks if the specified object is defined.
    */
    function isDefined(obj) {
        return typeof obj != 'undefined' && obj != null;
    };

    /**
     * @method init
     * @description Initializes the module.
    */
    self.init = function () {
        UltimateLib.Logger.log("UltimateLib.Stats init ran.");
    };

    /**
     * @method getTotalGameCost
     * @param [company=undefined] Optional company from which to retrieve the data 
     * @description Returns the total revenues earned through game sales.
     * @return {Integer} Total game revenues
    */
    self.getTotalGameRevenues = function (company) {
        var c = company ? company : GameManager.company;

        if (!c.gameLog || (c.gameLog && c.gameLog.length < 1)) {
            return 0;
        }

        var value = 0;
        for (var i = 0; i < c.gameLog.length; i++) {
            value += parseInt(c.gameLog[i].revenue);
        }

        return value;
    };

    /**
     * @method getTotalGameCost
     * @param [company=undefined] Optional company from which to retrieve the data 
     * @description Returns the total cost of all games.
     * @return {Integer} Total game cost
    */
    self.getTotalGameCost = function (company) {
        var c = company ? company : GameManager.company;

        if (!c.gameLog || (c.gameLog && c.gameLog.length < 1)) {
            return 0;
        }

        var value = 0;
        for (var i = 0; i < c.gameLog.length; i++) {
            value += parseInt(c.gameLog[i].costs);
        }

        return value;
    };

    /**
     * @method getTotalGameProfit
     * @param [company=undefined] Optional company from which to retrieve the data 
     * @description Returns the total profit of all games.
     * @return {Integer} Total game profit
    */
    self.getTotalGameProfit = function (company) {
        var c = company ? company : GameManager.company;
        return self.getTotalGameRevenues(c) - self.getTotalGameCost(c);
    };

    /**
     * @method getGamesWithHighestScore
     * @param [company=undefined] Optional company from which to retrieve the data 
     * @description Returns the games with the highest scores so far
     * @return {Array} Array of games with the highest scores
    */
    self.getGamesWithHighestScore = function (company) {
        var c = company ? company : GameManager.company;

        if (!c.gameLog || (c.gameLog && c.gameLog.length < 1)) {
            return 0;
        }


        var values = [];
        var value = null;
        for (var i = 0; i < c.gameLog.length; i++) {
            if (value == null || c.gameLog[i].score >= value.score) {
                values.push(c.gameLog[i]);
                value = c.gameLog[i].score;
            }
        }

        return values;
    };

    /**
     * @method getBestGame
     * @param [company=undefined] Optional company from which to retrieve the data 
     * @description Returns the best game so far
     * @return {Integer} Best game ever
    */
    self.getBestGame = function (company) {
        var c = company ? company : GameManager.company;

        if (!c.gameLog || (c.gameLog && c.gameLog.length < 1)) {
            return 0;
        }

        var value = null;
        var revenue = 0;
        var costs = 0;
        var profit = 0;
        var maxprofit = 0;

        for (var i = 0; i < c.gameLog.length; i++) {
            revenue = c.gameLog[i].revenue;
            costs = c.gameLog[i].costs;
            profit = revenue - costs;

            if (value == null || profit > maxprofit) {
                value = c.gameLog[i];
                maxprofit = profit;
            }
        }

        var canBestGameBeShown = m.Utils.hasGameBeenReviewed(value);

        return { game: canBestGameBeShown ? value : m.LastBestGame, profit: maxprofit };
    };

    /**
     * @method hasGameBeenReviewed
     * @param game The game to check upon review 
     * @description Checks if the specified game has been already reviewed.
     * @return {Boolean} Returns true if the specified game has been reviewed, otherwise false.
    */
    self.hasGameBeenReviewed = function (game) {
        return isDefined(game) && game.reviewMessageDisplayed;
    };

    /**
     * @method createGameSalesStats
     * @param game The game for which to create the sales object 
     * @description Creates a ready to use game sales statistics graphics layer including a tooltip element.
     * @return {Object} Returns an object of the following format: { el: GraphsElement, tip: TooltipElement, c: GameSalesDataArray, id: guid }
    */
    self.createGameSalesStats = function (game) {
        if (!game) {
            return undefined;
        }

        var releaseWeek = 1;
        var releaseWeekReal = game.releaseWeek;
        var log = game.salesCashLog;
        var guid = GameManager.getGUID();

        var $divPlaceholder = $(document.createElement('div'));


        $divPlaceholder.attr('id', 'ul-stats-gamesales-' + guid);
        $divPlaceholder.css('position', 'relative').css('width', '500px').css('height', '160px');

        var data = [];

        for (var i = 0; i < log.length; i++) {
            data.push([releaseWeek, log[i]]);
            releaseWeek++;
        }

        // $('body').find('#ul-stats-gamesales-tooltip-' + guid).remove();

        var $divTooltip = $(document.createElement('div'));

        $divTooltip.attr('id', 'ul-stats-gamesales-tooltip-' + guid).css({
            position: "absolute",
            display: "none",
            border: "1px solid #333333",
            padding: "2px",
            "background-color": "#2222ff",
            "color": "#ffffff",
            opacity: 0.80,
            zIndex: 9100
        });//.appendTo("body");


        return { el: $divPlaceholder, tip: $divTooltip, data: data, id: guid };
    };

    /**
     * @method renderGameSalesStats
     * @param targetEl The target jquery wrapped target element to attach and render the game stats graph to 
     * @param gameSalesStatsObject The game sales stats object created using the <b>createGameSalesStats</b> method
     * @description Creates a ready to use game sales statistics graphics layer including a tooltip element.
     * @return {Object} Returns an object of the following format: { el: GraphsElement, tip: TooltipElement, c: GameSalesDataArray, id: guid }
    */
    self.renderGameSalesStats = function (targetEl, gameSalesStatsObject) {

        // Append sales object element and related tooltip to the specified target 
        gameSalesStatsObject.el.appendTo(targetEl);
        gameSalesStatsObject.tip.appendTo(targetEl);

        var plot = $.plot(gameSalesStatsObject.el, [gameSalesStatsObject.data],
            {
                lines: { show: true, fill: true },
                points: { show: true, fillColor: 'yellow' },
                xaxis: {
                    tickSize: 1,
                    tickFormatter: function (val, axis) {
                        return parseInt(val);
                    }
                },
                yaxis: {
                    position: 'left',
                    tickFormatter: function (val, axis) {
                        return UI.getShortNumberString(val);
                    }
                },
                grid: { show: true, hoverable: true, clickable: true }

                /*
                lines:  { show: true, fill: true },
                points: { show: true, fillColor: 'yellow'},
                xaxis:  { tickSize: 1, zoomRange: [0.1, 10], panRange: [-10, 10]},
                yaxis:  { zoomRange: [0.1, 10], panRange: [-10, 10] },
                grid:   { show: true, hoverable: true, clickable: true },
                zoom:   { interactive: true },
                pan:    { interactive: true }
                */

            });

        gameSalesStatsObject.bind("plothover", function (event, pos, item) {
            var id = "ul-stats-gamesales-tooltip-" + gameSalesStatsObject.id;

            if (item) {
                var x = parseInt(item.datapoint[0].toFixed(2)),
                    y = UI.getShortNumberString(item.datapoint[1].toFixed(2));

                $("#" + id).html("Week " + x + " = " + y)
                    .css({ top: item.pageY + 5, left: item.pageX + 5 })
                    .fadeIn(200);
            } else {
                $("#" + id).hide();
            }
        });
    };

    self.showGameSalesStats = function (gameSalesStatsObject, show) {
        if (!gameSalesStatsObject) {
            return;
        }

        gameSalesStatsObject.el.show(show);
    };

    self.destroyGameSalesStats = function(gameSalesStatsObject) {
        if (!gameSalesStatsObject) {
            return;
        }

        gameSalesStatsObject.el.remove();
        gameSalesStatsObject.tip.remove();
        gameSalesStatsObject = {};
    };


    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Stats loaded :-)");

    return self;
})(UltimateLib.Stats || {});
