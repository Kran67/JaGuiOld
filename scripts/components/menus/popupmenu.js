//#region Import
import { Component } from '/scripts/core/component.js';
import { MenuItem } from '/scripts/components/menus/menuitem.js';
import { PopupMenuBox } from '/scripts/components/menus/popupmenubox.js';
//#endregion Import
//#region Class PopupMenu
class PopupMenu extends Component {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                control: props.hasOwnProperty('control') ? props.control : null
            });
            core.classes.newCollection(this, this, MenuItem);
            this.createEventsAndBind(['onShow'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region activeItem
    get activeItem() {
        return this.items.find(e => {
            e.enabled && e.visible && e.active;
        });
    }
    //#endregion activeItem
    //#endregion Getters / Setters
    //#region Methods
    //#region images
    get images() {
        return core.private(this).images;
    }
    set images(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        (!newValue || newValue instanceof core.classes.ImageList) && priv.images !== newValue && (priv.images = newValue) && priv.images.addReference(this);
    }
    //#endregion images
    //#region loaded
    loaded() {
        super.loaded();
        this.getImages();
    }
    //#endregion loaded
    //#region getImages
    getImages() {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = this.form;
        const imgList = priv.props.hasOwnProperty('images') ? form[priv.props.images] : null;
        //#endregion Variables déclaration
        imgList && (priv.images = imgList) && imgList.addReference(this);
    }
    //#endregion getImages
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.close();
        priv.popupBox = null;
        this.unBindAndDestroyEvents(['onShow']);
        super.destroy();
    }
    //#endregion destroy
    //#region show
    show(x, y) {
        //#region Variables déclaration
        const priv = core.private(this);
        let paddingTop = 0;
        //#endregion Variables déclaration
        this.onShow.invoke();
        priv.popupBox = core.classes.createComponent({
            class: PopupMenuBox,
            owner: this,
            props: {
                parentHTML: document.body,
                refControl: priv.control
            }
        });
        priv.popupBox.control = priv.control ? priv.control : this;
        priv.control instanceof MenuItem && !priv.control.inMainMenu 
            && (paddingTop = int(getComputedStyle(priv.popupBox.HTMLElement.firstElementChild, null).paddingTop));
        y -= paddingTop;
        priv.popupBox.show(x, y);
    }
    //#endregion show
    //#region close
    close() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (priv.popupBox) {
            priv.popupBox.close();
            priv.popupBox.destroy();
        }
        priv.popupBox = null;
    }
    //#endregion close
    //#region getItemIndex
    getItemIndex(item) {
        return this.items.indexOf(item);
    }
    //#endregion getItemIndex
    //#endregion Methods
}
Object.defineProperties(PopupMenu.prototype, {
    'images': {
        enumerable: !0
    }
});
//#endregion PopupMenu
core.classes.register(core.types.CATEGORIES.MENUS, PopupMenu);
//#region Templates
if (core.isHTMLRenderer) {
    const PopupMenuTpl = ['<jagui-popumenu id="{internalId}" data-class="PopupMenu" class="ShortCutIcon">',
                            '<properties>{ "name": "{name}" }</properties>',
                      //'<div class="ShortCutIconImg popupmenu"></div>'
                      //'<div class="ShortCutIconCaption">{name}</div>'
                      '</jagui-popumenu>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PopupMenu, template: PopupMenuTpl }]);
}
//#endregion Templates
export { PopupMenu };