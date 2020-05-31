//#region Imports
import { Checkbox } from '/scripts/components/common/checkbox.js';
//#endregion Imports
//#region Class RadioButton
class RadioButton extends Checkbox {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                groupName: String.EMPTY,
                checkChar: '3',
                grayedChar: String.EMPTY
            });
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region allowGrayed
    get groupName() {
        return core.private(this).groupName;
    }
    set groupName(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.groupName !== newValue && (priv.groupName = newValue);
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
    //#region isChecked
    get isChecked() {
        return super.isChecked;
    }
    set isChecked(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.isChecked !== newValue) {
            newValue && (super.isChecked = newValue);
            // group
            let c = 0;
            let cc = 0;
            if (this.form) {
                const list = this.owner.components;
                list.forEach(comp => {
                    if (comp instanceof core.classes.RadioButton && comp !== this && comp.groupName === priv.groupName) {
                        comp.isChecked && cc++;
                        newValue && (comp.isChecked = !1);
                        c++;
                    }
                });
            }
            // check
            if (!newValue && c === 0 || !newValue && cc === 0) {
                return;
            }
            super.isChecked = newValue;
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
    //#endregion isChecked
    //#endregion Getters / Setters
    //#region Methods
    //#endregion Methods
}
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
