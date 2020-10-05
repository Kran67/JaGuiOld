//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { LabelEffect } from './labeleffects.js';
//#endregion Import
//#region Label
class Label extends CaptionControl {
    //#region Private fields
    #effect = null;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.clipped = !1;
            super(owner, props);
            if (props.effect) {
                const effectClassName = core.classes[`Label${props.effect.name.firstCharUpper}Effect`];
                this.#effect = props.hasOwnProperty('effect') && effectClassName
                    ? new effectClassName(this, props.effect.properties) : null;
            }
            delete this.tabOrder;
        }
    }
    //#endregion
    //#region Getters / Setters
    //#region effet
    get effect() {
        return this.#effect;
    }
    set effect(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (newValue instanceof LabelEffect || newValue == null) {
            if (this.#effect !== newValue) {
                this.#effect && htmlElement.classList.remove(this.#effect.cssName);
                this.#effect && this.#effect.destroy();
                this.#effect = newValue;
                //newValue && htmlElement.classList.add(this.effect.cssName);
                this.update();
            }
        }
    }
    //#endregion effet
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const isHtmlRenderer = core.isHTMLRenderer;
        //#endregion Variables déclaration
        super.loaded();
        isHtmlRenderer && this.update();
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.isHTMLRenderer) {
            if (htmlElement) {
                htmlElement.innerHTML = this.caption;
                this.updateCssProperties();
            }
            if (this.#effect) {
                htmlElementStyle.textShadow = String.EMPTY;
                htmlElement.classList.add(this.#effect.cssName);
                this.#effect.update();
            }
        } else {
            //
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.#effect && this.#effect.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(Label.prototype, {
    'effect': {
        enumerable: !0
    }
});
Object.seal(Label);
core.classes.register(core.types.CATEGORIES.COMMON, Label);
//#endregion Label
//#region Template
if (core.isHTMLRenderer) {
    const LabelTpl = ['<jagui-label id="{internalId}" data-class="Label" class="Control csr_default Label {theme} csr_default">',
        '<properties>{ "name": "{name}", "caption": "{caption}" }</properties></jagui-label>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Label, template: LabelTpl }]);
}
//#endregion Template
export { Label };