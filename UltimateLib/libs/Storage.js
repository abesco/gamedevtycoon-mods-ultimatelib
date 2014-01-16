/**
 * @class Storage
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description 
    This is a custom storage class for the UltimateLib. It uses the jstorage.js by (c) 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
    jStorage is licensed under Unlicense, so basically you can do whatever you want to do with it.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 
 UltimateLib.Storage = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Storage loading...");
        
    /**
     * @private
     * @method isLocalStorageAvailable
     * @description Determines if the local storage is available
     * @return {Boolean} True if local storage is available otherwise False
    */          
    function isLocalStorageAvailable(){
        return $.jStorage.storageAvailable();
    }
    
    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Storage init ran.");
    };
        
    /**
     * @description Reads from the UltimateLib localStorage the object stored under the specified ID
     * @method read
     * @param {String} storageId A custom unique ID for identifying your own storage section
     * @param {Object} defaultValue Optional default value to apply to the storage value(e) returned in case it hasn't been set
     * @return {Object} The object written in the localStorage and identified by the specified ID
    */            
    self.read = function(storageId, defaultValue){
        try {
            if ( isLocalStorageAvailable()){
                UltimateLib.Logger.log("UltimateLib.Storage::read Trying to read from localStorage with ID UltimateLib.Storage." + storageId);
                
                if(typeof defaultValue !== undefined){
                    return $.jStorage.get("UltimateLib.Storage." + storageId, defaultValue);
                }
                else {
                    return $.jStorage.get("UltimateLib.Storage." + storageId);
                }
            }
        }
        catch(e) {
            UltimateLib.Logger.log("UltimateLib.Storage::read An error occured trying to read from the local storage! Error: " + e.message);
            return false;
        }
    };

    /**
     * @description Writes the specified data to a storage object called UltimateLib.YOUR_STORAGE_ID
     * @method write
     * @param {String} storageId A custom unique ID for identifying your own storage section
     * @param {Object} data A javascript object that contains the data to be stores in storage
     * @param {Integer} ttl Optional timeToLive for the data expressed in milliseconds
     * @return {Boolean} True if writing to the storage was successful otherwise
    */     
    self.write = function(storageId, data, ttl){
        if(!$.jStorage.storageAvailable()){
            return false;
        }
        try {
            if(typeof ttl !== undefined){
                $.jStorage.set("UltimateLib.Storage." + storageId, data, {TTL: ttl});
            }
            else {
                $.jStorage.set("UltimateLib.Storage." + storageId, data);
            }

            UltimateLib.Logger.log("UltimateLib.Storage::write LocalStorage was successfully written at ID UltimateLib.Storage." + storageId);
            return true;
        }
        catch(e) {
            UltimateLib.Logger.log("UltimateLib.Storage::write An error occured trying to write to the local storage! Error: " + e.message);
            return false;
        }
    };
    
    /**
     * @method clearCache
     * @description Clears the storage cache
    */         
    self.clearCache = function(){
        $.jStorage.flush();
    };
    
    /**
     * @method getAllKeys
     * @description Returns all keys used from UltimateLib to store data into storage
     * @return {array} An array of string containing all the keys stored in the UltimateLib storage
    */         
    self.getAllKeys = function(){
        return $.jStorage.index();
    };
    
    /**
     * @method getStorageSize
     * @description Returns the size in bytes of the whole storage
     * @return {Integer} An integer value indicating the size in bytes of the storage 
    */         
    self.getStorageSize = function() {
        return $.jStorage.storageSize();
    };
    
    /**
     * @method getStorageFreeSize
     * @description Returns the size in bytes left for the whole storage
     * @return {int} An integer value indicating the size in bytes that are left in the storage 
    */         
    self.getStorageFreeSize = function(){
        return $.jStorage.storageAvailable();        
    };
    
    /**
     * @method reload
     * @description Reloads the data from storage
    */         
    self.reload = function(){
        $.jStorage.reInit();  
    };

    /**
     * @method onKeyChanged
     * @description Sets up a listener that notifies on updates for the selected key. Updates made in other windows/tabs are reflected, so this feature can also be used for some kind of publish/subscribe service.
     * @param {String} storageId A custom unique ID for identifying your own storage section
     * @param {String} key The key to observe
     * @param {Function} callback A callback function that handles key change notifications. Format: function(key, action)
     * @example
        The callback function should be as follows:
        function(key, action){
            console.log(key + " has been " + action);
        });
    */        
    self.onKeyChanged = function(storageId, key, callback){
        $.jStorage.listenKeyChange("UltimateLib.Storage." + storageId + "." + key, callback);
    };
    
    /**
     * @method removeListeners
     * @description Stops notifying and tracking for a key change. If the callback function is set, only the callback specified will be cleared, otherwise all listeners will be dropped.
     * @param {String} storageId A custom unique ID for identifying your own storage section
     * @param {String} key The key from where to remove the listener(s)
     * @param {function} callback Optional: Callback function that should be dropped
    */       
    // 
    self.removeListeners = function(storageId, key, callback){
        if (typeof callback !== undefined){
            $.jStorage.stopListening("UltimateLib.Storage." + storageId + "." + key, callback); 
        }
        else {
            $.jStorage.stopListening("UltimateLib.Storage." + storageId + "." + key); 
        }
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Storage loaded :-)");
    
    return self;
})(UltimateLib.Storage || {});