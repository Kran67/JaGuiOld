//#region Import
import { PopupBox } from '/scripts/core/popupbox.js';
import { MenuItem } from '/scripts/components/menus/menuitem.js';
//#endregion Import
//#region Class PopupMenuBox
class PopupMenuBox extends PopupBox {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            const DIRECTIONS = core.types.DIRECTIONS;
            core.private(this, {
                direction: props.hasOwnProperty('direction') && core.tools.valueInSet(props.direction, DIRECTIONS) ? props.direction : DIRECTIONS.RIGHT,
                zIndex: 10000
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region direction
    get direction() {
        return core.private(this).direction;
    }
    set direction(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.valueInSet(props.direction, DIRECTIONS) && priv.directon !== newValue && (priv.directon = newValue);
    }
    //#endregion direction
    //#endregion Getters / Setters
    //#region Methods
    //#region keyDown
    keyDown() {
        //var activeMenuItem, idx, oldActiveMenuItem, items, form;
        //activeMenuItem = this._owner.getActiveItem();
        //this._inherited();
        //form = this.form;
        //switch ($j.keyboard.keyCode) {
        //    case $j.types.VKeysCodes.VK_LEFT:
        //        if (activeMenuItem) {
        //            if (activeMenuItem._owner.popupMenu) {
        //                activeMenuItem._owner.closeSubMenu();
        //                activeMenuItem._owner.setActive(true);
        //                if (activeMenuItem._owner._owner === form.mainMenu) {
        //                    if (form.mainMenu.getActiveItem()) {
        //                        form.mainMenu.keyDown();
        //                        activeMenuItem = form.mainMenu.getActiveItem();
        //                        activeMenuItem.showSubMenu();
        //                        if (!activeMenuItem.items.isEmpty()) {
        //                            items = activeMenuItem.items.filter(function (e, i, a) {
        //                                return (e.enabled && e.visible && !e.isLine());
        //                            });
        //                            if (items) {
        //                                if (!items.isEmpty()) items.first().setActive(true);
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //        break;
        //    case $j.types.VKeysCodes.VK_RIGHT:
        //        if (activeMenuItem) {
        //            if (activeMenuItem.items.length > 0) {
        //                if (!activeMenuItem.popupMenu) {
        //                    activeMenuItem.showSubMenu();
        //                    if (!activeMenuItem.items.isEmpty()) {
        //                        items = activeMenuItem.items.filter(function (e, i, a) {
        //                            return (e.enabled && e.visible && !e.isLine());
        //                        });
        //                        if (items) {
        //                            if (!items.isEmpty()) items.first().setActive(true);
        //                        }
        //                    }
        //                }
        //            } else if (this.form.mainMenu.getActiveItem()) {
        //                idx = form.mainMenu.getItemIndex(this.form.mainMenu.getActiveItem());
        //                form.closePopups();
        //                form.mainMenu.items[idx].setActive(true);
        //                form.mainMenu.keyDown();
        //                activeMenuItem = form.mainMenu.getActiveItem();
        //                activeMenuItem.showSubMenu();
        //                if (!activeMenuItem.items.isEmpty()) {
        //                    items = activeMenuItem.items.filter(function (e, i, a) {
        //                        return (e.enabled && e.visible && !e.isLine());
        //                    });
        //                    if (items) {
        //                        if (!items.isEmpty()) items.first().setActive(true);
        //                    }
        //                }
        //            }
        //        }
        //        break;
        //    case $j.types.VKeysCodes.VK_DOWN:
        //    case $j.types.VKeysCodes.VK_UP:
        //        if (!activeMenuItem) {
        //            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_DOWN) {
        //                if (!this._owner.items.isEmpty()) {
        //                    items = this._owner.items.filter(function (e, i, a) {
        //                        return (e.enabled && e.visible && !e.isLine());
        //                    });
        //                    if (items) {
        //                        if (!items.isEmpty()) items.first().setActive(true);
        //                    }
        //                }
        //            } else this._owner.items.last().setActive(true);
        //        } else {
        //            activeMenuItem.setActive(false);
        //            idx = this._owner.getItemIndex(activeMenuItem);
        //            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_DOWN) idx++;
        //            else idx--;
        //            if (idx > this._owner.items.length - 1) idx = 0;
        //            if (idx < 0) idx = this._owner.items.length - 1;
        //            if (this._owner.items[idx].isLine() || !this._owner.items[idx].enabled) {
        //                while (this._owner.items[idx].isLine() || !this._owner.items[idx].enabled) {
        //                    if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_DOWN) idx++;
        //                    else idx--;
        //                }
        //            }
        //            if (idx > this._owner.items.length - 1) idx = 0;
        //            if (idx < 0) idx = this._owner.items.length - 1;
        //            this._owner.items[idx].setActive(true);
        //        }
        //        break;
        //}
    }
    //#endregion keyDown
    //#region keyUp
    keyUp() {
        //var activeMenuItem, idx;
        //activeMenuItem = this._owner.getActiveItem();
        //this._inherited();
        //switch ($j.keyboard.keyCode) {
        //    case $j.types.VKeysCodes.VK_RETURN:
        //    case $j.types.VKeysCodes.VK_ENTER:
        //        if (activeMenuItem) activeMenuItem.click();
        //        if (!activeMenuItem.items.isEmpty()) {
        //            items = activeMenuItem.items.filter(function (e, i, a) {
        //                return (e.enabled && e.visible && !e.isLine());
        //            });
        //            if (items) {
        //                if (!items.isEmpty()) items.first().setActive(true);
        //            }
        //        }
        //        break;
        //}
    }
    //#endregion keyUp
    //#region close
    close() {
        //for (var i = 0, l = this._owner.items.length; i < l; i++) {
        //    var item = this._owner.items[i];
        //    item.setActive(false);
        //    if (item._HTMLElement) {
        //        item._HTMLElement.jsObj = null;
        //        $j.tools.events.unBind(item._HTMLElement, $j.types.mouseEvents.CLICK, item.click);
        //        $j.tools.events.unBind(item._HTMLElement, $j.types.mouseEvents.ENTER, item.HTMLMouseEnter);
        //        $j.tools.events.unBind(item._HTMLElement, $j.types.mouseEvents.LEAVE, item.HTMLMouseLeave);
        //        if (!item.isLine()) {
        //            item._HTMLElement.removeChild(item._htmlCaption);
        //            item._HTMLElement.removeChild(item._htmlHasSubMenu);
        //            item._HTMLElement.removeChild(item._htmlShortcut);
        //        }
        //        item._parentPopupMenu = null;
        //        item._HTMLElement.parentNode.removeChild(item._HTMLElement);
        //        item._HTMLElement = null;
        //    }
        //}
        //if (this._control) $j.CSS.removeClass(this._control._HTMLElement, 'opened');
        //if (this._HTMLElement) {
        //    if (this._HTMLElement.firstElementChild) this._HTMLElement.removeChild(this._HTMLElement.firstElementChild);
        //    this._HTMLElement.parentNode.removeChild(this._HTMLElement);
        //    this._HTMLElement = null;
        //}
        //if (this.form._popups) this.form._popups.remove(this);
    }
    //#endregion close
    //#region show
    show(x, y) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const body = document.body;
        const control = this.refControl;
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        let direction = priv.direction;
        const content = htmlElement.querySelector('.subMenu');
        const owner = this.owner;
        //#endregion Variables déclaration
        super.show(x, y);
        owner.items.forEach(item => {
            content.appendChild(item.HTMLElement);
            item.parentPopupMenu = owner;
        });
        //priv.direction = $j.types.directions.RIGHT;
        //for (var i = 0, l = this._owner.items.length; i < l; i++) {
        //    var item = this._owner.items[i];
        //    item._HTMLElement = $j.doc.getElementById(item._internalId);
        //    item._HTMLElement.jsObj = item;
        //    item._HTMLElement.dataset.ischecked = item.isChecked;
        //    item._HTMLElement.dataset.isradioitem = item.isRadioItem;
        //    item._parentPopupMenu = this._owner;
        //    if (item.caption !== _const.LINECAPTION) {
        //        item._htmlCaption = item._HTMLElement.firstElementChild;
        //        item._htmlShortcut = item._htmlCaption.nextSibling;
        //        while (item._htmlShortcut.nodeType !== $j.types.xmlNodeTypes.ELEMENT_NODE) {
        //            item._htmlShortcut = item._htmlShortcut.nextSibling;
        //        }
        //        item._htmlHasSubMenu = item._HTMLElement.lastElementChild;
        //    }
        //    $j.tools.events.bind(item._HTMLElement, $j.types.mouseEvents.CLICK, item.htmlClick);
        //    $j.tools.events.bind(item._HTMLElement, $j.types.mouseEvents.ENTER, item.HTMLMouseEnter);
        //    $j.tools.events.bind(item._HTMLElement, $j.types.mouseEvents.LEAVE, item.HTMLMouseLeave);
        //    if (item.isChecked) $j.CSS.addClass(item._HTMLElement, 'ischecked');
        //    if (item.isRadioItem) $j.CSS.addClass(item._HTMLElement, 'isradioitem');
        //    if (!item.enabled) $j.CSS.addClass(item._HTMLElement, 'disabled');
        //    if (!item.visible) $j.CSS.addClass(item._HTMLElement, 'noDisplay');
        //    if (item.items.length === 0) $j.CSS.addClass(item._htmlHasSubMenu, 'nochilds');
        //    $j.CSS.addClass(item._HTMLElement, this.form.getThemeName());
        //}
        if (htmlElement.offsetTop + htmlElement.offsetHeight > body.offsetHeight) {
            htmlElementStyle.top = control instanceof MenuItem 
                ? `${htmlElement.offsetTop - htmlElement.offsetHeight + control.HTMLElement.offsetHeight}${PX}`
                : `${body.offsetHeight - htmlElement.offsetHeight - 5}${PX}`;
        }
        if (!(control instanceof MenuItem)) {
            if (htmlElement.offsetLeft + htmlElement.offsetWidth > body.offsetWidth) {
                htmlElementStyle.left = `${body.offsetWidth - htmlElement.offsetWidth - 5}${PX}`;
                direction = core.types.DIRECTIONS.LEFT;
            }
        } else {
            control.parentPopupMenu && (direction = control.parentPopupMenu.popupBox.direction);
            htmlElement.offsetLeft + htmlElement.offsetWidth > body.offsetWidth && (direction = core.types.DIRECTIONS.LEFT);
            // on part de droite à gauche
            if (direction === core.types.DIRECTIONS.LEFT) {
                htmlElementStyle.left = `${control.parentPopupMenu.popupBox.HTMLElement.offsetLeft - htmlElement.offsetWidth}${PX}`;
            }
        }
        htmlElementStyle.zIndex = priv.zIndex;
        htmlElement.classList.add('animated', 'fadeIn');
    }
    //#endregion show
    //#region mouseLeave
    mouseLeave() {
        //#region Variables déclaration
        const control = this.refControl;
        //#endregion Variables déclaration
        super.mouseLeave();
        control.popupMenu && control.popupMenu.activeItem && (control.popupMenu.activeItem.active = !1);
    }
    //#endregion mouseLeave
    //#endregion Methods
}
Object.defineProperties(PopupMenuBox.prototype, {
    'direction': {
        enumerable: !0
    }
});
//#endregion PopupMenuBox
core.classes.register(core.types.CATEGORIES.INTERNAL, PopupMenuBox);
//#region Templates
if (core.isHTMLRenderer) {
const PopupMenuBoxTpl = ['<jagui-popupmenubox id="{internalId}" data-class="PopupMenuBox" class="Control PopupMenuBox PopupBox csr_default animated {theme}"><properties>{ "name": "{name}" }</properties>',
                         '<jagui-submenu class="Control subMenu {theme}">',
                         '</jagui-submenu></jagui-popupmenubox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PopupMenuBox, template: PopupMenuBoxTpl }]);
}
//#endregion Templates
export { PopupMenuBox };