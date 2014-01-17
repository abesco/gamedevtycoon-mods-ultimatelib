 /**
 * @class Dialog
 * @module UltimateLib
 * @main UltimateLib
 * @namespace UltimateLib
 * @requires Base,Core,Logger
 * @author Francesco Abbattista (alphabit)
 * @description Dialog is an UltimateLib library class providing dialog creation capabilities i.e. for use with PopupMenu.
 * @constructor
 * @param {Object} self An object representing the class itself or a new object for the purpose of extensibility. This parameter can be ignored.
 * @beta
 */ 
 
 UltimateLib.Dialog = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loading...");
    
    /**
     * @method createButton
     * @description Creates a dialog button and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog button. Additional element names will be automatically extended as required.  
     * @param {String} text Text (Title) of the button
     * @param {String|Integer} width The width of the button  (as integer or css string)
     * @param {String|Integer} height The height of the button  (as integer or css string)
     * @param {String} onclick A string indicating the callback function to call (i.e. UI.myCallBackOnUIClick)
    */        
    self.createButton = function(name, text, width, height, onclick) {
        var el = $(document.createElement('div'));
        
        el.addClass('selectorButton whiteButton');
        el.css({display:'inline-block', position: 'relative', marginLeft:'50px', width: width, height: height});
        el.attr({id:name});
        if(typeof(onclick) == 'function')
        {
            $(el).on('click', onclick);
        }
        else
        {
            el.attr({id:name, onclick:onclick});
        }
        el.text(text);
        
        return el;
    };
    
    /**
     * @method createSection
     * @description Creates a dialog section and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog element. Additional element names will be automatically extended with "Section", "SectionTitle", etc.  
     * @param {String} text Text (Title) of the section label
     * @param {Array} buttons An array of buttons to show in the dialog section (use createButton to create each button)  
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
     * @method createDialog
     * @description Creates a dialog and returns it as a wrapped jQuery element object for further usage
     * @param {String} name A name (id) for the dialog element. Additional element names will be automatically extended with "Modal", "Container", etc.  
     * @param {String} text Text (Title) of the dialog
     * @param {Array} sections An array of sections to show on the dialog (use createSection to create each section)  
    */                
    self.createDialog = function(name, text, sections){
        var idModalDialog       = name + "Modal";
        var idDialogContainer   = name + "Container";
        var idTop               = name + "Top";
        
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
            UltimateLib.Dialog.addSection(container, v);
        });

        //Add the poweredby
        UltimateLib.Dialog.addPoweredBy(container);
            
        return container;
    };
    
    /**
     * @method 
     * @description Removes all sections from the provided dialog element
     * @param {dialog} dialog The dialog you wish to clear all sections from
    */ 
    self.clearSections = function(dialog){

        //Clear the dialog section
        $('.ultimatelib-dialog-section', dialog).remove();

    }
    
    /**
     * @method 
     * @description Appends a section to the dialog
     * @param {dialog} dialog The dialog you wish to append the section to
     * @param {section} section The section you wish to append to the dialog
    */ 
    self.addSection = function(dialog, section){

        //Append the section
        UltimateLib.Dialog.clearPoweredBy(dialog);
        dialog.append(section);
        UltimateLib.Dialog.addPoweredBy(dialog);

    }
    
    /**
     * @method 
     * @description Removes the poweredBy section so we can add more items to the dialog and then add the powered by again later
     * @param {dialog} dialog The dialog you wish to remove the poweredBy from
    */ 
    self.clearPoweredBy = function(dialog){

        //Clear the dialog section
        $('.ultimatelib-dialog-poweredby', dialog).remove();

    }
    
    /**
     * @method 
     * @description Appends the powered by section at the end of the dialog
     * @param {dialog} dialog The dialog you wish to append the poweredby to
    */ 
    self.addPoweredBy = function(dialog){

        var poweredBy = $(document.createElement('div'));
            poweredBy.attr({id:$(dialog).attr('id').replace('Container', 'PoweredBy'), class:"ultimatelib-dialog-poweredby"});
            poweredBy.css({textAlign:'center', marginLeft:'50px', width: '450px'});
            poweredBy.append('br').append('br');
            poweredBy.text("Powered by UltimateLib");
            dialog.append(poweredBy);

    }
    
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loaded :-)");
    
    return self;    
})(UltimateLib.Dialog || {});
