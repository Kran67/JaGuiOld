//#region Import
import { Control } from "/scripts/components/control.js";
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region IMAGEWRAPS
/**
 * @type    {Object}        IMAGEWRAPS
 */
const IMAGEWRAPS = Object.freeze({
    ORIGINAL: "original",
    FIT: "fit",
    STRETCH: "stretch",
    TILE: "tile"
});
//#endregion
//#region Image
const Image = (() => {
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
    //#region Class Image
    class Image extends Control {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.src = props.hasOwnProperty("src") ? props.src : Types.CONSTANTS.PIX;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "wrapMode",
                    enum: IMAGEWRAPS,
                    variable: priv,
                    value: props.hasOwnProperty("wrapMode") ? props.wrapMode : IMAGEWRAPS.FIT
                });
                priv.bitmap = "No image";
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region IMAGEWRAPS
        /**
         * @type    {Object}        IMAGEWRAPS
         */
        static get IMAGEWRAPS() {
            return IMAGEWRAPS;
        }
        //#endregion IMAGEWRAPS
        //#region Getters / Setters
        //#region bitmap
        get bitmap() {
            return internal(this).bitmap;
        }
        set bitmap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Image) {
                if (priv.src !== newValue.src) {
                    priv.src = newValue.src;
                    this.backgroundImage.backgroundImage = `url(${newValue.src})`;
                    this.update();
                }
            }
        }
        //#endregion bitmap
        //#region wrapMode
        get wrapMode() {
            return internal(this).wrapMode;
        }
        set wrapMode(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, IMAGEWRAPS)) {
                if (priv.wrapMode !== newValue) {
                    priv.wrapMode = newValue;
                    if (!this.loading && !this.form.loading) {
                        this.update();
                    }
                }
            }
        }
        //#endregion wrapMode
        //#region isEmpty
        get isEmpty() {
            return this.HTMLElementStyle.backgroundImage === Types.CONSTANTS.PIX;
        }
        //#endregion isEmpty
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            //super.update();
            if (!this.loading && !this.form.loading) {
                switch (priv.wrapMode) {
                    case IMAGEWRAPS.ORIGINAL:
                        htmlElementStyle.backgroundSize = "auto auto";
                        htmlElementStyle.backgroundPosition = "auto auto";
                        htmlElementStyle.backgroundRepeat = "no-repeat";
                        break;
                    case IMAGEWRAPS.FIT:
                        htmlElementStyle.backgroundSize = "contain";
                        htmlElementStyle.backgroundPosition = "center center";
                        htmlElementStyle.backgroundRepeat = "no-repeat";
                        break;
                    case IMAGEWRAPS.STRETCH:
                        htmlElementStyle.backgroundSize = "100% 100%";
                        htmlElementStyle.backgroundPosition = "center center";
                        htmlElementStyle.backgroundRepeat = "no-repeat";
                        break;
                    case IMAGEWRAPS.TILE:
                        htmlElementStyle.backgroundSize = "auto auto";
                        htmlElementStyle.backgroundPosition = "auto auto";
                        htmlElementStyle.backgroundRepeat = "repeat";
                        break;
                }
            }
        }
        //#endregion update
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            if (priv.src) {
                this.load(priv.src);
            }
        }
        //#endregion loaded
        //#region load
        load(uri) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.src = uri;
            this.HTMLElementStyle.backgroundImage = `url(${uri})`;
            this.update();
        }
        //#endregion load
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.src = null;
            priv.wrapMode = null;
            priv.bitmap = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Image;
    //#endregion Image
})();
//#endregion Image
//#region Icon
const Icon = (() => {
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
    //#region Class Image
    class Icon extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.cssClass = String.EMPTY;
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region changeCSS
        changeCSS(cssClass) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(cssClass)) {
                if (!String.isNullOrEmpty(cssClass)) {
                    if (priv.cssClass !== cssClass) {
                        htmlElement.classList.remove(priv.cssClass);
                        htmlElement.classList.add(cssClass);
                        priv.cssClass = cssClass;
                    }
                }
            }
        }
        //#endregion changeCSS
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.cssClass = null;
        }
        //#endregion destroy
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return Icon;
    //#endregion Icon
})();
//#endregion Icon
Core.classes.register(Types.CATEGORIES.COMMON, Image, Icon);
export { Image, Icon };
//#region Templates
if (Core.isHTMLRenderer) {
    const ImageTpl = ["<jagui-image id=\"{internalId}\" data-class=\"Image\" class=\"Control Image {theme} csr_default\" draggable=\"false\">",
        "<properties>{ \"name\": \"{name}\", \"src\": \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==\", ",
        "\"width\": 32, \"height\": 32 }</properties></jagui-image>"].join(String.EMPTY);
    const IconTpl = ["<jagui-icon id=\"{internalId}\" data-class=\"Icon\" class=\"Control Icon {theme} csr_default\" draggable=\"false\">",
        "<properties>{ \"name\": \"{name}\", \"src\": \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==\", ",
        "\"width\": 16, \"height\": 16 }</properties></jagui-image>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Image, template: ImageTpl }, { Class: Icon, template: IconTpl }]);
}
//#endregion Templates