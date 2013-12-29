(function () {
    var ready = function () {
        UltimateLib.Logger.log("UltimateLibTestMod loaded :-)"); 
    };

    var error = function () {
    };

    GDT.loadJs(['mods/UltimateTestMod/test.js'], ready, error);
})();

