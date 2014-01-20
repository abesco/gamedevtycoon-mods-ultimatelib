 /**
 * @class Base
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.1.0
 * @description This is the UltimateLib base class that provides the basic namespace declaration.
 * @fileOverview This is the UltimateLib base class that provides the basic namespace declaration.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
var UltimateLib = (function(self) { 
    
    /**
     * @property {Array} js
     * @description An array that contains the js files associated to the complete UltimateLib libraries
     * @public
    */            
    self.js             = [];
      
    /**
     * @property {Array} libraries
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
                           {name:'Update', file:''},
                           {name:'Utils', file:''},
                           {name:'VisualTweaks', file:''}];

    /**
     * @property {Array} libraries3rd
     * @description An array that contains all the 3rd party files of UltimateLib
     * @public
    */            
    self.libraries3rd   = [{name:'base64', file:''}, {name:'underscore', file:''}, {name:'github', file:''}, {name:'foswig', file:''},{name:'jstorage', file:''}];

    /**
     * @method getFiles
     * @param {String} Section name
     * @description Returns all files found in the UltimateLib library section folders
     * @returns {array} An array that contains all files found in the UltimateLib library section folders
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
     * @method init
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
     * @method initDev
     * @description Called for global initialization after Base.init()
     * @public
     * @hide
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
     * @property {Object} mod
     * @description Returns the GDT package.json object representation of this mod
     * @public
    */                   
    self.mod;
    
    /**
     * @method getObjByName
     * @param {String} Name of the object to find 
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
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.0
 * @description Simple logger for the UltimateLib class. This class is used for simple console based logging purposes related to this package.
 * @fileOverview Simple logger for the UltimateLib class. This class is used for simple console based logging purposes related to this package.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Logger = (function(self) {
    /**
     * @private
     * @method formatDate 
     * @description Format a date to iso standard yyyy-mm-dd hh:mm:nn
     * @param {Date} dt Date object
     * @return A string containing a formatted representation of the date in the ISO format (yy-M-dd)
    */        
    function formatDate(dt){
        //Pad given value to the left with "0"
        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
        }   
        return [[AddZero(dt.getFullYear()), AddZero(dt.getMonth() + 1), dt.getDate()].join("-"), [AddZero(dt.getHours()), AddZero(dt.getMinutes()), AddZero(dt.getHours())].join(":")].join(" ");
    }
    
    /**
     * @property enabled 
     * @type Boolean
     * @default false
     * @description Enables / Disables logging
    */    
    self.enabled = false;
    
    /**
     * @method log
     * @description Outputs a message to console using a friendly output
     * @param {String} msg The message to output to console
     * @param {String} ex Optional argument to automatically log an exception
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
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.1.0
 * @description Core class providing the basic functionality for the UltimateLib.
 * @fileOverview Core class providing the basic functionality for the UltimateLib
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
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




// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

var Base64 = (function () {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var obj = {
        /**
         * Encodes a string in base64
         * @param {String} input The string to encode in base64.
         */
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
            } while (i < input.length);

            return output;
        },

        /**
         * Decodes a base64 string.
         * @param {String} input The string to decode.
         */
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            } while (i < input.length);

            return output;
        }
    };

    return obj;
})();
if (typeof exports !== 'undefined') {
    // Github = exports;
    module.exports = Base64;
} else {
    window.Base64 = Base64;
}

//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","  ":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);/**
 * @class Foswig
 * @author Glenn Conner
 * @version 1.0.0
 * @description Marchov Name Generation Algorithm https://github.com/mrsharpoblunto/foswig.js/blob/master/LICENSE 
 * @fileOverview https://github.com/mrsharpoblunto/foswig.js/blob/master/LICENSE 
 * @constructor
 * @param {object} self An object representing the class itself for extending
 * @hide
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
 * @hide
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
// Github.js 0.9.0
// (c) 2013 Michael Aufreiter, Development Seed
// Github.js is freely distributable under the MIT license.
// For all details and documentation:
// http://substance.io/michael/github

