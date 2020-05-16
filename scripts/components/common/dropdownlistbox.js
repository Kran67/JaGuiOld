//#region Import
import { ListBox, ListBoxItem } from '/scripts/components/common/listbox.js';
import { PopupBox } from '/scripts/core/popupbox.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
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
            //props.forceMouseWheel = !0;
            props.closePopups = !1;
            super(owner, props);
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
            items[itemIndex].html && items[itemIndex].html.classList.remove('selected');
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
            props.canFocused = !1;
            super(owner, props);
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
                //item.owner = this;
                item.isChecked = !1;
                item.selected = !1;
            });
            super.refreshInnerHeight();
        }
    }
    //#endregion refreshInnerHeight
    //#region selectItem
    selectItem(item) {
        const dropDownListBox = item.owner.dropDownListBox;
        if (!item.isHeader && item.enabled) {
            dropDownListBox.itemIndex = item.index;
            dropDownListBox.text = item.caption;
            !dropDownListBox.updating && dropDownListBox.onChange.invoke();
            item.form.closePopups();
        }
    }
    //#endregion selectItem
    //#region keyUp
    keyUp() {
        const VKEYSCODES = Keyboard.VKEYSCODES;
        super.keyUp();
        switch (core.keyboard.keyCode) {
            case VKEYSCODES.VK_RETURN:
            case VKEYSCODES.VK_ENTER:
                this.selectItem(this.items[this.itemIndex]);
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
        !_private.has(key) && _private.set(key, {});
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
                priv.lbItemsSize = props.hasOwnProperty('itemsSize') && core.tools.isNumber(props.itemsSize) ? props.itemsSize : 13;
                priv.items = props.hasOwnProperty('items') && Array.isArray(props.items) ? props.items : [];
                priv.listBoxPopupClass = props.hasOwnProperty('listBoxPopupClass') ? props.listBoxPopupClass : ListBoxPopup;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region listBox
        get listBox() {
            return internal(this).listBox;
        }
        //#endregion listBox
        //#region Method
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.listBox = core.classes.createComponent({
                class: priv.listBoxPopupClass,
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
            !priv.dropDownPopup && priv.listBox.getHTMLElement(priv.listBox.internalId);
            priv.listBox.itemIndex = this.owner.itemIndex;
            priv.listBox.itemIndex > -1 && (priv.listBox.items[priv.listBox.itemIndex].selected = !0);
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            htmlElement && htmlElement.classList.remove('animated', 'fadeIn');
            priv.lbItemsSize = null;
            priv.lbHeight = null;
            priv.lbWidth = null;
            priv.listBox = null;
            priv.items.destroy();
            priv.items = null;
            priv.listBoxPopupClass = null;
            super.destroy();
        }
        keyUp() {
            //#region Variables déclaration
            const priv = internal(this);
            const listBox = priv.listBox;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            super.keyUp();
            switch (core.keyboard.keyCode) {
                case VKEYSCODES.VK_RETURN:
                case VKEYSCODES.VK_ENTER:
                    listBox.selectItem = listBox.items[listBox.itemIndex]; // à voir
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
        !_private.has(key) && _private.set(key, {});
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
                props.stopEvent = !0;
                props.canFocused = !0;
                props.autoCapture = !0;
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.dropDownPopup = null;
                priv.opened = props.hasOwnProperty('opened') && core.tools.isBool(props.opened) ? props.opened : !1;
                priv.text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
                priv.input = null;
                priv.dropDownCount = props.hasOwnProperty('dropDownCount') && core.tools.isNumber(props.dropDownCount)
                    ? props.dropDownCount : 8;
                priv.editable = props.hasOwnProperty('editable') && core.tools.isBool(props.editable) ? props.editable : !1;
                //core.classes.newCollection(this, this, ListBoxItem);
                //if (this._ClassName === "DropDownListBox") {
                //    priv.editable = !1;
                //    priv.autoComplete = !1;
                //    priv.autoCompleteDelay = 500;
                //    $j.core.tools.addPropertyFromSet(this, "charCase", $j.core.types.charCases, $j.core.types.charCases.NORMAL);
                //    priv.maxLength = 0;
                //}
                priv.items = props.hasOwnProperty('items') && Array.isArray(props.items) ? props.items : [];
                priv.itemIndex = props.hasOwnProperty('itemIndex') && core.tools.isNumber(props.itemIndex) ? props.itemIndex : -1;
                priv.itemsSize = props.hasOwnProperty('itemsSize') && core.tools.isNumber(props.itemsSize) ? props.itemsSize : 13;
                priv.images = null;
                priv.listBoxPopupClass = props.hasOwnProperty('listBoxPopupClass') ? props.listBoxPopupClass : ListBoxPopup;
                priv.dropDownWidth = props.hasOwnProperty('dropDownWidth') && core.tools.isNumber(props.dropDownWidth)
                    ? props.dropDownWidth : -1;
                this.createEventsAndBind(['onChange', 'onDrawItem'], props);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region listBoxPopupClass
        get listBoxPopupClass() {
            return internal(this).listBoxPopupClass;
        }
        set listBoxPopupClass(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue.prototype instanceof ListBox && priv.listBoxPopupClass !== newValue && (priv.listBoxPopupClass = newValue);
        }
        //#endregion listBoxPopupClass
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
            if (core.tools.isString(newValue) && priv.text !== newValue) {
                priv.text = newValue;
                if (items && items.length > 0) {
                    const item = items.filter(function (el) {
                        return el.caption === newValue;
                    });
                    item.length > 0 && (priv.itemIndex = items.indexOf(item.first));
                }
                this.update();
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
            if (core.tools.isBool(newValue) && priv.opened !== newValue) {
                priv.opened = newValue;
                this.update();
                priv.opened ? this.showPopup() : this.form.closePopups();
            }
        }
        //#endregion opened
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
            if (core.tools.isNumber(newValue)) {
                newValue = Math.max(newValue, 8);
                priv.dropDownCount !== newValue && (priv.dropDownCount = newValue);
            }
        }
        //#endregion dropDownCount
        //#region dropDownWidth
        get dropDownWidth() {
            return internal(this).dropDownWidth;
        }
        set dropDownWidth(newValue) {
            const priv = internal(this);
            core.tools.isNumber(newValue) && priv.dropDownWidth !== newValue && (priv.dropDownWidth = newValue);
        }
        //#endregion dropDownWidth
        //#region autoComplete
        get autoComplete() {
            return internal(this).autoComplete;
        }
        set autoComplete(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.autoComplete !== newValue && (priv.autoComplete = newValue);
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
            core.tools.isNumber(newValue) && priv.autoCompleteDelay !== newValue && (priv.autoCompleteDelay = newValue);
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
            if (core.tools.valueInSet(newValue, core.types.charCases) && priv.charCase !== newValue) {
                priv.charCase = newValue;
                this.update();
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
            if (core.tools.isNumber(newValue) && priv.itemIndex !== newValue) {
                newValue = Math.max(Math.min(newValue, priv.items.length - 1), 0);
                priv.itemIndex > -1 && (priv.items[priv.itemIndex].selected = !1);
                priv.itemIndex = newValue;
                newValue > -1 && (this.text = priv.items[newValue].text);
                priv.items[newValue].selected = !0;
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
            if (core.tools.isNumber(newValue)) {
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
            if (core.tools.isNumber(newValue)) {
                newValue = Math.max(newValue, 13);
                priv.itemsSize !== newValue && (priv.itemsSize = newValue);
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
                priv.maxLength > 0 && priv.input.setAttribute('maxLength', priv.maxLength);
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
            this === this.form.focusedControl && lastOpened && (this.closePopups = !1);
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
                priv.dropDownPopup = core.classes.createComponent({
                    class: DropDownListBoxPopup,
                    owner: this,
                    props: {
                        parentHTML: document.body,
                        refControl: this,
                        width: priv.dropDownWidth > -1 ? priv.dropDownWidth : this.HTMLElement.offsetWidth,
                        height: priv.dropDownCount * priv.itemsSize,
                        itemsSize: priv.itemsSize,
                        items: priv.items,
                        listBoxPopupClass: priv.listBoxPopupClass,
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
            if (core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                if (!priv.opened) {
                    this.opened = !0;
                } else {
                    if (!priv.dropDownPopup.refControl.mode) {
                        //this.text = priv.dropDownPopup.listbox.curDate.toString(core.tools.getLocale().date.formatPatterns.shortDate);
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
            const TAG = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.loaded();
            priv.content = document.createElement(`${TAG}content`);
            priv.content.classList.add('DropDownListBoxContent');
            priv.content.jsObj = this;
            htmlElement.appendChild(priv.content);
            htmlElement.appendChild(document.createElement(`${TAG}arrow`));
            htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
            priv.input = document.createElement(core.types.HTMLELEMENTS.INPUT);
            priv.input.type = 'text';
            priv.input.classList.add('DropDownListBoxInput', this.themeName, 'csr_default');
            priv.input.jsObj = this;
            if (!priv.editable) {
                priv.input.classList.add('noEvents');
                priv.input.readOnly = 'readOnly';
            }
            Events.bind(priv.input, Mouse.MOUSEEVENTS.DOWN, this.mouseDown);
            priv.content.appendChild(priv.input);
            this.getImages();
        }
        //#endregion loaded
        //#region _mouseDown
        _mouseDown(mouseEventArg) {
            this.jsObj.editable && core.mouse.stopAllEvent(mouseEventArg);
        }
        //#endregion _mouseDown
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.clearItems();
            priv.content = null;
            priv.input = null;
            priv.opened = null;
            priv.text = null;
            this.items = null;
            delete this.items;
            priv.items = null;
            priv.dropDownCount = null;
            priv.itemIndex = null;
            priv.itemsSize = null;
            priv.autoComplete = null;
            priv.autoCompleteDelay = null;
            priv.charCase = null;
            priv.maxLength = null;
            priv.editable = null;
            priv.dropDownPopup = null;
            priv.images = null;
            priv.listBoxPopupClass = null;
            priv.dropDownWidth = null;
            this.unBindAndDestroyEvents(['onChange', 'onDrawItem']);
            super.destroy();
        }
        //#endregion destroy
        //#region getImages
        getImages() {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            form[priv.images] && (priv.images = form[priv.images]);
        }
        //#endregion getImages
        //#region findItemFromText
        findItemFromText(text) {
            const items = priv.items.filter(function (e) {
                return (e.caption === text);
            });
            return items.length > 0 ? items.first.index : -1;
        }
        //#endregion findItemFromText
        //#region newItem
        newItem(props) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const item = core.classes.createComponent({
                class: ListBoxItem, // à voir ici
                owner: this,
                props
            });
            priv.items.push(item);
            return item;
        }
        //#endregion newItem
        //#region addItem
        addItem(item) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            item && item instanceof ListBoxItem && priv.items.add(item);
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
            const items = priv.items;
            //#endregion Variables déclaration
            //items.forEach((item, index) => {
            //    item.destroy();
            //    items[index] = null;
            //});
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
core.classes.register(core.types.CATEGORIES.INTERNAL, DropDownListBoxPopup, ListBoxPopup, ListBoxItemPopup);
core.classes.register(core.types.CATEGORIES.COMMON, DropDownListBox);
//#endregion DropDownListBox
//#region Templates
if (core.isHTMLRenderer) {
    const DropDownListBoxTpl = '<jagui-dropdownlistbox id="{internalId}" data-class="DropDownListBox" class="Control DropDownListBox {theme}"><properties>{ "name": "{name}", "editable": !1, "width": 100 }</properties></jagui-dropdownlistbox>';
    const DropDownListBoxPopupTpl = core.templates['PopupBox'].replace('PopupBox', 'PopupBox PopupListBox');
    core.classes.registerTemplates([
        { Class: DropDownListBox, template: DropDownListBoxTpl },
        { Class: DropDownListBoxPopup, template: DropDownListBoxPopupTpl },
        { Class: ListBoxPopup, template: core.templates['ListBox'] }
    ]);
}
//#endregion Templates
export { DropDownListBox };