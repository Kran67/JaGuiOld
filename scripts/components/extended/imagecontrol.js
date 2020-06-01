//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region Class ImageControl
class ImageControl extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                bitmapStyle: null,
                bitmap: null
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        if (core.tools.isNumber(newValue) && this.HTMLElement.offsetWidth !== newValue) {
            super.width = newValue;
            this.update();
        }
    }
    //#endregion width
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        if (core.tools.isNumber(newValue) && this.HTMLElement.offsetHeight !== newValue) {
            super.height = newValue;
            this.update();
        }
    }
    //#endregion height
    //#region empty
    get empty() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.bitmap.src === core.types.CONSTANTS.PIX;
    }
    //#endregion empty
    //#endregion Getters / Setters
    //#region Methods
    //#region doBitmapLoaded
    doBitmapLoaded() {
        this.jsObj.update();
    }
    //#endregion doBitmapLoaded
    //#region doBitmapNotLoaded
    doBitmapNotLoaded() { throw 'Image bitmap error'; }
    //#endregion doBitmapNotLoaded
    //#region load
    load(uri) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.bitmap.src = uri;
    }
    //#endregion load
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const iw = priv.bitmap.naturalWidth;
        const ih = priv.bitmap.naturalHeight;
        const htmlElement = this.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        //center the image
        if (iw > htmlElement.offsetWidth || ih > htmlElement.offsetHeight) {
            const destRect = new Rect(0, 0, htmlElement.offsetWidth, htmlElement.offsetHeight);
            const imgRect = new Rect(0, 0, iw, ih);
            destRect.assign(imgRect.fit(destRect).rect);
            priv.bitmapStyle.width = `${destRect.width}${PX}`;
            priv.bitmapStyle.height = `${destRect.height}${PX}`;
            priv.bitmapStyle.left = `${destRect.left}${PX}`;
            priv.bitmapStyle.top = `${destRect.top}${PX}`;
        } else {
            priv.bitmapStyle.left = `${int((htmlElement.offsetWidth - iw) / 2)}${PX}`;
            priv.bitmapStyle.top = `${int((htmlElement.offsetHeight - ih) / 2)}${PX}`;
            priv.bitmapStyle.width = `${iw}${PX}`;
            priv.bitmapStyle.height = `${ih}${PX}`;
        }
    }
    //#endregion update
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        super.loaded();
        priv.bitmap = document.createElement(core.types.HTMLELEMENTS.IMG);
        this.HTMLElement.appendChild(priv.bitmap);
        priv.bitmapStyle = priv.bitmap.style;
        priv.bitmap.jsObj = this;
        priv.bitmap.src = props.hasOwnProperty('src') ? props.src : core.types.CONSTANTS.PIX;
        Events.bind(priv.bitmap, htmlEvents.LOAD, this.doBitmapLoaded);
        Events.bind(priv.bitmap, htmlEvents.ERROR, this.doBitmapNotLoaded);
    }
    //#endregion
    //#endregion Methods
}
Object.seal(ImageControl);
core.classes.register(core.types.CATEGORIES.EXTENDED, ImageControl);
//#endregion ImageControl
//#region Templates
if (core.isHTMLRenderer) {
    const ImageControlTpl = ['<jagui-imagecontrol id="{internalId}" data-class="ImageControl" class="Control ImageControl {theme}">',
        '<properties>{ "name": "{name}", "width": 100, "height": 60 }</properties></jagui-imagecontrol>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ImageControl, template: ImageControlTpl }]);
}
//#endregion
export { ImageControl };