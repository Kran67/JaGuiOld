//#region Imports
import { CustomTextControl } from "/scripts/core/customtextcontrol.js";
//#endregion Imports
//#region Class RoundTextBox
class RoundTextBox extends CustomTextControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //const priv = internal(this);
            if (!Core.isHTMLRenderer) {
                this.width = 121;
                this.height = 21;
            }
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
        if (htmlElement.offsetHeight < htmlElement.offsetWidth) {
            radius = Math.ceil(htmlElement.offsetHeight * 0.5);
        }
        else {
            radius = Math.ceil(htmlElement.offsetWidth * 0.5);
        }
        return radius;
    }
    //#endregion radius
    //#endregion Getters / Setters
    //#region Methods
    //#region updateRadius
    updateRadius() {
        if (this.HTMLElement) {
            this.HTMLElementStyle.borderRadius = `${this.radius}${Types.CSSUNITS.PX}`;
        }
    }
    //#endregion updateRadius
    //#endregion Methods
}
Core.classes.register(Types.CATEGORIES.EXTENDED, RoundTextBox);
//#endregion RoundTextBox


/*
    //#region Template
    if ($j.isHTMLRenderer()) {
        var RoundTextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='RoundTextBox' class='Control TextBox RoundTextBox {theme}' style='width:121px;height:21px;'>\
                         <input type='text' class='Control csr_text TextBoxInput RoundTextBoxInput {theme}' />\
                         </div>";
        $j.classes.registerTemplates([{ Class: RoundTextBox, template: RoundTextBoxTpl }]);
    }
    //#endregion
})();*/