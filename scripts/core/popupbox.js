//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region PopupBox
const PopupBox = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                !props.height ? (props.height = -1) : null;
                !props.width ? (props.width = -1) : null;
                super(owner, props);
                const priv = internal(this);
                priv.refControl = props.hasOwnProperty('refControl') ? props.refControl : null;
                this.owners.destroy();
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region refControl
        get refControl() {
            return internal(this).refControl;
        }
        set refControl(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.classes.Control && priv.refControl !== newValue && (priv.refControl = newValue);
        }
        //#endregion refControl
        //#endregion Getter / Setter
        //#region Methods
        //#region show
        show(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = core.types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            const refControl = priv.refControl;
            const htmlElementStyle = this.HTMLElementStyle;
            const cHtmlElement = refControl.HTMLElement;
            const TAG = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            //#endregion Variables déclaration
            !this.form && (this.form = refControl.form);
            !this.app && (this.app = refControl.app);
            if (!htmlElement) {
                const tpl = this.template;
                const container = document.createElement(`${TAG}container`);
                container.innerHTML = tpl;
                document.body.appendChild(container.firstElementChild);
                this.getHTMLElement(this.internalId);
            }
            if (y + htmlElement.offsetHeight > document.body.offsetHeight) {
                // for the PopupBox
                if (this instanceof core.classes.PopupBox) {
                    // _control is MenuItem
                    if (core.classes.MenuItem && refControl instanceof core.classes.MenuItem) {
                        y = y - htmlElement.offsetHeight + cHtmlElement.offsetHeight;
                    }
                    // _control is WindowContent
                    else if (refControl !== refControl.form.content) {
                        y -= htmlElement.offsetHeight + cHtmlElement.offsetHeight;
                    }
                    // other
                    else {
                        y = document.body.offsetHeight - htmlElement.offsetHeight;
                    }
                }
                y < 0 && (y = 0);
            }
            if (core.mouse.button !== Mouse.MOUSEBUTTONS.RIGHT) {
                if (core.classes.PopupMenu && this instanceof core.classes.PopupMenu
                    && core.classes.MenuItem && refControl instanceof core.classes.MenuItem && !(refControl.owner instanceof core.classes.MainMenu)) {
                    x += int(getComputedStyle(htmlElement.firstElementChild).paddingLeft);
                    y -= int(getComputedStyle(htmlElement.firstElementChild).paddingTop);
                }
            }
            if (!core.isHTMLRenderer) {
                this.left = x;
                this.top = y;
            } else {
                htmlElementStyle.left = `${x}${PX}`;
                htmlElementStyle.top = `${y}${PX}`;
                htmlElementStyle.zIndex = this.zIndex;
            }
            this.form.popups.push(this);
            if (refControl) {
                cHtmlElement.classList.add('opened');
                refControl.onOpenMenu && refControl.onOpenMenu.invoke();
            }
        }
        //#endregion show
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.refControl) {
                priv.refControl.HTMLElement.classList.remove('opened');
                priv.refControl.onCloseMenu && priv.refControl.onCloseMenu.invoke();
            }
            //priv.refControl.
            //priv.refControl.destroy();
            priv.refControl = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PopupBox;
    //#endregion Class PopupBox
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, PopupBox);
//#endregion Class PopupBox
//#region Templates
if (core.isHTMLRenderer) {
    const PopupBoxTpl = '<jagui-popupbox id="{internalId}" class="Control PopupBox csr_default {theme}" />';
    core.classes.registerTemplates([{ Class: PopupBox, template: PopupBoxTpl }]);
}
//#endregion Templates
export { PopupBox };