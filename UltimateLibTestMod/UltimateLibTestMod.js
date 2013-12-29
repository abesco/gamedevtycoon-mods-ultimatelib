(function () {
    var ready = function () {
        
        var buttonsDialog1Section1 = [UltimateLib.Dialog.createButton('ultimateTestLibBut1', 'Test #1', '180px', '48px', ''),
                                      UltimateLib.Dialog.createButton('ultimateTestLibBut2', 'Test #2', '180px', '48px', ''),
                                      UltimateLib.Dialog.createButton('ultimateTestLibBut3', 'Test #3', '180px', '48px', '')];

        var buttonsDialog1Section2 = [UltimateLib.Dialog.createButton('ultimateTestLibBut4', 'Test #4', '180px', '48px', ''),
                                      UltimateLib.Dialog.createButton('ultimateTestLibBut5', 'Test #5', '180px', '48px', ''),
                                      UltimateLib.Dialog.createButton('ultimateTestLibBut6', 'Test #6', '180px', '48px', '')];

                              
        var buttonsDialog2Section1 = [UltimateLib.Dialog.createButton('ultimateTestLibBut7', 'Test #7', '90px', '48px', ''),
                                      UltimateLib.Dialog.createButton('ultimateTestLibBut8', 'Test #8', '90px', '48px', ''),
                                      UltimateLib.Dialog.createButton('ultimateTestLibBut9', 'Test #9', '90px', '48px', '')];
                              
        var sectionsDialog1         = [UltimateLib.Dialog.createSection('ultimateTestLibS1', 'Section 1', buttonsDialog1Section1),
                                       UltimateLib.Dialog.createSection('ultimateTestLibS1', 'Section 2', buttonsDialog2Section1)];
        
        var sectionsDialog2         = [UltimateLib.Dialog.createSection('ultimateTestLibS1', 'Section 1', buttonsDialog1Section2)];

                              
        var dialogs                 = [UltimateLib.Dialog.createDialog('ultimateTestLib1', 'MyDialog1', sectionsDialog1),
                                       UltimateLib.Dialog.createDialog('ultimateTestLib2', 'MyDialog2', sectionsDialog2)];
        
        UltimateLib.PopupMenu.addItem({label:'UltimateLib Test', el:dialogs[0], pause:true});
        UltimateLib.PopupMenu.addItem({label:'UltimateLib Test 2', el:dialogs[1], pause:true});

        UltimateLib.PopupMenu.update();

    };

    var error = function () {
    };

    GDT.loadJs(['mods/UltimateLibTestMod/test.js'], ready, error);
})();

