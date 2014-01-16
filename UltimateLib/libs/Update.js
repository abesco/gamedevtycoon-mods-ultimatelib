/**
 * @class Update
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description  The Updater class allows to check for a possible update of UL and / or other mods if they cope the specs.
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