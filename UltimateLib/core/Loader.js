/**
 * @fileOverview Loader is an UltimateLib library providing loading capabilities to UltimateLib
 * @author alphabit
 * @version 1.0.0
 */
 
/**
 * Loader for the UltimateLib class. 
 * This class handles all the loading work for including the libraries
 * related to this package.
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.Loader = (function() {
    var self = this;
    
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
                UltimateLib.Logger.log('UltimateLib.Loader.getFiles - Could not use acquire info on ' + f, ex);
            }
        }
        
        return outFiles;        
    }
  
    /**
     * Automatically loads all the scripts from UltimateLib, thus including any 3rd party lib
     * @public
    */    
    self.load = function(){
        var sections = ['3rd','libs'];
        
        if(typeof UltimateLib.Elements.Resources != 'undefined'){
             UltimateLib.Elements.Resources.remove();   
        }
        
        var js = [];
        $.each(sections, function(i, section){
            var files = getFiles(section);
            $.each(files, function(j, file){
                js.push(file);
            });
        });
        GDT.loadJs(js);
    };
    
    return self;
})();