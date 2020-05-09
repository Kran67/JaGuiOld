//#region Import
import { CustomTextControl } from '/scripts/core/customtextcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region MaskedTextBox
const MaskedTextBox = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class MaskedTextBox
    class MaskedTextBox extends CustomTextControl {
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
                const priv = internal(this);
                priv.tests = [];
                priv.firstNonMaskPos = null;
                priv.partialPosition = 0;
                priv.buffer = [];
                priv.mask = props.hasOwnProperty('mask') ? props.mask : String.EMPTY;
                priv.maskDefinitions = { '9': '[0-9]', 'a': '[A-Za-z]', '*': '"[A-Za-z0-9]' };
                priv.blankSpace = props.hasOwnProperty('blankSpace') ? props.blankSpace : String.SPACE;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region mask
        get mask() {
            return internal(this).mask;
        }
        set mask(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && priv.mask !== newValue) {
                priv.mask = newValue;
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
            const priv = internal(this);
            const maskArray = priv.mask.split(String.EMPTY);
            //#endregion Variables déclaration
            if (!this.readOnly) {
                //let len = priv.mask.length;
                this.unMask();
                priv.partialPosition = priv.mask.length;
                for (let i = 0, l = maskArray.length; i < l; i++) {
                    if (maskArray[i] === '?') {
                        priv.partialPosition = i;
                    } else if (priv.maskDefinitions[maskArray[i]]) {
                        priv.tests.push(new RegExp(priv.maskDefinitions[maskArray[i]]));
                        !priv.firstNonMaskPos && (priv.firstNonMaskPos = priv.tests.length - 1);
                    } else {
                        priv.tests.push(null);
                    }
                    maskArray[i] !== '?' && (priv.buffer[i] = priv.maskDefinitions[maskArray[i]] ? priv.blankSpace : maskArray[i]);
                }
                this.checkVal();
                this.inputObj.placeholder = priv.mask;
            }
        }
        //#endregion makeMask
        //#region unMask
        unMask() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.firstNonMaskPos = null;
            priv.tests.clear();
            priv.firstNonMaskPos = null;
            priv.partialPosition = 0;
            priv.buffer.clear();
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            while (++pos <= priv.mask.length && !priv.tests[pos]);
            return pos;
        }
        //#endregion seekNext
        //#region seekPrev
        seekPrev(pos) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            while (--pos >= 0 && !priv.tests[pos]);
            return pos;
        }
        //#endregion seekPrev
        //#region shiftL
        shiftL(begin, end) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (begin >= 0) {
                for (let i = begin, j = this.seekNext(end); i < priv.mask.length; i++) {
                    if (priv.tests[i]) {
                        if (j < priv.mask.length && priv.tests[i].test(priv.buffer[j])) {
                            priv.buffer[i] = priv.buffer[j];
                            priv.buffer[j] = priv.blankSpace;
                        } else {
                            break;
                        }
                        j = this.seekNext(j);
                    }
                }
                this.writeBuffer();
                this.caret(Math.max(priv.firstNonMaskPos, begin));
            }
        }
        //#endregion shiftL
        //#region shiftR
        shiftR(pos) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            for (let i = pos, c = priv.blankSpace; i < priv.mask.length; i++) {
                if (priv.tests[i]) {
                    const j = this.seekNext(i);
                    const t = priv.buffer[i];
                    priv.buffer[i] = c;
                    if (j < priv.mask.length && priv.tests[j].test(t)) {
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
            const k = core.keyboard.keyCode;
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
            const priv = internal(this);
            const k = core.keyboard.keyCode;
            const pos = this.caret();
            //#endregion Variables déclaration
            super.keyPress();
            if (!core.keyboard.ctrl && !core.keyboard.alt && !core.keyboard.meta &&
                !core.keyboard.event.which < Keyboard.VKEYSCODES.VK_SPACE && k) {
                if (pos.end - pos.begin !== 0) {
                    this.clearBuffer(pos.begin, pos.end);
                    this.shiftL(pos.begin, pos.end - 1);
                }
                const p = this.seekNext(pos.begin - 1);
                if (p < priv.mask.length) {
                    const c = core.keyboard.keyChar;
                    if (priv.tests[p].test(c)) {
                        this.shiftR(p);
                        priv.buffer[p] = c;
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            for (let i = start; i < end && i < priv.mask.length; i++) {
                priv.tests[i] && (priv.buffer[i] = priv.blankSpace);
            }
        }
        //#endregion clearBuffer
        //#region writeBuffer
        writeBuffer() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.inputObj && (this.inputObj.value = this.text = priv.buffer.join(String.EMPTY));
        }
        //#endregion writeBuffer
        //#region checkVal
        checkVal(allow) {
            //#region Variables déclaration
            //try to place characters where they belong
            const priv = internal(this);
            const test = this.text;
            let lastMatch = -1;
            const mask = priv.mask;
            let i = 0;
            //#endregion Variables déclaration
            for (let pos = 0; i < mask.length; i++) {
                if (priv.tests[i]) {
                    priv.buffer[i] = priv.blankSpace;
                    while (pos++ < test.length) {
                        const c = test.charAt(pos - 1);
                        if (priv.tests[i].test(c)) {
                            priv.buffer[i] = c;
                            lastMatch = i;
                            break;
                        }
                    }
                    if (pos > test.length) {
                        break;
                    }
                } else if (priv.buffer[i] === test.charAt(pos) && i !== priv.partialPosition) {
                    pos++;
                    lastMatch = i;
                }
            }
            if (!allow && lastMatch + 1 < priv.partialPosition) {
                this.inputObj.value = this.text = String.EMPTY;
                this.clearBuffer(0, mask.length);
            } else if (allow || lastMatch + 1 >= priv.partialPosition) {
                this.writeBuffer();
                this.inputObj && !allow && (this.inputObj.value = this.text = this.text.substring(0, lastMatch + 1));
            }
            return (priv.partialPosition ? i : priv.firstNonMaskPos);
        }
        //#endregion checkVal
        //#region HTMLFocus
        HTMLFocus() {
            const pos = this.jsObj.checkVal();
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.tests.destroy();
            priv.tests = null;
            priv.firstNonMaskPos = null;
            priv.partialPosition = null;
            priv.buffer.destroy();
            priv.buffer = null;
            priv.mask = null;
            priv.maskDefinitions = null;
            priv.blankSpace = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return MaskedTextBox;
    //#endregion MaskedTextBox
})();
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