//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class PopupButton
class PopupButton extends Button {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.textObj = null;
            super(owner, props);
            core.private(this, {
                popupMenu: props.hasOwnProperty('popupMenu') ? this.form[props.popupMenu] : null
            });
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.caption !== newValue) {
            priv.caption = Text.replace(newValue, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
            this.update();
        }
    }
    //#endregion caption
    //#endregion Getters / Setters
    //#region Methods
    //#region click
    click() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.onClick.invoke();
        if (priv.popupMenu && priv.popupMenu instanceof core.classes.PopupMenu) {
            const pt = this.clientToDocument();
            priv.popupMenu.control = this;
            priv.popupMenu.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
        }
    }
    //#endregion click
    //#region keyDown
    keyDown() {
        const form = this.form;
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.popupMenu = null;
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.arrow = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}arrow`);
        priv.arrow.classList.add('Control', 'PopupButtonArrow');
        priv.arrow.innerHTML = '8';
        this.HTMLElement.appendChild(priv.arrow);
    }
    //#endregion
    //#endregion Methods
}
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