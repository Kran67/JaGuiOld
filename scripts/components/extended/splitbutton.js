//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import '/scripts/components/extended/bitmapbutton.js';
import '/scripts/components/extended/popupbutton.js';
//#endregion Import
//#region Class CustomButton
class SplitButton extends ThemedControl {
    //#region Private fields
    #caption;
    #action = null;
    //#popupMenu;
    #btn;
    #popupBtn;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#caption = props.hasOwnProperty('caption') ? props.caption : this.name;
            //this.#popupMenu = props.hasOwnProperty('popupMenu') && this.form[props.popupMenu] ? this.form[props.popupMenu] : null;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return this.#btn.caption;
    }
    set caption(newValue) {
        core.tools.isString(newValue) && (this.#btn.caption = newValue);
    }
    //#endregion caption
    //#region action
    get action() {
        return this.#action;
    }
    set action(newValue) {
        if (newValue instanceof core.classes.Action && this.#action !== newValue) {
            this.#action.unRegisterChanges(this);
            this.#action = newValue;
            this.#action.registerChanges(this);
            this.#action.updateTarget(this);
        }
    }
    //#endregion action
    //#region btn
    get btn() {
        return this.#btn;
    }
    //#endregion btn
    //#region popupMenu
    //get popupMenu() {
    //    return this.#popupMenu;
    //}
    //set popupMenu(newValue) {
    //    //#region Variables déclaration
    //    const priv = core.private(this);
    //    //#endregion Variables déclaration
    //    newValue instanceof core.classes.Menu && this.#popupMenu !== newValue && (this.#popupMenu = newValue);
    //}
    //#endregion popupMenu
    //#region getTemplate
    get template() {
        let html = super.template;
        let a = html.split('{bitmapButton}');
        let tpl = this.#btn.getTemplate();
        html = a.join(tpl);
        a = html.split('{popupButton}');
        tpl = this.#popupBtn.getTemplate();
        html = a.join(tpl);
        return html;
    }
    //#endregion getTemplate
    //#endregion Getters / Setters
    //#region Methods
    //#region clickPopup
    clickPopup() {
        if (this.popupMenu && core.classes.PopupMenu && this.popupMenu instanceof core.classes.PopupMenu) {
            const pt = this.owner.clientToDocument();
            this.popupMenu.control = this.owner;
            this.popupMenu.show(pt.x, pt.y + this.owner.HTMLElement.offsetHeight);
        }
    }
    //#endregion clickPopup
    //#region destroy
    destroy() {
        this.#btn.destroy();
        this.#popupBtn.destroy();
        this.#action && this.#action.removeTarget(this);
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        super.loaded();
        if (core.isHTMLRenderer) {
            this.#btn = core.classes.createComponent({
                class: core.classes.BitmapButton,
                owner: this,
                props: {
                    inForm: !1,
                    caption: this.#caption,
                    width: -1,
                    height: -1,
                    canFocused: !1
                }
            });
            this.#popupBtn = core.classes.createComponent({
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
            this.#popupBtn.click = this.clickPopup;
            core.classes.PopupMenu && this.#popupMenu instanceof core.classes.PopupMenu
                && (this.#popupBtn.popupMenu = this.#popupMenu);
            this.#btn.glyphSize = 0;
            this.#btn.resize();
            this.#popupBtn.resize();
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