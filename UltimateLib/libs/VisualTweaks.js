/**
 * @fileOverview This is a library that provides and API for tweaking visual elements within the game.
 * @version 0.1.0b
 * @author SirEverard
 * @constructor
 * @augments UltimateLib
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
    var store = GDT.getDataStore("UltimateLib");
    
    /**
     * @description Sets up the style tags for the rest of the module.
     * @public
    */ 
    self.init = function(){
        UltimateLib.Logger.log("UltimateLib.VisualTweaks init ran.");
        $('head').append('<style id="visualTweaks" type="text/css"></style>');
        store.sliderbg = {};
    };
	

    self.setAllTweaks = function (style) {

        self.setRoundedWindows();
        self.setScrollBar();
        self.setRoundedButtons();
        self.setRoundedBars();
        self.setTextBox();
        self.setFancyGrads();

    };


    /**
     * @description Give windows rounded edges.
     * @public
     * @param {radius} Rounded edge radius on the window.
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
     * @description Adds a style to the overflow scrollbar
     * @public
     * @param {scrollbar style} 1 = default scrollbar styles
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
     * @description Gives buttons a rounded edge.
     * @public
     * @param {radius} Rounded edge radius on the button.
    */ 
    self.setRoundedButtons = function (radius) {
        if (store.settings.roundedButtons === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.roundedButtons = false."); return; };
        if (!(radius >= 0)) { radius = 10;}
        var tweak = $('#visualTweaks');
        tweak.append ('.orangeButton, .deleteButton, .whiteButton, .selectorButton, .baseButton, .contextMenuButton, .ul-vt-button { border-radius: ' + radius + 'px; }');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setRoundedButtons set."); 
    };
	
    /**
     * @description Gives "bars" a rounded edge.
     * @public
     * @param {radius} Rounded edge radius on the bar.
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
     * @description Gives text boxes a rounded edge.
     * @public
     * @param {radius} Rounded edge radius on textboxes.
    */ 
    self.setTextBox = function (radius){
        if (store.settings.textBox === false){ UltimateLib.Logger.log("UltimateLib.VisualTweaks.setTextBox = false."); return; };
        if (!(radius >= 0)) { radius = 8;}
        var tweak = $('#visualTweaks');
        tweak.append('#gameTitle, .featureSelectionCategoryHeading, .loadSaveButton, .cashLogContainer, .ul-vt-textbox { border-radius: ' + radius + 'px; }');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setTextBox set."); 
    };
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

        tweak.append('');
        UltimateLib.Logger.log("UltimateLib.VisualTweaks.setFancyGrads set.");
    };


    self.setWatermarks = function (object, url) {
        var tweak = $('#visualTweaks');

        switch (object) {
            case "slider-all-img":
                $('#selectFeatureMenuTemplate').find('.focusSliderWrapper').prepend('<img id="allsliderimg" class="ul-vt-slider-img" src="' + url + '"/>');
                break;
            case "slider-engine-img":
                store.sliderbg.engine = url;
                break;
            case "slider-gameplay-img":
                store.sliderbg.gameplay = url;
                break;
            case "slider-story-img":
                store.sliderbg.story = url;
                break;
            case "slider-dialogs-img":
                store.sliderbg.dialogs = url;
                break;
            case "slider-level-img":
                store.sliderbg.level = url;
                break;
            case "slider-ai-img":
                store.sliderbg.ai = url;
                break;
            case "slider-world-img":
                store.sliderbg.world = url;
                break;
            case "slider-graphic-img":
                store.sliderbg.graphic = url;
                break;
            case "slider-sound-img":
                store.sliderbg.sound = url;
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
        }
        if (store.sliderbg.cssset != true){
            
            tweak.append('.ul-vt-slider-img { width:80%; height:80%; border: 1px; position:absolute; opacity:0.4; left: 0; }');
            store.sliderbg.cssset = true;
        }
        addWatermarkCallback();
    };
    var addWatermarkCallback = function () {
        var keepme = UI.showFeatureList;
        UI.showFeatureList = function (features, options) {
            var store = GDT.getDataStore("UltimateLib");
            var tweak = $('#visualTweaks');
            
            keepme(features, options)

            //Stage 1
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="engine" class="ul-vt-slider-img" src="' + store.sliderbg.engine + '"/>');
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="gameplay" class="ul-vt-slider-img" src="' + store.sliderbg.gameplay + '"/>');
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="story" class="ul-vt-slider-img" src="' + store.sliderbg.story + '"/>');
            //Stage 2 
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="dialogs" class="ul-vt-slider-img" src="' + store.sliderbg.dialogs + '"/>');
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="level" class="ul-vt-slider-img" src="' + store.sliderbg.level + '"/>');
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="ai" class="ul-vt-slider-img" src="' + store.sliderbg.ai + '"/>');
            //Stage 3
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="world" class="ul-vt-slider-img" src="' + store.sliderbg.world + '"/>');
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="graphic" class="ul-vt-slider-img" src="' + store.sliderbg.graphic + '"/>');
            $('#selectFeatureMenu').find('.focusSliderWrapper').prepend('<img id="sound" class="ul-vt-slider-img" src="' + store.sliderbg.sound + '"/>');
        }

    };

    // Show up in console
    UltimateLib.Logger.log("UltimateLib.VisualTweaks loaded :-)");

    return self;
})(UltimateLib.VisualTweaks || {});