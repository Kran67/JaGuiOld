//#region Import
import { Component } from '/scripts/core/component.js';
import { MenuItem } from '/scripts/components/menus/menuitem.js';
import { PopupMenuBox } from '/scripts/components/menus/popupmenubox.js';
//#endregion Import
//#region Class PopupMenu
class PopupMenu extends Component {
    //#region Private fields
    #control;
    #images;
    #popupBox;
    #htmlContainer;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#control = props.hasOwnProperty('control') ? props.control : null;
            core.classes.newCollection(this, this, MenuItem);
            this.createEventsAndBind(['onShow'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region activeItem
    get activeItem() {
        return this.items.find(e => e.enabled && e.visible && e.active);
    }
    //#endregion activeItem
    //#region images
    get images() {
        return this.#images;
    }
    set images(newValue) {
        (!newValue || newValue instanceof core.classes.ImageList) && this.#images !== newValue && (this.#images = newValue) 
            && this.#images.addReference(this);
    }
    //#endregion images
    //#region popupBox
    get popupBox() {
        return this.#popupBox;
    }
    //#endregion popupBox
    //#region popupBox
    get control() {
        return this.#control;
    }
    set control(newValue) {
        newValue instanceof core.classes.Control && this.#control !== newValue && (this.#control = newValue);
    }
    //#endregion popupBox
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.getImages();
        this.generateItems();
    }
    //#endregion loaded
    //#region generateItems
    generateItems() {
        //#region Variables déclaration
        const items = this.props.items;
        //#endregion Variables déclaration
        this.#htmlContainer = document.createElement(core.types.HTMLELEMENTS.DIV);
        items && items.forEach(item => {
            this.items.push(core.classes.createComponent({
                class: MenuItem,
                owner: this,
                props: {
                    ...item,
                    parentHTML: this.HTMLElement
                }
            }));
        });
    }
    //#endregion generateItems
    //#region getImages
    getImages() {
        //#region Variables déclaration
        const form = this.form;
        let imgList = this.props.hasOwnProperty('images') && this.props.images;
        //#endregion Variables déclaration
        core.tools.isString(imgList) && (imgList = form[this.props.images]);
        imgList && (this.#images = imgList) && imgList.addReference(this);
    }
    //#endregion getImages
    //#region destroy
    destroy() {
        this.close();
        this.#popupBox = null;
        this.unBindAndDestroyEvents(['onShow']);
        super.destroy();
    }
    //#endregion destroy
    //#region show
    show(x, y) {
        //#region Variables déclaration
        let paddingTop = 0;
        //#endregion Variables déclaration
        this.onShow.invoke();
        this.#popupBox = core.classes.createComponent({
            class: PopupMenuBox,
            owner: this,
            props: {
                parentHTML: document.body,
                refControl: this.#control
            }
        });
        this.#popupBox.control = this.#control ? this.#control : this;
        this.#control instanceof MenuItem && !this.#control.inMainMenu 
            && (paddingTop = int(getComputedStyle(this.#popupBox.HTMLElement.firstElementChild, null).paddingTop));
        y -= paddingTop;
        this.#popupBox.show(x, y);
    }
    //#endregion show
    //#region close
    close() {
        if (this.#popupBox) {
            this.#popupBox.close();
            this.#popupBox.destroy();
        }
        this.#popupBox = null;
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