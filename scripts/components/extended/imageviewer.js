//#region Import
import { ScrollBox } from '/scripts/components/containers/scrollbox.js';
import { Rect } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region ImageViewer
const ImageViewer = (() => {
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
    //#region Class ImageViewer
    class ImageViewer extends ScrollBox {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const HTMLEvents = Types.HTMLEVENTS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.bitmap = document.createElement(Types.HTMLELEMENTS.IMG);
                priv.bitmap.jsObj = this;
                priv.bitmap.setAttribute('draggable', 'false');
                Events.bind(priv.bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
                Events.bind(priv.bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
                priv.scale = 1;
                this.hitTest.all = true;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        get image() {
            return internal(this).bitmap;
        }
        set image(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.bitmap.src !== newValue) {
                    this.load(newValue);
                }
            }
        }
        isEmpty() {
            return priv.bitmap.src === Types.CONSTANS.PIX;
        }
        //#endregion Getters / Setters
        //#region Methods
        mouseWheel() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Core.keyboard.ctrl) {
                priv.scale += Core.mouse.wheelDelta * 0.02;
                if (priv.scale > 10) {
                    priv.scale = 10;
                } else if (priv.scale < 0.01) {
                    priv.scale = 0.01;
                }
                Core.mouse.stopEvent(Core.mouse.event);
                Core.mouse.event.preventDefault();
                this.update();
            }
        }
        doBitmapLoaded() {
            this.jsObj.update();
        }
        doBitmapNotLoaded() { throw 'Image bitmap error'; }
        load(uri) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.bitmap.src = uri;
        }
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            const newW = ~~(priv.bitmap.naturalWidth * priv.scale);
            const newH = ~~(priv.bitmap.naturalHeight * priv.scale);
            const rectD = new Rect(0, 0, htmlElement.offsetWidth, htmlElement.offsetHeight);
            const rectS = new Rect(0, 0, newW, newH);
            //#endregion Variables déclaration
            rectS.center(rectD);
            priv.bitmap.style.width = `${newW}${PX}`;
            priv.bitmap.style.height = `${newH}${PX}`;
            if (htmlElement.scrollWidth < htmlElement.offsetWidth) {
                htmlElement.scrollLeft = 0;
                priv.bitmap.style.left = `${rectS.left}${PX}`;
            } else {
                htmlElement.scrollLeft = -rectS.left;
                priv.bitmap.style.left = 0;
            }
            if (htmlElement.scrollHeight < htmlElement.offsetHeight) {
                htmlElement.scrollTop = 0;
                priv.bitmap.style.top = `${rectS.top}${PX}`;
            } else {
                htmlElement.scrollTop = -rectS.top;
                priv.bitmap.style.top = 0;
            }
        }
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            //#endregion Variables déclaration
            super.loaded();
            if (props.hasOwnProperty('src')) {
                this.load(props.src);
            }
            this.HTMLElement.appendChild(priv.bitmap);
        }
        destroy() {
            //#region Variables déclaration
            const HTMLEvents = Types.HTMLEVENTS;
            //#endregion Variables déclaration
            super.destroy();
            Events.unBind(priv.bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
            Events.unBind(priv.bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
            priv.bitmap.jsObj = null;
            priv.bitmap = null;
            priv.scale = null;
        }
        //#endregion Methods
    }
    return ImageViewer;
    //#endregion ImageViewer
})();
Object.seal(ImageViewer);
Core.classes.register(Types.CATEGORIES.EXTENDED, ImageViewer);
//#endregion CustomButton
//#region Templates
if (Core.isHTMLRenderer) {
    const ImageViewerTpl = ['<jagui-imageviewer id="{internalId}" data-class="ImageViewer" class="Control scrollContent',
        ' ImageViewer {theme}"><properties>{ "name": "{name}", "width": 160, "height": 160 }',
        '</properties></jagui-imageviewer>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ImageViewer, template: ImageViewerTpl }]);
}
//#endregion