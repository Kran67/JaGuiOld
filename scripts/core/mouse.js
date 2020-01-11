import { BaseClass } from "/scripts/core/baseclass.js";
import { Tools } from "/scripts/core/tools.js";
import "/scripts/core/geometry.js";
//#region Properties
const _MOUSEBUTTONS = Object.freeze({
    NONE: "none",
    LEFT: "left",
    RIGHT: "right",
    MIDDLE: "middle"
});
const _MOUSEWHEELDIRS = Object.freeze({
    NONE: "none",
    UP: "up",
    DOWN: "down"
});
const _TOUCHEVENTS = Object.freeze({
    START: "touchstart",
    MOVE: "touchmove",
    END: "touchend",
    CANCEL: "touchcancel"
});
const _POINTEREVENTS = Object.freeze({
    DOWN: "pointerdown",
    MOVE: "pointermove",
    UP: "pointerup",
    CANCEL: "pointercancel"
});
const _MSPOINTEREVENTS = Object.freeze({
    DOWN: "MSPointerDown",
    MOVE: "MSPointerMove",
    UP: "MSPointerUp",
    CANCEL: "MSPointerCancel"
});
const _MOUSEEVENTS = Object.freeze({
    EVENT: "mouseevent",
    MOVE: "mousemove",
    DOWN: "mousedown",
    UP: "mouseup",
    CANCEL: "mousecancel",
    WHEEL: "mousewheel",
    DBLCLICK: "dblclick",
    DOMSCROLL: "DOMMouseScroll",
    OUT: "mouseout",
    OVER: "mouseover",
    ENTER: "mouseenter",
    LEAVE: "mouseleave",
    CLICK: "click",
    DRAG: "drag",
    DROP: "drop",
    DRAGEND: "dragend",
    DRAGENTER: "dragenter",
    DRAGEXIT: "dragexit",
    DRAGLEAVE: "dragleave",
    DRAGOVER: "dragover",
    DRAGSTART: "dragstart"
});
//#endregion
//#region Mouse
const Mouse = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Mouse extends BaseClass {
        constructor() {
            super();
            const priv = internal(this);
            priv.target = new Core.classes.Point;
            priv.screen = new Core.classes.Point;
            priv.button = Mouse.MOUSEBUTTONS.NONE;
            priv.document = new Core.classes.Point;
            priv.window = new Core.classes.Point;
            priv.wheelDir = Mouse.MOUSEWHEELDIRS.NONE;
            priv.wheelDelta = 0;
            priv.eventType = String.EMPTY;
            priv.event = null;
        }
        //#region Properties
        static get MOUSEBUTTONS() {
            return _MOUSEBUTTONS;
        }
        static get MOUSEWHEELDIRS() {
            return _MOUSEWHEELDIRS;
        }
        static get TOUCHEVENTS() {
            return _TOUCHEVENTS;
        }
        static get POINTEREVENTS() {
            return _POINTEREVENTS;
        }
        static get MSPOINTEREVENTS() {
            return _MSPOINTEREVENTS;
        }
        static get MOUSEEVENTS() {
            return _MOUSEEVENTS;
        }
        //#endregion
        //#region Getters / Setters
        get target() {
            return internal(this).target;
        }
        get screen() {
            return internal(this).screen;
        }
        get button() {
            return internal(this).button;
        }
        set button(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Mouse.MOUSEBUTTONS)) {
                if (priv.button !== newValue) {
                    priv.button = newValue;
                }
            }
        }
        get document() {
            return internal(this).document;
        }
        get window() {
            return internal(this).window;
        }
        get wheelDir() {
            return internal(this).wheelDir;
        }
        set wheelDir(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Mouse.MOUSEWHEELDIRS)) {
                if (priv.wheelDir !== newValue) {
                    priv.wheelDir = newValue;
                }
            }
        }
        get wheelDelta() {
            return internal(this).wheelDelta;
        }
        set wheelDelta(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.wheelDelta !== newValue) {
                    priv.wheelDelta = newValue;
                }
            }
        }
        get eventType() {
            return internal(this).eventType;
        }
        set eventType(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.eventType !== newValue) {
                    priv.eventType = newValue;
                }
            }
        }
        get event() {
            return internal(this).event;
        }
        set event(newValue) {
            const priv = internal(this);
            if (newValue instanceof MouseEvent) {
                if (priv.event !== newValue) {
                    priv.event = newValue;
                }
            }
        }
        //#endregion
        //#region Methods
        getMouseInfos(mouseEventArg) {
            this.event = mouseEventArg;
            this.eventType = mouseEventArg.type;
            this.screen.setValues(mouseEventArg.screenX, mouseEventArg.screenY);
            this.window.setValues(mouseEventArg.clientX, mouseEventArg.clientY);
            this.document.setValues(mouseEventArg.pageX, mouseEventArg.pageY);
            this.target.setValues(mouseEventArg.offsetX, mouseEventArg.offsetY);
            //if ($j.isHTMLRenderer()) {
            //  if (mouseEventArg.currentTarget!==$j.doc) {
            //    style=mouseEventArg.currentTarget.currentStyle||getComputedStyle(mouseEventArg.currentTarget);
            //    if (style)) {
            //      borderLeftWidth=parseInt(style.borderLeftWidth,10);
            //      borderTopWidth=parseInt(style.borderTopWidth,10);
            //      rect=mouseEventArg.currentTarget.getBoundingClientRect();
            //    }
            //    this.target.setValues(mouseEventArg.clientX-borderLeftWidth-rect.left,mouseEventArg.clientY-borderTopWidth-rect.top);
            //  }
            //}
            //if (!Core.isMouseDown) {
            //    this._button = Mouse.MOUSEBUTTONS.NONE;
            //} else {
            switch (mouseEventArg.which) {
                case 0:
                    this.button = Mouse.MOUSEBUTTONS.NONE;
                    break;
                case 1:
                    this.button = Mouse.MOUSEBUTTONS.LEFT;
                    break;
                case 2:
                    this.button = Mouse.MOUSEBUTTONS.MIDDLE;
                    break;
                case 3:
                    this.button = Mouse.MOUSEBUTTONS.RIGHT;
                    break;
            }
            //this.button=(mouseEventArg.which===1)?$j.types.mouseButtons.LEFT:((mouseEventArg.which===2)?$j.types.mouseButtons.MIDDLE:$j.types.mouseButtons.RIGHT);
            //}
            if ((mouseEventArg.type === Mouse.MOUSEEVENTS.WHEEL.toLowerCase()) || (mouseEventArg.type === Mouse.MOUSEEVENTS.DOMSCROLL)) {
                //wheel
                let delta = 0;
                if (mouseEventArg.wheelDelta) {
                    delta = mouseEventArg.wheelDelta * 0.0083;
                    if (Core.browser.opera) {
                        delta = -delta;
                    }
                } else if (mouseEventArg.detail) delta = -mouseEventArg.detail * 0.3333;
                if (delta !== 0) {
                    if (delta < 0) {
                        this._wheelDir = Mouse.MOUSEWHEELDIRS.DOWN;
                    } else {
                        this.wheelDir = Mouse.MOUSEWHEELDIRS.UP;
                    }
                    this.wheelDelta = delta;
                } else {
                    this.wheelDir = Mouse.MOUSEWHEELDIRS.NONE;
                    this.wheelDelta = 0;
                }
            }
            if (typeof Core.onGetMouseInfos === Types.CONSTANTS.FUNCTION) {
                Core.onGetMouseInfos();
            }
        }
        getWheelDetail(mouseEventArg) {
            delta = mouseEventArg.wheelDelta ? mouseEventArg.wheelDelta * 0.0083 : mouseEventArg.detail * 0.3333;
            if (!Core.browser.ff) {
                delta = -delta;
            }
            return delta;
        }
        stopEvent(mouseEventArg) {
            this.target.setValues(0, 0);
            this.screen.setValues(0, 0);
            this.button = Mouse.MOUSEBUTTONS.NONE;
            this.document.setValues(0, 0);
            this.window.setValues(0, 0);
            this.wheelDir = Mouse.MOUSEWHEELDIRS.NONE;
            this.wheelDelta = 0;
            mouseEventArg.stopPropagation();
            mouseEventArg.stopImmediatePropagation();
            //mouseEventArg.preventDefault();
        }
        //#endregion
    }
    return Mouse;
})();
//#endregion
Core.mouse = new Mouse;
export { Mouse };