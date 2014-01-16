/**
 * @class Configuration
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
 * @fileOverview Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Configuration = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loading...");

    /**
     * @method
     * @description Creates a tab panel to use for addTab
     * @param {string} Name (id) of the tab panel element
     * @param {string} Text to show as title
     * @param {string} Panel content
     * @returns {TabPanel} The new tab panel that can be used for further operations
    */          
    self.addTab = function(name, text, content){
        var tabPanel = $(document.createElement('div'));
            tabPanel.attr({id:name});
            tabPanel.css({width:'100%',height:'auto', display:'block'});
            
        var tabPanelContainer = $(document.createElement('div'));
            tabPanelContainer.attr('id',name+"Container");

            tabPanel.append(tabPanelContainer);
            tabPanelContainer.append(content);
             
             
        var tabs = $('#UltimateLibConfigurationTabs');
            tabs.tabs("add","#"+name, text);
            tabs.tabs( "refresh" );
            tabs.tabs( 'select', 0);
            
        $("#"+name).append(content);
                     
        return tabPanel;
    };
    
    /**
     * @method
     * @description Initializes the module.
    */     
    self.init = function(){
        var children = UltimateLib.Elements.SettingsPanel.children();
        
        var tabsContainer = $(document.createElement('div'));
            tabsContainer.attr('id','UltimateLibConfigurationTabs');
            tabsContainer.css({width:'100%',height:'auto'});

        var tabsList      = $(document.createElement('ul'));
            tabsList.attr('id','UltimateLibConfigurationTabsList');
            tabsList.append('<li><a href="#UltimateLibConfigurationDefaultTabPanel">Game</a></li>');
        
        var tabPanel      = $(document.createElement('div'));
            tabPanel.attr('id','UltimateLibConfigurationDefaultTabPanel');
            
        tabsList.appendTo(tabsContainer);
        tabPanel.appendTo(tabsContainer);
        
        children.appendTo(tabsContainer.find('#UltimateLibConfigurationDefaultTabPanel').first());
        
        tabsContainer.appendTo(UltimateLib.Elements.SettingsPanel);
        tabsContainer.tabs();
        tabsContainer.find('.ui-tabs .ui-tabs-nav li a').css({fontSize:'7pt'});

        //Add overflow style for advanded options
        $('head').append('<style id="ul-config-adv-overflow" type="text/css">#newGameView .featureSelectionPanel { overflow-x: none; overflow-y: auto; }</style>');

        UltimateLib.Logger.log("UltimateLib.Configuration init ran.");              
    };
    
    /**
     * @method
     * @description Manages the adding of HTML to advanced options.
     * @param {string} Contains HTML to be added.
    */
    self.addAdvancedOption = function (code) {
        var findMe = $("#newGameView").find(".featureSelectionPanel.featureSelectionPanelHiddenState");
        findMe.append(code);
    };


    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loaded :-)");

    return self;    
})(UltimateLib.Configuration || {});