//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region Class ImageControl
class ImageControl extends ThemedControl {
    //#region Private fields
    #bitmap;
    #bitmapStyle;
    //#endregion Private fields
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
        return this.#bitmap.src === core.types.CONSTANTS.PIX;
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
        this.#bitmap.src = uri;
    }
    //#endregion load
    //#region update
    update() {
        //#region Variables déclaration
        const iw = this.#bitmap.naturalWidth;
        const ih = this.#bitmap.naturalHeight;
        const htmlElement = this.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        //center the image
        if (iw > htmlElement.offsetWidth || ih > htmlElement.offsetHeight) {
            const destRect = new Rect(0, 0, htmlElement.offsetWidth, htmlElement.offsetHeight);
            const imgRect = new Rect(0, 0, iw, ih);
            destRect.assign(imgRect.fit(destRect).rect);
            this.#bitmapStyle.width = `${destRect.width}${PX}`;
            this.#bitmapStyle.height = `${destRect.height}${PX}`;
            this.#bitmapStyle.left = `${destRect.left}${PX}`;
            this.#bitmapStyle.top = `${destRect.top}${PX}`;
        } else {
            this.#bitmapStyle.left = `${int((htmlElement.offsetWidth - iw) / 2)}${PX}`;
            this.#bitmapStyle.top = `${int((htmlElement.offsetHeight - ih) / 2)}${PX}`;
            this.#bitmapStyle.width = `${iw}${PX}`;
            this.#bitmapStyle.height = `${ih}${PX}`;
        }
    }
    //#endregion update
    //#region loaded
    loaded() {
        //#region Variables déclaration
        //const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        super.loaded();
        this.#bitmap = document.createElement(core.types.HTMLELEMENTS.IMG);
        this.HTMLElement.appendChild(this.#bitmap);
        this.#bitmapStyle = this.#bitmap.style;
        this.#bitmap.jsObj = this;
        this.#bitmap.src = this.props.hasOwnProperty('src') ? this.props.src : core.types.CONSTANTS.PIX;
        Events.bind(this.#bitmap, htmlEvents.LOAD, this.doBitmapLoaded);
        Events.bind(this.#bitmap, htmlEvents.ERROR, this.doBitmapNotLoaded);
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