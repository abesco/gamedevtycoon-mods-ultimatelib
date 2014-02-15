/**
 * @class Configuration
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Configuration = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loading...");

    /**
     * @method addTab
     * @description Adds a new configuration tab to the enhanced in-game settings menu
     * @param {String} name Name (or id) of the tab panel element
     * @param {String} text Text to show as title
     * @param {String} content Panel content
     * @return {TabPanel} The new tab panel that can be used for further operations
     * @example
        UltimateLib.Configuration('MyModule', 'My Module Title', yourPanelHtmlOrJqueryDomElement);
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
            tabs.tabs('select', 0);


            

        $("#"+name).append(content);
                     
        return tabPanel;
    };
    
    /**
     * @method init
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
        UltimateLib.Visual.Custom.setCss("advanceOptionsCss", "#newGameView .featureSelectionPanel { overflow-x: none; overflow-y: auto; }</style>");

        UltimateLib.Visual.Custom.setCss("settingPanelCss", ".ui-dialog .ui-dialog-content { padding: .5em 1em 1em .5em; overflow-x: none; overflow-y: visible; }");

        UltimateLib.Logger.log("UltimateLib.Configuration init ran.");              
    };
    
    /**
     * @method addAdvancedOption
     * @description Manages the adding of HTML to advanced options.
     * @param {String} code Contains HTML to be added.
    */
    self.addAdvancedOption = function (code) {
        var findMe = $("#newGameView").find(".featureSelectionPanel.featureSelectionPanelHiddenState");
        findMe.append(code);
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loaded :-)");

    return self;    
})(UltimateLib.Configuration || {});