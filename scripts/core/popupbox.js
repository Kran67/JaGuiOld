import { ThemedControl } from '/scripts/core/themedcontrol.js';
//import { MenuItem } from '/scripts/components/menus/menuitem.js';
//import { PopupMenu } from '/scripts/components/menus/popupmenu.js';
//import { MainMenu } from '/scripts/components/menus/mainmenu.js';
import { Css } from '/scripts/core/css.js';
//#region PopupBox
const PopupBox = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class PopupBox extends ThemedControl {
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.control = null;
                //#region Private
                this.owners.destroy();
                //#endregion
                delete this.tabOrder;

            }
        }
        //#region Getter / Setter
        get control() {
            return internal(this).control;
        }
        set control(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Control) {
                if (priv.control !== newValue) {
                    priv.control = newValue;
                }
            }
        }
        //#endregion
        show(x, y) {
            const PX = Types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            const control = this.control;
            const htmlElementStyle = this.HTMLElementStyle;
            if (!this.form) {
                this.form = this.control.form;
            }
            if (!this.app) {
                this.app = this.control.app;
            }
            if (!htmlElement) {
                const tpl = this.getTemplate();
                const container = document.createElement(Types.HTMLELEMENTS.DIV);
                container.innerHTML = tpl;
                document.body.appendChild(container.firstElementChild);
                this.getHTMLElement(this.internalId);
            }
            if (y + htmlElement.offsetHeight > document.body.offsetHeight) {
                // for the PopupBox
                if (this instanceof Core.classes.PopupBox) {
                    // _control is MenuItem
                    if (this.control instanceof Core.classes.MenuItem) {
                        y = y - htmlElement.offsetHeight + control.HTMLElement.offsetHeight;
                    }
                        // _control is WindowContent
                    else if (control !== control.form.content) {
                        y -= htmlElement.offsetHeight + control.HTMLElement.offsetHeight;
                    }
                        // other
                    else {
                        y = document.body.offsetHeight - htmlElement.offsetHeight;
                    }
                }
                if (y < 0) {
                    y = 0;
                }
            }
            if (Core.mouse.button !== Core.mouse.MOUSEBUTTONS.RIGHT) {
                if (this instanceof Core.classes.PopupMenu) {
                    if (control instanceof Core.classes.MenuItem && !(control.owner instanceof Core.classes.MainMenu)) {
                        x += ~~parseFloat(getComputedStyle(htmlElement.firstElementChild).paddingLeft);
                        y -= ~~parseFloat(getComputedStyle(htmlElement.firstElementChild).paddingTop);
                    }
                }
            }
            if (!Core.isHTMLRenderer) {
                this._left = x;
                this._top = y;
            } else {
                htmlElementStyle.left = `${x}${PX}`;
                htmlElementStyle.top = `${y}${PX}`;
                htmlElementStyle.zIndex = this.zIndex;
            }
            this.form.popups.push(this);
            if (control) {
                control.HTMLElement.classList.add('opened');
                if (control.onOpenMenu) {
                    control.onOpenMenu.invoke();
                }
            }
        }
        destroy() {
            const control = this.control;
            if (control) {
                //this.control.HTMLElement.dataset.opened = false;
                //CSS.removeClass(this.control.HTMLElement,"opened");
                if (control.onCloseMenu) {
                    control.onCloseMenu.invoke();
                }
            }
            //this.control.destroy();
            //this.control=null;
            super.destroy();
        }
    }
    return PopupBox;
})();
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, PopupBox);
export { PopupBox };