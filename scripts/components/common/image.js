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
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                src: props.hasOwnProperty('src') ? props.src : core.types.CONSTANTS.PIX,
                bitmap: 'No image'
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'wrapMode',
                enum: IMAGEWRAPS,
                value: props.hasOwnProperty('wrapMode') ? props.wrapMode : IMAGEWRAPS.FIT
            });
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
        return core.private(this).bitmap;
    }
    set bitmap(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof Image && priv.src !== newValue.src) {
            priv.src = newValue.src;
            this.backgroundImage.backgroundImage = `url(${newValue.src})`;
            this.update();
        }
    }
    //#endregion bitmap
    //#region wrapMode
    get wrapMode() {
        return core.private(this).wrapMode;
    }
    set wrapMode(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, IMAGEWRAPS) && priv.wrapMode !== newValue) {
            priv.wrapMode = newValue;
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
        const priv = core.private(this);
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        //super.update();
        if (!this.loading && !this.form.loading) {
            switch (priv.wrapMode) {
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.src && this.load(priv.src);
    }
    //#endregion loaded
    //#region load
    load(uri) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.src = uri;
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
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                cssClass: String.EMPTY
            });
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
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isString(cssClass) && !String.isNullOrEmpty(cssClass) && priv.cssClass !== cssClass) {
            !String.isNullOrEmpty(priv.cssClass) && htmlElement.classList.remove(priv.cssClass);
            htmlElement.classList.add(cssClass);
            priv.cssClass = cssClass;
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