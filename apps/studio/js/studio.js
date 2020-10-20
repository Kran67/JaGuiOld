(function() {
    var ApplicationName = "studio";
    Application = new $j.classes.Application(ApplicationName);
    $j.tools.uses($j.tools.getPath($j.types.categories.COMMON) + "image",
                  $j.tools.getPath($j.types.categories.CORE) + "animation",
                  $j.tools.getPath($j.types.categories.COMMON) + "buttons",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "window",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "groupBox",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "panel",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "pageControl",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "tabControl",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "scrollBox",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "gridLayout",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "flowLayout",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "tableLayout",
                  $j.tools.getPath($j.types.categories.NONVISUAL) + "timers",
                  $j.tools.getPath($j.types.categories.COMMON) + "label",
                  $j.tools.getPath($j.types.categories.COMMON) + "checkbox",
                  $j.tools.getPath($j.types.categories.COMMON) + "radioButton",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "expander",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "bitmapButton",
                  $j.tools.getPath($j.types.categories.TOOLBARS) + "statusBar",
                  $j.tools.getPath($j.types.categories.TOOLBARS) + "toolBar",
                  $j.tools.getPath($j.types.categories.TOOLBARS) + "toolButton",
                  $j.tools.getPath($j.types.categories.COMMON) + "slider",
                  $j.tools.getPath($j.types.categories.COMMON) + "scrollBar",
                  $j.tools.getPath($j.types.categories.COMMON) + "listBox",
                  $j.tools.getPath($j.types.categories.COMMON) + "treeView",
                  $j.tools.getPath($j.types.categories.COMMON) + "textBox",
                  $j.tools.getPath($j.types.categories.MENUS) + "menus",
                  $j.tools.getPath($j.types.categories.DIALOGS) + "commonDialog",
                  $j.tools.getPath($j.types.categories.DIALOGS) + "openDialog",
                  $j.tools.getPath($j.types.categories.DIALOGS) + "findReplaceDialog",
                  $j.tools.getPath($j.types.categories.NONVISUAL) + "imageList",
                  $j.tools.getPath($j.types.categories.COMMON) + "splitter",
                  $j.tools.getPath($j.types.categories.COMMON) + "dropDownListBox",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "popupButton",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "splitButton",
                  $j.tools.getPath($j.types.categories.TOOLBARS) + "splitToolButton",
                  $j.tools.getPath($j.types.categories.ACTIONS) + "actnList",
                  $j.tools.getPath($j.types.categories.ACTIONS) + "stdActns",
                  $j.tools.getPath($j.types.categories.EXTRAS) + "aceWrapper",
                  $j.tools.getPath($j.types.categories.COLOR) + "dropDownColors",
                  $j.tools.getPath($j.types.categories.COMMON) + "spinBox",
                  $j.tools.getPath($j.types.categories.COMMON) + "shapes",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "roundButton",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "circleButton",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "pathButton",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "calloutPanel",
                  $j.tools.getPath($j.types.categories.COLOR) + "colorButton",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "cornerButton",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "valueLabel",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "pathCheckbox",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "angleButton",
                  $j.tools.getPath($j.types.categories.COMMON) + "progressBar",
                  $j.tools.getPath($j.types.categories.COLOR) + "alphaSlider",
                  $j.tools.getPath($j.types.categories.COLOR) + "bwSlider",
                  $j.tools.getPath($j.types.categories.COLOR) + "hueSlider",
                  $j.tools.getPath($j.types.categories.COLOR) + "colorBox",
                  $j.tools.getPath($j.types.categories.COLOR) + "colorPicker",
                  $j.tools.getPath($j.types.categories.COLOR) + "colorQuad",
                  $j.tools.getPath($j.types.categories.COMMON) + "rating",
                  $j.tools.getPath($j.types.categories.COLOR) + "gradientEdit",
                  $j.tools.getPath($j.types.categories.COLOR) + "colorPanel",
                  $j.tools.getPath($j.types.categories.COMMON) + "paintBox",
                  $j.tools.getPath($j.types.categories.COMMON) + "plotGrid",
                  $j.tools.getPath($j.types.categories.COMMON) + "passwordTextBox",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "roundTextBox",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "textBoxClearBtn",
                  $j.tools.getPath($j.types.categories.COMMON) + "memo",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "maskedTextBox",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "iPhoneButton",
                  $j.tools.getPath($j.types.categories.COMMON) + "calendar",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledAngleBar",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledColorButton",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledTextBox",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledSlider",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledMemo",
                  $j.tools.getPath($j.types.categories.COMMON) + "dropDownCalendar",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "dropDownSlider",
                  $j.tools.getPath($j.types.categories.COMMON) + "numberWheel",
                  $j.tools.getPath($j.types.categories.COMMON) + "timePanel",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "imageControl",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledImage",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "imageViewer",
                  $j.tools.getPath($j.types.categories.COMMON) + "dropDownTimePanel",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "bitmapStateButton",
                  $j.tools.getPath($j.types.categories.COMMON) + "busyIndicator",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "splitButton",
                  $j.tools.getPath($j.types.categories.DIALOGS) + "fontDialog",
                  $j.tools.getPath($j.types.categories.DIALOGS) + "colorDialog",
                  $j.tools.getPath($j.types.categories.COMMON) + "gridView",
                  $j.tools.getPath($j.types.categories.DATA) + "dataFile",
                  $j.tools.getPath($j.types.categories.DATA) + "dataSource",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "flowLayout",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "gridLayout",
                  $j.tools.getPath($j.types.categories.CONTAINERS) + "tableLayout",
                  $j.tools.getPath($j.types.categories.EXTRAS) + "propertyGrid",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "textBoxBtn",
                  $j.tools.getPath($j.types.categories.EXTENDED) + "radioGroup",
                  //#region Components
                  $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/controls/designer",
                  //#endregion
                  // third party here
                  //#region Ace
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/ace/ace",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/ace/mode-javascript",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/ace/mode-html",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/ace/mode-css",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/ace/mode-json",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/ace/mode-xml",
                  //$j.tools.getPath($j.types.internalCategories.APPS)+ApplicationName+"/thirdparty/ace/mode-css",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/ace/theme-twilight",
                  //#endregion
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/js-beautify/beautify-css",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/js-beautify/beautify-html",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/js-beautify/beautify",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/js-beautify/unpackers/javascriptobfuscator_unpacker",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/js-beautify/unpackers/myobfuscate_unpacker",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/js-beautify/unpackers/p_a_c_k_e_r_unpacker",
                  $j.tools.getPath($j.types.internalCategories.THIRDPARTY) + "/thirdparty/js-beautify/unpackers/urlencode_unpacker"
                );
    Application.addWindows([
      $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/windows/main/main",
      ////$j.tools.getPath($j.types.internalCategories.APPS)+ApplicationName+"/windows/componentsmanagement/compman",
      $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/windows/editor/editor",
      $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/windows/inspector/inspector",
      $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/windows/messages/messages",
      ////$j.tools.getPath($j.types.internalCategories.APPS)+ApplicationName+"/windows/newcomponent/newcomp",
      ////$j.tools.getPath($j.types.internalCategories.APPS)+ApplicationName+"/windows/options/options",
      $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/windows/palette/palette",
      $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/windows/project/project",
      $j.tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/windows/structure/structure"
      ////$j.tools.getPath($j.types.internalCategories.APPS)+ApplicationName+"/windows/taborder/taborder"
    ]);
    $j.tools.afterLoadScripts = function() {
        Application.initialize();
        $j.classes.registerPropertyEditor($j.types.dataTypes.PATH,$j.tools.getPath($j.types.internalCategories.APPS) + Application.name + "/windows/patheditor/patheditor");
        $j.classes.registerPropertyEditor($j.types.dataTypes.STRINGLIST,$j.tools.getPath($j.types.internalCategories.APPS) + Application.name + "/windows/stringlisteditor/stringlisteditor");
        $j.classes.registerPropertyEditor($j.types.dataTypes.IMAGE,$j.tools.getPath($j.types.internalCategories.APPS) + Application.name + "/windows/imageeditor/imageeditor");
        //$j.classes.registerCollectionEditor($j.classes.Action,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/actionEditor/actionEditor");
        //$j.classes.registerCollectionEditor($j.classes.MenuItem,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/menuEditor/menuEditor");
        //$j.classes.registerCollectionEditor($j.classes.ListBoxItem,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/listBoxEditor/listBoxEditor");
        //$j.classes.registerCollectionEditor($j.classes.TreeViewItem,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/treeViewEditor/treeViewEditor");

        //$j.classes.registerComponentEditor($j.classes.ImageList,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/imageListEditor/imageListEditor");
        //$j.classes.registerComponentEditor($j.classes.ListBox,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/listBoxEditor/listBoxEditor");
        //$j.classes.registerComponentEditor($j.classes.TreeView,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/treeViewEditor/treeViewEditor");
        //$j.classes.registerComponentEditor($j.classes.MainMenu,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/menuEditor/menuEditor");
        //$j.classes.registerComponentEditor($j.classes.PopupMenu,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/menuEditor/menuEditor");
        //$j.classes.registerComponentEditor($j.classes.ActionList,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/actionEditor/actionEditor");
        //$j.classes.registerComponentEditor($j.classes.DropDownListBox,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/listBoxEditor/listBoxEditor");
        //$j.classes.registerComponentEditor($j.classes.Image,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/imageEditor/imageEditor");
        //$j.classes.registerComponentEditor($j.classes.Memo,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/stringListEditor/stringListEditor");
        //$j.classes.registerComponentEditor($j.classes.NumberWheel,$j.tools.getPath($j.types.internalCategories.APPS)+Application.name+"/windows/stringListEditor/stringListEditor");

        //$j.classes.registerDesignerMenuItem($j.classes.PageControl,"Delete Page",action);
        //$j.classes.registerDesignerMenuItem($j.classes.PageControl,"Previous Page",action);
        //$j.classes.registerDesignerMenuItem($j.classes.PageControl,"Next Page",action);
        //$j.classes.registerDesignerMenuItem($j.classes.PageControl,"New Page",action);
        //$j.classes.registerDesignerMenuItem($j.classes.TreeView,"Items Editor...",Application.editor.launchEditor);
        //$j.classes.registerDesignerMenuItem($j.classes.MainMenu,"Menu Designer...",Application.editor.launchEditor);
        //$j.classes.registerDesignerMenuItem($j.classes.PopupMenu,"Menu Designer...",Application.editor.launchEditor);
        //$j.classes.registerDesignerMenuItem($j.classes.ImageList,"ImageList Editor...",Application.editor.launchEditor);
        //$j.classes.registerDesignerMenuItem($j.classes.StatusBar,"Panels Editor...",Application.editor.launchEditor);
        //$j.classes.registerDesignerMenuItem($j.classes.ToolBar,"New Separator",Application.editor.launchEditor);
        //$j.classes.registerDesignerMenuItem($j.classes.ToolBar,"New Button",Application.editor.launchEditor);
        Application.run();
    }
})();