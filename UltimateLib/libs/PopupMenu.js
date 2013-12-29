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
        
     
    UI.selectInfoStatsModItemClickHandler = function (a) {
            Sound.click();
            switch (a.id) {
                case "statsmodshowreleasedgames":
                    m.ReleasedGames.showReleasedGames();
                    break;
                case "statsmodconfigreleasedgames":
                    m.ReleasedGames.showConfig();
                    break;
                case "statsmodshowplatforms":
                    m.Platforms.showPlatforms();
                    break;
                case "statsmodconfigplatforms":
                    m.Platforms.showConfig();
                    break;

                case "statsmodnotifications":
                    m.Notifications.showNotifications();
                    break;



                case "statsmodshowsalesanalysis":
                    m.Analysis.showSalesAnalysis();
                    break;
                case "":
                    GameManager.togglePause();
                    break;
                case "statsmodtogglepause":
                    GameManager.togglePause();
                    break;
                case "statsmodresetsettings":
                     m.Config.resetStorage();
                    break;
                case "statsmodtogglefooter":
                    m.Footer.toggleVisibilty();
                default:
                    return;
            }
    };  

    
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
            // Scroll to top div
//            UltimateLib.Elements.Body.animate({
//                scrollTop: $('#top').offset().top
//            }, 2000);
            
           
            // Calling the original context menu
            origContextMenu(b, c, d, h);
        
        };
        
        UI._showContextMenu = newContextMenu;
    };
    
    self.addItem = function(item){
        menuItems.push(item);
    };
         
    self.createItem = function(text, dialogElement, usePause){
        return {label: text, el: dialogElement, pause: usePause};
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.PopupMenu loaded :-)");
        
    return self;
        
})(UltimateLib.PopupMenu || {});
