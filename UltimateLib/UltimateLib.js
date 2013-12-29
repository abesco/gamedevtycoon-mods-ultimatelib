/*

UltimateLib 
-----------------------------------------------------------------------------------------------------------------------
Copyright (c) 2013, 2014 Francesco Abbattista and Chad Keating

Founder(s):
 -----------------------------------------------------------------------------------------------------------------------
- alphabit
- SirEverard

Contributors:
 -----------------------------------------------------------------------------------------------------------------------

3rd Party Libraries:
 -----------------------------------------------------------------------------------------------------------------------
- Foswig - foswig.js, https://github.com/mrsharpoblunto/foswig.js (foswig on GitHub), Licensed under the MIT license.

License:
 -----------------------------------------------------------------------------------------------------------------------
This software is licensed under the GDT Modding Agreement with an additional clause stating that,
any party wishing to use this software in its entirety, must distribute it from the gamedevtycoon-mods-ultimatelib
public GitHub repository.

There also may be 3rd party libraries included used in and distributed with this software with their own
(non-conflicting) respective licences i.e. the "Attribution-NonCommercial 4.0 International".

In short
- Do not distribute this software with your own software (in particular with your own GDT addin module).
- The usage of this software is only allowed when downloaded from this repository and installed properly.
- You are not allowed to copy, modify, merge, publish, distribute, sublicense, and/or distribute copies of this
  software without the permission of the project founders.
- All attributions to 3rd-parties have to be implemented.
- Credits must be attributed to alphabit and SirEverard in your public threads / readme / etc.
  (i.e. powered by UltimateLib).

*/

/**
 * @fileOverview UltimateLib is a library that aims to leverage and empower the development of plugin modules for GameDevTycoon
 * @author alphabit and SirEverard
 * @version 1.0.0
 */

(function () {
    var ready = function () {
        UltimateLib.Logger.enabled = true;
        UltimateLib.Loader.load();
    };

    var error = function () {
    };

    GDT.loadJs(['mods/UltimateLib/core/Core.js', 
                'mods/UltimateLib/core/Logger.js', 
                'mods/UltimateLib/core/Elements.js',
                'mods/UltimateLib/core/Loader.js'], ready, error);
})();

