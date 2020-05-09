//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import '/scripts/components/extended/bitmapbutton.js';
import '/scripts/components/extended/popupbutton.js';
//#endregion Import
//#region SplitButton
const SplitButton = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                priv.caption = props.hasOwnProperty('caption') ? props.caption : this.name;
                priv.action = null;
                priv.popupMenu = props.hasOwnProperty('popupMenu') && this.form[props.popupMenu] ? this.form[props.popupMenu] : null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region caption
        get caption() {
            return internal(this).btn.caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isString(newValue) && (priv.btn.caption = newValue);
        }
        //#endregion caption
        //#region action
        get action() {
            return internal(this).action;
        }
        set action(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof core.classes.Action && priv.action !== newValue) {
                priv.action.unRegisterChanges(this);
                priv.action = newValue;
                priv.action.registerChanges(this);
                priv.action.updateTarget(this);
            }
        }
        //#endregion action
        //#region btn
        get btn() {
            return internal(this).btn;
        }
        //#endregion btn
        //#region popupMenu
        get popupMenu() {
            return internal(this).popupMenu;
        }
        set popupMenu(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.classes.Menu && priv.popupMenu !== newValue && (priv.popupMenu = newValue);
        }
        //#endregion popupMenu
        //#region getTemplate
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            let html = super.template;
            let a = html.split('{bitmapButton}');
            let tpl = priv.btn.getTemplate();
            html = a.join(tpl);
            a = html.split('{popupButton}');
            tpl = priv.popupBtn.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion getTemplate
        //#endregion Getters / Setters
        //#region Methods
        //#region clickPopup
        clickPopup() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.popupMenu && core.classes.PopupMenu && priv.popupMenu instanceof core.classes.PopupMenu) {
                const pt = this.owner.clientToDocument();
                priv.popupMenu.control = this.owner;
                priv.popupMenu.show(pt.x, pt.y + this.owner.HTMLElement.offsetHeight);
            }
        }
        //#endregion clickPopup
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.btn.destroy();
            priv.btn = null;
            priv.popupBtn.destroy();
            priv.popupBtn = null;
            priv.action && priv.action.removeTarget(this);
            priv.action = null;
            priv.caption = null;
            priv.popupMenu = null;
            super.destroy();
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            if (core.isHTMLRenderer) {
                priv.btn = core.classes.createComponent({
                    class: core.classes.BitmapButton,
                    owner: this,
                    props: {
                        inForm: !1,
                        caption: priv.caption,
                        width: -1,
                        height: -1,
                        canFocused: !1
                    }
                });
                priv.popupBtn = core.classes.createComponent({
                    class: core.classes.PopupButton,
                    owner: this,
                    props: {
                        inForm: !1,
                        caption: String.EMPTY,
                        width: 14,
                        height: -1,
                        canFocused: !1
                    }
                });
                priv.popupBtn.click = this.clickPopup;
                core.classes.PopupMenu && priv.popupMenu instanceof core.classes.PopupMenu
                    && (priv.popupBtn.popupMenu = priv.popupMenu);
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
core.classes.register(core.types.CATEGORIES.EXTENDED, SplitButton);
//#endregion SplitButton
export { SplitButton };
//#region Templates
if (core.isHTMLRenderer) {
    const SplitButtonTpl = ['<jagui-splitbutton id="{internalId}" data-class="SplitButton" class="Control SplitButton {theme} csr_default">',
        '<properties>{ "name": "{name}" }</properties></jagui-splitbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: SplitButton, template: SplitButtonTpl }]);
}
//#endregion