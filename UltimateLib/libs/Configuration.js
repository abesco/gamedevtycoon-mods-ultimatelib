/**
 * @fileOverview Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI
 * @author alphabit
 * @version 1.0.0
 * @description Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.Configuration = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loading...");

    /**
     * @description Adds a tab to the configuration tab
     * @public
    */        
    self.addTab = function(){
        
    };
    
    /**
     * @description Creates a tab panel to use for addTab
     * @public
    */          
    self.createTabPanel = function(){
        
    };
    
    /**
     * @description Initializes the module.
     * @public
    */     
    self.init = function(){
        var children = UltimateLib.Elements.SettingsPanel.children();
        
        var tabsContainer = $(document.createElement('div'));
            tabsContainer.css({width:'100%',height:'auto'});

        var tabsList      = $(document.createElement('ul'));
            tabsList.append('<li><a href="#UltimateLibConfigurationDefaultTabPanel">Game</a></li>');
        
        var tabPanel      = $(document.createElement('div'));
            tabPanel.attr('id','UltimateLibConfigurationDefaultTabPanel');
            
        tabsList.appendTo(tabsContainer);
        tabPanel.appendTo(tabsContainer);
        
        children.appendTo(tabsContainer.find('#UltimateLibConfigurationDefaultTabPanel').first());
        
        tabsContainer.appendTo(UltimateLib.Elements.SettingsPanel);
        tabsContainer.tabs();
        tabsContainer.find('.ui-tabs .ui-tabs-nav li a').css({fontSize:'7pt'});

        UltimateLib.Logger.log("UltimateLib.Configuration init ran.");              
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loaded :-)");

    return self;    
})(UltimateLib.Configuration || {});