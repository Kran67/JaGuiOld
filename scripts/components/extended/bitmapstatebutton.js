//#region Import
import { CustomButton } from '/scripts/components/common/button.js';
import { Events } from '/scripts/core/events.js';
//#endregion Import
//#region Class BitmapStateButton
class BitmapStateButton extends CustomButton {
    //#region Private fields
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.auotSize = !0;
            props.mouseEvent = { mouseenter: !0, mouseleave: !0 };
            super(owner, props);
            const priv = core.private(this, {
                bitmapState: new Image
            });
            priv.bitmapState.obj = this;
            priv.bitmapState.src = props.hasOwnProperty('bitmap') ? props.bitmap : core.types.CONSTANTS.PIX;
            Events.bind(priv.bitmapState, htmlEvents.LOAD, this.doBitmapLoaded);
            Events.bind(priv.bitmapState, htmlEvents.ERROR, this.doBitmapNotLoaded);
        }
    }
    //#endregion
    //#region Getters / Setters
    //#region bitmap
    set bitmap(bmpSrc) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (typeof bmpSrc === core.types.CONSTANTS.STRING) {
            priv.bitmapState.src = bmpSrc;
            this.update();
        }
    }
    //#endregion bitmap
    //#region autoSize
    get autoSize() {
        return super.autoSize;
    }
    set autoSize(newValue) {
        return;
    }
    //#endregion width
    //#region width
    get width() {
        return this.HTMLElement.offsetWidth;
    }
    set width(newValue) {
        !this.autoSize && (super.width = newValue);
    }
    //#endregion width
    //#region height
    get height() {
        return this.HTMLElement.offsetHeight;
    }
    set height(newValue) {
        !this.autoSize && (super.height = newValue);
    }
    //#endregion height
    //#endregion Getters / Setters
    //#region Methods
    doBitmapLoaded() {
        this.obj.update();
    }
    doBitmapNotLoaded() {
        console.log(`Bitmap not loaded in : ${this.obj.name}`);
    }
    mouseDown() {
        super.mouseDown();
        this.update();
    }
    mouseLeave() {
        super.mouseLeave();
        this.update();
    }
    mouseEnter() {
        super.mouseEnter();
        this.update();
    }
    mouseUp() {
        super.mouseUp();
        this.update();
    }
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElementStyle = this.HTMLElementStyle;
        const imagePartSize = priv.bitmapState.naturalHeight / 3;
        const PX = core.types.CSSUNITS.PX;
        const isPressed = this.isPressed;
        const isMouseOver = this.isMouseOver;
        //#endregion Variables déclaration
        super.update();
        if (this.autoSize) {
            htmlElementStyle.width = `${priv.bitmapState.naturalWidth}${PX}`;
            htmlElementStyle.height = `${priv.bitmapState.naturalHeight / 3}${PX}`;
        }
        htmlElementStyle.backgroundImage = `url('${priv.bitmapState.src}')`;
        if (isPressed && isMouseOver) {
            htmlElementStyle.backgroundPosition = `left ${-imagePartSize * 2}${PX}`;
        } else if (!isPressed && isMouseOver) {
            htmlElementStyle.backgroundPosition = `left ${-imagePartSize}${PX}`;
        } else if (!isMouseOver) {
            htmlElementStyle.backgroundPosition = 'left top';
        }
    }
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlEvents = core.types.HTMLEVENTS;
        //#endregion Variables déclaration
        Events.unBind(priv.bitmapState, htmlEvents.LOAD, this.doBitmapLoaded);
        Events.unBind(priv.bitmapState, htmlEvents.ERROR, this.doBitmapNotLoaded);
        priv.bitmapState.obj = null;
        priv.bitmapState = null;
        super.destroy();
    }
    //#region Methods
}
core.classes.register(core.types.CATEGORIES.EXTENDED, BitmapStateButton);
//#endregion BitmapStateButton
export { BitmapStateButton };
