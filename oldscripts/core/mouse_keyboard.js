(function () {
    //#region Properties
    $j.types.mouseButtons = {};
    $j.types.mouseButtons.NONE = "none";
    $j.types.mouseButtons.LEFT = "left";
    $j.types.mouseButtons.RIGHT = "right";
    $j.types.mouseButtons.MIDDLE = "middle";
    $j.types.mouseWheelDirs = {};
    $j.types.mouseWheelDirs.NONE = "none";
    $j.types.mouseWheelDirs.UP = "up";
    $j.types.mouseWheelDirs.DOWN = "down";
    $j.types.keybordEvents = {};
    $j.types.keybordEvents.NONE = "none";
    $j.types.keybordEvents.UP = "keyup";
    $j.types.keybordEvents.DOWN = "keydown";
    $j.types.keybordEvents.PRESS = "keypress";
    $j.types.touchEvents = {};
    $j.types.touchEvents.START = "touchstart";
    $j.types.touchEvents.MOVE = "touchmove";
    $j.types.touchEvents.END = "touchend";
    $j.types.touchEvents.CANCEL = "touchcancel";
    $j.types.pointerEvents = {};
    $j.types.pointerEvents.DOWN = "pointerdown";
    $j.types.pointerEvents.MOVE = "pointermove";
    $j.types.pointerEvents.UP = "pointerup";
    $j.types.pointerEvents.CANCEL = "pointercancel";
    $j.types.MSPointerEvents = {};
    $j.types.MSPointerEvents.DOWN = "MSPointerDown";
    $j.types.MSPointerEvents.MOVE = "MSPointerMove";
    $j.types.MSPointerEvents.UP = "MSPointerUp";
    $j.types.MSPointerEvents.CANCEL = "MSPointerCancel";
    $j.types.mouseEvents = {};
    $j.types.mouseEvents.EVENT = "mouseevent";
    $j.types.mouseEvents.MOVE = "mousemove";
    $j.types.mouseEvents.DOWN = "mousedown";
    $j.types.mouseEvents.UP = "mouseup";
    $j.types.mouseEvents.CANCEL = "mousecancel";
    $j.types.mouseEvents.WHEEL = "mousewheel";
    $j.types.mouseEvents.DBLCLICK = "dblclick";
    $j.types.mouseEvents.DOMSCROLL = "DOMMouseScroll";
    $j.types.mouseEvents.OUT = "mouseout";
    $j.types.mouseEvents.OVER = "mouseover";
    $j.types.mouseEvents.ENTER = "mouseenter";
    $j.types.mouseEvents.LEAVE = "mouseleave";
    $j.types.mouseEvents.CLICK = "click";
    $j.types.mouseEvents.DRAG = "drag";
    $j.types.mouseEvents.DROP = "drop";
    $j.types.mouseEvents.DRAGEND = "dragend";
    $j.types.mouseEvents.DRAGENTER = "dragenter";
    $j.types.mouseEvents.DRAGEXIT = "dragexit";
    $j.types.mouseEvents.DRAGLEAVE = "dragleave";
    $j.types.mouseEvents.DRAGOVER = "dragover";
    $j.types.mouseEvents.DRAGSTART = "dragstart";
    //#endregion
    //#region Mouse
    var Mouse = Class.extend("Mouse", {
        init: function () {
            this.target = new $j.classes.Point;
            this.screen = new $j.classes.Point;
            this.button = $j.types.mouseButtons.NONE;
            this.document = new $j.classes.Point;
            this.window = new $j.classes.Point;
            this.wheelDir = $j.types.mouseWheelDirs.NONE;
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
            if (!$j.isMouseDown && !$j.isHTMLRenderer()) this.button = $j.types.mouseButtons.NONE;
            else {
                switch (mouseEventArg.which) {
                    case 0:
                        this.button = $j.types.mouseButtons.NONE;
                        break;
                    case 1:
                        this.button = $j.types.mouseButtons.LEFT;
                        break;
                    case 2:
                        this.button = $j.types.mouseButtons.MIDDLE;
                        break;
                    case 3:
                        this.button = $j.types.mouseButtons.RIGHT;
                        break;
                }
                //this.button=(mouseEventArg.which===1)?$j.types.mouseButtons.LEFT:((mouseEventArg.which===2)?$j.types.mouseButtons.MIDDLE:$j.types.mouseButtons.RIGHT);
            }
            if ((mouseEventArg.type === $j.types.mouseEvents.WHEEL.toLowerCase()) || (mouseEventArg.type === $j.types.mouseEvents.DOMSCROLL)) {
                //wheel
                var delta = 0;
                if (mouseEventArg.wheelDelta) {
                    delta = mouseEventArg.wheelDelta * 0.0083333333333333;
                    if ($j.browser.opera) delta = -delta;
                } else if (mouseEventArg.detail) delta = -mouseEventArg.detail * 0.3333333333333333;
                if (delta !== 0) {
                    if (delta < 0) this.wheelDir = $j.types.mouseWheelDirs.DOWN;
                    else this.wheelDir = $j.types.mouseWheelDirs.UP;
                    this.wheelDelta = delta;
                } else {
                    this.wheelDir = $j.types.mouseWheelDirs.NONE;
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
            this.button = $j.types.mouseButtons.NONE;
            this.document.setValues(0, 0);
            this.window.setValues(0, 0);
            this.wheelDir = $j.types.mouseWheelDirs.NONE;
            this.wheelDelta = 0;
            mouseEventArg.stopPropagation();
            mouseEventArg.stopImmediatePropagation();
            //mouseEventArg.preventDefault();

        }
        //#endregion
    });
    //#endregion
    //#region Keyboard
    var Keyboard = Class.extend("Keyboard", {
        init: function () {
            this.ctrl = false;
            this.alt = false;
            this.shift = false;
            this.meta = false;
            this.keyCode = $j.types.VKeysCodes.NONE;
            this.keyEvent = $j.types.keybordEvents.NONE;
            this.keyChar = String.EMPTY;
            this.keyCodeTable = [];
            this.event = null;
            this.isNavigationKey = function () {
                return [$j.types.VKeysCodes.VK_BACKSPACE,
                        $j.types.VKeysCodes.VK_PRIOR,
                        $j.types.VKeysCodes.VK_NEXT,
                        $j.types.VKeysCodes.VK_END,
                        $j.types.VKeysCodes.VK_HOME,
                        $j.types.VKeysCodes.VK_LEFT,
                        $j.types.VKeysCodes.VK_UP,
                        $j.types.VKeysCodes.VK_RIGHT,
                        $j.types.VKeysCodes.VK_DOWN,
                        $j.types.VKeysCodes.VK_INSERT,
                        $j.types.VKeysCodes.VK_DELETE,
                        $j.types.VKeysCodes.VK_LAPP,
                        $j.types.VKeysCodes.VK_RAPP,
                        $j.types.VKeysCodes.VK_MENU,
                        $j.types.VKeysCodes.VK_RETURN
                ].indexOf(this.keyCode) > -1;
            };
            if ($j.browser.ff) {
                var c = {
                    32: " ", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 59: ";", 61: "=", 65: "a", 66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k",
                    76: "l", 77: "m", 78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 107: "+", 109: "-", 110: ".", 188: ",", 190: ".", 191: "/", 192: "`", 219: "[",
                    220: "\\", 221: "]", 222: '"'
                };
                // à modifier avec getOwnPropertyNames
                for (var b in c) {
                    if (c.hasOwnProperty(b)) {
                        var d = c[b];
                        this.keyCodeTable[d.charCodeAt(0)] = parseInt(b, 10);
                        if (d.toUpperCase() != d) this.keyCodeTable[d.toUpperCase().charCodeAt(0)] = parseInt(b, 10);
                    }
                }
            }
        },
        //#region Methods
        getKeyboardInfos: function (keyboardEventArg) {
            var keyCode = null;
            this.event = keyboardEventArg;
            this.ctrl = keyboardEventArg.ctrlKey;
            this.alt = keyboardEventArg.altKey;
            this.shift = keyboardEventArg.shiftKey;
            if (keyboardEventArg.type === "keypress") this.keyCode = (keyboardEventArg.charCode !== 0) ? keyboardEventArg.charCode : keyboardEventArg.keyCode;
            else this.keyCode = keyboardEventArg.keyCode;
            this.meta = keyboardEventArg.metaKey;
            if ($j.browser.ff && (keyboardEventArg.type === "keypress")) {
                this.keyCode = keyboardEventArg.charCode !== 0 && this.keyCodeTable[keyboardEventArg.charCode] ? this.keyCodeTable[keyboardEventArg.charCode] : keyboardEventArg.keyCode;
                this.keyChar = keyboardEventArg.charCode !== 0 ? String.fromCharCode(keyboardEventArg.charCode) : String.EMPTY;
            } else {
                keyCode = keyboardEventArg.which || keyboardEventArg.keyCode;
                if (keyCode === $j.types.VKeysCodes.VK_SHIFT || keyCode === $j.types.VKeysCodes.VK_CONTROL || keyCode === $j.types.VKeysCodes.VK_ALT) this.keyChar = "";
                else this.keyChar = String.fromCharCode(keyCode);
            }
            if (!this.shift) this.keyChar = this.keyChar.toLowerCase();
            if (!$j.isKeyDown) this.keyEvent = $j.types.keybordEvents.NONE;
            else this.keyEvent = $j.types.keybordEvents.DOWN;
            if (typeof $j.onGetMouseInfos === _const.FUNCTION) $j.onGetMouseInfos();
        },
        stopEvent: function () {
            this.event.cancelBubble = true;
            this.event.stopPropagation();
            this.event.preventDefault();
            this.ctrl = false;
            this.alt = false;
            this.shift = false;
            this.keyCode = $j.types.VKeysCodes.NONE;
            this.keyEvent = $j.types.keybordEvents.NONE;
            this.keyChar = String.EMPTY;
        }
        //#endregion
    });
    //#endregion
    //#region Touch
    //function Touch(){
    //  this.target=$j.classes.Point.create();
    //  this.screen=$j.classes.Point.create();
    //  this.document=$j.classes.Point.create();
    //}
    //p=Touch.prototype;
    //p.getTouchInfos=function(touchEventArg){
    //  //$j.stopEvent(touchEventArg);
    //  if (touchEventArg.touches!==undefined && touchEventArg.touches.length===1){// Only deal with one finger
    //    var touch=touchEventArg.touches[0];
    //    // Get the information for finger #1
    //    this.screen.setValues(touch.screenX,touch.screenY);
    //    this.window.setValues(touch.clientX,touch.clientY);
    //    this.document.setValues(touch.pageX,touch.pageY);
    //    this.target.setValues(touch.layerX?touch.layerX:touch.offsetX,touch.layerY?touch.layerY:touch.offsetY);
    //  }
    //}
    //Object.seal(Touch);
    //#endregion
    $j.mouse = new Mouse;
    $j.keyboard = new Keyboard;
})();