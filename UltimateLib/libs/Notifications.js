/**
 * @fileOverview Notifications is an UltimateLib library class providing capabilities to manipulate the in-game settings notification system
 * @author alphabit
 * @version 1.0.0
 * @description Notifications is an UltimateLib library class providing capabilities to manipulate the in-game settings notification system.
 * @constructor
 * @augments UltimateLib
 * @class Notifications
 */
UltimateLib.Notifications = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Notifications loading...");
    
    /**
     * @description Headers is a nested class of Notifications and provides direct access to supported in-game notification headers.
     * @property {int} typeWriterDelay
     * @returns {int} The typewriter effect delay in ms
     * @public
     */    
    self.typeWriterDelay = 100;
    
    /**
     * @description Headers is a nested class of Notifications and provides direct access to supported in-game notification headers.
     * @constructor
     * @augments Notifications
     * @class Headers
     * @public
     */
    self.Items = {        
        GDT_PlatformReleaseNews: {name:"{PlatformReleaseNews}", enabled:true, asOverlay: false},
        GDT_News               : {name:"News", enabled:true, asOverlay: false},
        GDT_GameOffTheMarket   : {name:"Game off the market.",enabled:true, asOverlay: false},
        GDT_GameConference     : {name:"Game Conference", enabled:true, asOverlay: false},
        GDT_LabReport          : {name:"Lab report", enabled:true, asOverlay: false},
        GDT_NewResearch        : {name:"New Research!", enabled:true, asOverlay: false},
        GDT_IndustryNews       : {name:"Industry News", enabled:true, asOverlay: false},
        GDT_GameReport         : {name:"Game Report", enabled:true, asOverlay: false},
        GDT_MarketAnalysis     : {name:"Market Analysis", enabled:true, asOverlay: false},
        GDT_EngineComplete     : {name:"Engine complete!", enabled:true, asOverlay: false},
        GDT_GameReview         : {name:"Game review", enabled:true, asOverlay: false},
        GDT_Sequel             : {name:"Sequel", enabled:true, asOverlay: false},
        GDT_FirstWeekOfSales   : {name:"First week of sales!", enabled:true, asOverlay: false},
        GDT_Fans               : {name:"Fans", enabled:true, asOverlay: false},
        GDT_SalesRecord        : {name:"Sales Record", enabled:true, asOverlay: false},
        // ..> buggy? ..> GDT_Tutorial           : {name:"Tutorial", enabled:true, asOverlay: false},
        
        // Additional and 3rd party
        InfoStatsMod_BestGame  : {name:"Company's Best Game", enabled:true, asOverlay: false}, // For InfoStatsMod 0.3.1 and higher
        
        enableAll: function(enable){
            self.Items.GDT_PlatformReleaseNews.enabled = enable;
            self.Items.GDT_News.enabled = enable;
            self.Items.GDT_GameOffTheMarket.enabled = enable;
            self.Items.GDT_GameConference.enabled = enable;
            self.Items.GDT_LabReport.enabled = enable;
            self.Items.GDT_NewResearch.enabled = enable;
            self.Items.GDT_IndustryNews.enabled = enable;
            self.Items.GDT_GameReport.enabled = enable;
            self.Items.GDT_MarketAnalysis.enabled = enable;
            self.Items.GDT_EngineComplete.enabled = enable;
            self.Items.GDT_GameReview.enabled = enable;
            self.Items.GDT_Sequel.enabled = enable;
            self.Items.GDT_FirstWeekOfSales.enabled = enable;
            self.Items.GDT_Fans.enabled = enable;
            self.Items.GDT_SalesRecord.enabled = enable;

            // ..> buggy? ..> self.Items.GDT_Tutorial.enabled = enable;
            
            // Additional and 3rd party
            self.Items.InfoStatsMod_BestGame.enabled = enable;    
        }, 
        
        overlayAll: function(enable){
            self.Items.GDT_PlatformReleaseNews.asOverlay = enable;
            self.Items.GDT_News.asOverlay = enable;
            self.Items.GDT_GameOffTheMarket.asOverlay = enable;
            self.Items.GDT_GameConference.asOverlay = enable;
            self.Items.GDT_LabReport.asOverlay = enable;
            self.Items.GDT_NewResearch.asOverlay = enable;
            self.Items.GDT_IndustryNews.asOverlay = enable;
            self.Items.GDT_GameReport.asOverlay = enable;
            self.Items.GDT_MarketAnalysis.asOverlay = enable;
            self.Items.GDT_EngineComplete.asOverlay = enable;
            self.Items.GDT_GameReview.asOverlay = enable;
            self.Items.GDT_Sequel.asOverlay = enable;
            self.Items.GDT_FirstWeekOfSales.asOverlay = enable;
            self.Items.GDT_Fans.asOverlay = enable;
            self.Items.GDT_SalesRecord.asOverlay = enable;
            // ..> buggy? ..> self.Items.GDT_Tutorial.asOverlay = enable;
            
            // Additional and 3rd party
            self.Items.InfoStatsMod_BestGame.asOverlay = enable;    
        }        
        
    };
                         
    /**
     * @description Initializes the module.
     * @method init
     * @public
    */     
    self.init = function(){
        var lastModalDialog = null;
        
        // Create an override using the jQuery proxy pattern for the relevant "typewrite" method
        (function() {
            var proxied = $.fn.typewrite;
            $.fn.typewrite = function(b) {
                b.delay = self.typeWriterDelay;
                return proxied.apply( this, arguments );
            };
        })();
                
        (function() {
            var proxied = UI.showModalContent;
            UI.showModalContent = function (b, c) {
                proxied.apply( this, arguments );
                self.lastModalDialog = b;
            }
        })();
        
        // Create an override using the jQuery proxy pattern for creating a custom notification overlay
        (function() {
            var proxied = UI._showNotification;
            UI._showNotification = function (a, b) {
                proxied.apply( this, arguments );
                
                var notification = a;
                var name   = notification.header;
                var n      = $('#simplemodal-container').find('#notificationContent');
                var opt    = $('.notificationOption1').first();
                
                $('#TweakModNotificationReplacement1').remove();
                $('#TweakModNotificationReplacement2').remove();
                $('#TweakModNotificationReplacement3').remove();

                var window1 = $(document.createElement('div'));

                window1.attr({id:'TweakModNotificationReplacement1'});
                window1.appendTo($('body'));

                var doc                 = $(document);
                var docWidth            = doc.width();
                var docHeight           = doc.height();
                var centerX             = (docWidth * 0.5)  - (230);
                var centerY             = (docHeight * 0.5) - (120);
                
                window1.css({position:'absolute', left:centerX, top:centerY, width:460, height:'auto', padding:5, backgroundColor:'#f0f0f0', opacity:'0.9', border:'4px solid rgb(255,209,123)', display:'none', zIndex:8000, boxShadow:'0 0 5px #888'});
                     
                var makeOverlay = false;
                var isEnabled   = false;
                
                switch (a.header) {
                     case "{ReleaseGame}":
                     alert("{ReleaseGame}");
                     break;
                     
                     case "{Reviews}":
                     alert("{Reviews}");
                     break;
                     
                     case self.Items.GDT_EngineComplete.name.localize():
                         makeOverlay = self.Items.GDT_EngineComplete.asOverlay;
                         isEnabled = self.Items.GDT_EngineComplete.enabled;
                     break;
                     
                     case self.Items.GDT_GameConference.name.localize():
                         makeOverlay = self.Items.GDT_GameConference.asOverlay;
                         isEnabled = self.Items.GDT_GameConference.enabled;
                     break;
                     
                     case self.Items.GDT_GameOffTheMarket.name.localize():
                         makeOverlay = self.Items.GDT_GameOffTheMarket.asOverlay;
                         isEnabled = self.Items.GDT_GameOffTheMarket.enabled;
                     break;
                                         
                     case self.Items.GDT_GameReport.name.localize():
                         makeOverlay = self.Items.GDT_GameReport.asOverlay;
                         isEnabled = self.Items.GDT_GameReport.enabled;
                     break;
                     
                     case self.Items.GDT_GameReview.name.localize():
                         makeOverlay = self.Items.GDT_GameReview.asOverlay;
                         isEnabled = self.Items.GDT_GameReview.enabled;
                     break;
                     
                     case self.Items.GDT_IndustryNews.name.localize():
                         makeOverlay = self.Items.GDT_IndustryNews.asOverlay;
                         isEnabled = self.Items.GDT_IndustryNews.enabled;
                     break;
                     
                     case self.Items.GDT_LabReport.name.localize():
                         makeOverlay = self.Items.GDT_LabReport.asOverlay;
                         isEnabled = self.Items.GDT_LabReport.enabled;
                     break;
                     
                     case self.Items.GDT_MarketAnalysis.name.localize():
                         makeOverlay = self.Items.GDT_MarketAnalysis.asOverlay;
                         isEnabled = self.Items.GDT_MarketAnalysis.enabled;
                     break;
                                
                     case self.Items.GDT_NewResearch.name.localize():
                         makeOverlay = self.Items.GDT_NewResearch.asOverlay;
                         isEnabled = self.Items.GDT_NewResearch.enabled;
                     break;

                     case self.Items.GDT_News.name.localize():
                         makeOverlay = self.Items.GDT_News.asOverlay;
                         isEnabled = self.Items.GDT_News.enabled;
                     break;
                     
                     case self.Items.GDT_PlatformReleaseNews.name.localize():
                         makeOverlay = self.Items.GDT_PlatformReleaseNews.asOverlay;
                         isEnabled = self.Items.GDT_PlatformReleaseNews.enabled;
                     break;
                     
                     case self.Items.GDT_Sequel.name.localize():
                         makeOverlay = self.Items.GDT_Sequel.asOverlay;
                         isEnabled = self.Items.GDT_Sequel.enabled;
                     break;                
                                          
                     case self.Items.GDT_FirstWeekOfSales.name.localize():
                         makeOverlay = self.Items.GDT_FirstWeekOfSales.asOverlay;
                         isEnabled = self.Items.GDT_FirstWeekOfSales.enabled;
                     break;                

                     case self.Items.GDT_Fans.name.localize():
                         makeOverlay = self.Items.GDT_Fans.asOverlay;
                         isEnabled = self.Items.GDT_Fans.enabled;
                     break;                
                                      
                     case self.Items.GDT_SalesRecord.name.localize():
                         makeOverlay = self.Items.GDT_SalesRecord.asOverlay;
                         isEnabled = self.Items.GDT_SalesRecord.enabled;
                     break;   
                                                                                                                                                                                                                                                                                                
                     // ..> buggy? ..> case self.Items.GDT_Tutorial.name.localize():
                     // ..> buggy? ..>     makeOverlay = self.Items.GDT_Tutorial.asOverlay;
                     // ..> buggy? ..>     isEnabled = self.Items.GDT_Tutorial.enabled;
                     // ..> buggy? ..> break;                

                     case self.Items.InfoStatsMod_BestGame.name.localize():
                         makeOverlay = self.Items.InfoStatsMod_BestGame.asOverlay;
                         isEnabled = self.Items.InfoStatsMod_BestGame.enabled;
                     break;                
                }

                
                if(isEnabled){
                    if(makeOverlay){
                        var html  = '<h3>'+a.header+'</h3>';
                            html += a.text.replace('\n','<br/><br/>');
                            window1.html(html).delay(500).fadeIn().delay(4000).fadeOut();
                            
                            UltimateLib.Elements.SimpleModalContainer.css({position:'absolute', left:-100});

                            // b.onClose();
                            //UI.closeAllDialogs();
                            GameManager.company.activeNotifications.remove(a);
                            UI.closeModal();
                            // GameManager.resume(!0);                        
                    }
                }
                else {
                    // UI.closeModal();
                    // GameManager.company.activeNotifications.remove(a);
                    // GameManager.resume(!0);                        
                }

         };
        })();  
                
        UltimateLib.Logger.log("UltimateLib.Notifications init ran.");              
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Notifications loaded :-)");

    return self;    
})(UltimateLib.Notifications || {});