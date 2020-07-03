//#region Import
import { Checkbox } from '/scripts/components/common/checkbox.js';
import { Css } from '/scripts/core/css.js';
//#endregion Import
//#region Class Toggle
class Toggle extends Checkbox {
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
            core.private(this, {
                uncheckedLabel: props.hasOwnProperty('uncheckedLabel')
                    ? props.uncheckedLabel
                    : core.locales.translateConstant(this.app.locale, 'no').toUpperCase(),
                checkedLabel: props.hasOwnProperty('checkedLabel')
                    ? props.checkedLabel
                    : core.locales.translateConstant(this.app.locale, 'yes').toUpperCase()
            });
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
        //#region constructor
        const priv = core.private(this);
        //#endregion constructor
        return priv.uncheckedLabel;
    }
    set uncheckedLabel(newValue) {
        //#region constructor
        const priv = core.private(this);
        //#endregion constructor
        if (core.tools.isString(newValue) && priv.uncheckedLabel !== newValue) {
            priv.uncheckedLabel = newValue;
            this.update();
        }
    }
    //#endregion uncheckedLabel
    //#region checkedLabel
    get checkedLabel() {
        //#region constructor
        const priv = core.private(this);
        //#endregion constructor
        return priv.checkedLabel;
    }
    set checkedLabel(newValue) {
        if (core.tools.isString(newValue) && priv.checkedLabel !== newValue) {
            priv.checkedLabel = newValue;
            this.update();
        }
    }
    //#endregion checkedLabel
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region constructor
        const priv = core.private(this);
        const PSEUDOCSSCLASS = core.types.PSEUDOCSSCLASS;
        const htmlElement = this.HTMLElement;
        //#endregion constructor
        if (!this.loading && !this.form.loading) {
            super.update();
            if (this.check) {
                htmlElement.dataset.unchecked = priv.uncheckedLabel;
                htmlElement.dataset.checked = priv.checkedLabel;
                Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`);
                Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`);
                priv.checkedLabel.includes('data:image')
                    && Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`, `content: url(${priv.checkedLabel})`);
                priv.uncheckedLabel.includes('data:image')
                    && Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`, `content: url(${priv.uncheckedLabel})`);
            }
        }
    }
    //#endregion update
    //#endregion Methods
}
Object.defineProperties(Action.prototype, {
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