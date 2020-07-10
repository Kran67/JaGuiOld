//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import '/scripts/components/extended/bitmapbutton.js';
import '/scripts/components/extended/popupbutton.js';
//#endregion Import
//#region Class CustomButton
class SplitButton extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                caption: props.hasOwnProperty('caption') ? props.caption : this.name,
                action: null//,
                //popupMenu: props.hasOwnProperty('popupMenu') && this.form[props.popupMenu] ? this.form[props.popupMenu] : null
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return core.private(this).btn.caption;
    }
    set caption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && (priv.btn.caption = newValue);
    }
    //#endregion caption
    //#region action
    get action() {
        return core.private(this).action;
    }
    set action(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
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
        return core.private(this).btn;
    }
    //#endregion btn
    //#region popupMenu
    //get popupMenu() {
    //    return core.private(this).popupMenu;
    //}
    //set popupMenu(newValue) {
    //    //#region Variables déclaration
    //    const priv = core.private(this);
    //    //#endregion Variables déclaration
    //    newValue instanceof core.classes.Menu && priv.popupMenu !== newValue && (priv.popupMenu = newValue);
    //}
    //#endregion popupMenu
    //#region getTemplate
    get template() {
        //#region Variables déclaration
        const priv = core.private(this);
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
        const priv = core.private(this);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.btn.destroy();
        priv.popupBtn.destroy();
        priv.action && priv.action.removeTarget(this);
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
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
Object.defineProperties(SplitButton.prototype, {
    'caption': {
        enumerable: !0
    },
    'action': {
        enumerable: !0
    },
    'popupMenu': {
        enumerable: !0
    }
});
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