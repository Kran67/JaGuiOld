//#region Import
import { Component } from '/scripts/core/component.js';
import { Action } from '/scripts/components/actions/action.js';
import { Text } from '/scripts/core/text.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class MenuItem
class MenuItem extends Component {
    //#region Private fields
    #caption;
    #inMainMenu;
    #shortcut;
    #radioItem;
    #groupIndex;
    #imageIndex;
    #autoCheck;
    #active;
    #enabled;
    #checked;
    #action = null;
    #items = [];
    #popupMenu;
    #parentPopupMenu;
    #item;
    #htmlCaption;
    #htmlShortcut;
    #htmlHasSubMenu;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#caption = props.hasOwnProperty('caption') && core.tools.isString(props.caption) ? props.caption : String.EMPTY;
            this.#inMainMenu = props.hasOwnProperty('inMainMenu') && core.tools.isBool(props.inMainMenu) ? props.inMainMenu : !1;
            this.#shortcut = props.hasOwnProperty('shortcut') ? props.shortcut : String.EMPTY;
            this.#radioItem = props.hasOwnProperty('radioItem') && core.tools.isBool(props.radioItem) ? props.radioItem : !1;
            this.#groupIndex = props.hasOwnProperty('groupIndex') && core.tools.isNumber(props.groupIndex) ? props.groupIndex : 0;
            this.#imageIndex = props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex) ? props.imageIndex : -1;
            this.#autoCheck = props.hasOwnProperty('autoCheck') && core.tools.isBool(props.autoCheck) ? props.autoCheck : !1;
            this.#active = props.hasOwnProperty('active') && core.tools.isBool(props.active) ? props.active : !1;
            this.#enabled = props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled) ? props.enabled : !0;
            this.#checked = props.hasOwnProperty('checked') && core.tools.isBool(props.checked) ? props.checked : !1;
            this.mouseEvents = new core.classes.MouseEvents({
                mousemove: !0,
                mouseover: !0,
                mouseenter: !0,
                mouseleave: !0,
                mouseout: !0
            });
            this.#items.convertToCollection(owner, MenuItem);
            this.createEventsAndBind(['onClick'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region items
    get items() {
        return this.#items;
    }
    //#endregion items
    //#region caption
    get caption() {
        return this.#caption;
    }
    set caption(newValue) {
        core.tools.isString(newValue) && this.#caption !== newValue && (this.#caption = newValue) && this.update();
    }
    //#endregion caption
    //#region shortcut
    get shortcut() {
        return this.#shortcut;
    }
    set shortcut(newValue) {
        core.tools.isString(newValue) && this.#shortcut !== newValue && (this.#shortcut = newValue) && this.update();
    }
    //#endregion shortcut
    //#region checked
    get checked() {
        return this.#checked;
    }
    set checked(newValue) {
        //#region Variables déclaration
        const list = this.owner.items;
        let c = 0;
        let cc = 0;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#checked !== newValue) {
            newValue && (this.#checked = newValue);
            if (this.#radioItem) {
                list.forEach(item => {
                    if (item instanceof MenuItem && (item !== this) && (item.groupIndex === this.#groupIndex) && item.radioItem && item.checked) {
                        item.checked && cc++;
                        newValue && (item.checked = !1);
                        item.HTMLElement.classList[this.#checked ? 'remove' : 'add']('checked');
                        c++;
                    }
                });
                // check
                if ((!newValue && (c === 0)) || (!newValue && (cc === 0))) {
                    return;
                }
            }
            this.#radioItem && this.HTMLElement.classList[this.#checked ? 'add' : 'remove']('checked');
        }
    }
    //#endregion checked
    //#region radioItem
    get radioItem() {
        return this.#radioItem;
    }
    set radioItem(newValue) {
        core.tools.isBool(newValue) && this.#radioItem !== newValue && (this.#radioItem = newValue) && this.update();
    }
    //#endregion radioItem
    //#region groupIndex
    get groupIndex() {
        return this.#groupIndex;
    }
    set groupIndex(newValue) {
        core.tools.isNumber(newValue) && this.#groupIndex !== newValue && (this.#groupIndex = newValue);
    }
    //#endregion groupIndex
    //#region imageIndex
    get imageIndex() {
        return this.#imageIndex;
    }
    set imageIndex(newValue) {
        core.tools.isNumber(newValue) && this.#imageIndex !== newValue && (this.#imageIndex = newValue) && this.update();
    }
    //#endregion imageIndex
    //#region autoCheck
    get autoCheck() {
        return this.#autoCheck;
    }
    set autoCheck(newValue) {
        core.tools.isBool(newValue) && this.#autoCheck !== newValue && (this.#autoCheck = newValue);
    }
    //#endregion autoCheck
    //#region active
    get active() {
        return this.#active;
    }
    set active(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#active !== newValue) {
            this.#active = newValue;
            htmlElement && htmlElement.classList[this.#active ? 'add' : 'remove']('active');
            !this.#active && this.#popupMenu && this.closeSubMenu();
        }
    }
    //#endregion active
    //#region action
    get action() {
        return this.#action;
    }
    set action(newValue) {
        if (newValue instanceof core.classes.Action && this.#action !== newValue) {
            this.#action instanceof core.classes.Action && this.#action.unRegisterChanges(this);
            this.#action = newValue;
            this.#action.registerChanges(this);
            this.#action.updateTarget(this);
        }
    }
    //#endregion action
    //#region enabled
    get enabled() {
        return this.#enabled;
    }
    set enabled(newValue) {
        core.tools.isBool(newValue) && this.#enabled !== newValue && (this.#enabled = newValue) && this.update();
    }
    //#endregion enabled
    //#region template
    get template() {
        //#region Variables déclaration
        let html;
        let a;
        const theme = this.form.themeName;
        let imgList;
        //#endregion Variables déclaration
        if (this.#caption === core.types.CONSTANTS.LINECAPTION) {
            html = core.templates.MenuItemSep;
            a = html.split('{internalId}');
            html = a.join(String.uniqueId());
        } else {
            html = super.template;
            a = html.split('{caption}');
            html = a.join(this.captionToHTML());
            a = html.split('{asChilds}');
            html = this.#items.length > 0 && !this.#inMainMenu ? a.join(String.EMPTY) : a.join('nochilds');
            a = html.split('{shortcut}');
            html = this.#inMainMenu ? a.join(String.EMPTY) : a.join(this.#shortcut);
            a = html.split('{inMainMenu}');
            html = this.#inMainMenu ? a.join('inMainMenu') : a.join(String.EMPTY);
        }
        a = html.split('{theme}');
        html = a.join(theme);
        a = html.split('{icon}');
        imgList = this.getImageList();
        html = imgList && this.#imageIndex > -1 && !String.isNullOrEmpty(imgList.getImage(this.#imageIndex))
            ? a.join(`style='background-image:url("${imgList.getImage(this.#imageIndex)}");background-size:${imgList.imageWidth}px ${imgList.imageHeight}px'`)
            : a.join(String.EMPTY);
        if (this.#shortcut !== String.EMPTY) {
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
        return Text.replace(this.#caption, core.types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
    }
    //#endregion text
    //#region activeItem
    get activeItem() {
        return this.#items.find(e => e.enabled && e.visible && e.active);
    }
    //#endregion activeItem
    //#region isEnabled
    isEnabled() {
        return this.#enabled;
    }
    //#endregion isEnabled
    //#region inMainMenu
    get inMainMenu() {
        return this.#inMainMenu;
    }
    //#endregion inMainMenu
    //#region parentPopupMenu
    get parentPopupMenu() {
        return this.#parentPopupMenu;
    }
    set parentPopupMenu(newValue) {
        (newValue instanceof core.classes.PopupMenu || !newValue) && (this.#parentPopupMenu !== newValue) && (this.#parentPopupMenu = newValue);
    }
    //#endregion parentPopupMenu
    //#region popupMenu
    get popupMenu() {
        return this.#popupMenu;
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
        const items = this.#items;
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
        const items = this.#items;
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
        return this.#items.indexOf(item);
    }
    //#endregion indexOf
    //#region isSeparator
    isSeparator() {
        return this.#caption === core.types.CONSTANTS.LINECAPTION;
    }
    //#endregion isSeparator
    //#region insertNewLine
    insertNewLine(before, item) {
        before && (before = !1);
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
        item instanceof MenuItem && this.#items.indexOf(item) !== -1 && this.#item.remove(item);
    }
    //#endregion removeItem
    //#region showSubMenu
    showSubMenu() {
        //#region Variables déclaration
        let left = 0;
        let top = 0;
        let r;
        const htmlElement = this.HTMLElement;
        const owner = this.owner;
        const parentPopupMenu = this.#parentPopupMenu;
        const items = this.#items;
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
        popupMenu = this.#popupMenu = core.classes.createComponent({
            class: core.classes.PopupMenu,
            owner: this,
            props: {
                control: this,
                images: this.getImageList()
            },
            withTpl: !1
        });
        parentPopupMenu && (popupMenu.zIndex = parentPopupMenu.zIndex + 1);
        popupMenu.control = this;
        popupMenu.items = items;
        items.forEach(item => {
            item.loading && item.loaded();
        });
        popupMenu.loaded();
        popupMenu.show(left, top);
        this.active = !0;
    }
    //#endregion showSubMenu
    //#region captionToHTML
    captionToHTML() {
        //#region Variables déclaration
        const caption = this.#caption;
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
        const form = this.form;
        const mainMenu = form.mainMenu;
        const action = this.#action;
        //#endregion Variables déclaration
        if (this.#inMainMenu) {
            !mainMenu.active && (this.form.mainMenu.active = !0);
            this.app.closeAllPopups();
            form.focusedControl.killFocus();
            this.setFocus();
        }
        this.app.activeWindow = form;
        if (this.#items.length > 0) {
            !this.#popupMenu && this.showSubMenu();
        } else {
            if (form) {
                form.closePopups();
                mainMenu && (mainMenu.active = !1);
                if (this.#autoCheck) {
                    action ? action.checked = !action.checked : this.checked = !this.#checked;
                }
            }
            this.onClick.hasListener && this.onClick.invoke();
            this.#action && this.#action.execute();
        }
        //this.enabled && this.visible && form.statusBar && form.statusBar.autoToolTip && (form.statusBar.simplePanel = !1);
    }
    //#endregion click
    //#region closeSubMenu
    closeSubMenu() {
        this.#popupMenu.items.forEach(item => {
            item.active = !1;
        });
        if (this.#popupMenu) {
            this.#popupMenu.close();
            this.#popupMenu = null;
        }
        this.active = !1;
    }
    //#endregion closeSubMenu
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        //#endregion Variables déclaration
        super.loaded();
        this.#htmlCaption = htmlElement.querySelector('jagui-menuitem-caption');
        this.#htmlShortcut = htmlElement.querySelector('jagui-menuitem-shortcut');
        this.#htmlHasSubMenu = htmlElement.querySelector('jagui-menuitem-arrow');
        Events.bind(this.#htmlCaption, MOUSEEVENTS.LEAVE, core.tools.noEvent);
        Events.bind(this.#htmlShortcut, MOUSEEVENTS.LEAVE, core.tools.noEvent);
        Events.bind(this.#htmlHasSubMenu, MOUSEEVENTS.LEAVE, core.tools.noEvent);
        Events.bind(htmlElement, Mouse.MOUSEEVENTS.DOWN, () => { this.click(); });
        if (this.props.hasOwnProperty('items')) {
            this.#htmlHasSubMenu.classList.remove('nochilds');
            this.props.items.forEach(item => {
                const menuItem = new MenuItem(this, item);
                const tpl = menuItem.template;
                const container = document.createElement(core.types.HTMLELEMENTS.DIV);
                container.innerHTML = tpl;
                menuItem.HTMLElement = container.firstElementChild;
                //menuItem.HTMLElement.jsObj = menuItem;
                menuItem.HTMLElementStyle = menuItem.HTMLElement.style;
                menuItem.internalId = container.firstElementChild.id;
                menuItem.loaded();
                this.#items.push(menuItem);
            });
        }
        this.#htmlCaption && this.update();
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const items = this.#items;
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
        this.active = !1;
    }
    //#endregion killFocus
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const htmlCaptionStyle = this.#htmlCaption.style;
        let imgList;
        const caption = this.captionToHTML();
        let shortcut = this.#shortcut;
        //#endregion Variables déclaration
        imgList = this.getImageList();
        if (imgList && this.#imageIndex > -1) {
            !String.isNullOrEmpty(imgList.getImage(this.#imageIndex))
                ? (htmlCaptionStyle.backgroundImage = `url("${imgList.getImage(this.#imageIndex)}")`) && (htmlCaptionStyle.backgroundSize = `${imgList.imageWidth}px ${imgList.imageHeight}px`)
                : htmlCaptionStyle.backgroundImage = String.EMPTY;
        }

        this.#htmlCaption.innerHTML !== caption && (this.#htmlCaption.innerHTML = caption);
        if (!String.isNullOrEmpty(shortcut)) {
            shortcut = shortcut.replace('Ctrl', '<span class="ctrl"></span>');
            shortcut = shortcut.replace('Alt', '<span class="alt"></span>');
            shortcut = shortcut.replace('Shift', '<span class="shift"></span>');
            shortcut = shortcut.replace('Sys', '<span class="sys"></span>');
        }
        this.#htmlShortcut.innerHTML !== shortcut && (this.#htmlShortcut.innerHTML = shortcut);
        this.#enabled && htmlElement.classList.contains('disabled') && htmlElement.classList.remove('disabled');
        !this.#enabled && !htmlElement.classList.contains('disabled') && htmlElement.classList.add('disabled');
        htmlElement.classList[this.#checked ? 'add' : 'remove']('checked');
        htmlElement.classList[this.#radioItem ? 'add' : 'remove']('radioitem');
    }
    //#endregion update
    //#region mouseEnter
    mouseEnter() {
        //#region Variables déclaration
        const owner = this.owner;
        const focusedControl = this.form.focusedControl;
        const popupMenu = owner instanceof core.classes.PopupMenu ? owner : owner.popupMenu;
        //#endregion Variables déclaration
        focusedControl !== this && focusedControl instanceof MenuItem && focusedControl.active
            && focusedControl.inMainMenu && this.#inMainMenu && this.click();
        if (!this.#inMainMenu && !this.#active) {
            popupMenu && popupMenu.activeItem && (popupMenu.activeItem.active = !1);
            this.active = !0;
            this.items.length > 0 && this.showSubMenu();
        } else {
            this.popupMenu && this.popupMenu.activeItem && (this.popupMenu.activeItem.active = !1);
        }
    }
    //#endregion mouseEnter
    mouseLeave() {
        console.log(core.mouse.event);
    }
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
    const MenuItemSepTpl = '<jagui-menuitemsep id="{internalId}" class="MenuItemSep {theme}"></jagui-menuitemsep>';
    core.classes.registerTemplates([{ Class: MenuItem, template: MenuItemTpl }, { Class: 'MenuItemSep', template: MenuItemSepTpl }]);
}
//#endregion Templates
export { MenuItem };