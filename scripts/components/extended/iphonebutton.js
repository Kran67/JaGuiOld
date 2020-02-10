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

/*(function () {
    var IPhoneButton = $j.classes.BitmapButton.extend("IPhoneButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._halo = null;
                //#endregion
                delete this.tabOrder;
            }
        },
        //#region Methods
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._halo = this._HTMLElement.lastElementChild;
            }
        },
        destroy: function () {
            this._halo = null;
            this._inherited();
        }
        //#endregion
    });
    Object.seal(IPhoneButton);
    $j.classes.register($j.types.categories.EXTENDED, IPhoneButton);
    //#region template
    if ($j.isHTMLRenderer()) {
        var IPhoneButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='IPhoneButton' class='Control IPhoneButton {theme} csr_default' style='width:50px;height:50px;'>\
                         <span class='Control IPhoneButtonCaption'></span>\
                         <img class='Control' alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' draggable='false' style='width: 32px;height: 32px;left: 9px;top: 9px;' />\
                         <div class='Control IPhoneButtonHalo'></div>\
                         </button>";
        $j.classes.registerTemplates([{ Class: IPhoneButton, template: IPhoneButtonTpl }]);
    }
    //#endregion template
})();*/