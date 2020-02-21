//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
import { Button } from '/scripts/components/common/button.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region TextBoxClearBtn
const TextBoxClearBtn = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class TextBoxClearBtn
    class TextBoxClearBtn extends CustomTextBoxBtn {
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
        //#region enabled
        get enabled() {
            return super.enabled;
        }
        set enabled(newValue) {
            //#region Variables déclaration
            const bHtmlElement = this.btns.first.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (this.enabled !== newValue) {
                    super.enabled(newValue);
                    if (newValue) {
                        bHtmlElement.removeAttribute("disabled");
                    } else {
                        bHtmlElement.setAttribute("disabled", "disabled");
                    }
                }
            }
        }
        //#endregion enabled
        //#endregion Getters / Setters
        //#region Methods
        //#region clearInput
        clearInput() {
            const owner = this.owner;
            if (Core.isHTMLRenderer) {
                if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                    owner.inputObj.value = owner.text = String.EMPTY;
                }
            }
            owner.HTMLElement.dataset.length = owner.inputObj.value.length;
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
            button.canFocused = false;
            btnHtmlElment = button.HTMLElement;
            btnHtmlElment.classList.add('TextBoxClearBtnButton');
            button.onClick.addListener(this.clearInput);
        }
        //#endregion loaded
        //#endregion Methods
    }
    return TextBoxClearBtn;
    //#endregion TextBoxClearBtn
})();
Object.seal(TextBoxClearBtn);
Core.classes.register(Types.CATEGORIES.EXTENDED, TextBoxClearBtn);
//#endregion TextBoxClearBtn
//#region Templates
if (Core.isHTMLRenderer) {
    const TextBoxClearBtnTpl = ['<jagui-textboxclearbtn id="{internalId}" data-class="TextBoxClearBtn" ',
        'class="Control TextBox TextBoxClearBtn {theme}"><properties>{ "name": "{name}", "width": 135, "height": 20 }',
        '</properties></jagui-textboxclearbtn>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: TextBoxClearBtn, template: TextBoxClearBtnTpl }]);
}
//#endregion
export { TextBoxClearBtn };