(function() {

  // Initial Setup
  // -------------

  var XMLHttpRequest, Base64, _;
  if (typeof exports !== 'undefined') {
      XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
      _ = require('underscore');
      Base64 = require('./lib/base64.js');
  }else{
      _ = window._;
      Base64 = window.Base64;
  }
  //prefer native XMLHttpRequest always
  if (typeof window !== 'undefined' && typeof window.XMLHttpRequest !== 'undefined'){
      XMLHttpRequest = window.XMLHttpRequest;
  }


  var API_URL = 'https://api.github.com';

  var Github = function(options) {

    // HTTP Request Abstraction
    // =======
    //
    // I'm not proud of this and neither should you be if you were responsible for the XMLHttpRequest spec.

    function _request(method, path, data, cb, raw, sync) {
      function getURL() {
        var url = path.indexOf('//') >= 0 ? path : API_URL + path;
        return url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
      }

      var xhr = new XMLHttpRequest();
      if (!raw) {xhr.dataType = "json";}

      xhr.open(method, getURL(), !sync);
      if (!sync) {
        xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status >= 200 && this.status < 300 || this.status === 304) {
              cb(null, raw ? this.responseText : this.responseText ? JSON.parse(this.responseText) : true, this);
            } else {
              cb({path: path, request: this, error: this.status});
            }
          }
        }
      };
      xhr.setRequestHeader('Accept','application/vnd.github.raw+json');
      xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
      if ((options.token) || (options.username && options.password)) {
           xhr.setRequestHeader('Authorization', options.token
             ? 'token '+ options.token
             : 'Basic ' + Base64.encode(options.username + ':' + options.password)
           );
         }
      data ? xhr.send(JSON.stringify(data)) : xhr.send();
      if (sync) return xhr.response;
    }

    function _requestAllPages(path, cb) {
      var results = [];
      (function iterate() {
        _request("GET", path, null, function(err, res, xhr) {
          if (err) {
            return cb(err);
          }

          results.push.apply(results, res);

          var links = (xhr.getResponseHeader('link') || '').split(/\s*,\s*/g),
              next = _.find(links, function(link) { return /rel="next"/.test(link); });

          if (next) {
            next = (/<(.*)>/.exec(next) || [])[1];
          }

          if (!next) {
            cb(err, results);
          } else {
            path = next;
            iterate();
          }
        });
      })();
    }



    // User API
    // =======

    Github.User = function() {
      this.repos = function(cb) {
        // Github does not always honor the 1000 limit so we want to iterate over the data set.
        _requestAllPages("/user/repos?type=all&per_page=1000&sort=updated", function(err, res) {
          cb(err, res);
        });
      };

      // List user organizations
      // -------

      this.orgs = function(cb) {
        _request("GET", "/user/orgs", null, function(err, res) {
          cb(err, res);
        });
      };

      // List authenticated user's gists
      // -------

      this.gists = function(cb) {
        _request("GET", "/gists", null, function(err, res) {
          cb(err,res);
        });
      };

      // List authenticated user's unread notifications
      // -------

      this.notifications = function(cb) {
        _request("GET", "/notifications", null, function(err, res) {
          cb(err,res);
        });
      };

      // Show user information
      // -------

      this.show = function(username, cb) {
        var command = username ? "/users/"+username : "/user";

        _request("GET", command, null, function(err, res) {
          cb(err, res);
        });
      };

      // List user repositories
      // -------

      this.userRepos = function(username, cb) {
        // Github does not always honor the 1000 limit so we want to iterate over the data set.
        _requestAllPages("/users/"+username+"/repos?type=all&per_page=1000&sort=updated", function(err, res) {
          cb(err, res);
        });
      };

      // List a user's gists
      // -------

      this.userGists = function(username, cb) {
        _request("GET", "/users/"+username+"/gists", null, function(err, res) {
          cb(err,res);
        });
      };

      // List organization repositories
      // -------

      this.orgRepos = function(orgname, cb) {
        // Github does not always honor the 1000 limit so we want to iterate over the data set.
        _requestAllPages("/orgs/"+orgname+"/repos?type=all&&page_num=1000&sort=updated&direction=desc", function(err, res) {
          cb(err, res);
        });
      };

      // Follow user
      // -------

      this.follow = function(username, cb) {
        _request("PUT", "/user/following/"+username, null, function(err, res) {
          cb(err, res);
        });
      };

      // Unfollow user
      // -------

      this.unfollow = function(username, cb) {
        _request("DELETE", "/user/following/"+username, null, function(err, res) {
          cb(err, res);
        });
      };
    };


    // Repository API
    // =======

    Github.Repository = function(options) {
      var repo = options.name;
      var user = options.user;

      var that = this;
      var repoPath = "/repos/" + user + "/" + repo;

      var currentTree = {
        "branch": null,
        "sha": null
      };

      // Uses the cache if branch has not been changed
      // -------

      function updateTree(branch, cb) {
        if (branch === currentTree.branch && currentTree.sha) return cb(null, currentTree.sha);
        that.getRef("heads/"+branch, function(err, sha) {
          currentTree.branch = branch;
          currentTree.sha = sha;
          cb(err, sha);
        });
      }

      // Get a particular reference
      // -------

      this.getRef = function(ref, cb) {
        _request("GET", repoPath + "/git/refs/" + ref, null, function(err, res) {
          if (err) return cb(err);
          cb(null, res.object.sha);
        });
      };

      // Create a new reference
      // --------
      //
      // {
      //   "ref": "refs/heads/my-new-branch-name",
      //   "sha": "827efc6d56897b048c772eb4087f854f46256132"
      // }

      this.createRef = function(options, cb) {
        _request("POST", repoPath + "/git/refs", options, cb);
      };

      // Delete a reference
      // --------
      //
      // repo.deleteRef('heads/gh-pages')
      // repo.deleteRef('tags/v1.0')

      this.deleteRef = function(ref, cb) {
        _request("DELETE", repoPath + "/git/refs/"+ref, options, cb);
      };

      // Create a repo  
      // -------

      this.createRepo = function(options, cb) {
        _request("POST", "/user/repos", options, cb);
      };

      // Delete a repo  
      // --------  

      this.deleteRepo = function(cb) {  
        _request("DELETE", repoPath, options, cb);  
      };

      // List all tags of a repository
      // -------

      this.listTags = function(cb) {
        _request("GET", repoPath + "/tags", null, function(err, tags) {
          if (err) return cb(err);
          cb(null, tags);
        });
      };

      // List all pull requests of a respository
      // -------

      this.listPulls = function(state, cb) {
        _request("GET", repoPath + "/pulls" + (state ? '?state=' + state : ''), null, function(err, pulls) {
          if (err) return cb(err);
          cb(null, pulls);
        });
      };

      // Gets details for a specific pull request
      // -------

      this.getPull = function(number, cb) {
        _request("GET", repoPath + "/pulls/" + number, null, function(err, pull) {
          if (err) return cb(err);
          cb(null, pull);
        });
      };

      // Retrieve the changes made between base and head
      // -------

      this.compare = function(base, head, cb) {
        _request("GET", repoPath + "/compare/" + base + "..." + head, null, function(err, diff) {
          if (err) return cb(err);
          cb(null, diff);
        });
      };

      // List all branches of a repository
      // -------

      this.listBranches = function(cb) {
        _request("GET", repoPath + "/git/refs/heads", null, function(err, heads) {
          if (err) return cb(err);
          cb(null, _.map(heads, function(head) { return _.last(head.ref.split('/')); }));
        });
      };

      // Retrieve the contents of a blob
      // -------

      this.getBlob = function(sha, cb) {
        _request("GET", repoPath + "/git/blobs/" + sha, null, cb, 'raw');
      };

      // For a given file path, get the corresponding sha (blob for files, tree for dirs)
      // -------

      this.getSha = function(branch, path, cb) {
        // Just use head if path is empty
        if (path === "") return that.getRef("heads/"+branch, cb);
        that.getTree(branch+"?recursive=true", function(err, tree) {
          if (err) return cb(err);
          var file = _.select(tree, function(file) {
            return file.path === path;
          })[0];
          cb(null, file ? file.sha : null);
        });
      };

      // Retrieve the tree a commit points to
      // -------

      this.getTree = function(tree, cb) {
        _request("GET", repoPath + "/git/trees/"+tree, null, function(err, res) {
          if (err) return cb(err);
          cb(null, res.tree);
        });
      };

      // Post a new blob object, getting a blob SHA back
      // -------

      this.postBlob = function(content, cb) {
        if (typeof(content) === "string") {
          content = {
            "content": content,
            "encoding": "utf-8"
          };
        }

        _request("POST", repoPath + "/git/blobs", content, function(err, res) {
          if (err) return cb(err);
          cb(null, res.sha);
        });
      };

      // Update an existing tree adding a new blob object getting a tree SHA back
      // -------

      this.updateTree = function(baseTree, path, blob, cb) {
        var data = {
          "base_tree": baseTree,
          "tree": [
            {
              "path": path,
              "mode": "100644",
              "type": "blob",
              "sha": blob
            }
          ]
        };
        _request("POST", repoPath + "/git/trees", data, function(err, res) {
          if (err) return cb(err);
          cb(null, res.sha);
        });
      };

      // Post a new tree object having a file path pointer replaced
      // with a new blob SHA getting a tree SHA back
      // -------

      this.postTree = function(tree, cb) {
        _request("POST", repoPath + "/git/trees", { "tree": tree }, function(err, res) {
          if (err) return cb(err);
          cb(null, res.sha);
        });
      };

      // Create a new commit object with the current commit SHA as the parent
      // and the new tree SHA, getting a commit SHA back
      // -------

      this.commit = function(parent, tree, message, cb) {
        var data = {
          "message": message,
          "author": {
            "name": options.username
          },
          "parents": [
            parent
          ],
          "tree": tree
        };

        _request("POST", repoPath + "/git/commits", data, function(err, res) {
          currentTree.sha = res.sha; // update latest commit
          if (err) return cb(err);
          cb(null, res.sha);
        });
      };

      // Update the reference of your head to point to the new commit SHA
      // -------

      this.updateHead = function(head, commit, cb) {
        _request("PATCH", repoPath + "/git/refs/heads/" + head, { "sha": commit }, function(err, res) {
          cb(err);
        });
      };

      // Show repository information
      // -------

      this.show = function(cb) {
        _request("GET", repoPath, null, cb);
      };

      // Get contents
      // --------

      this.contents = function(branch, path, cb, sync) {
        return _request("GET", repoPath + "/contents?ref=" + branch + (path ? "&path=" + path : ""), null, cb, 'raw', sync);
      };

      // Fork repository
      // -------

      this.fork = function(cb) {
        _request("POST", repoPath + "/forks", null, cb);
      };

      // Branch repository  
      // --------  
 
      this.branch = function(oldBranch,newBranch,cb) {
        if(arguments.length === 2 && typeof arguments[1] === "function") {
          cb = newBranch;
          newBranch = oldBranch;
          oldBranch = "master";
        }
        this.getRef("heads/" + oldBranch, function(err,ref) {
          if(err && cb) return cb(err);
          that.createRef({
            ref: "refs/heads/" + newBranch,
            sha: ref
          },cb);
        });
      }

      // Create pull request
      // --------

      this.createPullRequest = function(options, cb) {
        _request("POST", repoPath + "/pulls", options, cb);
      };

      // List hooks
      // --------

      this.listHooks = function(cb) {
        _request("GET", repoPath + "/hooks", null, cb);
      };

      // Get a hook
      // --------

      this.getHook = function(id, cb) {
        _request("GET", repoPath + "/hooks/" + id, null, cb);
      };

      // Create a hook
      // --------

      this.createHook = function(options, cb) {
        _request("POST", repoPath + "/hooks", options, cb);
      };

      // Edit a hook
      // --------

      this.editHook = function(id, options, cb) {
        _request("PATCH", repoPath + "/hooks/" + id, options, cb);
      };

      // Delete a hook
      // --------

      this.deleteHook = function(id, cb) {
        _request("DELETE", repoPath + "/hooks/" + id, null, cb);
      };

      // Read file at given path
      // -------

      this.read = function(branch, path, cb) {
        that.getSha(branch, path, function(err, sha) {
          if (!sha) return cb("not found", null);
          that.getBlob(sha, function(err, content) {
            cb(err, content, sha);
          });
        });
      };

      // Remove a file from the tree
      // -------

      this.remove = function(branch, path, cb) {
        updateTree(branch, function(err, latestCommit) {
          that.getTree(latestCommit+"?recursive=true", function(err, tree) {
            // Update Tree
            var newTree = _.reject(tree, function(ref) { return ref.path === path; });
            _.each(newTree, function(ref) {
              if (ref.type === "tree") delete ref.sha;
            });

            that.postTree(newTree, function(err, rootTree) {
              that.commit(latestCommit, rootTree, 'Deleted '+path , function(err, commit) {
                that.updateHead(branch, commit, function(err) {
                  cb(err);
                });
              });
            });
          });
        });
      };

      // Move a file to a new location
      // -------

      this.move = function(branch, path, newPath, cb) {
        updateTree(branch, function(err, latestCommit) {
          that.getTree(latestCommit+"?recursive=true", function(err, tree) {
            // Update Tree
            _.each(tree, function(ref) {
              if (ref.path === path) ref.path = newPath;
              if (ref.type === "tree") delete ref.sha;
            });

            that.postTree(tree, function(err, rootTree) {
              that.commit(latestCommit, rootTree, 'Deleted '+path , function(err, commit) {
                that.updateHead(branch, commit, function(err) {
                  cb(err);
                });
              });
            });
          });
        });
      };

      // Write file contents to a given branch and path
      // -------

      this.write = function(branch, path, content, message, cb) {
        updateTree(branch, function(err, latestCommit) {
          if (err) return cb(err);
          that.postBlob(content, function(err, blob) {
            if (err) return cb(err);
            that.updateTree(latestCommit, path, blob, function(err, tree) {
              if (err) return cb(err);
              that.commit(latestCommit, tree, message, function(err, commit) {
                if (err) return cb(err);
                that.updateHead(branch, commit, cb);
              });
            });
          });
        });
      };

      // List commits on a repository. Takes an object of optional paramaters:
      // sha: SHA or branch to start listing commits from
      // path: Only commits containing this file path will be returned
      // since: ISO 8601 date - only commits after this date will be returned
      // until: ISO 8601 date - only commits before this date will be returned
      // -------

      this.getCommits = function(options, cb) {
          options = options || {};
          var url = repoPath + "/commits";
          var params = [];
          if (options.sha) {
              params.push("sha=" + encodeURIComponent(options.sha));
          }
          if (options.path) {
              params.push("path=" + encodeURIComponent(options.path));
          }
          if (options.since) {
              var since = options.since;
              if (since.constructor === Date) {
                  since = since.toISOString();
              }
              params.push("since=" + encodeURIComponent(since));
          }
          if (options.until) {
              var until = options.until;
              if (until.constructor === Date) {
                  until = until.toISOString();
              }
              params.push("until=" + encodeURIComponent(until));
          }
          if (params.length > 0) {
              url += "?" + params.join("&");
          }
          _request("GET", url, null, cb);
      };
    };

    // Gists API
    // =======

    Github.Gist = function(options) {
      var id = options.id;
      var gistPath = "/gists/"+id;

      // Read the gist
      // --------

      this.read = function(cb) {
        _request("GET", gistPath, null, function(err, gist) {
          cb(err, gist);
        });
      };

      // Create the gist
      // --------
      // {
      //  "description": "the description for this gist",
      //    "public": true,
      //    "files": {
      //      "file1.txt": {
      //        "content": "String file contents"
      //      }
      //    }
      // }

      this.create = function(options, cb){
        _request("POST","/gists", options, cb);
      };

      // Delete the gist
      // --------

      this.delete = function(cb) {
        _request("DELETE", gistPath, null, function(err,res) {
          cb(err,res);
        });
      };

      // Fork a gist
      // --------

      this.fork = function(cb) {
        _request("POST", gistPath+"/fork", null, function(err,res) {
          cb(err,res);
        });
      };

      // Update a gist with the new stuff
      // --------

      this.update = function(options, cb) {
        _request("PATCH", gistPath, options, function(err,res) {
          cb(err,res);
        });
      };

      // Star a gist
      // --------

      this.star = function(cb) {
        _request("PUT", gistPath+"/star", null, function(err,res) {
          cb(err,res);
        });
      };

      // Untar a gist
      // --------

      this.unstar = function(cb) {
        _request("DELETE", gistPath+"/star", null, function(err,res) {
          cb(err,res);
        });
      };

      // Check if a gist is starred
      // --------

      this.isStarred = function(cb) {
        _request("GET", gistPath+"/star", null, function(err,res) {
          cb(err,res);
        });
      };
    };

    // Issues API
    // ==========

    Github.Issue = function(options) {
      var path = "/repos/" + options.user + "/" + options.repo + "/issues";

      this.list = function(options, cb) {
        _request("GET", path, options, function(err, res) {
          cb(err,res)
        });
      };
    };

    // Top Level API
    // -------

    this.getIssues = function(user, repo) {
      return new Github.Issue({user: user, repo: repo});
    };

    this.getRepo = function(user, repo) {
      return new Github.Repository({user: user, name: repo});
    };

    this.getUser = function() {
      return new Github.User();
    };

    this.getGist = function(id) {
      return new Github.Gist({id: id});
    };
  };


  if (typeof exports !== 'undefined') {
    // Github = exports;
    module.exports = Github;
  } else {
    window.Github = Github;
  }
}).call(this);/**
 * @class Configuration
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 1.1.0
 * @description Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
 * @fileOverview Configuration is an UltimateLib library class providing capabilities to manipulate the in-game settings UI.
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
            tabs.tabs( 'select', 0);
            
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
        $('head').append('<style id="ul-config-adv-overflow" type="text/css">#newGameView .featureSelectionPanel { overflow-x: none; overflow-y: auto; }</style>');

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
})(UltimateLib.Configuration || {});/**
 * @class Contracts
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This API provides functionality for adding contracts to the game.
 * @fileOverview This API provides functionality for adding contracts to the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 * @example
 
        UltimateLib Contract Format
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

        Real Contract Format
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
        }
 */ 
