//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { BitmapButton } from "/scripts/components/extended/bitmapbutton.js";
import { PopupButton } from "/scripts/components/extended/popupbutton.js";
import { Tools } from "/scripts/core/tools.js";
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
        loaded() {
            const priv = internal(this);
            super.loaded();
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
        update() {
            priv.btn.update();
        }
        //#endregion Methods
    }
    return SplitButton;
    //#endregion SplitButton
})();
Core.classes.register(Types.CATEGORIES.EXTENDED, SplitButton);
//#endregion SplitButton

/*(function () {
    //#region SplitButton
    var SplitButton = $j.classes.ThemedControl.extend("SplitButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._btn = $j.classes.createComponent($j.classes.BitmapButton, this, null, { _inForm: false }, false);
                this._btn.canFocused = false;
                this._popupBtn = $j.classes.createComponent($j.classes.PopupButton, this, null, { _inForm: false }, false);
                this._popupBtn.canFocused = false;
                this._popupBtn.click = this.clickPopup;
                //#endregion
                this.action = null;
            }
        },
        //#region Setters
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            this._btn.setCaption(newValue);
        },
        setAction: function (newValue) {
            if (!(newValue instanceof $j.classes.Action)) return;
            if (this.action !== newValue) {
                if (this.action instanceof $j.classes.Action) this.action.unRegisterChanges(this);
                this.action = newValue;
                this.action.registerChanges(this);
                this.action.updateTarget(this);
            }
        },
        //#endregion
        //#region Methods
        updateFromHTML: function () {
            var data;
            this._inherited();

        },
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._btn.getHTMLElement(this._HTMLElement.firstElementChild.id);
                this._btn.getChildsHTMLElement();
                this._btn.updateFromHTML();
                this._popupBtn.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this._popupBtn.getChildsHTMLElement();
                this._popupBtn.updateFromHTML();
            }
        },
        loaded: function () {
            this._inherited();
            if (this.popupMenu instanceof $j.classes.PopupMenu) this._popupBtn.popupMenu = this.popupMenu;
        },
        clickPopup: function () {
            var pt;
            if (this.popupMenu) {
                if (this.popupMenu instanceof $j.classes.PopupMenu) {
                    pt = this._owner.clientToDocument();
                    this.popupMenu._control = this._owner;
                    this.popupMenu.show(pt.x, pt.y + this._owner._HTMLElement.offsetHeight);
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._btn = null;
            this._popupBtn = null;
            if (this.action) this.action.removeTarget(this);
            this.action = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{bitmapButton}"), tpl;
            tpl = this._btn.getTemplate();
            html = a.join(tpl);
            a = html.split("{popupButton}"), tpl;
            tpl = this._popupBtn.getTemplate();
            html = a.join(tpl);
            return html;
        },
        loaded: function () {
            this._inherited();
            this._btn.setCaption(this.name);
            this._btn.setGlyphSize(0);
            this._popupBtn.setCaption(String.EMPTY);
        },
        update: function () {
            this._btn.update();
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.EXTENDED, SplitButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var SplitButtonTpl = "<div id='{internalId}' data-name='{name}' data-class='SplitButton' class='Control SplitButton {theme} csr_default' style='width:75px;height:21px;'>\
                        {bitmapButton}\
                        {popupButton}\
                        </div>";
        $j.classes.registerTemplates([{ Class: SplitButton, template: SplitButtonTpl }]);
    }
    //#endregion
})();*/