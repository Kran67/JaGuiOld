//#region Import
import { CustomTextControl } from "/scripts/core/customtextcontrol.js";
import { Button } from "/scripts/components/common/button.js";
import { Tools } from "/scripts/core/tools.js";
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
                const priv = internal(this);
                priv.btnClass = null;
                priv.btns = [];
                priv.btnClass = props.btnClass ? props.btnClass : Button;
                priv.numBtns = props.hasOwnProperty('numBtns') ? props.numBtns : 1;
                priv.autoHideButtons = props.hasOwnProperty('autoHideButtons') && Tools.isBool(props.autoHideButtons) ? props.autoHideButtons : false;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region btnClass
        get btnClass() {
            return internal(this).btnClass;
        }
        set btnClass(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.btnClass !== newValue) {
                    priv.btnClass = newValue;
                }
            }
        }
        //#endregion btnClass
        //#region btns
        get btns() {
            return internal(this).btns;
        }
        //#endregion btns
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            for (let i = 0; i < priv.numBtns; i++) {
                const btn = Core.classes.createComponent({
                    class: priv.btnClass,
                    owner: this,
                    props: {
                        inForm: false,
                        caption: '…',
                        visible: !priv.autoHideButtons
                    },
                    withTpl: true
                });
                btn.HTMLElement.classList.add('TextBoxBtnButton');
                btn.name = `btn${i}`;
                btn.canFocused = false;
                priv.btns.add(btn);
            }
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const btns = priv.btns;
            //#endregion Variables déclaration
            btns.forEach(btn => {
                btn.destroy();
            });
            btns.clear();
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
            const btns = priv.btns;
            //#endregion Variables déclaration
            super.update();
            if (priv.autoHideButtons) {
                btns.forEach(btn => {
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
//#endregion CustomTextBoxBtn
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTextBoxBtn);
export { CustomTextBoxBtn };