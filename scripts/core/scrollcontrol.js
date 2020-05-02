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
        !_private.has(key) ? _private.set(key, {}) : 1;
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
                props.hitTest.mouseWheel = !0;
                props.mouseTracking = !0;
                props.stopEvent = !1;
                props.autoCapture = !0;
                props.allowRealignChildsOnResize = !0;
                super(owner, props);
                const priv = internal(this);
                priv.lastDelta = new Point;
                priv.downPos = new Point;
                priv.currentPos = new Point;
                priv.down = !1;
                priv.scrollMode = props.hasOwnProperty('scrollMode') ? props.scrollMode : SCROLLMODES.NORMAL;
            }
        }
        //#endregion constructor
        //#region Methods
        //#region SCROLLMODES
        static get SCROLLMODES() {
            return SCROLLMODES;
        }
        //#endregion SCROLLMODES
        //#region scrollMode
        get scrollMode() {
            return internal(this).scrollMode;
        }
        set scrollMode(newValue) {
            if (core.tools.valueInSet(newValue, SCROLLMODES)) {
                priv.scrollMode !== newValue ? priv.scrollMode = newValue : null;
            }
        }
        //#endregion scrollMode
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseDown();
            if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.mouseTracking) {
                priv.lastDelta.setValues(0, 0);
                priv.downPos.assign(core.mouse.screen);
                priv.currentPos.assign(core.mouse.screen);
                priv.down = !0;
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
                    htmlElement.scrollTop -= core.mouse.screen.y - priv.currentPos.y;
                    priv.lastDelta.y = core.mouse.screen.y - priv.currentPos.y;
                }
                if (hasHorizScrollBar || hasBothScrollBars) {
                    htmlElement.scrollLeft -= core.mouse.screen.x - priv.currentPos.x;
                    priv.lastDelta.x = core.mouse.screen.x - priv.currentPos.x;
                }
                priv.currentPos.assign(core.mouse.screen);
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
                priv.down = !1;
                //if (this.animated && ((this._lastDelta.x !== 0) || (this._lastDelta.y !== 0))) {
                //    data = this._HTMLElement.dataset.scrollbars;
                //    if (data === $j.core.types.scrollbars.VERTICAL || data === $j.core.types.scrollbars.BOTH) {
                //        this.createVScrollAni();
                //        if (this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                //        this._VScrollAni.stopValue = this._VScrollBar.value - (this._lastDelta.y * 7);
                //        this._VScrollAni.start();
                //    }
                //    if (data === $j.core.types.scrollbars.HORIZONTAL || data === $j.core.types.scrollbars.BOTH) {
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
Object.seal(ScrollControl);
core.classes.register(core.types.CATEGORIES.INTERNAL, ScrollControl);
//#endregion ScrollControl
export { ScrollControl };