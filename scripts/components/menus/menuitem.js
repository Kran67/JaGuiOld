﻿//#region Import
import { Component } from '/scripts/core/component.js';
import { Action } from '/scripts/components/actions/action.js';
import { Text } from '/scripts/core/text.js';
//#endregion Import
//#region Class MenuItem
class MenuItem extends Component {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                caption: props.hasOwnProperty('caption') && core.tools.isString(props.caption) ? props.caption : String.EMPTY,
                inMainMenu: !1,
                shortcut: String.EMPTY,
                radioItem: !1,
                groupIndex: 0,
                imageIndex: -1,
                autoCheck: !1,
                active: !1,
                action: null
            });
            core.classes.newCollection(this, this, MenuItem);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return core.private(this).caption;
    }
    set caption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.caption !== newValue && (priv.caption = newValue) && this.update();
    }
    //#endregion caption
    //#region shortcut
    get shortcut() {
        return core.private(this).shortcut;
    }
    set shortcut(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.shortcut !== newValue && (priv.shortcut = newValue) && this.update();
    }
    //#endregion shortcut
    //#region checked
    get checked() {
        return core.private(this).checked;
    }
    set checked(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const list = this.owner.items;
        let c = 0;
        let cc = 0;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) &&  priv.checked !== newValue) {
            newValue && (priv.checked = newValue);
            if (priv.radioItem) {
                //for (let i = 0, l = list.length; i < l; i++)
                list.forEach(item => {
                    if (item instanceof MenuItem && (item !== this) && (item.groupIndex === priv.groupIndex) && item.radioItem) {
                        item.checked && cc++;
                        newValue && (item.checked = !1);
                        item.HTMLElement.classList[priv.checked ? 'add': 'remove']('checked');
                        c++;
                    }
                })
                // check
                if ((!newValue && (c === 0)) || (!newValue && (cc === 0))) {
                    return;
                }
            }
            priv.radioItem && this.HTMLElement.classList[priv.checked ? 'add': 'remove']('checked');
            this.update();
        }
    }
    //#endregion checked
    //#region radioItem
    get radioItem() {
        return core.private(this).radioItem;
    }
    set radioItem(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.isRadioItem !== newValue && (priv.radioItem = newValue) && this.update();
    }
    //#endregion radioItem
    //#region groupItem
    get groupItem() {
        return core.private(this).groupItem;
    }
    set groupItem(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.groupIndex !== newValue && (priv.groupIndex = newValue);
    }
    //#endregion groupItem
    //#region imageIndex
    get imageIndex() {
        return core.private(this).imageIndex;
    }
    set imageIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.imageIndex !== newValue && (priv.imageIndex = newValue) && this.update();
    }
    //#endregion imageIndex
    //#region autoCheck
    get autoCheck() {
        return core.private(this).autoCheck;
    }
    set autoCheck(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.autoCheck !== newValue && (priv.autoCheck = newValue);
    }
    //#endregion autoCheck
    //#region active
    get active() {
        return core.private(this).active;
    }
    set active(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.autoCheck !== newValue) {
            priv.active = newValue;
            htmlElement && htmlElement.classList[priv.active ? 'add': 'remove']('active');
        }
    }
    //#endregion active
    //#region action
    get action() {
        return core.private(this).action;
    }
    set action(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Action && priv.action !== newValue) {
            priv.action instanceof core.classes.Action && priv.action.unRegisterChanges(this);
            priv.action = newValue;
            priv.action.registerChanges(this);
            priv.action.updateTarget(this);
        }
    }
    //#endregion action
    //#region template
    get template() {
        //#region Variables déclaration
        const classes = core.classes;
        const priv = core.private(this);
        let html
        let a;
        const theme = this.form.themeName
        let popupMenu;
        let imgList;
        const owner = this.owner;
        //#endregion Variables déclaration
        if (priv.caption === core.types.CONSTANTS.LINECAPTION) {
            html = core.templates['MenuItemSep'];
        } else {
            html = super.template;
            a = html.split('{caption}');
            html = a.join(this.captionToHTML());
            a = html.split('{asChilds}');
            html = this.items.length > 0 && !priv.inMainMenu ? a.join('true') : html = a.join('false');
            a = html.split('{shortcut}');
            html = priv.inMainMenu ? a.join(String.EMPTY) : a.join(priv.shortcut);
        }
        //a = html.split('{internalId}')
        //html = a.join(this.internalId);
        //a = html.split('{theme}');
        //html = a.join(theme);
        if (/*owner instanceof classes.PopupMenu ||*/ owner instanceof core.classes.MainMenu) {
            popupMenu = owner;
        //} else if (owner.popupMenu instanceof classes.PopupMenu) {
        //    popupMenu = owner.popupMenu;
        }
        a = html.split('{icon}');
        if (popupMenu.images && priv.imageIndex > -1) {
            popupMenu.images.images[priv.imageIndex] && (imgList = popupMenu.images);
        } else if (priv.action && priv.action.owner.imageList) {
            imgList = priv.action.owner.imageList;
        }
        html = imgList
            ? a.join(`style='background-image:url("${imgList.getImage(priv.imageIndex)}");background-size:${imgList.imageWidth}px ${imgList.imageHeight}px`)
            : a.join(String.EMPTY);
        if (priv.shortcut !== String.EMPTY) {
            html = html.replace('Ctrl', "<span class='ctrl'></span>");
            html = html.replace('Alt', "<span class='alt'></span>");
            html = html.replace('Shift', "<span class='shift'></span>");
            html = html.replace('Sys', "<span class='sys'></span>");
        }
        return html;
    }
    //#endregion template
    //#region text
    get text() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return Text.replace(priv.caption, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
    }
    //#endregion text
    //#region activeItem
    get activeItem() {
        return this.items.find(e => e.enabled && e.visible && e.active);
    }
    //#endregion activeItem
    //#endregion Getters / Setters
    //#region Methods
    //#region insert
    insert(index, item) {
    }
    //#endregion insert
    //#region delete
    delete(index) {
    }
    //#endregion delete
    //#region clear
    clear() {
        //#region Variables déclaration
        const items = this.items;
        let l = items.length - 1;
        //#endregion Variables déclaration
        for (let i = l; i >= 0; i--) {
            items[i].clear();
            items[i].destroy();
        }
        items.clear();
        this.destroySubMenu();
    }
    //#endregion clear
    //#region find
    find(caption) {
        //#region Variables déclaration
        const items = this.items;
        let item = null;
        let l = items.length;
        const HOTKEYPREFIX = core.types.CONSTANTS.HOTKEYPREFIX;
        //#endregion Variables déclaration
        if (core.tools.isString(caption)) {
            caption = caption.split(HOTKEYPREFIX).join(String.EMPTY);
            for (let i = 0; i < l; i++) {
                if (caption === items[i].caption.split(HOTKEYPREFIX).join(String.EMPTY)) {
                    item = items[i];
                    break;
                }
            }
        }
        return item;
    }
    //#endregion find
    //#region indexOf
    indexOf(item) {
        return this.items.indexOf(item);
    }
    //#endregion indexOf
    //#region isSeparator
    isSeparator() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.caption === core.types.CONSTANTS.LINECAPTION;
    }
    //#endregion isSeparator
    //#region insertNewLine
    insertNewLine(before, item) {
        before && (before = !1)
        before ? this.insertNewLineBefore(item) : this.insertNewLineAfter(item);
    }
    //#endregion insertNewLine
    //#region insertNewLineBefore
    insertNewLineBefore(item) {
    }
    //#endregion insertNewLineBefore
    //#region insertNewLineAfter
    insertNewLineAfter(item) {
    }
    //#endregion insertNewLineAfter
    //#region add
    add(item) {
    }
    //#endregion add
    //#region addItemsFromArray
    addItemsFromArray(itemsArray) {
    }
    //#endregion addItemsFromArray
    //#region removeItem
    removeItem(item) {
        item instanceof MenuItem && this.items.indexOf(item) !== -1  && this.item.remove(item);
    }
    //#endregion removeItem
    //#region showSubMenu
    showSubMenu() {
        //#region Variables déclaration
        const priv = core.private(this);
        let left = 0;
        let top = 0;
        let r;
        const htmlElement = this.HTMLElement;
        const owner = this.owner;
        const parentPopupMenu = priv.parentPopupMenu;
        const items = this.items;
        let popupMenu;
        //#endregion Variables déclaration
        if (this.owner instanceof core.classes.MainMenu) {
            r = htmlElement.getBoundingClientRect();
            left = r.left;
            top = r.top + owner.HTMLMenu.offsetHeight;
        } else {
            left = parentPopupMenu.popupBox.HTMLElement.offsetLeft + htmlElement.offsetWidth;
            top = parentPopupMenu.popupBox.HTMLElement.offsetTop + htmlElement.offsetTop;
        }
        popupMenu = priv.popupMenu = core.classes.createComponent(core.classes.PopupMenu, this, null, null, false);
        if (owner instanceof core.classes.MainMenu) {
            owner.images instanceof core.classes.ImageList && (popupMenu.images = owner.images);
        } else {
            popupMenu.images = parentPopupMenu.images;
            popupMenu.zIndex = parentPopupMenu.zIndex + 1;
        }
        popupMenu.control = this;
        popupMenu.items = items;
        items.forEach(item => {
            item.loading && item.loaded();
        });
        popupMenu.show(left, top);
        this.active = !0;
    }
    //#endregion showSubMenu
    //#region captionToHTML
    captionToHTML() {
        //#region Variables déclaration
        const priv = core.private(this);
        const caption = priv.caption;
        const idx = caption.indexOf(core.types.CONSTANTS.HOTKEYPREFIX);
        //#endregion Variables déclaration
        return idx > -1 
            ? `${caption.substr(0, idx)}<u class="ShortCutLetter">${caption.substr(idx + 1, 1)}</u>${caption.substr(idx + 2, caption.length - idx + 2)}` 
            : caption;
    }
    //#endregion captionToHTML
    //htmlClick(mouseEventArg) {
    //    var jsObj = this.jsObj;
    //    if (!jsObj.enabled) return;
    //    jsObj.click();
    //    $j.mouse.stopEvent(mouseEventArg);
    //},
    //#region click
    click() {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = this.form;
        const mainMenu = form.mainMenu;
        const action = priv.action;
        //#endregion Variables déclaration
        if (priv.inMainMenu) {
            !mainMenu.active && (this.form.mainMenu.active = !0);
            this.app.closeAllPopups();
        }
        this.app.activeWindow = form;
        if (this.items.length > 0) {
            !priv.popupMenu && this.showSubMenu();
        } else {
            if (form) {
                form.closePopups();
                mainMenu && (mainMenu.active = !1);
                if (priv.autoCheck) {
                    action ? action.checked = !action.checked : this.checked = !priv.checked;
                }
            }
            this.onClick.hasListener && this.onClick.invoke();
            priv.action && priv.action.execute();
        }
        this.enabled && this.visible && form.statusBar && form.statusBar.autoToolTip && (form.statusBar.simplePanel = !1);
    }
    //#endregion click
    //#region closeSubMenu
    closeSubMenu() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (priv.popupMenu) {
            priv.popupMenu.close();
            priv.popupMenu = null;
        }
        this.active = !1;
    }
    //#endregion closeSubMenu
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        priv.htmlCaption = htmlElement.querySelector('jagui-menuitem-caption');
        priv.htmlShortcut = htmlElement.querySelector('jagui-menuitem-shortcut');
        priv.htmlHasSubMenu = htmlElement.querySelector('jagui-menuitem-arrow');
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.items.clear();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(MenuItem.prototype, {
    'shortcut': {
        enumerable: !0
    },
    'radioItem': {
        enumerable: !0
    },
    'groupIndex': {
        enumerable: !0
    },
    'imageIndex': {
        enumerable: !0
    },
    'autoCheck': {
        enumerable: !0
    },
    'active': {
        enumerable: !0
    },
    'action': {
        enumerable: !0
    }
});
//#endregion MenuItem
core.classes.register(core.types.CATEGORIES.INTERNAL, MenuItem);
//#region Templates
if (core.isHTMLRenderer) {
    const MenuItemTpl = ['<jagui-menuitem id="{internalId}" class="Control MenuItem {theme}">',
                         '<jagui-menuitem-caption class="MenuItemCaption {theme}" {icon}>{caption}</jagui-menuitem-caption>',
                         '<jagui-menuitem-shortcut class="MenuItemShortCut {theme}">{shortcut}</jagui-menuitem-shortcut>',
                         '<jagui-menuitem-arrow class="MenuItemHasSubMenu {theme}"></jagui-menuitem-arrow>',
                         '</jagui-menuitem>'].join(String.EMPTY);
    const MenuItemSepTpl = '<jagui-menuitemsep id="{internalId}" class="Control MenuItemSep {theme}"></jagui-menuitemsep>';
    core.classes.registerTemplates([{ Class: MenuItem, template: MenuItemTpl }, { Class: 'MenuItemSep', template: MenuItemSepTpl }]);
}
//#endregion Templates
export { MenuItem };