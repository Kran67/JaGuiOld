//#region Import
import { Component } from '/scripts/core/component.js';
import { Action } from '/scripts/components/actions/action.js';
import { Text } from '/scripts/core/text.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
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
                inMainMenu: props.hasOwnProperty('inMainMenu') && core.tools.isBool(props.inMainMenu) ? props.inMainMenu : !1,
                shortcut: props.hasOwnProperty('shortcut') ? props.shortcut : String.EMPTY,
                radioItem: props.hasOwnProperty('radioItem') && core.tools.isBool(props.radioItem) ? props.radioItem : !1,
                groupIndex: props.hasOwnProperty('groupIndex') && core.tools.isNumber(props.groupIndex) ? props.groupIndex : 0,
                imageIndex: props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex) ? props.imageIndex : -1,
                autoCheck: props.hasOwnProperty('autoCheck') && core.tools.isBool(props.autoCheck) ? props.autoCheck : !1,
                active: props.hasOwnProperty('active') && core.tools.isBool(props.active) ? props.active : !1,
                enabled: props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled) ? props.enabled : !0,
                checked: props.hasOwnProperty('checked') && core.tools.isBool(props.checked) ? props.checked : !1,
                action: null
            });
            core.classes.newCollection(this, this, MenuItem);
            this.createEventsAndBind(['onClick'], props);
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
                list.forEach(item => {
                    if (item instanceof MenuItem && (item !== this) && (item.groupIndex === priv.groupIndex) && item.radioItem && item.checked) {
                        item.checked && cc++;
                        newValue && (item.checked = !1);
                        item.HTMLElement.classList[priv.checked ? 'remove': 'add']('checked');
                        c++;
                    }
                })
                // check
                if ((!newValue && (c === 0)) || (!newValue && (cc === 0))) {
                    return;
                }
            }
            priv.radioItem && this.HTMLElement.classList[priv.checked ? 'add': 'remove']('checked');
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
        core.tools.isBool(newValue) && priv.radioItem !== newValue && (priv.radioItem = newValue) && this.update();
    }
    //#endregion radioItem
    //#region groupIndex
    get groupIndex() {
        return core.private(this).groupIndex;
    }
    set groupIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.groupIndex !== newValue && (priv.groupIndex = newValue);
    }
    //#endregion groupIndex
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
        if (core.tools.isBool(newValue) && priv.active !== newValue) {
            priv.active = newValue;
            htmlElement && htmlElement.classList[priv.active ? 'add': 'remove']('active');
            !priv.active && priv.popupMenu && this.closeSubMenu();
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
    //#region enabled
    get enabled() {
        return core.private(this).enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.enabled !== newValue && (priv.enabled = newValue) && this.update();
    }
    //#endregion enabled
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
            a = html.split('{internalId}');
            html = a.join(String.uniqueId());
        } else {
            html = super.template;
            a = html.split('{caption}');
            html = a.join(this.captionToHTML());
            a = html.split('{asChilds}');
            html = this.items.length > 0 && !priv.inMainMenu ? a.join(String.EMPTY) : a.join('nochilds');
            a = html.split('{shortcut}');
            html = priv.inMainMenu ? a.join(String.EMPTY) : a.join(priv.shortcut);
            a = html.split('{inMainMenu}');
            html = priv.inMainMenu ? a.join('inMainMenu') : a.join(String.EMPTY);
        }
        a = html.split('{theme}');
        html = a.join(theme);
        if (owner instanceof classes.PopupMenu || owner instanceof classes.MainMenu) {
            popupMenu = owner;
        } else if (owner.popupMenu instanceof classes.PopupMenu) {
            popupMenu = owner.popupMenu;
        }
        a = html.split('{icon}');
        imgList = this.getImageList();
        html = imgList && priv.imageIndex > -1 && !String.isNullOrEmpty(imgList.getImage(priv.imageIndex))
            ? a.join(`style='background-image:url("${imgList.getImage(priv.imageIndex)}");background-size:${imgList.imageWidth}px ${imgList.imageHeight}px'`)
            : a.join(String.EMPTY);
        if (priv.shortcut !== String.EMPTY) {
            html = html.replace('Ctrl', '<span class="ctrl"></span>');
            html = html.replace('Alt', '<span class="alt"></span>');
            html = html.replace('Shift', '<span class="shift"></span>');
            html = html.replace('Sys', '<span class="sys"></span>');
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
    //#region isEnabled
    isEnabled() {
        return core.private(this).enabled;
    }
    //#endregion isEnabled
    //#region inMainMenu
    get inMainMenu() {
        return core.private(this).inMainMenu;
    }
    //#endregion inMainMenu
    //#region parentPopupMenu
    set parentPopupMenu(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        (newValue instanceof core.classes.PopupMenu || !newValue) && (priv.parentPopupMenu !== newValue) && (priv.parentPopupMenu = newValue);
    }
    //#endregion parentPopupMenu
    //#region popupMenu
    get popupMenu() {
        return core.private(this).popupMenu;
    }
    //#endregion popupMenu
    //#endregion Getters / Setters
    //#region Methods
    //#region getImageList
    getImageList() {
        //#region Variables déclaration
        let owner = this.owner;
        //#endregion Variables déclaration
        while (owner instanceof core.classes.MenuItem) {
            owner = owner.owner;
        }
        return owner.images;
    }
    //#endregion getImageList
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
        const mainMenuBar = this.form.HTMLElement.querySelector('.MainMenuBar');
        //#endregion Variables déclaration
        if (owner instanceof core.classes.MainMenu) {
            r = htmlElement.getBoundingClientRect();
            left = r.left;
            top = r.top + mainMenuBar.offsetHeight;
        } else {
            left = parentPopupMenu.popupBox.HTMLElement.offsetLeft + htmlElement.offsetWidth;
            top = parentPopupMenu.popupBox.HTMLElement.offsetTop + htmlElement.offsetTop;
        }
        popupMenu = priv.popupMenu = core.classes.createComponent({
            class: core.classes.PopupMenu,
            owner: this,
            props: {
                control: this
            },
            withTpl: !1
        });
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
            form.focusedControl.killFocus();
            this.setFocus();
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
        //this.enabled && this.visible && form.statusBar && form.statusBar.autoToolTip && (form.statusBar.simplePanel = !1);
    }
    //#endregion click
    //#region closeSubMenu
    closeSubMenu() {
        //#region Variables déclaration
        const priv = core.private(this);
        const owner = this.owner;
        //#endregion Variables déclaration
        priv.popupMenu.items.forEach(item => {
            item.active = !1
        });
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
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        //#endregion Variables déclaration
        super.loaded();
        priv.htmlCaption = htmlElement.querySelector('jagui-menuitem-caption');
        priv.htmlShortcut = htmlElement.querySelector('jagui-menuitem-shortcut');
        priv.htmlHasSubMenu = htmlElement.querySelector('jagui-menuitem-arrow');
        if (priv.props.hasOwnProperty('items')) {
            priv.htmlHasSubMenu.classList.remove('nochilds');
            priv.props.items.forEach(item => {
                const menuItem = new MenuItem(this, item);
                const tpl = menuItem.template;
                const container = document.createElement(core.types.HTMLELEMENTS.DIV);
                container.innerHTML = tpl;
                menuItem.HTMLElement = container.firstElementChild;
                menuItem.HTMLElement.jsObj = menuItem;
                menuItem.HTMLElementStyle = menuItem.HTMLElement.style;
                menuItem.internalId = container.firstElementChild.id;
                menuItem.loaded();
                this.items.push(menuItem);
            });
        }
        priv.htmlCaption && this.update();
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const items = this.items;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        items.clear();
        this.unBindAndDestroyEvents(['onClick']);
        super.destroy();
    }
    //#endregion destroy
    //#region setFocus
    setFocus() {
        this.form.focusedControl.killFocus();
        this.form.focusedControl = this;
        this.active = !0;
    }
    //#endregion setFocus
    //#region killFocus
    killFocus() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.active = !1;
    }
    //#endregion killFocus
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        let imgList;
        const caption = this.captionToHTML();
        let shortcut = priv.shortcut;
        //#endregion Variables déclaration
        imgList = this.getImageList();
        if (imgList && priv.imageIndex > -1) {
            !String.isNullOrEmpty(imgList.getImage(priv.imageIndex)) 
                ? (htmlElementStyle.backgroundImage = `url("${imgList.getImage(priv.imageIndex)}")`) && (htmlElementStyle.backgroundSize = `${imgList.imageWidth}px ${imgList.imageHeight}px`)
            : htmlElementStyle.backgroundImage = String.EMPTY;
        }

        priv.htmlCaption.innerHTML !== caption && (priv.htmlCaption.innerHTML = caption);
        if (!String.isNullOrEmpty(shortcut)) {
            shortcut = shortcut.replace('Ctrl', '<span class="ctrl"></span>');
            shortcut = shortcut.replace('Alt', '<span class="alt"></span>');
            shortcut = shortcut.replace('Shift', '<span class="shift"></span>');
            shortcut = shortcut.replace('Sys', '<span class="sys"></span>');
        }
        priv.htmlShortcut.innerHTML !== shortcut && (priv.htmlShortcut.innerHTML = shortcut);
        priv.enabled && htmlElement.classList.contains('disabled') && htmlElement.classList.remove('disabled');
        !priv.enabled && !htmlElement.classList.contains('disabled') && htmlElement.classList.add('disabled');
        htmlElement.classList[priv.checked ? 'add': 'remove']('checked');
        htmlElement.classList[priv.radioItem ? 'add': 'remove']('radioitem');
    }
    //#endregion update
    //#region mouseEnter
    mouseEnter() {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = this.form;
        const owner = this.owner;
        const focusedControl = this.form.focusedControl;
        //#endregion Variables déclaration
        focusedControl !== this && focusedControl instanceof MenuItem && focusedControl.active 
            && focusedControl.inMainMenu && priv.inMainMenu && this.click();
        if (!priv.inMainMenu && !priv.active) {
            owner.popupMenu.activeItem && (owner.popupMenu.activeItem.active = !1);
            this.active = !0;
            this.items.length > 0 && this.showSubMenu();
        } else {
            this.popupMenu && this.popupMenu.activeItem && (this.popupMenu.activeItem.active = !1);
        }
    }
    //#endregion mouseEnter
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
    },
    'enabled': {
        enumerable: !0
    },
    'checked': {
        enumerable: !0
    }
});
//#endregion MenuItem
core.classes.register(core.types.CATEGORIES.INTERNAL, MenuItem);
//#region Templates
if (core.isHTMLRenderer) {
    const MenuItemTpl = ['<jagui-menuitem id="{internalId}" class="Control MenuItem {theme} {inMainMenu}">',
                         '<jagui-menuitem-caption class="MenuItemCaption {theme} {inMainMenu}" {icon}>{caption}</jagui-menuitem-caption>',
                         '<jagui-menuitem-shortcut class="MenuItemShortCut {theme} {inMainMenu}">{shortcut}</jagui-menuitem-shortcut>',
                         '<jagui-menuitem-arrow class="MenuItemHasSubMenu {theme} {asChilds} {inMainMenu}"></jagui-menuitem-arrow>',
                         '</jagui-menuitem>'].join(String.EMPTY);
    const MenuItemSepTpl = '<jagui-menuitemsep id="{internalId}" class="Control MenuItemSep {theme}"></jagui-menuitemsep>';
    core.classes.registerTemplates([{ Class: MenuItem, template: MenuItemTpl }, { Class: 'MenuItemSep', template: MenuItemSepTpl }]);
}
//#endregion Templates
export { MenuItem };