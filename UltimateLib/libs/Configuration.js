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
     * @description Creates a tab panel to use for addTab
     * @param {string} Name (id) of the tab panel element
     * @param {string} Text to show as title
     * @param {string} Panel content
     * @returns {TabPanel} The new tab panel that can be used for further operations
     * @public
    */          
    self.addTab = function(name, text, content){
        var tabPanel = $(document.createElement('div'));
            tabPanel.attr({id:name});
            tabPanel.css({width:'100%',height:'auto', display:'block'});
            tabPanel.text(text);
            
        var tabPanelContainer = $(document.createElement('div'));
            tabPanelContainer.attr('id',name+"Container");
            tabPanelContainer.appendTo(tabPanel);
             
            $(content).appendTo(tabPanelContainer);
             
             
        var tabs = $('#UltimateLibConfigurationTabs');
            tabs.tabs("add","#"+name, text);
            tabs.tabs( "refresh" );
            tabs.tabs( 'select', 0);
            
        $("#"+name).append(content);
                     
        return tabPanel;
    };
    
    /**
     * @description Initializes the module.
     * @public
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

        UltimateLib.Logger.log("UltimateLib.Configuration init ran.");              
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loaded :-)");

    return self;    
})(UltimateLib.Configuration || {});