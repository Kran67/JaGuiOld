//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { BitmapButton } from '/scripts/components/extended/bitmapbutton.js';
import { Tools } from '/scripts/core/tools.js';
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
            this.canFocused = false;
        }
    }
    //#endregion constructor
}
//#endregion ToolButtonSep
Object.seal(ToolButtonSep);
//#region ToolButton
const ToolButton = (() => {
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
    //#region Class ToolButton
    class ToolButton extends BitmapButton {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.imageIndex = props.hasOwnProperty('imageIndex') && Tools.isNumber(props.imageIndex) ? props.imageIndex : -1;
                priv.action = props.hasOwnProperty('action') && this.form.hasOwnProperty(props.action) ? props.action : null;
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
        //#region action
        get action() {
            return internal(this).action;
        }
        set action(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Action) {
                if (priv.action !== newValue) {
                    if (priv.action instanceof Core.classes.Action) {
                        priv.action.unRegisterChanges(this);
                    }
                    priv.action = newValue;
                    priv.action.registerChanges(this);
                    priv.action.updateTarget(this);
                }
            }
        }
        //#endregion action
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const lElementChildStyle = htmlElement.lastElementChild.style;
            const imgs = this.owner.images;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            super.loaded();
            if (priv.imageIndex > -1) {
                if (imgs) {
                    if (thisimgs.images[priv.imageIndex]) {
                        lElementChildStyle.backgroundImage = `url(${imgs.images[priv.imageIndex]})`;
                        lElementChildStyle.backgroundSize = `${imgs.width}${PX} ${imgs.height}${PX}`;
                    }
                }
            }
        }
        //#endregion loaded
        //#region update
        update() {
            const htmlElementStyle = this.HTMLElementStyle;
            super.update();
            htmlElementStyle.height = 'auto';
        }
        //#endregion update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.imageIndex = null;
            if (priv.action) {
                priv.action.removeTarget(this);
            }
            priv.action = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return ToolButton;
    //#endregion ToolButton
})();
//#endregion ToolButton
Object.seal(ToolButton);
Core.classes.register(Types.CATEGORIES.INTERNAL, ToolButtonSep, ToolButton);
export { ToolButtonSep, ToolButton };
//#region Templates
if (Core.isHTMLRenderer) {
    const ToolButtonTpl = ['<jagui-toolbutton id="{internalId}" data-class="ToolButton" class="Control Button BitmapButton ', 
        'ButtonGlyph ToolButton {theme} csr_default"><properties>{ "name": "{name}", "caption": "{caption}" }</properties>', 
        '</jagui-toolbutton>'].join(String.EMPTY);
    const ToolButtonSepTpl = ['<jagui-toolbuttonsep id="{internalId}" data-class="ToolButtonSep" class="Control ToolButtonSep {theme}">',
        '<properties>{ "name": "{name}" }</properties></jagui-toolbuttonsep>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ToolButton, template: ToolButtonTpl }, { Class: ToolButtonSep, template: ToolButtonSepTpl }]);
}
//#endregion