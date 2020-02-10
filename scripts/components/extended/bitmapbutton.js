//#region Import
import { ButtonGlyph } from "/scripts/components/common/buttonglyph.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region BitmapButton
class BitmapButton extends ButtonGlyph {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion Constructor
}
//#endregion BitmapButton
Core.classes.register(Types.CATEGORIES.EXTENDED, BitmapButton);
export { BitmapButton };
//#region Template
if (Core.isHTMLRenderer) {
    const BitmapButtonTpl = "<jagui-bitmapbutton id=\"{internalId}\" data-class=\"BitmapButton\" class=\"Control Button ButtonGlyph BitmapButton {theme} csr_default\"><properties>{ \"name\": \"{name}\" }</properties></jagui-bitmapbutton>";
    Core.classes.registerTemplates([{ Class: BitmapButton, template: BitmapButtonTpl }]);
}
//#endregion Template