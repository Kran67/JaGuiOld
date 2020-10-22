//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Imports
//#region ScrollControl
class ScrollControl extends ThemedControl {
    //#region Private fields
    #lastDelta;
    #downPos;
    #currentPos;
    #down = !1;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.mouseTracking = !0;
            props.autoCapture = !0;
            props.allowRealignChildsOnResize = !0;
            super(owner, props);
            this.#lastDelta = new Point;
            this.#downPos = new Point;
            this.#currentPos = new Point;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region hasHorizScrollBar
    get hasHorizScrollBar() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        return htmlElement.offsetWidth < htmlElement.scrollWidth;
    }
    //#endregion hasHorizScrollBar
    //#region hasVertScrollBar
    get hasVertScrollBar() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        return htmlElement.offsetHeight < htmlElement.scrollHeight;
    }
    //#endregion hasVertScrollBar
    //#region hasBothScrollBars
    get hasBothScrollBars() {
        return this.hasHorizScrollBar() && this.hasVertScrollBar;
    }
    //#endregion hasBothScrollBars
    //#endregion Getters / Setters
    //#region Methods
    //#region mouseDown
    mouseDown() {
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.mouseTracking) {
            this.#lastDelta.setValues(0, 0);
            this.#downPos.assign(core.mouse.screen);
            this.#currentPos.assign(core.mouse.screen);
            this.#down = !0;
            //if (this._VScrollAni && this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
            //if (this._HScrollAni && this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
        }
    }
    //#endregion mouseDown
    //#region mouseMove
    mouseMove() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.mouseMove();
        if (this.#down && this.mouseTracking) {
            if (this.hasVertScrollBar || this.hasBothScrollBars) {
                htmlElement.scrollTop -= core.mouse.screen.y - this.#currentPos.y;
                this.#lastDelta.y = core.mouse.screen.y - this.#currentPos.y;
            }
            if (this.hasHorizScrollBar || this.hasBothScrollBars) {
                htmlElement.scrollLeft -= core.mouse.screen.x - this.#currentPos.x;
                this.#lastDelta.x = core.mouse.screen.x - this.#currentPos.x;
            }
            this.#currentPos.assign(core.mouse.screen);
        }
    }
    //#endregion mouseMove
    //#region mouseUp
    mouseUp() {
        super.mouseUp();
        if (this.#down && this.mouseTracking) {
            this.#down = !1;
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
    //#region destroy
    destroy() {
        this.#lastDelta.destroy();
        this.#downPos.destroy();
        this.#currentPos.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//Object.defineProperties(ScrollControl.prototype, {
//});
Object.seal(ScrollControl);
core.classes.register(core.types.CATEGORIES.INTERNAL, ScrollControl);
//#endregion ScrollControl
export { ScrollControl };