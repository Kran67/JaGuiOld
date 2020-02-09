//#region Imports
import { Checkbox } from "/scripts/components/common/checkbox.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Imports
//#region RadioButton
const RadioButton = (() => {
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
    //#region Class RadioButton
    class RadioButton extends Checkbox {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.groupName = String.EMPTY;
                priv.checkChar = "3";
                priv.grayedChar = String.EMPTY;
            }
        }
        //#endregion Constructor
        //#region Getter / Setter
        //#region allowGrayed
        get groupName() {
            return internal(this).groupName;
        }
        set groupName(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.groupName !== newValue) {
                    priv.groupName = newValue;
                }
            }
        }
        //#endregion allowGrayed
        //#region allowGrayed
        get allowGrayed() {
            return super.allowGrayed;
        }
        set allowGrayed(newValue) {
            this.allowGrayed = false;
        }
        //#endregion allowGrayed
        //#region isChecked
        get isChecked() {
            return super.isChecked;
        }
        set isChecked(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (this.isChecked !== newValue) {
                    if (newValue) {
                        super.isChecked = newValue;
                    }
                    // group
                    let c = 0;
                    let cc = 0;
                    if (this.form) {
                        const list = this.owner.components;
                        //for (let i = 0, l = list.length; i < l; i++)
                        list.forEach(comp => {
                            if (comp instanceof Core.classes.RadioButton && (comp !== this) && (comp.groupName === priv.groupName)) {
                                if (comp.isChecked) cc++;
                                if (newValue) {
                                    comp.isChecked = false;
                                }
                                c++;
                            }
                        });
                    }
                    // check
                    if (!newValue && c === 0 || !newValue && cc === 0) {
                        return;
                    }
                    super.isChecked = newValue;
                    if (!Core.isHTMLRenderer) {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    } else {
                        this.update();
                    }
                    // event
                    if (!this.updating) {
                        this.onChange.invoke();
                    }
                }
            }
        }
        //#endregion isChecked
        //#endregion Getter / Setter
        //#region Methods
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.groupName = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return RadioButton;
    //#endregion RadioButton
})();
//#endregion RadioButton
Core.classes.register(Types.CATEGORIES.COMMON, RadioButton);
//#region Template
if (Core.isHTMLRenderer) {
    const RadioButtonTpl = ["<jagui-radiobutton id=\"{internalId}\" data-class=\"RadioButton\" class=\"Control RadioButton {theme}\">",
        "<properties>{ \"name\": \"{name}\", \"height\": 16 }</properties><input type=\"radio\" class=\"Control RadioButtonInput\" />",
        "<div class=\"Control {theme} RadioButtonCheck\"></div>{caption}</jagui-radiobutton>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: RadioButton, template: RadioButtonTpl }]);
}
//#endregion
export { RadioButton };
