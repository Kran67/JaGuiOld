//#region Import
import { ScrollBox } from '/scripts/components/containers/scrollbox.js';
import { BaseClass } from '/scripts/core/baseclass.js';
import { HitTest } from '/scripts/core/hittest.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region ListBoxItem
const ListBoxItem = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class ListBoxItem
    class ListBoxItem extends BaseClass {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.owner = owner;
                priv.html = null;
                priv.check = null;
                priv.icon = null;
                priv.text = null;
                priv.left = 0;
                priv.top = 0;
                priv.stopEvent = true;
                priv.props = {};
                priv.text = text;
                priv.height = owner.itemsHeight;
                priv.isChecked = false;
                priv.isHeader = false;
                priv.enabled = true;
                priv.form = owner.form;
                priv.selected = false;
                priv.hitTest = new HitTest;
                priv.hitTest.mouseWheel = true;
                priv.css = String.EMPTY;
                priv.isAlternate = false;
                priv.imageIndex = -1;
                priv.image = String.EMPTY;
                priv.cssImage = String.EMPTY;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'state',
                    enum: Types.CHECKBOXSTATES,
                    forceUpdate: true,
                    variable: priv,
                    value: Types.CHECKBOXSTATES.UNCHECKED
                });

                priv.allowGrayed = false;
                //this.onDraw = new $j.classes.NotifyEvent(this);
                if (owner instanceof ListBox) {
                    if (owner.allowUpdate) {
                        owner.updateScrollBar();
                        owner.draw();
                    }
                }
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region isChecked
        get isChecked() {
            return internal(this).isChecked;
        }
        set isChecked(newValue) {
            const checkboxStates = Types.CHECKBOXSTATES;
            if (Tools.isBool(newValue)) {
                if (priv.allowGrayed) {
                    switch (priv.state) {
                        case checkboxStates.UNCHECKED:
                            priv.state = CHECKBOXSTATES.GRAYED;
                            newValue = false;
                            break;
                        case checkboxStates.GRAYED:
                            priv.state = checkboxStates.CHECKED;
                            newValue = true;
                            break;
                        case checkboxStates.CHECKED:
                            priv.state = checkboxStates.UNCHECKED;
                            newValue = false;
                            break;
                    }
                }
                else if (newValue) {
                    priv.state = checkboxStates.CHECKED;
                }
                else {
                    priv.state = checkboxStates.UNCHECKED;
                }
                if (priv.isChecked !== newValue) {
                    priv.isChecked = newValue;
                    if (priv.owner.loading && priv.owner.form.loading) {
                        if (!Core.isHTMLRenderer) {
                            if (priv.owner.allowUpdate) {
                                priv.owner.update();
                            }
                            this.redraw();
                        } else {
                            this.update();
                        }
                    }
                }
            }
        }
        //#endregion isChecked
        //#region isHeader
        get isHeader() {
            return internal(this).isHeader;
        }
        set isHeader(newValue) {
            if (Tools.isBool(newValue)) {
                if (priv.isHeader !== newValue) {
                    priv.isHeader = newValue;
                    this.update();
                }
            }
        }
        //#endregion isHeader
        //#region enabled
        set enabled() {
            return internal(this).enabled;
        }
        set enabled(newValue) {
            if (Tools.isBool(newValue)) {
                if (priv.enabled !== newValue) {
                    priv.enabled = newValue;
                    this.update();
                }
            }
        }
        //#endregion enabled
        //#region height
        get height() {
            return internal(this).height;
        }
        set height(newValue) {
            if (Tools.isNumber(newValue)) {
                if (priv.HTMLElement.offsetHeight !== newValue) {
                    priv.height  = newValue;
                    priv.owner.refreshInnerHeight();
                }
            }
        }
        //#endregion height
        //#region text
        get text() {
            return internal(this).text;
        }
        set text(newValue) {
            if (Tools.isString(newValue)) {
                if (priv.text !== newValue) {
                    priv.text = newValue;
                    this.update();
                }
            }
        }
        //#endregion text
        //#region selected
        get selected() {
            return internal(this).selected;
        }
        set selected(newValue) {
            if (Tools.isBool(newValue)) {
                if (!priv.isHeader && priv.enabled) {
                    if (priv.selected !== newValue) {
                        priv.selected = newValue;
                        this.update();
                    }
                }
            }
        }
        //#endregion selected
        //#region imageIndex
        get imageIndex() {
            return internal(this).imageIndex;
        }
        set imageIndex(newValue) {
            if (Tools.isNumber(newValue)) {
                if (priv.imageIndex !== newValue) {
                    priv.imageIndex = newValue;
                    if (priv.owner.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion imageIndex
        //#region cssImage
        get cssImage() {
            return internal(this).cssImage;
        }
        set cssImage(newValue) {
            if (Tools.isString(newValue)) {
                if (priv.cssImage !== newValue) {
                    priv.cssImage = newValue;
                    if (priv.owner.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion cssImage
        //#region image
        get image() {
            return internal(this).image;
        }
        set image(newValue) {
            if (Tools.isString(newValue)) {
                if (priv.image !== newValue) {
                    priv.image = newValue;
                    if (priv.owner.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion image
        //#region index
        index() {
            return priv.owner.items.indexOf(this);
        }
        //#endregion index
        //#region isEnabled
        isEnabled() {
            return priv.enabled && priv.owner.isEnabled;
        }
        //#endregion isEnabled
        //#endregion Getters / Setters
        //#region Methods
        mouseMove() {
            priv.owner.mouseMove();
        }
        mouseEnter = Tools.emptyFunc
        mouseLeave = Tools.emptyFunc
        mouseDown() {
            priv.owner.mouseDown();
        }
        mouseUp() {
            priv.owner.mouseUp();
        }
        mouseWheel() {
            if (priv.owner.orientation === Types.ORIENTATIONS.VERTICAL) {
                priv.owner.VScrollBar.mouseWheel();
            }
            else {
                priv.owner._HScrollBar.mouseWheel();
            }
        }
        update() {
            if (this._html) {
                if (this._owner.orientation === $j.types.orientations.VERTICAL) this._html.style.height = this._owner.itemsHeight + $j.types.CSSUnits.PX;
                else this._html.style.lineHeight = this._html.offsetHeight + $j.types.CSSUnits.PX;
                this._text.style.height = this._html.offsetHeight + $j.types.CSSUnits.PX;
                this._text.style.lineHeight = this._html.offsetHeight + $j.types.CSSUnits.PX;
                $j.CSS.removeClass(this._html, "disabled alternate isheader selected");
                if (!this.enabled) $j.CSS.addClass(this._html, "disabled");
                if (this._owner.viewCheckboxes) {
                    $j.CSS.removeClass(this._check, "grayed checked");
                    if (this._check) $j.CSS.removeClass(this._check, "checked");
                    if (this.isChecked) $j.CSS.addClass(this._check, "checked");
                    else if (this.allowGrayed && this.state === $j.types.checkboxStates.GRAYED) $j.CSS.addClass(this._check, "grayed");
                }
                if (this.isAlternate) $j.CSS.addClass(this._html, "alternate");
                if (this.isHeader) $j.CSS.addClass(this._html, "isheader");
                if (this.selected) {
                    $j.CSS.addClass(this._html, "selected");
                    $j.CSS.removeClass(this._html, "alternate");
                }
                if (this._icon) {
                    $j.CSS.addClass(this._icon, "icon");
                    if (this.cssImage !== String.EMPTY) {
                        $j.CSS.addClass(this._icon, this.cssImage);
                        this._icon.style.backgroundSize = this._owner.itemsHeight + $j.types.CSSUnits.PX + String.SPACE + this._owner.itemsHeight + $j.types.CSSUnits.PX;
                    } else if (this.image !== String.EMPTY) {
                        this._icon.style.backgroundImage = 'url(' + this.image + ')';
                        this._icon.style.backgroundSize = this._owner.itemsHeight + $j.types.CSSUnits.PX + String.SPACE + this._owner.itemsHeight + $j.types.CSSUnits.PX;
                    } else if (this._owner.images) {
                        if (this.imageIndex < this._owner.images._images.length && this.imageIndex > -1) {
                            this._icon.style.backgroundImage = 'url(' + this._owner.images._images[this.imageIndex] + ')';
                            this._icon.style.backgroundSize = this._owner.images.imageWidth + $j.types.CSSUnits.PX + String.SPACE + this._owner.images.imageHeight + $j.types.CSSUnits.PX;
                        }
                    }
                }
                this.updateDataSet();
            }
        },
            updateDataSet: function () {
            this._html.dataset.height = this._html.offsetHeight;
            this._html.dataset.ischecked = (this.allowGrayed ? this.state === $j.types.checkboxStates.CHECKED : this.isChecked);
            this._html.dataset.isheader = this.isHeader;
            this._html.dataset.selected = this.selected;
            this._html.dataset.enabled = this.enabled;
            this._html.dataset.idx = this.getIndex();
            this._html.dataset.alternate = this.isAlternate;
            this._html.dataset.state = this.state;
            this._html.dataset.image = this.image;
            this._html.dataset.cssimage = this.cssImage;
            this._html.dataset.imageindex = this.imageIndex;
        },
        draw(alternate) {
            if (!this._html) {
                this._html = $j.doc.createElement($j.types.HTMLElements.DIV);
                if (this._owner.viewCheckboxes) {
                    this._check = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._check.jsObj = this;
                    $j.CSS.addClass(this._check, "CheckboxCheck" + String.SPACE + this._owner.getThemeName() + String.SPACE + "Control");
                    this._html.appendChild(this._check);
                }
                if (this._owner.images || this.image !== String.EMPTY || this.cssImage !== String.EMPTY) {
                    this._icon = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._icon.jsObj = this;
                    this._html.appendChild(this._icon);
                }
                this._text = $j.doc.createElement($j.types.HTMLElements.SPAN);
                $j.CSS.addClass(this._text, this._ClassName + "Caption");
                this._text.innerHTML = this.text;
                this._html.appendChild(this._text);
                this._html.jsObj = this;
                $j.CSS.addClass(this._html, "Control");
                this.isAlternate = (alternate ? (this.getIndex() % 2 != 0) : false);
                $j.CSS.addClass(this._html, this._ClassName + String.SPACE + this._owner.getThemeName());
                if (this._owner.orientation === $j.types.orientations.VERTICAL) $j.CSS.addClass(this._html, "VListBoxItem");
                else $j.CSS.addClass(this._html, "HListBoxItem");
                this._owner._content.appendChild(this._html);
                $j.tools.events.bind(this._html, $j.types.mouseEvents.CLICK, this._owner.selectItem);
            }
            this.update();
            if (this._owner.orientation === $j.types.orientations.VERTICAL) this._html.style.transform = "translateY(" + (this._top - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            else this._html.style.transform = "translateX(" + (this._left - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            if (this.css !== String.EMPTY) {
                var cssPropsValues = this.css.split(";");
                for (var i = 0, l = cssPropsValues.length; i < l; i++) {
                    var cssPropValue = cssPropsValues[i].split(":");
                    this._html.style[cssPropValue[0]] = cssPropValue[1];
                }
            }
            this._owner.onDrawItem.invoke(this);
        }
        removeToHTML() {
            if (priv.html) {
                Events.unBind(priv.html, Mouse.mouseEvents.CLICK, priv.owner.selectItem);
                //if (this._icon)) this._html.removeChild(this._icon);
                //this._html.removeChild(this._text);
                priv.owner.HTMLElement.removeChild(priv.html);
                priv.html = null;
                priv.icon = null;
                priv.text = null;
            }
        }
        destroy() {
            this.removeToHTML();
            priv.owner.items.remove(this);
            priv.owner = null;
            priv.left = null;
            priv.top = null;
            priv.text = null;
            priv.height = null;
            priv.isChecked = null;
            priv.isHeader = null;
            priv.enabled = null;
            priv.form = null;
            priv.selected = null;
            priv.hitTest.destroy();
            priv.hitTest = null;
            priv.css = null;
            priv.isAlternate = null;
            priv.state = null;
            priv.allowGrayed = null;
            priv.imageIndex = null;
            priv.image = null;
            priv.cssImage = null;
            //this.onDraw.destroy();
            //this.onDraw = null;
            super.destroy();
        }
        clone() {
            const clone = Object.create(this);
            //clone.hitTest = { mouseWheel: true };
            //clone.onDraw = new $j.classes.NotifyEvent(clone);
            //this.onDraw.copyListenerTo(clone.onDraw);
            return clone;
        }
        //#endregion Methods
    }
    return ListBoxItem;
    //#endregion ListBoxItem
})();
Object.seal(ListBoxItem);
//#endregion ListBoxItem

/*(function () {
    //#region ListBoxItem
    var ListBoxItem = Class.extend("ListBoxItem", {
        init: function (owner, text) {
            if (owner) {
                //#region Private
                this._owner = owner;
                this._html = null;
                this._check = null;
                this._icon = null;
                this._text = null;
                this._left = 0;
                this._top = 0;
                this._stopEvent = true;
                this._props = {};
                //#endregion
                this.text = text;
                this.height = owner.itemsHeight;
                this.isChecked = false;
                this.isHeader = false;
                this.enabled = true;
                this.form = owner.form;
                this.selected = false;
                this.hitTest = { mouseWheel: true };
                this.css = String.EMPTY;
                this.isAlternate = false;
                this.imageIndex = -1;
                this.image = String.EMPTY;
                this.cssImage = String.EMPTY;
                $j.tools.addPropertyFromSet(this, "state", $j.types.checkboxStates, $j.types.checkboxStates.UNCHECKED);
                this.allowGrayed = false;
                //this.onDraw = new $j.classes.NotifyEvent(this);
                if (owner instanceof $j.classes.ListBox) {
                    if (owner._allowUpdate) {
                        owner.updateScrollBar();
                        owner.draw();
                    }
                }
            }
        },
        //#region Setters
        setIsChecked: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.allowGrayed) {
                switch (this.state) {
                    case $j.types.checkboxStates.UNCHECKED:
                        this.state = $j.types.checkboxStates.GRAYED;
                        newValue = false;
                        break;
                    case $j.types.checkboxStates.GRAYED:
                        this.state = $j.types.checkboxStates.CHECKED;
                        newValue = true;
                        break;
                    case $j.types.checkboxStates.CHECKED:
                        this.state = $j.types.checkboxStates.UNCHECKED;
                        newValue = false;
                        break;
                }
            }
            else if (newValue) this.state = $j.types.checkboxStates.CHECKED;
            else this.state = $j.types.checkboxStates.UNCHECKED;
            if (this.isChecked !== newValue) {
                this.isChecked = newValue;
                if (this._loading || this.form._loading) return;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                } else this.update();
            }
        },
        setIsHeader: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.isHeader !== newValue) {
                this.isHeader = newValue;
                this.update();
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this.enabled = newValue;
                this.update();
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetHeight !== newValue) {
                this._inherited(newValue);
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
        setSelected: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.isHeader || !this.enabled) return;
            if (this.selected !== newValue) {
                this.selected = newValue;
                this.update();
            }
        },
        setImageIndex: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.imageIndex !== newValue) {
                this.imageIndex = newValue;
                if (this._owner._allowUpdate) {
                    this.update();
                }
            }
        },
        setCssImage: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.cssImage !== newValue) {
                this.cssImage = newValue;
                if (this._owner._allowUpdate) this.update();
            }
        },
        setImage: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.image !== newValue) {
                this.image = newValue;
                if (this._owner._allowUpdate) this.update();
            }
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
            if (this._owner.orientation === $j.types.orientations.VERTICAL) this._owner._VScrollBar.mouseWheel();
            else this._owner._HScrollBar.mouseWheel();
        },
        update: function () {
            if (this._html) {
                if (this._owner.orientation === $j.types.orientations.VERTICAL) this._html.style.height = this._owner.itemsHeight + $j.types.CSSUnits.PX;
                else this._html.style.lineHeight = this._html.offsetHeight + $j.types.CSSUnits.PX;
                this._text.style.height = this._html.offsetHeight + $j.types.CSSUnits.PX;
                this._text.style.lineHeight = this._html.offsetHeight + $j.types.CSSUnits.PX;
                $j.CSS.removeClass(this._html, "disabled alternate isheader selected");
                if (!this.enabled) $j.CSS.addClass(this._html, "disabled");
                if (this._owner.viewCheckboxes) {
                    $j.CSS.removeClass(this._check, "grayed checked");
                    if (this._check) $j.CSS.removeClass(this._check, "checked");
                    if (this.isChecked) $j.CSS.addClass(this._check, "checked");
                    else if (this.allowGrayed && this.state === $j.types.checkboxStates.GRAYED) $j.CSS.addClass(this._check, "grayed");
                }
                if (this.isAlternate) $j.CSS.addClass(this._html, "alternate");
                if (this.isHeader) $j.CSS.addClass(this._html, "isheader");
                if (this.selected) {
                    $j.CSS.addClass(this._html, "selected");
                    $j.CSS.removeClass(this._html, "alternate");
                }
                if (this._icon) {
                    $j.CSS.addClass(this._icon, "icon");
                    if (this.cssImage !== String.EMPTY) {
                        $j.CSS.addClass(this._icon, this.cssImage);
                        this._icon.style.backgroundSize = this._owner.itemsHeight + $j.types.CSSUnits.PX + String.SPACE + this._owner.itemsHeight + $j.types.CSSUnits.PX;
                    } else if (this.image !== String.EMPTY) {
                        this._icon.style.backgroundImage = 'url(' + this.image + ')';
                        this._icon.style.backgroundSize = this._owner.itemsHeight + $j.types.CSSUnits.PX + String.SPACE + this._owner.itemsHeight + $j.types.CSSUnits.PX;
                    } else if (this._owner.images) {
                        if (this.imageIndex < this._owner.images._images.length && this.imageIndex > -1) {
                            this._icon.style.backgroundImage = 'url(' + this._owner.images._images[this.imageIndex] + ')';
                            this._icon.style.backgroundSize = this._owner.images.imageWidth + $j.types.CSSUnits.PX + String.SPACE + this._owner.images.imageHeight + $j.types.CSSUnits.PX;
                        }
                    }
                }
                this.updateDataSet();
            }
        },
        updateDataSet: function () {
            this._html.dataset.height = this._html.offsetHeight;
            this._html.dataset.ischecked = (this.allowGrayed ? this.state === $j.types.checkboxStates.CHECKED : this.isChecked);
            this._html.dataset.isheader = this.isHeader;
            this._html.dataset.selected = this.selected;
            this._html.dataset.enabled = this.enabled;
            this._html.dataset.idx = this.getIndex();
            this._html.dataset.alternate = this.isAlternate;
            this._html.dataset.state = this.state;
            this._html.dataset.image = this.image;
            this._html.dataset.cssimage = this.cssImage;
            this._html.dataset.imageindex = this.imageIndex;
        },
        getIndex: function () {
            return this._owner.items.indexOf(this);
        },
        isEnabled: function () {
            return this.enabled && this._owner.isEnabled();
        },
        draw: function (alternate) {
            if (!this._html) {
                this._html = $j.doc.createElement($j.types.HTMLElements.DIV);
                if (this._owner.viewCheckboxes) {
                    this._check = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._check.jsObj = this;
                    $j.CSS.addClass(this._check, "CheckboxCheck" + String.SPACE + this._owner.getThemeName() + String.SPACE + "Control");
                    this._html.appendChild(this._check);
                }
                if (this._owner.images || this.image !== String.EMPTY || this.cssImage !== String.EMPTY) {
                    this._icon = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._icon.jsObj = this;
                    this._html.appendChild(this._icon);
                }
                this._text = $j.doc.createElement($j.types.HTMLElements.SPAN);
                $j.CSS.addClass(this._text, this._ClassName + "Caption");
                this._text.innerHTML = this.text;
                this._html.appendChild(this._text);
                this._html.jsObj = this;
                $j.CSS.addClass(this._html, "Control");
                this.isAlternate = (alternate ? (this.getIndex() % 2 != 0) : false);
                $j.CSS.addClass(this._html, this._ClassName + String.SPACE + this._owner.getThemeName());
                if (this._owner.orientation === $j.types.orientations.VERTICAL) $j.CSS.addClass(this._html, "VListBoxItem");
                else $j.CSS.addClass(this._html, "HListBoxItem");
                this._owner._content.appendChild(this._html);
                $j.tools.events.bind(this._html, $j.types.mouseEvents.CLICK, this._owner.selectItem);
            }
            this.update();
            if (this._owner.orientation === $j.types.orientations.VERTICAL) this._html.style.transform = "translateY(" + (this._top - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            else this._html.style.transform = "translateX(" + (this._left - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            if (this.css !== String.EMPTY) {
                var cssPropsValues = this.css.split(";");
                for (var i = 0, l = cssPropsValues.length; i < l; i++) {
                    var cssPropValue = cssPropsValues[i].split(":");
                    this._html.style[cssPropValue[0]] = cssPropValue[1];
                }
            }
            this._owner.onDrawItem.invoke(this);
        },
        removeToHTML: function () {
            if (this._html) {
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.CLICK, this._owner.selectItem);
                //if (this._icon)) this._html.removeChild(this._icon);
                //this._html.removeChild(this._text);
                this._owner._content.removeChild(this._html);
                this._html = null;
                this._icon = null;
                this._text = null;
            }
        },
        destroy: function () {
            this.removeToHTML();
            this._owner.items.remove(this);
            this._owner = null;
            this._left = null;
            this._top = null;
            this.text = null;
            this.height = null;
            this.isChecked = null;
            this.isHeader = null;
            this.enabled = null;
            this.form = null;
            this.selected = null;
            this.hitTest.mouseWheel = null;
            this.hitTest = null;
            this.css = null;
            this.isAlternate = null;
            this.state = null;
            this.allowGrayed = null;
            this.imageIndex = null;
            this.image = null;
            this.cssImage = null;
            this._text = null;
            //this.onDraw.destroy();
            //this.onDraw = null;
        },
        clone: function () {
            var clone = Object.create(this);
            clone.hitTest = { mouseWheel: true };
            //clone.onDraw = new $j.classes.NotifyEvent(clone);
            //this.onDraw.copyListenerTo(clone.onDraw);
            return clone;
        }
        //#endregion
    });
    Object.seal(ListBoxItem);
    //#endregion
    //#region ListBox
    var ListBox = $j.classes.ScrollControl.extend("ListBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._content = null;
                this._visibleItems = [];
                this._scrollTop = 0;
                this._innerHeight = 0;
                this._VScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._VScrollBar.onChange.addListener(this.VScroll);
                this._VScrollBar.setAlign($j.types.aligns.MOSTRIGHT);
                this._HScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._HScrollBar.onChange.addListener(this.HScroll);
                this._HScrollBar.setAlign($j.types.aligns.MOSTBOTTOM);
                this._HScrollAni = null;
                this._VScrollAni = null;
                this._lastDelta = new $j.classes.Point;
                this._downPos = new $j.classes.Point;
                this._currentPos = new $j.classes.Point;
                this._down = false;
                this._keyDir = String.EMPTY;
                //#endregion
                this.multiSelect = false;
                this.sorted = false;
                this.itemsHeight = props.itemsHeight ? props.itemsHeight : 16;
                $j.classes.newCollection(this, this, $j.classes.ListBoxItem);
                this.useAlternateColor = false;
                this.viewCheckboxes = false;
                this.itemIndex = -1;
                this.columns = 1;
                this.images = null;
                this.onChange = new $j.classes.NotifyEvent(this);
                this.canFocused = true;
                this.setHitTest(true);
                this.mouseTracking = true;
                this.animated = true;
                this.orientation = $j.types.orientations.VERTICAL;
                this._VScrollBar.smallChange = this.itemsHeight;
                this._HScrollBar.smallChange = this.itemsHeight;
                this.onSelectItem = new $j.classes.NotifyEvent(this);
                this.onDrawItem = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Setters
        setMultiSelect: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.multiSelect !== newValue) {
                this.multiSelect = newValue;
            }
        },
        setSorted: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.sorted !== newValue) {
                this.sorted = newValue;
                if (this.sorted) {
                    this.items.sort();
                    this.draw();
                }
            }
        },
        setItemsHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.itemsHeight !== newValue) {
                for (var i = 0, l = this.items.length; i < l; i++) {
                    if (this.items[i].height === this.itemsHeight) {
                        this.items[i].height = newValue;
                    }
                }
                this.itemsHeight = newValue;
                this.draw();
            }
        },
        setUseAlternateColor: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.useAlternateColor !== newValue) {
                this.useAlternateColor = newValue;
                this.updateDataSet();
            }
        },
        setViewCheckboxes: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this instanceof $j.classes.HorizontalListBox) return;
            if (this.viewCheckboxes !== newValue) {
                this.viewCheckboxes = newValue;
                this.draw();
            }
        },
        setItemIndex: function (newValue) {
            var item, oldIdx;
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue > this.items.length - 1) return;
            if (newValue < 0) return;
            if (this.itemIndex !== newValue) {
                if (this.itemIndex > -1) this.deselectItemIndex();
                oldIdx = this.itemIndex;
                item = this.items[newValue];
                while ((item.isHeader || !item.enabled) && (newValue > -1 && newValue < this.items.length)) {
                    if (this._keyDir === $j.types.directions.LEFT) newValue--;
                    else newValue++;
                    item = this.items[newValue];
                }
                if (newValue < 0) this.newValue = 0;
                if (newValue > this.items.length - 1) newValue = this.items.length - 1;
                this.itemIndex = newValue;
                item = this.items[this.itemIndex];
                if (item) item.setSelected(true);
                this.scrollToItem();
            }
        },
        setOrientation: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.orientations)) return;
            if (this.orientation !== newValue) {
                this.orientation = newValue;
                this.updateScrollBar();
                this.draw();
            }
        },
        setImages: function (newValue) {
            if (!(newValue instanceof $j.classes.ImageList)) return;
            if (this.images !== newValue) {
                this.images = newValue;
                this.draw();
            }
        },
        //#endregion
        //#region Methods
        updateDataSet: function () {
            this._HTMLElement.dataset.multiselect = this.multiSelect;
            this._HTMLElement.dataset.sorted = this.sorted;
            this._HTMLElement.dataset.itemsheight = this.itemsHeight;
            this._HTMLElement.dataset.usealternatecolor = this.useAlternateColor;
            this._HTMLElement.dataset.viewcheckboxes = this.viewCheckboxes;
            this._HTMLElement.dataset.itemindex = this.itemIndex;
            this._HTMLElement.dataset.columns = this.columns;
        },
        getChildsHTMLElement: function () {
            var items, item, node, lastStart = 0, prop, data, mat;
            data = this._HTMLElement.dataset.orientation;
            if (data) this.orientation = data;
            if (this._HTMLElement) {
                this._content = this._HTMLElement.firstElementChild;
                this._content.jsObj = this;
                this._VScrollBar.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this._VScrollBar.getChildsHTMLElement();
                this._VScrollBar.setOrientation($j.types.orientations.VERTICAL);
                this._VScrollBar.updateFromHTML();
                this._HScrollBar.getHTMLElement(this._HTMLElement.querySelector(".ScrollBar.orientation-horizontal").id);
                this._HScrollBar.getChildsHTMLElement();
                this._HScrollBar.updateFromHTML();
                if (this.orientation === $j.types.orientations.VERTICAL) {
                    $j.CSS.removeClass(this._VScrollBar._HTMLElement, "hidden");
                    $j.CSS.addClass(this._HScrollBar._HTMLElement, "hidden");
                } else {
                    $j.CSS.removeClass(this._HScrollBar._HTMLElement, "hidden");
                    $j.CSS.addClass(this._VScrollBar._HTMLElement, "hidden");
                }
            }
            // on va chercher les items dans le CDATA
            var cdata = this._content.nextSibling;
            while (cdata && cdata.nodeType !== $j.types.xmlNodeTypes.COMMENT_NODE) {
                cdata = cdata.nextSibling;
            }
            if (cdata && cdata.nodeValue !== String.EMPTY && cdata.nodeValue) items = JSON.parse(cdata.nodeValue);
            this._innerHeight = 0;
            this.beginUpdate();
            if (this.orientation === $j.types.orientations.VERTICAL) prop = "_top";
            else prop = "_left";
            if (items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    item = new $j.classes.ListBoxItem(this, items[i].text);
                    if (items[i].height) item.height = items[i].height;
                    if (items[i].isChecked) item.isChecked = items[i].isChecked;
                    if (items[i].isHeader) item.isHeader = items[i].isHeader;
                    if (items[i].enabled) item.enabled = items[i].enabled;
                    if (items[i].css) item.css = items[i].css;
                    if (items[i].cssImage) item.cssImage = items[i].cssImage;
                    //if (items[i].onDraw)) item.onDraw = items[i].onDraw;
                    item[prop] = lastStart;
                    this.items.push(item);
                    this._innerHeight += item.height;
                    lastStart += item.height;
                }
            }
            this.items.onChange.addListener(this.refreshInnerHeight);
            //this._VScrollBar.setOrientation($j.types.orientations.VERTICAL);
            this.endUpdate();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.usealternatecolor;
            if (data) this.useAlternateColor = _conv.strToBool(data);
            data = this._HTMLElement.dataset.viewcheckboxes;
            if (data) this.viewCheckboxes = _conv.strToBool(data);
            data = this._HTMLElement.dataset.multiselect;
            if (data) this.multiSelect = _conv.strToBool(data);
            data = this._HTMLElement.dataset.itemsheight;
            if (data) this.itemsHeight = ~~data;
            data = this._HTMLElement.dataset.itemindex;
            if (data) this.setItemIndex(~~data);
            data = this._HTMLElement.dataset.columns;
            if (data) this.columns = _conv.strToBool(data);
            this.bindEventToHTML("onChange");
            this.bindEventToHTML("onSelectItem");
            this.bindEventToHTML("onDrawItem");
        },
        draw: function () {
            var oldVisibleItems = this._visibleItems, item, items = this.items, i, il, vert = (this.orientation === $j.types.orientations.VERTICAL), itemVisible = false, topIndex = 0, maxIndex = 0;
            if (this._loading || this.form._loading) return;
            if (vert) this._scrollTop = $j.max($j.min(this._scrollTop, this._innerHeight - this._content.offsetHeight), 0);
            else this._scrollTop = $j.max($j.min(this._scrollTop, this._innerHeight - this._content.offsetWidth), 0);
            this._visibleItems = [];
            topIndex = ~~(this._scrollTop / this.itemsHeight);
            if (topIndex < 0) topIndex = 0;
            if (!oldVisibleItems.isEmpty()) maxIndex = topIndex + oldVisibleItems.length * 2;
            else maxIndex = ~~(this._content.offsetHeight / this.itemsHeight) + 1;
            if (maxIndex > items.length) maxIndex = items.length;
            for (i = topIndex; i < maxIndex; i++) {
                item = items[i];
                itemVisible = false;
                if (vert && ((item._top + item.height >= this._scrollTop) && (item._top < this._content.offsetHeight + this._scrollTop))) itemVisible = true;
                else if (!vert && ((item._left + item.height >= this._scrollTop) && (item._left <= this._content.offsetWidth + this._scrollTop))) itemVisible = true;
                if (itemVisible) {
                    if (this._dropDownPopup) item._dropDownPopup = this._dropDownPopup;
                    item.draw(this.useAlternateColor);
                    this._visibleItems.push(item);
                }
            }
            for (i = 0, il = oldVisibleItems.length; i < il; i++) {
                item = oldVisibleItems[i];
                if (this._visibleItems.indexOf(item) === -1) {
                    item.removeToHTML();
                }
            }
        },
        VScroll: function () {
            var listBox = this._owner;
            if (listBox.form._focusedControl !== listBox) listBox.setFocus();
            listBox._scrollTop = listBox._VScrollBar.value;
            listBox.draw();
        },
        HScroll: function () {
            var listBox = this._owner;
            if (listBox.form._focusedControl !== listBox) listBox.setFocus();
            listBox._scrollTop = listBox._HScrollBar.value;
            listBox.draw();
        },
        selectItem: function () {
            var item = this.jsObj;
            item._owner._selectItem(item);
        },
        _selectItem: function (item) {
            if (item.isHeader || !item.enabled) return;
            if (!item._owner.enabled) return;
            if (!item._owner.hitTest.mouseDown) return;
            if (item._owner._VScrollAni && item._owner._VScrollAni.running) return;
            if (item._owner._HScrollAni && item._owner._HScrollAni.running) return;
            if (item._owner.multiSelect && ($j.keyboard.ctrl)) item.setSelected(!item.selected);
            else item._owner.setItemIndex(item.getIndex());
            if (item._owner.viewCheckboxes) item.setIsChecked(!item.isChecked);
            item._owner.mouseDown();
            if (item._owner.onSelectItem.hasListener()) item._owner.onSelectItem.invoke();
        },
        deselectItemIndex: function () {
            var item;
            if (this.itemIndex !== -1) {
                item = this.items[this.itemIndex];
                if (item) item.setSelected(false);
            }
        },
        refreshInnerHeight: function () {
            var item, items = this.items, lastStart = 0, prop;
            if (this.orientation === $j.types.orientations.VERTICAL) prop = "_top";
            else prop = "_left";
            this._innerHeight = 0;
            for (var i = 0, l = items.length; i < l; i++) {
                item = items[i];
                item[prop] = lastStart;
                this._innerHeight += item.height;
                lastStart += item.height;
            }
            if (this._allowUpdate) {
                this.updateScrollBar();
                this.draw();
            }
        },
        addItem: function (item) {
            var lastItem = this.items.last(), prop;
            if (!(item instanceof $j.classes.ListBoxItem)) return;
            if (this.orientation === $j.types.orientations.VERTICAL) prop = "_top";
            else prop = "_left";
            if (!lastItem) {
                lastItem = {};
                lastItem[prop] = 0;
            }
            item[prop] = lastItem[prop] + lastItem.height;
            this._innerHeight += item.height;
            this.items.push(item);
        },
        deleteItem: function (item) {
            if (!(item instanceof $j.classes.ListBoxItem)) return;
            if (this.items.indexOf(item) === -1) return;
            this.items.remove(item);
        },
        deleteAt: function (index) {
            var item, lastTop, lastLeft;
            if (index < 0 || index > this.items.length) return;
            item = this.items[index];
            this.items.removeAt(index);
        },
        moveItem: function (itemToMove, itemBefore) {
            var s, l, i, t, l, prop, start;
            if (!(itemToMove instanceof $j.classes.ListBoxItem)) return;
            if (!(itemBefore instanceof $j.classes.ListBoxItem)) return;
            if (this.orientation === $j.types.orientations.VERTICAL) prop = "_top";
            else prop = "_left";
            this.setItemIndex(-1);
            s = itemToMove.getIndex() - 1;
            if (s < 0) s = 0;
            l = itemBefore.getIndex() + 1;
            if (l > this.count()) l = this.count() - 1;
            if (this._visibleItems.indexOf(itemToMove) > -1) this.items.beginUpdate();
            this.items.remove(itemToMove);
            this.items.insert(itemBefore.getIndex(), itemToMove);
            if (l > this.items.length) l = this.items.length;
            start = this.items[s][prop];
            for (i = s; i < l; i++) {
                this.items[i][prop] = start;
                start += this.items[i].height;
            }
            this.setItemIndex(itemToMove.getIndex());
            if (this._visibleItems.indexOf(itemToMove) > -1) {
                this.items.endUpdate();
            }
        },
        beginUpdate: function () {
            this._allowUpdate = false;
            this.items.beginUpdate();
        },
        endUpdate: function () {
            this._allowUpdate = true;
            this.items.endUpdate();
        },
        clear: function () {
            var item;
            for (var i = 0, il = this._visibleItems.length; i < il; i++) {
                item = this._visibleItems[i];
                item.destroy();
            }
            this._visibleItems.clear();
            this.items.clear();
        },
        clearSelection: function () {
            var item;
            for (var i = 0, il = this.items.length; i < il; i++) {
                item = this.items[i];
                item.setSelected(false);
            }
        },
        selectAll: function () {
            var item;
            for (var i = 0, il = this.items.length; i < il; i++) {
                item = this.items[i];
                item.setSelected(true);
            }
        },
        updateScrollBar: function () {
            if (!this._HTMLElement) return;
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-none");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-horizontal");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-vertical");
            if (this.orientation === $j.types.orientations.VERTICAL) {
                if (this._innerHeight > this._HTMLElement.offsetHeight) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-vertical");
                    this._VScrollBar.updateFromHTML();
                    this._VScrollBar.setMax(this._innerHeight - this._content.offsetHeight);
                    this._VScrollBar.setViewportSize(this._innerHeight);
                } else {
                    this._HTMLElement.dataset.scrollbars, $j.types.scrollbars.NONE;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
                }
            } else {
                if (this._innerHeight > this._HTMLElement.offsetWidth) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.HORIZONTAL;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-horizontal");
                    this._HScrollBar.updateFromHTML();
                    this._HScrollBar.setMax(this._innerHeight - this._content.offsetWidth);
                    this._HScrollBar.setViewportSize(this._innerHeight);
                } else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.NONE;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
                }
            }
        },
        mouseDown: function () {
            console.log('mouseDown');
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this.mouseTracking) {
                this._lastDelta.setValues(0, 0);
                this._downPos.assign($j.mouse.screen);
                this._currentPos.assign($j.mouse.screen);
                this._down = true;
                if (this._VScrollAni && this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                if (this._HScrollAni && this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
            }
        },
        mouseMove: function () {
            var data;
            this._inherited();
            if (this._down && this.mouseTracking) {
                data = this._HTMLElement.dataset.scrollbars;
                if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                    this._VScrollBar.setValue(this._VScrollBar.value - ($j.mouse.screen.y - this._currentPos.y));
                    this._lastDelta.y = ($j.mouse.screen.y - this._currentPos.y);
                } else if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                    this._HScrollBar.setValue(this._HScrollBar.value - ($j.mouse.screen.x - this._currentPos.x));
                    this._lastDelta.x = ($j.mouse.screen.x - this._currentPos.x);
                }
                this._currentPos.assign($j.mouse.screen);
            }
        },
        mouseUp: function () {
            var data;
            this._inherited();
            if (this._down && this.mouseTracking) {
                this._down = false;
                if (this.animated && ((this._lastDelta.x !== 0) || (this._lastDelta.y !== 0))) {
                    data = this._HTMLElement.dataset.scrollbars;
                    if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                        this.createVScrollAni();
                        if (this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                        this._VScrollAni.stopValue = this._VScrollBar.value - (this._lastDelta.y * 7);
                        this._VScrollAni.start();
                    } else if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                        this.createHScrollAni();
                        if (this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
                        this._HScrollAni.stopValue = this._HScrollBar.value - (this._lastDelta.x * 7);
                        this._HScrollAni.start();
                    }
                }
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
                this._VScrollAni.initialValue = this._VScrollBar.value;
            }
        },
        createHScrollAni: function () {
            if (!this._HScrollAni) {
                this._HScrollAni = new $j.classes.FloatAnimation(this);
                this._HScrollAni.animationType = $j.types.animationTypes.OUT;
                this._HScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._HScrollAni.duration = 1;
                this._HScrollAni.control = this._HScrollBar;
                this._HScrollAni.propertyName = "value";
                this._HScrollAni.startFromCurrent = true;
                this._HScrollAni.convertToCSS = false;
                this._HScrollAni.initialValue = this._HScrollBar.value;
            }
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{horizontalScrollBar}"), tpl, b;
            tpl = this._HScrollBar.getTemplate();
            html = a.join(tpl);
            a = html.split("{verticalScrollBar}");
            tpl = this._VScrollBar.getTemplate();
            b = tpl.split("horizontal");
            tpl = b.join("vertical");
            html = a.join(tpl);
            return html;
        },
        destroy: function () {
            this._inherited();
            while (this.items.length > 0) {
                this.items.last().destroy();
                this.items.pop();
            }
            this.items.destroy();
            this.items = null;
            this._content = null;
            this._visibleItems.destroy();
            this._visibleItems = null;
            this._scrollTop = null;
            this._innerHeight = null;
            this._VScrollBar = null;
            this._HScrollBar = null;
            if (this._HScrollAni) this._HScrollAni.destroy();
            this._HScrollAni = null;
            if (this._VScrollAni) this._VScrollAni.destroy();
            this._VScrollAni = null;
            this._lastDelta.destroy();
            this._lastDelta = null;
            this._downPos.destroy();
            this._downPos = null;
            this._currentPos.destroy();
            this._currentPos = null;
            this._down = null;
            this.multiSelect = null;
            this.sorted = null;
            this.itemsHeight = null;
            this.useAlternateColor = null;
            this.viewCheckboxes = null;
            this.itemIndex = null;
            this.columns = null;
            this.images = null;
            this.onChange.destroy();
            this.onChange = null;
            this.canFocused = null;
            this.mouseTracking = null;
            this.animated = null;
            this.orientation = null;
            this.onSelectItem.destroy();
            this.onSelectItem = null;
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
                    if (this.orientation === $j.types.orientations.VERTICAL) this.setItemIndex(this.itemIndex - ~~(this._content.offsetHeight / this.itemsHeight));
                    else this.setItemIndex(this.itemIndex - ~~(this._content.offsetWidth / this.itemsHeight));
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    if (this.orientation === $j.types.orientations.VERTICAL) this.setItemIndex(this.itemIndex + ~~(this._content.offsetHeight / this.itemsHeight));
                    else this.setItemIndex(this.itemIndex + ~~(this._content.offsetWidth / this.itemsHeight));
                    break;
                case $j.types.VKeysCodes.VK_SPACE:
                    var item = this.items[this.itemIndex];
                    if (this.viewCheckboxes) {
                        if (item) item.setIsChecked(!item.isChecked);
                    }
                    break;
            }
        },
        scrollToItem: function () {
            var nbrVisibleItems, base, inVisibleItems;
            inVisibleItems = this._visibleItems.indexOf(this.items[this.itemIndex]) === -1 || this._visibleItems.last() === this.items[this.itemIndex];
            isFirst = this._visibleItems.first() === this.items[this.itemIndex] || this._visibleItems.first() === this.items[this.itemIndex + 1];
            if (inVisibleItems && !isFirst) {
                if (this.orientation === $j.types.orientations.VERTICAL) {
                    nbrVisibleItems = ~~(this._content.offsetHeight / this.itemsHeight);
                    base = ((nbrVisibleItems * this.itemsHeight) - this._content.offsetHeight) + this.itemsHeight;
                    this._VScrollBar.setValue(base + ((this.itemIndex - nbrVisibleItems) * this.itemsHeight));
                } else {
                    nbrVisibleItems = ~~(this._content.offsetWidth / this.itemsHeight);
                    base = ((nbrVisibleItems * this.itemsHeight) - this._content.offsetWidth) + this.itemsHeight;
                    this._HScrollBar.setValue(base + ((this.itemIndex - nbrVisibleItems) * this.itemsHeight));
                }
            } else if (isFirst) {
                if (this.orientation === $j.types.orientations.VERTICAL) this._VScrollBar.setValue((this.itemIndex * this.itemsHeight));
                else this._HScrollBar.setValue((this.itemIndex * this.itemsHeight));
            }
        },
        loaded: function () {
            this._inherited();
            this.getImages();
            this.draw();
        },
        getImages: function () {
            var data = this._HTMLElement.dataset.images;
            if (data) {
                if (this.form[data]) {
                    this.images = this.form[data];
                }
            }
        },
        count: function () {
            return this.items.count();
        }
        //#endregion
    });
    Object.seal(ListBox);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, ListBoxItem);
    $j.classes.register($j.types.categories.COMMON, ListBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ListBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='ListBox' class='Control ListBox {theme} orientation-vertical scrollbars-none' data-scrollbars='none' style='width:97px;height:121px;'>\
                    <div class='Control ListBoxContent {theme} orientation-vertical'></div>\
                    {horizontalScrollBar}\
                    {verticalScrollBar}\
                    </div>";
        $j.classes.registerTemplates([{ Class: ListBox, template: ListBoxTpl }]);
    }
    //#endregion
})();*/