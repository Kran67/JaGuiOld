//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Tools } from '/scripts/core/tools.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region ImageControl
const ImageControl = (() => {
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
    //#region Class ImageControl
    class ImageControl extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.bitmapStyle = null;
                priv.bitmap = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            if (Tools.isNumber(newValue)) {
                if (this.HTMLElement.offsetWidth !== newValue) {
                    super.width = newValue;
                    this.update();
                }
            }
        }
        //#endregion width
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            if (Tools.isNumber(newValue)) {
                if (this.HTMLElement.offsetHeight !== newValue) {
                    super.height = newValue;
                    this.update();
                }
            }
        }
        //#endregion height
        //#region empty
        get empty() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.bitmap.src === Types.CONSTANTS.PIX;
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
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.bitmap.src = uri;
        }
        //#endregion load
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const iw = priv.bitmap.naturalWidth;
            const ih = priv.bitmap.naturalHeight;
            const htmlElement = this.HTMLElement;
            const PX = Types.CSSUNITS.PX;
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
                priv.bitmapStyle.left = `${~~((htmlElement.offsetWidth - iw) / 2)}${PX}`;
                priv.bitmapStyle.top = `${~~((htmlElement.offsetHeight - ih) / 2)}${PX}`;
                priv.bitmapStyle.width = `${iw}${PX}`;
                priv.bitmapStyle.height = `${ih}${PX}`;
            }
        }
        //#endregion update
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            const htmlEvents = Types.HTMLEVENTS;
            //#endregion Variables déclaration
            super.loaded();
            priv.bitmap = document.createElement(Types.HTMLELEMENTS.IMG);
            this.HTMLElement.appendChild(priv.bitmap);
            priv.bitmapStyle = priv.bitmap.style;
            priv.bitmap.jsObj = this;
            priv.bitmap.src = props.hasOwnProperty('src') ? props.src : Types.CONSTANTS.PIX;
            Events.bind(priv.bitmap, htmlEvents.LOAD, this.doBitmapLoaded);
            Events.bind(priv.bitmap, htmlEvents.ERROR, this.doBitmapNotLoaded);
        }
        //#endregion
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.bitmapStyle = null;
            priv.bitmap = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return ImageControl;
    //#endregion ImageControl
})();
Object.seal(ImageControl);
Core.classes.register(Types.CATEGORIES.EXTENDED, ImageControl);
//#endregion ImageControl
//#region Templates
if (Core.isHTMLRenderer) {
    const ImageControlTpl = ['<jagui-imagecontrol id="{internalId}" data-class="ImageControl" class="Control ImageControl {theme}">',
        '<properties>{ "name": "{name}", "width": 100, "height": 60 }</properties></jagui-imagecontrol>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ImageControl, template: ImageControlTpl }]);
}
//#endregion
export { ImageControl };