//#region Import
import { Tools } from "/scripts/core/tools.js";
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { BitmapButton } from "/scripts/components/extended/bitmapbutton.js";
import { PopupButton } from "/scripts/components/extended/bitmapbutton.js";
import { PopupMenu } from "/scripts/components/menus/popupmenu.js";
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
    //#region Class SplitButton
    class SplitButton extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.btn = Core.classes.createComponent(BitmapButton, this, null, { _inForm: false }, false);
                priv.btn.canFocused = false;
                priv.popupBtn = Core.classes.createComponent(PopupButton, this, null, { _inForm: false }, false);
                priv.popupBtn.canFocused = false;
                priv.popupBtn.click = this.clickPopup;
                this.action = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region caption
        get caption() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.btn.caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                priv.btn.caption = newValue;
            }
        }
        //#endregion caption
        //#endregion Getters / Setters
        //#region Methods
        //#region getChildsHTMLElement
        getChildsHTMLElement() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Core.isHTMLRenderer) {
                priv.btn.getHTMLElement(htmlElement.firstElementChild.id);
                priv.btn.getChildsHTMLElement();
                priv.popupBtn.getHTMLElement(htmlElement.lastElementChild.id);
                priv.popupBtn.getChildsHTMLElement();
            }
        }
        //#endregion getChildsHTMLElement
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            if (this.popupMenu instanceof PopupMenu) {
                priv.popupBtn.popupMenu = this.popupMenu;
            }
        }
        //#endregion loaded
        //#region clickPopup
        clickPopup() {
            if (this.popupMenu) {
                if (this.popupMenu instanceof PopupMenu) {
                    const pt = this.owner.clientToDocument();
                    this.popupMenu.control = this.owner;
                    this.popupMenu.show(pt.x, pt.y + this.owner.HTMLElement.offsetHeight);
                }
            }
        }
        //#endregion clickPopup
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.btn = null;
            priv.popupBtn = null;
            if (this.action) {
                this.action.removeTarget(this);
            }
        }
        //#endregion destroy
        //#region getTemplate
        getTemplate() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            let html = super.getTemplate();
            let a = html.split("{bitmapButton}");
            let tpl = priv.btn.getTemplate();
            html = a.join(tpl);
            a = html.split("{popupButton}");
            tpl = priv.popupBtn.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion getTemplate
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.btn.caption = this.name;
            priv.btn.glyphSize = 0;
            priv.popupBtn.caption = String.EMPTY;
        }
        //#endregion loaded
        //#region update
        update() {
            this.btn.update();
        }
        //#endregion update
        //#endregion Methods
    };
    return SplitButton;
    //#endregion Class SplitButton
})();
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, SplitButton);
export { SplitButton };

/*
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var SplitButtonTpl = "<div id='{internalId}' data-name='{name}' data-class='SplitButton' class='Control SplitButton {theme} csr_default' style='width:75px;height:21px;'>\
                        {bitmapButton}\
                        {popupButton}\
                        </div>";
        $j.classes.registerTemplates([{ Class: SplitButton, template: SplitButtonTpl }]);
    }
    //#endregion
})();
*/