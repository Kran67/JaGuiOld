//#region Import
import { Component } from '/scripts/core/component.js';
import { MenuItem } from '/scripts/components/menus/menuitem.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import '/scripts/components/nonvisual/imagelist.js';
//#endregion Import
//#region Class MainMenu
class MainMenu extends Component {
    //#region Private fields
    #items = [];
    #active;
    #images = null;
    #HTMLMenu;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#active = props.hasOwnProperty('active') && core.tools.isBool(props.active) ? props.active : !1;
            this.#items.convertToCollection(owner, MenuItem);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region items
    get items() {
        return this.#items;
    }
    //#endregion items
    //#region active
    get active() {
        return this.#active;
    }
    set active(newValue) {
        core.tools.isBool(newValue) && this.#active !== newValue && (this.#active = newValue);
    }
    //#endregion active
    //#region images
    get images() {
        return this.#images;
    }
    set images(newValue) {
        newValue instanceof core.classes.ImageList && this.#images !== newValue && (this.#images = newValue);
    }
    //#endregion active
    //#region isEnabled
    get isEnabled() {
        return this.enabled;
    }
    //#endregion isEnabled
    //#region activeItem
    get activeItem() {
        return this.items.find(e => {
            e.enabled && e.visible && e.active;
        });
    }
    //#endregion activeItem
    //#endregion Getters / Setters
    //#region Methods
    //#region getItemIndex
    getItemIndex(item) {
        return this.items.indexOf(item);
    }
    //#endregion getItemIndex
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        super.loaded();
        this.#HTMLMenu = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}-bar`);
        this.#HTMLMenu.classList.add('Control', 'MainMenuBar', form.themeName);
        form.HTMLElement.firstElementChild.appendChild(this.#HTMLMenu);
        this.getImages();
        this.generateItems();
        !this.loading && !form.loading && !form.mainMenu && (form.mainMenu = this);
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.items.destroy();
        this.items = null;
        super.destroy();
    }
    //#endregion destroy
    //#region getImages
    getImages() {
        //#region Variables déclaration
        const form = this.form;
        const imgList = this.props.hasOwnProperty('images') ? form[this.props.images] : null;
        //#endregion Variables déclaration
        imgList && (this.#images = imgList) && imgList.addReference(this);
    }
    //#endregion getImages
    //#region generateItems
    generateItems() {
        //#region Variables déclaration
        const menus = this.props.menus;
        //#endregion Variables déclaration
        menus.forEach(menu => {
            this.items.push(core.classes.createComponent({
                class: MenuItem,
                owner: this,
                props: {
                    ...menu,
                    parentHTML: this.#HTMLMenu,
                    inMainMenu: !0
                }
            }));
        });
    }
    //#endregion generateItems
    //#region keyDown
    keyDown() {
        //var activeMenuItem, idx, items, shortcut = String.EMPTY;
        //activeMenuItem = this.getActiveItem();
        //switch ($j.keyboard.keyCode) {
        //    case $j.types.VKeysCodes.VK_LEFT:
        //    case $j.types.VKeysCodes.VK_RIGHT:
        //        if (!this.form._popups.isEmpty()) this.form._popups.last().keyDown();
        //        else if (activeMenuItem) {
        //            activeMenuItem.setActive(false);
        //            idx = this.getItemIndex(activeMenuItem);
        //            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_RIGHT) idx++;
        //            else idx--;
        //            if (idx > this.items.length - 1) idx = 0;
        //            if (idx < 0) idx = this.items.length - 1;
        //            this.items[idx].setActive(true);
        //        }
        //        break;
        //    case $j.types.VKeysCodes.VK_DOWN:
        //    case $j.types.VKeysCodes.VK_UP:
        //        if (!this.form._popups.isEmpty()) this.form._popups.last().keyDown();
        //        else if (activeMenuItem) {
        //            if (activeMenuItem.items.length > 0) {
        //                if (!activeMenuItem.popupMenu) {
        //                    activeMenuItem.showSubMenu();
        //                    //if (activeMenuItem.items.first())) activeMenuItem.items.first().setActive(true);
        //                    if (!activeMenuItem.items.isEmpty()) {
        //                        items = activeMenuItem.items.filter(function (e, i, a) {
        //                            return (e.enabled && e.visible && !e.isLine());
        //                        });
        //                        if (items) {
        //                            if (!items.isEmpty()) items.first().setActive(true);
        //                        }
        //                    }
        //                } else activeMenuItem.popupMenu.keyDown();
        //            }
        //        }
        //        break;
        //    default:
        //        //check if keydown is shortCut
        //        // test ctrl key first
        //        if ($j.keyboard.ctrl) shortcut += 'Ctrl';
        //        if ($j.keyboard.alt) {
        //            if (!shortcut.isEmpty()) shortcut += '+';
        //            shortcut += 'Alt';
        //        }
        //        if ($j.keyboard.shift) {
        //            if (!shortcut.isEmpty()) shortcut += '+';
        //            shortcut += 'Shift';
        //        }
        //        if (!shortcut.isEmpty() && !$j.keyboard.keyChar.isEmpty()) shortcut += '+';
        //        shortcut += $j.keyboard.keyChar.toUpperCase();
        //        var menuItems = this._menuItems.filter(function (e, i, a) {
        //            return (e.shortcut === shortcut);
        //        });
        //        if (menuItems.length > 0) menuItems.first().click();
        //        break;
        //}
    }
    //#endregion keyDown
    //#region keyUp
    keyUp() {
        //var activeMenuItem, idx;
        //activeMenuItem = this.getActiveItem();
        //switch ($j.keyboard.keyCode) {
        //    case $j.types.VKeysCodes.VK_ALT:
        //        if (activeMenuItem) {
        //            activeMenuItem.setActive(false);
        //            $j.CSS.removeClass(this._HTMLElement, 'isactive');
        //            $j.CSS.removeClass(this._htmlCaption.firstElementChild, 'isactive');
        //            this.form.closePopups();
        //        } else {
        //            if (!this.items.isEmpty()) {
        //                items = this.items.filter(function (e, i, a) {
        //                    return (e.enabled && e.visible && !e.isLine());
        //                });
        //                if (items) {
        //                    if (!items.isEmpty()) items.first().setActive(true);
        //                }
        //            }
        //            $j.CSS.addClass(this._HTMLElement, 'isactive');
        //            $j.CSS.addClass(this._htmlCaption.firstElementChild, 'isactive');
        //        }
        //        break;
        //    case $j.types.VKeysCodes.VK_RETURN:
        //    case $j.types.VKeysCodes.VK_ENTER:
        //        if (!this.form._popups.isEmpty()) this.form._popups.last().keyDown();
        //        $j.keyboard.stopEvent();
        //        break;
        //}
    }
    //#endregion keyUp
    //#endregion Methods
}
Object.defineProperties(MainMenu.prototype, {
    'active': {
        enumerable: !0
    },
    'images': {
        enumerable: !0
    }
});
//#endregion MainMenu
core.classes.register(core.types.CATEGORIES.MENUS, MainMenu);
//#region Templates
if (core.isHTMLRenderer) {
    const MainMenuTpl = ['<jagui-mainmenu id="{internalId}" data-class="MainMenu" class="Control ShortCutIcon MainMenu">',
        '<properties>{ "name": "{name}" }</properties>',
        '</jagui-menuitem>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: MainMenu, template: MainMenuTpl }]);
}
//#endregion Templates
export { MainMenu };