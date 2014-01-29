/**
 * @class Theme
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @description Theme class handles registering and application of user created themes.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @since 1.3.0
 * @beta
 */

UltimateLib.Theme = (function (self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Theme loading...");

    /**
     * @method
     * @description Initializes the module.
    */
    self.init = function () {
        UltimateLib.Configuration.addTab("themeConfig","Theme","");
    };

    var defaultTheme;
    var ultimateTheme;
    self.Themes = {
        Vanilla: defaultTheme,
        Ultimate: ultimateTheme
    };



    /**
     * @method create
     * @description Returns a theme object template that can be used to create themes within GDT. 
     * @return Theme Object
     * @example
        UltimateLib Theme Object
        {
                // Chad plz write me
        }
    */
    self.create = function () {

    };


    /**
     * @method registerTheme
     * @description Registers a theme into the theme list.
     * @param {String} theme Theme Object
     * @param {Boolean} listed True if theme is to be listed in settings panel.
     * @example
        UltimateLib Theme Object
        {
                // Chad plz write me
        }
    */
    self.registerTheme = function (theme, listed) {



    };


    /**
     * @method setListed
     * @description Adds or removes a theme from the list in which users can set the settings panel.
     * @param {String} themeId Theme Unique Id
     * @param {Boolean} listed True if theme is to be listed in settings panel.
    */
    self.setListed = function (theme, listed) {
    };


    /**
     * @method forceTheme
     * @description Force loads a registered theme
     * @param {String} themeId Theme Unique Id
    */
    self.forceTheme = function (themeId) {
    };

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Theme loading...");
    return self;
})(UltimateLib.Theme || {});