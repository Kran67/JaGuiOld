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
class ScrollControl extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.mouseTracking = !0;
            props.autoCapture = !0;
            props.allowRealignChildsOnResize = !0;
            super(owner, props);
            core.private(this, {
                lastDelta: new Point,
                downPos: new Point,
                currentPos: new Point,
                down: !1,
                scrollMode: props.hasOwnProperty('scrollMode') ? props.scrollMode : SCROLLMODES.NORMAL
            });
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
        return core.private(this)[core.tools.getPropertyName()];
    }
    set scrollMode(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.valueInSet(newValue, SCROLLMODES) && (priv[propName] !== newValue && core.private(this, { [propName]: newValue }));
    }
    //#endregion scrollMode
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
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.mouseTracking) {
            priv.lastDelta.setValues(0, 0);
            priv.downPos.assign(core.mouse.screen);
            priv.currentPos.assign(core.mouse.screen);
            core.private(this, { down: !0 });
            //if (this._VScrollAni && this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
            //if (this._HScrollAni && this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
        }
    }
    //#endregion mouseDown
    //#region mouseMove
    mouseMove() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.mouseMove();
        if (priv.down && this.mouseTracking) {
            if (this.hasVertScrollBar || this.hasBothScrollBars) {
                htmlElement.scrollTop -= core.mouse.screen.y - priv.currentPos.y;
                priv.lastDelta.y = core.mouse.screen.y - priv.currentPos.y;
            }
            if (this.hasHorizScrollBar || this.hasBothScrollBars) {
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.mouseUp();
        if (priv.down && this.mouseTracking) {
            core.private(this, { down: !1 });
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.lastDelta.destroy();
        priv.downPos.destroy();
        priv.currentPos.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(ScrollControl);
core.classes.register(core.types.CATEGORIES.INTERNAL, ScrollControl);
//#endregion ScrollControl
export { ScrollControl };