//#region Import
import { Button } from "/scripts/components/common/button.js";
import { Tools } from "/scripts/core/tools.js";
import { Keyboard } from "/scripts/core/keyboard.js";
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.onClick.invoke();
            if (priv.popupMenu) {
                if (priv.popupMenu instanceof Core.classes.PopupMenu) {
                    const pt = this.clientToDocument();
                    priv.popupMenu.control = this;
                    priv.popupMenu.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
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
            priv.arrow = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}arraow`);
            priv.arrow.classList.add("Control", "PopupButtonArrow");
            priv.arrow.innerHTML = "8";
            this.HTMLElement.appendChild(priv.arrow);
        }
        //#endregion
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
        "<properties>{ \"name\": \"{name}\", \"caption\": \"{name}\" }</properties></jagui-popupbutton>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: PopupButton, template: PopupButtonTpl }]);
}
//#endregion
export { PopupButton };