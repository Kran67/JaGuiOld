//#region Import
import { CustomTextControl } from "/scripts/core/customtextcontrol.js";
import { Button } from "/scripts/components/common/button.js";
//#endregion Import
//#region Class CustomButton
class CustomTextBoxBtn extends CustomTextControl {
    //#region Private fields
    #btnClass;
    #numBtns;
    #autoHideButtons;
    #btns = [];
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        !props.btns && (props.btns = 1);
        if (owner) {
            super(owner, props);
            //#region Properties
            //#region Private Properties
            this.#btnClass = props.btnClass ? props.btnClass : Button;
            this.#numBtns = props.hasOwnProperty('numBtns') ? props.numBtns : 1;
            this.#autoHideButtons = props.hasOwnProperty('autoHideButtons') && core.tools.isBool(props.autoHideButtons)
                ? props.autoHideButtons : !1;
            //#endregion Private Properties
            //#region Public Properties
            this.#btns.convertToCollection(owner, this.#btnClass);
            //#endregion Public Properties
            //#endregion Properties

        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region btns
    get btns() {
        return this.#btns;
    }
    //#endregion btns
    //#region btnClass
    get btnClass() {
        return this.#btnClass;
    }
    set btnClass(newValue) {
        core.tools.isNumber(newValue) && this.#btnClass !== newValue
            && (this.#btnClass = newValue);
    }
    //#endregion btnClass
    //#region autoHideButtons
    get autoHideButtons() {
        return this.#autoHideButtons;
    }
    set autoHideButtons(newValue) {
        core.tools.isBool(newValue) && this.#autoHideButtons !== newValue
            && (this.#autoHideButtons = newValue);
    }
    //#endregion autoHideButtons
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        for (let i = 0; i < this.#numBtns; i++) {
            const btn = core.classes.createComponent({
                class: this.#btnClass,
                owner: this,
                name: `${this.name}_btn${i + 1}`,
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
            //btn.HTMLElement.classList.remove('Control');
            this.#btns.add(btn);
        }
        this.update();
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.#btns.forEach(btn => {
            btn.destroy();
        });
        this.#btns.clear();
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
        const visible = this.#autoHideButtons && this.text.length > 0;
        //#endregion Variables déclaration
        super.update();
        this.#autoHideButtons && this.#btns.forEach(btn => {
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