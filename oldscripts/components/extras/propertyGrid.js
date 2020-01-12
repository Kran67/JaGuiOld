(function () {
    //#region dataTypes
    $j.types.dataTypes = {
        STRING: "string", NUMBER: "number", SIMPLECLASS: "simpleClass", COMPONENTCLASS: "componentClass", DATE: "date", STRINGLIST: "stringList",
        COLLECTION: "collection", COLOR: "color", BOOLEAN: "boolean", LIST: "list", ARRAY: "array", IMAGE: "image", PATH: "path"
    };
    //#endregion
    //#region PropertyGridItem
    var PropertyGridItem = Class.extend("PropertyGridItem", {
        init: function (owner, parentNode) {
            var lastItem;
            if (owner) {
                //#region Private
                this._owner = owner;
                this._parentNodes = [];
                this._html = null;
                this._htmlValue = null;
                this._top = 0;
                this._level = 0;
                this._initialValueDiff = false;
                this._isReference = false;
                this._dataType = null;
                this._stopEvent = true;
                this._textValue = String.EMPTY;
                this._showTextValue = true;
                //#endregion
                this.text = String.EMPTY;
                this.value = String.EMPTY;
                this.height = owner._itemsHeight;
                this.enabled = true;
                this.expanded = false;
                this.form = owner.form;
                this.selected = false;
                this.visible = true;
                this.items = [];
                this.cssClass = String.EMPTY;
                this.hitTest = { mouseWheel: true };
                if (parentNode) owner.items.insert(owner.items.indexOf(parentNode) + 1 + parentNode.items.length, this);
                else owner.items.push(this);
                if (parentNode) {
                    this._parentNodes.push.apply(this._parentNodes, parentNode._parentNodes);
                    this._parentNodes.push(parentNode);
                    this._level = parentNode._level + 1;
                    lastItem = parentNode.items.last();
                    if (!lastItem) lastItem = owner.items.last();
                    if (lastItem) this._top = lastItem._top + lastItem.height;
                    parentNode.items.push(this);
                }
                if (owner._allowUpdate) {
                    owner.updateVScrollBar();
                    owner.draw();
                }
            }
        },
        //#region Setter
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this.enabled = newValue;
                this.update();
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.height !== newValue) {
                this.height = newValue;
                this._owner.refreshInnerHeight();
            }
        },
        setText: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.text !== newValue) {
                this.text = newValue;
                this.update();
            }
        },
        setValue: function (newValue) {
            if (typeof newValue !== typeof this.value) return;
            if (this.value.equals) {
                if (!this.value.equals(newValue)) {
                    if (this.value.assign) this.value.assign(newValue);
                    else this.value = newValue;
                } else if (this.value.assign) this.value.assign(newValue);
                else this.value = newValue;
            } else if (this.value !== newValue) {
                if (this.value.assign) this.value.assign(newValue);
                else this.value = newValue;
            }
            this._initialValueDiff = true;
            this.getTextValue();
            this.update();
            this.draw();
        },
        setSelected: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (!this.enabled) return;
            if (this.selected !== newValue) {
                this.selected = newValue;
                this.update();
            }
        },
        setExpanded: function () {
            var i, l, obj, keys, item, t, scrollPos, jsObj;
            if (this.jsObj) jsObj = this.jsObj;
            else jsObj = this;
            scrollPos = jsObj._owner._VScrollBar.value;
            jsObj.expanded = !jsObj.expanded;
            jsObj._owner.deselectItemIndex();
            if (jsObj.items.length === 0) {
                // on test le type de noeud
                switch (jsObj._dataType) {
                    case $j.types.dataTypes.ARRAY:
                        if (jsObj._owner._component._props[jsObj.text]) {
                            obj = jsObj._owner._component._props[jsObj.text];
                            keys = Object.keys(obj);
                            l = keys.length;
                            t = jsObj._top + jsObj.height;
                            for (i = 0; i < l; i++) {
                                item = jsObj.createChild(obj[keys[i]], (jsObj.value.indexOf(obj[keys[i]]) > -1) ? true : false, false, false, $j.types.dataTypes.BOOLEAN, t);
                                t += jsObj.height;
                            }
                        }
                        break;
                    case $j.types.dataTypes.COMPONENTCLASS:


                        break;
                    case $j.types.dataTypes.SIMPLECLASS:
                        //if (this._owner._component._props[this.text])) {
                        //keys=this.value.getProperties();
                        //l=keys.length;
                        //t=this._top+this.height;
                        //for (i=0;i<l;i++) {
                        //  item=this.createChild(keys[i].property,keys[i].value,false,false,$j.types.dataTypes.BOOLEAN,t);
                        //  t+=this.height;
                        //}
                        jsObj._owner.addComponent(jsObj.value, jsObj);
                        break;
                }
            }
            for (i = 0, l = jsObj.items.length; i < l; i++) {
                jsObj.items[i].visible = jsObj.expanded;
                jsObj.items[i]._level = jsObj._level + 1;
                if (jsObj.items[i]._html) {
                    jsObj.items[i].removeToHTML();
                }
                jsObj.items[i].updateDataSet();
            }
            jsObj.updateDataSet();
            //if (this._owner.itemIndex>-1) {
            //  var item=this._owner.items[this._owner.itemIndex],i;
            //  for (i=item._parentNodes.length-1;i>=0;i--) {
            //    if (item._parentNodes[i]===this) {
            //      this._owner.setItemIndex(this.getIndex());
            //      break;
            //    }
            //  }
            //}
            jsObj._owner.refreshInnerHeight();
            jsObj._owner._VScrollBar.setValue(scrollPos);
            jsObj._owner.setItemIndex(jsObj.getIndex());
        },
        //#endregion
        //#region Methods
        mouseMove: function () {
            this._owner.mouseMove();
        },
        mouseEnter: $j.tools.emptyFunc,
        mouseLeave: $j.tools.emptyFunc,
        mouseDown: function () {
            this._owner.mouseDown();
        },
        mouseUp: function () {
            this._owner.mouseUp();
        },
        mouseWheel: function () {
            this._owner.mouseWheel();
        },
        update: function () {
            if (this._html) {
                $j.CSS.removeClass(this._html, "disabled");
                $j.CSS.removeClass(this._htmlValue, "disabled");
                $j.CSS.removeClass(this._html, "selected");
                $j.CSS.removeClass(this._htmlValue, "selected");
                if (this.height !== this._owner._itemsHeight) {
                    this._html.style.height = this.height + $j.types.CSSUnits.PX;
                }
                if (!this.enabled) {
                    $j.CSS.addClass(this._html, "disabled");
                    $j.CSS.addClass(this._htmlValue, "disabled");
                }
                if (this.selected) {
                    $j.CSS.addClass(this._html, "selected");
                    $j.CSS.addClass(this._htmlValue, "selected");
                } else this._html.lastElementChild.style.color = "";
                this._html.lastElementChild.innerHTML = this.text;
                this._htmlValue.lastElementChild.innerHTML = this._textValue;
                this.updateDataSet();
            }
        },
        updateDataSet: function () {
            if (!this._html) return;
            this._html.dataset.height = this.height;
            this._html.dataset.enabled = this.enabled;
            this._html.dataset.idx = this.getIndex();
            this._html.dataset.expanded = this.expanded;
            this._html.dataset.visible = this.visible;
            $j.CSS.removeClass(this._html, "expanded");
            if (this.expanded) $j.CSS.addClass(this._html, "expanded");
        },
        getIndex: function () {
            return this._owner.items.indexOf(this);
        },
        isEnabled: function () {
            return this.enabled && this._owner.isEnabled();
        },
        isVisible: function () {
            var ret = true;
            for (var i = this._parentNodes.length - 1; i >= 0; i--) {
                if (!this._parentNodes[i].isExpanded()) {
                    ret = false;
                    break;
                }
            }
            return ret && this.visible;
        },
        isExpanded: function () {
            return this.expanded;
        },
        draw: function () {
            var span, i;
            if (!this._html) {
                this._html = $j.doc.createElement($j.types.HTMLElements.DIV);
                this._html.dataset.theme = this._owner.getThemeName();
                $j.CSS.addClass(this._html, this._owner.getThemeName());
                for (i = 0; i <= this._level; i++) {
                    span = $j.doc.createElement($j.types.HTMLElements.DIV);
                    span.style.height = this.height + $j.types.CSSUnits.PX;
                    $j.CSS.addClass(span, "sep");
                    span.jsObj = this;
                    this._html.appendChild(span);
                    if (this._level > 0) {
                        if (i === this._level) {
                            if (this._parentNodes.last().items.indexOf(this) === 0) $j.CSS.addClass(span, "firstChild");
                            if (this._parentNodes.last().items.indexOf(this) === this._parentNodes.last().items.length - 1) {
                                $j.CSS.addClass(span, "lastChild");
                                $j.tools.events.bind(span, $j.types.mouseEvents.CLICK, this.setExpanded);
                            }
                        }
                    } else $j.tools.events.bind(span, $j.types.mouseEvents.CLICK, this.setExpanded);
                }
                span = $j.doc.createElement($j.types.HTMLElements.SPAN);
                span.innerHTML = this.text;
                span.jsObj = this;
                span.style.height = this.height + $j.types.CSSUnits.PX;
                span.style.lineHeight = this.height + $j.types.CSSUnits.PX;
                this._html.appendChild(span);
                this._html.jsObj = this;
                $j.CSS.addClass(this._html, this._ClassName);
                if (!this._parentNodes.isEmpty()) $j.CSS.addClass(this._html, "isChild");
                this._owner._leftPane.appendChild(this._html);
                $j.tools.events.bind(this._html, $j.types.mouseEvents.CLICK, this._owner.selectItem);
                $j.tools.events.bind(this._html, $j.types.mouseEvents.ENTER, this.HTMLMouseEnter);
                $j.tools.events.bind(this._html, $j.types.mouseEvents.LEAVE, this.HTMLMouseLeave);
            }
            if (!this._htmlValue) {
                this._htmlValue = $j.doc.createElement($j.types.HTMLElements.DIV);
                this._htmlValue.dataset.theme = this._owner.getThemeName();
                span = $j.doc.createElement($j.types.HTMLElements.SPAN);
                span.jsObj = this;
                span.style.height = this.height + $j.types.CSSUnits.PX;
                span.style.lineHeight = this.height + $j.types.CSSUnits.PX;
                this._htmlValue.appendChild(span);
                this.getTextValue();
                //span.innerHTML=this._textValue;
                this._htmlValue.jsObj = this;
                $j.CSS.addClass(this._htmlValue, this._owner.getThemeName());
                $j.CSS.addClass(this._htmlValue, this._ClassName);
                this._owner._rightPane.appendChild(this._htmlValue);
                $j.tools.events.bind(this._htmlValue, $j.types.mouseEvents.CLICK, this._owner.selectItem);
                $j.tools.events.bind(this._htmlValue, $j.types.mouseEvents.ENTER, this.HTMLMouseEnter);
                $j.tools.events.bind(this._htmlValue, $j.types.mouseEvents.LEAVE, this.HTMLMouseLeave);
            }
            this._html.style.transform = "translateY(" + (this._top - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            this._html.style.height = this.height + $j.types.CSSUnits.PX;
            $j.CSS.addClass(this._html, this.cssClass);
            if (this._owner.options.renderBackgroundGrid) $j.CSS.addClass(this._html, "grid");
            else $j.CSS.removeClass(this._html, "grid");
            // gestion des couleurs
            if (!this.selected) {
                this._html.lastElementChild.style.color = this._owner.colors.Name;
                if (this._isReference) this._html.lastElementChild.style.color = this._owner.colors.References;
            }
            // value part
            this._htmlValue.style.transform = "translateY(" + (this._top - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            this._htmlValue.style.height = this.height + $j.types.CSSUnits.PX;
            this._htmlValue.style.lineHeight = this.height + $j.types.CSSUnits.PX;
            if (this._owner.options.renderBackgroundGrid) $j.CSS.addClass(this._htmlValue, "grid");
            else $j.CSS.removeClass(this._htmlValue, "grid");
            // gestion des couleurs
            this._htmlValue.style.color = this._owner.colors.Value;
            if (this._initialValueDiff) {
                if (this._owner.options.boldNonDefaultValues) this._htmlValue.style.fontWeight = "bold";
                this._htmlValue.style.color = this._owner.colors["Non Default Value"];
            } else {
                this._htmlValue.style.fontWeight = "normal";
            }
            this.update();
        },
        isEnabled: function () {
            return this._owner.enabled;
        },
        removeToHTML: function () {
            if (this._html) {
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.CLICK, this._owner.selectItem);
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.ENTER, this.HTMLMouseEnter);
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.LEAVE, this.HTMLMouseLeave);
                while (this._html.childNodes.length > 0) {
                    this._html.removeChild(this._html.childNodes[0]);
                }
                this._html.parentNode.removeChild(this._html);
                this._html = null;
                $j.tools.events.unBind(this._htmlValue, $j.types.mouseEvents.CLICK, this._owner.selectItem);
                $j.tools.events.unBind(this._htmlValue, $j.types.mouseEvents.ENTER, this.HTMLMouseEnter);
                $j.tools.events.unBind(this._htmlValue, $j.types.mouseEvents.LEAVE, this.HTMLMouseLeave);
                this._htmlValue.parentNode.removeChild(this._htmlValue);
                this._htmlValue = null;
            }
        },
        destroy: function () {
            this.removeToHTML();
            this._owner.items.remove(this);
            this._owner = null;
            this._left = null;
            this._top = null;
            this._level = null;
            this.text = null;
            this.height = null;
            this.enabled = null;
            this.expanded = null;
            this.form = null;
            this.selected = null;
            this.visible = null;
            this.items = null;
            this.hitTest = null;
            this._parentNodes.destroy();
            this._parentNodes = null;
            this._level = null;
        },
        asChilds: function () {
            return this.items.length > 0 || $j.CSS.containsClass(this._html, "TVIHasChild");
        },
        createChild: function (text, value, initialValueDiff, isReference, dataType, t) {
            var item;
            item = new $j.classes.PropertyGridItem(this._owner, this);
            item.text = text;
            item.value = value;
            item.height = this.height;
            item._top = t;
            item._initialValueDiff = initialValueDiff;
            item._isReference = isReference;
            item._dataType = dataType;
            return item;
        },
        HTMLMouseEnter: function () {
            var w, pW, l, jsObj, parentNode, br;
            jsObj = this.jsObj;
            parentNode = this.parentNode;
            if (parentNode === jsObj._html.parentNode) {
                w = jsObj._html.lastElementChild.offsetWidth;
                pW = jsObj._html.offsetWidth - jsObj._html.lastElementChild.offsetLeft;
                br = jsObj._html.lastElementChild.getBoundingClientRect();
                if (w > pW) jsObj._owner._infoPanel.innerHTML = jsObj.text;
            } else {
                w = jsObj._htmlValue.lastElementChild.offsetWidth;
                pW = jsObj._htmlValue.offsetWidth - jsObj._htmlValue.lastElementChild.offsetLeft;
                br = jsObj._htmlValue.lastElementChild.getBoundingClientRect();
                if (w > pW) jsObj._owner._infoPanel.innerHTML = jsObj._htmlValue.lastElementChild.innerHTML;
            }
        },
        HTMLMouseLeave: function () {
            var jsObj;
            jsObj = this.jsObj;
            jsObj._owner._infoPanel.innerHTML = String.EMPTY;
        },
        getTextValue: function () {
            switch (this._dataType) {
                case $j.types.dataTypes.COLLECTION:
                    if (typeof this.value._itemClass === _const.FUNCTION) this._textValue = "{" + $j.classes.getClassName(this.value._itemClass) + "}";
                    else if (typeof this.value._itemClass === _const.STRING) this._textValue = "{" + _const.STRING + "}";
                    break;
                case $j.types.dataTypes.COMPONENTCLASS:
                    if (this.value instanceof $j.classes.Component) {
                        this._textValue = this.value._ClassName;
                        $j.CSS.addClass(this._html, "TVIHasChild");
                    }
                    break;
                case $j.types.dataTypes.SIMPLECLASS:
                case $j.types.dataTypes.STRINGLIST:
                    this._textValue = "(" + this.value._ClassName + ")";
                    if (this._dataType === $j.types.dataTypes.SIMPLECLASS) $j.CSS.addClass(this._html, "TVIHasChild");
                    break;
                case $j.types.dataTypes.ARRAY:
                    this._textValue = "[" + this.value.toString() + "]";
                    $j.CSS.addClass(this._html, "TVIHasChild");
                    break;
                case $j.types.dataTypes.COLOR:
                    this._textValue = ["<div class='DropDownListBoxColor_color' style='border: 1px solid rgb(0, 0, 0); background-color: ",
                        this.value.toRGBString(),
                        ";'></div>",
                        _colors.getColorName(this.value)].join(String.EMPTY);
                    $j.CSS.addClass(this._htmlValue, "color");
                    break;
                case $j.types.dataTypes.IMAGE:
                    if (this.value === String.EMPTY) this._textValue = "No image";
                    else this._textValue = this.value;
                    break;
                case $j.types.dataTypes.PATH:
                    if (!this.value) this._textValue = "No path";
                    else if (this.value.data.isEmpty()) this._textValue = "No path";
                    else this._textValue = this.value.getPathString();
                    break;
                case $j.types.dataTypes.DATE:
                    // a faire avec la locale
                    this._textValue = String(this.value);
                default:
                    this._textValue = String(this.value);
            }
            if (!this._showTextValue) this._textValue = String.EMPTY;
        }
        //#endregion
    });
    Object.seal(PropertyGridItem);
    //#endregion
    //#region PropertyGrid
    var PropertyGrid = $j.classes.ScrollControl.extend("PropertyGrid", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._content = null;
                this._leftPane = null;
                this._rightPane = null;
                this._down = false;
                this._downPos = new $j.classes.Point;
                this._lastDelta = new $j.classes.Point;
                this._visibleItems = [];
                this._VScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._VScrollBar.onChange.addListener(this.VScroll);
                this._VScrollBar.setAlign($j.types.aligns.MOSTRIGHT);
                this._scrollTop = 0;
                this._innerHeight = 0;
                this._offsetLevel = 10;
                this._VScrollAni = null;
                this._itemsHeight = 16;
                this._keyDir = $j.types.directions.LEFT;
                this._component = null;
                this._infoPanel = null;
                this._textBoxEd = $j.classes.createComponent($j.classes.TextBox, this, null);
                this._textBoxEd.setHeight(this._itemsHeight);
                this._textBoxEd.setMaxLength(128);
                this._spinBoxEd = $j.classes.createComponent($j.classes.SpinBox, this, null);
                this._spinBoxEd.setHeight(this._itemsHeight);
                this._spinBoxEd.setMax(65535);
                this._calendarEd = $j.classes.createComponent($j.classes.DropDownCalendar, this, null);
                this._calendarEd.setHeight(this._itemsHeight);
                this._dropDownListBoxEd = $j.classes.createComponent($j.classes.DropDownListBox, this, null);
                this._dropDownListBoxEd.setHeight(this._itemsHeight);
                this._textBoxBtnEd = $j.classes.createComponent($j.classes.TextBoxBtn, this, null);
                this._textBoxBtnEd.setHeight(this._itemsHeight);
                this._textBoxBtnEd._btns.first().onClick.addListener(this.launchEditor);
                this._colorBtnEd = $j.classes.createComponent($j.classes.ColorButton, this, null);
                this._colorBtnEd.setHeight(this._itemsHeight);
                this._currentEditor = null;
                this._designer = null;
                //#endregion
                $j.classes.newCollection(this, this, $j.classes.PropertyGridItem);
                this.setHitTest(true);
                this.itemIndex = -1;
                this.canFocused = true;
                this.hotTrack = false;
                this.mouseTracking = true;
                this.animated = true;
                this.selectedItem = null;
                this.onChange = new $j.classes.NotifyEvent(this);
                this.onSelectItem = new $j.classes.NotifyEvent(this);
                this.options = {
                    renderBackgroundGrid: false,
                    //showReadOnlyProperties:false,
                    boldNonDefaultValues: false,
                    showGutter: false
                };
                this.colors = {
                    Name: "#000",
                    "Non Default Value": _colors.NAVY.toRGBHexString(),
                    //readOnly:"#6D6D6D",
                    References: _colors.MAROON.toRGBHexString(),
                    SubProperties: _colors.GREEN.toRGBHexString(),
                    Value: _colors.NAVY.toRGBHexString()
                };
                this.onShowEditor = new $j.classes.NotifyEvent(this);
                this.filter = String.EMPTY;
            }
        },
        //#region Setter
        setItemIndex: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue > this.items.length) return;
            if (newValue < -1) newValue = -1;
            if (this.itemIndex !== newValue) {
                if (this.itemIndex > -1) this.deselectItemIndex();
                this.itemIndex = newValue;
                var item = this.items[this.itemIndex];
                if (item) item.setSelected(true);
                this.selectedItem = item;
                this.scrollToItem();
            }
        },
        setRenderBackgroundGrid: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.options.renderBackgroundGrid !== newValue) {
                this.options.renderBackgroundGrid = newValue;
                this.draw();
            }
        },
        setShowReadOnlyProperties: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.options.showReadOnlyProperties !== newValue) {
                this.options.showReadOnlyProperties = newValue;
                this.draw();
            }
        },
        setBoldNonDefaultValues: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.options.boldNonDefaultValues !== newValue) {
                this.options.boldNonDefaultValues = newValue;
                this.draw();
            }
        },
        setShowGutter: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.options.showGutter !== newValue) {
                this.options.showGutter = newValue;
                this.draw();
            }
        },
        setColors: function (newValue) {
            var keys = Object.keys(newValue), i;
            for (i = 0; i < keys.length; i++) {
                if (this.colors[keys[i]]) this.colors[keys[i]] = newValue[keys[i]];
            }
        },
        setFilter: function (filter) {
            if (typeof filter !== _const.STRING) filter = String.EMPTY;
            this.filter = filter;
            this.redraw();
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function (id) {
            if (this._HTMLElement) {
                this._content = this._HTMLElement.firstElementChild;
                this._content.jsObj = this;
                this._VScrollBar.getHTMLElement(this._HTMLElement.getElementsByClassName("ScrollBar")[0].id);
                this._VScrollBar.getChildsHTMLElement();
                this._VScrollBar.updateFromHTML();
                this._infoPanel = this._HTMLElement.getElementsByClassName("PropertyGridInfo")[0];
                this._leftPane = this._content.firstElementChild;
                this._leftPane.jsObj = this;
                $j.tools.events.bind(this._leftPane, $j.types.mouseEvents.MOVE, this.leftPaneMouseMove);
                $j.tools.events.bind(this._leftPane, $j.types.mouseEvents.DOWN, this.leftPaneMouseDown);
                this._rightPane = this._content.lastElementChild;
                this._rightPane.jsObj = this;
                $j.tools.events.bind(this._rightPane, $j.types.mouseEvents.MOVE, function () { if (!this.jsObj._down) $j.CSS.removeClass(this.jsObj._HTMLElement, $j.types.customCursors.COLRESIZE); });
                this._VScrollBar.smallChange = ~~(this._VScrollBar.viewportSize / 5);
                if (this._innerHeight < this._VScrollBar.max) this._innerHeight = this._VScrollBar.max;
                this._textBoxEd.getHTMLElement(this._HTMLElement.querySelector('.TextBox').id);// getElementsByClassName("TextBox")[0].id);
                this._textBoxEd.getChildsHTMLElement();
                this._textBoxEd.updateFromHTML();
                this._spinBoxEd.getHTMLElement(this._HTMLElement.querySelector('.SpinBox').id);// getElementsByClassName("SpinBox")[0].id);
                this._spinBoxEd.getChildsHTMLElement();
                this._spinBoxEd.updateFromHTML();
                this._dropDownListBoxEd.getHTMLElement(this._HTMLElement.querySelector('.DropDownListBox').id);// getElementsByClassName("DropDownListBox")[0].id);
                this._dropDownListBoxEd.getChildsHTMLElement();
                this._dropDownListBoxEd.updateFromHTML();
                this._calendarEd.getHTMLElement(this._HTMLElement.querySelector('.DropDownCalendar').id);// getElementsByClassName("DropDownCalendar")[0].id);
                this._calendarEd.getChildsHTMLElement();
                this._calendarEd.updateFromHTML();
                this._colorBtnEd.getHTMLElement(this._HTMLElement.querySelector('.ColorButton').id);// getElementsByClassName("ColorButton")[0].id);
                this._colorBtnEd.getChildsHTMLElement();
                this._colorBtnEd.updateFromHTML();
                this._textBoxBtnEd.getHTMLElement(this._HTMLElement.querySelector('.TextBoxBtn').id);// getElementsByClassName("TextBoxBtn")[0].id);
                this._textBoxBtnEd.getChildsHTMLElement();
                this._textBoxBtnEd.updateFromHTML();
                this.hideEditors();
            }
        },
        mouseMove: function () {
            if (this._down) this.leftPaneMouseMove.apply(this._leftPane, [$j.mouse.event]);
        },
        mouseUp: function () {
            this._down = false;
            $j.CSS.removeClass(this._HTMLElement, $j.types.customCursors.COLRESIZE);
        },
        leftPaneMouseMove: function (mouseEventArg) {
            var jsObj = this.jsObj, r, r1, newWidth;
            if (!jsObj.isEnabled()) return;
            if (jsObj._loading || jsObj.form._loading) return;
            $j.mouse.getMouseInfos(event);
            if (jsObj._down) {
                newWidth = jsObj._lastDelta.x + ($j.mouse.document.x - jsObj._downPos.x);
                if (newWidth > this.parentNode.offsetWidth - 50) newWidth = this.parentNode.offsetWidth - 50;
                this.style.width = newWidth + $j.types.CSSUnits.PX;
                jsObj._rightPane.style.left = this.offsetWidth + $j.types.CSSUnits.PX;
                if (jsObj.itemIndex > -1) {
                    jsObj._currentEditor.setWidth(jsObj._rightPane.offsetWidth);
                    jsObj._currentEditor.setLeft(jsObj._rightPane.offsetLeft);
                }
            } else {
                r = this.getBoundingClientRect();
                r1 = new $j.classes.Rect;
                r1.setValues(r.right - 5, r.top, r.right, r.bottom);
                $j.CSS.removeClass(jsObj._HTMLElement, $j.types.customCursors.COLRESIZE);
                if ($j.mouse.document.inRect(r1)) {
                    $j.CSS.addClass(jsObj._HTMLElement, $j.types.customCursors.COLRESIZE);
                }
            }
        },
        leftPaneMouseDown: function (mouseEventArg) {
            var jsObj = this.jsObj, r, r1;
            if (!jsObj.isEnabled()) return;
            if (jsObj._loading || jsObj.form._loading) return;
            $j.mouse.getMouseInfos(event);
            if ($j.mouse.button !== $j.types.mouseButtons.RIGHT) {
                r = this.getBoundingClientRect();
                r1 = new $j.classes.Rect;
                r1.setValues(r.right - 5, r.top, r.right, r.bottom);
                $j.CSS.removeClass(this, $j.types.customCursors.COLRESIZE);
                if ($j.mouse.document.inRect(r1)) {
                    jsObj._down = true;
                    jsObj._downPos.assign($j.mouse.document);
                    jsObj._lastDelta.setValues(this.offsetWidth, 0);
                }
            }
        },
        leftPaneMouseUp: function (mouseEventArg) {
            var jsObj = this.jsObj, r, r1;
            if (!jsObj.isEnabled()) return;
            if (jsObj._loading || jsObj.form._loading) return;
            jsObj._down = false;
        },
        addComponent: function (classe, parentNode, createItem) {
            var props, events, i, l, baseObj, initialValueDiff = false, excludedProps = ["name", "visible"], lastStart = 0, item,
                nonDirectProps = ['width', 'height', 'left', 'top', 'bitmap'], cssClass = String.EMPTY, reference = false, dataType, prop, items = [];
            if (!classe) return;
            if (!classe._ClassName) {
                if (!classe.jsObj) return;
                else classe = classe.jsObj;
            }
            createItem = !createItem ? true : createItem;
            if (!parentNode) this.clear();
            if (!parentNode) this._component = classe;
            if (parentNode) nonDirectProps.clear();
            if (classe instanceof $j.classes.Window) baseObj = new $j.classes["BaseWindow"](this.app);
            else baseObj = new $j.classes[classe._ClassName](this);
            props = classe.getProperties();
            i = 0;
            props.sort(function (a, b) {
                return a.property === b.property ? 0 : (a.property < b.property ? -1 : 1);
            });
            l = props.length;
            if (createItem) this.beginUpdate();
            for (; i < l; i++) {
                if (!baseObj[props[i].property] && nonDirectProps.indexOf(props[i].property) === -1) continue;
                reference = false;
                initialValueDiff = false;
                dataType = null;
                cssClass = String.EMPTY;
                if (baseObj[props[i].property] || nonDirectProps.indexOf(props[i].property) > -1) {
                    if (excludedProps.indexOf(props[i].property) === -1) {
                        if (typeof baseObj[props[i].property] === _const.OBJECT) {
                            if (baseObj[props[i].property]) {
                                if (baseObj[props[i].property].equals) {
                                    initialValueDiff = !baseObj[props[i].property].equals(classe[props[i].property]);
                                    //} else if (baseObj[props[i].property].isEmpty)) {
                                    //  initialValueDiff=!baseObj[props[i].property].isEmpty();
                                } else console.log("Can't compare values of " + props[i].property);
                            }
                        } else {
                            if (nonDirectProps.indexOf(props[i].property) > -1) {
                                initialValueDiff = true;
                                if (classe instanceof $j.classes.Window) {
                                    if (props[i].property === "left" || props[i].property === "top") props[i].value = ~~classe.getDataSetValue(props[i].property);
                                }
                            } else initialValueDiff = (baseObj[props[i].property] !== classe[props[i].property]);
                        }
                    }
                }
                if (!classe[props[i].property] || (classe[props[i].property] instanceof $j.classes.Component)) {
                    reference = true;
                    initialValueDiff = true;
                    dataType = $j.types.dataTypes.COMPONENTCLASS;
                }
                if (nonDirectProps.indexOf(props[i].property) > -1) {
                    reference = false;
                    dataType = (props[i].property !== 'bitmap') ? $j.types.dataTypes.NUMBER : $j.types.dataTypes.IMAGE;
                }
                if (classe[props[i].property] instanceof $j.classes.Color) dataType = $j.types.dataTypes.COLOR;
                if (!dataType) {
                    prop = classe[props[i].property];
                    switch (typeof prop) {
                        case _const.STRING:
                            if (prop.isBoolean()) dataType = $j.types.dataTypes.BOOLEAN;
                            else if (prop.isNumeric()) dataType = $j.types.dataTypes.NUMBER;
                            else if (classe._props[props[i].property]) dataType = $j.types.dataTypes.LIST;
                            else if (classe instanceof $j.classes.Memo && props[i].property === "text") dataType = $j.types.dataTypes.STRINGLIST;
                            else dataType = $j.types.dataTypes.STRING;
                            break;
                        case _const.OBJECT:
                            if (!prop || prop instanceof $j.classes.Component) dataType = $j.types.dataTypes.COMPONENTCLASS;
                            else if (Array.isArray(prop)) {
                                if (prop.isCollection) dataType = $j.types.dataTypes.COLLECTION;
                                else dataType = $j.types.dataTypes.ARRAY;
                            } else if (prop instanceof $j.classes.PathData) dataType = $j.types.dataTypes.PATH;
                            else if (prop instanceof Date) dataType = $j.types.dataTypes.DATE;
                            else if (prop instanceof $j.classes.StringList) dataType = $j.types.dataTypes.STRINGLIST;
                            else dataType = $j.types.dataTypes.SIMPLECLASS;
                            break;
                        case _const.BOOLEAN:
                            dataType = $j.types.dataTypes.BOOLEAN;
                            break;
                        case _const.NUMBER:
                            dataType = $j.types.dataTypes.NUMBER;
                            break;
                    }
                }
                if (createItem) {
                    item = new $j.classes.PropertyGridItem(this, parentNode);
                    item.text = props[i].property;
                    item.value = props[i].value;
                    item.height = this._itemsHeight;
                    item._top = lastStart;
                    item.cssClass = cssClass;
                    item._initialValueDiff = initialValueDiff;
                    item._isReference = reference;
                    item._dataType = dataType;
                } else {
                    items.push({ "text": props[i].property, "value": props[i].value, "height": this._itemsHeight, "_top": lastStart, "cssClass": cssClass, "_initialValueDiff": initialValueDiff, "_isReference": reference, "_dataType": dataType });
                }
                lastStart += this._itemsHeight;
            }
            if (createItem) this.endUpdate();
            //if (classe instanceof $j.classes.Component) events=classe.getEvents();
            baseObj.destroy();
            baseObj = null;
            if (!createItem) return items;
        },
        addComponents: function (arrayOfComponent) {
            var i, j, k, l = arrayOfComponent.length, items = [], currentItem, item, props = [], propCount, prop, propFilter, findedProps = [], clearPropValue;
            if (!Array.isArray(arrayOfComponent)) return;
            for (i = 0; i < l; i++) {
                items.push(this.addComponent(arrayOfComponent[i], null, false));
            }
            // on parcours les items
            for (i = 0; i < items.length; i++) {
                currentItem = items[i];
                for (k = 0; k < currentItem.length; k++) {
                    clearPropValue = false;
                    prop = currentItem[k].text;
                    propCount = 1;
                    for (j = 0; j < items.length; j++) {
                        if (j === i) continue;
                        propFilter = items[j].filter(function (e, i, a) {
                            return (e.text === prop);
                        });
                        if (propFilter.length > 0) {
                            propCount++;
                            if (currentItem[k].value.equals) clearPropValue = !currentItem[k].value.equals(propFilter.first().value);
                            else if (currentItem[k].value !== propFilter.first().value) clearPropValue = true;
                        }
                    }
                    if (propCount === arrayOfComponent.length) {
                        if (findedProps.indexOf(prop) === -1) {
                            findedProps.add(prop);
                            currentItem[k]._showTextValue = !clearPropValue;
                            props.add(currentItem[k]);
                        }
                    }
                }
            }
            this.beginUpdate();
            for (i = 0; i < props.length; i++) {
                item = new $j.classes.PropertyGridItem(this);
                item.text = props[i].text;
                item.value = props[i].value;
                item.height = props[i].height;
                item._top = props[i]._top;
                item.cssClass = props[i].cssClass;
                item._initialValueDiff = props[i]._initialValueDiff;
                item._isReference = props[i]._reference;
                item._dataType = props[i]._dataType;
                item._showTextValue = props[i]._showTextValue;
            }
            this.endUpdate();
        },
        clear: function () {
            var item;
            for (var i = 0, il = this._visibleItems.length; i < il; i++) {
                item = this._visibleItems[i];
                item.destroy();
            }
            this._visibleItems.clear();
            this.items.clear();
            this.itemIndex = -1;
            this._scrollTop = 0;
            this.hideEditors();
        },
        updateDataSet: function () {
            this._HTMLElement.dataset.renderbackgroundgrid = this.options.renderBackgroundGrid;
            this._HTMLElement.dataset.showreadonlyproperties = this.options.showReadOnlyProperties;
            this._HTMLElement.dataset.boldnondefaultvalues = this.options.boldNonDefaultValues;
            this._HTMLElement.dataset.showgutter = this.options.showGutter;
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.renderbackgroundgrid;
            if (data) this.options.renderBackgroundGrid = _conv.strToBool(data);
            data = this._HTMLElement.dataset.showreadonlyproperties;
            if (data) this.options.showReadOnlyProperties = _conv.strToBool(data);
            data = this._HTMLElement.dataset.boldnondefaultvalues;
            if (data) this.options.boldNonDefaultValues = _conv.strToBool(data);
            data = this._HTMLElement.dataset.showgutter;
            if (data) this.options.showGutter = _conv.strToBool(data);
            this.bindEventToHTML("onChange");
            this.bindEventToHTML("onSelectItem");
            this.bindEventToHTML("onShowEditor");
        },
        draw: function () {
            var oldVisibleItems = this._visibleItems, item, items, i, il, itemVisible = false, topIndex = 0, top;
            if (this.items.isEmpty()) {
                this.clearScrollBarCSS();
                $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
                return;
            }
            items = this.items.filter(function (e, i, a) {
                var visible = e.isVisible();
                if (e._owner.filter !== String.EMPTY) {
                    if (!e.text.contains(e._owner.filter)) visible = false;
                    if (e._level > 0) visible = true;
                }
                return visible;
            });
            this._scrollTop = $j.max($j.min(this._scrollTop, this._innerHeight - this._content.offsetHeight), 0);
            this._visibleItems = [];
            topIndex = ~~(this._scrollTop / this._itemsHeight);
            if (topIndex < 0) topIndex = 0;
            top = items[topIndex]._top;
            for (i = topIndex; i < items.length; i++) {
                item = items[i];
                if (!item._parentNodes.isEmpty()) {
                    if (!item._parentNodes.first().expanded) continue;
                }
                itemVisible = false;
                if (i > topIndex) item._top = top;
                if ((item._top + item.height >= this._scrollTop) && (item._top <= this._content.offsetHeight + this._scrollTop)) itemVisible = true;
                if (item._top - this._scrollTop > this._content.clientHeight) break;
                itemVisible = itemVisible && item.isVisible();
                if (itemVisible) {
                    item.draw();
                    this._visibleItems.push(item);
                    top += item.height;
                }
            }
            for (i = 0, il = oldVisibleItems.length; i < il; i++) {
                item = oldVisibleItems[i];
                if (this._visibleItems.indexOf(item) == -1) {
                    item.removeToHTML();
                }
            }
        },
        VScroll: function () {
            var jsObj = this._owner;
            if (jsObj.form._focusedControl !== jsObj) jsObj.setFocus();
            jsObj._scrollTop = jsObj._VScrollBar.value;
            jsObj.draw();
            if (jsObj._currentEditor) {
                if (jsObj._currentEditor.item._html) {
                    jsObj._currentEditor._HTMLElementStyle.top = $j.tools.getLeftTopFromTranslation(jsObj._currentEditor.item._htmlValue).top + $j.types.CSSUnits.PX;
                } else jsObj._currentEditor._HTMLElementStyle.top = "-100px";
            }
        },
        selectItem: function (mouseEventArg) {
            var item = this.jsObj, mat, propGrid, lboxItem, props;
            if (!item.enabled) return;
            if (!item._owner.enabled) return;
            propGrid = item._owner;
            if (propGrid._VScrollAni && propGrid._VScrollAni.running) return;
            $j.mouse.getMouseInfos(mouseEventArg);
            propGrid.setItemIndex(propGrid.items.indexOf(item));
            if (propGrid.canFocused && !propGrid._isFocused && (propGrid.form._focusedControl !== propGrid)) propGrid.setFocus();
            if (propGrid.onSelectItem.hasListener()) propGrid.onSelectItem.invoke();
            propGrid.hideEditors();
            // on affiche l'editeur
            switch (item._dataType) {
                case $j.types.dataTypes.COMPONENTCLASS:
                case $j.types.dataTypes.SIMPLECLASS:
                case $j.types.dataTypes.ARRAY:
                case $j.types.dataTypes.STRING:
                    propGrid._currentEditor = propGrid._textBoxEd;
                    propGrid._currentEditor.setText(item._textValue);
                    if (item._dataType === $j.types.dataTypes.STRING) propGrid._currentEditor.setReadOnly(false);
                    else propGrid._currentEditor.setReadOnly(true);
                    break;
                case $j.types.dataTypes.COLOR:
                    propGrid._currentEditor = propGrid._colorBtnEd;
                    propGrid._currentEditor.setColor(item.value);
                    break;
                case $j.types.dataTypes.NUMBER:
                    propGrid._currentEditor = propGrid._spinBoxEd;
                    if (item.text === "opacity") {
                        propGrid._currentEditor.valueType = $j.types.spinBoxTypes.FLOAT;
                        propGrid._currentEditor.setDecimalDigits(1);
                        propGrid._currentEditor.setIncrement(0.1);
                        propGrid._currentEditor.setMax(1);
                    } else {
                        propGrid._currentEditor.valueType = $j.types.spinBoxTypes.INTEGER;
                        propGrid._currentEditor.setDecimalDigits(0);
                        propGrid._currentEditor.setIncrement(1);
                        propGrid._currentEditor.setMax(65535);
                    }
                    propGrid._currentEditor.setValue(item.value);
                    break;
                case $j.types.dataTypes.BOOLEAN:
                case $j.types.dataTypes.LIST:
                    propGrid._currentEditor = propGrid._dropDownListBoxEd;
                    propGrid._currentEditor.items.clear();
                    propGrid._currentEditor.itemIndex = -1;
                    if (item._dataType === $j.types.dataTypes.BOOLEAN) {
                        lboxItem = new $j.classes.ListBoxItemPopup(propGrid._currentEditor, "false");
                        propGrid._currentEditor.items.add(lboxItem);
                        lboxItem = new $j.classes.ListBoxItemPopup(propGrid._currentEditor, "true");
                        propGrid._currentEditor.items.add(lboxItem);
                        propGrid._currentEditor.setItemIndex(item.value ? 1 : 0);
                    } else {
                        props = Object.keys(propGrid._component._props[item.text]);
                        props.sort();
                        mat = -1;
                        for (var i = 0, l = props.length; i < l; i++) {
                            lboxItem = new $j.classes.ListBoxItemPopup(propGrid._currentEditor, propGrid._component._props[item.text][props[i]]);
                            propGrid._currentEditor.items.add(lboxItem);
                            //propGrid._currentEditor.setItemIndex(item.value?1:0);
                            if (item.value === lboxItem.text) mat = i;
                        }
                        propGrid._currentEditor.setItemIndex(mat);
                    }
                    break;
                case $j.types.dataTypes.PATH:
                case $j.types.dataTypes.IMAGE:
                case $j.types.dataTypes.STRINGLIST:
                case $j.types.dataTypes.COLLECTION:
                    propGrid._currentEditor = propGrid._textBoxBtnEd;
                    propGrid._currentEditor.setText(item._textValue);
                    propGrid._currentEditor.setReadOnly(true);
                    break;
                case $j.types.dataTypes.DATE:
                    propGrid._currentEditor = propGrid._calendarEd;
                    propGrid._currentEditor.setDate(item.value);
            }
            propGrid._currentEditor._HTMLElementStyle.left = propGrid._rightPane.offsetLeft + $j.types.CSSUnits.PX;
            propGrid._currentEditor._HTMLElementStyle.top = $j.tools.getLeftTopFromTranslation(item._htmlValue).top + $j.types.CSSUnits.PX;
            propGrid._currentEditor.setWidth(propGrid._rightPane.offsetWidth);
            propGrid._currentEditor.setVisible(true);
            propGrid._currentEditor.setFocus();
            propGrid._currentEditor.item = item;
            propGrid._currentEditor.onChange.addListener(propGrid.changeValue);
            propGrid._currentEditor._propertyGrid = propGrid;
        },
        removeEditorsEvent: function () {
            this._textBoxEd.onChange.removeListener(this.changeValue);
            this._spinBoxEd.onChange.removeListener(this.changeValue);
            this._dropDownListBoxEd.onChange.removeListener(this.changeValue);
            this._calendarEd.onChange.removeListener(this.changeValue);
            this._colorBtnEd.onChange.removeListener(this.changeValue);
            this._textBoxBtnEd.onChange.removeListener(this.changeValue);
        },
        hideEditors: function () {
            this._textBoxEd.setVisible(false);
            this._spinBoxEd.setVisible(false);
            this._dropDownListBoxEd.setVisible(false);
            this._calendarEd.setVisible(false);
            this._colorBtnEd.setVisible(false);
            this._textBoxBtnEd.setVisible(false);
            this.removeEditorsEvent();
        },
        deselectItemIndex: function () {
            var item;
            if (this.itemIndex !== -1) {
                item = this.items[this.itemIndex];
                if (item) item.setSelected(false);
            }
            this.itemIndex = -1;
        },
        refreshInnerHeight: function () {
            var item, items, lastStart = 0;
            items = this.items.filter(function (e, i, a) {
                var visible = e.isVisible();
                if (e._owner.filter !== String.EMPTY) {
                    if (!e.text.contains(e._owner.filter)) visible = false;
                    if (e._level > 0) visible = true;
                }
                return visible;
            });
            this._innerHeight = 0;
            for (var i = 0, l = items.length; i < l; i++) {
                item = items[i];
                item._top = lastStart;
                this._innerHeight += item.height;
                lastStart += item.height;
            }
            if (this._allowUpdate) {
                this.updateVScrollBar();
                this.draw();
            }
        },
        deleteItem: function (item) {
            if (!(item instanceof $j.classes.PropertyGridItem)) return;
            if (this.items.indexOf(item) === -1) return;
            this.items.remove(item);
            if (this._allowUpdate) this.refreshInnerHeight();
        },
        deleteAt: function (index) {
            var item;
            if (index < 0 || index > this.items.length) return;
            item = this.items[index];
            this.items.removeAt(index);
            if (this._allowUpdate) this.refreshInnerHeight();
        },
        moveItem: function (itemToMove, itemBefore) {
            var s, l, i, t, l, start;
            if (!(itemToMove instanceof $j.classes.PropertyGridItem)) return;
            if (!(itemBefore instanceof $j.classes.PropertyGridItem)) return;
            s = itemToMove.getIndex() - 1;
            l = itemBefore.getIndex() + 1;
            this.items.remove(itemToMove);
            this.items.insert(itemBefore.getIndex() + 1, itemToMove);
            if (l > this.items.length) l = this.items.length;
            start = this.items[s]._top;
            for (i = s; i < l; i++) {
                this.items[i]._top = start;
                start += this.items[i].height;
            }
            if (this._visibleItems.indexOf(itemToMove) > -1) {
                if (this._allowUpdate) this.draw();
            }
        },
        beginUpdate: function () {
            this._allowUpdate = false;
            //this.items.beginUpdate();
        },
        endUpdate: function () {
            this._allowUpdate = true;
            this.refreshInnerHeight();
            //this.items.endUpdate();
        },
        updateVScrollBar: function () {
            this.clearScrollBarCSS();
            if (this._innerHeight > this._HTMLElement.offsetHeight) {
                this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                $j.CSS.addClass(this._HTMLElement, "scrollbars-vertical");
                this._VScrollBar.updateFromHTML();
                this._VScrollBar.setMax(this._innerHeight);
                this._VScrollBar.setViewportSize(this._content.offsetHeight);
            } else {
                this._HTMLElement.dataset.scrollbars, $j.types.scrollbars.NONE;
                $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
            }
        },
        clearScrollBarCSS: function () {
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-none");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-horizontal");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-vertical");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-both");
        },
        mouseWheel: function () {
            var data = this._HTMLElement.dataset.scrollbars;
            if (!this.isEnabled()) return;
            if (data === $j.types.scrollbars.VERTICAL) {
                this._VScrollBar.mouseWheel();
            }
        },
        createVScrollAni: function () {
            if (!this._VScrollAni) {
                this._VScrollAni = new $j.classes.FloatAnimation(this);
                this._VScrollAni.animationType = $j.types.animationTypes.OUT;
                this._VScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._VScrollAni.duration = 1;
                this._VScrollAni.control = this._VScrollBar;
                this._VScrollAni.propertyName = "value";
                this._VScrollAni.startFromCurrent = true;
                this._VScrollAni.convertToCSS = false;
            }
        },
        destroy: function () {
            this._inherited();
            while (this.items.length > 0) {
                this.items.last().destroy();
            }
            this._content = null;
            this._visibleItems.clear();
            this._visibleItems = null;
            this._VScrollBar = null;
            this._scrollTop = null;
            this._innerHeight = null;
            this._offsetLevel = null;
            this._lastDelta.destroy();
            this._lastDelta = null;
            this._downPos.destroy();
            this._downPos = null;
            //this._currentPos.destroy();
            //this._currentPos=null;
            this._down = null;
            this._VScrollAni = null;
            this.items.destroy();
            this.items = null;
            this._itemsHeight = null;
            this.itemIndex = null;
            this.hotTrack = null;
            this.mouseTracking = null;
            this.animated = null;
            this.onSelectItem.destroy();
            this.onSelectItem = null;
            this.onChange.destroy();
            this.onChange = null;
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_UP:
                    this._keyDir = $j.types.directions.LEFT;
                    this.setItemIndex(this.itemIndex - 1);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                case $j.types.VKeysCodes.VK_DOWN:
                    this._keyDir = $j.types.directions.RIGHT;
                    this.setItemIndex(this.itemIndex + 1);
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                    this.setItemIndex(0);
                    break;
                case $j.types.VKeysCodes.VK_END:
                    this.setItemIndex(this.items.length - 1);
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    this.setItemIndex(this.itemIndex - ~~(this._content.offsetHeight / this._itemsHeight));
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    this.setItemIndex(this.itemIndex + ~~(this._content.offsetHeight / this._itemsHeight));
                    break;
            }
        },
        scrollToItem: function () {
            var nbrVisibleItems, base, inVisibleItems, isFirst;
            inVisibleItems = this._visibleItems.indexOf(this.items[this.itemIndex]) === -1 || this._visibleItems.last() === this.items[this.itemIndex];
            isFirst = this._visibleItems.first() === this.items[this.itemIndex] || this._visibleItems.first() === this.items[this.itemIndex + 1];
            if (inVisibleItems && !isFirst) {
                nbrVisibleItems = ~~(this._content.offsetHeight / this._itemsHeight);
                base = ((nbrVisibleItems * this._itemsHeight) - this._content.offsetHeight) + this._itemsHeight;
                this._VScrollBar.setValue(base + ((this.itemIndex - nbrVisibleItems) * this._itemsHeight));
            } else if (isFirst) this._VScrollBar.setValue((this.itemIndex * this._itemsHeight));
        },
        findItem: function (text) {
            var items = this.items.filter(function (e, i, a) {
                return e.text === text;
            });
            if (items.length > 0) return items.first();
            else return null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{verticalScrollBar}"), tpl;
            tpl = this._VScrollBar.getTemplate();
            html = a.join(tpl);
            a = html.split("{TextBoxEd}");
            tpl = this._textBoxEd.getTemplate();
            html = a.join(tpl);
            a = html.split("{SpinBoxEd}");
            tpl = this._spinBoxEd.getTemplate();
            html = a.join(tpl);
            a = html.split("{DropDownCalendar}");
            tpl = this._calendarEd.getTemplate();
            html = a.join(tpl);
            a = html.split("{DropDownListBoxEd}");
            tpl = this._dropDownListBoxEd.getTemplate();
            html = a.join(tpl);
            a = html.split("{TextBoxBtnEd}");
            tpl = this._textBoxBtnEd.getTemplate();
            html = a.join(tpl);
            a = html.split("{ColorBtnEd}");
            tpl = this._colorBtnEd.getTemplate();
            html = a.join(tpl);
            return html;
        },
        changeValue: function () {
            var propGrid = this._propertyGrid, realValue, i, l, comp, prop, value, parentNode, j, m, arrayVal = [];
            prop = propGrid.items[propGrid.itemIndex].text;
            l = propGrid._designer.selectionMgr._list.length;
            switch (propGrid._currentEditor._ClassName) {
                case "TextBox":
                    value = propGrid._currentEditor._inputObj.value;
                    propGrid.items[propGrid.itemIndex].setValue(value);
                    for (i = 0; i < l; i++) {
                        comp = propGrid._designer.selectionMgr._list[i];
                        if (typeof comp["set" + prop.firstCharUpper()] === _const.FUNCTION) comp["set" + prop.firstCharUpper()](value);
                        else if (typeof comp.setText === _const.FUNCTION) comp.setText(value);
                        else if (typeof comp.setCaption === _const.FUNCTION) comp.setCaption(value);
                    }
                    break;
                case "SpinBox":
                    value = propGrid._currentEditor._inputObj.value;
                    if ($j.isNumber(value) && value.contains('.')) propGrid.items[propGrid.itemIndex].setValue(parseFloat(value));
                    else propGrid.items[propGrid.itemIndex].setValue(~~value);
                    for (i = 0; i < l; i++) {
                        comp = propGrid._designer.selectionMgr._list[i];
                        if (propGrid.items[propGrid.itemIndex]._parentNodes.length > 0) {
                            parentNode = propGrid.items[propGrid.itemIndex]._parentNodes.first();
                            switch (parentNode._dataType) {
                                case $j.types.dataTypes.SIMPLECLASS:
                                    if (typeof parentNode.value["set" + prop.firstCharUpper()] === _const.FUNCTION) parentNode.value["set" + prop.firstCharUpper()](~~value);
                                    break;
                            }
                        } else {
                            if (prop.toLowerCase() === "opacity") comp._HTMLElement.dataset.opacity = value;
                            else if (typeof comp["set" + prop.firstCharUpper()] === _const.FUNCTION) comp["set" + prop.firstCharUpper()](~~value);
                            else if (typeof comp.setValue === _const.FUNCTION) {
                                comp.setValue(~~value);
                            }
                        }
                    }
                    break;
                case "DropDownListBox":
                    value = propGrid._currentEditor.text;
                    for (i = 0; i < l; i++) {
                        comp = propGrid._designer.selectionMgr._list[i];
                        switch (propGrid.items[propGrid.itemIndex]._dataType) {
                            case $j.types.dataTypes.BOOLEAN:
                                propGrid.items[propGrid.itemIndex].setValue(_conv.strToBool(value));
                                if (propGrid.items[propGrid.itemIndex]._parentNodes.length > 0) {
                                    parentNode = propGrid.items[propGrid.itemIndex]._parentNodes.first();
                                    if (typeof comp["set" + parentNode.text.firstCharUpper()] === _const.FUNCTION) {
                                        switch (parentNode._dataType) {
                                            case $j.types.dataTypes.ARRAY:
                                                m = parentNode.items.length;
                                                i = 0;
                                                prop = String.EMPTY;
                                                for (j = 0; j < m; j++) {
                                                    if (parentNode.items[j].value) {
                                                        arrayVal[i] = parentNode.items[j].text;
                                                        if (prop !== String.EMPTY) prop += ",";
                                                        prop += parentNode.items[j].text
                                                        i++;
                                                    }
                                                }
                                                propGrid.items[propGrid.itemIndex]._parentNodes.last().setValue(prop.split(","));
                                                comp["set" + parentNode.text.firstCharUpper()](arrayVal);
                                                break;
                                            case $j.types.dataTypes.SIMPLECLASS:
                                                if (typeof parentNode.value["set" + prop.firstCharUpper()] === _const.FUNCTION) parentNode.value["set" + prop.firstCharUpper()](_conv.strToBool(value));
                                                break;
                                        }
                                    }
                                } else {
                                    if (prop.toLowerCase() === "visible") comp._HTMLElement.dataset.visible = value;
                                    else if (typeof comp["set" + prop.firstCharUpper()] === _const.FUNCTION) comp["set" + prop.firstCharUpper()](_conv.strToBool(value));
                                }
                                break;
                            case $j.types.dataTypes.LIST:
                                propGrid.items[propGrid.itemIndex].setValue(value);
                                if (typeof comp["set" + prop.firstCharUpper()] === _const.FUNCTION) comp["set" + prop.firstCharUpper()](value);
                                break;
                        }
                    }
                    break;
                case "ColorButton":
                    comp = propGrid._currentEditor;
                    propGrid.items[propGrid.itemIndex].setValue(comp.color);
                    for (i = 0; i < l; i++) {
                        comp = propGrid._designer.selectionMgr._list[i];
                        comp.update();
                    }
                    break;
                case "DropDownCalendar":
                    comp = propGrid._currentEditor;
                    // faire en fonction de la locale
                    propGrid.items[propGrid.itemIndex].setValue(comp.text);
                    for (i = 0; i < l; i++) {
                        comp = propGrid._designer.selectionMgr._list[i];
                        comp.setDate(propGrid._currentEditor.date);
                        comp.update();
                    }
                    break;
            }
            propGrid._designer.selectionMgr.drawSelectedParts();
        },
        redraw: function () {
            this.refreshInnerHeight();
        },
        expandAll: function () {
            var items, i, l;
            items = this.items.filter(function (e, i, a) {
                return !e.isExpanded();
            });
            for (i = 0, l = items.length; i < l; i++) {
                items[i].expanded = true;
            }
            this.refreshInnerHeight();
        },
        collapseAll: function () {
            var items, i, l;
            items = this.items.filter(function (e, i, a) {
                return e.isExpanded();
            });
            for (i = 0, l = items.length; i < l; i++) {
                items[i].expanded = false;
            }
            this.refreshInnerHeight();
        },
        launchEditor: function () {
            var propertyGrid = this._owner.item._owner, item = this._owner.item, compItemClass;
            if (item._dataType !== $j.types.dataTypes.COLLECTION) {
                if ($j.classes.propertiesEditors[item._dataType]) Application.newWindow($j.classes.propertiesEditors[item._dataType], false, propertyGrid.afterWindowCreated);
            } else {
                if (typeof item.value._itemClass === _const.FUNCTION) {
                    compItemClass = $j.classes.getClassName(item.value._itemClass);
                    if ($j.classes.componentsEditors[compItemClass]) {
                        Application.newWindow($j.classes.componentsEditors[compItemClass], false, propertyGrid.afterWindowCreated);
                    }
                } else if (typeof item.value._itemClass === _const.STRING) {
                    // on lance le StringListEditor
                    Application.newWindow($j.classes.propertiesEditors[$j.types.dataTypes.STRINGLIST], false, propertyGrid.afterWindowCreated);
                }
            }
        },
        afterWindowCreated: function (window) {
            var propertyGrid = window.app.activeWindow._focusedControl.item._owner;
            window._currentEditor = propertyGrid._currentEditor;
            window.show();
        }
        //#endregion
    });
    //#endregion
    Object.seal(PropertyGrid);
    $j.classes.register($j.types.categories.INTERNAL, PropertyGridItem);
    $j.classes.register($j.types.categories.EXTRAS, PropertyGrid);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var PropertyGridTpl = "<div id='{internalId}' data-name='{name}' data-class='PropertyGrid' class='Control PropertyGrid {theme} scrollbars-none orientation-vertical' data-scrollbars='none' data-orientation='vertical' style='width:225px;height:200px;'>\
                         <div class='PropertyGridLeftContent {theme}'></div>\
                         <div class='PropertyGridRightContent {theme}'></div>\
                         <div class='Control PropertyGridContent {theme}'>\
                         </div>\
                         {verticalScrollBar}\
                         <div class='Control PropertyGridInfo {theme}'></div>\
                         {TextBoxEd}{SpinBoxEd}{DropDownListBoxEd}{DropDownCalendar}{TextBoxBtnEd}{ColorBtnEd}\
                         </div>";
        $j.classes.registerTemplates([{ Class: PropertyGrid, template: PropertyGridTpl }]);
    }
    //#endregion
})();