(function () {
    "use strict";
    //#region HUESlider
    var HUESlider = $j.classes.ColorSlider.extend("HUESlider", {});
    //#endregion
    $j.classes.register($j.types.categories.COLOR, HUESlider);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var HUESliderTpl = "<div id='{internalId}' data-name='{name}' data-class='HUESlider' class='Control Slider HUESlider {theme} orientation-horizontal' data-values='[0.5,0]' style='width:92px;height:6px;'>\
                        <input type='range' id='{internalId}_1' data-class='Thumb' class='Control {theme} orientation-horizontal' />\
                      </div>";
        $j.classes.registerTemplates([{ Class: HUESlider, template: HUESliderTpl }]);
    }
    //endregion
})();