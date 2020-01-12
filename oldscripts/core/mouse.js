define(["core", "types", "geometry"], function (Core, Types, Geometry) {
    //#region Properties
    Types.MOUSEBUTTONS = {
        NONE : "none",
        LEFT : "left",
        RIGHT : "right",
        MIDDLE : "middle"
    };
    Object.freeze(Types.MOUSEBUTTONS);
    Types.MOUSEWHEELDIRS = {
        NONE : "none",
        UP : "up",
        DOWN : "down"
    };
    Object.freeze(Types.MOUSEWHEELDIRS);
    Types.KEYBORDEVENTS = {
        NONE : "none",
        UP : "keyup",
        DOWN : "keydown",
        PRESS : "keypress"
    };
    Object.freeze(Types.KEYBORDEVENTS);
    Types.TOUCHEVENTS = {
        START : "touchstart",
        MOVE : "touchmove",
        END : "touchend",
        CANCEL : "touchcancel"
    };
    Object.freeze(Types.TOUCHEVENTS);
    Types.POINTEREVENTS = {
        DOWN : "pointerdown",
        MOVE : "pointermove",
        UP : "pointerup",
        CANCEL : "pointercancel"
    };
    Object.freeze(Types.POINTEREVENTS);
    Types.MSPOINTEREVENTS = {
        DOWN : "MSPointerDown",
        MOVE : "MSPointerMove",
        UP : "MSPointerUp",
        CANCEL : "MSPointerCancel"
    };
    Object.freeze(Types.MSPOINTEREVENTS);
    Types.MOUSEEVENTS = {
        EVENT : "mouseevent",
        MOVE : "mousemove",
        DOWN : "mousedown",
        UP : "mouseup",
        CANCEL : "mousecancel",
        WHEEL : "mousewheel",
        DBLCLICK : "dblclick",
        DOMSCROLL : "DOMMouseScroll",
        OUT : "mouseout",
        OVER : "mouseover",
        ENTER : "mouseenter",
        LEAVE : "mouseleave",
        CLICK : "click",
        DRAG : "drag",
        DROP : "drop",
        DRAGEND : "dragend",
        DRAGENTER : "dragenter",
        DRAGEXIT : "dragexit",
        DRAGLEAVE : "dragleave",
        DRAGOVER : "dragover",
        DRAGSTART : "dragstart"
    };
    Object.freeze(Types.MOUSEEVENTS);
    //#endregion
    //#region Mouse
    var Mouse = Core.Class.extend("Mouse", {
        init: function () {
            this.target = new Geometry.Point;
            this.screen = new Geometry.Point;
            this.button = Types.MOUSEBUTTONS.NONE;
            this.document = new Geometry.Point;
            this.window = new Geometry.Point;
            this.wheelDir = Types.MOUSEWHEELDIRS.NONE;
            this.wheelDelta = 0;
            this.eventType = String.EMPTY;
            this.event = null;
        },
        //#region Methods
        getMouseInfos: function (mouseEventArg) {
            var style, borderLeftWidth = 0, borderTopWidth = 0, rect = { top: 0, left: 0 };
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
            if (!$j.isMouseDown && !$j.isHTMLRenderer()) this.button = Types.MOUSEBUTTONS.NONE;
            else
            {
                switch (mouseEventArg.which)
                {
                    case 0:
                        this.button = Types.MOUSEBUTTONS.NONE;
                        break;
                    case 1:
                        this.button = Types.MOUSEBUTTONS.LEFT;
                        break;
                    case 2:
                        this.button = Types.MOUSEBUTTONS.MIDDLE;
                        break;
                    case 3:
                        this.button = Types.MOUSEBUTTONS.RIGHT;
                        break;
                }
                //this.button=(mouseEventArg.which===1)?$j.types.mouseButtons.LEFT:((mouseEventArg.which===2)?$j.types.mouseButtons.MIDDLE:$j.types.mouseButtons.RIGHT);
            }
            if ((mouseEventArg.type === Types.MOUSEEVENTS.WHEEL.toLowerCase()) || (mouseEventArg.type === Types.MOUSEEVENTS.DOMSCROLL))
            {
                //wheel
                var delta = 0;
                if (mouseEventArg.wheelDelta)
                {
                    delta = mouseEventArg.wheelDelta * 0.0083333333333333;
                    if ($j.browser.opera) delta = -delta;
                } else if (mouseEventArg.detail) delta = -mouseEventArg.detail * 0.3333333333333333;
                if (delta !== 0)
                {
                    if (delta < 0) this.wheelDir = Types.MOUSEWHEELDIRS.DOWN;
                    else this.wheelDir = Types.MOUSEWHEELDIRS.UP;
                    this.wheelDelta = delta;
                } else
                {
                    this.wheelDir = Types.MOUSEWHEELDIRS.NONE;
                    this.wheelDelta = 0;
                }
            }
            if (typeof $j.onGetMouseInfos === _const.FUNCTION) $j.onGetMouseInfos();
        },
        getWheelDetail: function (mouseEventArg) {
            delta = mouseEventArg.wheelDelta ? mouseEventArg.wheelDelta * 0.0083333333333333 : mouseEventArg.detail * 0.3333333333333333;
            if ($j.browser.ie || $j.browser.chrome || $j.browser.safari || $j.browser.opera) delta = -delta;
            return delta;
        },
        stopEvent: function (mouseEventArg) {
            this.target.setValues(0, 0);
            this.screen.setValues(0, 0);
            this.button = Types.MOUSEBUTTONS.NONE;
            this.document.setValues(0, 0);
            this.window.setValues(0, 0);
            this.wheelDir = Types.MOUSEWHEELDIRS.NONE;
            this.wheelDelta = 0;
            mouseEventArg.stopPropagation();
            mouseEventArg.stopImmediatePropagation();
            //mouseEventArg.preventDefault();

        }
        //#endregion
    });
    //#endregion
    return Mouse;
});