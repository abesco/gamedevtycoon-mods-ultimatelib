/**
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
})(UltimateLib.VisualTweaks || {});