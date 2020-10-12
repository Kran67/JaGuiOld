//#region Import
import { ScrollBox } from '/scripts/components/containers/scrollbox.js';
import { Rect } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
//#endregion Import
//#region Class ImageViewer
class ImageViewer extends ScrollBox {
    //#region Private fields
    #bitmap;
    #scale = 1;
    //#endregion Private fields
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
            this.#bitmap = document.createElement(core.types.HTMLELEMENTS.IMG);
            this.#bitmap.setAttribute('draggable', 'false');
            this.#bitmap.jsObj = this;
            Events.bind(this.#bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
            Events.bind(this.#bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region image
    get image() {
        return this.#bitmap;
    }
    set image(newValue) {
        core.tools.isString(newValue) && this.#bitmap.src !== newValue && this.load(newValue);
    }
    //#endregion image
    //#region isEmpty
    isEmpty() {
        return this.#bitmap.src === core.types.CONSTANS.PIX;
    }
    //#endregion isEmpty
    //#endregion Getters / Setters
    //#region Methods
    //#region wheel
    wheel(event) {
        if (core.keyboard.ctrl) {
            this.#scale -= core.mouse.getWheelDetail(event) * 0.02;
            this.#scale = Math.max(Math.min(this.#scale, 10), 0.01);
            core.mouse.stopAllEvents();
            this.update();
        }
    }
    //#endregion wheel
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
        const PX = core.types.CSSUNITS.PX;
        const htmlElement = this.HTMLElement;
        const newW = int(this.#bitmap.naturalWidth * this.#scale);
        const newH = int(this.#bitmap.naturalHeight * this.#scale);
        const rectD = new Rect(0, 0, htmlElement.offsetWidth, htmlElement.offsetHeight);
        const rectS = new Rect(0, 0, newW, newH);
        //#endregion Variables déclaration
        rectS.center(rectD);
        this.#bitmap.style.width = `${newW}${PX}`;
        this.#bitmap.style.height = `${newH}${PX}`;
        if (htmlElement.scrollWidth < htmlElement.offsetWidth) {
            htmlElement.scrollLeft = 0;
            this.#bitmap.style.left = `${rectS.left}${PX}`;
        } else {
            htmlElement.scrollLeft = -rectS.left;
            this.#bitmap.style.left = 0;
        }
        if (htmlElement.scrollHeight < htmlElement.offsetHeight) {
            htmlElement.scrollTop = 0;
            this.#bitmap.style.top = `${rectS.top}${PX}`;
        } else {
            htmlElement.scrollTop = -rectS.top;
            this.#bitmap.style.top = 0;
        }
    }
    //#endregion update
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const props = JSON.parse(htmlElement.querySelector('properties').innerText);
        //#endregion Variables déclaration
        super.loaded();
        props.hasOwnProperty('src') && this.load(props.src);
        htmlElement.appendChild(this.#bitmap);
        htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const HTMLEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        Events.unBind(this.#bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
        Events.unBind(this.#bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
        this.#bitmap.jsObj = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(ImageViewer.prototype, {
    'scale': {
        enumerable: !0
    }
});
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