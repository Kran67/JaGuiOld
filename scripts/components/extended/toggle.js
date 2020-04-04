//#region Import
import { Checkbox } from '/scripts/components/common/checkbox.js';
import { Tools } from '/scripts/core/tools.js';
import { Css } from '/scripts/core/css.js';
//#endregion Import
//#region Toggle
const Toggle = (() => {
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
    //#region Class Toggle
    class Toggle extends Checkbox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                if (!Core.isHTMLRenderer) {
                    this.height = 21;
                    this.width = 50;
                }
                priv.uncheckedLabel = props.hasOwnProperty('uncheckedLabel') ? 
                    props.uncheckedLabel : 
                    Core.locales.translateConstant(this.app, 'no').toUpperCase();
                priv.checkedLabel = props.hasOwnProperty('checkedLabel') ? 
                    props.checkedLabel : 
                    Core.locales.translateConstant(this.app, 'yes').toUpperCase();
                this.allowGrayed = false;
                this.autoWidth = false;
                this.caption = String.EMPTY;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        get allowGrayed() {
            return super.allowGrayed;
        }
        set allowGrayed(newValue) {
            super.allowGrayed = false;
        }
        get uncheckedLabel() {
            //#region constructor
            const priv = internal(this);
            //#endregion constructor
            return priv.uncheckedLabel;
        }
        set uncheckedLabel(newValue) {
            //#region constructor
            const priv = internal(this);
            //#endregion constructor
            if (Tools.isString(newValue)) {
                if (priv.uncheckedLabel !== newValue) {
                    priv.uncheckedLabel = newValue;
                    this.update();
                }
            }
        }
        get checkedLabel() {
            //#region constructor
            const priv = internal(this);
            //#endregion constructor
            return priv.checkedLabel;
        }
        set checkedLabel(newValue) {
            if (Tools.isString(newValue)) {
                if (priv.checkedLabel !== newValue) {
                    priv.checkedLabel = newValue;
                    this.update();
                }
            }
        }
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region constructor
            const priv = internal(this);
            const PSEUDOCSSCLASS = Types.PSEUDOCSSCLASS;
            const htmlElement = this.HTMLElement;
            //#endregion constructor
            if (!this.loading && !this.form.loading) {
                super.update();
                if (this.check) {
                    htmlElement.dataset.unchecked = priv.uncheckedLabel;
                    htmlElement.dataset.checked = priv.checkedLabel;
                    Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`);
                    Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`);
                    if (priv.checkedLabel.includes('data:image')) {
                        Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`, `content: url(${priv.checkedLabel})`);
                    }
                    if (priv.uncheckedLabel.includes('data:image')) {
                        Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`, `content: url(${priv.uncheckedLabel})`);
                    }
                }
            }
        }
        //#endregion update
        //#endregion Methods
    }
    return Toggle;
    //#endregion Toggle
})();
Object.seal(Toggle);
Core.classes.register(Types.CATEGORIES.EXTENDED, Toggle);
//#endregion Toggle
export { Toggle };
//#region Template
if (Core.isHTMLRenderer) {
    const ToggleTpl = ['<jagui-toogle id="{internalId}" data-class="Toggle" class="Control Toggle {theme} csr_default">',
        '<properties>{ "name": "{name}", "width": 50, "height": 21 }</properties></jagui-toogle>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Toggle, template: ToggleTpl }]);
}
//#endregion