//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class PopupButton
class PopupButton extends Button {
    //#region Private fields
    #arrow;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.textObj = null;
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return super.caption();
    }
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.caption !== newValue) {
            this.caption = Text.replace(newValue, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
            this.update();
        }
    }
    //#endregion caption
    //#endregion Getters / Setters
    //#region Methods
    //#region click
    click() {
        this.onClick.invoke();
        if (this.popupMenu && this.popupMenu instanceof core.classes.PopupMenu) {
            const pt = this.clientToDocument();
            this.popupMenu.control = this;
            this.popupMenu.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
        }
    }
    //#endregion click
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
            case Keyboard.VKEYSCODES.VK_LEFT:
            case Keyboard.VKEYSCODES.VK_UP:
            case Keyboard.VKEYSCODES.VK_RIGHT:
            case Keyboard.VKEYSCODES.VK_DOWN:
            case Keyboard.VKEYSCODES.VK_ENTER:
                !form.popups.isEmpty && form.popups.last.keyDown();
                core.keyboard.stopEvent();
                break;
            case Keyboard.VKEYSCODES.VK_ESCAPE:
                break;
        }
    }
    //#endregion keyDown
    //#region keyUp
    keyUp() {
        switch (core.keyboard.key) {
            case Keyboard.VKEYSCODES.VK_ENTER:
                core.keyboard.stopEvent();
                break;
        }
        super.keyUp();
    }
    //#endregion keyUp
    //#region destroy
    destroy() {
        this.popupMenu = null;
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        super.loaded();
        this.#arrow = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}arrow`);
        this.#arrow.classList.add('PopupButtonArrow');
        this.#arrow.innerHTML = '8';
        this.HTMLElement.appendChild(this.#arrow);
    }
    //#endregion
    //#endregion Methods
}
//Object.defineProperties(PopupButton.prototype, {
//    'popupMenu': {
//        enumerable: !0
//    }
//});
Object.seal(PopupButton);
core.classes.register(core.types.CATEGORIES.EXTENDED, PopupButton);
//#endregion PopupButton
//#region Template
if (core.isHTMLRenderer) {
    const PopupButtonTpl = ['<jagui-popupbutton id="{internalId}" data-class="PopupButton" class="Control PopupButton {theme} csr_default">',
        '<properties>{ "name": "{name}", "caption": "{name}" }</properties></jagui-popupbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PopupButton, template: PopupButtonTpl }]);
}
//#endregion
export { PopupButton };