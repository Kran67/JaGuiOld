(function () {
    "use strict";
    //#region BWSlider
    var BWSlider = $j.classes.ColorSlider.extend("BWSlider", {});
    //#endregion
    $j.classes.register($j.types.categories.COLOR, BWSlider);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var BWSliderTpl = "<div id='{internalId}' data-name='{name}' data-class='BWSlider' class='Control Slider BWSlider {theme} orientation-horizontal' data-values='[0.5,0]' style='width:92px;height:6px;'>\
                        <input type='range' id='{internalId}_1' data-class='Thumb' class='Control {theme} orientation-horizontal' />\
                     </div>"
        $j.classes.registerTemplates([{ Class: BWSlider, template: BWSliderTpl }]);
    }
    //endregion
})();