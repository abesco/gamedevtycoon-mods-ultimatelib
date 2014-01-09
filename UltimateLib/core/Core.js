/**
 * @fileOverview UltimateLib is a library that aims to leverage and empower the development of plugin modules for GameDevTycoon
 * @author alphabit and SirEverard
 * @version 1.0.0
 * @class UltimateLib
 * @description Ultimate provides access to library related functionality as well as access all the related libraries from here. This class hooks into GDT.
 * @constructor
 * @namespace GDT
*/

var UltimateLib = (function(self) {       
    /**
     * @method getFiles
     * @description Gets a file list from ./mods/UltimateLib/SECTION
     * @private
     * @param {string} section The name the section to search .js files from
     * @returns Module file array
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
     * @property libraries
     * @type {Array}
     * @default empty 
     * @description  Array contaning file informations about the main libraries
     * @public
    */    
    self.libraries      = [];
    
    /**
     * @property libraries3rd
     * @type {Array}
     * @default empty
     * @description Array contaning file informations about the 3rd party libraries
     * @public
    */    
    self.libraries3rd   = [];
    
    /**
     * @method load
     * @description Automatically loads all the scripts from UltimateLib, thus including any 3rd party lib
     * @public
    */    
    self.load = function(){
        var sections = ['3rd','libs'];
        
        var js = [];

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
                
                js.push(file);
            });
        });
        
        GDT.loadJs(js, self.loaded);
    };

    /**
     * @method loaded
     * @description Event (Callback) that is called when loading of JS libs has been finished
     * @public
    */        
    self.loaded = function(){
        
        // callee is this method
        // caller the GDT event
        // console.log(arguments.callee.caller);
                    
        self.isLoaded = true;
        self.Logger.log("UltimateLib Libraries have been loaded.");
               
        // Call "init" methods on all loaded libraries where applicable
        $.each( self.libraries, function(i,v){
            var lib     =   self[v.name];
            var init    = lib ? lib.init : null;

            if(init != null){
                self.Logger.log("Calling init function of "+v.name+" ("+v.file+").");
                init();
            }
        });
        
        // Now that the all the library have been loaded and initialized, we try to call the ulInit method on every module's main class
        var availMods = ModSupport.availableMods;
        
        $.each(availMods, function(i,mod){
           if(mod.active){
               if(mod.ultimatelib){
                
                   // try to get pointer to mod
                   var modptr  =   self[mod.ultimatelib];
                   if(!modptr){
                       modptr = window[mod.ultimatelib];
                   }
                   if(!modptr){
                       modptr = eval(mod.ultimatelib); // eval is evil *eg*
                   }
                   var ulinit  = modptr ? modptr.ulInit : null
                   if(ulinit){
                       ulinit();
                   }
               }
           }
        });

        
    };
    
    /**
     * @property isLoaded
     * @type {bool}
     * @default false
     * @description Event (Callback) that is called when loading of JS libs has been finished
     * @public
    */        
    self.isLoaded = false;


    return self;
})(UltimateLib || {});