UltimateLib.Contracts = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Contracts loading...");

    /**
     * @method init 
     * @description Initializes the module.
    */ 
    self.init = function(){
    	/*
    	// Zero Contract Stores
    	var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.largeContracts = [];
        getstore.mediumContracts = [];
        getstore.smallContracts = [];
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");
        */
    };
    
	/**
     * @method addContract
     * @description Adds a custom contract.
     * @param {Object} contract An object that has the specification shown in the example box (UltimateLib Contract Format)
     * @example
	UltimateLib Contract Format
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
     * @private
     * @method contractCheck
     * @description Checks the contract for errors.
     * @param {Object} contract An object that has the specification shown in the example box (UltimateLib Contract Format)
     * @return {Boolean} Pass or Fail the check
     * @example
    UltimateLib Contract Format
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
    */
	function contractCheck(contract){
		if (!(Checks.checkPropertiesPresent(contract, ['name', 'description', 'requiredD', 'requiredT', 'payment','penalty','weeksToFinish','rF','size']) 
		   )) {
		   	return false;
		};
		return true;	
	};
		
	/**
     * @private
     * @method formatContract
     * @description Formats the contract object to full contract object
     * @param {Object} contract An object that has the UltimateLib Contract Format specification
     * @return {Object} An object that has the specification shown in the example box (Real Contract Format)
     * @example 
     Real Contract Format
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
		}
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
     * @private
     * @method hijackgetAvailable
     * @description Gets available contracts.
     * @return {Object} An array containig object items with the UltimateLib Contract Format specification
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
     * @method collection
     * @description A collection of all pertinent contracts.
     * @param {GDT.company} company The GDT company object
     * @return {Array} An array of objects containing UltimateLib Contract Format items.
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
})(UltimateLib.Contracts || {}); /**
 * @class Dialog
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
 * @fileOverview Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 */ 
 
 UltimateLib.Dialog = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loading...");
    
    /**
     * @method createButton
     * @description Creates a dialog button and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog button. Additional element names will be automatically extended as required.  
     * @param {String} text Text (Title) of the button
     * @param {String|Integer} width The width of the button  (as integer or css string)
     * @param {String|Integer} height The height of the button  (as integer or css string)
     * @param {String} onclick A string indicating the callback function to call (i.e. UI.myCallBackOnUIClick)
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
     * @method createSection
     * @description Creates a dialog section and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog element. Additional element names will be automatically extended with "Section", "SectionTitle", etc.  
     * @param {String} text Text (Title) of the section label
     * @param {Array} buttons An array of buttons to show in the dialog section (use createButton to create each button)  
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
     * @method createDialog
     * @description Creates a dialog and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog element. Additional element names will be automatically extended with "Modal", "Container", etc.  
     * @param {String} text Text (Title) of the dialog
     * @param {Array} sections An array of sections to show on the dialog (use createSection to create each section)  
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
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.0
 * @description Elements provides quick access to some important dom elements. 
 * @fileOverview Elements provides quick access to some important dom elements. 
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 
UltimateLib.Elements = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loading...");
    
    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Elements init ran.");
    };

    /**
     * @property Head
     * @type DOM
     * @default "$('head')"
     * @description The Head element of the document. This is the Head DOM Element wrapped in a jQuery element object.
    */         
    self.Head           = $('head');

    /**
     * @property Body
     * @type DOM
     * @default "$('body')"
     * @description The Body element of the document. This is the Body DOM Element wrapped in a jQuery element object.
    */         
    self.Body           = $('body');

    /**
     * @property SettingsPanel
     * @type DOM
     * @default "$('#settingsPanel')"
     * @description The Settings Panel element of the game. The Settings Panel DOM Element wrapped in a jQuery element object.
    */         
    self.SettingsPanel  = $('#settingsPanel');
      
    /**
     * @property GameContainerWrapper
     * @type DOM
     * @default "$('#gameContainerWrapper')"
     * @description The gameContainerWrapper. This is the gameContainerWrapper of the GDT document wrapped in a jQuery element object.
     */    
    self.GameContainerWrapper  = $('#gameContainerWrapper');
   
    /**
     * @property SimpleModalContainer
     * @type DOM
     * @default "$('#simplemodal-container')"
     * @description The simple modal container div. This is the simplemodal-container element of the GDT document wrapped in a jQuery element object.
      */      
    self.SimpleModalContainer  = $('#simplemodal-container');
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Elements loaded :-)");

    return self;
})(UltimateLib.Elements || {});
 /**
 * @class NameGenerator
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.2
 * @description NameGenerator provides different name generating providers for easy and variable generation of various name types.
 * @fileOverview NameGenerator provides different name generating providers for easy and variable generation of various name types. 
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
 
UltimateLib.NameGenerator = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.NameGenerator loading...");
    
    /*
     * @private
     * @property companyNamesData
     * @description Company name data object used for name generation. 
     * @type Object
     * @example
        companyNamesData format: 
        {
            adjectives:[], 
            nouns:[], 
            suffixes:[]
        }
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
                        "North", "South", "East", "West", 
                        "Late", "Early", "Never", "Always", "Midnight",
                        "Upper", "Lower", "Inner", "Outer",
                        "Rendered", "Rotten", "Fresh", "Altered", "Organic", "Sour",
                        "Coastal", "Chill", "Healing", "Damaged",
                        "Omatic", "PlayMaker", "GameMaker", "Makadam",
                        "Cradle", "Sim", "Makers of", "Rooster", "Animal",
                        "Squared", "Round", "Lined", "Cubed", "Triangled", "Sphered",
                        "Great", "Awesome", "Best", "Über", 
                        
                        ],
        nouns:  [
                         "Method", "Function", "Struct", "Class", "Library",
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
                         "Gem", "Diamond", "Ruby", "Pearl", "Sparkle",
                         "Crown", "Unitrends", "Highwall", "Tran",
                         "ColdLight", "Tableau","Mobile", "Tablet", "Processor", "Cooler",
                         "Geek", "Nerd", "Pro", 
                         "Redheart", "Blueheart", "Yellowheart", "Azureheart", "Pinkheart",
                         "Momentum", "Dicendum", "Morendum", "Addendum", "Lorendum",
                         "Mind", "Brain", "Idea", "Synapse","Neuron", "Neuronal",
                         "Monkey", "Gorilla", "Ape", "Orangutan",
                         "iPipeline", "iProcess", "iDevelop", "iBest", "iWok",
                         "Nitro", "Booster", "Turbo"
                         
                         
                ],
        suffixes:  [    "Collective", "United", "Studio", "Interactive", "Games", "Group",
                        "Team", "Community", "Alliance", "Company", "Direction", "Software", 
                        "Media", "Labs", "Ltd.", "Global", "Solutions", "Apps", "Technologies",
                        "Park", "Systems", "Logic", "Services", "Associates", "Consulting"
                   ]
    };
    
    /*
     * @private
     * @property companyNamesData
     * @description Company player name data object used for name generation. 
     * @type Object
     * @example
        companyNamesData format: 
        {
            male:{
                firstNames:[]
            },
            
            female:{
                firstNames:[]
            },
            
            lastNames:[]
        }
    */
    var playerNamesData = {
        male:{
                firstNames: [ 'Alessandro', 'Ali', 'Aaron', 'Abdul', 'Abe', 'Abraham', 'Adam', 'Alex', 'Alexander', 'Arnold', 'Austin', 
                              'Bill','Bas', 'Barry', 'Ben', 'Benton', 'Blair', 'Boris', 'Bobby', 'Bradley', 'Brain', 'Bruno', 'Buster', 
                              'Chad', 'Charles', 'Christian', 'Chico', 'Carl', 'Cedric', 'Carlton', 'Carlos', 'Chang', 'Claudio', 'Colin', 'Curtis',
                              'Daniel', 'Damian', 'Darrell', 'Dan', 'Davis', 'David', 'Dean', 'Dennis', 'Devin', 'Devon', 'Diego', 'Don', 'Dylan',
                              'Eugene', 'Earl', 'Edison', 'Edmondo', 'Edgar', 'Eddy', 'Ed', 'Elijah', 'Elliot', 'Edwin', 'Elvin', 'Elvis', 'Emanuel', 'Emilio', 'Evan',
                              'Francesco', 'Frank', 'Francis','Felipe', 'Felix', 'Floyd', 'Fletcher', 'Franklin', 'Fred', 'Frederick', 'Freeman', 'Fritz',
                              'Garry', 'Gastone', 'Gary', 'Gavin', 'Gino', 'Giovanni', 'Graham', 'Grant', 'Greg', 'Gregg', 'Gregory', 'Gus', 'Guy',
                              'Hank', 'Hal', 'Harold', 'Harris', 'Harrison', 'Herbert', 'Homer', 'Horace', 'Horacio', 'Hugo', 'Hunter', 'Hugh',
                              'Ivan', 'Igor', 'Ian', 'Ismael', 'Isaac', 'Isaiah', 'Irwin', 'Irving',
                              'John', 'Justin', 'Johann', 'Juan', 'Jake', 'Jasper', 'Jay', 'Jeff', 'Jefferson', 'Jeffrey', 'Jerome', 'Joan', 'Jonathan', 'Jose', 'Junior',
                              'Karim', 'Knut', 'Kasey', 'Kenneth', 'Ken', 'Kenny', 'Kermit', 'Kim', 'King', 'Kris', 'Kristofer',
                              'Loco', 'Lee', 'Long', 'Lino', 'Levi', 'Lou', 'Loyd', 'Lucas', 'Lorenzo', 'Lynn', 'Luther',
                              'Mohammed', 'Matthijs', 'Mike', 'Marc', 'Mark', 'Manfred', 'Marek', 'Marcellus', 'Mario', 'Marlon', 'Marlin', 'Merlin', 'Marshall', 'Michael', 'Miguel', 'Murray',
                              'Nigel', 'Nicolas', 'Noah', 'Nolan', 'Nick', 'Nicklas', 'Noel', 'Norris',
                              'Oscar', 'Oskar', 'Osvald', 'Omar', 'Oliver', 'Ollie', 'Otto', 'Owen', 'Orlando',
                              'Peter', 'Patrick', 'Pablo', 'Paul', 'Pedro', 'Philip', 'Phillip', 'Preston', 'Porter', 'Paolo', 'Pinto', 
                              'Quincy', 'Quinn', 'Quinton',
                              'Roland', 'Ronald', 'Robert',  'Rafael', 'Roger', 'Robin', 'Ralf', 'Ralph', 'Rufus', 'Renaldo', 'Ridge', 'Reuben', 'Rene', 
                              'Sam', 'Scott', 'Samuel', 'Seth', 'Seymour', 'Shaun', 'Shawn', 'Sergio', 'Sean', 'Saul', 'Scot', 'Scott', 'Sid', 'Spencer', 'Stefan', 'Stephan', 'Stuart', 'Steve',
                              'Tarkan', 'Ted', 'Tom', 'Todd', 'Tomas', 'Thomas', 'Tobias', 'Toby', 'Tommy', 'Ty', 'Tyron', 'Tyrese', 'Tyrell', 'Truman', 'Troy', 
                              'Van', 'Vance', 'Vernon', 'Vicente', 'Virgil', 'Vito',                               
                              'Will', 'Wayne', 'Wilbert', 'Walther', 'Walter', 'Weston', 'Wesley', 'Winfried', 'Woodrow', 'Winston',
                              'Xavier',                              
                              'Yuri', 'Yong', 'Young', 
                              'Zack', 'Zachery', 'Zane'
                                ]
        },
        female:{
                firstNames: [ 'Abbey', 'Abigail', 'Adela', 'Adaline','Adina', 'Ariel', 'Adriana', 'Aiko', 'Alana', 'Alberta', 'Alda', 'Alanis', 'Alannis', 'Alexa', 'Alice', 'Alisa', 'Amber', 'Anna', 'Angel', 'Annie', 'Ashley', 'Aurora', 
                              'Barbara', 'Bambi', 'Becky', 'Bee', 'Bea', 'Belinda', 'Beth', 'Betsy', 'Bertha', 'Bianca', 'Brandi', 'Brandie', 'Bobbi', 'Bonita', 'Bridget', 'Britt', 'Brittany', 'Buffy',
                              'Camelia', 'Carla', 'Caren', 'Candi', 'Candy', 'Candice', 'Caroline', 'Carol', 'Cary', 'Carry', 'Catherina', 'Cathy', 'Celia', 'Chanel', 'Chantal', 'Chang', 'Charlie', 'Cheryl', 'Christina', 'Chris', 'Crystal', 'Curtis',
                              'Dacia', 'Debby', 'Deborah', 'Daniela', 'Dany', 'Denice', 'Denise', 'Destiny', 'Dolly', 'Doria', 'Dori', 'Doreen', 
                              'Easter', 'Eda', 'Eleonora', 'Emy', 'Elia', 'Elena', 'Elsa', 'Ena', 'Etha', 'Eva', 'Exie', 
                              'Fae', 'Fay', 'Fawn', 'Felipa', 'Felicia', 'Felicitas', 'Flavia', 'Fiona', 'Francie', 'Florence', 'Frida',
                              'Gabrielle', 'Galina', 'Gary', 'Gina', 'Gerri', 'Gia', 'Gloria', 'Glory', 'Goldie', 'Grace', 'Gwyn',
                              'Hannah', 'Ha', 'Hazel', 'Heather', 'Heidi', 'Hilary', 'Holly', 'Hyo', 'Hyun', 'Hui',
                              'Ida', 'Ina', 'Inge', 'Inga', 'Ingrid', 'Ines',  'Irene', 'Iris', 'Isabel', 'Iva', 'Ivy', 'Ivory',
                              'Jackelyn', 'Jaqueline', 'Jada', 'Jane', 'Joanna', 'Joel', 'Jeanette', 'Jeanice', 'Jenni', 'Jennifer', 'Jessie', 'Jessy', 'Jessica', 'Jolanda', 'Judie', 'Judith', 'Juliette', 'Julia', 
                              'Ka', 'Kacey', 'Kandi', 'Kandice', 'Karen', 'Karolyn', 'Karol', 'Karrie', 'Kate', 'Katja', 'Keira', 'Kesha', 'Kia', 'Kimberly', 'Kirstin', 'Kimber', 'Kris', 'Klara', 'Krystal', 'Kyle', 'Kylee', 'Kym',
                              'Lacey', 'Laine', 'Laila', 'Lane', 'Lang', 'Larue', 'Latricia', 'Latina', 'Laura', 'Laureen', 'Lavina', 'Lea', 'Leah', 'Lela', 'Lenni', 'Lia', 'Lina', 'Linda', 'Lindsay', 'Loan', 'Lola', 'Lorrie', 'Love', 'Lydia',
                              'Ma', 'Mable', 'Macy', 'Madeleine', 'Maggie', 'Maureen', 'Marie', 'Mary', 'Maria', 'Manuela', 'Margaret', 'Meg', 'Meredith', 'Melody', 'Mia', 'Michaela', 'Millie', 'Melissa', 'Molly', 
                              'Nadine', 'Nada', 'Naomi', 'Noemi', 'Nancy', 'Ngan', 'Nia', 'Nicole', 'Nikki', 'Nola', 'Nu',
                              'Ola', 'Olga', 'Olivia', 'Ora',
                              'Paige', 'Pamela', 'Patricia', 'Peggie', 'Penny', 'Pia', 'Prudence',
                              'Queen', 'Qiana',
                              'Rae', 'Ramona', 'Randee', 'Reagan', 'Ragina', 'Rebecca', 'Rhonda', 'Ricki', 'Robin', 'Rosalba', 'Rose', 'Rosa', 'Roxie', 'Roxanne', 'Ruby', 'Ruth',
                              'Sabine', 'Sabrina', 'Sandy', 'Sandra', 'Sally', 'Sandra', 'Sarah', 'Serena', 'Shakira', 'Shanta', 'Sheryl', 'Shirley', 'Silvya', 'Silvana', 'Sofia', 'Sophie', 'Stephanie', 'Summer', 'Sue', 'Suzy',
                              'Tabeah', 'Tabatha', 'Thea', 'Tami', 'Tarah', 'Theresa', 'Tesha', 'Tia', 'Tiara', 'Trisha', 'Tracey', 'Tyra', 
                              'Ula', 'Ute', 'Ulrike', 
                              'Valerie', 'Valeria', 'Vanessa', 'Vanda', 'Verona', 'Veronique', 'Vickie', 'Victoria', 'Violett', 'Vivian', 'Vivienne',
                              'Wanda', 'Wonda', 'Willow', 'Wynona',
                              'Xamara', 'Xenia', 'Xiao',
                              'Yadira', 'Yang', 'Yasmin', 'Yi', 'Yolanda', 'Yukiko', 'Yuriko', 'Yuki', 'Yuonne',
                              'Zelda', 'Zenia', 'Zandra', 'Zora'
                              
                              
                            
                
                
                            ]
        },
        lastNames:  [ 
                        'Alas', 'Abair', 'Abate', 'Abell', 'Abeles', 'Aben', 'Abbattista', 'Abitz', 'Ablao', 'Abney', 'Abraham', 'Abrahams', 'Albrecht','Abramovich', 'Abrey', 'Abrew', 'Ace', 'Achs', 'Acon','Adas', 'Adelstein', 'Adham', 'Aggen',
                        'Agueros', 'Aguilar', 'Ahlborn', 'Ahl', 'Anders', 'Ahrendt', 'Airy', 'Ajmeri', 'Akashi', 'Akeo', 'Allen',
                        'Baab', 'Baah','Babe', 'Baban', 'Babich', 'Baca', 'Babinyks', 'Babson', 'Bacani', 'Babor', 'Bachinsky', 'Bachelor', 'Backfisch', 'Backhus', 'Bradley', 'Baglione', 'Bahns', 'Burns', 'Browe', 'Bruston', 
                        'Brailey', 'Baldwin', 'Bricks', 'Brausil', 'Brookes', 'Broken', 'Brick', 'Bricks', 'Bristol', 'Bentley', 'Bush', 'Books', 'Bunils',
                        'Chan', 'Caan', 'Cabato', 'Cassis', 'Cabal', 'Cada','Caden', 'Cagg', 'Cahen', 'Cohen', 'Cahill', 'Caires', 'Cail', 'Campsey', 'Charleston', 'Colpas', 'Can', 'Cannington', 'Caetil', 'Canterbury',
                        'Cap', 'Coasts', 'Coalson', 'Coates', 'Cocks', 'Cockrell', 'Codd', 'Cole', 'Coles', 'Corson', 'Cox', 'Carmack', 'Cross',
                        'Dallas', 'Dost', 'Dabek', 'Dabrowski', 'Dafoe', 'Dahlenburg', 'Dahl', 'Daniels', 'Danilson','Danial', 'Datz', 'Dauby', 'Decurtis', 'Ded', 'Dedio', 'Dellon', 'Dilan', 'Dillons', 'Dmitriev', 
                        'Doak', 'Dobin', 'Dominsky', 'Domon', 'Dors', 'Dorosz', 'Dorsa', 'Druhan', 'Drugs', 'Drose', 'Durham', 'Duirieux', 'Durette', 'Dyroff', 
                        'Eagler', 'Eam', 'Eames', 'Eakens', 'Eck', 'Ekels', 'Echt', 'Echler', 'Ehringer', 'Ehrle', 'Erhardt', 'Einstein', 'Ekholm', 'Enquist', 'Ek', 'Ekstrom', 'Elarton', 'Enneking', 'Enriquez',
                        'Emiliano', 'Ennis', 'Engine', 'Eschbach', 'Esswein', 'Esher', 'Eyers', 'Eyestone',
                        'Freeman', 'Faaborg', 'Fabi', 'Fattore', 'Faue', 'Fauber', 'Feltch', 'Felsman', 'Felz', 'Felson', 'Felser', 'Felux', 'Feuer', 'Fire', 'Fiddes', 'Fiddler', 'Fiedler', 'Fidell', 'Fleck', 
                        'Fleagle', 'Flavell', 'Floro', 'Florke', 'Flower', 'Flunder', 'Fluth', 'Fly',
                        'Gaal', 'Gaber', 'Gabelle', 'Garic', 'Garlick','Garland', 'Garlock', 'Garmon', 'Gimple', 'Gindi', 'Gim', 'Giltner', 'Gilster', 'Gleave', 'Gleiser', 'Glazer', 'Glynn', 'Gnade', 'Graham', 
                        'Granmlich', 'Grames', 'Gramberg', 'Garcia', 'Gonzales', 'Granada', 'Grett', 'Grey', 'Greyhound', 'Gravius', 'Guinn', 'Guth', 'Guzek',
                        'Howard', 'Hack', 'Haan', 'Haahr', 'Haagen', 'Hamrock', 'Hampshire', 'Hashi', 'Heacox', 'Headington', 'Hedge', 'Hefton', 'Hefler', 'Heggan', 'Hecnk', 'Hendler', 'Heinz', 'Hepker', 'Hepinstall', 
                        'Hentzel', 'Hermosa', 'Hernandez', 'Hermus', 'Hguyen', 'Hickel', 'Hilbert', 'Holter', 'Holthaus', 'Holtrey', 'House', 'Houton', 'Huffin', 'Hug', 'Huryn', 'Hurston',
                        'Iansen', 'Ianni', 'Iannini', 'Iames', 'Imel', 'Imbler', 'Infield', 'Ineson', 'Ingleheart', 'Ingraham', 'Ingles', 'Isler', 'Ita', 'Itterly', 'Izzo',
                        'Jones', 'Jacks', 'Jabs', 'Jamison', 'Johnsson', 'Jandrik', 'Jance', 'Jancek','Jamros', 'Jefferson', 'Jemal', 'Jelleron', 'Jewison', 'Jewitt', 'Jew', 'Jolly', 'Jonassen', 'Johanson', 
                        'Juco', 'Jue', 'Jung', 'Jungmeier', 'Junkert', 'Junez',
                        'Klug', 'Keating', 'Kerry', 'Kennedy', 'Kaahanui', 'Kabak', 'Kaat', 'Kadric', 'Kaehr', 'Kallenberg', 'Kalosky', 'Kowalski', 'Kallmeyer', 'Kanagy', 'Kendric', 'Keagy', 'Keeney', 'Keem', 
                        'Keep', 'Keefover', 'Kessler', 'Ketelaar', 'Kilcup', 'Kilgus', 'Kile', 'Klein', 'Kleinow', 'Klopp', 'Kloman', 'Klosek', 'Knife', 'Knisley', 'Knill', 'Kotarksi', 'Kothe', 'Kruss',
                        'Lee', 'Laboe', 'Laborn', 'Labit', 'Larew', 'Lardin', 'Larch', 'Large', 'Lawell', 'Leach', 'Lockley', 'Leafty', 'Leaming', 'Lemmings', 'Leagan', 'Lepping', 'Ler', 'Lhereux', 'Liam', 
                        'Lofthouse', 'Logdes', 'Locked', 'Lohans', 'Logan', 'Lua', 'Luber', 'Liberow', 'Lux',
                        'Morgan', 'Markos', 'McLoud', 'Miller', 'Mables', 'Maat', 'Maas', 'Marbles', 'Maestro', 'Magary', 'Magao', 'Malcot', 'Malinovski', 'Managhan', 'Manas', 'Mauser', 'McAbee',
                        'McIvory', 'McCroy', 'McCullar', 'McCuin', 'Malchin', 'McMananamon', 'Melan', 'Melder', 'Mullins', 'Moulder', 'Money', 'Mocarksi', 'Moates', 'Motts', 'Murty',
                        'Nabi', 'Nacci', 'Nabers', 'Neighbours', 'Neiner', 'Neihardt', 'Newling', 'Newitt', 'Newill', 'Newmark', 'Nicholson', 'Nickelsen', 'Nickey', 'Nichols', 'Nixon', 'Nivala', 'Northway', 
                        'Northern', 'North', 'Norse', 'Norvelle',
                        'Oaks', 'Oakley', 'Oertel', 'Oettel', 'Oetting', 'Ogg', 'Oggs', 'Ogles', 'Olejarz', 'Oldson', 'Oldridge', 'Oldman', 'Oldmixon', 'Ondrey', 'Onal', 'Onaka', 'Oms', 'Orlandi', 'Orlowski',
                        'Orlic', 'Otto', 'Ouelette', 'Ouchida', 'Ozoa',
                        'Peterson', 'Popovic', 'Paananen', 'Pabst', 'Paetzold', 'Paganucci', 'Pavarotti', 'Paeth', 'Payor', 'Paulson', 'Patterson', 'Peace', 'Peacemaker', 'Pearch', 'Pearl', 'Pearlstone', 
                        'Peebles', 'Peddy', 'Peers', 'Peerson', 'Pearson', 'Pernot', 'Perl', 'Petering', 'Poach', 'Poates', 'Picard', 'Piccolo', 'Picek', 'Pigg', 'Pegg', 'Piggot', 'Polster', 'Pritschett',
                        'Qi', 'Quade', 'Quebec', 'Quelle', 'Quong', 'Quiz', 'Quitoriano',
                        'Rosek', 'Raab', 'Rabenau', 'Rabourn', 'Rachor', 'Rackham', 'Radcliff', 'Ramirez', 'Ramler', 'randie', 'Randle', 'Randale', 'Razzo', 'Readling', 'Readman', 'Reilly', 'Reinberg', 
                        'Remington', 'Remos', 'Remster', 'Reynaurd', 'Rhee', 'Rhames', 'Ribble', 'Richards', 'Richardson', 'Roan', 'Roaks', 'Rob', 'Roaden', 'Roachford', 'Rollet', 'Ruff', 'Rugg', 'Rugen',
                        'Schlau', 'Sadler', 'Saed', 'Salzberg', 'Salvetti', 'Salveson', 'Sawdon', 'Saxby', 'Scanlin', 'Scanner', 'Scarbord', 'Schmidt', 'Schnaars', 'Scolari', 'Scramlin', 'Seabert', 'Seacrest',
                        'Seadler', 'Seidl', 'Settle', 'Seum', 'Shakles', 'Shacklock', 'Shadle', 'sharrock', 'Shatley', 'Shoe', 'Showmaker', 'Shy', 'Siciliani', 'Siddons', 'Slates', 'Stiffler', 'Slark', 'Small', 'Smeets',
                        'Solt', 'Solus', 'Sparks', 'Spalla', 'Spin', 'Spinnler', 'Spinoza', 'Springs', 'Springwater', 'Stack', 'Stade', 'Stecz', 'Steeger', 'Stedge', 'Stephenson', 'Stepp', 'Stickle', 'Stieg', 
                        'Stow', 'Stoye', 'Strock', 'Stunts', 'Styler', 'Sublette', 'Suchon', 'Suby', 'Swait', 'Swag', 'Swalley', 'Swick', 'Swetz', 'Szynal', 
                        'Tabas', 'Tabarez', 'Takvorian', 'Taratuta', 'Tarber', 'Tarbill', 'Tardiff', 'Tarkenton', 'Tardo', 'Taugher', 'Taubmann', 'Tee', 'Ted', 'Teufel', 'Tempel', 'Thai', 'Thang', 'Thaggard', 
                        'Thomasson', 'Thomson', 'Thompson', 'Thys', 'Thyberg', 'Tok', 'Townsend', 'Tozzo', 'Toxey', 'Trinity', 'Trines', 'Trucks',
                        'Uchida', 'Udd', 'Umbro', 'Umsted', 'Umbenhower', 'Unsicker', 'Unnerstall', 'Uth', 'Utter', 'Uzzle',
                        'Van der Wiel', 'Van Bonkrost', 'Van der Keen', 'Vaeth', 'Vagt', 'Vaughn', 'Vadell', 'Vanavery', 'Van Bemmel', 'Van Auken', 'Vazquez', 'Vayo', 'Viada', 'Vryhof', 'Vikings', 'Valdez',
                        'Wilders', 'Williams', 'Wacker', 'Walcott', 'Wilshire', 'Willis', 'Walsworth', 'Walters', 'Warney', 'Warrenberg', 'Woodfort', 'Woods', 'Winters', 'Wenners', 'Werner', 'Werbelow', 
                        'Wheatle', 'Wheller', 'Weelis', 'Wheels', 'Wheet', 'Weeds', 'Wheeler', 'Westinghouse', 'Westham', 'Wheaton', 'Whitmore', 'Whittaker', 'Whitting', 'Wice', 'Wichner', 'Winkey', 
                        'Winks', 'Winker', 'Wooden', 'Woodhull', 'Woodhill', 'Wyatt', 'Wust', 'Wyan', 'Wurz', 'Wydnick',
                        'Xander', 'Xu', 'Xuan', 'Xi', 'Xia', 'Xavier', 'Xue', 'Ximenez', 'Xenos', 'Xanthos',
                        'Young', 'Younes', 'Yabes', 'Yale', 'Yada', 'Yacob', 'Yamasaki', 'Yan', 'Yell', 'Yellows', 'Yelton', 'Yelland', 'Yonas', 'Yonko', 'Yu', 'Yule','Yvon',
                        'Zaback', 'Zaborski', 'Zaccharias', 'Zackery', 'Zadnik', 'Zanetti', 'Zenz', 'Zerbe','Zebra', 'Zhai', 'Zalas', 'Zhi', 'Zinninger', 'Zinzi', 'Zucchero', 'Zukic'
                       ]
    }
    
    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
    };
    
    /**
     * @method generateCompanyName
     * @description Returns an randomly generated company name
     * @return {String} A string containing a randomly generated company name.
    */     
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
    
    /**
     * @method generatePlayerName
     * @param {String} male True for a male name, false for a female name (yes, I'm a man, so I use MAN as unique var, that's emancipation ;))
     * @description Generates a random player name for the specified gender
     * @return {String} A string containing a randomly generated player name.
    */     
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
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.2
 * @description Notifications is an UltimateLib library class providing capabilities to manipulate the in-game settings notification system.
 * @fileOverview Notifications is an UltimateLib library class providing capabilities to manipulate the in-game settings notification system.
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
})(UltimateLib.Notifications || {});/**
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
 /**
 * @class Publishers
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description This API provides functionality for adding Publishers to the game
 * @fileOverview This API provides functionality for adding Publishers to the game
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 */ 
 
