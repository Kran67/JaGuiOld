//#region Import
import { SplitButton } from '/scripts/components/extended/splitbutton.js';
//#endregion Import
//#region Class SplitToolButton
class SplitToolButton extends SplitButton {
    //#region Private fields
    #imageIndex = -1;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowUpdateOnResize = !0;
            super(owner, props);
            this.createEventsAndBind(['onCloseMenu', 'onOpenMenu'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        return null;
    }
    //#endregion height
    //#region popupMenu
    //get popupMenu() {
    //    return this.#popupMenu;
    //}
    //set popupMenu(newValue) {
    //    //#region Variables déclaration
    //    const priv = core.private(this);
    //    //#endregion Variables déclaration
    //    core.classes.Menu && newValue instanceof core.classes.Menu && this.#popupMenu !== newValue
    //        && (this.#popupMenu = newValue);
    //}
    //#endregion popupMenu
    //#region imageIndex
    get imageIndex() {
        return this.#imageIndex;
    }
    set imageIndex(newValue) {
        if (core.tools.isNumber(newValue) && this.#imageIndex !== newValue) {
            this.#imageIndex = newValue;
            this.update();
        }
    }
    //#endregion imageIndex
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        //core.classes.PopupMenu && this.popupMenu instanceof core.classes.PopupMenu
        //    && (this.popupBtn.popupMenu = this.#popupMenu);
        this.#imageIndex > -1 && this.owner.images && this.owner.images.images[this.#imageIndex]
            && (this.btn.src = this.owner.images.images[this.#imageIndex]);
    }
    //#endregion loaded
    //#region clickPopup
    clickPopup() {
        if (this.popupMenu && this.popupMenu instanceof core.classes.PopupMenu) {
            const pt = this.owner.clientToDocument();
            this.popupMenu.control = this.owner;
            this.popupMenu.show(pt.x, pt.y + this.owner.HTMLElement.offsetHeight);
        }
    }
    //#endregion clickPopup
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        htmlElementStyle.height = 'auto';
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.unBindAndDestroyEvents(['onCloseMenu', 'onOpenMenu']);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(SplitToolButton.prototype, {
    'imageIndex': {
        enumerable: !0
    },
    'popupMenu': {
        enumerable: !0
    }
});
Object.seal(SplitToolButton);
core.classes.register(core.types.CATEGORIES.INTERNAL, SplitToolButton);
//#endregion SplitToolButton
//#region Templates
if (core.isHTMLRenderer) {
    const SplitToolButtonTpl = ['<jagui-splittoolbutton id="{internalId}" data-class="SplitToolButton" class="Control SplitToolButton ',
        '{theme} csr_default"><properties>{ "name": "{name}" }</properties></jagui-splittoolbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: SplitToolButton, template: SplitToolButtonTpl }]);
}
//#endregion
export { SplitToolButton };