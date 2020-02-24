//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Tools } from '/scripts/core/tools.js';
import '/scripts/core/geometry.js';
//#endregion Imports
//#region Properties
const MOUSEBUTTONS = Object.freeze({
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right',
    MIDDLE: 'middle'
});
const MOUSEWHEELDIRS = Object.freeze({
    NONE: 'none',
    UP: 'up',
    DOWN: 'down'
});
const TOUCHEVENTS = Object.freeze({
    START: 'touchstart',
    MOVE: 'touchmove',
    END: 'touchend',
    CANCEL: 'touchcancel'
});
const POINTEREVENTS = Object.freeze({
    DOWN: 'pointerdown',
    MOVE: 'pointermove',
    UP: 'pointerup',
    CANCEL: 'pointercancel'
});
const MSPOINTEREVENTS = Object.freeze({
    DOWN: 'MSPointerDown',
    MOVE: 'MSPointerMove',
    UP: 'MSPointerUp',
    CANCEL: 'MSPointerCancel'
});
const MOUSEEVENTS = Object.freeze({
    EVENT: 'mouseevent',
    MOVE: 'mousemove',
    DOWN: 'mousedown',
    UP: 'mouseup',
    CANCEL: 'mousecancel',
    WHEEL: 'mousewheel',
    DBLCLICK: 'dblclick',
    DOMSCROLL: 'DOMMouseScroll',
    OUT: 'mouseout',
    OVER: 'mouseover',
    ENTER: 'mouseenter',
    LEAVE: 'mouseleave',
    CLICK: 'click',
    DRAG: 'drag',
    DROP: 'drop',
    DRAGEND: 'dragend',
    DRAGENTER: 'dragenter',
    DRAGEXIT: 'dragexit',
    DRAGLEAVE: 'dragleave',
    DRAGOVER: 'dragover',
    DRAGSTART: 'dragstart'
});
//#endregion
//#region Mouse
const Mouse = (() => {
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
    //#region Mouse
    class Mouse extends BaseClass {
        //#region constructor
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
        //#endregion constructor
        //#region Static
        static get MOUSEBUTTONS() {
            return MOUSEBUTTONS;
        }
        static get MOUSEWHEELDIRS() {
            return MOUSEWHEELDIRS;
        }
        static get TOUCHEVENTS() {
            return TOUCHEVENTS;
        }
        static get POINTEREVENTS() {
            return POINTEREVENTS;
        }
        static get MSPOINTEREVENTS() {
            return MSPOINTEREVENTS;
        }
        static get MOUSEEVENTS() {
            return MOUSEEVENTS;
        }
        //#endregion Static
        //#region Getters / Setters
        //#region target
        get target() {
            return internal(this).target;
        }
        //#endregion target
        //#region screen
        get screen() {
            return internal(this).screen;
        }
        //#endregion screen
        //#region button
        get button() {
            return internal(this).button;
        }
        set button(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Mouse.MOUSEBUTTONS)) {
                if (priv.button !== newValue) {
                    priv.button = newValue;
                }
            }
        }
        //#endregion button
        //#region document
        get document() {
            return internal(this).document;
        }
        //#endregion document
        //#region window
        get window() {
            return internal(this).window;
        }
        //#endregion window
        //#region wheelDir
        get wheelDir() {
            return internal(this).wheelDir;
        }
        set wheelDir(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Mouse.MOUSEWHEELDIRS)) {
                if (priv.wheelDir !== newValue) {
                    priv.wheelDir = newValue;
                }
            }
        }
        //#endregion wheelDir
        //#region wheelDelta
        get wheelDelta() {
            return internal(this).wheelDelta;
        }
        set wheelDelta(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.wheelDelta !== newValue) {
                    priv.wheelDelta = newValue;
                }
            }
        }
        //#endregion wheelDelta
        //#region eventType
        get eventType() {
            return internal(this).eventType;
        }
        set eventType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.eventType !== newValue) {
                    priv.eventType = newValue;
                }
            }
        }
        //#endregion eventType
        //#region event
        get event() {
            return internal(this).event;
        }
        set event(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof MouseEvent) {
                if (priv.event !== newValue) {
                    priv.event = newValue;
                }
            }
        }
        //#endregion event
        //#endregion
        //#region Methods
        //#region getMouseInfos
        getMouseInfos(mouseEventArg) {
            //#region Variables déclaration
            const priv = internal(this);
            const MOUSEBUTTONS = Mouse.MOUSEBUTTONS;
            const MOUSEEVENTS = Mouse.MOUSEEVENTS;
            const MOUSEWHEELDIRS = Mouse.MOUSEWHEELDIRS;
            //#endregion Variables déclaration
            priv.event = mouseEventArg;
            priv.eventType = mouseEventArg.type;
            priv.screen.setValues(mouseEventArg.screenX, mouseEventArg.screenY);
            priv.window.setValues(mouseEventArg.clientX, mouseEventArg.clientY);
            priv.document.setValues(mouseEventArg.pageX, mouseEventArg.pageY);
            priv.target.setValues(mouseEventArg.offsetX, mouseEventArg.offsetY);
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
                    priv.button = MOUSEBUTTONS.NONE;
                    break;
                case 1:
                    priv.button = MOUSEBUTTONS.LEFT;
                    break;
                case 2:
                    priv.button = MOUSEBUTTONS.MIDDLE;
                    break;
                case 3:
                    priv.button = MOUSEBUTTONS.RIGHT;
                    break;
            }
            //this.button=(mouseEventArg.which===1)?$j.types.mouseButtons.LEFT:((mouseEventArg.which===2)?$j.types.mouseButtons.MIDDLE:$j.types.mouseButtons.RIGHT);
            //}
            if (mouseEventArg.type === MOUSEEVENTS.WHEEL.toLowerCase() || mouseEventArg.type === MOUSEEVENTS.DOMSCROLL) {
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
                        priv.wheelDir = MOUSEWHEELDIRS.DOWN;
                    } else {
                        priv.wheelDir = MOUSEWHEELDIRS.UP;
                    }
                    priv.wheelDelta = delta;
                } else {
                    priv.wheelDir = MOUSEWHEELDIRS.NONE;
                    priv.wheelDelta = 0;
                }
            }
            if (Tools.isFunc(Core.onGetMouseInfos)) {
                Core.onGetMouseInfos();
            }
        }
        //#endregion getMouseInfos
        //#region getWheelDetail
        getWheelDetail(mouseEventArg) {
            delta = mouseEventArg.wheelDelta ? mouseEventArg.wheelDelta * 0.0083 : mouseEventArg.detail * 0.3333;
            if (!Core.browser.ff) {
                delta = -delta;
            }
            return delta;
        }
        //#endregion getWheelDetail
        //#region stopEvent
        stopEvent(mouseEventArg) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.target.setValues(0, 0);
            priv.screen.setValues(0, 0);
            priv.button = Mouse.MOUSEBUTTONS.NONE;
            priv.document.setValues(0, 0);
            priv.window.setValues(0, 0);
            priv.wheelDir = Mouse.MOUSEWHEELDIRS.NONE;
            priv.wheelDelta = 0;
            mouseEventArg.stopPropagation();
            mouseEventArg.stopImmediatePropagation();
            //mouseEventArg.preventDefault();
        }
        //#endregion stopEvent
        //#endregion
    }
    return Mouse;
    //#endregion Mouse
})();
//#endregion
Core.mouse = new Mouse;
export { Mouse };