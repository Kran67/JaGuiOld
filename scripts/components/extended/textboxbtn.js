//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
//#endregion Import
//#region TextBoxBtn
class TextBoxBtn extends CustomTextBoxBtn {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#endregion Methods
}
//#endregion TextBoxBtn
Object.seal(TextBoxBtn);
Core.classes.register(Types.CATEGORIES.EXTENDED, TextBoxBtn);
//#region Templates
if (Core.isHTMLRenderer) {
    var TextBoxBtnTpl = ['<jagui-textboxbtn id="{internalId}" data-class="TextBoxBtn" class="Control TextBox',
        ' TextBoxBtn {theme}"><properties>{ "name": "{name}", "left": 1120, "top": 370, "width": 121, "height": 21 }',
        '</properties></jagui-textboxbtn>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: TextBoxBtn, template: TextBoxBtnTpl }]);
}
//#endregion Templates
export { TextBoxBtn };