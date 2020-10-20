﻿//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
import { BaseClass } from '/scripts/core/baseclass.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Point } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
import { Checkbox } from '/scripts/components/common/checkbox.js';
//#endregion Import
//#region Class ListBoxItem
class ListBoxItem extends BaseClass {
    //#region Private fields
    #owner;
    #caption;
    #size;
    #checked;
    #isHeader;
    #enabled;
    #form;
    #selected;
    #css;
    #imageIndex;
    #image;
    #cssImage;
    #pos;
    #allowGrayed;
    #autoTranslate;
    #translationKey;
    #state;
    #html;
    #check;
    #icon;
    #text;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#owner = owner;
            this.#caption = props.hasOwnProperty('caption') ? props.caption : String.EMPTY;
            this.#size = props.hasOwnProperty('size') ? props.size : owner.itemsSize;
            this.#checked = props.hasOwnProperty('checked') && core.tools.isBool(props.checked)
                ? props.checked : !1;
            this.#isHeader = props.hasOwnProperty('isHeader') && core.tools.isBool(props.isHeader)
                ? props.isHeader : !1;
            this.#enabled = props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled)
                ? props.enabled : !0;
            this.#form = owner.form;
            this.#selected = props.hasOwnProperty('selected') && core.tools.isBool(props.selected)
                ? props.selected : !1;
            this.#css = props.hasOwnProperty('css') ? props.css : String.EMPTY;
            this.#imageIndex = props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex)
                ? props.imageIndex : -1;
            this.#image = props.hasOwnProperty('image') ? props.image : String.EMPTY;
            this.#cssImage = props.hasOwnProperty('cssImage') ? props.cssImage : String.EMPTY;
            this.#pos = props.hasOwnProperty('pos') && core.tools.isNumber(props.pos) ? props.pos : 0;
            this.#allowGrayed = props.hasOwnProperty('allowGrayed') && core.tools.isBool(props.allowGrayed)
                ? props.allowGrayed : !1;
            this.#autoTranslate = props.hasOwnProperty('autoTranslate') && core.tools.isBool(props.autoTranslate)
                ? props.autoTranslate : !0;
            this.#translationKey = props.hasOwnProperty('translationKey') ? props.translationKey : String.EMPTY;
            this.#autoTranslate && !String.isNullOrEmpty(this.#translationKey) && this.app.getLocalText(this);
            this.mouseEvents = new core.classes.MouseEvents();
            this.#state = props.hasOwnProperty('state') ? props.state : Checkbox.CHECKBOXSTATES.UNCHECKED;
            this.addPropertyEnum('state', Checkbox.CHECKBOXSTATES);
            owner instanceof ListBox && owner.allowUpdate && owner.draw();
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region state
    get state() {
        return this.#state;
    }
    set state(newValue) {
        if (core.tools.valueInSet(newValue, Checkbox.CHECKBOXSTATES) && this.#state !== newValue) {
            this.#state = newValue;
            this.update && !this.loading && !this.#form.creating && !this.#form.loading && this.update();
        }
    }
    //#endregion state
    //#region translationKey
    get translationKey() {
        return this.#translationKey;
    }
    set translationKey(newValue) {
        core.tools.isString(newValue) && this.#translationKey !== newValue
            && (this.#translationKey = newValue);
    }
    //#endregion translationKey
    //#region autoTranslate
    get autoTranslate() {
        return this.#autoTranslate;
    }
    set autoTranslate(newValue) {
        core.tools.isBool(newValue) && this.#autoTranslate !== newValue
            && (this.#autoTranslate = newValue);
    }
    //#endregion autoTranslate
    //#region pos
    get pos() {
        return this.#pos;
    }
    set pos(newValue) {
        core.tools.isNumber(newValue) && (this.#pos = newValue);
    }
    //#endregion pos
    //#region form
    get form() {
        return this.#form;
    }
    //#endregion form
    //#region html
    get html() {
        return this.#html;
    }
    //#endregion html
    //#region app
    get app() {
        return this.#owner.app;
    }
    //#endregion app
    //#region checked
    get checked() {
        return this.#checked;
    }
    set checked(newValue) {
        //#region Variables déclaration
        const checkboxStates = Checkbox.CHECKBOXSTATES;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
            if (this.#allowGrayed) {
                switch (this.#state) {
                    case checkboxStates.UNCHECKED:
                        this.#state = CHECKBOXSTATES.GRAYED;
                        newValue = !1;
                        break;
                    case checkboxStates.GRAYED:
                        this.#state = checkboxStates.CHECKED;
                        newValue = !0;
                        break;
                    case checkboxStates.CHECKED:
                        this.#state = checkboxStates.UNCHECKED;
                        newValue = !1;
                        break;
                }
            }
            else if (newValue) {
                this.#state = checkboxStates.CHECKED;
            }
            else {
                this.#state = checkboxStates.UNCHECKED;
            }
            if (this.#checked !== newValue) {
                this.#checked = newValue;
                if (!this.#owner.loading && !this.#form.loading) {
                    if (!core.isHTMLRenderer) {
                        this.#owner.allowUpdate && this.#owner.update();
                        this.redraw();
                    } else {
                        this.update();
                    }
                }
            }
        }
    }
    //#endregion checked
    //#region isHeader
    get isHeader() {
        return this.#isHeader;
    }
    set isHeader(newValue) {
        if (core.tools.isBool(newValue) && this.#isHeader !== newValue) {
            this.#isHeader = newValue;
            this.update();
        }
    }
    //#endregion isHeader
    //#region enabled
    get enabled() {
        return this.#enabled;
    }
    set enabled(newValue) {
        if (core.tools.isBool(newValue) && this.#enabled !== newValue) {
            this.#enabled = newValue;
            this.update();
        }
    }
    //#endregion enabled
    //#region size
    get size() {
        return this.#size;
    }
    set size(newValue) {
        if (core.tools.isNumber(newValue) && this.#size !== newValue) {
            this.#size = newValue;
            this.#owner.refreshInnerSize();
        }
    }
    //#endregion height
    //#region caption
    get caption() {
        return this.#caption;
    }
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.#caption !== newValue) {
            this.#caption = newValue;
            this.update();
        }
    }
    //#endregion caption
    //#region selected
    get selected() {
        return this.#selected;
    }
    set selected(newValue) {
        if (core.tools.isBool(newValue) && !this.#isHeader && this.#enabled && this.#selected !== newValue) {
            this.#selected = newValue;
            this.update();
        }
    }
    //#endregion selected
    //#region imageIndex
    get imageIndex() {
        return this.#imageIndex;
    }
    set imageIndex(newValue) {
        if (core.tools.isNumber(newValue) && this.#imageIndex !== newValue) {
            this.#imageIndex = newValue;
            this.#owner.allowUpdate && this.update();
        }
    }
    //#endregion imageIndex
    //#region cssImage
    get cssImage() {
        return this.#cssImage;
    }
    set cssImage(newValue) {
        if (core.tools.isString(newValue) && this.#cssImage !== newValue) {
            this.#cssImage = newValue;
            this.#owner.allowUpdate && this.update();
        }
    }
    //#endregion cssImage
    //#region image
    get image() {
        return this.#image;
    }
    set image(newValue) {
        if (core.tools.isString(newValue) && this.#image !== newValue) {
            this.#image = newValue;
            this.#owner.allowUpdate && this.update();
        }
    }
    //#endregion image
    //#region index
    get index() {
        return this.#owner.items ? this.#owner.items.indexOf(this) : -1;
    }
    //#endregion index
    //#region isEnabled
    get isEnabled() {
        return this.#enabled && this.#owner.isEnabled;
    }
    //#endregion isEnabled
    //#region owner
    get owner() {
        return this.#owner;
    }
    //#endregion owner
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        let prop;
        let propPos;
        //#endregion Variables déclaration
        if (this.#html) {
            if (this.#owner.orientation === core.types.ORIENTATIONS.VERTICAL) {
                prop = 'Height';
                propPos = 'top';
            } else {
                prop = 'Width';
                propPos = 'left';
            }
            this.#html.style[`min${prop}`] = `${this.#size}${PX}`;
            this.#html.style[`max${prop}`] = `${this.#size}${PX}`;
            this.#html.style[`${prop.toLowerCase()}`] = `${this.#size}${PX}`;
            if (this.#owner.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
                this.#html.style[propPos] = `${this.#pos}${PX}`;
                this.#html.style.position = 'absolute';
            } else {
                this.#html.style.position = 'static';
            }
            this.#html.classList.remove('disabled', 'isheader', 'selected');
            !this.#enabled && this.#html.classList.add('disabled');
            if (this.#owner.viewCheckboxes) {
                this.#check.classList.remove('grayed', 'checked');
                this.#check && this.#check.classList.remove('checked');
                if (this.#checked) {
                    this.#check.classList.add('checked');
                } else if (this.#allowGrayed && this.#state === core.types.CHECKBOXSTATES.GRAYED) {
                    this.#check.classList.add('grayed');
                }
            }
            this.#isHeader && this.#html.classList.add('isheader');
            this.#selected && this.#html.classList.add('selected');
            this.#owner.useAlternateColor && this.index % 2 === 0 && this.#html.classList.add('alternate');
            if (this.#icon) {
                this.#icon.classList.add('icon');
                if (!String.isNullOrEmpty(this.#cssImage)) {
                    this.#icon.classList.add(this.#cssImage);
                    this.#icon.style.backgroundSize = `${this.#size}${PX} ${this.#size}${PX}`;
                } else if (!String.isNullOrEmpty(this.#image)) {
                    this.#icon.style.backgroundImage = `url(${this.#image})`;
                    this.#icon.style.backgroundSize = `${this.#size}${PX} ${this.#size}${PX}`;
                } else if (this.#owner.images) {
                    if (this.#imageIndex < this.#owner.images.images.length && this.#imageIndex > -1) {
                        this.#icon.style.backgroundImage = `url(${this.#owner.images.images[this.#imageIndex]})`;
                        this.#icon.style.backgroundSize
                            = `${this.#owner.images.imageWidth}${PX} ${this.#owner.images.imageHeight}${PX}`;
                    }
                }
            }
        }
    }
    //#endregion update
    //#region draw
    draw() {
        //#region Variables déclaration
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        const ORIENTATIONS = core.types.ORIENTATIONS;
        //#endregion Variables déclaration
        if (!this.#html) {
            this.#html = document.createElement(`${name}`);
            if (this.#owner.viewCheckboxes) {
                this.#check = document.createElement(`${name}-check`);
                this.#check.classList.add('CheckboxCheck', this.#owner.themeName);
                this.#html.appendChild(this.#check);
            }
            if (this.#owner.images || !String.isNullOrEmpty(this.#image)
                || !String.isNullOrEmpty(this.#cssImage)) {
                this.#icon = document.createElement(`${name}-icon`);
                this.#html.appendChild(this.#icon);
            }
            this.#text = document.createElement(`${name}-text`);
            this.#text.classList.add(`${this.constructor.name}Caption`);
            this.#text.innerHTML = this.#caption;
            this.#html.appendChild(this.#text);
            this.#html.classList.add('Control', this.constructor.name, this.#owner.themeName);
            this.#owner.orientation === ORIENTATIONS.VERTICAL
                ? this.#html.classList.add('VListBoxItem') : this.#html.classList.add('HListBoxItem');
            this.#owner.HTMLElement.appendChild(this.#html);
            !String.isNullOrEmpty(this.#css) && (this.#html.style.cssText += this.#css);
            Events.bind(this.#html, Mouse.MOUSEEVENTS.DOWN, () => { this.#owner.selectItem(this); });
        }
        this.update();
        if (!String.isNullOrEmpty(this.#css)) {
            const cssPropsValues = this.#css.split(';');
            cssPropsValues.forEach(cssProp => {
                const cssPropValue = cssProp.split(':');
                this.#html.style[cssPropValue[0]] = cssPropValue[1];
            });
        }
        this.#owner.onDrawItem.invoke(this);
    }
    //#endregion draw
    //#region removeToHTML
    removeToHTML() {
        if (this.#html) {
            Events.unBind(this.#html, Mouse.MOUSEEVENTS.DOWN, () => { this.#owner.selectItem(this); });
            this.#icon && this.html.removeChild(this.#icon);
            this.#html.removeChild(this.#text);
            this.#owner.HTMLElement.removeChild(this.#html);
            this.#html = null;
            this.#icon = null;
            this.#text = null;
        }
    }
    //#endregion removeToHTML
    //#region destroy
    destroy() {
        this.removeToHTML();
        this.#owner.items.remove(this);
        this.mouseEvents.destroy();
        this.mouseEvents = null;
        delete this.mouseEvents;
        super.destroy();
    }
    //#endregion destroy
    //#region clone
    clone() {
        return Object.create(this);
    }
    //#endregion clone
    //#endregion Methods
}
Object.defineProperties(ListBoxItem.prototype, {
    'caption': {
        enumerable: !0
    },
    'size': {
        enumerable: !0
    },
    'checked': {
        enumerable: !0
    },
    'isHeader': {
        enumerable: !0
    },
    'enabled': {
        enumerable: !0
    },
    'selected': {
        enumerable: !0
    },
    'css': {
        enumerable: !0
    },
    'imageIndex': {
        enumerable: !0
    },
    'image': {
        enumerable: !0
    },
    'cssImage': {
        enumerable: !0
    },
    'allowGrayed': {
        enumerable: !0
    },
    'autoTranslate': {
        enumerable: !0
    },
    'translationKey': {
        enumerable: !0
    }
});
Object.seal(ListBoxItem);
//#endregion ListBoxItem
//#region Class ListBox
class ListBox extends ScrollControl {
    //#region Private fields
    #items = [];
    #itemsClass;
    #visibleItems = [];
    #scrollPos = 0;
    #innerHeight = 0;
    #lastDelta = new Point;
    #downPos = new Point;
    #currentPos = new Point;
    #keyDir = String.EMPTY;
    #multiSelect;
    #sorted;
    #itemsSize;
    #useAlternateColor;
    #viewCheckboxes;
    #itemIndex;
    #columns;
    #images;
    #animated;
    #orientation;
    #scroller;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            !props.hasOwnProperty('scrollMode') ? props.scrollMode = ScrollControl.SCROLLMODES.VIRTUAL : null;
            props.canFocused = !0;
            super(owner, props);
            this.#multiSelect = props.hasOwnProperty('multiSelect') && core.tools.isBool(props.multiSelect)
                ? props.multiSelect : !1;
            this.#sorted = props.hasOwnProperty('sorted') && core.tools.isBool(props.sorted)
                ? props.sorted : !1;
            this.#itemsSize = props.hasOwnProperty('itemsSize') && core.tools.isNumber(props.itemsSize)
                ? props.itemsSize : 16;
            this.#itemsClass = props.hasOwnProperty('itemsClass')
                ? core.classes[props.itemsClass] : ListBoxItem;
            this.#useAlternateColor = props.hasOwnProperty('useAlternateColor')
                && core.tools.isBool(props.useAlternateColor)
                ? props.useAlternateColor : !1;
            this.#viewCheckboxes = props.hasOwnProperty('viewCheckboxes')
                && core.tools.isBool(props.viewCheckboxes)
                ? props.viewCheckboxes : !1;
            this.#itemIndex = props.hasOwnProperty('itemIndex') && core.tools.isNumber(props.itemIndex)
                ? props.itemIndex : -1;
            this.#columns = props.hasOwnProperty('columns') && core.tools.isNumber(props.columns)
                ? props.columns : 1;
            this.#images = props.hasOwnProperty('images') ? props.images : null;
            this.#orientation = props.hasOwnProperty('orientation')
                ? props.orientation : core.types.ORIENTATIONS.VERTICAL;
            this.#items.convertToCollection(owner, this.#itemsClass);
            this.createEventsAndBind(['onChange', 'onSelectItem', 'onDrawItem'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region items
    get items() {
        return this.#items;
    }
    //#endregion items
    //#region multiSelect
    get multiSelect() {
        return this.#multiSelect;
    }
    set multiSelect(newValue) {
        core.tools.isBool(newValue) && this.#multiSelect !== newValue && (this.#multiSelect = newValue);
    }
    //#endregion multiSelect
    //#region sorted
    get sorted() {
        return this.#sorted;
    }
    set sorted(newValue) {
        if (core.tools.isBool(newValue) && this.#sorted !== newValue) {
            this.#sorted = newValue;
            if (this.#sorted) {
                this.#items.sort();
                this.draw();
            }
        }
    }
    //#endregion sorted
    //#region itemsSize
    get itemsSize() {
        return this.#itemsSize;
    }
    set itemsSize(newValue) {
        if (core.tools.isNumber(newValue) && this.#itemsSize !== newValue) {
            this.#items.forEach(item => {
                item.size === this.#itemsSize && (item.size = newValue);
            });
            this.#itemsSize = newValue;
            this.draw();
        }
    }
    //#endregion itemsSize
    //#region useAlternateColor
    get useAlternateColor() {
        return this.#useAlternateColor;
    }
    set useAlternateColor(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#useAlternateColor !== newValue) {
            htmlElement.classList.remove('useAlternateColor');
            this.#useAlternateColor = newValue;
            newValue && htmlElement.classList.add('useAlternateColor');
        }
    }
    //#endregion useAlternateColor
    //#region viewCheckboxes
    get viewCheckboxes() {
        return this.#viewCheckboxes;
    }
    set viewCheckboxes(newValue) {
        if (core.tools.isBool(newValue) && !(this instanceof core.classes.HorizontalListBox)) {
            if (this.#viewCheckboxes !== newValue) {
                this.#viewCheckboxes = newValue;
                this.draw();
            }
        }
    }
    //#endregion viewCheckboxes
    //#region itemIndex
    get itemIndex() {
        return this.#itemIndex;
    }
    set itemIndex(newValue) {
        //#region Variables déclaration
        const vert = this.#orientation === core.types.ORIENTATIONS.VERTICAL;
        const prop = vert ? 'Top' : 'Left';
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue < this.#items.length && newValue >= 0) {
            if (this.#itemIndex !== newValue) {
                this.#itemIndex > -1 && this.deselectItemIndex();
                let item = this.#items[newValue];
                while ((item.isHeader || !item.enabled) && (newValue > -1 && newValue < this.#items.length)) {
                    this.#keyDir === core.types.DIRECTIONS.LEFT ? newValue-- : newValue++;
                    item = this.#items[newValue];
                }
                newValue = Math.min(Math.max(newValue, 0), this.#items.length - 1);
                this.#itemIndex = newValue;
                item = this.#items[this.#itemIndex];
                if (item) {
                    item.selected = !0;
                    if (this.owner instanceof core.classes.DropDownListBoxPopup) {
                        htmlElement[`scroll${prop}`] = this.#itemIndex * this.#itemsSize;
                        this.draw();
                    }
                    this.scrollToItem();
                }
            }
        }
    }
    //#endregion itemIndex
    //#region orientation
    get orientation() {
        return this.#orientation;
    }
    set orientation(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && this.#orientation !== newValue) {
            htmlElement.classList.remove(`orientation-${this.#orientation}`);
            this.#orientation = newValue;
            htmlElement.classList.remove(`orientation-${this.#orientation}`);
            this.draw();
        }
    }
    //#endregion orientation
    //#region images
    get images() {
        return this.#images;
    }
    set images(newValue) {
        if (newValue instanceof core.classes.ImageList && this.#images !== newValue) {
            this.#images = newValue;
            this.draw();
        }
    }
    //#endregion images
    //#region count
    get count() {
        return this.#items.count();
    }
    //#endregion count
    //#endregion Getters / Setters
    //#region Methods
    //#region draw
    draw() {
        //#region Variables déclaration
        const oldVisibleItems = this.#visibleItems;
        const items = this.#items;
        const vert = this.#orientation === core.types.ORIENTATIONS.VERTICAL;
        const scrollModeNormal = this.scrollMode === ScrollControl.SCROLLMODES.NORMAL;
        const htmlElement = this.HTMLElement;
        let itemVisible = !1;
        const prop = vert ? 'Top' : 'Left';
        const propSize = vert ? 'Height' : 'Width';
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            this.#scrollPos =
                Math.max(Math.min(htmlElement[`scroll${prop}`], this.#innerHeight
                    - htmlElement[`offset${propSize}`]), 0);
            this.#visibleItems = [];
            let topIndex = 0;
            topIndex = Math.max(0, int(this.#scrollPos / this.#itemsSize));
            let maxIndex = !oldVisibleItems.isEmpty
                ? topIndex + oldVisibleItems.length * 2 : int(htmlElement.offsetHeight / this.#itemsSize) + 1;
            maxIndex = Math.min(maxIndex, items.length);
            !scrollModeNormal && (this.#scroller.style[propSize.toLowerCase()]
                = `${this.#innerHeight}${core.types.CSSUNITS.PX}`);
            for (let i = topIndex; i < maxIndex; i++) {
                const item = items[i];
                if (scrollModeNormal) {
                    itemVisible = !0;
                } else {
                    itemVisible = !1;
                    ((item.pos + item.size >= this.#scrollPos)
                        && (item.pos < htmlElement[`offset${propSize}`] + this.#scrollPos))
                        && (itemVisible = !0);
                }
                if (itemVisible) {
                    this.dropDownPopup && (item.dropDownPopup = this.dropDownPopup);
                    item.draw();
                    this.#visibleItems.push(item);
                }
            }
            oldVisibleItems.forEach(item => {
                this.#visibleItems.indexOf(item) === -1 && item.removeToHTML();
            });
        }
    }
    //#endregion draw
    //#region selectItem
    selectItem(item) {
        if (!item.isHeader && item.enabled && this.enabled && this.mouseEvents.mousedown) {
            this.multiSelect && !core.keyboard.ctrl && item.owner.clearSelection();
            this.multiSelect && core.keyboard.ctrl
                ? item.selected = !item.selected : this.itemIndex = item.index;
            this.viewCheckboxes && (item.checked = !item.checked);
            this.onSelectItem.hasListener && this.onSelectItem.invoke();
        }
        //this.mouseDown();
    }
    //#endregion selectItem
    //#region deselectItemIndex
    deselectItemIndex() {
        if (this.#itemIndex !== -1) {
            const item = this.#items[this.#itemIndex];
            item && (item.selected = !1);
        }
    }
    //#endregion deselectItemIndex
    //#region refreshInnerHeight
    refreshInnerHeight() {
        //#region Variables déclaration
        const items = this.#items;
        //#endregion Variables déclaration
        this.#innerHeight = 0;
        items.forEach(item => {
            this.#innerHeight += item.size;
        });
        this.allowUpdate && this.draw();
    }
    //#endregion refreshInnerHeight
    //#region addItem
    addItem(item) {
        if (item instanceof ListBoxItem) {
            this.#innerHeight += item.size;
            item.pos = this.#items.last ? this.#items.last.pos + item.size : 0;
            this.#items.push(item);
        }
    }
    //#endregion addItem
    //#region deleteItem
    deleteItem(item) {
        item instanceof ListBoxItem && this.#items.indexOf(item) !== -1 && this.#items.remove(item);
    }
    //#endregion deleteItem
    //#region deleteAt
    deleteAt(index) {
        index >= 0 && index < this.#items.length && this.#items.removeAt(this.#items[index]);
    }
    //#endregion deleteAt
    //#region moveItem
    moveItem(itemToMove, itemBefore) {
        if (itemToMove instanceof ListBoxItem && itemBefore instanceof ListBoxItem) {
            this.#visibleItems.indexOf(itemToMove) > -1 && this.#items.beginUpdate();
            this.#items.remove(itemToMove);
            this.#items.insert(itemBefore.index, itemToMove);
            this.#itemIndex = itemToMove.index;
            this.#visibleItems.indexOf(itemToMove) > -1 && this.#items.endUpdate();
        }
    }
    //#endregion moveItem
    //#region beginUpdate
    beginUpdate() {
        super.beginUpdate();
        this.#items.beginUpdate();
    }
    //#endregion beginUpdate
    //#region endUpdate
    endUpdate() {
        super.endUpdate();
        this.refreshInnerHeight();
        this.#items.endUpdate();
    }
    //#endregion endUpdate
    //#region clear
    clear() {
        this.#visibleItems.clear();
        if (this.#items) {
            while (this.#items.length > 0) {
                this.#items.pop().destroy();
            }
            this.#items.clear();
        }
    }
    //#endregion clear
    //#region clearSelection
    clearSelection() {
        this.#items.forEach(item => {
            item.selected = !1;
        });
    }
    //#endregion clearSelection
    //#region selectAll
    selectAll() {
        this.#items.forEach(item => {
            item.selected = !0;
        });
    }
    //#endregion selectAll
    //#region destroy
    destroy() {
        if (this.#items) {
            while (this.#items.length > 0) {
                this.#items.last.destroy();
                this.#items.pop();
            }
            this.#items.destroy();
        }
        this.#visibleItems.destroy();
        this.#lastDelta.destroy();
        this.#downPos.destroy();
        this.#currentPos.destroy();
        //this.#animated = null;
        this.unBindAndDestroyEvents(['onChange', 'onSelectItem', 'onDrawItem']);
        super.destroy();
    }
    //#endregion destroy
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        const DIRECTIONS = core.types.DIRECTIONS;
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
            case VKEYSCODES.VK_LEFT:
            case VKEYSCODES.VK_UP:
                this.#keyDir = DIRECTIONS.LEFT;
                this.itemIndex = this.#itemIndex - 1;
                break;
            case VKEYSCODES.VK_RIGHT:
            case VKEYSCODES.VK_DOWN:
                this.#keyDir = DIRECTIONS.RIGHT;
                this.itemIndex = this.#itemIndex + 1;
                break;
            case VKEYSCODES.VK_HOME:
                this.itemIndex = 0;
                break;
            case VKEYSCODES.VK_END:
                this.itemIndex = this.#items.length - 1;
                break;
            case VKEYSCODES.VK_PAGEUP:
                this.itemIndex = this.#orientation === ORIENTATIONS.VERTICAL
                    ? this.#itemIndex - int(htmlElement.offsetHeight / this.#itemsSize)
                    : this.#itemIndex - int(htmlElement.offsetWidth / this.#itemsSize);
                break;
            case VKEYSCODES.VK_PAGEDOWN:
                this.itemIndex = this.#orientation === ORIENTATIONS.VERTICAL
                    ? this.#itemIndex + int(htmlElement.offsetHeight / this.#itemsSize)
                    : this.#itemIndex + int(htmlElement.offsetWidth / this.#itemsSize);
                break;
            case VKEYSCODES.VK_SPACE:
                {
                    const item = this.#items[this.#itemIndex];
                    this.#viewCheckboxes && item && (item.checked = !item.checked);
                }
                break;
        }
    }
    //#endregion keyDown
    //#region scrollToItem
    scrollToItem() {
        //#region Variables déclaration
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const htmlElement = this.HTMLElement;
        const prop = this.#orientation === ORIENTATIONS.VERTICAL ? 'Top' : 'Left';
        const propSize = this.#orientation === ORIENTATIONS.VERTICAL ? 'Height' : 'Width';
        const scrollProp = `scroll${prop}`;
        const offsetPropSize = `offset${propSize}`;
        const offsetProp = `offset${prop}`;
        const itemHtml = this.#items[this.#itemIndex].html;
        //#endregion Variables déclaration
        if (this.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
            const nbrVisibleItems = int(htmlElement[offsetPropSize] / this.#itemsSize);
            const base = ((nbrVisibleItems * this.#itemsSize) - htmlElement[offsetPropSize]) + this.#itemsSize;
            if (itemHtml[offsetProp] - htmlElement[scrollProp] < 0
                || itemHtml[offsetProp] + itemHtml[offsetPropSize] - htmlElement[scrollProp] > htmlElement[`client${propSize}`]) {
                htmlElement[scrollProp] = itemHtml[offsetProp] - htmlElement[scrollProp] < 0
                    ? this.#itemIndex * this.#itemsSize
                    : base + ((this.#itemIndex - nbrVisibleItems) * this.#itemsSize) + 2;
            }
        } else {
            if (itemHtml[offsetProp] + itemHtml[offsetPropSize] >
                htmlElement[offsetPropSize] + htmlElement[scrollProp]) {
                htmlElement[scrollProp] = itemHtml[offsetPropSize] + itemHtml[offsetPropSize] + 2
                    - htmlElement[offsetPropSize];
            } else if (htmlElement[scrollProp] > itemHtml[offsetProp]) {
                htmlElement[scrollProp] = itemHtml[offsetProp] - 1;
            }
        }
    }
    //#endregion scrollToItem
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        //#endregion Variables déclaration
        super.loaded();
        this.getImages();
        this.#innerHeight = 0;
        this.#scroller = document.createElement(`${name}-scroller`);
        this.#scroller.classList.add('listBoxScroller');
        htmlElement.appendChild(this.#scroller);
        if (this.props.items) {
            if (core.tools.isArray(this.props.items)) {
                this.beginUpdate();
                this.props.items.forEach((item, idx) => {
                    const props = item;
                    props.inForm = !1;
                    props.selected = this.#itemIndex === idx;
                    props.height = item.hasOwnProperty('height') && core.tools.isNumber(item.size)
                        ? item.size : this.#itemsSize;
                    const _item = core.classes.createComponent({
                        class: this.#itemsClass,
                        owner: this,
                        props
                    });
                    this.addItem(_item);
                });
                this.endUpdate();
            }
        }
        this.#useAlternateColor && htmlElement.classList.add('useAlternateColor');
        htmlElement.classList.add(`orientation-${this.#orientation}`);
        this.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL
            && Events.bind(htmlElement, core.types.HTMLEVENTS.SCROLL, () => {
                core.mouse.stopAllEvents(); this.setFocus(); this.draw();
            });
        this.draw();
    }
    //#endregion loaded
    //#region getImages
    getImages() {
        core.tools.isString(this.#images) && this.form[this.#images] && (this.images = this.form[this.#images]);
    }
    //#endregion getImages
    //#region itemAtPos
    itemAtPos(point) {
        //#region Variables déclaration
        let i = 0;
        let notFound = !0;
        let item = null;
        let itemRect = new core.classes.Rect();
        const htmlElement = this.HTMLElement;
        const offsetLeft = htmlElement.scrollLeft;
        const offsetTop = htmlElement.scrollTop;
        //#endregion Variables déclaration
        point.x += offsetLeft;
        point.y += offsetTop;
        while (notFound && i < this.#visibleItems.length) {
            item = this.#visibleItems[i];
            let iHTMLElement = item.html;
            itemRect.setValues(iHTMLElement.offsetLeft, iHTMLElement.offsetTop,
                iHTMLElement.offsetLeft + iHTMLElement.offsetWidth, iHTMLElement.offsetTop + iHTMLElement.offsetHeight);
            point.inRect(itemRect) && (notFound = !1);
            i++;
        }
        return !notFound && item;
    }
    //#endregion itemAtPos
    //#endregion Methods
}
Object.defineProperties(ListBox.prototype, {
    'multiSelect': {
        enumerable: !0
    },
    'sorted': {
        enumerable: !0
    },
    'itemsSize': {
        enumerable: !0
    },
    'itemsClass': {
        enumerable: !0
    },
    'useAlternateColor': {
        enumerable: !0
    },
    'viewCheckboxes': {
        enumerable: !0
    },
    'itemIndex': {
        enumerable: !0
    },
    'columns': {
        enumerable: !0
    },
    'images': {
        enumerable: !0
    },
    'orientation': {
        enumerable: !0
    }
});
Object.seal(ListBox);
core.classes.register(core.types.CATEGORIES.INTERNAL, ListBoxItem);
core.classes.register(core.types.CATEGORIES.COMMON, ListBox);
//#endregion ListBox
//#region Templates
if (core.isHTMLRenderer) {
    const ListBoxTpl = ['<jagui-listbox id="{internalId}" data-class="ListBox" class="Control scrollContent ListBox {theme}">',
        '</jagui-listbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ListBox, template: ListBoxTpl }]);
}
//#endregion
export { ListBoxItem, ListBox };