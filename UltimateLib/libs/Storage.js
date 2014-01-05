/**
 * @fileOverview This is a custom storage class for the UltimateLib. It uses the jstorage.js by © 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
 *               jStorage is licensed under Unlicense, so basically you can do whatever you want to do with it.
 * @version 1.0.0
 * @author alphabit
 * @constructor
 * @augments UltimateLib
 * @class Storage
 * @
 */
 UltimateLib.Storage = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Storage loading...");
        
    /**
     * @description Determines if the local storage is available
     * @function isLocalStorageAvailable
     * @returns {bool} True if local storage is available otherwise False
     * @private
    */          
    function isLocalStorageAvailable(){
        return $.jStorage.storageAvailable();
    }
    
    /**
     * @description Initializes the module.
     * @function init
     * @public
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Storage init ran.");
    };
        
    /**
     * @description Reads from the UltimateLib localStorage the object stored under the specified ID
     * @function read
     * @param {string} storageId A custom unique ID for identifying your own storage section
     * @param {object} defaultValue Optional default value to apply to the storage value(e) returned in case it hasn't been set
     * @returns {object} The object written in the localStorage and identified by the specified ID
     * @public
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
     * @function write
     * @param {string} storageId A custom unique ID for identifying your own storage section
     * @param {object} data A javascript object that contains the data to be stores in storage
     * @param {int} ttl Optional timeToLive for the data expressed in milliseconds
     * @returns {bool} True if writing to the storage was successful otherwise
     * @public
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
     * @description Clears the storage cache
     * @function clearCache
     * @public
    */         
    self.clearCache = function(){
        $.jStorage.flush();
    };
    
    /**
     * @description Returns all keys used from UltimateLib to store data into storage
     * @function getAllKeys
     * @returns {array} An array of string containing all the keys stored in the UltimateLib storage
     * @public
    */         
    self.getAllKeys = function(){
        return $.jStorage.index();
    };
    
    /**
     * @description Returns the size in bytes of the whole storage
     * @function getStorageSize
     * @returns {int} An integer value indicating the size in bytes of the storage 
     * @public
    */         
    self.getStorageSize = function() {
        return $.jStorage.storageSize();
    };
    
    /**
     * @description Returns the size in bytes left for the whole storage
     * @function getStorageFreeSize
     * @returns {int} An integer value indicating the size in bytes that are left in the storage 
     * @public
    */         
    self.getStorageFreeSize = function(){
        return $.jStorage.storageAvailable();        
    };
    
    /**
     * @description Reloads the data from storage
     * @function reload
     * @public
    */         
    self.reload = function(){
        $.jStorage.reInit();  
    };

    /**
     * Sets up a listener that notifies on updates for the selected key. Updates made in other windows/tabs are reflected, so this feature can also be used for some kind of publish/subscribe service.
     * The callback function should be as follows:
     * function(key, action){
     *      console.log(key + " has been " + action);
     * });
     * @function onKeyChanged
     * @param {string} storageId A custom unique ID for identifying your own storage section
     * @param {string} key The key to observe
     * @param {function} callback A callback function that handles key change notifications. Format: function(key, action)
     * @public
    */        
    self.onKeyChanged = function(storageId, key, callback){
        $.jStorage.listenKeyChange("UltimateLib.Storage." + storageId + "." + key, callback);
    };
    
    /**
     * Stops notifying and tracking for a key change. 
     * If the callback function is set, only the callback specified will be cleared, otherwise all listeners will be dropped.
     * @function removeListeners
     * @param {string} storageId A custom unique ID for identifying your own storage section
     * @param {string} key The key from where to remove the listener(s)
     * @param {function} callback Optional: Callback function that should be dropped
     * @public
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