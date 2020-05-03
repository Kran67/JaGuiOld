//#region Imports
import { GraphicControl } from '/scripts/core/graphiccontrol.js';
import { Color } from '/scripts/core/color.js';
//#endregion Imports
//#region ColorBox
class ColorBox extends GraphicControl {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //props.hasOwnProperty('color')?this.fillColor.assign(Color.parse(props.color)):1;
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
        if (newValue instanceof Color && !this.fillColor.equals(newValue)) {
            this.fillColor.assign(newValue);
            if (core.isHTMLRenderer) {
                !this.loading && !this.form.loading ? this.update() : 1;
            } else {
                this.allowUpdate ? this.update() : 1;
                this.redraw();
            }
        }
    }
    //#endregion color
    //#endregion Getter / Setter
    //#region Methods
    //#region update
    update() {
        core.isHTMLRenderer && this.HTMLElement
            ? this.HTMLElementStyle.boxShadow = `inset 0 0 0 1000px ${this.fillColor.toRGBAString()}` : 1;
    }
    //#endregion update
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.COLOR, ColorBox);
//#endregion ColorBox
//#region Templates
if (core.isHTMLRenderer) {
    const ColorBoxTpl = ['<jagui-colorbox id="{internalId}" data-class="ColorBox" class="Control ColorBox">',
        '<properties>{ "name": "{name}", "color": "blue" }</properties></jagui-colorbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ColorBox, template: ColorBoxTpl }]);
}
//#endregion
export { ColorBox };