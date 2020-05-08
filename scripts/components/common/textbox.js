//#region Imports
import { CustomTextControl } from '/scripts/core/customtextcontrol.js';
//#endregion Imports
//#region Class TextBox
class TextBox extends CustomTextControl {
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
}
core.classes.register(core.types.CATEGORIES.COMMON, TextBox);
//#endregion Class TextBox
//#region Templates
if (core.isHTMLRenderer) {
    const TextBoxTpl = ['<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}">',
        '<properties>{ "name": "{name}", "width": 135, "height": 20 }</properties></jagui-textbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: TextBox, template: TextBoxTpl }]);
}
//#endregion
export { TextBox };