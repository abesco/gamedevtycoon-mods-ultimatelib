/**
 * @class UltimateLib
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.2
 * @description UltimateLib base declaration. Makes the namespace and the base class available before any other thing.
 * @fileOverview UltimateLib base declaration. Makes the namespace and the base class available before any other thing.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
var UltimateLib = (function(self) { 
    
    /**
     * @property {array} js
     * @description An array that contains the js files associated to the complete UltimateLib libraries
     * @public
    */            
    self.js             = [];
      
    /**
     * @property {array} libraries
     * @description An array that contains all the core files of UltimateLib
     * @public
    */            
    self.libraries      = [{name:'Configuration', file:''},
                           {name:'Contracts', file:''}, 
                           {name:'Dialog', file:''},
                           {name:'Elements', file:''},
                           {name:'NameGenerator', file:''},
                           {name:'Notifications', file:''},
                           {name:'PopupMenu', file:''},
                           {name:'Publishers', file:''},
                           {name:'Research', file:''},
                           {name:'Storage', file:''},
                           {name:'Utils', file:''},
                           {name:'VisualTweaks', file:''}];

    /**
     * @property {array} libraries3rd
     * @description An array that contains all the 3rd party files of UltimateLib
     * @public
    */            
    self.libraries3rd   = [{name:'foswig', file:'Contracts'},{name:'jstorage', file:'Contracts'}];

    /**
     * @function getFiles
     * @param {string} Section name
     * @description An array that contains all files found in the UltimateLib library section folders
     * @returns 
     * @public
    */       
    function getFiles(section){
        var outFiles    = [];
        var fs          = require('fs');
       
        if ( typeof fs == 'undefined'){
            return outFiles;
        }
        
        var dir     = './mods/UltimateLib/'+section+'/';
        var files   = fs.readdirSync(dir);
        
        for(var i = 0; i < files.length; i++) {
            
            var f  = files[i];
            var fn = f.substring(f.lastIndexOf('/')+1);
            try{
                var stats = fs.statSync(dir+f);
                if (stats.isFile()) {
                    outFiles.push(dir+f);
                }
            }
            catch(ex){
                self.Logger.log('UltimateLib.getFiles - Could not use acquire info on ' + f, ex);
            }
        }
        
        return outFiles;        
    }

    /**
     * @function init
     * @description Called for global initialization after Base.init()
     * @public
    */        
    self.init = function(){
        var sections        = ['3rd','libs'];
        self.js             = [];        
        
        var availMods = ModSupport.availableMods;
        $.each(availMods, function(i, mod){
            if (mod.id == 'UltimateLib'){
                self.mod = mod;
            }
        });
        
        var handler = function (e) {
            UltimateLib.Logger.log("A module has been loaded. " + e);
            //custom code which will be called whenever one week passes.
            // console.log("mod.loaded");
            // console.log(ModSupport);
        };
        
        GDT.on(GDT.eventKeys.mod.loaded, handler);        
    };
    
    /**
     * @function initDev
     * @description Called for global initialization after Base.init()
     * @public
    */        
    self.initDev = function(){
        var sections        = ['3rd','libs'];
        self.js             = [];

        $.each(sections, function(i, section){
            var files = getFiles(section);
            $.each(files, function(j, file){
                var name = file.replace(/^.*[\\\/]/, '');
                    name = name.substring(0, name.length-3);
                    
                switch(section){
                    case '3rd':
                        self.libraries3rd.push({name:name, file:file});
                    break;
                    
                    case 'libs':
                        self.libraries.push({name:name, file:file});
                    break; 
                }
                
                self.js.push(file);
            });
        });
        
        var availMods = ModSupport.availableMods;
        $.each(availMods, function(i, mod){
            if (mod.id == 'UltimateLib'){
                self.mod = mod;
            }
        });
        
        var handler = function (e) {
            UltimateLib.Logger.log("A module has been loaded. " + e);
            //custom code which will be called whenever one week passes.
            // console.log("mod.loaded");
            // console.log(ModSupport);
        };
        
        GDT.on(GDT.eventKeys.mod.loaded, handler);
    };
        
    /**
     * @property {object} mod
     * @description Returns the GDT package.json object representation of this mod
     * @public
    */                   
    self.mod;
    
    /**
     * @function getObjByName
     * @param {string} Name of the object to find 
     * @description Tries to retrieve an object by it's specified name 
     * @returns An object with the specified name or undefined
     * @public
    */       
    self.getObjByName = function(name){
        var obj  = self[name];
        if(!obj){
           obj = window[name];
        }
        if(!obj){
           obj = eval(name); // eval is evil *eg*
        }        
        return obj;
    };
    
    return self;
})(UltimateLib || {});
/**
 * @class Logger
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.0
 * @description Simple logger for the UltimateLib class. This class is used for simple console based logging purposes related to this package.
 * @fileOverview  Logger is an UltimateLib library providing simple logger capabilities to UltimateLib.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Logger = (function(self) {
    /**
     * @method formatDate 
     * @description Format a date to iso standard yyyy-mm-dd hh:mm:nn
     * @private
     * @param {Date} Date object
     * @returns A string containing a formatted representation of the date in the ISO format (yy-M-dd)
    */        
    function formatDate(dt){
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }   
        return [[AddZero(dt.getFullYear()), AddZero(dt.getMonth() + 1), dt.getDate()].join("-"), [AddZero(dt.getHours()), AddZero(dt.getMinutes()), AddZero(dt.getHours())].join(":")].join(" ");
    }
    
    /**
     * @description Enables / Disables logging
     * @public
     * @param {bool} Enable / Disable logging
    */    
    self.enabled = false;
    
    /**
     * @description Outputs a message to console using a friendly output
     * @public
     * @param {string} The message to output to console
     * @param {string} Optional argument to automatically log an exception
    */    
    self.log = function(msg, ex){
        if(!self.enabled){
            return;
        }
        
        var now = formatDate(new Date());
        
        var m = '';
        if(typeof ex == 'undefined'){
            m = now + ": " + msg;
        }
        else {
            m = now + ": Error! " + msg + "\n" +  ex.message;
        }
        console.log(m);
    };
    
    return self;
})(UltimateLib.Logger || {});
/**
 * @class Core
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.2
 * @description Core class of the UltimateLib.
 * @fileOverview  Core class of the UltimateLib.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Core = (function(self) {       
    /**
     * @method init
     * @description Called for global initialization after Base.init()
     * @public
    */        
    self.init = function(){

        // Initializes the logger
        UltimateLib.Logger.log("--- UltimateLib main library successfully loaded, now loading additional libs...");
               
        // Call "init" methods on all loaded libraries where applicable
        $.each( UltimateLib.libraries, function(i,v){
            var lib     = UltimateLib.getObjByName("UltimateLib." + v.name);
            var init    = lib ? lib.init : null;    

            if(init != null){
                UltimateLib.Logger.log("# Calling UltimateLib internal init function on "+v.name+" ("+v.file+").");
                init();
            }
        });

        UltimateLib.Logger.log("UltimateLib fully loaded.");
        UltimateLib.Logger.log("----------------------------------------------------------------------");

        // Now that the all the library have been loaded and initialized, we try to call the ulInit method on every module's main class
        var availMods = ModSupport.availableMods;
        
        /*
        $.each(availMods, function(i,mod){
           if(mod.active){
               if(mod.ultimatelib){
                
                   // try to get pointer to mod
                   var modptr  =   UltimateLib.getObjByName(mod.ultimatelib);
                   var ulinit  = modptr ? modptr.ulInit : null
                   if(ulinit){
                       UltimateLib.Logger.log("# Calling ulInit function on " + mod.name +" ("+mod.main+").");
                       ulinit();
                       UltimateLib.Logger.log("----------------------------------------------------------------------");
                   }
               }
           }
        });
        */
    };
    
    return self;
})(UltimateLib.Core || {});




/**
 * @class Foswig
 * @author Glenn Conner
 * @version 1.0.0
 * @description Marchov Name Generation Algorithm https://github.com/mrsharpoblunto/foswig.js/blob/master/LICENSE 
 * @fileOverview https://github.com/mrsharpoblunto/foswig.js/blob/master/LICENSE 
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
 
/* Foswig.js | (c) Glenn Conner. | https://github.com/mrsharpoblunto/foswig.js/blob/master/LICENSE */ 

