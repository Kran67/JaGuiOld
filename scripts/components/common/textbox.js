//#region Imports
import { CustomTextControl } from "/scripts/core/customtextcontrol.js";
//#endregion Imports
//#region Class TextBox
class TextBox extends CustomTextControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            if (!Core.isHTMLRenderer) {
                this.width = 121;
                this.height = 21;
            }
        }
    }
    //#endregion constructor
}
Core.classes.register(Types.CATEGORIES.COMMON, TextBox);
//#endregion Class TextBox
export { TextBox };
//#region Templates
if (Core.isHTMLRenderer) {
    const TextBoxTpl = ["<jagui-textbox id=\"{internalId}\" data-class=\"TextBox\" class=\"Control TextBox {theme}\">",
        "<properties>{ \"name\": \"{name}\", \"width\": 135, \"height\": 20 }</properties></jagui-textbox>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: TextBox, template: TextBoxTpl }]);
}
//#endregion