UltimateLib.Publishers = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loading...");

    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
    	/*
    	// Zero Contract Stores
    	var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames = [];
        
        // hijack ProjectContracts.getAvailable
        hijackgetAvailable();
        UltimateLib.Logger.log("UltimateLib.Contracts init ran.");
        */
    };
    
    /**
     * @method addPublisherName
     * @description Adds publisher name to array
     * @param {String} name Publisher id/name
    */  
    self.addPublisherName = function(name){
 		var getstore = GDT.getDataStore("UltimateLib").settings;
        getstore.publisherNames.push(name);
    };
    
    /**
     * @private
     * @method hijackgetAvailable
     * @description Gets available publishers.
     * @return {Object} An array containig object items with the UltimateLib Publisher Format specification
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
     * @method collection
     * @description Returns all custom contracts.
     * @return {Object} An array containig a list of publisher names
    */  
	self.collection = function () {
		var getstore = GDT.getDataStore("UltimateLib").settings;
		return getstore.publisherNames;
	};
    	
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Publishers loaded :-)");
        
    return self;
})(UltimateLib.Publishers || {}); /**
 * @class Research
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @version 1.0.1
 * @description This is an API for adding differnt types of research to the game.
 * @fileOverview This is an API for adding differnt types of research to the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 * @example
        Special Research Format
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
        
        Lab Research Format
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
 
UltimateLib.Research = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Research loading...");

    /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Research init ran.");
    };
    
	/**
     * @method addSpecial
     * @description Adds a special/oneoff research.
     * @param {Object} research An object of using the UltimateLib Special Research Format
     * @example
        Special Research Format
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
     * @private
     * @method specialCheck
     * @description Adds a special/oneoff research.
     * @return {Boolean} Pass or Fail the check
     * @param {Object} research An object of using the UltimateLib Special Research Format
     * @example
        Special Research Format
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
	function specialCheck(research){
		if (!(Checks.checkPropertiesPresent(research, ['id', 'name', 'pointsCost', 'duration', 'cost','category','categoryDisplayName']) 
		   && Checks.checkUniqueness(research, 'id', Research.getAllItems()))) {
		   	return false;
		};
		return true;	
	};
	
	/**
     * @method addLab
     * @description Adds a big/lab research.
     * @param {Object} research An object of using the UltimateLib Lab Research Format
     * @example
        Lab Research Format
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
     * @private
     * @method labCheck
     * @description Adds a lab research.
     * @param {Object} research An object of using the UltimateLib Lab Research Format
     * @return {Boolean} Pass or Fail the check
     * @example
        Lab Research Format
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
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 0.1.0b
 * @description 
    This is a custom storage class for the UltimateLib. It uses the jstorage.js by (c) 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
    jStorage is licensed under Unlicense, so basically you can do whatever you want to do with it.
 * @fileOverview This is a custom storage class for the UltimateLib. It uses the jstorage.js by (c) 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
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
})(UltimateLib.Storage || {});/**
 * @class Utils
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit) and Chad Keating (SirEverard)
 * @version 1.0.2
 * @description  Utility library with useful functions for your code.
 * @fileOverview Utility library with useful functions for your code.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Utils = (function(self) {
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loading...");
    
        /**
         * @private
         * @method sortAlpha
         * @description Comparer method for alphanumeric sorting
         * @param {String} a First string 
         * @param {String} b Second string
         * @return {Integer} 1 if a is greatr than b else -1.
        */      
        function sortAlpha(a, b) {
           return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
        };

        /**
         * @private
         * @method sortNum
         * @description Comparer method for numeric sorting
         * @param {Number} a First number
         * @param {Number} b Second number
         * @return {Integer} 1 if a is greatr than b else -1.
        */           
        function sortNum(a, b) {
           return a > b ? 1 : -1;
        };
       
        /**
         * @method getFormattedNumber
         * @description Returns a formatted numbers in the scientific format 124E5
         * @param {Integer} num The number to format
         * @return {Integer} A scientifical formatted value
        */    
        self.getFormattedNumber = function(num) {
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
         * @method wait4
         * @description Waits for the specified "what" variable/object to be defined an "ms" amount of time (in milliseconds) and if set, assigns the "val" value to it
         * @param {any} what The target variable/object to check and wait for
         * @param {any} val A value to assign when @see what  
         * @param {Integer} ms Interval time in milliseconds when to repeat check
        */           
        self.wait4 = function(what, val, ms){
            if(typeof what !== "undefined") {
                // variable exists, do what you want
                UltimateLib.Logger.log("Done waiting!");
                what = val;
            }
            else{
                UltimateLib.Logger.log("I wait4 " + ms + " ms...");
                setTimeout(function () { wait(); }, ms);
            }
        }
        
        /**
         * @method sort
         * @description Sorts the specified array using the desired type and sorting direction
         * @param {Array} array The array to sort
         * @param {String} typ A string indicating the type of sorting. alpha for alphanumeric or num for numeric.
         * @param {Boolean} asc True for sorting in ascending direction, false for descending direction.
         * @return {Array} The sorted input array.
        */           
       self.sort = function (array, typ, asc) {
           var sorted;
           if (typ == "alpha") {
               sorted = array.sort(sortAlpha);
           }
           if (typ == "num") {
               sorted = array.sort(sortNum);
           }
           if (asc === false) {
               sorted.reverse();
           }
           return sorted;
       };

        /**
         * @method compare
         * @description Compares the 1st value with the 2nd value using compare operators.
         * @param {String|Number} val1 A number or string to compare. 
         * @param {String|Number} val2 A number or string to compare. 
         * @param {String} op Compare operator. Allowed values are "=" for equals, "<" for less than and ">" for greater than.
         * @return {Boolean} True is comparison matched, false otherwise
        */          
       self.compare = function (val1, val2, op) {

           var newArr;
           newArr = true;

           if (op == "=" && val1 == val2) {
               newArr = true;
           } else { newArr = false; }

           if (op == "<" && val1 < val2) {
               newArr = true;
           } else { newArr = false; }

           if (op == ">" && val1 > val2) {
               newArr = true;
           } else { newArr = false; }

           return newArr;
       };

        /**
         * @method getIds
         * @description Returns an array containing the id field of an object that provides an id property.
         * @param {Array} arr The array containing objects providing an id property.
         * @return {Array} An array of ids
        */           
       self.getIds = function (arr) {

           var newArr;

           $.grep(arr, function (e, i) {
               newArr.push(e.id);
           });

           return newArr;
       }

        
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Utils loaded :-)");
        
    return self;
})(UltimateLib.Utils || {});/**
 * @class VisualTweaks
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Chad Keating (SirEverard)
 * @version 0.1.0b
 * @description  This is a library that provides and API for tweaking visual elements within the game.
 * @fileOverview This is a library that provides and API for tweaking visual elements within the game.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
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
     * @method init
     * @description Sets up the style tags for the rest of the module.
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
    
    /**
     * @method setAllTweaks
     * @description Enables all available tweaks. 
     * @param {String} style The style to apply **not yet implemented
    */   
    self.setAllTweaks = function (style) {

        self.setRoundedWindows();
        self.setScrollBar();
        self.setRoundedButtons();
        self.setRoundedBars();
        self.setTextBox();
        self.setFancyGrads();

    };


    /**
     * @method setRoundedWindows
     * @description Give windows rounded edges.
     * @param {Integer} radius Rounded edge radius on the window.
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
     * @method setScrollBar
     * @description Adds a style to the overflow scrollbar
     * @param {Integer} scrollbar style 1 = default scrollbar styles (available style: 1,2 and 3)
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
     * @method setRoundedButtons
     * @description Gives buttons a rounded edge.
     * @param {Integer} radius Rounded edge radius on the button.
    */ 
    self.setRoundedButtons = function (radius) {
        if (store.settings.roundedButtons === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.roundedButtons = false."); return; };
        if (!(radius >= 0)) { radius = 10;}
        var tweak = $('#visualTweaks');
        tweak.append ('.orangeButton, .deleteButton, .whiteButton, .selectorButton, .baseButton, .contextMenuButton, .ul-vt-button { border-radius: ' + radius + 'px; }');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedButtons set."); 
    };
    
    /**
     * @method setRoundedBars
     * @description Gives "bars" a rounded edge.
     * @param {Integer} radius Rounded edge radius on the bar.
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
     * @method setTextBox
     * @description Gives text boxes a rounded edge.
     * @param {Integer} radius Rounded edge radius on textboxes.
    */ 
    self.setTextBox = function (radius){
        if (store.settings.textBox === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.setTextBox = false."); return; };
        if (!(radius >= 0)) { radius = 8;}
        var tweak = $('#visualTweaks');
        tweak.append('#gameTitle, .featureSelectionCategoryHeading, .loadSaveButton, .cashLogContainer, .ul-vt-textbox { border-radius: ' + radius + 'px; }');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setTextBox set."); 
    };

    /**
     * @method setTextBox
     * @description Gives text boxes a rounded edge.
     * @param {Integer} style The style of the fancy grads. 1 or default.
    */     
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
    
    /**
     * @method setWatermarks
     * @description Gives text boxes a rounded edge.
     * @param {String} object ID of the DOM object element.
     * @param {String} url Image url of the watermark.
    */     
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

    /**
     * @private 
     * @property addWatermarkCallback
     * @type Closure
     * @description Callback for adding a watermark into the game.
    */      
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
})(UltimateLib.VisualTweaks || {});/**
 * @class Update
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description  The Updater class allows to check for a possible update of UL and / or other mods if they cope the specs.
 * @fileOverview The Updater class allows to check for a possible update of UL and / or other mods if they cope the specs.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 */ 