(function(e){e.foswig={};e.foswig.MarkovChain=function(e){function r(a){a=a.toLowerCase();for(var b=k,c=0;c<a.length;++c)if(b=b.children[a[c]],!b)return!1;return!0}function l(a){1<a.length&&l(a.substr(1));for(var b=k,c=0;c<a.length;++c){var d=b.children[a[c]];d||(d=new m,b.children[a[c]]=d);b=d}}function n(a){this.b=a;this.a=[]}function m(){this.children=[]}var k=new m,h=new n(""),p={};this.addWordsToChain=function(a){for(var b=0;b<a.length;++b)this.addWordToChain(a[b])};this.addWordToChain=function(a){l(a.toLowerCase()); for(var b=h,c="",d=0;d<a.length;++d){var q=a[d],c=c+q;c.length>e&&(c=c.substr(1));var f=p[c];f||(f=new n(q),p[c]=f);b.a.push(f);b=f}b.a.push(null)};this.generateWord=function(a,b,c){var d,e;do{e=!1;var f=Math.floor(Math.random()*h.a.length),g=h.a[f];for(d="";g&&d.length<=b;)d+=g.b,f=Math.floor(Math.random()*g.a.length),g=g.a[f];if(d.length>b||d.length<a)e=!0}while(e||!c&&r(d));return d}};"function"===typeof e.define&&e.define.amd&&e.define("foswig",[],function(){return e.foswig})})("undefined"!== typeof window?window:this);/**
 * @class jStorage
 * @author Andris Reinman
 * @version 0.4.7
 * @description Simple local storage wrapper to save data on the browser side. www.jstorage.info
 * @fileOverview Simple local storage wrapper to save data on the browser side. www.jstorage.info
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
 
 /*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Author: Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under Unlicense:
 *
 * This is free and unencumbered software released into the public domain.
 * 
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 * 
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * For more information, please refer to <http://unlicense.org/>
 */

 (function(){
    var
        /* jStorage version */
        JSTORAGE_VERSION = "0.4.7",

        /* detect a dollar object or create one if not found */
        $ = window.jQuery || window.$ || (window.$ = {}),

        /* check for a JSON handling support */
        JSON = {
            parse:
                window.JSON && (window.JSON.parse || window.JSON.decode) ||
                String.prototype.evalJSON && function(str){return String(str).evalJSON();} ||
                $.parseJSON ||
                $.evalJSON,
            stringify:
                Object.toJSON ||
                window.JSON && (window.JSON.stringify || window.JSON.encode) ||
                $.toJSON
        };

    // Break if no JSON support was found
    if(!("parse" in JSON) || !("stringify" in JSON)){
        throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    }

    var
        /* This is the object, that holds the cached values */
        _storage = {__jstorage_meta:{CRC32:{}}},

        /* Actual browser storage (localStorage or globalStorage["domain"]) */
        _storage_service = {jStorage:"{}"},

        /* DOM element for older IE versions, holds userData behavior */
        _storage_elm = null,

        /* How much space does the storage take */
        _storage_size = 0,

        /* which backend is currently used */
        _backend = false,

        /* onchange observers */
        _observers = {},

        /* timeout to wait after onchange event */
        _observer_timeout = false,

        /* last update time */
        _observer_update = 0,

        /* pubsub observers */
        _pubsub_observers = {},

        /* skip published items older than current timestamp */
        _pubsub_last = +new Date(),

        /* Next check for TTL */
        _ttl_timeout,

        /**
         * XML encoding and decoding as XML nodes can't be JSON'ized
         * XML nodes are encoded and decoded if the node is the value to be saved
         * but not if it's as a property of another object
         * Eg. -
         *   $.jStorage.set("key", xmlNode);        // IS OK
         *   $.jStorage.set("key", {xml: xmlNode}); // NOT OK
         */
        _XMLService = {

            /**
             * Validates a XML node to be XML
             * based on jQuery.isXML function
             */
            isXML: function(elm){
                var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            },

            /**
             * Encodes a XML node to string
             * based on http://www.mercurytide.co.uk/news/article/issues-when-working-ajax/
             */
            encode: function(xmlNode) {
                if(!this.isXML(xmlNode)){
                    return false;
                }
                try{ // Mozilla, Webkit, Opera
                    return new XMLSerializer().serializeToString(xmlNode);
                }catch(E1) {
                    try {  // IE
                        return xmlNode.xml;
                    }catch(E2){}
                }
                return false;
            },

            /**
             * Decodes a XML node from string
             * loosely based on http://outwestmedia.com/jquery-plugins/xmldom/
             */
            decode: function(xmlString){
                var dom_parser = ("DOMParser" in window && (new DOMParser()).parseFromString) ||
                        (window.ActiveXObject && function(_xmlString) {
                    var xml_doc = new ActiveXObject("Microsoft.XMLDOM");
                    xml_doc.async = "false";
                    xml_doc.loadXML(_xmlString);
                    return xml_doc;
                }),
                resultXML;
                if(!dom_parser){
                    return false;
                }
                resultXML = dom_parser.call("DOMParser" in window && (new DOMParser()) || window, xmlString, "text/xml");
                return this.isXML(resultXML)?resultXML:false;
            }
        };


    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * Initialization function. Detects if the browser supports DOM Storage
     * or userData behavior and behaves accordingly.
     */
    function _init(){
        /* Check if browser supports localStorage */
        var localStorageReallyWorks = false;
        if("localStorage" in window){
            try {
                window.localStorage.setItem("_tmptest", "tmpval");
                localStorageReallyWorks = true;
                window.localStorage.removeItem("_tmptest");
            } catch(BogusQuotaExceededErrorOnIos5) {
                // Thanks be to iOS5 Private Browsing mode which throws
                // QUOTA_EXCEEDED_ERRROR DOM Exception 22.
            }
        }

        if(localStorageReallyWorks){
            try {
                if(window.localStorage) {
                    _storage_service = window.localStorage;
                    _backend = "localStorage";
                    _observer_update = _storage_service.jStorage_update;
                }
            } catch(E3) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports globalStorage */
        else if("globalStorage" in window){
            try {
                if(window.globalStorage) {
                    if(window.location.hostname == "localhost"){
                        _storage_service = window.globalStorage["localhost.localdomain"];
                    }
                    else{
                        _storage_service = window.globalStorage[window.location.hostname];
                    }
                    _backend = "globalStorage";
                    _observer_update = _storage_service.jStorage_update;
                }
            } catch(E4) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports userData behavior */
        else {
            _storage_elm = document.createElement("link");
            if(_storage_elm.addBehavior){

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = "url(#default#userData)";

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName("head")[0].appendChild(_storage_elm);

                try{
                    _storage_elm.load("jStorage");
                }catch(E){
                    // try to reset cache
                    _storage_elm.setAttribute("jStorage", "{}");
                    _storage_elm.save("jStorage");
                    _storage_elm.load("jStorage");
                }

                var data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}

                try{
                    _observer_update = _storage_elm.getAttribute("jStorage_update");
                }catch(E6){}

                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }else{
                _storage_elm = null;
                return;
            }
        }

        // Load data from storage
        _load_storage();

        // remove dead keys
        _handleTTL();

        // start listening for changes
        _setupObserver();

        // initialize publish-subscribe service
        _handlePubSub();

        // handle cached navigation
        if("addEventListener" in window){
            window.addEventListener("pageshow", function(event){
                if(event.persisted){
                    _storageObserver();
                }
            }, false);
        }
    }

    /**
     * Reload data from storage when needed
     */
    function _reloadData(){
        var data = "{}";

        if(_backend == "userDataBehavior"){
            _storage_elm.load("jStorage");

            try{
                data = _storage_elm.getAttribute("jStorage");
            }catch(E5){}

            try{
                _observer_update = _storage_elm.getAttribute("jStorage_update");
            }catch(E6){}

            _storage_service.jStorage = data;
        }

        _load_storage();

        // remove dead keys
        _handleTTL();

        _handlePubSub();
    }

    /**
     * Sets up a storage change observer
     */
    function _setupObserver(){
        if(_backend == "localStorage" || _backend == "globalStorage"){
            if("addEventListener" in window){
                window.addEventListener("storage", _storageObserver, false);
            }else{
                document.attachEvent("onstorage", _storageObserver);
            }
        }else if(_backend == "userDataBehavior"){
            setInterval(_storageObserver, 1000);
        }
    }

    /**
     * Fired on any kind of data change, needs to check if anything has
     * really been changed
     */
    function _storageObserver(){
        var updateTime;
        // cumulate change notifications with timeout
        clearTimeout(_observer_timeout);
        _observer_timeout = setTimeout(function(){

            if(_backend == "localStorage" || _backend == "globalStorage"){
                updateTime = _storage_service.jStorage_update;
            }else if(_backend == "userDataBehavior"){
                _storage_elm.load("jStorage");
                try{
                    updateTime = _storage_elm.getAttribute("jStorage_update");
                }catch(E5){}
            }

            if(updateTime && updateTime != _observer_update){
                _observer_update = updateTime;
                _checkUpdatedKeys();
            }

        }, 25);
    }

    /**
     * Reloads the data and checks if any keys are changed
     */
    function _checkUpdatedKeys(){
        var oldCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32)),
            newCrc32List;

        _reloadData();
        newCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));

        var key,
            updated = [],
            removed = [];

        for(key in oldCrc32List){
            if(oldCrc32List.hasOwnProperty(key)){
                if(!newCrc32List[key]){
                    removed.push(key);
                    continue;
                }
                if(oldCrc32List[key] != newCrc32List[key] && String(oldCrc32List[key]).substr(0,2) == "2."){
                    updated.push(key);
                }
            }
        }

        for(key in newCrc32List){
            if(newCrc32List.hasOwnProperty(key)){
                if(!oldCrc32List[key]){
                    updated.push(key);
                }
            }
        }

        _fireObservers(updated, "updated");
        _fireObservers(removed, "deleted");
    }

    /**
     * Fires observers for updated keys
     *
     * @param {Array|String} keys Array of key names or a key
     * @param {String} action What happened with the value (updated, deleted, flushed)
     */
    function _fireObservers(keys, action){
        keys = [].concat(keys || []);
        if(action == "flushed"){
            keys = [];
            for(var key in _observers){
                if(_observers.hasOwnProperty(key)){
                    keys.push(key);
                }
            }
            action = "deleted";
        }
        for(var i=0, len = keys.length; i<len; i++){
            if(_observers[keys[i]]){
                for(var j=0, jlen = _observers[keys[i]].length; j<jlen; j++){
                    _observers[keys[i]][j](keys[i], action);
                }
            }
            if(_observers["*"]){
                for(var j=0, jlen = _observers["*"].length; j<jlen; j++){
                    _observers["*"][j](keys[i], action);
                }
            }
        }
    }

    /**
     * Publishes key change to listeners
     */
    function _publishChange(){
        var updateTime = (+new Date()).toString();

        if(_backend == "localStorage" || _backend == "globalStorage"){
            try {
                _storage_service.jStorage_update = updateTime;
            } catch (E8) {
                // safari private mode has been enabled after the jStorage initialization
                _backend = false;
            }
        }else if(_backend == "userDataBehavior"){
            _storage_elm.setAttribute("jStorage_update", updateTime);
            _storage_elm.save("jStorage");
        }

        _storageObserver();
    }

    /**
     * Loads the data from the storage based on the supported mechanism
     */
    function _load_storage(){
        /* if jStorage string is retrieved, then decode it */
        if(_storage_service.jStorage){
            try{
                _storage = JSON.parse(String(_storage_service.jStorage));
            }catch(E6){_storage_service.jStorage = "{}";}
        }else{
            _storage_service.jStorage = "{}";
        }
        _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;

        if(!_storage.__jstorage_meta){
            _storage.__jstorage_meta = {};
        }
        if(!_storage.__jstorage_meta.CRC32){
            _storage.__jstorage_meta.CRC32 = {};
        }
    }

    /**
     * This functions provides the "save" mechanism to store the jStorage object
     */
    function _save(){
        _dropOldEvents(); // remove expired events
        try{
            _storage_service.jStorage = JSON.stringify(_storage);
            // If userData is used as the storage engine, additional
            if(_storage_elm) {
                _storage_elm.setAttribute("jStorage",_storage_service.jStorage);
                _storage_elm.save("jStorage");
            }
            _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
        }catch(E7){/* probably cache is full, nothing is saved this way*/}
    }

    /**
     * Function checks if a key is set and is string or numberic
     *
     * @param {String} key Key name
     */
    function _checkKey(key){
        if(!key || (typeof key != "string" && typeof key != "number")){
            throw new TypeError("Key name must be string or numeric");
        }
        if(key == "__jstorage_meta"){
            throw new TypeError("Reserved key name");
        }
        return true;
    }

    /**
     * Removes expired keys
     */
    function _handleTTL(){
        var curtime, i, TTL, CRC32, nextExpire = Infinity, changed = false, deleted = [];

        clearTimeout(_ttl_timeout);

        if(!_storage.__jstorage_meta || typeof _storage.__jstorage_meta.TTL != "object"){
            // nothing to do here
            return;
        }

        curtime = +new Date();
        TTL = _storage.__jstorage_meta.TTL;

        CRC32 = _storage.__jstorage_meta.CRC32;
        for(i in TTL){
            if(TTL.hasOwnProperty(i)){
                if(TTL[i] <= curtime){
                    delete TTL[i];
                    delete CRC32[i];
                    delete _storage[i];
                    changed = true;
                    deleted.push(i);
                }else if(TTL[i] < nextExpire){
                    nextExpire = TTL[i];
                }
            }
        }

        // set next check
        if(nextExpire != Infinity){
            _ttl_timeout = setTimeout(_handleTTL, nextExpire - curtime);
        }

        // save changes
        if(changed){
            _save();
            _publishChange();
            _fireObservers(deleted, "deleted");
        }
    }

    /**
     * Checks if there's any events on hold to be fired to listeners
     */
    function _handlePubSub(){
        var i, len;
        if(!_storage.__jstorage_meta.PubSub){
            return;
        }
        var pubelm,
            _pubsubCurrent = _pubsub_last;

        for(i=len=_storage.__jstorage_meta.PubSub.length-1; i>=0; i--){
            pubelm = _storage.__jstorage_meta.PubSub[i];
            if(pubelm[0] > _pubsub_last){
                _pubsubCurrent = pubelm[0];
                _fireSubscribers(pubelm[1], pubelm[2]);
            }
        }

        _pubsub_last = _pubsubCurrent;
    }

    /**
     * Fires all subscriber listeners for a pubsub channel
     *
     * @param {String} channel Channel name
     * @param {Mixed} payload Payload data to deliver
     */
    function _fireSubscribers(channel, payload){
        if(_pubsub_observers[channel]){
            for(var i=0, len = _pubsub_observers[channel].length; i<len; i++){
                // send immutable data that can't be modified by listeners
                try{
                    _pubsub_observers[channel][i](channel, JSON.parse(JSON.stringify(payload)));
                }catch(E){};
            }
        }
    }

    /**
     * Remove old events from the publish stream (at least 2sec old)
     */
    function _dropOldEvents(){
        if(!_storage.__jstorage_meta.PubSub){
            return;
        }

        var retire = +new Date() - 2000;

        for(var i=0, len = _storage.__jstorage_meta.PubSub.length; i<len; i++){
            if(_storage.__jstorage_meta.PubSub[i][0] <= retire){
                // deleteCount is needed for IE6
                _storage.__jstorage_meta.PubSub.splice(i, _storage.__jstorage_meta.PubSub.length - i);
                break;
            }
        }

        if(!_storage.__jstorage_meta.PubSub.length){
            delete _storage.__jstorage_meta.PubSub;
        }

    }

    /**
     * Publish payload to a channel
     *
     * @param {String} channel Channel name
     * @param {Mixed} payload Payload to send to the subscribers
     */
    function _publish(channel, payload){
        if(!_storage.__jstorage_meta){
            _storage.__jstorage_meta = {};
        }
        if(!_storage.__jstorage_meta.PubSub){
            _storage.__jstorage_meta.PubSub = [];
        }

        _storage.__jstorage_meta.PubSub.unshift([+new Date, channel, payload]);

        _save();
        _publishChange();
    }


    /**
     * JS Implementation of MurmurHash2
     *
     *  SOURCE: https://github.com/garycourt/murmurhash-js (MIT licensed)
     *
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/murmurhash-js
     * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
     * @see http://sites.google.com/site/murmurhash/
     *
     * @param {string} str ASCII only
     * @param {number} seed Positive integer only
     * @return {number} 32-bit positive integer hash
     */

    function murmurhash2_32_gc(str, seed) {
        var
            l = str.length,
            h = seed ^ l,
            i = 0,
            k;

        while (l >= 4) {
            k =
                ((str.charCodeAt(i) & 0xff)) |
                ((str.charCodeAt(++i) & 0xff) << 8) |
                ((str.charCodeAt(++i) & 0xff) << 16) |
                ((str.charCodeAt(++i) & 0xff) << 24);

            k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
            k ^= k >>> 24;
            k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

            h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

            l -= 4;
            ++i;
        }

        switch (l) {
            case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
            case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
            case 1: h ^= (str.charCodeAt(i) & 0xff);
                h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        }

        h ^= h >>> 13;
        h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        h ^= h >>> 15;

        return h >>> 0;
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    $.jStorage = {
        /* Version number */
        version: JSTORAGE_VERSION,

        /**
         * Sets a key's value.
         *
         * @param {String} key Key to set. If this value is not set or not
         *              a string an exception is raised.
         * @param {Mixed} value Value to set. This can be any value that is JSON
         *              compatible (Numbers, Strings, Objects etc.).
         * @param {Object} [options] - possible options to use
         * @param {Number} [options.TTL] - optional TTL value
         * @return {Mixed} the used value
         */
        set: function(key, value, options){
            _checkKey(key);

            options = options || {};

            // undefined values are deleted automatically
            if(typeof value == "undefined"){
                this.deleteKey(key);
                return value;
            }

            if(_XMLService.isXML(value)){
                value = {_is_xml:true,xml:_XMLService.encode(value)};
            }else if(typeof value == "function"){
                return undefined; // functions can't be saved!
            }else if(value && typeof value == "object"){
                // clone the object before saving to _storage tree
                value = JSON.parse(JSON.stringify(value));
            }

            _storage[key] = value;

            _storage.__jstorage_meta.CRC32[key] = "2." + murmurhash2_32_gc(JSON.stringify(value), 0x9747b28c);

            this.setTTL(key, options.TTL || 0); // also handles saving and _publishChange

            _fireObservers(key, "updated");
            return value;
        },

        /**
         * Looks up a key in cache
         *
         * @param {String} key - Key to look up.
         * @param {mixed} def - Default value to return, if key didn't exist.
         * @return {Mixed} the key value, default value or null
         */
        get: function(key, def){
            _checkKey(key);
            if(key in _storage){
                if(_storage[key] && typeof _storage[key] == "object" && _storage[key]._is_xml) {
                    return _XMLService.decode(_storage[key].xml);
                }else{
                    return _storage[key];
                }
            }
            return typeof(def) == "undefined" ? null : def;
        },

        /**
         * Deletes a key from cache.
         *
         * @param {String} key - Key to delete.
         * @return {Boolean} true if key existed or false if it didn't
         */
        deleteKey: function(key){
            _checkKey(key);
            if(key in _storage){
                delete _storage[key];
                // remove from TTL list
                if(typeof _storage.__jstorage_meta.TTL == "object" &&
                  key in _storage.__jstorage_meta.TTL){
                    delete _storage.__jstorage_meta.TTL[key];
                }

                delete _storage.__jstorage_meta.CRC32[key];

                _save();
                _publishChange();
                _fireObservers(key, "deleted");
                return true;
            }
            return false;
        },

        /**
         * Sets a TTL for a key, or remove it if ttl value is 0 or below
         *
         * @param {String} key - key to set the TTL for
         * @param {Number} ttl - TTL timeout in milliseconds
         * @return {Boolean} true if key existed or false if it didn't
         */
        setTTL: function(key, ttl){
            var curtime = +new Date();
            _checkKey(key);
            ttl = Number(ttl) || 0;
            if(key in _storage){

                if(!_storage.__jstorage_meta.TTL){
                    _storage.__jstorage_meta.TTL = {};
                }

                // Set TTL value for the key
                if(ttl>0){
                    _storage.__jstorage_meta.TTL[key] = curtime + ttl;
                }else{
                    delete _storage.__jstorage_meta.TTL[key];
                }

                _save();

                _handleTTL();

                _publishChange();
                return true;
            }
            return false;
        },

        /**
         * Gets remaining TTL (in milliseconds) for a key or 0 when no TTL has been set
         *
         * @param {String} key Key to check
         * @return {Number} Remaining TTL in milliseconds
         */
        getTTL: function(key){
            var curtime = +new Date(), ttl;
            _checkKey(key);
            if(key in _storage && _storage.__jstorage_meta.TTL && _storage.__jstorage_meta.TTL[key]){
                ttl = _storage.__jstorage_meta.TTL[key] - curtime;
                return ttl || 0;
            }
            return 0;
        },

        /**
         * Deletes everything in cache.
         *
         * @return {Boolean} Always true
         */
        flush: function(){
            _storage = {__jstorage_meta:{CRC32:{}}};
            _save();
            _publishChange();
            _fireObservers(null, "flushed");
            return true;
        },

        /**
         * Returns a read-only copy of _storage
         *
         * @return {Object} Read-only copy of _storage
        */
        storageObj: function(){
            function F() {}
            F.prototype = _storage;
            return new F();
        },

        /**
         * Returns an index of all used keys as an array
         * ["key1", "key2",.."keyN"]
         *
         * @return {Array} Used keys
        */
        index: function(){
            var index = [], i;
            for(i in _storage){
                if(_storage.hasOwnProperty(i) && i != "__jstorage_meta"){
                    index.push(i);
                }
            }
            return index;
        },

        /**
         * How much space in bytes does the storage take?
         *
         * @return {Number} Storage size in chars (not the same as in bytes,
         *                  since some chars may take several bytes)
         */
        storageSize: function(){
            return _storage_size;
        },

        /**
         * Which backend is currently in use?
         *
         * @return {String} Backend name
         */
        currentBackend: function(){
            return _backend;
        },

        /**
         * Test if storage is available
         *
         * @return {Boolean} True if storage can be used
         */
        storageAvailable: function(){
            return !!_backend;
        },

        /**
         * Register change listeners
         *
         * @param {String} key Key name
         * @param {Function} callback Function to run when the key changes
         */
        listenKeyChange: function(key, callback){
            _checkKey(key);
            if(!_observers[key]){
                _observers[key] = [];
            }
            _observers[key].push(callback);
        },

        /**
         * Remove change listeners
         *
         * @param {String} key Key name to unregister listeners against
         * @param {Function} [callback] If set, unregister the callback, if not - unregister all
         */
        stopListening: function(key, callback){
            _checkKey(key);

            if(!_observers[key]){
                return;
            }

            if(!callback){
                delete _observers[key];
                return;
            }

            for(var i = _observers[key].length - 1; i>=0; i--){
                if(_observers[key][i] == callback){
                    _observers[key].splice(i,1);
                }
            }
        },

        /**
         * Subscribe to a Publish/Subscribe event stream
         *
         * @param {String} channel Channel name
         * @param {Function} callback Function to run when the something is published to the channel
         */
        subscribe: function(channel, callback){
            channel = (channel || "").toString();
            if(!channel){
                throw new TypeError("Channel not defined");
            }
            if(!_pubsub_observers[channel]){
                _pubsub_observers[channel] = [];
            }
            _pubsub_observers[channel].push(callback);
        },

        /**
         * Publish data to an event stream
         *
         * @param {String} channel Channel name
         * @param {Mixed} payload Payload to deliver
         */
        publish: function(channel, payload){
            channel = (channel || "").toString();
            if(!channel){
                throw new TypeError("Channel not defined");
            }

            _publish(channel, payload);
        },

        /**
         * Reloads the data from browser storage
         */
        reInit: function(){
            _reloadData();
        },

        /**
         * Removes reference from global objects and saves it as jStorage
         *
         * @param {Boolean} option if needed to save object as simple "jStorage" in windows context
         */
         noConflict: function( saveInGlobal ) {
            delete window.$.jStorage

            if ( saveInGlobal ) {
                window.jStorage = this;
            }

            return this;
         }
    };

    // Initialize jStorage
    _init();

})();
/**
 * @class Configuration
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
 * @fileOverview Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Configuration = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loading...");

    /**
     * @method
     * @description Creates a tab panel to use for addTab
     * @param {string} Name (id) of the tab panel element
     * @param {string} Text to show as title
     * @param {string} Panel content
     * @returns {TabPanel} The new tab panel that can be used for further operations
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
            tabs.tabs( 'select', 0);
            
        $("#"+name).append(content);
                     
        return tabPanel;
    };
    
    /**
     * @method
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

        UltimateLib.Logger.log("UltimateLib.Configuration init ran.");              
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Configuration loaded :-)");

    return self;    
})(UltimateLib.Configuration || {});/**
 * @class Contracts
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This is an API for adding contracts to the game.
 * @fileOverview This is an API for adding contracts to the game.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Contracts = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loading...");

    /**
     * @method
     * @description Initializes the module.
    */ 
    self.init = function(){
    	
    	// Zero Contract Stores
    	var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.largeContracts = [];
        getstore.mediumContracts = [];
        getstore.smallContracts = [];
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");
        
    };
    
	/**
     * @method 
     * @description Adds a custom contract.
     * UltimateLib Contract Format
        {
            name : "Contract Name",
            description : "Contract description",
            requiredD : 10, // Design points required
            requiredT : t, // tech points required
            payment : 3E4, // Payment on completion 
            penalty : -2E3, // Penelty for not completing on time.
            weeksToFinish : 4, // Number of weeks to complete the contract.
            rF : template.rF, 
            size : "size" //"small", "medium", or "large"
        }
     *
     * @param {contract object} The GDT contract object as described
    */    
	self.addContract = function (contract) {
		
		var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.largeContracts = [];
        getstore.mediumContracts = [];
        getstore.smallContracts = [];
		
		if (!contractCheck(contract)) {
			UltimateLib.Logger.log("Contract Failed Compatiblity Check. " + contract);
			return; 
		};
		
		var fcontract = formatContract(contract);
		console.log(fcontract);
		console.log(fcontract.size);
		switch (fcontract.size){
			case "small":
				getstore.smallContracts.push(fcontract);
				console.log("small pushed");
				break;
			case "medium":
				getstore.mediumContracts.push(fcontract);
				break;
			case "large":
				getstore.largeContracts.push(fcontract);
				break;
		}
		
		UltimateLib.Logger.log("Contract Added: " + fcontract.name);
	};
		
	/**
     * @method 
     * @private
     * @description Checks the contract for errors.
     * @param {contract object} A GDT contract object
     * @return {boolean} Pass or Fail the check
    */  
	function contractCheck(contract){
		if (!(Checks.checkPropertiesPresent(contract, ['name', 'description', 'requiredD', 'requiredT', 'payment','penalty','weeksToFinish','rF','size']) 
		   )) {
		   	return false;
		};
		return true;	
	};
		
	/**
     * @method 
     * @description Formats the contract object to full contract object
     * Real Contract Format
        {
            name : "Contract Name",
            description : "Contract description",
            requiredD : 10, // Design points required
            requiredT : t, // tech points required
            spawnedD : 0,
            spawnedT : 0,
            payment : 3E4, // Payment on completion 
            penalty : -2E3, // Penelty for not completing on time.
            weeksToFinish : 4, // Number of weeks to complete the contract.
            rF : template.rF, 
            isGeneric : true, 
            size : "size" //"small", "medium", or "large"
     *  }
     * @private
     * @param {contract object} A GDT contract object
     * @return {full-contract object} A GDT full (formatted) contract object
    */  
     /* 
	*/
	function formatContract(contract){
		var c = contract;
		return {
				name : c.name,
				description : c.description,
				requiredD : c.requiredD, // Design points required
				requiredT : c.requiredT, // tech points required
				spawnedD : 0,
				spawnedT : 0,
				payment : c.payment, // Payment on completion 
				penalty : c.penalty, // Penelty for not completing on time.
				weeksToFinish : c.weeksToFinish, // Number of weeks to complete the contract.
				rF : c.rF, 
				isGeneric : true, 
				size : c.size // "small", "medium", or "large"
		};
	};

	/**
     * @method
     * @description Adds custom contracts.
     * @private
     * @return {contract object array} An array of GDT contract objects
    */  
	function hijackgetAvailable () {
		var keep = ProjectContracts.getAvailable;
		ProjectContracts.getAvailable  = function(company, type){
			var contracts = keep(company, type);
			if (type == "generic"){contracts.addRange(UltimateLib.Contracts.collection(company)); UltimateLib.Logger.log("Contract Collection Added");}
			return contracts;				
		};
	};
	
	/**
     * @method
     * @description Returns all pertinent collected contracts.
     * @param {GDT company object} A GDT contract object
     * @return {contract object array} An array of GDT contract objects
    */  
	self.collection = function (company) {
		
		var getstore = GDT.getDataStore("UltimateLib").settings;
		var collectedContracts = [];
		
			collectedContracts.addRange(getstore.smallContracts);
			UltimateLib.Logger.log("Small Contracts Added");
		if (company.flags.mediumContractsEnabled){
			collectedContracts.addRange(getstore.mediumContracts);
			UltimateLib.Logger.log("Medium Contracts Added");
		}
		if (company.flags.largeContractsEnabled) {
			collectedContracts.addRange(getstore.largeContracts);
			UltimateLib.Logger.log("Large Contracts Added");
		}
		
		return collectedContracts;
	};
	
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loaded :-)");
        
    return self;
})(UltimateLib.Contracts || {});/**
 * @class Dialog
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
 * @fileOverview Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
 UltimateLib.Dialog = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loading...");
    
    /**
     * @method 
     * @description Creates a dialog button and returns it as a wrapped jQuery element object for further usage
     * @param {string} name A name (id) for the dialog button. Additional element names will be automatically extended as required.  
     * @param {string} text Text (Title) of the button
     * @param {string|integer} width The width of the button  (as integer or css string)
     * @param {string|integer} height The height of the button  (as integer or css string)
     * @param {string} onclick A string indicating the callback function to call (i.e. UI.myCallBackOnUIClick)
    */        
    self.createButton = function(name, text, width, height, onclick) {
        var el = $(document.createElement('div'));
        
        el.addClass('selectorButton whiteButton');
        el.css({display:'inline-block', position: 'relative', marginLeft:'50px', width: width, height: height});
        el.attr({id:name, onclick:onclick});
        el.text(text);
        
        return el;
    };
    
    /**
     * @method 
     * @description Creates a dialog section and returns it as a wrapped jQuery element object for further usage
     * @param {string} name A name (id) for the dialog element. Additional element names will be automatically extended with "Section", "SectionTitle", etc.  
     * @param {string} text Text (Title) of the section label
     * @param {array} buttons An array of buttons to show in the dialog section (use createButton to create each button)  
    */                
    self.createSection = function(name, text, buttons){
        var idSection       = name + "Section";
        var idSectionTitle  = name + "SectionTitle";
        
        var section = $(document.createElement('div'));
            section.attr({id:idSection});

        var label = $(document.createElement('div'));
            label.css({textAlign:'center', marginLeft:'50px', width: '450px'});
            label.attr({id:idSectionTitle});
            label.text(text);
            label.appendTo(section);
            
            for(var i = 0; i < buttons.length;i++){
                buttons[i].appendTo(section);
            }
        
        return section;
    };
            
    /**
     * @method 
     * @description Creates a dialog and returns it as a wrapped jQuery element object for further usage
     * @param {string} name A name (id) for the dialog element. Additional element names will be automatically extended with "Modal", "Container", etc.  
     * @param {string} text Text (Title) of the dialog
     * @param {array} sections An array of sections to show on the dialog (use createSection to create each section)  
    */                
    self.createDialog = function(name, text, sections){
        var idModalDialog       = name + "Modal";
        var idDialogContainer   = name + "Container";
        var idTop               = name + "Top";
        var idPoweredBy         = name + "PoweredBy";
        
        // Modal dialog for a GDT dialog -->
        var modal = $(document.createElement('div'));
            modal.attr({id:idModalDialog});
            modal.addClass('ow-overlay ow-closed');
            
        // Container for a modal dialog
        var container = $(document.createElement('div'));
            container.attr({id:idDialogContainer});
            container.addClass('windowBorder tallWindow');
            container.css({overflow:'auto', display:'none'});
            
        var scrolltop = $(document.createElement('div'));
            scrolltop.attr({id:idTop});
            scrolltop.addClass('windowTitle smallerWindowTitle');
            scrolltop.text(text);
            scrolltop.appendTo(container);
                                        
        $.each(sections, function(i, v){
            container.append(v);
        });

        var poweredBy = $(document.createElement('div'));
            poweredBy.attr({id:idPoweredBy});
            poweredBy.css({textAlign:'center', marginLeft:'50px', width: '450px'});
            poweredBy.append('br').append('br');
            poweredBy.text("Powered by UltimateLib");
            poweredBy.appendTo(container);
            
        return container;
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loaded :-)");
    
    return self;    
})(UltimateLib.Dialog || {});
/**
 * @class Elements
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.0
 * @description Elements provides quick access to some important dom elements. This class handles all the loading work for including the libraries related to this package.
 * @fileOverview Elements provides quick access to some important dom elements. This class handles all the loading work for including the libraries related to this package.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Elements = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loading...");
    
    /**
     * @method
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Elements init ran.");
    };

    /**
     * @description The Head element of the document. This is the Head DOM Element wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.Head           = $('head');

    /**
     * @description The Body element of the document. This is the Body DOM Element wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.Body           = $('body');

    /**
     * @description The Settings Panel element of the game. The Settings Panel DOM Element wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.SettingsPanel  = $('#settingsPanel');
      
    /**
     * @description The gameContainerWrapper. This is the gameContainerWrapper of the GDT document wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.GameContainerWrapper  = $('#gameContainerWrapper');
      
    /**
     * @description The gameContainerWrapper.
     * @returns The gameContainerWrapper of the GDT wrapped in a jQuery element object.
     * @property {dom} SimpleModalContainer
     * @public
    */   

    /**
     * @description The simple modal container div. This is the simplemodal-container element of the GDT document wrapped in a jQuery element object.
     * @property 
     * @type dom object
    */         
    self.SimpleModalContainer  = $('#simplemodal-container');
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loaded :-)");

    return self;
})(UltimateLib.Elements || {});
/**
 * @class NameGenerator
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @fileOverview NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.NameGenerator = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.NameGenerator loading...");
    
    /*
     * @description Holds company name data used for name generation. The format is {adjectives:[], nouns:[], suffixes:[]}
     * @property
     * @type object
     * @private
    */
    var companyNamesData = {
        adjectives: [
                        "Digital", "Online", "Loud", "Quiet",
                        "Black", "White", "Red", "Blue", "Yellow", "Green", "Pink",
                        "Hard", "Soft", "Round", "Fast", "Slow", "Easy", "Tricky",
                        "Tiny", "Big", "Giant", "Large", "Puny", "Heavy", "Light", "Dark",
                        "Fast", "Speedy", "One",
                        "Angry", "Happy", "Sad", "Mad", "Glad", "Rad", "Joy", "Love", "Naughty",
                        "Flying", "Jumping", "Soaring", "Falling", "Dying", "Edible",
                        "Undone", "Lonely", "Cracked", "Broken", "Found", "Lost",
                        "North", "South", "East", "West", 
                        "Late", "Early", "Never", "Always", "Midnight",
                        "Upper", "Lower", "Inner", "Outer",
                        "Rendered", "Rotten", "Fresh", "Altered", "Organic", "Sour",
                        "Coastal", "Chill", "Healing", "Damaged"
                        ],
        nouns:  [
                         "Method", "Function", 
                         "Bomb", "Missile", "Gun", "Weapon", "Tank", "Rocket",
                         "Terminal", "Connection", "Joint", "Machine", "Engine",
                         "Starship", "Sandwich", "Plane", "Saucer", "Airship", "Jet", "Boat", "Ship",
                         "Window", "Screen", "Man", "Computer",
                         "Happiness", "Sadness", "Anger",
                         "Spoon", "Knife", "Fork", 
                         "Island", "Village", "City", "Town", "Mountain", "River", "Ocean", "Sea", "Coast",
                         "Space", "World", "Earth", "Planet", "Night", "Day", "Star", "Sun",
                         "Voyage", "Journey", "Time", "Destruction", "Ideas", "Everything",
                         "King", "Queen", "Daughter", "Son", "Prince", "Princess",
                         "Hangar", "Rainbow", "Signal", "Book", "Lawn",
                         "Dog", "Cat", "Lion", "Horse", "Elephant", "Sloth", "Panda",
                         "Turkey", "Possum", "Skunk", "Walrus", "Bear", 
                         "Wizard", "Warrior", "Knight", "Dragon", "Goblin", "Mage",
                         "Soul", "Music", "Country", "Enemy", "History",
                         "Doctor", "Scientist", "Engineer", "Janitor", "Landlord", "Butcher", 
                         "Astronaut", "Spaceman",
                         "Hallway", "Ghost",  "Spirit", "Visions",
                         "Hour", "Day", "Month", "Year", "Second", "Minute", "Age",
                         "Men", "Women", "Boys", "Girls", "Uncle", "Aunt", "Mother", "Father",
                         "Yard", "Room",
                         "Banana", "Apple", "Melon", "Cake", "Pie", 
                         "Tomato", "Celery", 
                         "Sawblade", "Drill", "Hammer", "Nail", "Knife", "Knives",
                         "Graveyard", "Highway", "Midnight", "Death", "Tragedy", "Tomb", "Progress", "Tree",
                         "Gem", "Diamond", "Ruby", "Pearl", "Sparkle"
                ],
        suffixes:  [    "Collective", "United", "Studio", "Interactive", "Games", "Group",
                        "Team", "Community", "Alliance", "Company", "Direction"
                   ]
    };
    
    /*
     * @description Holds player name data used for name generation (male and female). The format is {male:{firstNames:[]}, female:{firstNames:[]}, lastNames:[]}
     * @property
     * @type object
     * @private
    */    
    var playerNamesData = {
        male:{
                firstNames: ['John', 'Mike', 'Marc', 'Mark', 'Will', 'Bill', 
                             'Patrick', 'Daniel', 'Frank', 'Chad', 'Francesco', 
                             'Charles', 'Justin', 'Bas', 'Matthijs', 'Alessandro', 
                             'Eugene', 'Mohammed', 'Yuri', 'Ali', 'Tarkan', 'Juan', 
                             'Chico', 'Loco', 'Francis', 'Peter', 'Robert', 'Knut', 
                             'Manfred', 'Johann', 'Karim', 'Christian', 'Ronald', 
                             'Roland', 'Igor', 'Ivan', 'Marek']
        },
        female:{
                firstNames: ['Joanna', 'Abigail', 'Jasmine', 'Monica', 'Janette', 'Chantal', 
                             'Maria', 'Conny', 'Marijane', 'Jane', 'Charlie', 
                             'Charlize', 'April', 'May', 'June', 'Chelsea', 
                             'Benedetta', 'Antje', 'Maraike', 'Mary', 'Nicole', 'Sandra', 
                             'Caroline', 'Elisabeth', 'Beth', 'Kate', 'Dorothee', 'Cornelia', 
                             'Eve', 'Anne', 'Marie', 'Hannah', 'Helene', 
                             'Lotte', 'Julia', 'Jolanda', 'Jennifer']
        },
        lastNames:  ['Wilders', 'Carmack', 'Jones', 'Bush', 'Kennedy', 
                     'Williams', 'McLoud', 'Alas', 'Popovic', 'Markos', 
                     'Cross', 'Van der Wiel', 'Van Bonkrost', 'Rosek', 
                     'Klug', 'Schlau', 'Dost', 'Van der Keen', 'Johnsson', 
                     'Kerry', 'Miller', 'Garcia', 'Lee', 'Gonzales', 'Young', 
                     'Allen', 'Peterson', 'Morgan', 'Freeman', 'Howard', 'Cox']
    }
    
    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
    };
    
    self.generateCompanyName = function(){
        function getItem(array) {
            return array[Math.floor(Math.random()*array.length)];
        }

        var name = "";
        
        if(Math.random() < 0.7) {
            name += ""  + getItem(companyNamesData.adjectives);
            name += " " + getItem(companyNamesData.nouns);
        }
        else  {
            name += ""  + getItem(companyNamesData.nouns);
            name += " " + getItem(companyNamesData.nouns);
        }

        if(Math.random() < 0.3) {
            name += " " + getItem(companyNamesData.suffixes);
        }
        
        return name;
    
    };
    
    self.generatePlayerName = function(male){
        function getItem(array) {
            return array[Math.floor(Math.random()*array.length)];
        }
        
        
        var firstNames  = male ? playerNamesData.male.firstNames : playerNamesData.female.firstNames;
        var name = ""  + getItem(firstNames);
            name += " " + getItem(playerNamesData.lastNames);

        if(Math.random() < 0.3) {
            name += "-" + getItem(playerNamesData.lastNames);
        }
        
        return name;
    
    };
        
    /*
    // Create the markov chain and specify the Order of the markov chain.
    // The order (an integer > 0) indicates how many previous letters are 
    // taken into account when selecting the next. A smaller order will
    // result in more randomized less recognizeable output. Conversely a
    // higher order will result in words which resemble more closely those
    // in the original dictionary.
    var chain = new foswig.MarkovChain(3);

    // add words into the markov chain one at a time
    chain.addWordToChain("random");

    //OR add all the words in an array at once
    var dictionary = ["hello","foswig"];
    chain.addWordsToChain(dictionary);

    // generate a random word with a minimum of 5 characters, a maximum of 10 letters, 
    // and that cannot be a match to any of the input dictionaries words
    var randomWord = chain.generateWord(5,10,false);
    */
    

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.NameGenerator loaded :-)");

    return self;    
})(UltimateLib.NameGenerator || {});
/**
 * @class Notifications
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.2
 * @description Notifications is an UltimateLib library class providing capabilities to manipulate the in-game settings notification system.
 * @fileOverview Notifications is an UltimateLib library class providing capabilities to manipulate the in-game settings notification system
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
UltimateLib.Notifications = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Notifications loading...");
    
    /**
     * @description Typewriter effect delay value object. Allowed modes are 'default' and 'factor'. 
     * When using 'default' you can input integer values from 0 to whatever. 20 is the default game value.
     * When using the 'factor', you can specify a value between 0.0 and 1.0 that will be multiplied with the regular value.
     * 
     * Object specification:
     * {mode:'default' or 'factor', value:Integer_for_default or Float_for_factor}
     * @property
     * @type object
     */    
    self.typeWriterDelay = {mode:'factor', value:1.0};
    
    /**
     * @description 
     * @property 
     * @type float
     */        
    self.typeWriterDelayFactor = 1.0;
    
    /**
     * @description Headers is a nested class of Notifications and provides direct access to supported in-game notification headers.
     * @property
     * @type array
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
    * @method
    * @description Sets the state of all internal dialog items to enabled or disabled.
    * @param {boolean} enable Specifies a value to enable or disable all dialogs
    * 
    */
     self.enableAll = function(enable){
        for(var i = 0; i < self.Items.length; i++){
            self.Items[i].enabled = enable;
        }  
     }; 
     
    /**
    * @method
    * @description Sets the state of all internal dialog items to overlay or not overlay.
    * @param {boolean} enable Specifies a value to enable or disable overlay on all dialogs
    * 
    */
     self.overlayAll = function(enable){
        for(var i = 0; i < self.Items.length; i++){
            self.Items[i].asOverlay = enable;
        }  
     };      
        
    /**
    * @method
    * @description Sets the state of the corresponding internal item of the specified item to the overlay state of the specified item.
    * @param {object} item Set overlay value of the specified item and pass it internally to GDT
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
    * @method
    * @description Sets the state of the corresponding internal item of the specified item to the enabled state of the specified item.
    * @param {object} item Set enabled value of the specified item and pass it internally to GDT
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
    * @method
    * @description Returns an notification item object by looking for the id
    * @param {object} item Set overlay value of the specified item and pass it internally to GDT
    * @return {object} An object representing the item with the specified id
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
    * @method
    * @description Returns an notification item object by looking for the localized header
    * @param {string} localizedName The localized name (header) of the dialog
    * @return {object} An object representing the item with the specified header text
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
     * @method
     * @description Initializes the class.
    */     
    self.init = function(){
        var lastModalDialog = null;
        var closeModal = false;
        
        // Create an override using the jQuery proxy pattern for the relevant "typewrite" method
        (function() {
            var proxied = $.fn.typewrite;
            $.fn.typewrite = function(b) {
                if(typeWriterDelay.mode=='factor'){
                    b.delay *= typeWriterDelay.value;
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
})(UltimateLib.Notifications || {});/**
 * @class PopupMenu
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
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
            // Scroll to top div
//            UltimateLib.Elements.Body.animate({
//                scrollTop: $('#top').offset().top
//            }, 2000);
            
           
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
/**
 * @class Publishers
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This is an API for adding Publishers to the game.
 * @fileOverview This is an API for adding Publishers to the game.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Publishers = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loading...");

    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
    	
    	// Zero Contract Stores
    	var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames = [];
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");
        
    };
    
    
    /**
     * @description Adds publisher name to array
     * @param {publisher id/name object}
     * @private
    */  
    self.addPublisherName = function(name){
 		var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames.push(name);
    	
    };
    
    
    /**
     * @description Adds publisher contracts.
     * @private
     * @return {publisher object array}
    */  
	function hijackgetAvailable () {
		var keep = ProjectContracts.getAvailable;
		ProjectContracts.getAvailable  = function(company, type){
			var contracts = keep(company, type);
			if (type == "gameContract"){publishers.addRange(UltimateLib.Publisher.collection()); UltimateLib.Logger.log("Publisher Collection Added");}
			return contracts;				
		};
	};
	
	
	
	/**
     * @description Returns all custom contracts.
     * @public
     * @param {GDT company object}
     * @return {contract object array}
    */  
	self.collection = function () {
		var getstore = GDT.getDataStore("UltimateLib").settings;
		return getstore.publisherNames;
	};
	
	
    	
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loaded :-)");
        
    return self;
})(UltimateLib.Publishers || {});/**
 * @class Research
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This is an API for adding differnt types of research to the game.
 * @fileOverview This is an API for adding differnt types of research to the game.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Research = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Research loading...");

    /**
     * @description Initializes the module.
     * @public
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Research init ran.");
    };
    
	/**
     * @description Adds a special/oneoff research.
     * @public
     * @param {special research object}
    */    
    /* Special Research Format
		{
			id: "UniqueID",
			name: "Research Name".localize(),
			pointsCost: 100, //Number of research points
			duration: 3E4, //Time taken to research
			cost: 50E4, //Cost of the research (cash)
			canResearch: function (company) {
				return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
			},
			category: "Debugging", //Category for classing your research. Can be a new category.
			categoryDisplayName: "Debugging".localize(), //Name shown for the Category
			complete: function () {
				//Stuff that happens when the research completes.
			}
		};
	*/
	self.addSpecial = function (research) {
		
		if (!specialCheck(research)) {
			UltimateLib.Logger.log("Special Research Failed Compatiblity Check. " + research);
			return; 
		};
		Research.SpecialItems.push(research);
		UltimateLib.Logger.log("Special Research Added");
	};
	
	/**
     * @description Adds a special/oneoff research.
     * @private
     * @param {special research object}
     * @return {bool} Pass or Fail the check
    */  
	function specialCheck(research){
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'duration', 'cost','category','categoryDisplayName']) 
		   && Checks.checkUniqueness(research, 'id', Research.getAllItems()))) {
		   	return false;
		};
		return true;	
	};
	
	
	/**
     * @description Adds a big/lab research.
     * @public
     * @param {big research object}
    */  
    /* Lab Research Format
		{
			id: "UniqueID",
			name: "Research Name".localize(),
			pointsCost: 1000, //Research cost, this is gathered over time and the speed is controlled by the lab budget. 
			canResearch: function (company) {
				return (a.staff.length == 3); //Returns a boolean value. Perform flag checks here.
			},
			iconUri: "./mods/YourMod/images/yourImage.png", //Path to icon for your research.
			description: "Description of your research.".localize(),
			targetZone: 2, //Unconfirmed what the hell this does. Poke it and see.
			complete: function () {
				//Stuff that happens when the research completes.
			}
		};
	*/  
	self.addLab = function (research) {
		if (!labCheck(research)) {
			UltimateLib.Logger.log("Lab Research Failed Compatiblity Check. " + research);
			return; 
		};
		Research.bigProjects.push(research);	
		UltimateLib.Logger.log("Lab Research Added");
	};

	/**
     * @description Adds a lab research.
     * @private
     * @param {lab research object}
     * @return {bool} Pass or Fail the check
    */ 
	function labCheck(research){
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'iconUri', 'description']) 
		   && Checks.checkUniqueness(research, 'id', Research.getAllItems()))) {
		   	return false;
		};
		return true;
		
	};

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Research loaded :-)");
        
    return self;
})(UltimateLib.Research || {});/**
 * @class Storage
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description This is a custom storage class for the UltimateLib. It uses the jstorage.js by © 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
 *               jStorage is licensed under Unlicense, so basically you can do whatever you want to do with it.
 * @fileOverview This is a custom storage class for the UltimateLib. It uses the jstorage.js by © 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
 *               jStorage is licensed under Unlicense, so basically you can do whatever you want to do with it.
 * @constructor
 * @param {object} self An object representing the class itself for extending
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
})(UltimateLib.Storage || {});/**
 * @class Utils
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.0
 * @description Utility library with useful functions for your code.
 * @fileOverview Utility library with useful functions for your code.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Utils = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loading...");

        /**
         * @public
         * @function getFormattedNumber
         * @description Returns a formatted numbers in the scientific format 124E5
         * @param {int} num The number to format
         * @returns A scientifical formatted value
        */    
        self.getFormattedNumber = function (num) {
			var s = num.toString().replace(",", ".");
			var n = "";

			if (s.indexOf(".") >= 0) {
				var i = s.substring(0, s.lastIndexOf("."));
				var l = i.length - 1;
				if (l > 0) {
					n = s.substring(0, 1) + "E" + l;
				} else {

					n = s;
				}
			} else {
				var l = s.length - 1;
				if (l > 0) {
					n = s.substring(0, 1) + "E" + l;
				} else {
					n = s;
				}
			}

			return n;
		};

        /**
         * @public
         * @function wait4
         * @description Waits for the specified "what" variable/object to be defined an "ms" amount of time (in milliseconds) and if set, assigns the "val" value to it
         * @param {any} what The target variable/object to check and wait for
         * @param {any} val A value to assign when @see what  
         * @param {int} ms Interval time in milliseconds when to repeat check
        */           
        self.wait4 = function (what, val, ms){
            if(typeof what !== "undefined"){
                // variable exists, do what you want
                UltimateLib.Logger.log("Done waiting!");
                what = val;
            }
            else{
                UltimateLib.Logger.log("I wait4 " + ms + " ms...");
                setTimeout(function(){wait();},ms);
            }
        }

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loaded :-)");
        
    return self;
})(UltimateLib.Utils || {});/**
 * @class VisualTweaks
 * @namespace UltimateLib
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This is a library that provides and API for tweaking visual elements within the game.
 * @fileOverview This is a library that provides and API for tweaking visual elements within the game.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
/*
Slider Wrapper
width: 195px;
height: 320px;

UltimateLib.VisualTweaks.setWatermarks

*/
UltimateLib.VisualTweaks = (function(self) {    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.VisualTweaks loading...");
    var store = GDT.getDataStore("UltimateLib");//function () { return GDT.getDataStore("UltimateLib"); };
    
    /**
     * @description Sets up the style tags for the rest of the module.
     * @public
    */
    
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.VisualTweaks init ran.");
        $('head').append('<style id="visualTweaks" type="text/css"></style>');
        UltimateLib.Storage.write('SliderBG', {

            engine: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            gameplay: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            story: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            dialogs: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            level: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            ai: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            graphic: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            sound: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            world: ".\/mods\/UltimateLib\/img\/defaultsbg.gif",
            cssset: false,
            watermarkset: false
        });
    };
    

    self.setAllTweaks = function (style) {

        self.setRoundedWindows();
        self.setScrollBar();
        self.setRoundedButtons();
        self.setRoundedBars();
        self.setTextBox();
        self.setFancyGrads();

    };


    /**
     * @description Give windows rounded edges.
     * @public
     * @param {radius} Rounded edge radius on the window.
    */ 
    self.setRoundedWindows = function(radius){
        if (store.settings.roundedCorners === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedWindows = false."); return; };
        if (!(radius >= 0)) { radius = 15;}
        var tweak = $('#visualTweaks');
        tweak.append('.windowBorder, .rsSlide, .selectionOverlayContainer, .ul-vt-window, .tallWindow, .wideWindow, .ui-dialog  { border-radius: ' + radius + 'px !important; }');
        tweak.append('.notificationImageContainer, .featureStaffAsignPanel   { border-top-left-radius: ' + radius + 'px !important; border-bottom-left-radius: ' + radius + 'px !important; }'); //left
        tweak.append('.featureSelectionPanel   { border-top-right-radius: ' + radius + 'px !important; border-bottom-right-radius: ' + radius + 'px !important; }'); //right
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedWindows set."); 
    };
    
    /**
     * @description Adds a style to the overflow scrollbar
     * @public
     * @param {scrollbar style} 1 = default scrollbar styles
    */ 
    self.setScrollBar = function(style){
        if (store.settings.scrollBar === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.scrollBar = false."); return; };
        var tweak = $('#visualTweaks');
        switch (style){
            case 1:
                tweak.append ("::-webkit-scrollbar { width: 12px; }");
                tweak.append ("::-webkit-scrollbar-track-piece { width: 6px; }");
                tweak.append ("::-webkit-scrollbar-track { width: 12px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);  border-radius: 8px; }");
                tweak.append ("::-webkit-scrollbar-thumb { border-radius: 8px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);  background: radial-gradient(ellipse at center, rgba(250,198,149,1) 0%,rgba(245,171,102,1) 47%,rgba(239,141,49,1) 100%); }"); 
                UltimateLib.Logger.log("UltimateLib.VisualTweaks.setScrollBar 1 set."); 
                break;
            case 2:
                tweak.append ("::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); background-color: #F5F5F5; border-radius: 10px; }");
                tweak.append ("::-webkit-scrollbar { width: 10px; background-color: #F5F5F5; }");
                tweak.append ("::-webkit-scrollbar-thumb {border-radius: 10px; background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.44, rgb(122,153,217)), color-stop(0.72, rgb(73,125,189)), color-stop(0.86, rgb(28,58,148))); }");
                UltimateLib.Logger.log("UltimateLib.VisualTweaks.setScrollBar 2 set."); 
                break;    
            case 3:
                tweak.append ("::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); background-color: #F5F5F5; border-radius: 10px; }");
                tweak.append ("::-webkit-scrollbar { width: 10px; background-color: #F5F5F5; }");
                tweak.append ("::-webkit-scrollbar-thumb { background-color: #AAA; border-radius: 10px; background-image: -webkit-linear-gradient(90deg, rgba(0, 0, 0, .2) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .2) 75%, transparent 75%, transparent) }");   
                UltimateLib.Logger.log("UltimateLib.VisualTweaks.setScrollBar 3 set.");
                break;
            default: 
                tweak.append ("::-webkit-scrollbar { width: 12px; }");
                tweak.append ("::-webkit-scrollbar-track-piece { width: 6px; }");
                tweak.append ("::-webkit-scrollbar-track { width: 12px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);  border-radius: 8px; }");
                tweak.append ("::-webkit-scrollbar-thumb { border-radius: 8px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.4);  background: radial-gradient(ellipse at center, rgba(250,198,149,1) 0%,rgba(245,171,102,1) 47%,rgba(239,141,49,1) 100%); }"); 
                UltimateLib.Logger.log("UltimateLib.VisualTweaks.setScrollBar default set."); 
                break;
        }
    };
    
    /**
     * @description Gives buttons a rounded edge.
     * @public
     * @param {radius} Rounded edge radius on the button.
    */ 
    self.setRoundedButtons = function (radius) {
        if (store.settings.roundedButtons === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.roundedButtons = false."); return; };
        if (!(radius >= 0)) { radius = 10;}
        var tweak = $('#visualTweaks');
        tweak.append ('.orangeButton, .deleteButton, .whiteButton, .selectorButton, .baseButton, .contextMenuButton, .ul-vt-button { border-radius: ' + radius + 'px; }');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedButtons set."); 
    };
    
    /**
     * @description Gives "bars" a rounded edge.
     * @public
     * @param {radius} Rounded edge radius on the bar.
    */ 
    self.setRoundedBars = function (radius){
        if (store.settings.roundedBars === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedBars = false."); return; };
        if (!(radius >= 0)) { radius = 8;}
        var tweak = $('#visualTweaks');
        tweak.append('.featureProgressContainer, .staffDTBarContainer, .rsNavItem, .rsThumb, .projectStatusCard, .selectableGameFeatureItem, .ul-vt-bar { border-radius: ' + radius + 'px; }');
        tweak.append('.featurePreview1, .featureProgress, .ul-vt-bar-left { border-top-left-radius: ' + radius + 'px; border-bottom-left-radius: ' + radius + 'px }');
        tweak.append('.featurePreview3, .featureProgressGain, .ul-vt-bar-right { border-top-right-radius: ' + radius + 'px; border-bottom-right-radius: ' + radius + 'px }');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedBars set."); 
    };

    /**
     * @description Gives text boxes a rounded edge.
     * @public
     * @param {radius} Rounded edge radius on textboxes.
    */ 
    self.setTextBox = function (radius){
        if (store.settings.textBox === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.setTextBox = false."); return; };
        if (!(radius >= 0)) { radius = 8;}
        var tweak = $('#visualTweaks');
        tweak.append('#gameTitle, .featureSelectionCategoryHeading, .loadSaveButton, .cashLogContainer, .ul-vt-textbox { border-radius: ' + radius + 'px; }');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setTextBox set."); 
    };

    self.setFancyGrads = function (style) {
        if (store.settings.fancyGrads === false) { UltimateLib.Logger.log("UltimateLib.VisualTweaks.setFancyGrads = false."); return; };
        var tweak = $('#visualTweaks');

        switch (style){
            case 1:
                tweak.append('.feature1 .ui-slider-range, .featurePreview1 { background: linear-gradient(to bottom,  #a90329 0%,#8f0222 44%,#6d0019 100%); }');
                tweak.append('.feature2 .ui-slider-range, .featurePreview2 { background: linear-gradient(to bottom, #c9de96 0%,#8ab66b 57%,#398235 100%); }');
                tweak.append('.feature3 .ui-slider-range, .featurePreview3 { background: linear-gradient(to bottom, rgba(107,178,196,1) 0%,rgba(35,83,138,1) 100%); }');
                break;
            default:
                tweak.append('.feature1 .ui-slider-range, .featurePreview1 { background: linear-gradient(to bottom,  #a90329 0%,#8f0222 44%,#6d0019 100%); }');
                tweak.append('.feature2 .ui-slider-range, .featurePreview2 { background: linear-gradient(to bottom, #c9de96 0%,#8ab66b 57%,#398235 100%); }');
                tweak.append('.feature3 .ui-slider-range, .featurePreview3 { background: linear-gradient(to bottom, rgba(107,178,196,1) 0%,rgba(35,83,138,1) 100%); }');
                break;
        }

        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setFancyGrads set.");
    };
    
    self.setWatermarks = function (object, url) {
        var tweak = $('#visualTweaks');
        var urlstore = UltimateLib.Storage.read('SliderBG');
        switch (object) {
            case "slider-all-img":
                $('#selectFeatureMenuTemplate').find('.focusSliderWrapper').prepend('<img id="allsliderimg" class="ul-vt-slider-img" src="' + url + '"/>');
                break;
            case "slider-engine-img":
                urlstore.engine = url;
                break;
            case "slider-gameplay-img":
                urlstore.gameplay = url;
                break;
            case "slider-story-img":
                urlstore.story = url;
                break;
            case "slider-dialogs-img":
                urlstore.dialogs = url;
                break;
            case "slider-level-img":
                urlstore.level = url;
                break;
            case "slider-ai-img":
                urlstore.ai = url;
                break;
            case "slider-world-img":
                urlstore.world = url;
                break;
            case "slider-graphic-img":
                urlstore.graphic = url;
                break;
            case "slider-sound-img":
                urlstore.sound = url;
                break;
            case "slider-1":
                tweak.append('#selectFeatureMenuTemplate .focusSliderWrapper .feature1 { background-image: url("' + url + '"); }')
                break;
            case "slider-2":
                tweak.append('#selectFeatureMenuTemplate .focusSliderWrapper .feature2 { background-image: url("' + url + '"); }')
                break;
            case "slider-3":
                tweak.append('#selectFeatureMenuTemplate .focusSliderWrapper .feature3 { background-image: url("' + url + '"); }')
                break;
            case "development":
                $('#resources').find('#selectFeatureMenuTemplate').prepend('<div id="development"></div>');
                tweak.append('#development { background-image: url("' + url + '"); ' +
                    'background-size:100% 100%; width:95%; height:95%; position:absolute; opacity:0.4;-webkit-filter: blur(7px);'+
                    '}')
                break;
            case "development-1":
                tweak.append('#selectFeatureMenuTemplate .focusSliderWrapper .feature1 { background-image: url("' + url + '"); }')
                break;
            case "development-2":
                tweak.append('#selectFeatureMenuTemplate .focusSliderWrapper .feature1 { background-image: url("' + url + '"); }')
                break;
            case "development-3":
                tweak.append('#selectFeatureMenuTemplate .focusSliderWrapper .feature1 { background-image: url("' + url + '"); }')
                break;
            default:
                break;
        }
        if (urlstore.cssset === false) {
            
            tweak.append('.ul-vt-slider-img { width:80%; height:80%; border-width: 1px; border-style:solid; border-color:#828282; position:absolute; opacity:0.8; left: 17px; bottom: 70px; }');
            urlstore.cssset = true;
        }
        if (urlstore.watermarkset === false) {
            addWatermarkCallback();
            urlstore.watermarkset = true;
        }
    };
    var addWatermarkCallback = function () {
        var keepme = UI.showFeatureList;
        UI.showFeatureList = function (features, options) {
            var getstore = UltimateLib.Storage.read('SliderBG');
            var tweak = $('#visualTweaks');
            
            keepme(features, options)
            var menu1 = $('#selectFeatureMenu').find('.focusSliderWrapper.feature1');
            var menu2 = $('#selectFeatureMenu').find('.focusSliderWrapper.feature2');
            var menu3 = $('#selectFeatureMenu').find('.focusSliderWrapper.feature3');
            if (GameManager.getCurrentDevStage() == 1) {
                //Stage 1
                menu1.prepend('<img id="engine" class="ul-vt-slider-img" src="' + getstore.engine + '"/>');
                menu2.prepend('<img id="gameplay" class="ul-vt-slider-img" src="' + getstore.gameplay + '"/>');
                menu3.prepend('<img id="story" class="ul-vt-slider-img" src="' + getstore.story + '"/>');
            }
            if (GameManager.getCurrentDevStage() == 2) {
                //Stage 2 
                menu1.prepend('<img id="dialogs" class="ul-vt-slider-img" src="' + getstore.dialogs + '"/>');
                menu2.prepend('<img id="level" class="ul-vt-slider-img" src="' + getstore.level + '"/>');
                menu3.prepend('<img id="ai" class="ul-vt-slider-img" src="' + getstore.ai + '"/>');
            }
            if (GameManager.getCurrentDevStage() == 3) {    
                //Stage 3
                menu1.prepend('<img id="world" class="ul-vt-slider-img" src="' + getstore.world + '"/>');
                menu2.prepend('<img id="graphic" class="ul-vt-slider-img" src="' + getstore.graphic + '"/>');
                menu3.prepend('<img id="sound" class="ul-vt-slider-img" src="' + getstore.sound + '"/>');
            }
        }

    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.VisualTweaks loaded :-)");

    return self;
})(UltimateLib.VisualTweaks || {});