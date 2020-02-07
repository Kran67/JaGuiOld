//#region Import
import { Button } from "/scripts/components/common/button.js";
import { Tools } from "/scripts/core/tools.js";
import { Text } from "/scripts/core/text.js";
//#endregion Import
//#region PopupButton
const PopupButton = (() => {
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
    //#region Class PopupButton
    class PopupButton extends Button {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                this.textObj = null;
                priv.popupMenu = props.hasOwnProperty("popupMenu")?this.form[priv.popupMenu]:null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region caption
        get caption() {
            return super.cpation();
        }
        set caption(newValue) {
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = Text.replace(newValue, Types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
                    this.update();
                }
            }
        }
        //#endregion caption
        //#endregion Getters / Setters
        //#region Methods
        //#region click
        click() {
            this.onClick.invoke();
            if (this.popupMenu) {
                if (this.popupMenu instanceof Core.classes.PopupMenu) {
                    const pt = this.clientToDocument();
                    this.popupMenu.control = this;
                    this.popupMenu.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
                }
            }
        }
        //#endregion click
        //#region keyDown
        keyDown() {
            const form = this.form;
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case Keyboard.VKEYSCODES.VK_LEFT:
                case Keyboard.VKEYSCODES.VK_UP:
                case Keyboard.VKEYSCODES.VK_RIGHT:
                case Keyboard.VKEYSCODES.VK_DOWN:
                case Keyboard.VKEYSCODES.VK_RETURN:
                case Keyboard.VKEYSCODES.VK_ENTER:
                    if (!form.popups.isEmpty) {
                        form.popups.last.keyDown();
                    }
                    Core.keyboard.stopEvent();
                    break;
                case Keyboard.VKEYSCODES.VK_ESCAPE:
                    break;
            }
        }
        //#endregion keyDown
        //#region keyUp
        keyUp() {
            switch (Core.keyboard.keyCode) {
                case Keyboard.VKEYSCODES.VK_RETURN:
                case Keyboard.VKEYSCODES.VK_ENTER:
                    Core.keyboard.stopEvent();
                    break;
            }
            super.keyUp();
        }
        //#endregion keyUp
        //#region destroy
        destroy() {
            priv.popupMenu = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PopupButton;
    //#endregion PopupButton
})();
Object.seal(PopupButton);
Core.classes.register(Types.CATEGORIES.EXTENDED, PopupButton);
//#endregion PopupButton
//#region Template
if (Core.isHTMLRenderer) {
    const PopupButtonTpl = ["<jagui-popupbutton id=\"{internalId}\" data-class=\"PopupButton\" class=\"Control PopupButton {theme} csr_default\">",
        "<properties>{ \"name\": \"{name}\", \"caption\": \"{name}\" }</properties><span class=\"Control ButtonCaption includeCaption\"></span>",
        "<div class=\"Control PopupButtonArrow\">8</div></jagui-popupbutton>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: PopupButton, template: PopupButtonTpl }]);
}
//#endregion