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
        //#endregion Getters / Setters
        //#region Methods
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
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.type = null;
            super.destroy();
        }
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
        //#endregion Methods
    }
    return PasswordTextBox;
    //#endregion PasswordTextBox
})();
Core.classes.register(Types.CATEGORIES.COMMON, PasswordTextBox);
//#endregion PasswordTextBox
//#region Templates
if (Core.isHTMLRenderer) {
    const PasswordTextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='PasswordTextBox' class='Control TextBox PasswordTextBox {theme}' data-length='0' style='width:121px;height:21px;'>\
                        <input type='password' placeholder='type your password here' class='Control csr_text {theme} TextBoxInput PasswordTextBoxInput' />\
                        <button id='{internalId}_1' data-class='TextButton' class='Control TextButton {theme} PasswordTextBoxButton csr_default'></button>\
                        </div>";
    Core.classes.registerTemplates([{ Class: PasswordTextBox, template: PasswordTextBoxTpl }]);
}
//#endregion

/*(function () {
    //#region PasswordTextBox
    var PasswordTextBox = $j.classes.CustomTextBoxBtn.extend("PasswordTextBox", {
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
                $j.tools.addPropertyFromSet(this, "type", $j.types.HTMLInputTypes, $j.types.HTMLInputTypes.PASSWORD);
                this.text = String.EMPTY;
            }
        },
        //#region Setters
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this._inherited(newValue);
                if (this.enabled) this._btn._HTMLElement.removeAttribute("disabled");
                else this._btns.first()._HTMLElement.setAttribute("disabled", "disabled");
            }
        },
        //#endregion
        //#region Methods
        //update:function() {
        //  if (this._loading||this.form._loading) return;
        //  this._inherited();
        //  //this.recalcInputWidth();
        //},
        revealPassword: function (event) {
            if (!this.jsObj.isEnabled()) return;
            $j.mouse.getMouseInfos(event);
            if ($j.isHTMLRenderer()) {
                if ($j.mouse.button === $j.types.mouseButtons.LEFT && $j.mouse.eventType === $j.types.mouseEvents.DOWN) this.jsObj._owner._inputObj.setAttribute("type", $j.types.HTMLInputTypes.TEXT);
                else {
                    this.jsObj._owner._inputObj.setAttribute("type", $j.types.HTMLInputTypes.PASSWORD);
                    this.jsObj._owner._inputObj.focus();
                }
            } else {
            }
        },
        //keyUp:function() {
        //  this._inherited();
        //  this.recalcInputWidth();
        //},
        //recalcInputWidth:function() {
        //  if (this._inputObj)) {
        //    if (this._inputObj.value.length===0) {
        //      this._inputObj.style.width="calc(100% - 4px)";
        //      this._btns.first()._HTMLElementStyle.display=$j.types.displays.NONE;
        //      //this._btns.first().setVisible(false);
        //    } else {
        //      this._inputObj.style.width="calc(100% - 20px)";
        //      this._btns.first()._HTMLElementStyle.display=$j.types.displays.BLOCK;
        //      //this._btns.first().setVisible(true);
        //    }
        //  }
        //},
        destroy: function () {
            this._inherited();
            this.type = null;
            this.text = null;
        },
        loaded: function () {
            this._inherited();
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.DOWN, this.revealPassword);
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.UP, this.revealPassword);
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.OUT, this.revealPassword);
            //this.recalcInputWidth();
            //this._btns.first().setCaption('0');
        }
        //#endregion
    });
    $j.classes.register($j.types.categories.COMMON, PasswordTextBox);
    //#endregion
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var PasswordTextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='PasswordTextBox' class='Control TextBox PasswordTextBox {theme}' data-length='0' style='width:121px;height:21px;'>\
                            <input type='password' placeholder='type your password here' class='Control csr_text {theme} TextBoxInput PasswordTextBoxInput' />\
                            <button id='{internalId}_1' data-class='TextButton' class='Control TextButton {theme} PasswordTextBoxButton csr_default'></button>\
                            </div>";
        $j.classes.registerTemplates([{ Class: PasswordTextBox, template: PasswordTextBoxTpl }]);
    }
    //endregion
})();*/