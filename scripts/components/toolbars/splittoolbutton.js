//#region Import
import { SplitButton } from '/scripts/components/extended/splitbutton.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region SplitToolButton
const SplitToolButton = (() => {
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
    //#region Class SplitToolButton
    class SplitToolButton extends SplitButton {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                this.createEventsAndBind(['onCloseMenu', 'onOpenMenu'], props);
                priv.imageIndex = -1;
                priv.popupMenu = props.hasOwnProperty('popupMenu') && this.form[props.popupMenu] ? this.form[props.popupMenu] : null;
                this.allowUpdateOnResize = true;
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
        //#region popupMenu
        get popupMenu() {
            return internal(this).popupMenu;
        }
        set popupMenu(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Menu) {
                if (priv.popupMenu !== newValue) {
                    priv.popupMenu = newValue;
                }
            }
        }
        //#endregion popupMenu
        //#region imageIndex
        get imageIndex() {
            return internal(this).imageIndex;
        }
        set imageIndex(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.imageIndex !== newValue) {
                    priv.imageIndex = newValue;
                    this.update();
                }
            }
        }
        //#endregion imageIndex
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            if (Core.classes.PopupMenu && this.popupMenu instanceof Core.classes.PopupMenu) {
                this.popupBtn.popupMenu = priv.popupMenu;
            }
            if (priv.imageIndex > -1) {
                if (this.owner.images) {
                    if (this.owner.images.images[priv.imageIndex]) {
                        this.btn.src = this.owner.images.images[priv.imageIndex];
                    }
                }
            }
        }
        //#endregion loaded
        //#region clickPopup
        clickPopup() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.popupMenu) {
                if (priv.popupMenu instanceof Core.classes.PopupMenu) {
                    const pt = this.owner.clientToDocument();
                    priv.popupMenu.control = this.owner;
                    priv.popupMenu.show(pt.x, pt.y + this.owner.HTMLElement.offsetHeight);
                }
            }
        }
        //#endregion clickPopup
        //#region update
        update() {
            const htmlElementStyle = this.HTMLElementStyle;
            htmlElementStyle.height = 'auto';
        }
        //#endregion update
        //#region destroy
        destroy() {
            this.onCloseMenu.destroy();
            this.onCloseMenu = null;
            this.onOpenMenu.destroy();
            this.onOpenMenu = null;
            priv.imageIndex = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return SplitToolButton;
    //#endregion SplitToolButton
})();
Object.seal(SplitToolButton);
Core.classes.register(Types.CATEGORIES.INTERNAL, SplitToolButton);
//#endregion SplitToolButton
export { SplitToolButton };
//#region Templates
if (Core.isHTMLRenderer) {
    const SplitToolButtonTpl = ['<jagui-splittoolbutton id="{internalId}" data-class="SplitToolButton" class="Control SplitToolButton ',
        '{theme} csr_default"><properties>{ "name": "{name}" }</properties></jagui-splittoolbutton>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: SplitToolButton, template: SplitToolButtonTpl }]);
}
//#endregion