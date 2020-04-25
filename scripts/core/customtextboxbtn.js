//#region Import
import { CustomTextControl } from "/scripts/core/customtextcontrol.js";
import { Button } from "/scripts/components/common/button.js";
//#endregion Import
//#region CustomTextBoxBtn
const CustomTextBoxBtn = (() => {
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
    //#region Class CustomButton
    class CustomTextBoxBtn extends CustomTextControl {
        //#region constructor
        constructor(owner, props) {
            if (!props) props = {};
            if (!props.btns) props.btns = 1;
            if (owner) {
                super(owner, props);
                //#region Properties
                //#region Private Properties
                const priv = internal(this);
                priv.btnClass = props.btnClass ? props.btnClass : Button;
                priv.numBtns = props.hasOwnProperty('numBtns') ? props.numBtns : 1;
                priv.autoHideButtons = props.hasOwnProperty('autoHideButtons') && core.tools.isBool(props.autoHideButtons)
                    ? props.autoHideButtons : !1;
                //#endregion Private Properties
                //#region Public Properties
                classes.newCollection(this, this, priv.btnClass, 'btns');
                Object.defineProperties(this, {
                    'btnClass': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).btnClass;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            core.tools.isNumber(newValue) && priv.btnClass !== newValue ? priv.btnClass = newValue : 1;
                        }
                    },
                    'autoHideButtons': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).autoHideButtons;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            core.tools.isBool(newValue) && priv.autoHideButtons !== newValue ? priv.autoHideButtons = newValue : 1;
                        }
                    }
                });
                //#endregion Public Properties
                //#endregion Properties

            }
        }
        //#endregion constructor
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            for (let i = 0; i < priv.numBtns; i++) {
                const btn = core.classes.createComponent({
                    class: priv.btnClass,
                    owner: this,
                    props: {
                        inForm: !1,
                        caption: '…',
                        forceDisplayVisibility: !0,
                        height: -1
                    },
                    withTpl: !0
                });
                btn.HTMLElement.classList.add('TextBoxBtnButton');
                btn.name = `btn${i}`;
                btn.canFocused = !1;
                priv.btns.add(btn);
            }
            this.update();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.btns.forEach(btn => {
                btn.destroy();
            });
            this.btns.clear();
            priv.btnClass = null;
            priv.numBtns = null;
            priv.autoHideButtons = null;
            delete this.btnClass;
            delete this.autoHideButtons;
            delete this.btns;
            super.destroy();
        }
        //#endregion destroy
        //#region keyUp
        keyUp() {
            super.keyUp();
            this.update();
        }
        //#endregion keyUp
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const visible = priv.autoHideButtons && this.text.length > 0;
            //#endregion Variables déclaration
            super.update();
            if (priv.autoHideButtons) {
                this.btns.forEach(btn => {
                    btn.visible = visible;
                });
            }
        }
        //#endregion update
        //#endregion Methods
    }
    return CustomTextBoxBtn;
    //#endregion CustomTextBoxBtn
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomTextBoxBtn);
//#endregion CustomTextBoxBtn
export { CustomTextBoxBtn };