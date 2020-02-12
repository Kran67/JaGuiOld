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
            this.HTMLElementStyle.boxShadow = `inset 0 0 0 1000px ${this.fillColor.toRGBAString()}`;
        }
    }
    //#endregion update
    //#endregion Methods
}
//#endregion ColorBox
Core.classes.register(Types.CATEGORIES.COLOR, ColorBox);
//#region Templates
if (Core.isHTMLRenderer) {
    const ColorBoxTpl = ["<jagui-colorbox id=\"{internalId}\" data-class=\"ColorBox\" class=\"Control ColorBox\">",
        "<properties>{ \"name\": \"{name}\", \"color\": \"blue\" }</properties></jagui-colorbox>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ColorBox, template: ColorBoxTpl }]);
}
//endregion