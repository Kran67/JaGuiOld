(function () {
    //#region MaskedTextBox
    var MaskedTextBox = $j.classes.CustomTextControl.extend("MaskedTextBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._tests = [];
                this._firstNonMaskPos = null;
                this._partialPosition = 0;
                this._buffer = [];
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 121;
                    this.height = 21;
                }
                this.mask = String.EMPTY;
                this.maskDefinitions = { '9': "[0-9]", 'a': "[A-Za-z]", '*': "[A-Za-z0-9]" };
                this.blankSpace = String.SPACE;
            }
        },
        //#region Setters
        setMask: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.mask !== newValue) {
                this.mask = newValue;
                this.makeMask();
            }
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            this.makeMask();
        },
        makeMask: function () {
            if (this.readOnly) return;
            var len = this.mask.length, maskArray = this.mask.split(String.EMPTY);
            this.unMask();
            this._partialPosition = this.mask.length;
            for (var i = 0, l = maskArray.length; i < l; i++) {
                if (maskArray[i] === '?') {
                    len--;
                    this._partialPosition = i;
                } else if (this.maskDefinitions[maskArray[i]]) {
                    this._tests.push(new RegExp(this.maskDefinitions[maskArray[i]]));
                    if (!this._firstNonMaskPos) this._firstNonMaskPos = this._tests.length - 1;
                } else {
                    this._tests.push(null);
                }
                if (maskArray[i] !== '?') this._buffer[i] = this.maskDefinitions[maskArray[i]] ? this.blankSpace : maskArray[i];
            }
            this.checkVal();
        },
        unMask: function () {
            this._firstNonMaskPos = null;
            this._tests.clear();
            this._firstNonMaskPos = null;
            this._partialPosition = 0;
            this._buffer.clear();
        },
        caret: function (begin, end) {
            var range;
            if (this.length === 0) return;
            if (typeof begin === _const.NUMBER) {
                end = (typeof end === _const.NUMBER) ? end : begin;
                if (this._inputObj.setSelectionRange) {
                    this._inputObj.setSelectionRange(begin, end);
                } else if (this._inputObj.createTextRange) {
                    range = this._inputObj.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', end);
                    range.moveStart('character', begin);
                    range.select();
                }
            } else {
                if (this._inputObj.setSelectionRange) {
                    begin = this._inputObj.selectionStart;
                    end = this._inputObj.selectionEnd;
                } else if ($j.doc.selection && $j.doc.selection.createRange) {
                    range = document.selection.createRange();
                    begin = 0 - range.duplicate().moveStart('character', -100000);
                    end = begin + range.text.length;
                }
                return { begin: begin, end: end };
            }
        },
        seekNext: function (pos) {
            while (++pos <= this.mask.length && !this._tests[pos]);
            return pos;
        },
        seekPrev: function (pos) {
            while (--pos >= 0 && !this._tests[pos]);
            return pos;
        },
        shiftL: function (begin, end) {
            if (begin < 0) return;
            for (var i = begin, j = this.seekNext(end) ; i < this.mask.length; i++) {
                if (this._tests[i]) {
                    if (j < this.mask.length && this._tests[i].test(this._buffer[j])) {
                        this._buffer[i] = this._buffer[j];
                        this._buffer[j] = this.blankSpace;
                    } else break;
                    j = this.seekNext(j);
                }
            }
            this.writeBuffer();
            this.caret($j.max(this._firstNonMaskPos, begin));
        },
        shiftR: function (pos) {
            for (var i = pos, c = this.blankSpace; i < this.mask.length; i++) {
                if (this._tests[i]) {
                    var j = this.seekNext(i);
                    var t = this._buffer[i];
                    this._buffer[i] = c;
                    if (j < this.mask.length && this._tests[j].test(t)) c = t;
                    else break;
                }
            }
        },
        keyDown: function () {
            this._inherited();
            var k = $j.keyboard.keyCode, pos, begin, end;
            //backspace, delete, and escape get special treatment
            if (k === $j.types.VKeysCodes.VK_BACKSPACE || k === $j.types.VKeysCodes.VK_DELETE || ($j.browser.iphone && k === $j.types.VKeysCodes.VK_ESCAPE)) {
                pos = this.caret();
                begin = pos.begin,
                    end = pos.end;

                if (end - begin === 0) {
                    begin = k !== $j.types.VKeysCodes.VK_DELETE ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                    end = k === $j.types.VKeysCodes.VK_DELETE ? this.seekNext(end) : end;
                }
                this.clearBuffer(begin, end);
                this.shiftL(begin, end - 1);

                $j.keyboard.event.preventDefault();
            } else if (k === $j.types.VKeysCodes.VK_ESCAPE) {//escape
                this.caret(0, this.checkVal());
                $j.keyboard.event.preventDefault();
            }
        },
        keyPress: function () {
            this._inherited();
            var k = $j.keyboard.keyCode, pos = this.caret();
            if ($j.keyboard.ctrl || $j.keyboard.alt || $j.keyboard.meta || $j.keyboard.event.which < $j.types.VKeysCodes.VK_SPACE) {//Ignore
                return true;
            } else if (k) {
                if (pos.end - pos.begin != 0) {
                    this.clearBuffer(pos.begin, pos.end);
                    this.shiftL(pos.begin, pos.end - 1);
                }

                var p = this.seekNext(pos.begin - 1);
                if (p < this.mask.length) {
                    var c = $j.keyboard.keyChar;
                    if (this._tests[p].test(c)) {
                        this.shiftR(p);
                        this._buffer[p] = c;
                        this.writeBuffer();
                        var next = this.seekNext(p);
                        this.caret(next);
                    }
                }
                $j.keyboard.event.preventDefault();
            }
        },
        clearBuffer: function (start, end) {
            for (var i = start; i < end && i < this.mask.length; i++) {
                if (this._tests[i]) this._buffer[i] = this.blankSpace;
            }
        },
        writeBuffer: function () {
            if (this._inputObj) this._inputObj.value = this.text = this._buffer.join(String.EMPTY);
        },
        checkVal: function (allow) {
            //try to place characters where they belong
            var test = this.text, lastMatch = -1;
            for (var i = 0, pos = 0; i < this.mask.length; i++) {
                if (this._tests[i]) {
                    this._buffer[i] = this.blankSpace;
                    while (pos++ < test.length) {
                        var c = test.charAt(pos - 1);
                        if (this._tests[i].test(c)) {
                            this._buffer[i] = c;
                            lastMatch = i;
                            break;
                        }
                    }
                    if (pos > test.length) break;
                } else if (this._buffer[i] === test.charAt(pos) && i != this._partialPosition) {
                    pos++;
                    lastMatch = i;
                }
            }
            if (!allow && lastMatch + 1 < this._partialPosition) {
                this._inputObj.value = this.text = String.EMPTY;
                this.clearBuffer(0, this.mask.length);
            } else if (allow || lastMatch + 1 >= this._partialPosition) {
                this.writeBuffer();
                if (this._inputObj) {
                    if (!allow) this._inputObj.value = this.text = this.text.substring(0, lastMatch + 1);
                }
            }
            return (this._partialPosition ? i : this._firstNonMaskPos);
        },
        HTMLFocus: function (event) {
            var focusText = this.jsObj.text;
            var pos = this.jsObj.checkVal();
            this.jsObj.writeBuffer();
            if (pos === this.jsObj.mask.length) this.jsObj.caret(0, pos);
            else this.jsObj.caret(pos);
            this.jsObj.enterFocus();
        },
        HTMLBlur: function (event) {
            this.jsObj.checkVal();
            this.jsObj.killFocus();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.mask;
            if (data) this.setMask(data);
            data = this._HTMLElement.dataset.blankspace;
            if (data) this.blankSpace = data;
        },
        destroy: function () {
            this._inherited();
            this._tests.destroy();
            this._tests = null;
            this._firstNonMaskPos = null;
            this._partialPosition = null;
            this._buffer.destroy();
            this._buffer = null;
            this.mask = null;
            this.maskDefinitions = null;
            this.blankSpace = null;
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.EXTENDED, MaskedTextBox);
    $j.classes.registerTemplates([{ Class: MaskedTextBox, template: $j.templates["TextBox"] }]);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var MaskedTextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='MaskedTextBox' class='Control TextBox MaskedTextBox {theme}' style='width:185px;height:21px;'>\
                          <input type='text' class='Control csr_text MaskedTextBoxInput carbon' />\
                          </div>";
        $j.classes.registerTemplates([{ Class: MaskedTextBox, template: MaskedTextBoxTpl }]);
    }
    //#endregion
})();