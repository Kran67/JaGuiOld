//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
import { Button } from '/scripts/components/common/button.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region PasswordTextBox
const PasswordTextBox = (() => {
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
    //#region Class PasswordTextBox
    class PasswordTextBox extends CustomTextBoxBtn {
        //#region constructor
        constructor(owner, props) {
            const HTMLInputTypes = Types.HTMLINPUTTYPES;
            props = !props ? {} : props;
            if (owner) {
                props.type = HTMLInputTypes.PASSWORD;
                super(owner, props);
                const priv = internal(this);
                if (!Core.isHTMLRenderer) {
                    this.width = 121;
                    this.height = 21;
                }
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region enabled
        get enabled() {
            return super.enabled;
        }
        set enabled(newValue) {
            const btnHtmlElment = this.btns.first.HTMLElement;
            if (Tools.isBool(newValue)) {
                if (this.enabled !== newValue) {
                    super.enabled = newValue;
                    if (this.enabled) {
                        btnHtmlElment.removeAttribute("disabled");
                    } else {
                        btnHtmlElment.setAttribute("disabled", "disabled");
                    }
                }
            }
        }
        //#endregion enabled
        //#endregion Getters / Setters
        //#region Methods
        //#region revealPassword
        revealPassword() {
            //#region Variables déclaration
            const HTMLInputTypes = Types.HTMLINPUTTYPES;
            const inputObj = this.owner.inputObj;
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (Core.isHTMLRenderer) {
                    if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && Core.mouse.eventType === Mouse.MOUSEEVENTS.DOWN) {
                        inputObj.setAttribute("type", HTMLInputTypes.TEXT);
                    } else {
                        inputObj.setAttribute("type", HTMLInputTypes.PASSWORD);
                        inputObj.focus();
                    }
                }
            }
        }
        //#endregion revealPassword
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.type = null;
            super.destroy();
        }
        //#ndregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            let btnHtmlElment;
            let button;
            //#endregion Variables déclaration
            super.loaded();
            this.btns.push(
                Core.classes.createComponent({
                    class: Button,
                    owner: this,
                    props: {
                        inForm: false,
                        caption: '0',
                        fontFamily: 'JaGui'
                    },
                    withTpl: true
                })
            );
            button = this.btns.first;
            button.canFocused = false;
            btnHtmlElment = button.HTMLElement;
            btnHtmlElment.classList.add('PasswordTextBoxButton');
            button.onMouseDown.addListener(this.revealPassword);
            button.onMouseUp.addListener(this.revealPassword);
            button.onMouseLeave.addListener(this.revealPassword);
        }
        //#endregion loaded
        //#endregion Methods
    }
    return PasswordTextBox;
    //#endregion PasswordTextBox
})();
Core.classes.register(Types.CATEGORIES.COMMON, PasswordTextBox);
//#endregion PasswordTextBox
//#region Templates
if (Core.isHTMLRenderer) {
    const PasswordTextBoxTpl = ['<jagui-passwordtextbox id="{internalId}" data-class="PasswordTextBox" ',
        'class="Control TextBox PasswordTextBox {theme}"><properties>{ "name": "{name}", "width": 135, "height": 20 }',
        '</properties></jagui-passwordtextbox>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: PasswordTextBox, template: PasswordTextBoxTpl }]);
}
//#endregion