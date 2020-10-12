//#region Import
import { Checkbox } from '/scripts/components/common/checkbox.js';
import { Css } from '/scripts/core/css.js';
//#endregion Import
//#region Class Toggle
class Toggle extends Checkbox {
    //#region Private fields
    #uncheckedLabel;
    #checkedLabel;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowGrayed = !1;
            props.autoWidth = !1;
            props.caption = String.EMPTY;
            if (!core.isHTMLRenderer) {
                props.height = 21;
                props.width = 50;
            }
            super(owner, props);
            this.#uncheckedLabel = props.hasOwnProperty('uncheckedLabel')
                    ? props.uncheckedLabel
                    : core.locales.translateConstant(this.app.locale, 'no').toUpperCase();
            this.#checkedLabel = props.hasOwnProperty('checkedLabel')
                    ? props.checkedLabel
                    : core.locales.translateConstant(this.app.locale, 'yes').toUpperCase();
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region allowGrayed
    get allowGrayed() {
        return super.allowGrayed;
    }
    set allowGrayed(newValue) {
        super.allowGrayed = !1;
    }
    //#endregion allowGrayed
    //#region uncheckedLabel
    get uncheckedLabel() {
        return this.#uncheckedLabel;
    }
    set uncheckedLabel(newValue) {
        if (core.tools.isString(newValue) && this.#uncheckedLabel !== newValue) {
            this.#uncheckedLabel = newValue;
            this.update();
        }
    }
    //#endregion uncheckedLabel
    //#region checkedLabel
    get checkedLabel() {
        return this.#checkedLabel;
    }
    set checkedLabel(newValue) {
        if (core.tools.isString(newValue) && this.#checkedLabel !== newValue) {
            this.#checkedLabel = newValue;
            this.update();
        }
    }
    //#endregion checkedLabel
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region constructor
        const PSEUDOCSSCLASS = core.types.PSEUDOCSSCLASS;
        const htmlElement = this.HTMLElement;
        //#endregion constructor
        if (!this.loading && !this.form.loading) {
            super.update();
            if (this.check) {
                htmlElement.dataset.unchecked = this.#uncheckedLabel;
                htmlElement.dataset.checked = this.#checkedLabel;
                Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`);
                Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`);
                this.#checkedLabel.includes('data:image')
                    && Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`, `content: url(${this.#checkedLabel})`);
                this.#uncheckedLabel.includes('data:image')
                    && Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`, `content: url(${this.#uncheckedLabel})`);
            }
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(Toggle.prototype, {
    'uncheckedLabel': {
        enumerable: !0
    },
    'checkedLabel': {
        enumerable: !0
    }
});
Object.seal(Toggle);
core.classes.register(core.types.CATEGORIES.EXTENDED, Toggle);
//#endregion Toggle
//#region Template
if (core.isHTMLRenderer) {
    const ToggleTpl = ['<jagui-toogle id="{internalId}" data-class="Toggle" class="Control Toggle {theme} csr_default">',
        '<properties>{ "name": "{name}", "width": 50, "height": 21 }</properties></jagui-toogle>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Toggle, template: ToggleTpl }]);
}
//#endregion
export { Toggle };