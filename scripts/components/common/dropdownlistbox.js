//#region Import
import { ListBox } from '/scripts/components/common/listbox.js';
import { PopupBox } from '/scripts/core/popupbox.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//import { ImageList } from '/scripts/components/nonvisual/imagelist.js'
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region ListBoxPopup
class ListBoxPopup extends ListBox {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.canFocused = !1;
            props.mouseEvents = { mousemove: !0 };
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Methods
    //#region selectItem
    selectItem(item) {
        //#region Variables déclaration
        const dropDownListBox = item.owner.dropDownListBox;
        //#endregion Variables déclaration
        if (!item.isHeader && item.enabled) {
            dropDownListBox.itemIndex = item.index;
            dropDownListBox.text = item.caption;
            !dropDownListBox.updating && dropDownListBox.onChange.invoke();
            this.form.closePopups();
        }
    }
    //#endregion selectItem
    //#region keyUp
    keyUp() {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyUp();
        switch (core.keyboard.key) {
            case VKEYSCODES.VK_ENTER:
                this.selectItem(this.items[this.itemIndex]);
                break;
        }
    }
    //#endregion keyUp
    //#region mouseMove
    mouseMove() {
        //#region Variables déclaration
        const item = this.itemAtPos(core.mouse.target);
        //#endregion Variables déclaration
        super.mouseMove();
        item && !item.selected && (item.selected = !item.selected);
    }
    //#endregion mouseMove
    //#endregion Methods
}
Object.seal(ListBoxPopup);
//#endregion ListBoxPopup
//#region Class DropDownListBoxPopup
class DropDownListBoxPopup extends PopupBox {
    //#region Private fields
    #lbItemsSize;
    #items;
    #listBoxPopupClass;
    #listBox;
    #dropDownPopup;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !1;
            props.closePopups = !1;
            super(owner, props);
            this.#lbItemsSize = props.hasOwnProperty('itemsSize') && core.tools.isNumber(props.itemsSize)
                    ? props.itemsSize : 13;
            this.#items = props.hasOwnProperty('items') && Array.isArray(props.items) ? [...props.items] : [];
            this.#listBoxPopupClass = props.hasOwnProperty('listBoxPopupClass')
                    ? props.listBoxPopupClass : ListBoxPopup;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region listBox
    get listBox() {
        return this.#listBox;
    }
    //#endregion listBox
    //#endregion Getters / Setters
    //#region Method
    //#region loaded
    loaded() {
        super.loaded();
        this.#listBox = core.classes.createComponent({
            class: this.#listBoxPopupClass,
            owner: this,
            props: {
                width: -1,
                height: -1,
                itemsSize: this.#lbItemsSize,
                items: [ ...this.#items ]
            }
        });
        this.#listBox.dropDownListBox = this.owner;
        this.#listBox.canFocused = !1;
        this.#listBox.mouseTracking = !1;
        //this.#listBox.images = this.#dropDownListBox.images;
    }
    //#endregion loaded
    //#region show
    show(x, y) {
        super.show(x, y);
        !this.#dropDownPopup && this.#listBox.getHTMLElement(this.#listBox.internalId);
        this.#listBox.itemIndex = this.owner.itemIndex;
        this.#listBox.itemIndex > -1 && (this.#listBox.items[this.#listBox.itemIndex].selected = !0);
    }
    //#endregion show
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        htmlElement && htmlElement.classList.remove('animated', 'fadeIn');
        this.#items.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#region keyUp
    keyUp() {
        //#region Variables déclaration
        const listBox = this.#listBox;
        const VKEYSCODES = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyUp();
        switch (core.keyboard.key) {
            case VKEYSCODES.VK_ENTER:
                listBox.selectItem = listBox.items[listBox.itemIndex]; // à voir
                break;
        }
    }
    //#endregion keyUp
    //#endregion Methods
}
Object.seal(DropDownListBoxPopup);
//#endregion DropDownListBoxPopup
//#region Class DropDownListBox
class DropDownListBox extends ThemedControl {
    //#region Private fields
    #opened;
    #text;
    #dropDownCount;
    #editable;
    #items;
    #itemIndex;
    #itemsSize;
    #images = null;
    #listBoxPopupClass;
    #dropDownWidth;
    #dropDownPopup;
    #input;
    #autoComplete;
    #autoCompleteDelay;
    #charCase;
    #maxLength;
    #content;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.height = 20;
            props.canFocused = !0;
            props.autoCapture = !0;
            props.canFocused = !0;
            props.autoCapture = !0;
            super(owner, props);
            this.#opened = props.hasOwnProperty('opened') && core.tools.isBool(props.opened)
                ? props.opened : !1;
            this.#text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
            this.#dropDownCount = props.hasOwnProperty('dropDownCount')
                && core.tools.isNumber(props.dropDownCount)
                ? props.dropDownCount : 8;
            this.#editable = props.hasOwnProperty('editable') && core.tools.isBool(props.editable)
                ? props.editable : !1;
            this.#items = props.hasOwnProperty('items') && Array.isArray(props.items) ? props.items : [];
            this.#itemIndex = props.hasOwnProperty('itemIndex') && core.tools.isNumber(props.itemIndex)
                ? props.itemIndex : -1;
            this.#itemsSize = props.hasOwnProperty('itemsSize') && core.tools.isNumber(props.itemsSize)
                ? props.itemsSize : 13;
            this.#listBoxPopupClass = props.hasOwnProperty('listBoxPopupClass')
                ? props.listBoxPopupClass : ListBoxPopup;
            this.#dropDownWidth = props.hasOwnProperty('dropDownWidth')
                && core.tools.isNumber(props.dropDownWidth)
                ? props.dropDownWidth : -1;
            this.createEventsAndBind(['onChange', 'onDrawItem'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region listBoxPopupClass
    get listBoxPopupClass() {
        return this.#listBoxPopupClass;
    }
    set listBoxPopupClass(newValue) {
        newValue.prototype instanceof ListBox && this.#listBoxPopupClass !== newValue && (this.#listBoxPopupClass = newValue);
    }
    //#endregion listBoxPopupClass
    //#region dropDownPopup
    get dropDownPopup() {
        return this.#dropDownPopup;
    }
    //#endregion dropDownPopup
    //#region text
    get text() {
        return this.#text;
    }
    set text(newValue) {
        //#region Variables déclaration
        const items = this.#items;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && this.#text !== newValue) {
            this.#text = newValue;
            if (items && items.length > 0) {
                const item = items.find(el => el.caption === newValue);
                item && (this.#itemIndex = items.indexOf(item));
            }
            this.update();
        }
    }
    //#endregion text
    //#region cssText
    get cssText() {
        return this.#input.style.cssText;
    }
    set cssText(newValue) {
        core.tools.isString(newValue) && (this.#input.style.cssText !== newValue) && (this.#input.style.cssText = newValue);
    }
    //#endregion cssText
    //#region opened
    get opened() {
        return this.#opened;
    }
    set opened(newValue) {
        if (core.tools.isBool(newValue) && this.#opened !== newValue) {
            this.#opened = newValue;
            this.update();
            this.#opened ? this.showPopup() : this.form.closePopups();
        }
    }
    //#endregion opened
    //#region editable
    get editable() {
        return this.#editable;
    }
    set editable(newValue) {
        //if (this instanceof DropDownListBox) return;
        //if (typeof newValue !== _const.BOOLEAN) return;
        //if (this.#editable !== newValue) {
        //    this.#editable = newValue;
        //    this.update();
        //}
    }
    //#endregion editable
    //#region dropDownCount
    get dropDownCount() {
        return this.#dropDownCount;
    }
    set dropDownCount(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(newValue, 8);
            this.#dropDownCount !== newValue && (this.#dropDownCount = newValue);
        }
    }
    //#endregion dropDownCount
    //#region dropDownWidth
    get dropDownWidth() {
        return this.#dropDownWidth;
    }
    set dropDownWidth(newValue) {
        core.tools.isNumber(newValue) && this.#dropDownWidth !== newValue && (this.#dropDownWidth = newValue);
    }
    //#endregion dropDownWidth
    //#region autoComplete
    get autoComplete() {
        return this.#autoComplete;
    }
    set autoComplete(newValue) {
        core.tools.isBool(newValue) && this.#autoComplete !== newValue && (this.#autoComplete = newValue);
    }
    //#endregion autoComplete
    //#region autoCompleteDelay
    get autoCompleteDelay() {
        return this.#autoCompleteDelay;
    }
    set autoCompleteDelay(newValue) {
        core.tools.isNumber(newValue) && this.#autoCompleteDelay !== newValue && (this.#autoCompleteDelay = newValue);
    }
    //#endregion autoCompleteDelay
    //#region charCase
    get charCase() {
        return this.#charCase;
    }
    set charCase(newValue) {
        if (core.tools.valueInSet(newValue, core.types.charCases) && this.#charCase !== newValue) {
            this.#charCase = newValue;
            this.update();
        }
    }
    //#endregion charCase
    //#region itemIndex
    get itemIndex() {
        return this.#itemIndex;
    }
    set itemIndex(newValue) {
        if (core.tools.isNumber(newValue) && this.#itemIndex !== newValue) {
            newValue = Math.max(Math.min(newValue, this.#items.length - 1), 0);
            this.#itemIndex > -1 && (this.#items[this.#itemIndex].selected = !1);
            this.#itemIndex = newValue;
            if (newValue > -1) {
                this.text = this.#items[newValue].translationKey 
                    ? core.locales.translateConstant(null, this.#items[newValue].translationKey) 
                    : this.#items[newValue].caption;
            }
            this.#items[newValue].selected = !0;
        }
    }
    //#endregion itemIndex
    //#region maxLength
    get maxLength() {
        return this.#maxLength;
    }
    set maxLength(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(0, newValue);
            if (this.#maxLength !== newValue) {
                this.#maxLength = newValue;
                this.update();
            }
        }
    }
    //#endregion maxLength
    //#region itemsSize
    get itemsSize() {
        return this.#itemsSize;
    }
    set itemsSize(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(newValue, 13);
            this.#itemsSize !== newValue && (this.#itemsSize = newValue);
        }
    }
    //#endregion itemsSize
    //#region images
    get images() {
        return this.#images;
    }
    set images(newValue) {
        //if (newValue instanceof ImageList) {
        //    if (this.#images !== newValue) {
        //        this.#images.assign(newValue);
        //    }
        //}
    }
    //#endregion images
    //#region items
    get items() {
        return this.#items;
    }
    //#endregion items
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        this.#opened ? htmlElement.classList.add('opened') : htmlElement.classList.remove('opened');
        if (this.#content) {
            //this.#content.innerHTML = this.#text;
        }
        if (this.#input) {
            this.#input.value = this.#text;
            this.#maxLength > 0 && this.#input.setAttribute('maxLength', this.#maxLength);
        }
        this.onPaint.invoke();
    }
    //#endregion update
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const lastOpened = this.#opened;
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
        const pt = this.clientToDocument();
        //#endregion Variables déclaration
        if (!this.#dropDownPopup) {
            this.#dropDownPopup = core.classes.createComponent({
                class: DropDownListBoxPopup,
                owner: this,
                props: {
                    parentHTML: document.body,
                    refControl: this,
                    width: this.#dropDownWidth > -1 ? this.#dropDownWidth : this.HTMLElement.offsetWidth,
                    height: (this.#dropDownCount * this.#itemsSize) + 2,
                    itemsSize: this.#itemsSize,
                    items: [...this.#items],
                    listBoxPopupClass: this.#listBoxPopupClass
                }
            });
            this.#dropDownPopup.HTMLElement.classList.remove('hidden');
            this.#dropDownPopup.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
            this.#dropDownPopup.HTMLElement.classList.add('animated', 'fadeIn');
        }
    }
    //#endregion showPopup
    //#region destroyPopup
    destroyPopup() {
        this.#dropDownPopup.listBox.destroy();
        this.#dropDownPopup.destroy();
        this.#dropDownPopup = null;
        this.#opened = !1;
    }
    //#endregion destroyPopup
    //#region keyDown
    keyDown() {
        super.keyDown();
        if (core.keyboard.key === Keyboard.VKEYSCODES.VK_SPACE) {
            if (!this.#opened) {
                this.opened = !0;
            } else {
                if (!this.#dropDownPopup.refControl.mode) {
                    //this.text = this.#dropDownPopup.listbox.curDate.toString(core.tools.getLocale().date.formatPatterns.shortDate);
                    this.opened = !1;
                } else if (this.#dropDownPopup) {
                    this.#dropDownPopup.refControl.keyDown();
                }
            }
        } else if (this.#dropDownPopup) {
            this.#dropDownPopup.refControl.keyDown();
        }
    }
    //#endregion keyDown
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const TAG = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        this.#content = document.createElement(`${TAG}content`);
        this.#content.classList.add('DropDownListBoxContent');
        this.#content.jsObj = this;
        htmlElement.appendChild(this.#content);
        htmlElement.appendChild(document.createElement(`${TAG}arrow`));
        htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
        this.#input = document.createElement(core.types.HTMLELEMENTS.INPUT);
        this.#input.type = 'text';
        this.#input.classList.add('DropDownListBoxInput', this.themeName, 'csr_default');
        this.#input.jsObj = this;
        if (!this.#editable) {
            this.#input.classList.add('noEvents');
            this.#input.readOnly = 'readOnly';
        }
        Events.bind(this.#input, Mouse.MOUSEEVENTS.DOWN, this.mouseDown);
        this.#content.appendChild(this.#input);
        this.getImages();
    }
    //#endregion loaded
    //#region _mouseDown
    _mouseDown(mouseEventArg) {
        this.jsObj.editable && core.mouse.stopAllEvents(mouseEventArg);
    }
    //#endregion _mouseDown
    //#region destroy
    destroy() {
        this.clearItems();
        this.#items = null;
        //delete this.items;
        this.unBindAndDestroyEvents(['onChange', 'onDrawItem']);
        super.destroy();
    }
    //#endregion destroy
    //#region getImages
    getImages() {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        form[this.#images] && (this.#images = form[this.#images]);
    }
    //#endregion getImages
    //#region findItemIndexFromText
    findItemIndexFromText(text) {
        //#region Variables déclaration
        const item = this.#items.find(e => e.caption === text);
        //#endregion Variables déclaration
        return item ? item.index : -1;
    }
    //#endregion findItemIndexFromText
    //#region findItemFromText
    findItemFromText(text) {
        return this.#items.find(e => e.caption === text);
    }
    //#endregion findItemFromText
    //#region newItem
    newItem(props) {
        //const item = core.classes.createComponent({
        //    class: ListBoxItem, // à voir ici
        //    owner: this,
        //    props
        //    });
        this.#items.push(item);
        return item;
    }
    //#endregion newItem
    //#region addItem
    addItem(item) {
        item && item instanceof ListBoxItem && this.#items.add(item);
    }
    //#endregion addItem
    //#region removeItem
    removeItem() {
    }
    //#endregion removeItem
    //#region clear
    clearItems() {
        //#region Variables déclaration
        const items = this.#items;
        //#endregion Variables déclaration
        //items.forEach((item, index) => {
        //    item.destroy();
        //    items[index] = null;
        //});
        items.clear();
        this.text = String.EMPTY;
        this.#itemIndex = -1;
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
Object.defineProperties(DropDownListBox.prototype, {
    'text': {
        enumerable: !0
    },
    'dropDownCount': {
        enumerable: !0
    },
    'editable': {
        enumerable: !0
    },
    'items': {
        enumerable: !0
    },
    'itemIndex': {
        enumerable: !0
    },
    'itemsSize': {
        enumerable: !0
    },
    'listBoxPopupClass': {
        enumerable: !0
    },
    'dropDownWidth': {
        enumerable: !0
    }
});
Object.seal(DropDownListBox);
core.classes.register(core.types.CATEGORIES.INTERNAL, DropDownListBoxPopup, ListBoxPopup);
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