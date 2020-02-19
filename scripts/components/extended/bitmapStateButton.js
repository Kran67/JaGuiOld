//#region Import
import { CustomButton } from '/scripts/components/common/button.js';
import { Events } from '/scripts/core/events.js';
//#endregion Import
//#region BitmapStateButton
const BitmapStateButton = (() => {
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
    //#region Class BitmapStateButton
    class BitmapStateButton extends CustomButton {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const htmlEvents = Types.HTMLEVENTS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.bitmapState = new Image;
                priv.bitmapState.obj = this;
                priv.bitmapState.src = props.hasOwnProperty('bitmap')?props.bitmap:Types.CONSTANTS.PIX;
                Events.bind(priv.bitmapState, htmlEvents.LOAD, this.doBitmapLoaded);
                Events.bind(priv.bitmapState, htmlEvents.ERROR, this.doBitmapNotLoaded);
                this.auotSize = true;
            }
        }
        //#endregion
        //#region getter / setter
        //#region bitmap
        set bitmap(bmpSrc) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof bmpSrc === Types.CONSTANTS.STRING) {
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
            if (!this.autoSize) {
                super.width = newValue;
            }
        }
        //#endregion width
        //#region height
        get height() {
            return this.HTMLElement.offsetHeight;
        }
        set height(newValue) {
            if (!this.autoSize) {
                super.height = newValue;
            }
        }
        //#endregion height
        //#endregion getter / setter
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
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            const imagePartSize = priv.bitmapState.naturalHeight / 3;
            const PX = Types.CSSUNITS.PX;
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
            const priv = internal(this);
            const htmlEvents = Types.HTMLEVENTS;
            //#endregion Variables déclaration
            super.destroy();
            Events.unBind(priv.bitmapState, htmlEvents.LOAD, this.doBitmapLoaded);
            Events.unBind(priv.bitmapState, htmlEvents.ERROR, this.doBitmapNotLoaded);
            priv.bitmapState.obj = null;
            priv.bitmapState = null;
        }
        //#region Methods
    }
    return BitmapStateButton;
    //#endregion
})();
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, BitmapStateButton);
export { BitmapStateButton };