UltimateLib.Update = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Update loading...");

    /**
     * @private
     * @method compareVersions
     * @description Compares two version strings to find out if the v2 is newer than v1.
     * @param {String} v1 The version to compare (current version)
     * @param {String} v2 The version to compare with (online version)
     * @return {Integer} -1 if the v2 is newer than v1, otherwise 0.
    */    
    function compareVersions(v1, v2) {
      var res   = 0;
      var p1    = v1.split('.');
      var p2    = v2.split('.');
      var len   = Math.max(p1.length, p2.length);

      for (var i = 0; i < len; i++) {
        var np1 = (i < p1.length) ? parseInt(p1[i], 10) : 0;
        var np2 = (i < p2.length) ? parseInt(p2[i], 10) : 0;

        if (isNaN(np1)) { np1 = 0; }
        if (isNaN(np2)) { np2 = 0; }

        if (np1 != np2) {
          res = (np1 > np2) ? 1 : -1;
          break;
        }
      }

      return res;
    };
     
     /**
     * @method init
     * @description Initializes the module.
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Update init ran.");
    };
    
    /**
     * @property GitHub
     * @type Object
     * @description Provides an object to perform update operations on GitHub. Please note that it is only allowed for 60 request per hours (GitHub specific) on this unauthorized mode.
     * @param {method} getLatestVersionAvailable Returns the latest version of a mod, available from the specified repository, branch and directory.
     * @param {method} hasNewerVersion Checks if there's a new version of a mod online by querying the specified repository, branch and directory.
     * @param {method} notifyIfNewerVersion Notifies the user in-game if there's a new version of the mod available by offering to navigate to the page.
    */   
    self.GitHub = {
        
        /**
         * @method getLatestVersionAvailable
         * @description Returns the latest version of a mod, available from the specified repository, branch and directory.
         * @param {String} user The name of the GitHub user
         * @param {String} repo The name of the repository
         * @param {String} [branch=master] Optional: A name specifying the branch to use. Default: master
         * @param {String} [dir] Optional: Directory of the package.json of the module. Default: empty string (repo root)
         * @return {String} A string containing the version information about the latest version available online.
        */   
        getLatestVersionAvailable: function(user, repo, branch, dir){
            branch  = branch ? branch : "master";
            dir     = dir ? dir+'/' : '';

            var github      = new Github({username: user});
            var repo        = github.getRepo(user, repo);
            
            repo.read(branch, dir+'package.json', function(err, data) {
                if (err){
                    UltimateLib.Logger.log("Could not read the specified GitHub data. The server responded:" + err);
                    return undefined;
                }
                else {
                    var packg = JSON.parse( data );
                    return packg.version;
                }
            });
        },
        
        /**
         * @method hasNewerVersion
         * @description Checks if there's a new version of a mod online by querying the specified repository, branch and directory.
         * @param {String} user The name of the GitHub user
         * @param {String} repo The name of the repository
         * @param {String} [branch] Optional: A name specifying the branch to use. Default: master
         * @param {String} [dir] Optional: Directory of the package.json of the module. Default: empty string (repo root)
         * @return {Boolean} True if there's a new version of the mod available online, otherwise False.
        */           
        hasNewerVersion: function(user, repo, branch, dir){
            branch  = branch ? branch : "master";
            dir     = dir ? dir+'/' : '';

            var github      = new Github({username: user});
            var repo        = github.getRepo(user, repo);
            var hasNewer    = false;
            
            repo.read(branch, dir + 'package.json', function(err, data) {
                hasNewer = false;

                if (err){
                    UltimateLib.Logger.log("Could not read the specified GitHub data in UltimateLib.Update.hasNeverVersion. The server responded:" + err);
                }
                else {
                    var packg = JSON.parse( data );
                    var mod;
                    for (var i = 0; i < ModSupport.availableMods.length; i++) {
                        if(ModSupport.availableMods[i].id == packg.id){
                            mod = ModSupport.availableMods[i];
                            break;
                        }
                    }
                    if (mod){
                        hasNewer = compareVersions(mod.version, packg.version) < 0;
                    }                    
                }
            });
         },
         
        /**
         * @method notifyIfNewerVersion
         * @description Notifies the user in-game if there's a new version of the mod available by offering to navigate to the page.
         * @param {String} user The name of the GitHub user
         * @param {String} repo The name of the repository
         * @param {String} [branch] Optional: A name specifying the branch to use. Default: master
         * @param {String} [dir] Optional: Directory of the package.json of the module. Default: empty string (repo root)
         * @param {String} Optional: Directory of the package.json of the module. Default: empty string (repo root)
        */             
        notifyIfNewerVersion: function(user, repo, branch, dir){
            branch  = branch ? branch : "master";
            dir     = dir ? dir+'/' : '';

            var github      = new Github({username: user});
            var repo        = github.getRepo(user, repo);
            var hasNewer    = false;
            
            repo.read(branch, dir+'package.json', function(err, data) {
                if (err){
                    UltimateLib.Logger.log("Could not read the specified GitHub data. The server responded:" + err);
                }
                else {
                    var packg = JSON.parse( data );
                    var mod;
                    for (var i = 0; i < ModSupport.availableMods.length; i++) {
                        if(ModSupport.availableMods[i].id == packg.id){
                            mod = ModSupport.availableMods[i];
                            break;
                        }
                    }
                    if (mod){
                        var comp = compareVersions(mod.version, packg.version);
                        var headerText = '';
                        var bodyText = '';
                        
                        if(comp < 0){
                            headerText = "New version available";
                            bodyText = "A new version of " + mod.name + " is available.<br>Latest version: <strong>" + packg.version + "</strong>";

                            var doc                 = $(document);
                            var docWidth            = doc.width();
                            var docHeight           = doc.height();
                            var docCenterX          = (docWidth * 0.5) - 300;
                            var docCenterY          = (docHeight * 0.5) - 20;
                            
                                            
                            var notifier = $(document.createElement('div'));
                            var notifierCloseButton = $(document.createElement('div'));
                            var notifierUrlButton   = $(document.createElement('div'));
                            
                            notifier.addClass('UltimateLibUpdateNotifierElement');
                            notifier.css({width:'600', height:80, border:'4px solid #ffffff', opacity:1,textAlign:'center', backgroundColor:'#eeeeee', position:'absolute',top:'5px', left:docCenterX, zIndex:10000});
                            
                            
                            // notifierCloseButton.addClass('icon-times-circle-o');
                            notifierCloseButton.addClass('icon-remove-sign'); 
                            notifierCloseButton.css({width:16, height:16, position:'relative', top:'-40px',left:'230px', cursor:'pointer', margin:0, padding:0});
                            notifierCloseButton.attr('title',"Close this update notification");

                            notifierUrlButton.addClass('icon-external-link'); 
                            notifierUrlButton.css({width:16, height:16, position:'relative', top:'-39px',left:'190px', cursor:'pointer', margin:0, padding:0});
                            notifierUrlButton.attr('title',"Click here to browse to the update page ("+mod.url+")");
                            
                            $('#gameContainerWrapper').append(notifier);
                            
                            notifier.html('<h3>'+headerText+'</h3>'+bodyText);
                            notifierCloseButton.appendTo(notifier);
                            notifierUrlButton.appendTo(notifier);
                            
                            notifierCloseButton.click(function(){
                                notifier.remove();
                            });
                            
                            notifierUrlButton.click(function(){
                                 PlatformShim.openUrlExternal(mod.url);
                                 notifier.remove();       
                            });
                        }
                        else if (comp == 0){
                            headerText = "You are up-to-date";
                            bodyText = "You are already using the latest version of " + mod.name + "<br>Current version:  <strong>" + mod.version + "</strong>";
                        }
                    }
                }
            });
        }
    };

    return self;
})(UltimateLib.Update || {});    