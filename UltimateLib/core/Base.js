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
