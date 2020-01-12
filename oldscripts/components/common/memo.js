(function () {
    //#region whiteSpaces
    $j.types.whiteSpaces = { INHERIT: "inherit", INITIAL: "initial", NORMAL: "normal", NOWRAP: "nowrap", PRE: "pre", PRELINE: "pre-line", PREWRAP: "pre-wrap" };
    //#endregion
    //#region wordBreaks
    $j.types.wordBreaks = { BREAKALL: "break-all", BREAKWORD: "break-word", INITIAL: "initial", NORMAL: "normal", INHERIT: "inherit" };
    //#endregion
    //#region wordBreaks
    $j.types.wordWraps = { BREAKWORD: "break-word", INITIAL: "initial", NORMAL: "normal", INHERIT: "inherit" };
    //#endregion
    //#region Memo
    var Memo = $j.classes.CustomTextControl.extend("Memo", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._HScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._VScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._viewPort = null;
                this._HScrollBar.onChange.addListener(this.HScroll);
                this._VScrollBar.onChange.addListener(this.VScroll);
                this._HScrollBar.smallChange = ~~(this._HScrollBar._viewportSize / 5);
                this._VScrollBar.smallChange = ~~(this._VScrollBar._viewportSize / 5);
                this._whiteSpace = $j.types.whiteSpaces.INHERIT;
                this._wordBreak = $j.types.wordBreaks.INHERIT;
                this._wordWraps = $j.types.wordWraps.INHERIT;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 185;
                    this.height = 89;
                }
                this.hitTest.mouseWheel = true;
                delete this.text;
                delete this.type;
                delete this.setText;
                this.removeBindableProperties(["text"]);
                this.lines = new $j.classes.StringList(this);
                this.lines.onChange.addListener(this.update);
            }
        },
        //#region Setters
        setWhiteSpace: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.whiteSpaces)) return;
            if (this._whiteSpace !== newValue) {
                this._whiteSpace = newValue;
                this.update();
            }
        },
        setWordBreak: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.wordBreaks)) return;
            if (this._wordBreak !== newValue) {
                this._wordBreak = newValue;
                this.update();
            }
        },
        setWordWrap: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.wordWraps)) return;
            if (this._wordWraps !== newValue) {
                this._wordWraps = newValue;
                this.update();
            }
        },
        setLines: function (newValue) {
            if (!(newValue instanceof $j.classes.StringList)) return;
            if (this.lines !== newValue) {
                this.lines.clear();
                this.lines.list.addRange(newValue);
                this.update();
            }
        },
        //#endregion
        //#region Methods
        textChanged: function () {
            this.jsObj.lines.list = this.value.split("\n");
        },
        updateScrollBars: function () {
            var ta = this, memo = this.jsObj, scrollbars = $j.types.scrollbars.NONE, taw = ta.offsetWidth, tah = ta.offsetHeight;
            $j.CSS.removeClass(memo._HTMLElement, "scrollbars-none");
            $j.CSS.removeClass(memo._HTMLElement, "scrollbars-horizontal");
            $j.CSS.removeClass(memo._HTMLElement, "scrollbars-vertical");
            $j.CSS.removeClass(memo._HTMLElement, "scrollbars-both");
            if (ta.scrollWidth > taw) scrollbars = $j.types.scrollbars.HORIZONTAL;
            if (ta.scrollHeight > tah) {
                if (scrollbars === $j.types.scrollbars.HORIZONTAL) scrollbars = $j.types.scrollbars.BOTH;
                else scrollbars = $j.types.scrollbars.VERTICAL;
            }
            memo._HTMLElement.dataset.scrollbars = scrollbars;
            $j.CSS.addClass(memo._HTMLElement, "scrollbars-" + scrollbars);
            if (scrollbars === $j.types.scrollbars.HORIZONTAL || scrollbars === $j.types.scrollbars.BOTH) {
                memo._HScrollBar.setMax(ta.scrollWidth);
                memo._HScrollBar.setViewportSize(taw);
                memo._HScrollBar.setValue(ta.scrollLeft);
            }
            if (scrollbars === $j.types.scrollbars.VERTICAL || scrollbars === $j.types.scrollbars.BOTH) {
                memo._VScrollBar.setMax(ta.scrollHeight);
                memo._VScrollBar.setViewportSize(tah);
                memo._VScrollBar.setValue(ta.scrollTop);
            }
            ta.style.width = (ta.parentNode.offsetWidth - 4) + $j.types.CSSUnits.PX;
            ta.style.height = (ta.parentNode.offsetHeight - 4) + $j.types.CSSUnits.PX;
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            this.maxLength = parseInt(this._HTMLElement.getAttribute("maxlength"), 10) | 0;
            data = this._HTMLElement.dataset.readonly;
            if (data) this.readOnly = _conv.strToBool(data);
            this.placeHolder = this._HTMLElement.getAttribute("placeholder");
            if (!this.placeHolder) this.placeHolder = String.EMPTY;
            this.app.getLocalText(this);
            if (this._inputObj.value !== String.EMPTY) this.lines.addText(this._inputObj.value, false);
        },
        getChildsHTMLElement: function () {
            this._VScrollBar.getHTMLElement(this._HTMLElement.lastElementChild.id);
            this._VScrollBar.getChildsHTMLElement();
            this._VScrollBar.setOrientation($j.types.orientations.VERTICAL);
            this._HScrollBar._HTMLElement = this._VScrollBar._HTMLElement.previousSibling;
            while (this._HScrollBar._HTMLElement.nodeType !== $j.types.xmlNodeTypes.ELEMENT_NODE) {
                this._HScrollBar._HTMLElement = this._HScrollBar._HTMLElement.previousSibling;
            }
            this._HScrollBar.getHTMLElement(this._HScrollBar._HTMLElement.id);
            this._HScrollBar.getChildsHTMLElement();
            this._viewPort = this._HTMLElement.firstElementChild;
            this._viewPort.jsObj = this;
            this._inputObj = this._viewPort.firstElementChild;
            this._inputObj.jsObj = this;
            this._HScrollBar.updateFromHTML();
            this._VScrollBar.updateFromHTML();
            $j.tools.events.bind(this._inputObj, $j.types.HTMLEvents.CHANGE, this.textChanged);
            $j.tools.events.bind(this._inputObj, $j.types.HTMLEvents.FOCUS, this.HTMLFocus);
            $j.tools.events.bind(this._inputObj, $j.types.HTMLEvents.BLUR, this.HTMLBlur);
            $j.tools.events.bind(this._inputObj, $j.types.keybordEvents.UP, this.updateScrollBars);
            $j.tools.events.bind(this._inputObj, $j.types.keybordEvents.PRESS, this.updateScrollBars);
            $j.tools.events.bind(this._inputObj, $j.types.keybordEvents.DOWN, this.updateScrollBars);
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{horizontalScrollBar}"), tpl;
            tpl = this._HScrollBar.getTemplate();
            html = a.join(tpl);
            a = html.split("{verticalScrollBar}"), tpl;
            tpl = this._VScrollBar.getTemplate();
            html = a.join(tpl);
            a = html.split("{text}"), tpl;
            tpl = this.name;
            html = a.join(tpl);
            return html;
        },
        update: function (arg) {
            var memo = this;
            if (arg) memo = arg;
            if ((memo._loading || memo.form._loading) && !$j.tools.Debugger.useFragment) return;
            if (memo._inputObj) {
                memo._inputObj.style.width = (memo._HTMLElement.offsetWidth - 6) + $j.types.CSSUnits.PX;
                memo._inputObj.style.height = (memo._HTMLElement.offsetHeight - 6) + $j.types.CSSUnits.PX;
                memo._inputObj.value = memo.lines.getText();
                memo._inputObj.style.whiteSpace = memo._whiteSpace;
                memo._inputObj.style.wordBreak = memo._wordBreak;
                memo._inputObj.style.wordWrap = memo._wordWrap;
                if (memo.maxLength > 0) memo._inputObj.setAttribute("maxlength", memo.maxLength);
                memo._inputObj.setAttribute("placeholder", memo.placeHolder);
                if (memo.readOnly) memo._inputObj.setAttribute("readonly", null);
                else memo._inputObj.removeAttribute("readonly");
                memo.updateScrollBars.call(memo._inputObj);
            }
        },
        HScroll: function () {
            var memo = this._owner;
            if (this.value <= 2) this.value = 0;
            memo._inputObj.scrollLeft = this.value;
            if (this.value === 0) memo._viewPort.scrollLeft = 0;
            if (this.value === memo._inputObj.scrollWidth - memo._inputObj.clientWidth) memo._viewPort.scrollLeft = 4;
        },
        VScroll: function () {
            var memo = this._owner;
            if (this.value <= 2) this.value = 0;
            memo._inputObj.scrollTop = this.value;
            if (this.value === 0) memo._viewPort.scrollTop = 0;
            if (this.value === this.max) memo._viewPort.scrollTop = 4;
        },
        mouseWheel: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.scrollbars;
            if ((data === $j.types.scrollbars.VERTICAL) || (data === $j.types.scrollbars.BOTH)) {
                this._VScrollBar.mouseWheel();
            } else if (data === $j.types.scrollbars.HORIZONTAL) {
                this._HScrollBar.mouseWheel();
            }
        },
        HTMLFocus: function () {
            this.jsObj.enterFocus();
        },
        HTMLBlur: function () {
            this.jsObj.killFocus();
        },
        destroy: function () {
            this._inherited();
            //this._HScrollBar.destroy();
            this._HScrollBar = null;
            //this._VScrollBar.destroy();;
            this._VScrollBar = null;
            this._viewPort = null;
        },
        loaded: function () {
            this._inherited();
            this._VScrollBar.setOrientation($j.types.orientations.VERTICAL);
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.COMMON, Memo);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var MemoTpl = "<div id='{internalId}' data-name='{name}' data-class='Memo' class='Control Memo {theme} scrollbars-none' data-scrollbars='none' style='width:185px;height:89px;'>\
                 <div class='Control MemoViewPort {theme}'>\
                 <textarea class='Control csr_text MemoInput {theme}'>Memo1</textarea>\
                 </div>\
                 {horizontalScrollBar}\
                 {verticalScrollBar}\
                 </div>";
        $j.classes.registerTemplates([{ Class: Memo, template: MemoTpl }]);
    }
    //#endregion
})();