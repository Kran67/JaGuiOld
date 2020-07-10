//#region Import
import { SplitButton } from '/scripts/components/extended/splitbutton.js';
//#endregion Import
//#region Class SplitToolButton
class SplitToolButton extends SplitButton {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowUpdateOnResize = !0;
            super(owner, props);
            core.private(this, {
                imageIndex: -1
            });
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
    //    return core.private(this).popupMenu;
    //}
    //set popupMenu(newValue) {
    //    //#region Variables déclaration
    //    const priv = core.private(this);
    //    //#endregion Variables déclaration
    //    core.classes.Menu && newValue instanceof core.classes.Menu && priv.popupMenu !== newValue
    //        && (priv.popupMenu = newValue);
    //}
    //#endregion popupMenu
    //#region imageIndex
    get imageIndex() {
        return core.private(this).imageIndex;
    }
    set imageIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.imageIndex !== newValue) {
            priv.imageIndex = newValue;
            this.update();
        }
    }
    //#endregion imageIndex
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        //core.classes.PopupMenu && this.popupMenu instanceof core.classes.PopupMenu
        //    && (this.popupBtn.popupMenu = priv.popupMenu);
        priv.imageIndex > -1 && this.owner.images && this.owner.images.images[priv.imageIndex]
            && (this.btn.src = this.owner.images.images[priv.imageIndex]);
    }
    //#endregion loaded
    //#region clickPopup
    clickPopup() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (this.popupMenu && this.popupMenu instanceof core.classes.PopupMenu) {
            const pt = this.owner.clientToDocument();
            this.popupMenu.control = this.owner;
            this.popupMenu.show(pt.x, pt.y + this.owner.HTMLElement.offsetHeight);
        }
    }
    //#endregion clickPopup
    //#region update
    update() {
        const htmlElementStyle = this.HTMLElementStyle;
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