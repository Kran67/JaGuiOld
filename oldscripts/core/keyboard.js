﻿define(["core", "types"], function (Core, Types) {
    //#region VKeysCodes
    const VKEYSCODES = {
        VK_NONE : 0x00,
        VK_LBUTTON : 0x01, //Left mouse button
        VK_RBUTTON : 0x02, //Right mouse button
        VK_CANCEL : 0x03, //Control-break processing
        VK_MBUTTON : 0x04, //Middle mouse button (three-button mouse)
        VK_BACKSPACE : 0x08, //BACKSPACE key
        VK_TAB : 0x09, //TAB key
        VK_CLEAR : 0x0C, //CLEAR key
        VK_RETURN : 0x0D, //ENTER key
        VK_SHIFT : 0x10, //SHIFT key
        VK_CONTROL : 0x11, //CTRL key
        VK_ALT : 0x12, //ALT key
        VK_PAUSE : 0x13, //PAUSE key
        VK_CAPITAL : 0x14, //CAPS LOCK key
        VK_ESCAPE : 0x1B, //ESC key
        VK_SPACE : 0x20, //SPACEBAR
        VK_PRIOR : 0x21, //PAGE UP key
        VK_NEXT : 0x22, //PAGE DOWN key
        VK_END : 0x23, //END key
        VK_HOME : 0x24, //HOME key
        VK_LEFT : 0x25, //LEFT ARROW key
        VK_UP : 0x26, //UP ARROW key
        VK_RIGHT : 0x27, //RIGHT ARROW key
        VK_DOWN : 0x28, //DOWN ARROW key
        VK_SELECT : 0x29, //SELECT key
        VK_PRINT : 0x2A, //PRINT key
        VK_EXECUTE : 0x2B, //EXECUTE key
        VK_SNAPSHOT : 0x2C, //PRINT SCREEN key
        VK_INSERT : 0x2D, //INS key
        VK_DELETE : 0x2E, //DEL key
        VK_HELP : 0x2F, //HELP key
        VK_0 : 0x30, //0 key
        VK_1 : 0x31, //1 key
        VK_2 : 0x32, //2 key
        VK_3 : 0x33, //3 key
        VK_4 : 0x34, //4 key
        VK_5 : 0x35, //5 key
        VK_6 : 0x36, //6 key
        VK_7 : 0x37, //7 key
        VK_8 : 0x38, //8 key
        VK_9 : 0x39, //9 key
        VK_TWOPOINT : 0x3A, //: key
        VK_SEMICOLON : 0x3B, //; key
        VK_LESS_THAN : 0x3C, //< key
        VK_EQUAL : 0x3D, //: key
        VK_GREATER_THAN : 0x3E, //> key
        VK_QUESTION_MARK : 0x3F, //? key
        VK_AT : 0x40, //@ key
        VK_A : 0x41, //A key
        VK_B : 0x42, //B key
        VK_C : 0x43, //C key
        VK_D : 0x44, //D key
        VK_E : 0x45, //E key
        VK_F : 0x46, //F key
        VK_G : 0x47, //G key
        VK_H : 0x48, //H key
        VK_I : 0x49, //I key
        VK_J : 0x4A, //J key
        VK_K : 0x4B, //K key
        VK_L : 0x4C, //L key
        VK_M : 0x4D, //M key
        VK_N : 0x4E, //N key
        VK_O : 0x4F, //O key
        VK_P : 0x50, //P key
        VK_Q : 0x51, //Q key
        VK_R : 0x52, //R key
        VK_S : 0x53, //S key
        VK_T : 0x54, //T key
        VK_U : 0x55, //U key
        VK_V : 0x56, //V key
        VK_W : 0x57, //W key
        VK_X : 0x58, //X key
        VK_Y : 0x59, //Y key
        VK_Z : 0x5A, //Z key
        VK_LAPP : 0x5B, //Left App key
        VK_RAPP : 0x5C, //Right App key
        VK_MENU : 0x5D, //Menu key
        //Object.defineProperty($j.types.VKeysCodes.VK_APP:0x5E;
        //Object.defineProperty($j.types.VKeysCodes.VK_APP:0x5F;
        VK_NUMPAD0 : 0x60, //Numeric keypad 0 key
        VK_NUMPAD1 : 0x61, //Numeric keypad 1 key
        VK_NUMPAD2 : 0x62, //Numeric keypad 2 key
        VK_NUMPAD3 : 0x63, //Numeric keypad 3 key
        VK_NUMPAD4 : 0x64, //Numeric keypad 4 key
        VK_NUMPAD5 : 0x65, //Numeric keypad 5 key
        VK_NUMPAD6 : 0x66, //Numeric keypad 6 key
        VK_NUMPAD7 : 0x67, //Numeric keypad 7 key
        VK_NUMPAD8 : 0x68, //Numeric keypad 8 key
        VK_NUMPAD9 : 0x69, //Numeric keypad 9 key
        VK_MUTLIPLY : 0x6A, //Numeric keypad * key
        VK_ADD : 0x6B, //Numeric keypad + key
        VK_SEPARATOR : 0x6C, //Separator key
        VK_SUBTRACT : 0x6D, //Subtract key
        VK_DECIMAL : 0x6E, //Decimal key
        VK_DIVIDE : 0x6F, //Divide key
        VK_F1 : 0x70, //F1 key
        VK_F2 : 0x71, //F2 key
        VK_F3 : 0x72, //F3 key
        VK_F4 : 0x73, //F4 key
        VK_F5 : 0x74, //F5 key
        VK_F6 : 0x75, //F6 key
        VK_F7 : 0x76, //F7 key
        VK_F8 : 0x77, //F8 key
        VK_F9 : 0x78, //F9 key
        VK_F10 : 0x79, //F10 key
        VK_F11 : 0x7A, //F11 key
        VK_F12 : 0x7B, //F12 key
        VK_NUMLOCK : 0x90, //NUM LOCK key
        VK_SCROLL : 0x91, //SCROLL LOCK key
        VK_CARET : 0xA0, //^ key
        //Object.defineProperty($j.types.VKeysCodes.VK_RSHIFT:0xA1, //Right SHIFT key
        //Object.defineProperty($j.types.VKeysCodes.VK_LCONTROL:0xA2, //Left CONTROL key
        //Object.defineProperty($j.types.VKeysCodes.VK_RCONTROL:0xA3, //Right CONTROL key
        VK_DOLLAR : 0xA4, //$ key
        VK_UACCENT : 0xA5, //ù key
        VK_ASTERIX : 0xAA, //* key
        VK_COLON : 0xBC, //, key
        VK_OEM_MINUS : 0xBD, //MINUS
        VK_POINT : 0xBE, //. key
        VK_SLASH : 0xBF, /// key
        VK_192 : 0xC0, //` key
        VK_OPENBRACKET : 0xDB, //[ key
        VK_BACKSLASH : 0xDC, //\ key
        VK_CLOSEBRACKET : 0xDD, //] key
        //Object.defineProperty($j.types.VKeysCodes.addProperty("VK_CLOSEBRACKET",null,null,true,false,false,0xDE), //] key
        VK_ZOOM : 0xFB //Zoom key
    }
    Object.freeze(VKEYSCODES);
    Types.VKEYSCODES = VKEYSCODES;
    //#endregion
    //#region Keyboard
    var Keyboard = Core.Class.extend("Keyboard", {
        init: function () {
            this.ctrl = false;
            this.alt = false;
            this.shift = false;
            this.meta = false;
            this.keyCode = Types.VKEYSCODES.NONE;
            this.keyEvent = Types.KEYBORDEVENTS.NONE;
            this.keyChar = String.EMPTY;
            this.keyCodeTable = [];
            this.event = null;
            this.isNavigationKey = function () {
                return [Types.VKEYSCODES.VK_BACKSPACE,
                    Types.VKEYSCODES.VK_PRIOR,
                    Types.VKEYSCODES.VK_NEXT,
                    Types.VKEYSCODES.VK_END,
                    Types.VKEYSCODES.VK_HOME,
                    Types.VKEYSCODES.VK_LEFT,
                    Types.VKEYSCODES.VK_UP,
                    Types.VKEYSCODES.VK_RIGHT,
                    Types.VKEYSCODES.VK_DOWN,
                    Types.VKEYSCODES.VK_INSERT,
                    Types.VKEYSCODES.VK_DELETE,
                    Types.VKEYSCODES.VK_LAPP,
                    Types.VKEYSCODES.VK_RAPP,
                    Types.VKEYSCODES.VK_MENU,
                    Types.VKEYSCODES.VK_RETURN
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
                if (keyCode === Types.VKEYSCODES.VK_SHIFT || keyCode === Types.VKEYSCODES.VK_CONTROL || keyCode === Types.VKEYSCODES.VK_ALT) this.keyChar = "";
                else this.keyChar = String.fromCharCode(keyCode);
            }
            if (!this.shift) this.keyChar = this.keyChar.toLowerCase();
            if (!$j.isKeyDown) this.keyEvent = Types.KEYBORDEVENTS.NONE;
            else this.keyEvent = Types.KEYBORDEVENTS.DOWN;
            if (typeof $j.onGetMouseInfos === _const.FUNCTION) $j.onGetMouseInfos();
        },
        stopEvent: function () {
            this.event.cancelBubble = true;
            this.event.stopPropagation();
            this.event.preventDefault();
            this.ctrl = false;
            this.alt = false;
            this.shift = false;
            this.keyCode = Types.VKEYSCODES.NONE;
            this.keyEvent = Types.KEYBORDEVENTS.NONE;
            this.keyChar = String.EMPTY;
        }
        //#endregion
    });
    //#endregion
    return Keyboard;
});