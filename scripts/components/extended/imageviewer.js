//#region Import
import { ScrollBox } from '/scripts/components/containers/scrollbox.js';
import { Rect } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
//#endregion Import
//#region ImageViewer
const ImageViewer = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class ImageViewer
    class ImageViewer extends ScrollBox {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const HTMLEvents = core.types.HTMLEVENTS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                props.mouseEvents = { mouseMove: !0, dblClick: !0 };
                props.canFocused = !0;
                super(owner, props);
                const priv = internal(this);
                priv.bitmap = document.createElement(core.types.HTMLELEMENTS.IMG);
                priv.bitmap.jsObj = this;
                priv.bitmap.setAttribute('draggable', 'false');
                Events.bind(priv.bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
                Events.bind(priv.bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
                priv.scale = 1;
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
            core.tools.isString(newValue) && priv.bitmap.src !== newValue && this.load(newValue);
        }
        isEmpty() {
            return priv.bitmap.src === core.types.CONSTANS.PIX;
        }
        //#endregion Getters / Setters
        //#region Methods
        wheel(event) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.keyboard.ctrl) {
                priv.scale += core.mouse.wheelDelta * 0.02;
                priv.scale = Math.max(Math.min(priv.scale, 10), 0.01);
                core.mouse.stopAllEvents();
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
            const PX = core.types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            const newW = int(priv.bitmap.naturalWidth * priv.scale);
            const newH = int(priv.bitmap.naturalHeight * priv.scale);
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
            const htmlElement = this.HTMLElement;
            const props = JSON.parse(htmlElement.querySelector('properties').innerText);

            //#endregion Variables déclaration
            super.loaded();
            props.hasOwnProperty('src') && this.load(props.src);
            htmlElement.appendChild(priv.bitmap);
            htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
        }
        destroy() {
            //#region Variables déclaration
            const HTMLEvents = core.types.HTMLEVENTS;
            //#endregion Variables déclaration
            Events.unBind(priv.bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
            Events.unBind(priv.bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
            priv.bitmap.jsObj = null;
            priv.bitmap = null;
            priv.scale = null;
            super.destroy();
        }
        //#endregion Methods
    }
    return ImageViewer;
    //#endregion ImageViewer
})();
Object.seal(ImageViewer);
core.classes.register(core.types.CATEGORIES.EXTENDED, ImageViewer);
//#endregion ImageViewer
//#region Templates
if (core.isHTMLRenderer) {
    const ImageViewerTpl = ['<jagui-imageviewer id="{internalId}" data-class="ImageViewer" class="Control scrollContent',
        ' ImageViewer {theme}"><properties>{ "name": "{name}", "width": 160, "height": 160 }',
        '</properties></jagui-imageviewer>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ImageViewer, template: ImageViewerTpl }]);
}
//#endregion
export { ImageViewer };