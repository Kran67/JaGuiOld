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
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
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
        //#endregion Getters / Setters
        //#region Methods
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
        loaded() {
            //#region Variables déclaration
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
                        caption: 'C',
                        fontFamily: 'JaGui'
                    },
                    withTpl: true
                })
            );
            button = this.btns.first;
            button.canFocused = false;
            btnHtmlElment = button.HTMLElement;
            btnHtmlElment.classList.add('TextBoxClearBtnButton');
            button.onClick.addListener(this.clearInput);
        }
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
    const TextBoxClearBtnTpl = "<div id='{internalId}' data-name='{name}' data-class='TextBoxClearBtn' class='Control TextBox TextBoxClearBtn {theme}' data-length='0' style='width:121px;height:21px;'>\
                            <input type='text' class='Control csr_text TextBoxInput TextBoxClearBtnInput {theme}' />\
                            <button id='{internalId}_1' data-class='TextButton' class='Control TextButton TextBoxClearBtnButton {theme}'></button>\
                            </div>";
    Core.classes.registerTemplates([{ Class: TextBoxClearBtn, template: TextBoxClearBtnTpl }]);
}
//#endregion

/*(function () {
    //#region TextBoxClearBtn
    var TextBoxClearBtn = $j.classes.CustomTextBoxBtn.extend("TextBoxClearBtn", {
        init: function (owner, props) {
            if (owner) {
                props = !props ? {} : props;
                props._btnClass = $j.classes.TextButton;
                this._inherited(owner, props);
                //#region Private
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 121;
                    this.height = 21;
                }
            }
        },
        //#region Setters
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this._inherited(newValue);
                if (this.enabled) this._btns.first()._HTMLElement.removeAttribute("disabled");
                else this._btns.first()._HTMLElement.setAttribute("disabled", "disabled");
            }
        },
        //#endregion
        //#region Methods
        clearInput: function (event) {
            $j.mouse.getMouseInfos(event);
            if ($j.isHTMLRenderer()) {
                if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                    this.jsObj._owner._inputObj.value = this.jsObj._owner.text = String.EMPTY;
                }
            } else {
            }
            this.jsObj._owner._HTMLElement.dataset.length = this.jsObj._owner._inputObj.value.length;
            this.jsObj._owner.update();
            this.jsObj._owner._inputObj.focus();
        },
        loaded: function () {
            this._inherited();
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.CLICK, this.clearInput);
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.EXTENDED, TextBoxClearBtn);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var TextBoxClearBtnTpl = "<div id='{internalId}' data-name='{name}' data-class='TextBoxClearBtn' class='Control TextBox TextBoxClearBtn {theme}' data-length='0' style='width:121px;height:21px;'>\
                            <input type='text' class='Control csr_text TextBoxInput TextBoxClearBtnInput {theme}' />\
                            <button id='{internalId}_1' data-class='TextButton' class='Control TextButton TextBoxClearBtnButton {theme}'></button>\
                            </div>";
        $j.classes.registerTemplates([{ Class: TextBoxClearBtn, template: TextBoxClearBtnTpl }]);
    }
    //endregion
})();*/