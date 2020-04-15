//#region Import
import { ListBox, ListBoxItem } from '/scripts/components/common/listbox.js';
import { PopupBox } from '/scripts/core/popupbox.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//import { ImageList } from '/scripts/components/nonvisual/imagelist.js'
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region ListBoxItemPopup
class ListBoxItemPopup extends ListBoxItem {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            super(owner, props);
            this.forceMouseWheel = !0;
        }
    }
    //#endregion constructor
    //#region Methods
    //#region mouseLeave
    mouseLeave() {
        this.html.classList.remove('selected');
    }
    //#endregion mouseLeave
    //#region mouseEnter
    mouseEnter() {
        const owner = this.owner;
        const items = owner.items;
        const itemIndex = owner.itemIndex;
        if (itemIndex > -1) {
            if (items[itemIndex].html) {
                items[itemIndex].html.classList.remove('selected');
            }
            items[itemIndex].selected = !1;
            owner.itemIndex = -1;
        }
    }
    //#endregion mouseEnter
    //#region draw
    draw() {
        super.draw();
        this.html.classList.add('ListBoxItemPopup');
    }
    //#endregion draw
    //#endregion Methods
}
//#endregion ListBoxItemPopup
//#region ListBoxPopup
class ListBoxPopup extends ListBox {
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.itemsClass = 'ListBoxItemPopup';
            super(owner, props);
            this.forceMouseWheel = !0;
            this.canFocused = !1;
        }
    }
    //#endregion constructor
    //#region Methods
    //#region refreshInnerHeight
    refreshInnerHeight() {
        const items = this.items;
        if (this.owner) {
            items.forEach(item => {
                item.removeToHTML();
                item.owner = this;
                item.isChecked = false;
                item.selected = false;
            });
            super.refreshInnerHeight();
        }
    }
    //#endregion refreshInnerHeight
    //#region _selectItem
    _selectItem(item) {
        const dropDownListBox = item.owner.dropDownListBox;
        if (!item.isHeader && item.enabled) {
            dropDownListBox.itemIndex = item.index;
            dropDownListBox.text = item.caption;
            if (!dropDownListBox.updating) {
                dropDownListBox.onChange.invoke();
            }
            //dropDownListBox.lastScrollTop = item._owner._scrollTop;
            item.form.closePopups();
        }
    }
    //#endregion _selectItem
    //#region keyUp
    keyUp() {
        const VKEYSCODES = Keyboard.VKEYSCODES;
        super.keyUp();
        switch (Core.keyboard.keyCode) {
            case VKEYSCODES.VK_RETURN:
            case VKEYSCODES.VK_ENTER:
                this._selectItem(this.items[this.itemIndex]);
                break;
        }
    }
    //#endregion keyUp
    //#endregion Methods
}
Object.seal(ListBoxPopup);
//#endregion ListBoxPopup
//#region DropDownListBoxPopup
const DropDownListBoxPopup = (() => {
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
    //#region Class DropDownListBoxPopup
    class DropDownListBoxPopup extends PopupBox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.canFocused = !1
                props.closePopups = !1;
                super(owner, props);
                const priv = internal(this);
                priv.lbItemsSize = props.hasOwnProperty('itemsSize') && Tools.isNumber(props.itemsSize) ? props.itemsSize : 13;
                priv.items = props.hasOwnProperty('items') && Array.isArray(props.items) ? props.items : [];
                //priv.dropDownListBox.onDrawItem.copyListenerTo(this._listBox.onDrawItem);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region listBox
        get listBox() {
            return internal(this).listBox;
        }
        //#endregion listBox
        //get template() {
        //    let html = super.template;
        //    let a = html.split('{listBox}');
        //    const arr = [];
        //    if (a.length > 1) {
        //        Array.prototype.push.apply(arr, priv.listBox.dropDownListBox.items);
        //        while (i = arr.pop()) {
        //            priv.listBox.items.push(i.clone());
        //        }
        //        priv.listBox.items.reverse();
        //        html = a.join(priv.listBox.template);
        //    }
        //    return html;
        //}
        //#endregion Getters / Setters
        //#region Method
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.listBox = Core.classes.createComponent({
                class: ListBoxPopup,
                owner: this,
                props: {
                    width: -1,
                    height: -1,
                    itemsSize: priv.lbItemsSize,
                    items: priv.items
                }
            });
            priv.listBox.dropDownListBox = this.owner;
            priv.listBox.canFocused = !1;
            priv.listBox.mouseTracking = !1;
            //priv.listBox.images = priv.dropDownListBox.images;
        }
        show(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.show(x, y);
            if (!priv.dropDownPopup) {
                priv.listBox.getHTMLElement(priv.listBox.internalId);
            }
            priv.listBox.itemIndex = this.owner.itemIndex;
            if (priv.listBox.itemIndex > -1) {
                priv.listBox.items[priv.listBox.itemIndex].selected = !0;
            }
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (htmlElement) {
                htmlElement.classList.remove('animated', 'fadeIn');
            }
            super.destroy();
            priv.lbItemsHeight = null;
            priv.dropDownListBox = null;
            priv.lbHeight = null;
            priv.lbWidth = null;
            priv.lbItemsHeight = null;
            priv.listBox = null;
        }
        //getChildsHTMLElement: function () {
        //    this._listBox.getHTMLElement(this._HTMLElement.firstElementChild.id);
        //    this._listBox._HTMLElementStyle.width = this._lbWidth + $j.types.CSSUnits.PX;
        //    this._listBox._HTMLElementStyle.height = this._lbHeight + $j.types.CSSUnits.PX;
        //    this._listBox.getChildsHTMLElement();
        //    this._listBox.refreshInnerHeight();
        //    $j.CSS.addClass(this._listBox._HTMLElement, "csr_default");
        //}
        keyUp() {
            //#region Variables déclaration
            const priv = internal(this);
            const listBox = priv.listBox;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            super.keyUp();
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_RETURN:
                case VKEYSCODES.VK_ENTER:
                    listBox.selectItem = listBox.items[listBox.itemIndex];
                    break;
            }
        }
        //#endregion Methods
    }
    return DropDownListBoxPopup;
    //#endregion DropDownListBoxPopup
})();
Object.seal(DropDownListBoxPopup);
//#endregion DropDownListBoxPopup
//#region DropDownListBox
const DropDownListBox = (() => {
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
    //#region Class DropDownListBox
    class DropDownListBox extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                props.height = 20;
                props.canFocused = !0;
                props.autoCapture = !0;
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.dropDownPopup = null;
                priv.opened = props.hasOwnProperty('opened') && Tools.isBool(props.opened) ? props.opened : false;
                priv.text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
                priv.input = null;
                priv.dropDownCount = 8;
                priv.editable = false;
                this.hitTest.all = true;
                this.hitTest.mouseWheel = false;
                this.hitTest.dblClick = false;
                this.createEventsAndBind(['onChange', 'onDrawItem'], props);
                this.stopEvent = !0;
                Core.classes.newCollection(this, this, ListBoxItemPopup);
                //if (this._ClassName === "DropDownListBox") {
                //    priv.editable = false;
                //    priv.autoComplete = false;
                //    priv.autoCompleteDelay = 500;
                //    $j.tools.addPropertyFromSet(this, "charCase", $j.types.charCases, $j.types.charCases.NORMAL);
                //    priv.maxLength = 0;
                //}
                priv.items = props.hasOwnProperty('items') && Array.isArray(props.items) ? props.items : [];
                priv.itemIndex = -1;
                priv.itemsSize = 13;
                priv.images = null;
                this.canFocused = !0;
                this.autoCapture = !0;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region dropDownPopup
        get dropDownPopup() {
            return internal(this).dropDownPopup;
        }
        //#endregion dropDownPopup
        //#region text
        get text() {
            return internal(this).text;
        }
        set text(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const items = this.items;
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.text !== newValue) {
                    priv.text = newValue;
                    if (items && items.length > 0) {
                        const item = items.filter(function (el) {
                            return el.caption === newValue;
                        });
                        if (item.length > 0) {
                            priv.itemIndex = items.indexOf(item.first);
                        }
                    }
                    this.update();
                }
            }
        }
        //#endregion text
        //#region opened
        get opened() {
            return internal(this).opened;
        }
        set opened(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.opened !== newValue) {
                    priv.opened = newValue;
                    this.update();
                    if (priv.opened) {
                        this.showPopup();
                    } else {
                        this.form.closePopups();
                    }
                }
            }
        }
        //#endregion opened
        //#region template
        //get template() {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    let html = super.template();
        //    let a = html.split('{date}');
        //    //#endregion Variables déclaration
        //    html = a.join(priv.date.toString());
        //    return html;
        //}
        //#endregion template
        //#region editable
        get editable() {
            return internal(this).editable;
        }
        set editable(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            //if (this instanceof DropDownListBox) return;
            //if (typeof newValue !== _const.BOOLEAN) return;
            //if (priv.editable !== newValue) {
            //    priv.editable = newValue;
            //    this.update();
            //}
        }
        //#endregion editable
        //#region dropDownCount
        get dropDownCount() {
            return internal(this).dropDownCount;
        }
        set dropDownCount(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                newValue = Math.max(newValue, 8);
                if (priv.dropDownCount !== newValue) {
                    priv.dropDownCount = newValue;
                }
            }
        }
        //#endregion dropDownCount
        //#region autoComplete
        get autoComplete() {
            return internal(this).autoComplete;
        }
        set autoComplete(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoComplete !== newValue) {
                    priv.autoComplete = newValue;
                }
            }
        }
        //#endregion autoComplete
        //#region autoCompleteDelay
        get autoCompleteDelay() {
            return internal(this).autoCompleteDelay
        }
        set autoCompleteDelay(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.autoCompleteDelay !== newValue) {
                    priv.autoCompleteDelay = newValue;
                }
            }
        }
        //#endregion autoCompleteDelay
        //#region charCase
        get charCase() {
            return internal(this).charCase;
        }
        set charCase(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.charCases)) {
                if (priv.charCase !== newValue) {
                    priv.charCase = newValue;
                    this.update();
                }
            }
        }
        //#endregion charCase
        //#region itemIndex
        get itemIndex() {
            return internal(this).itemIndex;
        }
        set itemIndex(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.itemIndex !== newValue) {
                    newValue = Math.max(Math.min(newValue, this.items.length - 1), 0);
                    if (priv.itemIndex > -1) {
                        this.items[priv.itemIndex].selected = !1;
                    }
                    priv.itemIndex = newValue;
                    if (newValue > -1) {
                        this.text = this.items[newValue].text;
                    }
                    this.items[newValue].selected = !0;
                }
            }
        }
        //#endregion itemIndex
        //#region maxLength
        get maxLength() {
            return internal(this).maxLength;
        }
        set maxLength(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                newValue = Math.max(0, newValue);
                if (priv.maxLength !== newValue) {
                    priv.maxLength = newValue;
                    this.update();
                }
            }
        }
        //#endregion maxLength
        //#region itemsSize
        get itemsSize() {
            return internal(this).itemsSize;
        }
        set itemsSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                newValue = Math.max(newValue, 13);
                if (priv.itemsSize !== newValue) {
                    priv.itemsSize = newValue;
                }
            }
        }
        //#endregion itemsSize
        //#region images
        get images() {
            return internal(this).images;
        }
        set images(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            //if (newValue instanceof ImageList) {
            //    if (priv.images !== newValue) {
            //        priv.images.assign(newValue);
            //    }
            //}
        }
        //#endregion images
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            priv.opened ? htmlElement.classList.add('opened') : htmlElement.classList.remove('opened');
            if (priv.content) {
                //priv.content.innerHTML = priv.text;
            }
            if (priv.input) {
                priv.input.value = priv.text;
                if (priv.maxLength > 0) {
                    priv.input.setAttribute('maxLength', priv.maxLength);
                }
            }
            this.onPaint.invoke();
        }
        //#endregion update
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const lastOpened = priv.opened;
            //#endregion Variables déclaration
            if (this === this.form.focusedControl) {
                if (lastOpened) {
                    this.closePopups = !1;
                }
            }
            super.mouseDown();
            this.closePopups = !0;
            this.opened = !this.opened;
        }
        //#endregion mouseDown
        //#region showPopup
        showPopup() {
            //#region Variables déclaration
            const priv = internal(this);
            const pt = this.clientToDocument();
            //#endregion Variables déclaration
            if (!priv.dropDownPopup) {
                priv.dropDownPopup = Core.classes.createComponent({
                    class: DropDownListBoxPopup,
                    owner: this,
                    props: {
                        parentHTML: document.body,
                        refControl: this,
                        width: this.HTMLElement.offsetWidth,
                        height: priv.dropDownCount * priv.itemsSize,
                        itemsSize: priv.itemsSize,
                        items: this.items
                    }
                });
                priv.dropDownPopup.HTMLElement.classList.remove('hidden');
                priv.dropDownPopup.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
                priv.dropDownPopup.HTMLElement.classList.add('animated', 'fadeIn');
            }
        }
        //#endregion showPopup
        //#region destroyPopup
        destroyPopup() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.dropDownPopup.listBox.destroy();
            priv.dropDownPopup.destroy();
            priv.dropDownPopup = null;
            priv.opened = !1;
        }
        //#endregion destroyPopup
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.keyDown();
            if (Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                if (!priv.opened) {
                    this.opened = !0;
                } else {
                    if (!priv.dropDownPopup.refControl.mode) {
                        //this.text = priv.dropDownPopup.listbox.curDate.toString(Tools.getLocale().date.formatPatterns.shortDate);
                        this.opened = !1;
                    } else if (priv.dropDownPopup) {
                        priv.dropDownPopup.refControl.keyDown();
                    }
                }
            } else if (priv.dropDownPopup) {
                priv.dropDownPopup.refControl.keyDown();
            }
        }
        //#endregion keyDown
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const TAG = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.loaded();
            priv.content = document.createElement(`${TAG}content`);
            priv.content.classList.add('DropDownListBoxContent');
            priv.content.jsObj = this;
            htmlElement.appendChild(priv.content);
            htmlElement.appendChild(document.createElement(`${TAG}arrow`));
            htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
            priv.input = document.createElement(Types.HTMLELEMENTS.INPUT);
            priv.input.type = 'text';
            priv.input.classList.add('DropDownListBoxInput', this.themeName, 'csr_default');
            priv.input.readOnly = 'readOnly';
            priv.input.jsObj = this;
            Events.bind(priv.input, Mouse.MOUSEEVENTS.DOWN, this.mouseDown);
            priv.content.appendChild(priv.input);
            //priv.text = priv.date.toString(Tools.getLocale().date.formatPatterns.shortDate);
            //priv.content.innerHTML = priv.text;
            priv.items.forEach(item => {
                const newItem = Core.classes.createComponent({
                    class: ListBoxItemPopup,
                    owner: this,
                    props: {
                        size: item.hasOwnProperty('size') ? item.size : priv.itemsSize,
                        isChecked: item.hasOwnProperty('isChecked') && Tools.isBool(item.isChecked) ? item.isChecked : !1,
                        isHeader: item.hasOwnProperty('isHeader') && Tools.isBool(item.isHeader) ? item.isHeader : !1,
                        enabled: item.hasOwnProperty('enabled') && Tools.isBool(item.enabled) ? item.enabled : !1,
                        css: item.hasOwnProperty('css') ? item.css : null,
                        imageIndex: item.hasOwnProperty('imageIndex') ? item.imageIndex : -1,
                        caption: item.hasOwnProperty('caption') ? item.caption : String.EMPTY
                    }
                });
                //if (items[i].onDraw && this.form[items[i].onDraw]) item.onDraw.addListener(this.form[items[i].onDraw]);
                this.items.push(newItem);
            });
            this.getImages();
        }
        //#endregion loaded
        //#region _mouseDown
        _mouseDown(mouseEventArg) {
            if (this.jsObj.editable) {
                Core.mouse.stopEvent(mouseEventArg);
            }
        }
        //#endregion _mouseDown
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.content = null;
            priv.input = null;
            priv.opened = null;
            priv.text = null;
            //while (this.items.length > 0) {
            //    this.items.last.destroy();
            //    this.items[this.items.length - 1] = null;
            //    this.items.removeAt(this.items.length - 1);
            //}
            this.clearItems();
            this.items.clear();
            this.items.destroy();
            priv.items = null;
            priv.dropDownCount = null;
            priv.itemIndex = null;
            priv.itemsSize = null;
            this.onChange.destroy();
            this.onChange = null;
            priv.autoComplete = null;
            priv.autoCompleteDelay = null;
            priv.charCase = null;
            priv.maxLength = null;
            priv.editable = null;
            super.destroy();
        }
        //#endregion destroy
        //#region getImages
        getImages() {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (form[priv.images]) {
                priv.images = form[priv.images];
            }
        }
        //#endregion getImages
        //#region findItemFromText
        findItemFromText(text) {
            const items = this.items.filter(function (e) {
                return (e.caption === text);
            });
            if (items.length > 0) {
                return items.first.index;
            } else {
                return -1;
            }
        }
        //#endregion findItemFromText
        //#region newItem
        newItem(text, props) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const item = Core.classes.createComponent({
                class: ListBoxItemPopup,
                owner: this,
                props
            });
            this.items.push(item);
            return item;
        }
        //#endregion newItem
        //#region addItem
        addItem(item) {
            if (item && item instanceof ListBoxItemPopup) {
                this.items.add(item);
            }
        }
        //#endregion addItem
        //#region removeItem
        removeItem() {
        }
        //#endregion removeItem
        //#region clear
        clearItems() {
            //#region Variables déclaration
            const priv = internal(this);
            const items = this.items;
            //#endregion Variables déclaration
            items.forEach((item, index) => {
                item.destroy();
                items[index] = null;
            });
            items.clear();
            this.text = String.EMPTY;
            priv.itemIndex = -1;
        }
        //#endregion clear
        //#region killFocus
        killFocus() {
            this.opened = !1;
            super.killFocus();
        }
        //#endregion killFocus
        //#endregion Methods
    }
    return DropDownListBox;
    //#endregion DropDownListBox
})();
Object.seal(DropDownListBox);
//#endregion DropDownListBox
Core.classes.register(Types.CATEGORIES.INTERNAL, DropDownListBoxPopup, ListBoxPopup, ListBoxItemPopup);
Core.classes.register(Types.CATEGORIES.COMMON, DropDownListBox);
//#region Templates
if (Core.isHTMLRenderer) {
    const DropDownListBoxTpl = '<jagui-dropdownlistbox id="{internalId}" data-class="DropDownListBox" class="Control DropDownListBox {theme}"><properties>{ "name": "{name}", "editable": false, "width": 100 }</properties></jagui-dropdownlistbox>';
    const DropDownListBoxPopupTpl = Core.templates['PopupBox'].replace('PopupBox', 'PopupBox PopupListBox');
    Core.classes.registerTemplates([
        { Class: DropDownListBox, template: DropDownListBoxTpl },
        { Class: DropDownListBoxPopup, template: DropDownListBoxPopupTpl },
        { Class: ListBoxPopup, template: Core.templates["ListBox"] }
    ]);
}
//#endregion Templates
/*
(function () {
    //#region DropDownListBox
    var DropDownListBox = $j.classes.ThemedControl.extend("DropDownListBox", {
        //#region Setters
        //#endregion
        //#region Methods
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
})();
*/