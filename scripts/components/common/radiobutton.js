//#region Imports
import { Checkbox } from '/scripts/components/common/checkbox.js';
//#endregion Imports
//#region Class RadioButton
class RadioButton extends Checkbox {
    //#region Private fields
    #groupName = String.EMPTY;
    #checkChar = '3';
    #grayedChar = String.EMPTY;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region allowGrayed
    get groupName() {
        return this.#groupName;
    }
    set groupName(newValue) {
        core.tools.isString(newValue) && this.#groupName !== newValue && (this.#groupName = newValue);
    }
    //#endregion allowGrayed
    //#region allowGrayed
    get allowGrayed() {
        return super.allowGrayed;
    }
    set allowGrayed(newValue) {
        this.allowGrayed = !1;
    }
    //#endregion allowGrayed
    //#region checked
    get checked() {
        return super.checked;
    }
    set checked(newValue) {
        if (core.tools.isBool(newValue) && this.checked !== newValue) {
            newValue && (super.checked = newValue);
            // group
            let c = 0;
            let cc = 0;
            if (this.form) {
                const list = this.owner.components;
                list.forEach(comp => {
                    if (comp instanceof core.classes.RadioButton && comp !== this && comp.groupName === this.#groupName) {
                        comp.checked && cc++;
                        newValue && (comp.checked = !1);
                        c++;
                    }
                });
            }
            // check
            if (!newValue && c === 0 || !newValue && cc === 0) {
                return;
            }
            super.checked = newValue;
            if (!core.isHTMLRenderer) {
                this.allowUpdate && this.update();
                this.redraw();
            } else {
                this.update();
            }
            // event
            !this.updating && this.onChange.invoke();
        }
    }
    //#endregion checked
    //#endregion Getters / Setters
    //#region Methods
    //#endregion Methods
}
Object.defineProperties(RadioButton.prototype, {
    'groupName': {
        enumerable: !0
    },
    'checkChar': {
        enumerable: !0
    },
    'grayedChar': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, RadioButton);
//#endregion RadioButton
//#region Template
if (core.isHTMLRenderer) {
    const RadioButtonTpl = ['<jagui-radiobutton id="{internalId}" data-class="RadioButton" class="Control RadioButton {theme}">',
        '<properties>{ "name": "{name}", "height": 16 }</properties>{caption}</jagui-radiobutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: RadioButton, template: RadioButtonTpl }]);
}
//#endregion
export { RadioButton };
