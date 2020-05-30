//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import '/scripts/core/geometry.js';
//#endregion Imports
//#region MOUSEBUTTONS
const MOUSEBUTTONS = Object.freeze(Object.seal({
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right',
    MIDDLE: 'middle'
}));
//#endregion MOUSEBUTTONS
//#region MOUSEWHEELDIRS
const MOUSEWHEELDIRS = Object.freeze(Object.seal({
    NONE: 'none',
    UP: 'up',
    DOWN: 'down'
}));
//#endregion MOUSEWHEELDIRS
//#region TOUCHEVENTS
const TOUCHEVENTS = Object.freeze(Object.seal({
    START: 'touchstart',
    MOVE: 'touchmove',
    END: 'touchend',
    CANCEL: 'touchcancel'
}));
//#endregion TOUCHEVENTS
//#region POINTEREVENTS
const POINTEREVENTS = Object.freeze(Object.seal({
    DOWN: 'pointerdown',
    MOVE: 'pointermove',
    UP: 'pointerup',
    CANCEL: 'pointercancel'
}));
//#endregion POINTEREVENTS
//#region MSPOINTEREVENTS
const MSPOINTEREVENTS = Object.freeze(Object.seal({
    DOWN: 'MSPointerDown',
    MOVE: 'MSPointerMove',
    UP: 'MSPointerUp',
    CANCEL: 'MSPointerCancel'
}));
//#endregion MSPOINTEREVENTS
//#region MOUSEEVENTS
const MOUSEEVENTS = Object.freeze(Object.seal({
    EVENT: 'mouseevent',
    MOVE: 'mousemove',
    DOWN: 'mousedown',
    UP: 'mouseup',
    CANCEL: 'mousecancel',
    WHEEL: 'wheel',
    DBLCLICK: 'dblclick',
    SCROLL: 'scroll',
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
}));
//#endregion MOUSEEVENTS
//#region Mouse
class Mouse {
    //#region constructor
    constructor() {
        this.target = new core.classes.Point;
        this.screen = new core.classes.Point;
        this.button = Mouse.MOUSEBUTTONS.NONE;
        this.document = new core.classes.Point;
        this.window = new core.classes.Point;
        this.wheelDir = Mouse.MOUSEWHEELDIRS.NONE;
        this.wheelDelta = 0;
        this.eventType = String.EMPTY;
        this.event = null;
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
    //#region Methods
    //#region getMouseInfos
    getMouseInfos(mouseEventArg) {
        //#region Variables déclaration
        const MOUSEBUTTONS = Mouse.MOUSEBUTTONS;
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        const MOUSEWHEELDIRS = Mouse.MOUSEWHEELDIRS;
        //#endregion Variables déclaration
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
        //if (!core.isMouseDown) {
        //    this._button = Mouse.MOUSEBUTTONS.NONE;
        //} else {
        switch (mouseEventArg.which) {
            case 0:
                this.button = MOUSEBUTTONS.NONE;
                break;
            case 1:
                this.button = MOUSEBUTTONS.LEFT;
                break;
            case 2:
                this.button = MOUSEBUTTONS.MIDDLE;
                break;
            case 3:
                this.button = MOUSEBUTTONS.RIGHT;
                break;
        }
        //this.button=(mouseEventArg.which===1)?$j.core.types.mouseButtons.LEFT:((mouseEventArg.which===2)?$j.core.types.mouseButtons.MIDDLE:$j.core.types.mouseButtons.RIGHT);
        //}
        if (mouseEventArg.type === MOUSEEVENTS.WHEEL.toLowerCase() || mouseEventArg.type === MOUSEEVENTS.SCROLL) {
            //wheel
            let delta = 0;
            //if (mouseEventArg.wheelDelta) {
            //    delta = mouseEventArg.wheelDelta * 0.0083;
            //    core.browser.opera && (delta = -delta);
            //} else if (mouseEventArg.detail) delta = -mouseEventArg.detail * 0.3333;
            delta = this.getWheelDetail(mouseEventArg);
            if (delta !== 0) {
                this.wheelDir = delta < 0 ? MOUSEWHEELDIRS.DOWN : MOUSEWHEELDIRS.UP;
                this.wheelDelta = delta;
            } else {
                this.wheelDir = MOUSEWHEELDIRS.NONE;
                this.wheelDelta = 0;
            }
        }
        core.tools.isFunc(core.onGetMouseInfos) && core.onGetMouseInfos();
    }
    //#endregion getMouseInfos
    //#region getWheelDetail
    getWheelDetail(mouseEventArg) {
        mouseEventArg = mouseEventArg || this.event;
        let delta = mouseEventArg.wheelDelta ? mouseEventArg.wheelDelta * 0.0083 : mouseEventArg.detail * 0.3333;
        !core.browser.ff && (delta = -delta);
        return delta;
    }
    //#endregion getWheelDetail
    //#region stopAllEvents
    stopAllEvents(mouseEventArg) {
        mouseEventArg = mouseEventArg || this.event;
        mouseEventArg.stopPropagation();
        mouseEventArg.stopImmediatePropagation();
        mouseEventArg.preventDefault();
        this.target.setValues(0, 0);
        this.screen.setValues(0, 0);
        this.button = Mouse.MOUSEBUTTONS.NONE;
        this.document.setValues(0, 0);
        this.window.setValues(0, 0);
        this.wheelDir = Mouse.MOUSEWHEELDIRS.NONE;
        this.wheelDelta = 0;
    }
    //#endregion stopAllEvents
    stopPropagation(mouseEventArg) {
        mouseEventArg = mouseEventArg || this.event;
        mouseEventArg.stopPropagation();
    }
    stopImmediatePropagation(mouseEventArg) {
        mouseEventArg = mouseEventArg || this.event;
        mouseEventArg.stopImmediatePropagation();
    }
    preventDefault(mouseEventArg) {
        mouseEventArg = mouseEventArg || this.event;
        mouseEventArg.preventDefault();
    }
    //#region destroy
    destroy() {
        this.target.destroy();
        this.target = null;
        this.screen.destroy();
        this.screen = null;
        this.button.destroy();
        this.button = null;
        this.document.destroy();
        this.document = null;
        this.window.destroy();
        this.window = null;
        this.wheelDir = null;
        this.wheelDelta = null;
        this.eventType = null;
        this.event = null;
    }
    //#endregion destroy
    //#endregion
}
core.mouse = new Mouse;
//#endregion Mouse
export { Mouse };