(function () {
    "use strict";
    //#region AlphaSlider
    var AlphaSlider = $j.classes.ColorSlider.extend("AlphaSlider", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.gradientEdit = null;
            }
        },
        //#region Methods
        destroy: function () {
            this._inherited();
            this.gradientEdit = null;
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.COLOR, AlphaSlider);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var AlphaSliderTpl = "<div id='{internalId}' data-name='{name}' data-class='AlphaSlider' class='Control Slider AlphaSlider {theme} orientation-horizontal' data-values='[1,0]' data-mode='normal' data-orientation='horizontal' data-showvalues='true' style='width:92px;height:6px;'>\
                        <input type='range' id='{internalId}_1' data-class='Thumb' class='Control {theme} orientation-horizontal' />\
                        </div>";
        $j.classes.registerTemplates([{ Class: AlphaSlider, template: AlphaSliderTpl }]);
    }
    //endregion
})();