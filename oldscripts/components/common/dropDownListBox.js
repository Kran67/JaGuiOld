(function () {
    //#region ListBoxItemPopup
    var ListBoxItemPopup = $j.classes.ListBoxItem.extend("ListBoxItemPopup", {
        init: function (owner, text) {
            if (owner) {
                this._inherited(owner, text);
                //#region Private
                this._forceMouseWheel = true;
                //#endregion
            }
        },
        //#region Methods
        mouseLeave: function () {
            if (this._owner instanceof $j.classes.ListBoxPopup) $j.CSS.removeClass(this._html, "selected");
        },
        mouseEnter: function () {
            if ((this._owner.itemIndex > -1) && (this._owner instanceof $j.classes.ListBoxPopup)) {
                $j.CSS.removeClass(this._owner.items[this._owner.itemIndex]._html, "selected");
                this._owner.items[this._owner.itemIndex].selected = false;
                this._owner.itemIndex = -1;
            }
        },
        destroy: function () {
            this._inherited();
            this._forceMouseWheel = null;
        }
        //#endregion
    });
    //#endregion
    //#region ListBoxPopup
    var ListBoxPopup = $j.classes.ListBox.extend("ListBoxPopup", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._forceMouseWheel = true;
                //#endregion
                this.canFocused = false;
                this._VScrollBar.smallChange = this.itemsHeight;
            }
        },
        //#region Method
        refreshInnerHeight: function () {
            if (!this._owner) return;
            for (var i = 0, l = this.items.length; i < l; i++) {
                this.items[i].removeToHTML();
                this.items[i]._owner = this;
                this.items[i].isChecked = false;
                this.items[i].selected = false;
            }
            this._inherited();
        },
        _selectItem: function (item) {
            if (item.isHeader || !item.enabled) return;
            item._owner._dropDownListBox.itemIndex = item.getIndex();
            item._owner._dropDownListBox.setText(item.text);
            if (!item._owner._dropDownListBox._updating) item._owner._dropDownListBox.onChange.invoke();
            item._owner._dropDownListBox._lastScrollTop = item._owner._scrollTop;
            item.form.closePopups();
        },
        loaded: function () {
            this._inherited();
            this._VScrollBar._forceMouseWheel = true;
            this._HScrollBar._forceMouseWheel = true;
        },
        destroy: function () {
            this._inherited();
            this._forceMouseWheel = null;
        },
        keyUp: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_RETURN:
                case $j.types.VKeysCodes.VK_ENTER:
                    this._selectItem(this.items[this.itemIndex]);
                    break;
            }
        }
        //#endregion
    });
    Object.seal(ListBoxPopup);
    //#endregion
    //#region DropDownListBoxPopup
    var DropDownListBoxPopup = $j.classes.PopupBox.extend("DropDownListBoxPopup", {
        init: function (owner, props) {
            var lbHeight, lbWidth, lbItemsHeight;
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._listBox = null;
                this._lbHeight = null;
                this._lbWidth = null;
                this._lbItemsHeight = null;
                this._dropDownListBox = owner;
                //#endregion
                if (props) {
                    this._lbHeight = props.height;
                    this._lbWidth = props.width;
                    this._lbItemsHeight = props.itemsHeight;
                    props = null;
                }
                this._listBox = $j.classes.createComponent(owner._listBoxClass, this, null, { "width": this._lbWidth, "height": this._lbHeight, "itemsHeight": this._lbItemsHeight });
                this._listBox._dropDownListBox = this._dropDownListBox;
                this._listBox.canFocused = false;
                this._listBox._VScrollBar.canFocused = false;
                this._listBox._HScrollBar.canFocused = false;
                this._listBox.animated = false;
                this._listBox.mouseTracking = false;
                this._listBox.images = this._dropDownListBox.images;
                this._dropDownListBox.onDrawItem.copyListenerTo(this._listBox.onDrawItem);
                this.setClosePopups(false);
            }
        },
        //#region Method
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{listBox}"), arr = [];
            if (a.length > 1) {
                Array.prototype.push.apply(arr, this._listBox._dropDownListBox.items);
                while (i = arr.pop()) {
                    this._listBox.items.push(i.clone());
                }
                this._listBox.items.reverse();
                html = a.join(this._listBox.getTemplate());
            }
            return html;
        },
        show: function (x, y) {
            if (!this._listBox.form) this._listBox.form = this._control.form;
            if (!this._listBox.app) this._listBox.app = this._control.app;
            this._inherited(x, y);
            this._listBox._VScrollBar.setValue(this._owner._lastScrollTop);
            this._listBox.itemIndex = this._owner.itemIndex;
            if (this._listBox.itemIndex > -1) {
                //$j.CSS.addClass(this._listBox.items[this._listBox.itemIndex]._html,"selected");
                //this._listBox.items[this._listBox.itemIndex].selected=true;
                this._listBox.items[this._listBox.itemIndex].setSelected(true);
            }
            //this._listBox.setImages(this._dropDownListBox.images);
        },
        destroy: function () {
            if (this._control) {
                this._control.opened = false;
                $j.CSS.removeClass(this._control._HTMLElement, "opened");
            }
            if (this._HTMLElement) {
                $j.CSS.removeClass(this._HTMLElement, "animated");
                $j.CSS.removeClass(this._HTMLElement, "fadeIn");
            }
            this._inherited();
            if (!this._listBox) return;
            //this._listBox.destroy();
            this._lbItemsHeight = null;
            this._dropDownListBox = null;
            this._lbHeight = null;
            this._lbWidth = null;
            this._lbItemsHeight = null;
            this._listBox = null;
        },
        getChildsHTMLElement: function () {
            this._listBox.getHTMLElement(this._HTMLElement.firstElementChild.id);
            this._listBox._HTMLElementStyle.width = this._lbWidth + $j.types.CSSUnits.PX;
            this._listBox._HTMLElementStyle.height = this._lbHeight + $j.types.CSSUnits.PX;
            this._listBox.getChildsHTMLElement();
            this._listBox.refreshInnerHeight();
            $j.CSS.addClass(this._listBox._HTMLElement, "csr_default");
        },
        keyUp: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_RETURN:
                case $j.types.VKeysCodes.VK_ENTER:
                    this._listBox._selectItem(this._listBox.items[this._listBox.itemIndex]);
                    break;
            }
        }
        //#endregion
    });
    Object.seal(DropDownListBoxPopup);
    //#endregion
    //#region DropDownListBox
    var DropDownListBox = $j.classes.ThemedControl.extend("DropDownListBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._dropDownPopup = null;
                this._content = null;
                this._input = null;
                this._listBoxClass = $j.classes.ListBoxPopup;
                this._lastScrollTop = 0;
                //#endregion
                this.opened = false;
                this.text = String.EMPTY;
                $j.classes.newCollection(this, this, $j.classes.ListBoxItemPopup);
                this.dropDownCount = 8;
                if (this._ClassName === "DropDownListBox") {
                    this.editable = false;
                    this.autoComplete = false;
                    this.autoCompleteDelay = 500;
                    $j.tools.addPropertyFromSet(this, "charCase", $j.types.charCases, $j.types.charCases.NORMAL);
                    this.maxLength = 0;
                }
                //this.charCase=$j.types.charCases.NORMAL;
                this.itemIndex = -1;
                this.itemsHeight = 13;
                this.canFocused = true;
                this.autoCapture = true;
                //this.tabStop=true;
                this.setHitTest([true, true, true]);
                this.onChange = new $j.classes.NotifyEvent(this);
                this.onDrawItem = new $j.classes.NotifyEvent(this);
                this.images = null;
            }
        },
        //#region Setters
        setText: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.text !== newValue) {
                this.text = newValue;
                if (this.items && this.items.length > 0) {
                    var item = this.items.filter(function (el) {
                        return el.text === newValue;
                    });
                    if (item.length > 0) this.itemIndex = this.items.indexOf(item.first());
                }
                this.update();
            }
        },
        setEditable: function (newValue) {
            if (this._ClassName !== "DropDownListBox") return;
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.editable !== newValue) {
                this.editable = newValue;
                this.update();
            }
        },
        setOpened: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.opened !== newValue) {
                this.opened = newValue;
                this.update();
                if (this.opened) this.showPopup();
                else this.form.closePopups();
            }
        },
        setDropDownCount: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 8) newValue = 8;
            if (this.dropDownCount !== newValue) this.dropDownCount = newValue;
        },
        setAutoComplete: function (newValue) {
            if (this._ClassName !== "DropDownListBox") return;
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.autoComplete !== newValue) this.autoComplete = newValue;
        },
        setAutoCompleteDelay: function (newValue) {
            if (this._ClassName !== "DropDownListBox") return;
            if (typeof newValue !== _const.NUMBER) return;
            if (this.autoCompleteDelay !== newValue) this.autoCompleteDelay = newValue;
        },
        setCharCase: function (newValue) {
            if (this._ClassName !== "DropDownListBox") return;
            if (!($j.tools.valueInSet(newValue, $j.types.charCases))) return;
            if (this.charCase !== newValue) {
                this.charCase = newValue;
                this.update();
            }
        },
        setItemIndex: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.itemIndex !== newValue) {
                if (newValue < 0) newValue = 0;
                if (newValue > this.items.length) newValue = this.items.length - 1;
                if (this.itemIndex > -1) this.items[this.itemIndex].setSelected(false);
                this.itemIndex = newValue;
                if (newValue > -1) this.setText(this.items[newValue].text);
                this.items[newValue].setSelected(true);
            }
        },
        setMaxLength: function (newValue) {
            if (this._ClassName !== "DropDownListBox") return;
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0) newValue = 0;
            if (this.maxLength !== newValue) {
                this.maxLength = newValue;
                this.update();
            }
        },
        setItemsHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 13) newValue = 13;
            if (this.itemsHeight !== newValue) this.itemsHeight = newValue;
        },
        setImages: function (newValue) {
            if (!(newValue instanceof $j.classes.ImageList)) return;
            if (this.images !== newValue) {
                this.images.assign(newValue);
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            var lastStart = 0, item, items = [];
            this._content = this._HTMLElement.firstElementChild;
            this._content.jsObj = this;
            this._input = this._content.firstElementChild;
            this._input.jsObj = this;
            $j.tools.events.bind(this._input, $j.types.mouseEvents.DOWN, this.mouseDown);
            // on va chercher les items dans le CDATA
            var cdata = this._content.nextSibling;
            if (cdata) {
                while (cdata.nodeType !== $j.types.xmlNodeTypes.COMMENT_NODE) {
                    cdata = cdata.nextSibling;
                    if (!cdata) break;
                }
            }
            if (cdata) {
                if (cdata.nodeValue !== String.EMPTY && cdata.nodeValue) items = JSON.parse(cdata.nodeValue);
            }
            for (var i = 0, l = items.length; i < l; i++) {
                item = $j.classes.createComponent($j.classes.ListBoxItemPopup, this, null, null, false);
                if (items[i].height) item.height = items[i].height;
                if (items[i].isChecked) item.isChecked = items[i].isChecked;
                if (items[i].isHeader) item.isHeader = items[i].isHeader;
                if (items[i].enabled) item.enabled = items[i].enabled;
                if (items[i].css) item.css = items[i].css;
                if (items[i].imageIndex) item.imageIndex = items[i].imageIndex;
                //if (items[i].onDraw && this.form[items[i].onDraw]) item.onDraw.addListener(this.form[items[i].onDraw]);
                item.top = lastStart;
                if (items[i].text) item.text = items[i].text;
                this.items.push(item);
                lastStart += item.height;
            }
        },
        _mouseDown: function (mouseEventArg) {
            if (this instanceof $j.classes.DropDownListBox) {
                if (this.jsObj.editable) $j.mouse.stopEvent(mouseEventArg);
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            if (this._ClassName === "DropDownListBox") {
                data = this._HTMLElement.dataset.editable;
                if (data) this.editable = _conv.strToBool(data);
                data = this._HTMLElement.dataset.autocomplete;
                if (data) this.autoComplete = _conv.strToBool(data);
                data = this._HTMLElement.dataset.dropdowncount;
                if (data) this.dropDownCount = ~~(data);
                data = this._HTMLElement.dataset.autocompletedelay;
                if (data) this.autoCompleteDelay = ~~data;
                data = this._HTMLElement.dataset.charcase;
                if (data) this.charCase = data;
                data = this._HTMLElement.dataset.maxlength;
                if (data) this.maxLength = ~~data;
            }
            data = this._HTMLElement.dataset.text;
            if (data) this.text = data;
            data = this._HTMLElement.dataset.itemindex;
            if (data) this.setItemIndex(~~data);
            this.bindEventToHTML("onChange");
            this.bindEventToHTML("onDrawItem");
        },
        update: function () {
            if (this._HTMLElement) {
                this._HTMLElement.dataset.opened = this.opened;
                this._HTMLElement.dataset.editable = this.editable;
                this._HTMLElement.dataset.value = this.text;
                $j.CSS.removeClass(this._HTMLElement, "opened");
                if (this.opened) $j.CSS.addClass(this._HTMLElement, "opened");
            }
            if (this._input) {
                this._input.value = this.text;
                if (this.maxLength > 0) this._input.setAttribute("maxLength", this.maxLength);
            }
            this.onPaint.invoke();
        },
        mouseDown: function () {
            if (this.jsObj) return;
            var lastOpened = this.opened;
            if (this === this.form._focusedControl) {
                if (lastOpened) this._closePopups = false;
            }
            this._inherited();
            this._closePopups = true;
            this.setOpened(!this.opened);
        },
        showPopup: function () {
            var pt = this.clientToDocument(), lbHeight;
            if (!this._dropDownPopup) {
                lbHeight = (this.itemsHeight * this.dropDownCount) + 2;
                if (this.items.length < this.dropDownCount) lbHeight = (this.itemsHeight * this.items.length) + 2;
                this._dropDownPopup = $j.classes.createComponent($j.classes.DropDownListBoxPopup, this, null, { parentHTML: $j.doc.body, width: this._HTMLElement.offsetWidth, height: lbHeight, itemsHeight: this.itemsHeight });
                this._dropDownPopup._control = this;
                this._dropDownPopup._HTMLElementStyle.width = this._HTMLElement.offsetWidth + $j.types.CSSUnits.PX;
                this._dropDownPopup._HTMLElementStyle.height = lbHeight + $j.types.CSSUnits.PX;
            }
            this._dropDownPopup.setVisible(true);
            this._dropDownPopup.show(pt.x, pt.y + this._HTMLElement.offsetHeight);
            $j.CSS.addClass(this._dropDownPopup._HTMLElement, "animated fadeIn");
        },
        destroyPopup: function () {
            if (this._dropDownPopup) {
                this._dropDownPopup.destroy();
                this._dropDownPopup = null;
            }
        },
        findItemFromText: function (text) {
            var items = this.items.filter(function (e, i, a) {
                return (e.text === text);
            });
            if (items.length > 0) return items.first().getIndex();
            else return -1;
        },
        destroy: function () {
            this._inherited();
            if (this._dropDownPopup) this._dropDownPopup.destroy();
            this._dropDownPopup = null;
            this._content = null;
            this._input = null;
            this._listBoxClass = null;
            this._lastScrollTop = null;
            this.opened = null;
            this.text = null;
            while (this.items.length > 0) {
                this.items.last().destroy();
            }
            //for (var i=0,l=this.items.length;i<l;i++) {
            //  this.items[i].destroy();
            //  this.items[i]=null;
            //}
            this.items.destroy();
            this.items = null;
            this.dropDownCount = null;
            this.itemIndex = null;
            this.itemsHeight = null;
            this.canFocused = null;
            this.autoCapture = null;
            this.onChange.destroy();
            this.onChange = null;
            if (this._ClassName === "DropDownListBox") {
                this.autoComplete = null;
                this.autoCompleteDelay = null;
                this.charCase = null;
                this.maxLength = null;
                this.editable = null;
            }
        },
        keyDown: function () {
            this._inherited();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE) this.setOpened(true);
            else if (this._dropDownPopup) this._dropDownPopup._listBox.keyDown();
        },
        newItem: function (text, options) {
            var item = $j.classes.createComponent($j.classes.ListBoxItemPopup, this, null, null, false);
            item.text = text;
            if (options) {
                if (options.height) item.height = options.height;
                if (options.isChecked) item.isChecked = options.isChecked;
                if (options.isHeader) item.isHeader = options.isHeader;
                if (options.enabled) item.enabled = options.enabled;
                if (options.css) item.css = options.css;
            }
            this.items.push(item);
            return item;
        },
        addItem: function (item) {
            if (!item) return;
            if (!(item instanceof $j.classes.ListBoxItemPopup)) return;
            this.items.add(item);
        },
        removeItem: function () {
        },
        clear: function () {
            for (var i = 0, l = this.items.length; i < l; i++) {
                this.items[i].destroy();
                this.items[i] = null;
            }
            this.items.clear();
            this.setText(String.EMPTY);
            this.itemIndex = -1;
        },
        killFocus: function () {
            this.setOpened(false);
            this._inherited();
        },
        loaded: function () {
            this._inherited();
            this.getImages();
        },
        getImages: function () {
            var data = this._HTMLElement.dataset.images;
            if (data) {
                if (this.form[data]) {
                    this.images = this.form[data];
                }
            }
        }
        //#endregion
    });
    Object.seal(DropDownListBox);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, DropDownListBoxPopup, ListBoxPopup, ListBoxItemPopup);
    $j.classes.register($j.types.categories.COMMON, DropDownListBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var DropDownListBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='DropDownListBox' class='Control DropDownListBox {theme}' data-editable='false' style='width:100px;height:20px;'>\
                            <div class='Control DropDownListBoxContent'>\
                            <input type='text' readonly='readonly' class='Control csr_default DropDownListBoxInput {theme}' />\
                            </div>\
                            <span class='Control DropDownListBoxArrow {theme}'></span>\
                            </div>",
            DropDownListBoxPopupTpl = "<div id='{internalId}' class='Control PopupBox PopupListBox csr_default {theme}'>\
                                 {listBox}\
                                 </div>",
            ListBoxItemPopupTpl = ["<div class='Control ListBoxItemPopup VListBoxItem {theme}' data-idx='{idx}' data-size='{size}' data-isheader='{isheader}' data-ischecked='{ischecked}' data-enabled='{enabled}'>{caption}</div>"].join(String.EMPTY);
        $j.classes.registerTemplates([{ Class: DropDownListBox, template: DropDownListBoxTpl }, { Class: DropDownListBoxPopup, template: DropDownListBoxPopupTpl }, { Class: ListBoxItemPopup, template: ListBoxItemPopupTpl },
                                      { Class: ListBoxPopup, template: $j.templates["ListBox"] }]);
    }
    //#endregion
})();