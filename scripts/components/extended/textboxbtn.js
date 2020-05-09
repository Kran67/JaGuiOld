//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
//#endregion Import
//#region TextBoxBtn
class TextBoxBtn extends CustomTextBoxBtn {}
Object.seal(TextBoxBtn);
core.classes.register(core.types.CATEGORIES.EXTENDED, TextBoxBtn);
//#endregion TextBoxBtn
//#region Templates
if (core.isHTMLRenderer) {
    var TextBoxBtnTpl = ['<jagui-textboxbtn id="{internalId}" data-class="TextBoxBtn" class="Control TextBox',
        ' TextBoxBtn {theme}"><properties>{ "name": "{name}", "left": 1120, "top": 370, "width": 121, "height": 21 }',
        '</properties></jagui-textboxbtn>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: TextBoxBtn, template: TextBoxBtnTpl }]);
}
//#endregion Templates
export { TextBoxBtn };