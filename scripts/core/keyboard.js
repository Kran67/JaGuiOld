//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region VKeysCodes
/**
 * @type    {Object}
 */
const VKEYSCODES = Object.freeze(Object.seal({
    VK_NONE: String.EMPTY,
    VK_BACKSPACE: 'Backspace',
    VK_TAB: 'Tab',
    VK_ENTER: 'Enter',
    VK_SHIFT: 'Shift',
    VK_CONTROL: 'Control',
    VK_ALT: 'Alt',
    VK_ALTGR: 'AltGraph',
    VK_META: 'Meta',
    VK_PAUSE: 'Pause',
    VK_CAPSLOCK: 'CapsLock',
    VK_ESCAPE: 'Escape',
    VK_SPACE: ' ',
    VK_PAGEUP: 'PageUp',
    VK_PAGEDOWN: 'PageDown',
    VK_END: 'End',
    VK_HOME: 'Home',
    VK_LEFT: 'ArrowLeft',
    VK_UP: 'ArrowUp',
    VK_RIGHT: 'ArrowRight',
    VK_DOWN: 'ArrowDown',
    VK_PRINTSCREEN: 'PrintScreen',
    VK_INSERT: 'Insert',
    VK_DELETE: 'Delete',
    VK_0: '0',
    VK_1: '1',
    VK_2: '2',
    VK_3: '3',
    VK_4: '4',
    VK_5: '5',
    VK_6: '6',
    VK_7: '7',
    VK_8: '8',
    VK_9: '9',
    VK_AT: '@',
    VK_A: 'A',
    VK_B: 'B',
    VK_C: 'C',
    VK_D: 'D',
    VK_E: 'E',
    VK_F: 'F',
    VK_G: 'G',
    VK_H: 'H',
    VK_I: 'I',
    VK_J: 'J',
    VK_K: 'K',
    VK_L: 'L',
    VK_M: 'M',
    VK_N: 'N',
    VK_O: 'O',
    VK_P: 'P',
    VK_Q: 'Q',
    VK_R: 'R',
    VK_S: 'S',
    VK_T: 'T',
    VK_U: 'U',
    VK_V: 'V',
    VK_W: 'W',
    VK_X: 'X',
    VK_Y: 'Y',
    VK_Z: 'Z',
    VK_CONTEXTMENU: 'ContextMenu',
    VK_NUMPADENTER: 'NumpadEnter',
    VK_NUMPAD0: 0,
    VK_NUMPAD1: 1,
    VK_NUMPAD2: 2,
    VK_NUMPAD3: 3,
    VK_NUMPAD4: 4,
    VK_NUMPAD5: 5,
    VK_NUMPAD6: 6,
    VK_NUMPAD7: 7,
    VK_NUMPAD8: 8,
    VK_NUMPAD9: 9,
    VK_MUTLIPLY: '*',
    VK_ADD: '+',
    VK_SUBTRACT: '-',
    VK_POINT: '.',
    VK_DIVIDE: '/',
    VK_F1: 'F1',
    VK_F2: 'F2',
    VK_F3: 'F3',
    VK_F4: 'F4',
    VK_F5: 'F5',
    VK_F6: 'F6',
    VK_F7: 'F7',
    VK_F8: 'F8',
    VK_F9: 'F9',
    VK_F10: 'F10',
    VK_F11: 'F11',
    VK_F12: 'F12',
    VK_NUMLOCK: 'NumLock',
    VK_SCROLLLOCK: 'ScrollLock',
    VK_DEAD: 'Dead'
}));
const KEYBORDEVENTS = Object.freeze(Object.seal({
    NONE: 'none',
    UP: 'keyup',
    DOWN: 'keydown',
    PRESS: 'keypress'
}));
//#endregion
//#region Keyboard
class Keyboard {
    //#region constructor
    constructor() {
        this.ctrl = !1;
        this.alt = !1;
        this.shift = !1;
        this.meta = !1;
        this.key = Keyboard.VKEYSCODES.NONE;
        this.keyEvent = Keyboard.KEYBORDEVENTS.NONE;
        this.keyChar = String.EMPTY;
        this.keyTable = [];
        this.event = null;
        //if (core.browser.ff) {
        //    const c = {
        //        32: ' ', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 59: ';',
        //        61: '=', 65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k',
        //        76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w',
        //        88: 'x', 89: 'y', 90: 'z', 107: '+', 109: '-', 110: '.', 188: ',', 190: '.', 191: '/', 192: '`', 219: '[',
        //        220: '\\', 221: ']', 222: '"'
        //    };
        //    // à modifier avec getOwnPropertyNames
        //    const keyTable = this.keyTable;
        //    for (let b in c) {
        //        if (c.hasOwnProperty(b)) {
        //            const d = c[b];
        //            keyTable[d.charCodeAt(0)] = int(b);
        //            d.toUpperCase() !== d && (keyTable[d.toUpperCase().charCodeAt(0)] = int(b));
        //        }
        //    }
        //}
    }
    //#endregion constructor
    //#region Static
    //#region VKEYSCODES
    static get VKEYSCODES() {
        return VKEYSCODES;
    }
    //#endregion VKEYSCODES
    //#region KEYBORDEVENTS
    static KEYBORDEVENTS() {
        return KEYBORDEVENTS;
    }
    //#endregion KEYBORDEVENTS
    //#endregion Static
    //#region Getter / Setter
    //#region isNavigationKey
    get isNavigationKey() {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        return [
            VKEYSCODES.VK_BACKSPACE,
            VKEYSCODES.VK_PAGEUP,
            VKEYSCODES.VK_PAGEDONW,
            VKEYSCODES.VK_END,
            VKEYSCODES.VK_HOME,
            VKEYSCODES.VK_LEFT,
            VKEYSCODES.VK_UP,
            VKEYSCODES.VK_RIGHT,
            VKEYSCODES.VK_DOWN,
            VKEYSCODES.VK_INSERT,
            VKEYSCODES.VK_DELETE,
            VKEYSCODES.VK_CONTEXTMENU,
            VKEYSCODES.VK_ENTER
        ].indexOf(this.key) > -1;
    }
    //#endregion isNavigationKey
    //#endregion Getter / Setter
    //#region Methods
    //#region getKeyboardInfos
    getKeyboardInfos(keyboardEventArg) {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        const KEYBORDEVENTS = Keyboard.KEYBORDEVENTS;
        //#endregion Variables déclaration
        console.log(keyboardEventArg.key);
        this.event = keyboardEventArg;
        this.ctrl = keyboardEventArg.ctrlKey;
        this.alt = keyboardEventArg.altKey;
        this.shift = keyboardEventArg.shiftKey;
        this.key = keyboardEventArg.key;//keyboardEventArg.type === 'keypress'
        //    ? (keyboardEventArg.charCode !== 0) ? keyboardEventArg.charCode : keyboardEventArg.key
        //    : keyboardEventArg.key;
        this.meta = keyboardEventArg.metaKey;
        //if (core.browser.ff && (keyboardEventArg.type === 'keypress')) {
        //    this.key = keyboardEventArg.charCode !== 0 && this.keyTable[keyboardEventArg.charCode] ? this.keyTable[keyboardEventArg.charCode] : //keyboardEventArg.key;
        //    this.keyChar = keyboardEventArg.charCode !== 0 ? String.fromCharCode(keyboardEventArg.charCode) : String.EMPTY;
        //} else {
        //    const key = keyboardEventArg.which || keyboardEventArg.key;
        //    this.keyChar = key === VKEYSCODES.VK_SHIFT || key === VKEYSCODES.VK_CONTROL || key === VKEYSCODES.VK_ALT
        //        ? String.EMPTY : String.fromCharCode(key);
        //}
        !this.shift && (this.keyChar = this.keyChar.toLowerCase());
        this.keyEvent = !core.isKeyDown ? KEYBORDEVENTS.NONE : KEYBORDEVENTS.DOWN;
        core.tools.isFunc(core.onGetMouseInfos) && core.onGetMouseInfos();
    }
    //#endregion getKeyboardInfos
    //#region stopEvent
    stopEvent() {
        this.event.cancelBubble = !0;
        this.event.stopPropagation();
        this.event.preventDefault();
        this.ctrl = !1;
        this.alt = !1;
        this.shift = !1;
        this.key = Keyboard.VKEYSCODES.NONE;
        this.keyEvent = Keyboard.KEYBORDEVENTS.NONE;
        this.keyChar = String.EMPTY;
    }
    //#endregion stopEvent
    //#endregion
}
core.keyboard = new Keyboard;
//#endregion Keyboard
export { Keyboard };