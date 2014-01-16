/**
 * @class Update
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description The Updater class allows to check for a possible update of UL and / or other mods if they cope the specs.
 * @fileOverview The Updater class allows to check for a possible update of UL and / or other mods if they cope the specs.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */

UltimateLib.Update = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Update loading...");

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
        
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.Update init ran.");
    };
    
    self.GitHub = {
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