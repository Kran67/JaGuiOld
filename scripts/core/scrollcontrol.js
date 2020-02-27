//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Imports
//#region SCROLLMODES
const SCROLLMODES = Object.freeze(Object.seal({
    NORMAL: 'normal',
    VIRTUAL: 'virtual'
}));
//#endregion SCROLLMODES
//#region ScrollControl
const ScrollControl = (() => {
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
    //#region ScrollControl
    class ScrollControl extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                this.hitTest.mouseWheel = true;
                this.mouseTracking = true;
                this.stopEvent = false;
                priv.lastDelta = new Point;
                priv.downPos = new Point;
                priv.currentPos = new Point;
                priv.down = false;
                this.autoCapture = true;
                this.allowRealignChildsOnResize = true;
                priv.scrollMode = props.hasOwnProperty('scrollMode')?props.scrollMode:SCROLLMODES.NORMAL;
            }
        }
        //#endregion constructor
        //#region Methods
        //#region SCROLLMODES
        static SCROLLMODES() {
            return SCROLLMODES;
        }
        //#endregion SCROLLMODES
        //#region scrollMode
        get scrollMode() {
            return internal(this).scrollMode;
        }
        set scrollMode(newValue) {
            if (Tools.valueInSet(newValue, SCROLLMODES)) {
                if (priv.scrollMode !== newValue) {
                    priv.scrollMode = newValue;
                }
            }
        }
        //#endregion scrollMode
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.mouseTracking) {
                priv.lastDelta.setValues(0, 0);
                priv.downPos.assign(Core.mouse.screen);
                priv.currentPos.assign(Core.mouse.screen);
                priv.down = true;
                //if (this._VScrollAni && this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                //if (this._HScrollAni && this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const hasHorizScrollBar = htmlElement.offsetWidth < htmlElement.scrollWidth;
            const hasVertScrollBar = htmlElement.offsetHeight < htmlElement.scrollHeight;
            const hasBothScrollBars = hasHorizScrollBar & hasVertScrollBar;
            //#endregion Variables déclaration
            super.mouseMove();
            if (priv.down && this.mouseTracking) {
                if (hasVertScrollBar || hasBothScrollBars) {
                    htmlElement.scrollTop -= Core.mouse.screen.y - priv.currentPos.y;
                    priv.lastDelta.y = Core.mouse.screen.y - priv.currentPos.y;
                }
                if (hasHorizScrollBar || hasBothScrollBars) {
                    htmlElement.scrollLeft -= Core.mouse.screen.x - priv.currentPos.x;
                    priv.lastDelta.x = Core.mouse.screen.x - priv.currentPos.x;
                }
                priv.currentPos.assign(Core.mouse.screen);
            }
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseUp();
            if (priv.down && this.mouseTracking) {
                priv.down = false;
                //if (this.animated && ((this._lastDelta.x !== 0) || (this._lastDelta.y !== 0))) {
                //    data = this._HTMLElement.dataset.scrollbars;
                //    if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                //        this.createVScrollAni();
                //        if (this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                //        this._VScrollAni.stopValue = this._VScrollBar.value - (this._lastDelta.y * 7);
                //        this._VScrollAni.start();
                //    }
                //    if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                //        this.createHScrollAni();
                //        if (this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
                //        this._HScrollAni.stopValue = this._HScrollBar.value - (this._lastDelta.x * 7);
                //        this._HScrollAni.start();
                //    }
                //}
            }
        }
        //#endregion mouseUp
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.lastDelta.destroy();
            priv.lastDelta = null;
            priv.downPos.destroy();
            priv.downPos = null;
            priv.currentPos.destroy();
            priv.currentPos = null;
            priv.down = null;
        }
        //#endregion Methods
    }
    return ScrollControl;
    //#endregion ScrollControl
})();
//#endregion ScrollControl
Object.seal(ScrollControl);
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, ScrollControl);
export { ScrollControl };