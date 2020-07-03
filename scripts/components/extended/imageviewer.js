//#region Import
import { ScrollBox } from '/scripts/components/containers/scrollbox.js';
import { Rect } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
//#endregion Import
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
            const priv = core.private(this, {
                bitmap: document.createElement(core.types.HTMLELEMENTS.IMG),
                scale: 1
            });
            priv.bitmap.setAttribute('draggable', 'false');
            priv.bitmap.jsObj = this;
            Events.bind(priv.bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
            Events.bind(priv.bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region image
    get image() {
        return core.private(this).bitmap;
    }
    set image(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.bitmap.src !== newValue && this.load(newValue);
    }
    //#endregion image
    //#region isEmpty
    isEmpty() {
        return priv.bitmap.src === core.types.CONSTANS.PIX;
    }
    //#endregion isEmpty
    //#endregion Getters / Setters
    //#region Methods
    //#region wheel
    wheel(event) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.keyboard.ctrl) {
            priv.scale -= core.mouse.getWheelDetail(event) * 0.02;
            priv.scale = Math.max(Math.min(priv.scale, 10), 0.01);
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
    //#endregion update
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const props = JSON.parse(htmlElement.querySelector('properties').innerText);
        //#endregion Variables déclaration
        super.loaded();
        props.hasOwnProperty('src') && this.load(props.src);
        htmlElement.appendChild(priv.bitmap);
        htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const HTMLEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        Events.unBind(priv.bitmap, HTMLEvents.LOAD, this.doBitmapLoaded);
        Events.unBind(priv.bitmap, HTMLEvents.ERROR, this.doBitmapNotLoaded);
        priv.bitmap.jsObj = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(Action.prototype, {
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