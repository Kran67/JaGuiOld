//#region Import
import { CustomTextControl } from "/scripts/core/customtextcontrol.js";
import { Button } from "/scripts/components/common/button.js";
//#endregion Import
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
            core.private(this, {
                btnClass: props.btnClass ? props.btnClass : Button,
                numBtns: props.hasOwnProperty('numBtns') ? props.numBtns : 1,
                autoHideButtons: props.hasOwnProperty('autoHideButtons') && core.tools.isBool(props.autoHideButtons)
                    ? props.autoHideButtons : !1
            });
            //#endregion Private Properties
            //#region Public Properties
            core.classes.newCollection(this, this, core.private(this).btnClass, 'btns');
            //#endregion Public Properties
            //#endregion Properties

        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region btnClass
    get btnClass() {
        return core.private(this).btnClass;
    }
    set btnClass(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.btnClass !== newValue
            && (priv.btnClass = newValue);
    }
    //#endregion btnClass
    //#region autoHideButtons
    get autoHideButtons() {
        return core.private(this).autoHideButtons;
    }
    set autoHideButtons(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.autoHideButtons !== newValue
            && (priv.autoHideButtons = newValue);
    }
    //#endregion autoHideButtons
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        for (let i = 0; i < priv.numBtns; i++) {
            const btn = core.classes.createComponent({
                class: priv.btnClass,
                owner: this,
                name: `${this.name}_btn${i+1}`,
                props: {
                    inForm: !1,
                    caption: '…',
                    forceDisplayVisibility: !0,
                    height: -1,
                    canFocused: !1
                },
                withTpl: !0
            });
            btn.HTMLElement.classList.add('TextBoxBtnButton');
            btn.HTMLElement.classList.remove('Control');
            this.btns.add(btn);
        }
        this.update();
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.btns.forEach(btn => {
            btn.destroy();
        });
        this.btns.clear();
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
        const priv = core.private(this);
        const visible = priv.autoHideButtons && this.text.length > 0;
        //#endregion Variables déclaration
        super.update();
        priv.autoHideButtons && this.btns.forEach(btn => {
            btn.visible = visible;
        });
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(CustomTextBoxBtn.prototype, {
    'btnClass': {
        enumerable: !0
    },
    'numBtns': {
        enumerable: !0
    },
    'autoHideButtons': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomTextBoxBtn);
//#endregion CustomTextBoxBtn
export { CustomTextBoxBtn };