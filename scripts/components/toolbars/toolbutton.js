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
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                imageIndex: props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex) ? props.imageIndex : -1
            });
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
        return core.private(this).imageIndex;
    }
    set imageIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.imageIndex !== newValue) {
            priv.imageIndex = newValue;
            this.propertyChanged('imageIndex');
            this.update();
        }
    }
    //#endregion height
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        let lElementChildStyle;
        const imgs = this.owner.images;
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        super.update();
        if (priv.imageIndex > -1 && imgs && this.images[priv.imageIndex] && htmlElement.lastElementChild) {
            lElementChildStyle = htmlElement.lastElementChild.style;
            lElementChildStyle.backgroundImage = `url(${imgs.images[priv.imageIndex]})`;
            lElementChildStyle.backgroundSize = `${imgs.width}${PX} ${imgs.height}${PX}`;
        }
        htmlElementStyle.height = 'auto';
    }
    //#endregion update
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.action && priv.action.removeTarget(this);
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