/**
 * @class PopupMenu
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.1
 * @description PopupMenu provides simplified creation and access to popup menu within the game. Allows to create custom menu items for implementing custom functionality.
 * @fileOverview PopupMenu provides simplified creation and access to popup menu within the game. Allows to create custom menu items for implementing custom functionality.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
 UltimateLib.PopupMenu = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.PopupMenu loading...");
        
    var origContextMenu = UI._showContextMenu;
    var menuItems       = [];
           
    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.PopupMenu init ran.");
    };
        
    /**
     * @description This has to be reviewed. -- Under Development -- Ignore please.
     * @public
    */      
    UI.ulPopupMenuItemClickHandler = function (a) {
    };  

    /**
     * @description Updates the context menu by recreating customizations.
     * @public
    */     
    self.update = function(){
        origContextMenu = UI._showContextMenu;
        
        var newContextMenu = function(b, c, d, h){
            // Extending the context menu
            $.each(menuItems, function(i,v){
                c.push({
                    label: v.label.localize(),
                    action: function () {
                        Sound.click();
                        GameManager.resume(true);
                            
                            if(typeof v.el == 'undefined'){
                                return;
                            }

                            var div = v.el;
                                div.scrollTop();
                             
                                 div.gdDialog({
                                    popout: !0,
                                    close: !0,
                                    onClose: function () {
                                        if(v.pause){
                                            GameManager.togglePause();
                                        }
                                    },
                                    onOpen: function() {
                                        if(v.pause){
                                            GameManager.togglePause();
                                        }
                                    }
                            });
                    }
                });
            });

            // Calling the original context menu
            origContextMenu(b, c, d, h);
        };
        
        UI._showContextMenu = newContextMenu;
    };
    
    /**
     * @description Adds a PopupMenu Item to the internal list
     * @param {string, element, bool} A PopupMenu Item (use createItem for simple creation)  
     * @public
    */      
    self.addItem = function(item){
        menuItems.push(item);
    };
         
    /**
     * @description Creates a PopupMenu Item object
     * @param {string} The text to display (label / caption)
     * @param {string} The dialog element (i.e. created with UltimateLib.Dialog class)
     * @param {string} Setup true to pause the game while the dialog is open, otherwise false.
     * @public
    */            
    self.createItem = function(text, dialogElement, usePause){
        return {label: text, el: dialogElement, pause: usePause};
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.PopupMenu loaded :-)");
        
    return self;
        
})(UltimateLib.PopupMenu || {});
