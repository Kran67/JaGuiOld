﻿//#region Import
import { Component } from '/scripts/core/component.js';
import { MenuItem } from '/scripts/components/menus/menuitem.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class MainMenu
class MainMenu extends Component {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                active: props.hasOwnProperty('active') && core.tools.isBool(props.active) ? props.active : !1,
                images: null
            });
            core.classes.newCollection(this, this, core.classes.MenuItem);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
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
        const priv = core.private(this);
        const form = this.form;
        //#endregion Variables déclaration
        super.loaded();
        priv.HTMLMenu = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}-bar`);
        priv.HTMLMenu.classList.add('Control', 'MainMenu', form.themeName);
        form.HTMLElement.firstElementChild.appendChild(priv.HTMLMenu);
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
        const priv = core.private(this);
        const form = this.form;
        //#endregion Variables déclaration
        priv.props.hasOwnProperty('images') && form[priv.props.images] && (priv.images = form[priv.props.images]);
    }
    //#endregion getImages
    //#region generateItems
    generateItems() {
        //#region Variables déclaration
        const priv = core.private(this);
        const menus = priv.props.menus;
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        //#endregion Variables déclaration
        menus.forEach(menu => {
            //if (item.HTMLElement) {
            //    item.htmlCaption.remove();
            //    item.htmlCaption = null;
            //    item.htmlShortcut.remove();
            //    item.htmlShortcut = null;
            //    item.htmlHasSubMenu.remove();
            //    item.htmlHasSubMenu = null;
            //    item.HTMLElement.remove();
            //    item.HTMLElement = null;
            //    Events.unBind(item.HTMLElement, MOUSEEVENTS.CLICK, item.htmlClick);
            //    Events.unBind(item.HTMLElement, MOUSEEVENTS.ENTER, item.HTMLMouseEnter);
            //    Events.unBind(item.HTMLElement, MOUSEEVENTS.LEAVE, item.HTMLMouseLeave);
            //}
            //let tpl = menu.template;
            //const tmpDiv = document.createElement(core.types.HTMLELEMENTS.DIV);
            //tmpDiv.innerHTML = tpl;
            //priv.HTMLMenu.appendChild(tmpDiv.firstElementChild);
            //menu.getHTMLElement(menu.internalId);
            //menu.getChilds();
            //menu.HTMLElement.classList.add('inMainMenu');
            //menu.htmlCaption.classList.add('inMainMenu');
            //menu.htmlShortcut.classList.add('inMainMenu');
            //menu.htmlHasSubMenu.classList.add('nochilds inMainMenu');
            //this.items.push(menu);
            //Events.bind(menu.HTMLElement, MOUSEEVENTS.CLICK, menu.htmlClick);
            //Events.bind(menu.HTMLElement, MOUSEEVENTS.ENTER, menu.HTMLMouseEnter);
            //Events.bind(menu.HTMLElement, MOUSEEVENTS.LEAVE, menu.HTMLMouseLeave);
            const newMenu = core.classes.createComponent({
                class: MenuItem,
                owner: this,
                props: {
                    ...menu,
                    parentHTML: priv.HTMLMenu
                }
            });
            this.items.push(newMenu);
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