//#region Imports
import { CustomTextControl } from '/scripts/core/customtextcontrol.js';
//#endregion Imports
//#region Class RoundTextBox
class RoundTextBox extends CustomTextControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            if (!core.isHTMLRenderer) {
                props.width = 121;
                props.height = 21;
            }
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        super.width = newValue;
        this.updateRadius();
    }
    //#endregion width
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        super.height = newValue;
        this.updateRadius();
    }
    //#endregion height
    //#region radius
    get radius() {
        const htmlElement = this.HTMLElement;
        let radius;
        radius = htmlElement.offsetHeight < htmlElement.offsetWidth
            ? Math.ceil(htmlElement.offsetHeight * 0.5)
            : Math.ceil(htmlElement.offsetWidth * 0.5);
        return radius;
    }
    //#endregion radius
    //#endregion Getters / Setters
    //#region Methods
    //#region updateRadius
    updateRadius() {
        this.HTMLElement && (this.HTMLElementStyle.borderRadius = `${this.radius}${core.types.CSSUNITS.PX}`);
    }
    //#endregion updateRadius
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.EXTENDED, RoundTextBox);
//#endregion RoundTextBox
//#region Template
if (core.isHTMLRenderer) {
    const RoundTextBoxTpl = ['<jagui-roundtextbox id="{internalId}" data-class="RoundTextBox" class="Control TextBox RoundTextBox {theme}">',
        '<properties>{ "name": "{name}" }</properties></jagui-roundtextbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: RoundTextBox, template: RoundTextBoxTpl }]);
}
//#endregion
export { RoundTextBox };