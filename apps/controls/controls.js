import * as Core from "/scripts/core/core.js";
import { Application } from "/scripts/core/application.js";
//$j.tools.setEngine($j.types.renderers.CANVAS);
//$j.tools.debugger.useFragment=true;
const ApplicationName = "controls";
Core.apps.activeApplication = new Application(ApplicationName);
//Core.apps.activeApplication.themeManifest.addTheme("simple");
//Core.apps.activeApplication.themeManifest.addTheme("macos");
//Core.apps.activeApplication.themeManifest.addTheme("air");
//$j.apps.activeApplication.themeManifest.addTheme("haiku");
//Core.apps.activeApplication.loadLocale("locales/" + Types.LANGUAHES.fr_FR);
//Core.apps.activeApplication.loadLocale("locales/" + Types.languages.en_US);
//Core.tools.uses($j.tools.getPath($j.types.categories.COMMON) + "image",
//  $j.tools.getPath($j.types.categories.CORE) + "animation",
//  $j.tools.getPath($j.types.categories.COMMON) + "buttons",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "window",
//  $j.tools.getPath($j.types.categories.COMMON) + "label",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "roundButton",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "groupBox",
//  $j.tools.getPath($j.types.categories.COMMON) + "checkbox",
//  $j.tools.getPath($j.types.categories.COMMON) + "radioButton",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "circleButton",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "popupButton",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "bitmapButton",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "pathButton",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "panel",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "calloutPanel",
//  $j.tools.getPath($j.types.categories.COLOR) + "colorButton",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "cornerButton",
//  $j.tools.getPath($j.types.categories.TOOLBARS) + "statusBar",
//  $j.tools.getPath($j.types.categories.TOOLBARS) + "toolBar",
//  $j.tools.getPath($j.types.categories.TOOLBARS) + "toolButton",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "valueLabel",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "pathCheckbox",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "angleButton",
//  $j.tools.getPath($j.types.categories.COMMON) + "progressBar",
//  $j.tools.getPath($j.types.categories.COMMON) + "slider",
//  $j.tools.getPath($j.types.categories.COMMON) + "scrollBar",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "scrollBox",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "expander",
//  $j.tools.getPath($j.types.categories.COLOR) + "alphaSlider",
//  $j.tools.getPath($j.types.categories.COLOR) + "bwSlider",
//  $j.tools.getPath($j.types.categories.COLOR) + "hueSlider",
//  $j.tools.getPath($j.types.categories.COLOR) + "colorBox",
//  $j.tools.getPath($j.types.categories.COLOR) + "colorPicker",
//  //$j.tools.getPath($j.types.categories.COLOR)+"circleHue",
//  $j.tools.getPath($j.types.categories.COLOR) + "colorQuad",
//  $j.tools.getPath($j.types.categories.COMMON) + "rating",
//  $j.tools.getPath($j.types.categories.COLOR) + "gradientEdit",
//  $j.tools.getPath($j.types.categories.COLOR) + "colorPanel",
//  $j.tools.getPath($j.types.categories.COMMON) + "shapes",
//  //$j.tools.getPath($j.types.categories.COLOR)+"circleColorPanel",
//  //$j.tools.getPath($j.types.categories.EXTRAS)+"controlCloud",
//  //$j.tools.getPath($j.types.categories.EXTRAS)+"gauge",
//  $j.tools.getPath($j.types.categories.COMMON) + "listBox",
//  $j.tools.getPath($j.types.categories.COMMON) + "treeView",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "pageControl",
//  $j.tools.getPath($j.types.categories.COMMON) + "paintBox",
//  $j.tools.getPath($j.types.categories.COMMON) + "plotGrid",
//  $j.tools.getPath($j.types.categories.COMMON) + "textBox",
//  $j.tools.getPath($j.types.categories.COMMON) + "passwordTextBox",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "roundTextBox",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "textBoxClearBtn",
//  $j.tools.getPath($j.types.categories.COMMON) + "spinBox",
//  $j.tools.getPath($j.types.categories.COMMON) + "memo",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "maskedTextBox",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "iPhoneButton",
//  $j.tools.getPath($j.types.categories.COMMON) + "calendar",
//  $j.tools.getPath($j.types.categories.MENUS) + "menus",
//  $j.tools.getPath($j.types.categories.COMMON) + "dropDownListBox",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledAngleBar",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledColorButton",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledTextBox",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledSlider",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledMemo",
//  $j.tools.getPath($j.types.categories.COLOR) + "dropDownColors",
//  $j.tools.getPath($j.types.categories.COMMON) + "dropDownCalendar",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "dropDownSlider",
//  $j.tools.getPath($j.types.categories.COMMON) + "numberWheel",
//  $j.tools.getPath($j.types.categories.COMMON) + "timePanel",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "imageControl",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "labeledImage",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "imageViewer",
//  $j.tools.getPath($j.types.categories.COMMON) + "dropDownTimePanel",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "bitmapStateButton",
//  $j.tools.getPath($j.types.categories.COMMON) + "busyIndicator",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "splitButton",
//  $j.tools.getPath($j.types.categories.DIALOGS) + "commonDialog",
//  $j.tools.getPath($j.types.categories.DIALOGS) + "openDialog",
//  $j.tools.getPath($j.types.categories.DIALOGS) + "findReplaceDialog",
//  $j.tools.getPath($j.types.categories.DIALOGS) + "fontDialog",
//  $j.tools.getPath($j.types.categories.DIALOGS) + "colorDialog",
//  $j.tools.getPath($j.types.categories.COMMON) + "gridView",
//  $j.tools.getPath($j.types.categories.NONVISUAL) + "imageList",
//  $j.tools.getPath($j.types.categories.NONVISUAL) + "timers",
//  $j.tools.getPath($j.types.categories.DATA) + "dataFile",
//  $j.tools.getPath($j.types.categories.DATA) + "dataSource",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "flowLayout",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "gridLayout",
//  $j.tools.getPath($j.types.categories.CONTAINERS) + "tableLayout",
//  $j.tools.getPath($j.types.categories.COMMON) + "splitter",
//  $j.tools.getPath($j.types.categories.TOOLBARS) + "splitToolButton",
//  $j.tools.getPath($j.types.categories.ACTIONS) + "actnList",
//  $j.tools.getPath($j.types.categories.ACTIONS) + "stdActns",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "textBoxBtn",
//  $j.tools.getPath($j.types.categories.COMMON) + "clock",
//  $j.tools.getPath($j.types.categories.EXTRAS) + "propertyGrid",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "radioGroup",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "toggle",
//  $j.tools.getPath($j.types.categories.COMMON) + "batteryIndicator",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "segmentLedLabel",
//  $j.tools.getPath($j.types.categories.EXTENDED) + "circularProgressBar"
//  //$j.tools.getPath($j.types.internalCategories.LOCALES)+$j.types.languages.en_US,
//  //$j.tools.getPath($j.types.internalCategories.APPS)+ApplicationName+"/locales/"+$j.types.languages.fr_FR,
//  //$j.tools.getPath($j.types.internalCategories.APPS)+ApplicationName+"/locales/"+$j.types.languages.en_US
//);
Core.apps.activeApplication.addWindow(
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/window1",
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/window2",
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/borderDialog",
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/borderNone",
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/borderSingle",
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/borderSizeable",
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/borderSizeToolWin",
  //Tools.getPath($j.types.internalCategories.APPS) + ApplicationName + "/borderToolWindow"
);
  //Tools.afterLoadScripts = function () {
  //    $j.apps.activeApplication.initialize();
  //
  //    //$j.apps.activeApplication.window1=$j.apps.activeApplication.createForm($j.apps.activeApplication.Window1);
  //    //$j.apps.activeApplication.window2=$j.apps.activeApplication.createForm($j.apps.activeApplication.Window2);
  //    //$j.apps.activeApplication.windows.push(Window1);
  //    //$j.apps.activeApplication.localCulture="en-EN";
  //    $j.apps.activeApplication.run();
  //    //$j.tools.debugger.debug=true;
  //    //setTimeout("create()", 1000);
  //    //$j.apps.activeApplication.setThemeName("macos");
  //}
