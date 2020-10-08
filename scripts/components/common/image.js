//#region Import
import { Control } from '/scripts/components/control.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Import
//#region IMAGEWRAPS
/**
 * @type    {Object}        IMAGEWRAPS
 */
const IMAGEWRAPS = Object.freeze(Object.seal({
    ORIGINAL: 'original',
    FIT: 'fit',
    STRETCH: 'stretch',
    TILE: 'tile'
}));
//#endregion
//#region Class Image
class Image extends Control {
    //#region Private fields
    #src;
    #bitmap = 'No image';
    #wrapMode;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#src = props.hasOwnProperty('src') ? props.src : core.types.CONSTANTS.PIX;
            this.addPropertyEnum('wrapMode', IMAGEWRAPS);
            this.#wrapMode = props.hasOwnProperty('wrapMode') ? props.wrapMode : IMAGEWRAPS.FIT;
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
        return this.#bitmap;
    }
    set bitmap(newValue) {
        if (newValue instanceof Image && this.#src !== newValue.src) {
            this.#src = newValue.src;
            this.backgroundImage.backgroundImage = `url(${newValue.src})`;
            this.update();
        }
    }
    //#endregion bitmap
    //#region wrapMode
    get wrapMode() {
        return this.#wrapMode;
    }
    set wrapMode(newValue) {
        if (core.tools.valueInSet(newValue, IMAGEWRAPS) && this.#wrapMode !== newValue) {
            this.#wrapMode = newValue;
            !this.loading && !this.form.loading && this.update();
        }
    }
    //#endregion wrapMode
    //#region isEmpty
    get isEmpty() {
        return this.HTMLElementStyle.backgroundImage === core.types.CONSTANTS.PIX;
    }
    //#endregion isEmpty
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        //super.update();
        if (!this.loading && !this.form.loading) {
            switch (this.#wrapMode) {
                case IMAGEWRAPS.ORIGINAL:
                    htmlElementStyle.backgroundSize = 'auto auto';
                    htmlElementStyle.backgroundPosition = 'auto auto';
                    htmlElementStyle.backgroundRepeat = 'no-repeat';
                    break;
                case IMAGEWRAPS.FIT:
                    htmlElementStyle.backgroundSize = 'contain';
                    htmlElementStyle.backgroundPosition = 'center center';
                    htmlElementStyle.backgroundRepeat = 'no-repeat';
                    break;
                case IMAGEWRAPS.STRETCH:
                    htmlElementStyle.backgroundSize = '100% 100%';
                    htmlElementStyle.backgroundPosition = 'center center';
                    htmlElementStyle.backgroundRepeat = 'no-repeat';
                    break;
                case IMAGEWRAPS.TILE:
                    htmlElementStyle.backgroundSize = 'auto auto';
                    htmlElementStyle.backgroundPosition = 'auto auto';
                    htmlElementStyle.backgroundRepeat = 'repeat';
                    break;
            }
        }
    }
    //#endregion update
    //#region loaded
    loaded() {
        super.loaded();
        this.#src && this.load(this.#src);
    }
    //#endregion loaded
    //#region load
    load(uri) {
        this.#src = uri;
        this.HTMLElementStyle.backgroundImage = `url(${uri})`;
        this.update();
    }
    //#endregion load
    //#endregion Methods
}
Object.defineProperties(Image.prototype, {
    'src': {
        enumerable: !0
    }
});
//#endregion Image
//#region Class Image
class Icon extends ThemedControl {
    //#region Private fields
    #cssClass = String.EMPTY;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#region changeCSS
    changeCSS(cssClass) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isString(cssClass) && !String.isNullOrEmpty(cssClass) && this.#cssClass !== cssClass) {
            !String.isNullOrEmpty(this.#cssClass) && htmlElement.classList.remove(this.#cssClass);
            htmlElement.classList.add(cssClass);
            this.#cssClass = cssClass;
        }
    }
    //#endregion changeCSS
    //#region load
    load(uri) {
        this.HTMLElementStyle.backgroundImage = `url(${uri})`;
    }
    //#endregion load
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.COMMON, Image, Icon);
//#endregion Icon
//#region Templates
if (core.isHTMLRenderer) {
    const ImageTpl = ['<jagui-image id="{internalId}" data-class="Image" class="Control Image {theme} csr_default" draggable="false">',
        '<properties>{ "name": "{name}", "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==", ',
        '"width": 32, "height": 32 }</properties></jagui-image>'].join(String.EMPTY);
    const IconTpl = ['<jagui-icon id="{internalId}" data-class="Icon" class="Control Icon {theme} csr_default" draggable="false">',
        '<properties>{ "name": "{name}", "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==", ',
        '"width": 16, "height": 16 }</properties></jagui-image>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Image, template: ImageTpl }, { Class: Icon, template: IconTpl }]);
}
//#endregion Templates
export { Image, Icon };