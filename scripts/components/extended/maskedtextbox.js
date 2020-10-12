//#region Import
import { CustomTextControl } from '/scripts/core/customtextcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class MaskedTextBox
class MaskedTextBox extends CustomTextControl {
    //#region Private fields
    #tests = [];
    #firstNonMaskPos = null;
    #partialPosition = 0;
    #buffer = [];
    #mask;
    #maskDefinitions = { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' };
    #blankSpace;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            if (!core.isHTMLRenderer) {
                !props.hasOwnProperty('width') && core.tools.isNumber(props.width) && (props.width = 75);
                !props.hasOwnProperty('height') && core.tools.isNumber(props.height) && (props.height = 25);
            }
            if (!core.isHTMLRenderer) {
                props.width = 121;
                props.height = 21;
            }
            super(owner, props);
            this.#mask = props.hasOwnProperty('mask') ? props.mask : String.EMPTY;
            this.#blankSpace = props.hasOwnProperty('blankSpace') ? props.blankSpace : String.SPACE;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region mask
    get mask() {
        return this.#mask;
    }
    set mask(newValue) {
        if (core.tools.isString(newValue) && this.#mask !== newValue) {
            this.#mask = newValue;
            this.makeMask();
        }
    }
    //#endregion mask
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.makeMask();
    }
    //#endregion loaded
    //#region makeMask
    makeMask() {
        //#region Variables déclaration
        const maskArray = this.#mask.split(String.EMPTY);
        //#endregion Variables déclaration
        if (!this.readOnly) {
            //let len = this.#mask.length;
            this.unMask();
            this.#partialPosition = this.#mask.length;
            for (let i = 0, l = maskArray.length; i < l; i++) {
                if (maskArray[i] === '?') {
                    this.#partialPosition = i;
                } else if (this.#maskDefinitions[maskArray[i]]) {
                    this.#tests.push(new RegExp(this.#maskDefinitions[maskArray[i]]));
                    !this.#firstNonMaskPos && (this.#firstNonMaskPos = this.#tests.length - 1);
                } else {
                    this.#tests.push(null);
                }
                maskArray[i] !== '?' && (this.#buffer[i] = this.#maskDefinitions[maskArray[i]] ? this.#blankSpace : maskArray[i]);
            }
            this.checkVal();
            this.placeHolder = this.#mask;
        }
    }
    //#endregion makeMask
    //#region unMask
    unMask() {
        this.#firstNonMaskPos = null;
        this.#tests.clear();
        this.#firstNonMaskPos = null;
        this.#partialPosition = 0;
        this.#buffer.clear();
    }
    //#endregion unMask
    //#region caret
    caret(begin, end) {
        //#region Variables déclaration
        const inputObj = this.inputObj;
        let range;
        //#endregion Variables déclaration
        if (core.tools.isNumber(begin)) {
            end = core.tools.isNumber(end) ? end : begin;
            if (inputObj.setSelectionRange) {
                inputObj.setSelectionRange(begin, end);
            } else if (inputObj.createTextRange) {
                range = inputObj.createTextRange();
                range.collapse(!0);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        } else {
            if (inputObj.setSelectionRange) {
                begin = inputObj.selectionStart;
                end = inputObj.selectionEnd;
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin, end };
        }
    }
    //#endregion caret
    //#region seekNext
    seekNext(pos) {
        while (++pos <= this.#mask.length && !this.#tests[pos]);
        return pos;
    }
    //#endregion seekNext
    //#region seekPrev
    seekPrev(pos) {
        while (--pos >= 0 && !this.#tests[pos]);
        return pos;
    }
    //#endregion seekPrev
    //#region shiftL
    shiftL(begin, end) {
        if (begin >= 0) {
            for (let i = begin, j = this.seekNext(end); i < this.#mask.length; i++) {
                if (this.#tests[i]) {
                    if (j < this.#mask.length && this.#tests[i].test(this.#buffer[j])) {
                        this.#buffer[i] = this.#buffer[j];
                        this.#buffer[j] = this.#blankSpace;
                    } else {
                        break;
                    }
                    j = this.seekNext(j);
                }
            }
            this.writeBuffer();
            this.caret(Math.max(this.#firstNonMaskPos, begin));
        }
    }
    //#endregion shiftL
    //#region shiftR
    shiftR(pos) {
        for (let i = pos, c = this.#blankSpace; i < this.#mask.length; i++) {
            if (this.#tests[i]) {
                const j = this.seekNext(i);
                const t = this.#buffer[i];
                this.#buffer[i] = c;
                if (j < this.#mask.length && this.#tests[j].test(t)) {
                    c = t;
                }
                else {
                    break;
                }
            }
        }
    }
    //#endregion shiftR
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const k = core.keyboard.key;
        const VKeysCodes = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyDown();
        //backspace, delete, and escape get special treatment
        if (k === VKeysCodes.VK_BACKSPACE || k === VKeysCodes.VK_DELETE || (core.browser.iphone && k === VKeysCodes.VK_ESCAPE)) {
            const pos = this.caret();
            let begin = pos.begin;
            let end = pos.end;

            if (end - begin === 0) {
                begin = k !== VKeysCodes.VK_DELETE ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === VKeysCodes.VK_DELETE ? this.seekNext(end) : end;
            }
            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);

            core.keyboard.event.preventDefault();
        } else if (k === VKeysCodes.VK_ESCAPE) {//escape
            this.caret(0, this.checkVal());
            core.keyboard.event.preventDefault();
        }
    }
    //#endregion keyDown
    //#region keyPress
    keyPress() {
        //#region Variables déclaration
        const k = core.keyboard.key;
        const pos = this.caret();
        const VKEYSCODES = Keyboard.VKEYSCODES;
        const EXCLUDED_KEYS = [VKEYSCODES.VK_NONE, VKEYSCODES.VK_BACKSPACE, VKEYSCODES.VK_TAB, VKEYSCODES.VK_SHIFT, VKEYSCODES.VK_CONTROL, 
            VKEYSCODES.VK_ALT, VKEYSCODES.VK_ALTGR, VKEYSCODES.VK_META, VKEYSCODES.VK_PAUSE, VKEYSCODES.VK_CAPSLOCK, VKEYSCODES.VK_ESCAPE];
        //#endregion Variables déclaration
        super.keyPress();
        if (!core.keyboard.ctrl && !core.keyboard.alt && !core.keyboard.meta &&
            EXCLUDED_KEYS.indexOf(core.keyboard.event.key) === -1 && k) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }
            const p = this.seekNext(pos.begin - 1);
            if (p < this.#mask.length) {
                const c = core.keyboard.key
                if (this.#tests[p].test(c)) {
                    this.shiftR(p);
                    this.#buffer[p] = c;
                    this.writeBuffer();
                    this.caret(this.seekNext(p));
                }
            }
            core.keyboard.event.preventDefault();
        }
    }
    //#endregion keyPress
    //#region clearBuffer
    clearBuffer(start, end) {
        for (let i = start; i < end && i < this.#mask.length; i++) {
            this.#tests[i] && (this.#buffer[i] = this.#blankSpace);
        }
    }
    //#endregion clearBuffer
    //#region writeBuffer
    writeBuffer() {
        this.inputObj && (this.inputObj.value = this.text = this.#buffer.join(String.EMPTY));
    }
    //#endregion writeBuffer
    //#region checkVal
    checkVal(allow) {
        //#region Variables déclaration
        //try to place characters where they belong
        const test = this.text;
        let lastMatch = -1;
        const mask = this.#mask;
        let i = 0;
        //#endregion Variables déclaration
        for (let pos = 0; i < mask.length; i++) {
            if (this.#tests[i]) {
                this.#buffer[i] = this.#blankSpace;
                while (pos++ < test.length) {
                    const c = test.charAt(pos - 1);
                    if (this.#tests[i].test(c)) {
                        this.#buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    break;
                }
            } else if (this.#buffer[i] === test.charAt(pos) && i !== this.#partialPosition) {
                pos++;
                lastMatch = i;
            }
        }
        if (!allow && lastMatch + 1 < this.#partialPosition) {
            this.inputObj.value = this.text = String.EMPTY;
            this.clearBuffer(0, mask.length);
        } else if (allow || lastMatch + 1 >= this.#partialPosition) {
            this.writeBuffer();
            this.inputObj && !allow && (this.inputObj.value = this.text = this.text.substring(0, lastMatch + 1));
        }
        return (this.#partialPosition ? i : this.#firstNonMaskPos);
    }
    //#endregion checkVal
    //#region HTMLFocus
    HTMLFocus() {
        //#region Variables déclaration
        const pos = this.jsObj.checkVal();
        //#endregion Variables déclaration
        this.jsObj.writeBuffer();
        pos === this.jsObj.mask.length
            ? this.jsObj.caret(0, pos)
            : this.jsObj.caret(pos);
        this.jsObj.enterFocus();
    }
    //#endregion HTMLFocus
    //#region HTMLBlur
    HTMLBlur() {
        this.jsObj.checkVal();
        this.jsObj.killFocus();
    }
    //#endregion HTMLBlur
    //#region destroy
    destroy() {
        this.#tests.destroy();
        this.#buffer.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(MaskedTextBox.prototype, {
    'mask': {
        enumerable: !0
    },
    'blankSpace': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.EXTENDED, MaskedTextBox);
//#endregion MaskedTextBox
//#region Template
if (core.isHTMLRenderer) {
    const MaskedTextBoxTpl = ['<jaguimaskedtextbox id="{internalId}" data-class="MaskedTextBox" class="Control TextBox MaskedTextBox {theme}">',
        '<properties>{ "name": "{name}", "width": 80, "height": 20 }</properties></jaguimaskedtextbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: MaskedTextBox, template: MaskedTextBoxTpl }]);
}
//#endregion
export { MaskedTextBox };