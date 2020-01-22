//#region Imports
import { GraphicControl } from "/scripts/core/graphiccontrol.js";
import { Color } from "/scripts/core/color.js";
//#endregion Imports
//#region ColorBox
class ColorBox extends GraphicControl {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            props.hasOwnProperty("color")?this.fillColor.assign(Color.parse(props.color)):void(0);
            delete this.tabOrder;
        }
    }
    //#endregion Constructor
    //#region Getter / Setter
    //#region color
    get color() {
        return this.fillColor;
    }
    set color(newValue) {
        if (newValue instanceof Color) {
            if (!this.fillColor.equals(newValue)) {
                this.fillColor.assign(newValue);
                if (Core.isHTMLRenderer) {
                    if (!this.loading && !this.form.loading) {
                        this.update();
                    }
                } else {
                    if (this.allowUpdate) {
                        this.update();
                    }
                    this.redraw();
                }
            }
        }
    }
    //#endregion color
    //#endregion Getter / Setter
    //#region Methods
    //#region update
    update() {
        if (Core.isHTMLRenderer && this.HTMLElement) {
            this.HTMLElementStyle.boxShadow = "inset 0 0 0 1000px " + this.fillColor.toRGBAString();
        }
    }
    //#endregion update
    //#region loaded
    loaded() {
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
}
//#endregion ColorBox
Core.classes.register(Types.CATEGORIES.COLOR, ColorBox);
/*(function () {
    "use strict";
    var ColorBox = $j.classes.GraphicControl.extend("ColorBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                delete this.tabOrder;
            }
        },
        //#region Setter
        setColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.fillColor.equals(newValue)) {
                this.fillColor.assign(newValue);
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            //if (this._loading||this.form._loading) return;
            if (!this._HTMLElement) return;
            this._HTMLElementStyle.boxShadow = "inset 0 0 0 1000px " + this.fillColor.toARGBString();
            this._HTMLElement.dataset.color = this.fillColor.toARGBString();
        },
        updateFromHTML: function () {
            var bshadow = getComputedStyle(this._HTMLElement).BoxShadow, data = this._HTMLElement.dataset.color;
            if (data) this.fillColor.assign(_colors.parse(data));
            if (bshadow && bshadow !== String.EMPTY) {
                bshadow = $j.tools.text.replace(bshadow, ", ", ",");
                bshadow = bshadow.split(String.SPACE);
            }
            this._inherited();
        },
        loaded: function () {
            this._inherited();
            this.update();
        }
        //#endregion
    });
    $j.classes.register($j.types.categories.COLOR, ColorBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ColorBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='ColorBox' class='Control ColorBox' data-color='blue' style='width:50px;height:50px;'></div>";
        $j.classes.registerTemplates([{ Class: ColorBox, template: ColorBoxTpl }]);
    }
    //endregion
})();*/