UltimateLib.Dialog = (function(self){
    // Show up in console
    UltimateLib.Logger.log("UltimateLib.Dialog loading...");
    
    self.createButton = function(name, text, width, height, onclick) {
        var el = $(document.createElement('div'));
        
        el.addClass('selectorButton whiteButton');
        el.css({display:'inline-block', position: 'relative', marginLeft:'50px', width: width, height: height});
        el.attr({id:name, onclick:onclick});
        el.text(text);
        
        return el;
    };
    
    self.createSection = function(name, text, buttons){
        var idSection       = name + "Section";
        var idSectionTitle  = name + "SectionTitle";
        
        var section = $(document.createElement('div'));
            section.attr({id:idSection});

        var label = $(document.createElement('div'));
            label.addClass('selectorButton whiteButton');
            label.css({textAlign:'center', position: 'relative', marginLeft:'50px', width: '450px'});
            label.attr({id:idSectionTitle});
            label.text(text);
            
            label.appendTo(section);
            
            for(var i = 0; i < buttons.length;i++){
                buttons[i].appendTo(section);
            }
        
        return section;
    };
            
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
