//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { BitmapButton } from "/scripts/components/extended/bitmapbutton.js";
import { PopupButton } from "/scripts/components/extended/popupbutton.js";
import { Tools } from "/scripts/core/tools.js";
import { Text } from "/scripts/core/text.js";
//#endregion Import
//#region SplitButton
const SplitButton = (() => {
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
    //#region Class CustomButton
    class SplitButton extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.caption = props.hasOwnProperty("caption") ? props.caption : this.name;
                priv.action = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region caption
        get caption() {
            return internal(this).btn.caption;
        }
        set caption(newValue) {
            const priv = internal(this);
            if (Tools.isString(newValue)) {
                priv.btn.caption = newValue;
            }
        }
        //#endregion caption
        //#region action
        get action() {
            return internal(this).action;
        }
        set action(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Action) {
                if (priv.action !== newValue) {
                    priv.action.unRegisterChanges(this);
                    priv.action = newValue;
                    priv.action.registerChanges(this);
                    priv.action.updateTarget(this);
                }
            }
        }
        //#endregion action
        get btn() {
            return internal(this).btn;
        }
        //#endregion Getters / Setters
        //#region Methods
        //#region clickPopup
        clickPopup() {
            const priv = internal(this);
            if (priv.popupMenu) {
                if (priv.popupMenu instanceof Core.classes.PopupMenu) {
                    const pt = this.owner.clientToDocument();
                    priv.popupMenu.control = this.owner;
                    priv.popupMenu.show(pt.x, pt.y + this.owner.HTMLElement.offsetHeight);
                }
            }
        }
        //#endregion clickPopup
        //#region destroy
        destroy() {
            const priv = internal(this);
            super.destroy();
            priv.btn.destroy();
            priv.btn = null;
            priv.popupBtn.destroy();
            priv.popupBtn = null;
            if (priv.action) {
                priv.action.removeTarget(this);
            }
            priv.action = null;
        }
        //#endregion destroy
        //#region getTemplate
        getTemplate() {
            const priv = internal(this);
            let html = super.getTemplate();
            let a = html.split("{bitmapButton}");
            let tpl = this._btn.getTemplate();
            html = a.join(tpl);
            a = html.split("{popupButton}");
            tpl = priv.popupBtn.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion getTemplate
        //#region loaded
        loaded() {
            const priv = internal(this);
            super.loaded();
            if (Core.isHTMLRenderer) {
                priv.btn = Core.classes.createComponent({ class: Core.classes.BitmapButton, owner: this, props: { inForm: false, caption: priv.caption, width: -1, height: -1, canFocused: false }, withTpl: true });
                priv.popupBtn = Core.classes.createComponent({ class: Core.classes.PopupButton, owner: this, props: { inForm: false, caption: String.EMPTY, width: 14, height: -1, canFocused: false }, withTpl: true });
                priv.popupBtn.click = this.clickPopup;
                if (Core.classes.PopupMenu && priv.popupMenu instanceof Core.classes.PopupMenu) {
                    priv.popupBtn.popupMenu = priv.popupMenu;
                }
                priv.btn.glyphSize = 0;
                priv.btn.resize();
                priv.popupBtn.resize();
            }
        }
        //#endregion loaded
        //#endregion Methods
    }
    return SplitButton;
    //#endregion SplitButton
})();
Core.classes.register(Types.CATEGORIES.EXTENDED, SplitButton);
//#endregion SplitButton

//#region Templates
if (Core.isHTMLRenderer) {
    const SplitButtonTpl = ["<jagui-splitbutton id=\"{internalId}\" data-class=\"SplitButton\" class=\"Control SplitButton {theme} csr_default\">",
        "<properties>{ \"name\": \"{name}\" }</properties></jagui-splitbutton>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: SplitButton, template: SplitButtonTpl }]);
}
//#endregion