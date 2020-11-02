//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
import { BaseClass } from '/scripts/core/baseclass.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Point } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
import { Checkbox } from '/scripts/components/common/checkbox.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion Import
//#region Class ListBoxItem
class ListBoxItem /*extends BaseClass*/ {
    //#region Private fields
    #owner;
    #caption;
    #size;
    #checked;
    #isHeader;
    #enabled;
    #selected;
    #css;
    #imageIndex;
    #image;
    #cssImage;
    #allowGrayed;
    #autoTranslate;
    #translationKey;
    #state;
    #check;
    #icon;
    #text;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            //super(owner, props);
            this.#owner = owner;
            this.#caption = props.hasOwnProperty('caption') ? props.caption : String.EMPTY;
            this.#size = props.hasOwnProperty('size') ? props.size : owner.itemsSize;
            this.#checked = props.hasOwnProperty('checked') && core.tools.isBool(props.checked)
                ? props.checked : !1;
            this.#isHeader = props.hasOwnProperty('isHeader') && core.tools.isBool(props.isHeader)
                ? props.isHeader : !1;
            this.#enabled = props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled)
                ? props.enabled : !0;
            this.#selected = props.hasOwnProperty('selected') && core.tools.isBool(props.selected)
                ? props.selected : !1;
            this.#css = props.hasOwnProperty('css') ? props.css : String.EMPTY;
            this.#imageIndex = props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex)
                ? props.imageIndex : -1;
            this.#image = props.hasOwnProperty('image') ? props.image : String.EMPTY;
            this.#cssImage = props.hasOwnProperty('cssImage') ? props.cssImage : String.EMPTY;
            this.#allowGrayed = props.hasOwnProperty('allowGrayed') && core.tools.isBool(props.allowGrayed)
                ? props.allowGrayed : !1;
            this.#autoTranslate = props.hasOwnProperty('autoTranslate') && core.tools.isBool(props.autoTranslate)
                ? props.autoTranslate : !0;
            this.#translationKey = props.hasOwnProperty('translationKey') ? props.translationKey : String.EMPTY;
            this.#autoTranslate && !String.isNullOrEmpty(this.#translationKey) && this.app.getLocalText(this);
            this.#state = props.hasOwnProperty('state') ? props.state : Checkbox.CHECKBOXSTATES.UNCHECKED;
            //this.addPropertyEnum('state', Checkbox.CHECKBOXSTATES);
            //owner instanceof ListBox && owner.allowUpdate && owner.draw();
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
            //this.#updateItem(this);
        }
    }
    //#endregion state
    //#region translationKey
    get translationKey() {
        return this.#translationKey;
    }
    set translationKey(newValue) {
        core.tools.isString(newValue) && this.#translationKey !== newValue
            && (this.#translationKey = newValue);// && this.#updateItem(this);
    }
    //#endregion translationKey
    //#region autoTranslate
    get autoTranslate() {
        return this.#autoTranslate;
    }
    set autoTranslate(newValue) {
        core.tools.isBool(newValue) && this.#autoTranslate !== newValue
            && (this.#autoTranslate = newValue);// && this.#updateItem(this);
    }
    //#endregion autoTranslate
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
                //this.#updateItem(this);
                if (!this.#owner.loading && !this.#owner.form.loading) {
                    if (!core.isHTMLRenderer) {
                        this.#owner.allowUpdate && this.#owner.update();
                        //this.redraw();
                        //} else {
                        //    this.update();
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
            //this.#updateItem(this);
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
            //this.#updateItem(this);
        }
    }
    //#endregion enabled
    //#region allowGrayed
    get allowGrayed() {
        return this.#allowGrayed;
    }
    set allowGrayed(newValue) {
        if (core.tools.isBool(newValue) && this.#allowGrayed !== newValue) {
            this.#allowGrayed = newValue;
            //this.#updateItem(this);
        }
    }
    //#endregion allowGrayed
    //#region size
    get size() {
        return this.#size;
    }
    set size(newValue) {
        if (core.tools.isNumber(newValue) && this.#size !== newValue) {
            this.#size = newValue;
            //this.#updateItem(this);
            this.#owner.draw();
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
            //this.#updateItem(this);
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
            //this.#updateItem(this);
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
            //this.#updateItem(this);
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
            //this.#updateItem(this);
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
            //this.#updateItem(this);
        }
    }
    //#endregion image
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
    //#region updateItem
    #updateItem() {
        //#region Variables déclaration
        const owner = this.#owner;
        const index = owner.findItem(this);
        //#endregion Variables déclaration

        //owner.items[index]
    }
    //#endregion updateItem
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
    #nbrVisibleItems;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !0;
            super(owner, props);
            this.#multiSelect = props.hasOwnProperty('multiSelect') && core.tools.isBool(props.multiSelect)
                ? props.multiSelect : !1;
            this.#sorted = props.hasOwnProperty('sorted') && core.tools.isBool(props.sorted)
                ? props.sorted : !1;
            this.#itemsSize = props.hasOwnProperty('itemsSize') && core.tools.isNumber(props.itemsSize)
                ? props.itemsSize : 16;
            this.#itemsClass = props.hasOwnProperty('itemsClass')
                ? core.classes[props.itemsClass] : Object;
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
    set items(newValue) {
        if (core.tools.isArray(newValue)) {
            this.#items = newValue;
            this.#scrollPos = 0;
            this.draw();
        }
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
        return this.#items.filter(item => item.visible).length;
    }
    //#endregion count
    //#endregion Getters / Setters
    //#region Methods
    //#region innerHeight
    #innerHeight() {
        this.#items.filter(item => !item.size).forEach(item => item.size = this.#itemsSize);
        return this.count > 0 ? this.#items.reduce((accumulator, currentValue) => accumulator + currentValue.size, 0) : 0;
    }
    //#endregion innerHeight
    //#region updateItemCss
    #updateItemCss(item, pos, html) {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        let prop;
        let propPos;
        //#endregion Variables déclaration
        if (html) {
            if (this.orientation === core.types.ORIENTATIONS.VERTICAL) {
                prop = 'Height';
                propPos = 'top';
            } else {
                prop = 'Width';
                propPos = 'left';
            }
            html.style[`min${prop}`] = `${item.size}${PX}`;
            html.style[`max${prop}`] = `${item.size}${PX}`;
            html.style[`${prop.toLowerCase()}`] = `${item.size}${PX}`;
            html.style[propPos] = `${pos}${PX}`;
            html.classList.remove('disabled', 'isheader', 'selected', 'alternate', 'icon', 'grayed', 'checked');
            !item.enabled && item.html.classList.add('disabled');
            if (this.viewCheckboxes) {
                if (item.checked) {
                    item.check.classList.add('checked');
                } else if (item.allowGrayed && item.state === core.types.CHECKBOXSTATES.GRAYED) {
                    item.check.classList.add('grayed');
                }
            }
            item.isHeader && html.classList.add('isheader');
            item.selected && html.classList.add('selected');
            this.useAlternateColor && this.#items.indexOf(item) % 2 === 0 && html.classList.add('alternate');
            if (item.icon) {
                item.icon.classList.add('icon');
                if (!String.isNullOrEmpty(item.cssImage)) {
                    item.icon.classList.add(item.cssImage);
                    item.icon.style.backgroundSize = `${item.size}${PX} ${item.size}${PX}`;
                } else if (!String.isNullOrEmpty(item.image)) {
                    item.icon.style.backgroundImage = `url(${item.image})`;
                    item.icon.style.backgroundSize = `${item.size}${PX} ${item.size}${PX}`;
                } else if (this.images) {
                    if (item.imageIndex < this.images.images.length && item.imageIndex > -1) {
                        item.icon.style.backgroundImage = `url(${this.images.images[item.imageIndex]})`;
                        item.icon.style.backgroundSize
                            = `${this.images.imageWidth}${PX} ${this.images.imageHeight}${PX}`;
                    }
                }
            }
        }
    }
    //#endregion updateItemCss
    //#region draw
    draw() {
        //#region Variables déclaration
        const items = this.#items;
        const vert = this.#orientation === core.types.ORIENTATIONS.VERTICAL;
        const htmlElement = this.HTMLElement;
        const prop = vert ? 'Top' : 'Left';
        const propSize = vert ? 'Height' : 'Width';
        const innerHeight = this.#innerHeight();
        let x = 1;
        const lastElementChild = htmlElement.lastElementChild;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            this.#scrollPos =
                Math.max(Math.min(htmlElement[`scroll${prop}`], innerHeight
                    - htmlElement[`offset${propSize}`]), 0);
            let topIndex = Math.max(0, int(this.#scrollPos / this.#itemsSize));
            let maxIndex = topIndex + this.#nbrVisibleItems;
            maxIndex = Math.min(maxIndex, items.length);
            this.#scroller.style[propSize.toLowerCase()]
                = `${innerHeight}${core.types.CSSUNITS.PX}`;
            for (let i = topIndex; i < maxIndex; i++) {
                if (i<items.length) {
                    const item = items[i];
                    const html = htmlElement.children[x];
                    !item.size && (item.size = this.#itemsSize);
                    this.dropDownPopup && (item.dropDownPopup = this.dropDownPopup);
                    this.#drawItem(item, i * item.size, html);
                    html.item = item;
                    x++;
                }
            }
            lastElementChild && (topIndex + this.#nbrVisibleItems > maxIndex) 
                ? lastElementChild.classList.add('hidden') 
                : lastElementChild.classList.remove('hidden');
        }
    }
    //#endregion draw
    //#region drawItem
    #drawItem(item, pos, html) {
        //#region Variables déclaration
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}Item`;
        const ORIENTATIONS = core.types.ORIENTATIONS;
        //#endregion Variables déclaration
        if (html) {
            html.innerHTML = String.EMPTY;
            if (this.viewCheckboxes) {
                item.check = document.createElement(`${name}-check`);
                item.check.classList.add('CheckboxCheck', this.themeName);
                html.appendChild(item.check);
            }
            if (this.images || !String.isNullOrEmpty(item.image)
                || !String.isNullOrEmpty(item.cssImage)) {
                item.icon = document.createElement(`${name}-icon`);
                html.appendChild(item.icon);
            }
            item.text = document.createElement(`${name}-text`);
            item.text.classList.add(`${this.constructor.name}ItemCaption`);
            item.text.innerHTML = item.caption;
            html.appendChild(item.text);
            html.classList.add(`${this.constructor.name}Item`, this.themeName);
            this.orientation === ORIENTATIONS.VERTICAL
                ? html.classList.add('VListBoxItem') 
                : html.classList.add('HListBoxItem');
            !String.isNullOrEmpty(item.css) && (html.style.cssText += item.css);
        }
        if (!String.isNullOrEmpty(item.css)) {
            const cssPropsValues = item.css.split(';');
            cssPropsValues.forEach(cssProp => {
                const cssPropValue = cssProp.split(':');
                html.style[cssPropValue[0]] = cssPropValue[1];
            });
        }
        !core.tools.isBool(item.enabled) && (item.enabled = !0);
        !core.tools.isBool(item.checked) && (item.checked = !1);
        !core.tools.isBool(item.selected) && (item.selected = !1);
        !core.tools.isBool(item.isHeader) && (item.isHeader = !1);
        !core.tools.isBool(item.allowGrayed) && (item.allowGrayed = !1);
        !core.tools.isBool(item.autoTranslate) && (item.autoTranslate = !0);
        !core.tools.isBool(item.imageIndex) && (item.imageIndex = -1);
        !item.state && (item.state = Checkbox.CHECKBOXSTATES.UNCHECKED);
        this.#updateItemCss(item, pos, html);
        this.onDrawItem.invoke(item, html);
    }
    //#endregion drawItem
    //#region selectItem
    selectItem(item) {
        //#region Variables déclaration
        const html = Convert.nodeListToArray(this.HTMLElement.children).filter(child => child.item === item).first;
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const prop = this.#orientation === ORIENTATIONS.VERTICAL ? 'Top' : 'Left';
        //#endregion Variables déclaration
        if (!item.isHeader && item.enabled && this.enabled && html) {
            this.multiSelect && !core.keyboard.ctrl && this.clearSelection();
            this.multiSelect && core.keyboard.ctrl
                ? item.selected = !item.selected : (this.itemIndex = this.#items.indexOf(item)) && (item.selected = !0);
            this.viewCheckboxes && (item.checked = !item.checked);

            this.#updateItemCss(item, html[`offset${prop}`], html);
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
            this.#updateItemCss(item);
        }
    }
    //#endregion deselectItemIndex
    //#region addItem
    addItem(item) {
        if (item instanceof this.#itemsClass) {
            this.#items.push(item);
        }
    }
    //#endregion addItem
    //#region deleteItem
    deleteItem(item) {
        this.#items.indexOf(item) !== -1 && this.#items.remove(item);
    }
    //#endregion deleteItem
    //#region deleteAt
    deleteAt(index) {
        index >= 0 && index < this.#items.length && this.#items.removeAt(this.#items[index]);
    }
    //#endregion deleteAt
    //#region moveItem
    moveItem(itemToMove, itemBefore) {
        if (itemToMove instanceof ListBoxItem && itemBefore instanceof ListBoxItem) { // à revoir
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
        this.draw();
        this.#items.endUpdate();
    }
    //#endregion endUpdate
    //#region clear
    clear() {
        this.#visibleItems.clear();
        if (this.#items) {
            while (this.#items.length > 0) {
                this.#items.pop();
            }
            this.#items.clear();
        }
    }
    //#endregion clear
    //#region clearSelection
    clearSelection() {
        //#region Variables déclaration
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const prop = this.#orientation === ORIENTATIONS.VERTICAL ? 'Top' : 'Left';
        //#endregion Variables déclaration
        this.#items.forEach(item => {
            const html = Convert.nodeListToArray(this.HTMLElement.children).filter(child => child.item === item).first;
            item.selected = !1;
            html && this.#updateItemCss(item, html[`offset${prop}`], html);
        });
    }
    //#endregion clearSelection
    //#region selectAll
    selectAll() {
        this.#items.forEach(item => {
            item.selected = !0;
            this.#updateItemCss(item);
        });
    }
    //#endregion selectAll
    //#region destroy
    destroy() {
        while (htmlElement.children.length > 0) {
            const child = htmlElement.children[htmlElement.children.length - 1];
            child.item = null;
            child.innerHTML = String.EMPTY;
            child.parentNode.remove(child);
        }
        if (this.#items) {
            while (this.#items.length > 0) {
                this.#items.pop();
            }
            //this.#items.destroy();
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
        const item = this.#items[this.#itemIndex];
        const html = Convert.nodeListToArray(this.HTMLElement.children).filter(child => child.item === item).first;
        //const nbrVisibleItems = int(htmlElement[offsetPropSize] / this.#itemsSize);
        const base = ((this.#nbrVisibleItems * this.#itemsSize) - htmlElement[offsetPropSize]) + this.#itemsSize;
        //#endregion Variables déclaration
        if (html[offsetProp] - htmlElement[scrollProp] < 0
            || html[offsetProp] + html[offsetPropSize] - htmlElement[scrollProp] > htmlElement[`client${propSize}`]) {
            htmlElement[scrollProp] = html[offsetProp] - htmlElement[scrollProp] < 0
                ? this.#itemIndex * this.#itemsSize
                : base + ((this.#itemIndex - this.#nbrVisibleItems) * this.#itemsSize) + 2;
        }
    }
    //#endregion scrollToItem
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const propSize = this.#orientation === ORIENTATIONS.VERTICAL ? 'Height' : 'Width';
        const htmlElement = this.HTMLElement;
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        const offsetPropSize = `offset${propSize}`;
        //#endregion Variables déclaration
        super.loaded();
        this.#nbrVisibleItems = Math.round(htmlElement[offsetPropSize] / this.#itemsSize) + 1;
        this.getImages();
        this.#useAlternateColor && htmlElement.classList.add('useAlternateColor');
        this.#scroller = document.createElement(`${name}-scroller`);
        this.#scroller.classList.add('listBoxScroller');
        htmlElement.appendChild(this.#scroller);
        htmlElement.classList.add(`orientation-${this.#orientation}`);
        Events.bind(htmlElement, core.types.HTMLEVENTS.SCROLL, () => {
            core.mouse.stopAllEvents(); this.setFocus(); this.draw();
        });
        for (let i=0; i<this.#nbrVisibleItems;i++) {
            const html = document.createElement(`${name}Item`);
            this.orientation === ORIENTATIONS.VERTICAL
                ? html.classList.add('VListBoxItem') : html.classList.add('HListBoxItem');
            html.classList.add(name, this.themeName);
            this.HTMLElement.appendChild(html);
        }
        if (this.props.items) {
            if (core.tools.isArray(this.props.items)) {
                this.beginUpdate();
                this.props.items.forEach(item => {
                    this.#items.push(item);
                });
                this.endUpdate();
            }
        }
    }
    //#endregion loaded
    //#region getImages
    getImages() {
        core.tools.isString(this.#images) && this.form[this.#images] && (this.images = this.form[this.#images]);
    }
    //#endregion getImages
    //#region itemAtPos
    #itemAtPos(point) {
        //#region Variables déclaration
        let i = 0;
        let notFound = !0;
        let iHTMLElement/*item*/ = null;
        let itemRect = new core.classes.Rect();
        const htmlElement = this.HTMLElement;
        const offsetLeft = htmlElement.scrollLeft;
        const offsetTop = htmlElement.scrollTop;
        //#endregion Variables déclaration
        point.x += offsetLeft;
        point.y += offsetTop;
        while (notFound && i < this.#nbrVisibleItems/*visibleItems.length*/) {
            iHTMLElement/*item*/ = htmlElement.children[i+1]/*this.#visibleItems[i]*/;
            //let iHTMLElement = item.html;
            itemRect.setValues(iHTMLElement.offsetLeft, iHTMLElement.offsetTop,
                iHTMLElement.offsetLeft + iHTMLElement.offsetWidth, iHTMLElement.offsetTop + iHTMLElement.offsetHeight);
            point.inRect(itemRect) && (notFound = !1);
            i++;
        }
        notFound && (iHTMLElement/*item*/ = null);
        return iHTMLElement ? iHTMLElement.item : null;
    }
    //#endregion itemAtPos
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const item = this.#itemAtPos(core.mouse.target);
        //#endregion Variables déclaration
        super.mouseDown();
        item && this.selectItem(item);
    }
    //#endregion mouseDown
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