 /**
 * @class Notifications
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description Notifications is an UltimateLib library class providing capabilities to manipulate the in-game settings notification system.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 */ 
UltimateLib.Notifications = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Notifications loading...");
    
    /**
     * @property typeWriterDelay
     * @type Object
     * @description Typewriter effect delay value object. Allowed modes are 'default' and 'factor'. 
      When using 'default' you can input integer values from 0 to whatever. 20 is the default game value.
      When using the 'factor', you can specify a value between 0.0 and 1.0 that will be multiplied with the regular value.
      
     * @example 
        Object specification:
        {
            mode:'default' or 'factor', 
            value:Integer_for_default or Float_for_factor
        }
     */    
    self.typeWriterDelay = {mode:'factor', value:1.0};
    
    /**
     * @property Items
     * @type Array
     * @description Array of UltimateLib dialog notification objects used for control each dialog type separately
     * @example
        Object specification:
        {
            id:'InternalDialogId', 
            name:"GDT_Dialog_Header_Text_English",   
            enabled: true or false for enabling / disabling the dialog, 
            asOverlay: true or false to use overlay message instead of regular message
        }
        
     */
    self.Items = [
                    {id:'GDT_PlatformReleaseNews', name:"{PlatformReleaseNews}",   enabled:true, asOverlay: false},
                    {id:'GDT_News',                name:"News",                    enabled:true, asOverlay: false},
                    {id:'GDT_GameOffTheMarket',    name:"Game off the market.",    enabled:true, asOverlay: false},
                    {id:'GDT_GameConference',      name:"Game Conference",         enabled:true, asOverlay: false},
                    {id:'GDT_LabReport',           name:"Lab report",              enabled:true, asOverlay: false},
                    {id:'GDT_NewResearch',         name:"New Research!",           enabled:true, asOverlay: false},
                    {id:'GDT_ResearchComplete',    name:"Research complete",       enabled:true, asOverlay: false},
                    {id:'GDT_IndustryNews',        name:"Industry News",           enabled:true, asOverlay: false},
                    {id:'GDT_IndustryReport',      name:"Industry Report",         enabled:true, asOverlay: false},
                    {id:'GDT_GameReport',          name:"Game Report",             enabled:true, asOverlay: false},
                    {id:'GDT_MarketAnalysis',      name:"Market Analysis",         enabled:true, asOverlay: false},
                    {id:'GDT_EngineComplete',      name:"Engine complete!",        enabled:true, asOverlay: false},
                    {id:'GDT_GameReview',          name:"Game review",             enabled:true, asOverlay: false},
                    {id:'GDT_Sequel',              name:"Sequel",                  enabled:true, asOverlay: false},
                    {id:'GDT_FirstWeekOfSales',    name:"First week of sales!",    enabled:true, asOverlay: false},
                    {id:'GDT_Fans',                name:"Fans",                    enabled:true, asOverlay: false},
                    {id:'GDT_SalesRecord',         name:"Sales Record",            enabled:true, asOverlay: false},
                    // ..> buggy? ..> GDT_Tutorial           : {name:"Tutorial", enabled:true, asOverlay: false},
                    
                    // Additional and 3rd party
                    {id:'InfoStatsMod_BestGame',   name:"Company's Best Game",     enabled:true, asOverlay: false} // For InfoStatsMod 0.3.1 and higher
                ];

    /**
    * @method enableAll
    * @description Sets the state of all internal notification dialog items to enabled or disabled.
    * @param {Boolean} enable True of false to enable or disable all dialogs
    * 
    */
     self.enableAll = function(enable){
        for(var i = 0; i < self.Items.length; i++){
            self.Items[i].enabled = enable;
        }  
     }; 
     
    /**
    * @method overlayAll
    * @description Sets the state of all internal notification dialog items to overlay or not overlay.
    * @param {Boolean} enable True of false to enable or disable overlay on all dialogs
    * 
    */
     self.overlayAll = function(enable){
        for(var i = 0; i < self.Items.length; i++){
            self.Items[i].asOverlay = enable;
        }  
     };      
        
    /**
    * @method setOverlay
    * @description Sets the state of the corresponding internal item of the specified item to the overlay state of the specified item.
    * @param {Object} item The UltimateLib notification dialog item to apply overlay state to
    * @example
        Object specification:
        {
            id:'InternalDialogId', 
            name:"GDT_Dialog_Header_Text_English",   
            enabled: true or false for enabling / disabling the dialog, 
            asOverlay: true or false to use overlay message instead of regular message
        }
    * 
    */
     self.setOverlay = function(item){
        for(var i = 0; i < self.Items.length; i++){
            if (self.Items[i].id == item.id){
                self.Items[i].asOverlay = item.asOverlay;
                break;
            }
        } 
     };
     
    /**
    * @method setEnabled
    * @description Sets the state of the corresponding internal item of the specified item to the enabled state of the specified item.
    * @param {Object} item The UltimateLib notification dialog item to apply enabled state to
    * @example
        Object specification:
        {
            id:'InternalDialogId', 
            name:"GDT_Dialog_Header_Text_English",   
            enabled: true or false for enabling / disabling the dialog, 
            asOverlay: true or false to use overlay message instead of regular message
        }
    * 
    */
     self.setEnabled = function(item){
        for(var i = 0; i < self.Items.length; i++){
            if (self.Items[i].id == item.id){
                self.Items[i].enabled = item.enabled;
                break;
            }
        } 
     };
     
    /**
    * @method getItemById
    * @description Returns an notification item object by looking for the id
    * @param {String} id UltimateLib notification dialog item id
    * @return {Object} An object representing the item with the specified id
    * @example
        Object specification:
        {
            id:'InternalDialogId', 
            name:"GDT_Dialog_Header_Text_English",   
            enabled: true or false for enabling / disabling the dialog, 
            asOverlay: true or false to use overlay message instead of regular message
        }
     */
     self.getItemById = function(id){
        for(var i = 0; i < self.Items.length; i++){
            if (self.Items[i].id == id){
                return self.Items[i];
            }
        }  
        return undefined;
     };

     
    /**
    * @method getItemByName
    * @description Returns an notification item object by looking for the localized header
    * @param {String} localizedName The localized name (header) of the dialog
    * @return {Object} An object representing the item with the specified header text
    * @example
        Object specification:
        {
            id:'InternalDialogId', 
            name:"GDT_Dialog_Header_Text_English",   
            enabled: true or false for enabling / disabling the dialog, 
            asOverlay: true or false to use overlay message instead of regular message
        }
    * 
    */
    self.getItemByName = function(localizedName){
        for(var i = 0; i < self.Items.length; i++){
            if (self.Items[i].name.localize() == localizedName){
                return self.Items[i];
            }
        }  
        return undefined;
     };
                         
    /**
     * @method init
     * @description Initializes the class.
    */     
    self.init = function(){
        var lastModalDialog = null;
        var closeModal = false;
        
        // Create an override using the jQuery proxy pattern for the relevant "typewrite" method
        (function() {
            var proxied = $.fn.typewrite;
            $.fn.typewrite = function(b) {
                if(self.typeWriterDelay.mode=='factor'){
                    b.delay *= self.typeWriterDelay.value;
                }
                else {
                    b.delay = self.typeWriterDelay.value;
                }
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
                
                try {
                    var notification = a;
                    var name   = notification.header;
                    var n      = $('#simplemodal-container').find('#notificationContent');
                    var opt    = $('.notificationOption1').first();
                                       
                    $('#TweakModNotificationReplacement1').remove();
                    
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
                         // alert("{ReleaseGame}");
                         break;
                         
                         case "{Reviews}":
                         // alert("{Reviews}");
                         break;
                         
                         default:
                            {
                             var obj        = self.getItemByName(a.header);
                             if(obj){
                                 closeModal = true;
                                 makeOverlay    = obj.asOverlay;
                                 isEnabled      = obj.enabled;
                                 // $('#simplemodal-container').hide();

                             }
                            }
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
                }
                catch(ex){
                    
                }

         };
        })();  
                
        UltimateLib.Logger.log("UltimateLib.Notifications init ran.");              
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Notifications loaded :-)");

    return self;    
})(UltimateLib.Notifications || {});