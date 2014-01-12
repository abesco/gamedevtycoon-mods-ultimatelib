/**
 * @class Dialog
 * @namespace UltimateLib
 * @author Francesco Abbattista (alphabit)
 * @version 1.0.0
 * @description Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
 * @fileOverview Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
 * @constructor
 * @param {object} self An object representing the class itself for extending
 */
 UltimateLib.Dialog = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loading...");
    
    /**
     * @method 
     * @description Creates a dialog button and returns it as a wrapped jQuery element object for further usage
     * @param {string} name A name (id) for the dialog button. Additional element names will be automatically extended as required.  
     * @param {string} text Text (Title) of the button
     * @param {string|integer} width The width of the button  (as integer or css string)
     * @param {string|integer} height The height of the button  (as integer or css string)
     * @param {string} onclick A string indicating the callback function to call (i.e. UI.myCallBackOnUIClick)
    */        
    self.createButton = function(name, text, width, height, onclick) {
        var el = $(document.createElement('div'));
        
        el.addClass('selectorButton whiteButton');
        el.css({display:'inline-block', position: 'relative', marginLeft:'50px', width: width, height: height});
        el.attr({id:name, onclick:onclick});
        el.text(text);
        
        return el;
    };
    
    /**
     * @method 
     * @description Creates a dialog section and returns it as a wrapped jQuery element object for further usage
     * @param {string} name A name (id) for the dialog element. Additional element names will be automatically extended with "Section", "SectionTitle", etc.  
     * @param {string} text Text (Title) of the section label
     * @param {array} buttons An array of buttons to show in the dialog section (use createButton to create each button)  
    */                
    self.createSection = function(name, text, buttons){
        var idSection       = name + "Section";
        var idSectionTitle  = name + "SectionTitle";
        
        var section = $(document.createElement('div'));
            section.attr({id:idSection});

        var label = $(document.createElement('div'));
            label.css({textAlign:'center', marginLeft:'50px', width: '450px'});
            label.attr({id:idSectionTitle});
            label.text(text);
            label.appendTo(section);
            
            for(var i = 0; i < buttons.length;i++){
                buttons[i].appendTo(section);
            }
        
        return section;
    };
            
    /**
     * @method 
     * @description Creates a dialog and returns it as a wrapped jQuery element object for further usage
     * @param {string} name A name (id) for the dialog element. Additional element names will be automatically extended with "Modal", "Container", etc.  
     * @param {string} text Text (Title) of the dialog
     * @param {array} sections An array of sections to show on the dialog (use createSection to create each section)  
    */                
    self.createDialog = function(name, text, sections){
        var idModalDialog       = name + "Modal";
        var idDialogContainer   = name + "Container";
        var idTop               = name + "Top";
        var idPoweredBy         = name + "PoweredBy";
        
        // Modal dialog for a GDT dialog -->
        var modal = $(document.createElement('div'));
            modal.attr({id:idModalDialog});
            modal.addClass('ow-overlay ow-closed');
            
        // Container for a modal dialog
        var container = $(document.createElement('div'));
            container.attr({id:idDialogContainer});
            container.addClass('windowBorder tallWindow');
            container.css({overflow:'auto', display:'none'});
            
        var scrolltop = $(document.createElement('div'));
            scrolltop.attr({id:idTop});
            scrolltop.addClass('windowTitle smallerWindowTitle');
            scrolltop.text(text);
            scrolltop.appendTo(container);
                                        
        $.each(sections, function(i, v){
            container.append(v);
        });

        var poweredBy = $(document.createElement('div'));
            poweredBy.attr({id:idPoweredBy});
            poweredBy.css({textAlign:'center', marginLeft:'50px', width: '450px'});
            poweredBy.append('br').append('br');
            poweredBy.text("Powered by UltimateLib");
            poweredBy.appendTo(container);
            
        return container;
    };
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loaded :-)");
    
    return self;    
})(UltimateLib.Dialog || {});
