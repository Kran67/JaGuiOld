//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
class TextBoxClearBtn extends CustomTextBoxBtn {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.autoHideButtons = !0;
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region enabled
    get enabled() {
        return super.enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const bHtmlElement = this.btns.first.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.enabled !== newValue) {
            super.enabled(newValue);
            newValue
                ? bHtmlElement.removeAttribute("disabled")
                : bHtmlElement.setAttribute("disabled", "disabled");
        }
    }
    //#endregion enabled
    //#endregion Getters / Setters
    //#region Methods
    //#region clearInput
    clearInput() {
        const owner = this.owner;
        core.isHTMLRenderer && core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && (owner.inputObj.value = owner.text = String.EMPTY);
        owner.update();
        owner.inputObj.focus();
    }
    //#endregion clearInput
    //#region loaded
    loaded() {
        //#region Variables déclaration
        let btnHtmlElment;
        let button;
        //#endregion Variables déclaration
        super.loaded();
        button = this.btns.first;
        button.caption = 'C';
        button.fontFamily = 'JaGui';
        button.canFocused = !1;
        btnHtmlElment = button.HTMLElement;
        btnHtmlElment.classList.add('TextBoxClearBtnButton');
        button.onClick.addListener(this.clearInput);
    }
    //#endregion loaded
    //#endregion Methods
}
Object.freeze(Object.seal(TextBoxClearBtn));
core.classes.register(core.types.CATEGORIES.EXTENDED, TextBoxClearBtn);
//#endregion TextBoxClearBtn
//#region Templates
if (core.isHTMLRenderer) {
    const TextBoxClearBtnTpl = ['<jagui-textboxclearbtn id="{internalId}" data-class="TextBoxClearBtn" ',
        'class="Control TextBox TextBoxClearBtn {theme}"><properties>{ "name": "{name}", "width": 135, "height": 20 }',
        '</properties></jagui-textboxclearbtn>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: TextBoxClearBtn, template: TextBoxClearBtnTpl }]);
}
//#endregion
export { TextBoxClearBtn };