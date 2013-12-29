/**
 * @fileOverview Loader for the UltimateLib class. This class handles all the loading work for including the libraries related to this package.
 * @version 1.0.0
 * @author alphabit
 * @constructor
 * @augments UltimateLib
 */
UltimateLib.Loader = (function() {
    var self = this;
    
    /**
     * @description Gets a file list from ./mods/UltimateLib/SECTION
     * @private
     * @param {string} section The name the section to search .js files from
     * @returns All modules/libs of UltimateLib
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
     * @description Automatically loads all the scripts from UltimateLib, thus including any 3rd party lib
     * @public
    */    
    self.load = function(){
        var sections = ['3rd','libs'];
        
        $('#UltimateLibResources').remove();
        
        var jsdiv = $(document.createElement('div'));
        jsdiv.attr('id','UltimateLibResources').appendTo($('body'));

        $.each(sections, function(i, section){
            var files = getFiles(section);
            
            $.each(files, function(j, file){
                            
                var jstag = $(document.createElement('script'));
                    jstag.attr({src:file, async:false});
                    jstag.appendTo(jsdiv);
                    
                    UltimateLib.Logger.log(file);
                    
            });
        });

    };
    
    return self;
})();