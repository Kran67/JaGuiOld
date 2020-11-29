//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Point } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
import { Checkbox } from '/scripts/components/common/checkbox.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion Import
//#region Class ListBox
class ListBox extends ScrollControl {
    //#region Private fields
    #items = [];
    #itemsClass;
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
    #images;
    #animated;
    #orientation;
    #scroller;
    #nbrVisibleItems;
    #visibleItems = [];
    #isBusy;
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
            this.#images = props.hasOwnProperty('images') ? props.images : null;
            this.#orientation = props.hasOwnProperty('orientation')
                ? props.orientation : core.types.ORIENTATIONS.VERTICAL;
            this.#items.convertToCollection(owner, Object);
            this.createEventsAndBind(['onChange', 'onSelectItem', 'onDrawItem'], props);
            this.#isBusy = !1;
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
            newValue = newValue.map(item => !item.isProxy ? this.#createItemProxy(item) : item);
            newValue.convertToCollection(this, Object);
            this.#items = newValue;
            this.#scrollPos = 0;
            this.#checkVisibleItems();
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
        const items = this.#visibleItems;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue < items.length && newValue >= 0) {
            if (this.#itemIndex !== newValue) {
                this.#itemIndex > -1 && this.#deselectItemIndex();
                let item = items[newValue];
                if (item.isHeader || !item.enabled) {
                    this.#itemIndex = -1;
                }
                item = items[newValue];
                if (item && !item.isHeader && item.enabled) {
                    this.#itemIndex = newValue;
                    item.selected = !0;
                    //if (this.owner instanceof core.classes.DropDownListBoxPopup) {
                    //    htmlElement[`scroll${prop}`] = this.#itemIndex * this.#itemsSize;
                    //    this.draw();
                    //}
                    this.#scrollToItem();
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
        return this.#items.length;
    }
    //#endregion count
    //#endregion Getters / Setters
    //#region Methods
    //#region innerHeight
    #innerHeight() {
        //#region Variables déclaration
        const items = this.#items.filter(item => item.visible);
        //#endregion Variables déclaration
        return this.count > 0 ? items.reduce((accumulator, currentValue) => accumulator + currentValue.size, 0) : 0;
    }
    //#endregion innerHeight
    //#region visibleItems
    #checkVisibleItems() {
        this.#visibleItems = this.#items.filter(item => !item.hasOwnProperty('visible') || item.visible);
    }
    //#endregion visibleItems
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
            !item.enabled && html.classList.add('disabled');
            if (this.viewCheckboxes) {
                if (item.checked) {
                    item.check.classList.add('checked');
                } else if (item.allowGrayed && item.state === core.types.CHECKBOXSTATES.GRAYED) {
                    item.check.classList.add('grayed');
                }
            }
            item.isHeader && html.classList.add('isheader');
            item.selected && html.classList.add('selected');
            this.useAlternateColor && this.#visibleItems.indexOf(item) % 2 === 0 && html.classList.add('alternate');
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
        const items = this.#visibleItems;
        const vert = this.#orientation === core.types.ORIENTATIONS.VERTICAL;
        const htmlElement = this.HTMLElement;
        const prop = vert ? 'Top' : 'Left';
        const propSize = vert ? 'Height' : 'Width';
        let innerHeight;
        let x = 1;
        let t = 0;
        let i;
        let topIndex;
        let maxIndex;
        const lastElementChild = htmlElement.lastElementChild;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading && this.allowUpdate && !this.#isBusy) {
            this.#isBusy = !this.#isBusy;
            innerHeight = this.#innerHeight();
            this.#scrollPos =
                Math.max(Math.min(htmlElement[`scroll${prop}`], innerHeight
                    - htmlElement[`offset${propSize}`]), 0);
            topIndex = Math.max(0, int(this.#scrollPos / this.#itemsSize));
            maxIndex = Math.min(topIndex + this.#nbrVisibleItems, items.length);
            t = this.count > 0 ? items.slice(0, topIndex).reduce((accumulator, currentValue) => accumulator + currentValue.size, 0) : 0;
            this.#scroller.style[propSize.toLowerCase()]
                = `${innerHeight}${core.types.CSSUNITS.PX}`;
            for (i = topIndex; i < maxIndex; i++) {
                if (i < items.length) {
                    const item = items[i];
                    const html = htmlElement.children[x];
                    !item.size && (item.size = this.#itemsSize);
                    this.dropDownPopup && (item.dropDownPopup = this.dropDownPopup);
                    this.#drawItem(item, t, html);
                    html.item = item;
                    x++;
                    t += item.size;
                }
            }
            lastElementChild && (topIndex + this.#nbrVisibleItems > maxIndex)
                ? lastElementChild.classList.add('hidden')
                : lastElementChild.classList.remove('hidden');
            this.#isBusy = !this.#isBusy;
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
        this.#updateItemCss(item, pos, html);
        this.onDrawItem.invoke(item, html);
    }
    //#endregion drawItem
    //#region selectItem
    #selectItem(item) {
        //#region Variables déclaration
        const html = Convert.nodeListToArray(this.HTMLElement.children).filter(child => child.item === item).first;
        //#endregion Variables déclaration
        if (!item.isHeader && item.enabled && this.enabled && html) {
            this.beginUpdate();
            this.multiSelect && !core.keyboard.ctrl && this.clearSelection();
            this.multiSelect && core.keyboard.ctrl
                ? item.selected = !item.selected : (this.itemIndex = this.#visibleItems.indexOf(item)) && (item.selected = !0);
            this.viewCheckboxes && (item.checked = !item.checked);
            this.onSelectItem.hasListener && this.onSelectItem.invoke();
            this.endUpdate();
        }
    }
    //#endregion selectItem
    //#region deselectItemIndex
    #deselectItemIndex() {
        if (this.#itemIndex !== -1) {
            const item = this.#visibleItems[this.#itemIndex];
            item && (item.selected = !1);
        }
    }
    //#endregion deselectItemIndex
    //#region addItem
    addItem(item) {
        item instanceof Object && this.#items.push(this.#createItemProxy(item));
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
        if (itemToMove instanceof Object && itemBefore instanceof Object) {
            this.#items.indexOf(itemToMove) > -1 && this.#items.beginUpdate();
            this.#items.remove(itemToMove);
            this.#items.insert(itemBefore.index, itemToMove);
            this.#itemIndex = itemToMove.index;
            this.#items.indexOf(itemToMove) > -1 && this.#items.endUpdate();
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
                this.itemIndex = this.#visibleItems.length - 1;
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
        core.keyboard.stopEvent();
    }
    //#endregion keyDown
    //#region scrollToItem
    #scrollToItem() {
        //#region Variables déclaration
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const htmlElement = this.HTMLElement;
        const prop = this.#orientation === ORIENTATIONS.VERTICAL ? 'Top' : 'Left';
        const propSize = this.#orientation === ORIENTATIONS.VERTICAL ? 'Height' : 'Width';
        const scrollProp = `scroll${prop}`;
        const offsetProp = `offset${prop}`;
        const items = this.#visibleItems;
        const htmlItems = Convert.nodeListToArray(this.HTMLElement.children);
        const itemIndex = items[this.#itemIndex];
        let scrollPos = 0;
        let idx = 0;
        let html;
        //#endregion Variables déclaration
        while (idx < items.length) { // à remplacer
            const item = items[idx];
            if (item == itemIndex) {
                break;
            }
            scrollPos += item.size;
            idx++;
        }
        html = htmlItems.filter(child => child.item === itemIndex).first;
        if (!html || (html && html[offsetProp] + html.item.size - htmlElement[scrollProp] >= htmlElement[`client${propSize}`]) ||
            html[offsetProp] - htmlElement[scrollProp] <= 0) {
            htmlElement[scrollProp] = scrollPos;
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
            core.mouse.stopAllEvents();
            this.setFocus();
            this.draw();
        });
        for (let i = 0; i < this.#nbrVisibleItems; i++) {
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
                    this.#items.push(this.#createItemProxy(item));
                });
                this.#checkVisibleItems();
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
        let iHTMLElement = null;
        let itemRect = new core.classes.Rect();
        const htmlElement = this.HTMLElement;
        const offsetLeft = htmlElement.scrollLeft;
        const offsetTop = htmlElement.scrollTop;
        //#endregion Variables déclaration
        point.x += offsetLeft;
        point.y += offsetTop;
        while (notFound && i < this.#nbrVisibleItems) {
            iHTMLElement = htmlElement.children[i + 1];
            itemRect.setValues(iHTMLElement.offsetLeft, iHTMLElement.offsetTop,
                iHTMLElement.offsetLeft + iHTMLElement.offsetWidth, iHTMLElement.offsetTop + iHTMLElement.offsetHeight);
            point.inRect(itemRect) && (notFound = !1);
            i++;
        }
        notFound && (iHTMLElement = null);
        return iHTMLElement ? iHTMLElement.item : null;
    }
    //#endregion itemAtPos
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const item = this.#itemAtPos(core.mouse.target);
        //#endregion Variables déclaration
        super.mouseDown();
        item && this.#selectItem(item);
    }
    //#endregion mouseDown
    //#region createItemProxy
    #createItemProxy(item) {
        !item.hasOwnProperty('visible') && (item.visible = !0);
        !item.hasOwnProperty('enabled') && (item.enabled = !0);
        !item.hasOwnProperty('isHeader') && (item.isHeader = !1);
        !item.hasOwnProperty('size') && (item.size = this.#itemsSize);
        !item.hasOwnProperty('isProxy') && (item.isProxy = !0);
        !item.hasOwnProperty('checked') && (item.checked = !1);
        !item.hasOwnProperty('selected') && (item.selected = !1);
        !item.hasOwnProperty('allowGrayed') && (item.allowGrayed = !1);
        !item.hasOwnProperty('autoTranslate') && (item.autoTranslate = !0);
        !item.hasOwnProperty('imageIndex') && (item.imageIndex = -1);
        !item.hasOwnProperty('state') && (item.state = Checkbox.CHECKBOXSTATES.UNCHECKED);
        item.owner = this;
        return new Proxy(item, {
            set: function(target, property, value, receiver) {
                const oldValue = target[property];
                target[property] = value;
                (property === 'visible') && target.owner.#checkVisibleItems();
                !(value instanceof HTMLElement) && (oldValue !== value) && target.owner.draw();
                return true;
            }
        });
    }
    //#endregion createItemProxy
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
    'images': {
        enumerable: !0
    },
    'orientation': {
        enumerable: !0
    }
});
Object.seal(ListBox);
core.classes.register(core.types.CATEGORIES.COMMON, ListBox);
//#endregion ListBox
//#region Templates
if (core.isHTMLRenderer) {
    const ListBoxTpl = ['<jagui-listbox id="{internalId}" data-class="ListBox" class="Control scrollContent ListBox {theme}">',
        '</jagui-listbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ListBox, template: ListBoxTpl }]);
}
//#endregion
export { ListBox };