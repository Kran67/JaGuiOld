//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { Colors, Color } from '/scripts/core/color.js';
import './labeleffects.js';
//#endregion Import
//#region Label
const Label = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
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
                const priv = internal(this);
                priv.effect = null;
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
            return internal(this).effect;
        }
        set effect(newValue) {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (newValue instanceof LabelEffect) {
                if (this.effect !== newValue) {
                    htmlElement.classList.remove(this.effect.cssName);
                    this.effect.destroy();
                    this.effect = newValue;
                    newValue && htmlElement.classList.add(this.effect.cssName);
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
            const priv = internal(this);
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
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.effect.destroy();
            priv.effect = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Label;
    //#endregion Label
})();
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