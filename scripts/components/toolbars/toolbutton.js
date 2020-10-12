//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { BitmapButton } from '/scripts/components/extended/bitmapbutton.js';
//#endregion Import
//#region Class ToolButtonSep
class ToolButtonSep extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.canFocused = !1;
        }
    }
    //#endregion constructor
}
//#endregion ToolButtonSep
Object.seal(ToolButtonSep);
//#region Class ToolButton
class ToolButton extends BitmapButton {
    //#region Private fields
    #imageIndex;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#imageIndex = props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex) ? props.imageIndex : -1;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        return null;
    }
    //#endregion height
    //#region imageIndex
    get imageIndex() {
        return this.#imageIndex;
    }
    set imageIndex(newValue) {
        if (core.tools.isNumber(newValue) && this.#imageIndex !== newValue) {
            this.#imageIndex = newValue;
            this.propertyChanged('imageIndex');
            this.update();
        }
    }
    //#endregion height
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        let lElementChildStyle;
        const imgs = this.owner.images;
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        super.update();
        if (this.#imageIndex > -1 && imgs && this.images[this.#imageIndex] && htmlElement.lastElementChild) {
            lElementChildStyle = htmlElement.lastElementChild.style;
            lElementChildStyle.backgroundImage = `url(${imgs.images[this.#imageIndex]})`;
            lElementChildStyle.backgroundSize = `${imgs.width}${PX} ${imgs.height}${PX}`;
        }
        htmlElementStyle.height = 'auto';
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.action && this.action.removeTarget(this);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(ToolButton.prototype, {
    'imageIndex': {
        enumerable: !0
    }
});
Object.seal(ToolButton);
core.classes.register(core.types.CATEGORIES.INTERNAL, ToolButtonSep, ToolButton);
//#endregion ToolButton
//#region Templates
if (core.isHTMLRenderer) {
    const ToolButtonTpl = ['<jagui-toolbutton id="{internalId}" data-class="ToolButton" class="Control Button BitmapButton ',
        'ButtonGlyph ToolButton {theme} csr_default"><properties>{ "name": "{name}", "caption": "{caption}" }</properties>',
        '</jagui-toolbutton>'].join(String.EMPTY);
    const ToolButtonSepTpl = ['<jagui-toolbuttonsep id="{internalId}" data-class="ToolButtonSep" class="Control ToolButtonSep {theme}">',
        '<properties>{ "name": "{name}" }</properties></jagui-toolbuttonsep>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ToolButton, template: ToolButtonTpl }, { Class: ToolButtonSep, template: ToolButtonSepTpl }]);
}
//#endregion
export { ToolButtonSep, ToolButton };