//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { LabelEffect } from './labeleffects.js';
//#endregion Import
//#region Label
class Label extends CaptionControl {
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.clipped = !1;
            super(owner, props);
            //#region Private
            core.private(this, {
                effect: null
            });
            if (props.effect) {
                const effectClassName = core.classes[`Label${props.effect.name.firstCharUpper}Effect`];
                priv.effect = props.hasOwnProperty('effect') && effectClassName
                    ? new effectClassName(this, props.effect.properties) : null;
            }
            //#endregion Private
            delete this.tabOrder;
        }
    }
    //#endregion
    //#region Getters / Setters
    //#region effet
    get effect() {
        return core.private(this).effect;
    }
    set effect(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (newValue instanceof LabelEffect) {
            if (priv.effect !== newValue) {
                priv.effect && htmlElement.classList.remove(this.effect.cssName);
                priv.effect && this.effect.destroy();
                priv.effect = newValue;
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
        const priv = core.private(this);
        const htmlElementStyle = this.HTMLElementStyle;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.isHTMLRenderer) {
            if (htmlElement) {
                htmlElement.innerHTML = this.caption;
                this.updateCssProperties();
            }
            if (priv.effect) {
                htmlElementStyle.textShadow = String.EMPTY;
                htmlElement.classList.add(priv.effect.cssName);
                priv.effect.update();
            }
        } else {
            //
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.effect && priv.effect.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
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