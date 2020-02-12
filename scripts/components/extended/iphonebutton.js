//#region Import
import { BitmapButton } from "/scripts/components/extended/bitmapbutton.js";
//#endregion Import
//#region IPhoneButton
const IPhoneButton = (() => {
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
    //#region Class IPhoneButton
    class IPhoneButton extends BitmapButton {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.caption = String.EMPTY;
                super(owner, props);
                const priv = internal(this);
                priv.halo = null;
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                priv.halo = htmlElement.querySelector(".IPhoneButtonHalo");
            }
        }
        //#endregion getHTMLElement
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.halo = null;
            super.destroy();
        }
        //#endregion destroy
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.loaded();
            if (Core.isHTMLRenderer) {
                priv.halo = document.createElement(Types.HTMLELEMENTS.DIV);
                priv.halo.classList.add("Control", "IPhoneButtonHalo");
                htmlElement.appendChild(priv.halo);
            }
        }
        //#endregion Methods
    }
    return IPhoneButton;
    //#endregion IPhoneButton
})();
Object.seal(IPhoneButton);
Core.classes.register(Types.CATEGORIES.EXTENDED, IPhoneButton);
//#endregion IPhoneButton
//#region template
if (Core.isHTMLRenderer) {
    const IPhoneButtonTpl = ["<jagui-iphonebutton id=\"{internalId}\" data-class=\"IPhoneButton\" class=\"Control IPhoneButton {theme} csr_default\"><properties>{ \"name\": \"{name}\", \"height\": 50, \"width\": 50 }</properties></jagui-iphonebutton>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: IPhoneButton, template: IPhoneButtonTpl }]);
}
//#endregion template