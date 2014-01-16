/**
 * @class PopupMenu
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.1
 * @description PopupMenu provides simplified creation and access to popup menu within the game. Allows to create custom menu items for implementing custom functionality.
 * @fileOverview PopupMenu provides simplified creation and access to popup menu within the game. Allows to create custom menu items for implementing custom functionality.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 */ 
 
 UltimateLib.PopupMenu = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.PopupMenu loading...");
        
    var origContextMenu = UI._showContextMenu;
    var menuItems       = [];
           
    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.PopupMenu init ran.");
    };
        
    /**
     * @method UI.ulPopupMenuItemClickHandler 
     * @param {Object} a GDT menu object
     * @description This has to be reviewed. -- Under Development -- Ignore please.
    */      
    UI.ulPopupMenuItemClickHandler = function (a) {
    };  

    /**
     * @method update
     * @description Updates the context menu by recreating customizations. Use this method after adding items.
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
     * @method addItem
     * @description Adds a PopupMenu Item to the internal list
     * @param {Object} item A PopupMenu Item (use createItem for simple creation)  
     * @example
        Object specification:
        {
            label:'My Menu Item',
            el: associatedDialogDomElement,
            pause: true or false to use game pause upon displaying dialog
        }
    */      
    self.addItem = function(item){
        menuItems.push(item);
    };
         
    /**
     * @method createItem 
     * @description Creates a PopupMenu Item object
     * @param {String} text The text to display (label / caption)
     * @param {String} dialogElement The dialog element (i.e. created with UltimateLib.Dialog class)
     * @param {String} usePause Setup true to pause the game while the dialog is open, otherwise false.
    */            
    self.createItem = function(text, dialogElement, usePause){
        return {label: text, el: dialogElement, pause: usePause};
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.PopupMenu loaded :-)");
        
    return self;
        
})(UltimateLib.PopupMenu || {});
