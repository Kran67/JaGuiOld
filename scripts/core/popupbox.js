//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Import
//#region PopupBox
const PopupBox = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class PopupBox
    class PopupBox extends ThemedControl {
        //#region constructor
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
        //#endregion constructor
        //#region Getter / Setter
        //#region control
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
        //#endregion control
        //#endregion Getter / Setter
        //#region Methods
        //#region show
        show(x, y) {
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            const control = priv.control;
            const htmlElementStyle = this.HTMLElementStyle;
            if (!this.form) {
                this.form = control.form;
            }
            if (!this.app) {
                this.app = control.app;
            }
            if (!htmlElement) {
                const tpl = this.template;
                const container = document.createElement(Types.HTMLELEMENTS.DIV);
                container.innerHTML = tpl;
                document.body.appendChild(container.firstElementChild);
                this.getHTMLElement(this.internalId);
            }
            if (y + htmlElement.offsetHeight > document.body.offsetHeight) {
                // for the PopupBox
                if (this instanceof Core.classes.PopupBox) {
                    // _control is MenuItem
                    if (control instanceof Core.classes.MenuItem) {
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
                this.left = x;
                this.top = y;
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
        //#endregion show
        //#region destroy
        destroy() {
            const priv = internal(this);
            if (priv.control) {
                control.HTMLElement.classList.add('opened');
                if (priv.control.onCloseMenu) {
                    priv.control.onCloseMenu.invoke();
                }
            }
            priv.control.destroy();
            priv.control=null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PopupBox;
    //#endregion Class PopupBox
})();
Core.classes.register(Types.CATEGORIES.INTERNAL, PopupBox);
//#endregion Class PopupBox
export { PopupBox };