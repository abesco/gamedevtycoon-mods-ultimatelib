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
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Storage init ran.");
    };
    
    /**
     * @description Writes the specified data to a storage object called UltimateLib.YOUR_STORAGE_ID
     * @method write
     * @param {string} storageId A custom unique ID for identifying your own storage section
     * @param {object} A javascript object that contains the data to be stores in storage
     * @returns {bool} True if writing to the storage was successful otherwise
     * @public
    */ 
    self.writeLikeGdt_IsNotThatGoodForUs_JustForInfoHere = function(storageId, data){
        try {
            if (isLocalStorageAvailable()){
                window.localStorage['UltimateLib.Storage.'+storageId] = JSON.stringify(data);
                UltimateLib.Logger.log("UltimateLib.Storage::write LocalStorage was successfully written at ID " + storageId);
                return true;
            }
        }
        catch(e) {
            UltimateLib.Logger.log("UltimateLib.Storage::write An error occured trying to write to the local storage! Error: " + e.message);
            return false;
        }
    };
    
    /**
     * @description Reads from the UltimateLib localStorage the object stored under the specified ID
     * @method read
     * @param {string} storageId A custom unique ID for identifying your own storage section
     * @returns {object} The object written in the localStorage and identified by the specified ID
     * @public
    */     
    self.readLikeGdt_IsNotThatGoodForUs_JustForInfoHere = function(storageId){
        try {
            if ( isLocalStorageAvailable()){
                UltimateLib.Logger.log("UltimateLib.Storage::read Trying to read from localStorage with ID " + storageId);
                return JSON.parse(window.localStorage['UltimateLib.Storage.'+storageId]);
            }
        }
        catch(e) {
            UltimateLib.Logger.log("UltimateLib.Storage::read An error occured trying to read from the local storage! Error: " + e.message);
            return false;
        }
    };
    
    /**
     * @description Returns true if we have a local storage available on the client machine (using HTML5 localstorage feature)
     * @method isLocalStorageAvailable
     * @private
    */     
    function isLocalStorageAvailable() {
        try {
            return "localStorage" in window && window["localStorage"] !== null;
        } 
        catch (e) 
        {
            UltimateLib.Logger.log("UltimateLib.Storage could not find any local storage available! Error: " + e.message);
            return false;
        }
    }
        
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
    
    self.clearCache = function(){
        $.jStorage.flush();
    };
    
    self.getAllKeys = function(){
        return $.jStorage.index();
    };
    
    self.getStorageSize = function() {
        $.jStorage.storageSize();
    };
    
    self.reload = function(){
        $.jStorage.reInit();  
    };

    // Callback format:
    // function(key, action){
    // console.log(key + " has been " + action);
    // });        
            
    self.onKeyChanged = function(storageId, key, callback){
        $.jStorage.listenKeyChange("UltimateLib.Storage." + storageId + "." + key, callback);
    };
    
    // Stops listening for key change. If callback is set, only the used callback will be cleared, otherwise all listeners will be dropped.
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