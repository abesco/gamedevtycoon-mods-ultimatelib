/**
 * @file  
 * @fileOverview UltimateLib is a library that aims to leverage and empower the development of plugin modules for GameDevTycoon
 * @author alphabit and SirEverard
 * @version 1.0.0
 */

/**
 * @description Ultimate provides access to library related functionality as well as access all the related libraries from here. This class hooks into GDT.
 * @constructor
 * @namespace GDT
*/

var UltimateLib = UltimateLib || {};
(function(self) {       
    /**
     * Gets a file list from ./mods/UltimateLib/SECTION
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
                UltimateLib.Logger.log('UltimateLib.getFiles - Could not use acquire info on ' + f, ex);
            }
        }
        
        return outFiles;        
    }
  
    self.libraries      = [];
    self.libraries3rd   = [];
    
    /**
     * Automatically loads all the scripts from UltimateLib, thus including any 3rd party lib
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

    self.loaded = function(){
        self.isLoaded = true;
        UltimateLib.Logger.log("UltimateLib Libraries have been loaded.");
               
        // Call "init" methods on all loaded libraries where applicable
        $.each( self.libraries, function(i,v){
            var lib     = UltimateLib[v.name];
            var init    = lib ? lib.init : undefined;
            
            if(typeof init != 'undefined'){
                UltimateLib.Logger.log("Calling init function of "+v.name+" ("+v.file+").");
                init();
            }
        });
        
    };
    
    self.isLoaded = false;
    
    return self;
})(UltimateLib);
