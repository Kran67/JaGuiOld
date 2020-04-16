(function () {
    "use strict";
    //#region ListBoxItemColor
    var ListBoxItemColor = $j.classes.ListBoxItemPopup.extend("ListBoxItemColor", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._forceMouseWheel = true;
                //#endregion
                this.color = _colors.newColor(0, 0, 0, 0);
            }
        },
        //#region Setters
        setColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.color.equals(newValue)) {
                this.color.assign(newValue);
                this._owner.draw();
            }
        },
        //#endregion
        //#region Methods
        draw: function (alternate) {
            var colorDiv;
            this._inherited(alternate);
            if (this._html.childElementCount === 1) {
                colorDiv = $j.doc.createElement($j.types.HTMLElements.DIV);
                $j.CSS.addClass(colorDiv, "Color " + this._owner.getThemeName());
                this._html.insertBefore(colorDiv, this._text);
            } else colorDiv = this._html.firstElementChild;
            colorDiv.style.backgroundColor = this.color.toARGBString();
            $j.CSS.addClass(this._html, "ListBoxItemPopup");
        },
        destroy: function () {
            this._inherited();
            this._forceMouseWheel = null;
            this.color.destroy();
            this.color = null;
        },
        clone: function () {
            var clone = this._inherited();
            clone.color = null;
            clone.color = new $j.classes.Color(this.color);
            return clone;
        },
        update: function () {
            var colorDiv;
            this._inherited();
            if (this._html) {
                if (this._html.childElementCount > 1) {
                    colorDiv = this._html.firstElementChild;
                    colorDiv.style.backgroundColor = this.color.toARGBString();
                }
            }
        }
        //#endregion
    });
    //#endregion
    //#region ListBoxColorPopup
    var ListBoxColorPopup = $j.classes.ListBoxPopup.extend("ListBoxColorPopup", {
        //#region Method
        _selectItem: function (item) {
            item._owner._dropDownListBox.setColorIndex(item.getIndex());
            item._owner._dropDownListBox.itemIndex = item.getIndex();
            if (!item._owner._owner._owner._updating) item._owner._owner._owner.onChange.invoke();
            this._inherited(item);
        }
        //#endregion
    });
    Object.seal(ListBoxColorPopup);
    //#endregion
    //#region DropDownListBoxColor
    var DropDownListBoxColor = $j.classes.DropDownListBox.extend("DropDownListBoxColor", {
        init: function (owner, props) {
            props = !props ? {} : props;
            var item, top = 0, colors, i, l;
            if (owner) {
                this._inherited(owner, props);
                this._listBoxClass = $j.classes.ListBoxColorPopup;
                this.color = _colors.newColor(0, 0, 0, 0);
                this._selectedColor = null;
                this.itemIndex = -1;
                colors = Object.keys(_colors);
                i = 0;
                l = colors.length;
                for (; i < l; i++) {
                    if (_colors[colors[i]] instanceof $j.classes.Color) {
                        item = $j.classes.createComponent($j.classes.ListBoxItemColor, this, null, null, false);
                        item.top = top;
                        item.color.assign(_colors[colors[i]]);
                        item.text = colors[i].firstCharUpper();
                        top += this.itemsSize;
                        this.items.push(item);
                    }
                }
            }
            this.setHitTest([true, true, true]);
        },
        //#region Setter
        setColorIndex: function (newValue) {
            var item;
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0) return;
            if (newValue > this.items.length) return;
            item = this.items[newValue];
            this.setText(item.text);
            this._selectedColor.style.backgroundColor = item.color.toARGBString();
            this._selectedColor.style.border = "1px solid #000";
            this.color.assign(item.color);
        },
        setColor: function (newValue) {
            var item;
            if (!(newValue instanceof $j.classes.Color)) return;
            item = this.items.filter(function (item) { return item.color.equals(newValue); });
            if (item.length > 0) {
                this.setText(item.first().text);
                this._selectedColor.style.backgroundColor = newValue.toARGBString();
                this._selectedColor.style.border = "1px solid #000";
                this.color.assign(newValue);
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            var lastStart = 0, item, items = [];
            this._selectedColor = this._HTMLElement.firstElementChild;
            this._selectedColor.jsObj = this;
            this._content = this._HTMLElement.querySelector(".DropDownListBoxColorContent");
            this._content.jsObj = this;
            this._input = this._content.firstElementChild;
            this._input.jsObj = this;
            for (var i = 0, l = items.length; i < l; i++) {
                item = $j.classes.createComponent($j.classes.DropDownListBoxItem, this, null, null, false);
                if (items[i].size) item.size = items[i].size;
                if (items[i].isChecked) item.isChecked = items[i].isChecked;
                if (items[i].isHeader) item.isHeader = items[i].isHeader;
                if (items[i].enabled) item.enabled = items[i].enabled;
                item.top = lastStart;
                this.items.push(item);
                lastStart += item.size;
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.itemindex;
            if (data) this.itemindex = ~~data;
        },
        loaded: function () {
            this._inherited();
            if (this.itemIndex > -1) this.setColorIndex(this.itemIndex);
        },
        destroy: function () {
            this._inherited();
            this._listBoxClass = null;
            this.color.destroy();
            this.color = null;
            this._selectedColor = null;
            this.itemIndex = null;
        }
        //#endregion
    });
    Object.seal(DropDownListBoxColor);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, ListBoxItemColor, ListBoxColorPopup);
    $j.classes.register($j.types.categories.COLOR, DropDownListBoxColor);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var DropDownListBoxColorTpl = "<div id='{internalId}' data-name='{name}' data-class='DropDownListBoxColor' class='Control DropDownListBox DropDownListBoxColor {theme}' data-editable='false' style='width:100px;height:20px;'>\
                                 <div class='Control DropDownListBoxColorColorBox {theme}'></div>\
                                 <div class='Control DropDownListBoxColorContent DropDownListBoxContent {theme}'>\
                                 <input type='text' readonly='readonly' class='Control csr_default DropDownListBoxInput DropDownListBoxColorInput {theme}' />\
                                 </div>\
                                 <span class='Control DropDownListBoxArrow {theme}'></span>\
                                 </div>";
        $j.classes.registerTemplates([{ Class: DropDownListBoxColor, template: DropDownListBoxColorTpl }, { Class: ListBoxColorPopup, template: $j.templates["ListBox"] }]);
    }
    //#endregion
})();