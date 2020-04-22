//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region ShortCutIcon
const ShortCutIcon = (() => {
    //#region ShortCutIcon
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion ShortCutIcon
    //#region ShortCutIcon
    class ShortCutIcon extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                delete this.tabOrder;
                priv.caption = props.hasOwnProperty('caption') ? props.caption : this.name;
                priv.className = props.hasOwnProperty('className') ? props.className : String.EMPTY;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    this.HTMLElement.lastElementChild.innerHTML = priv.caption;
                }
            }
        }
        //#endregion caption
        //#region className
        get className() {
            return internal(this).className;
        }
        set className(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue) && !String.isNullOrEmpty(newValue)) {
                if (priv.className !== newValue) {
                    this.HTMLElement.firstElementChild.classList.remove(priv.className);
                    priv.className = newValue;
                    this.HTMLElement.firstElementChild.classList.add(priv.className);
                }
            }
        }
        //#endregion caption
        //#region template
        get template() {
            let html = super.template;
            const a = html.split('{caption}');
            html = a.join(this.name.split('_').first);
            return html;
        }
        //#endregion template
        //#endregion Getter / Setter
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const name = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const icon = document.createElement(`${name}icon`);
            const caption = document.createElement(`${name}caption`);
            const htmlElement = this.HTMLElement;
            //#endregion Variables declaration
            super.loaded();
            icon.classList.add('ShortCutIconImg');
            !String.isNullOrEmpty(priv.className) ? icon.classList.add(priv.className) : null;
            caption.classList.add('ShortCutIconCaption');
            caption.innerHTML = priv.caption;
            htmlElement.appendChild(icon);
            htmlElement.appendChild(caption);
        }
        //#endregion loaded
        //#endregion Methods
    }
    return ShortCutIcon;
    //#endregion ShortCutIcon
})();
//#region ShortCutIcon defineProperties
Object.defineProperties(ShortCutIcon, {
    'caption': {
        enumerable: !0
    },
    'className': {
        enumerable: !0
    }
});
Object.seal(ShortCutIcon);
//#endregion ShortCutIcon defineProperties
//#region Templates
const ShortCutIconTpl = '<jagui-icon id="{internalId}" class="Control {className} {theme}" title="{title}" name="{name}"></jagui-icon>';
Core.classes.register(Types.CATEGORIES.COMMON, ShortCutIcon);
Core.classes.registerTemplates([
    { Class: ShortCutIcon, template: ShortCutIconTpl }
]);
//#endregion
export { ShortCutIcon };