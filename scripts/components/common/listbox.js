//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
import { BaseClass } from '/scripts/core/baseclass.js';
import { HitTest } from '/scripts/core/hittest.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Tools } from '/scripts/core/tools.js';
import { Point } from '/scripts/core/geometry.js';
import { Checkbox } from '/scripts/components/common/checkbox.js';
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
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.owner = owner;
                priv.html = null;
                priv.check = null;
                priv.icon = null;
                priv.text = null;
                priv.stopEvent = !0;
                priv.caption = props.hasOwnProperty('caption') ? props.caption : String.EMPTY;
                priv.size = props.hasOwnProperty('size') ? props.size : owner.itemsSize;
                priv.isChecked = props.hasOwnProperty('isChecked') && Tools.isBool(props.isChecked) ? props.isChecked : !1;
                priv.isHeader = props.hasOwnProperty('isHeader') && Tools.isBool(props.isHeader) ? props.isHeader : !1;
                priv.enabled = props.hasOwnProperty('enabled') && Tools.isBool(props.enabled) ? props.enabled : !0;
                priv.form = owner.form;
                priv.selected = props.hasOwnProperty('selected') && Tools.isBool(props.selected) ? props.selected : !1;
                priv.hitTest = new HitTest;
                priv.hitTest.all = !1;
                priv.css = String.EMPTY;
                priv.imageIndex = props.hasOwnProperty('imageIndex') && Tools.isNumber(props.imageIndex) ? props.imageIndex : -1;
                priv.image = props.hasOwnProperty('image') ? props.image : String.EMPTY;
                priv.cssImage = props.hasOwnProperty('cssImage') ? props.cssImage : String.EMPTY;
                priv.pos = props.hasOwnProperty('pos') && Tools.isNumber(props.pos) ? props.pos : 0;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'state',
                    enum: Checkbox.CHECKBOXSTATES,
                    forceUpdate: !0,
                    variable: priv,
                    value: props.hasOwnProperty('state') ? props.state : Checkbox.CHECKBOXSTATES.UNCHECKED
                });
                priv.allowGrayed = props.hasOwnProperty('allowGrayed') && Tools.isBool(props.allowGrayed) ? props.allowGrayed : !1;
                if (owner instanceof ListBox) {
                    if (owner.allowUpdate) {
                        owner.draw();
                    }
                }
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region pos
        get pos() {
            return internal(this).pos;
        }
        set pos(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                priv.pos = newValue;
            }
        }
        //#endregion pos
        //#region form
        get form() {
            return internal(this).owner.form;
        }
        //#endregion form
        //#region html
        get html() {
            return internal(this).html;
        }
        //#endregion html
        //#region app
        get app() {
            return internal(this).owner.app;
        }
        //#endregion app
        //#region isChecked
        get isChecked() {
            return internal(this).isChecked;
        }
        set isChecked(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const checkboxStates = Checkbox.CHECKBOXSTATES;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.allowGrayed) {
                    switch (priv.state) {
                        case checkboxStates.UNCHECKED:
                            priv.state = CHECKBOXSTATES.GRAYED;
                            newValue = !1;
                            break;
                        case checkboxStates.GRAYED:
                            priv.state = checkboxStates.CHECKED;
                            newValue = !0;
                            break;
                        case checkboxStates.CHECKED:
                            priv.state = checkboxStates.UNCHECKED;
                            newValue = !1;
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
                    if (!priv.owner.loading && !priv.owner.form.loading) {
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.isHeader !== newValue) {
                    priv.isHeader = newValue;
                    this.update();
                }
            }
        }
        //#endregion isHeader
        //#region enabled
        get enabled() {
            return internal(this).enabled;
        }
        set enabled(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.enabled !== newValue) {
                    priv.enabled = newValue;
                    this.update();
                }
            }
        }
        //#endregion enabled
        //#region size
        get size() {
            return internal(this).size;
        }
        set size(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.size !== newValue) {
                    priv.size = newValue;
                    priv.owner.refreshInnerSize();
                }
            }
        }
        //#endregion height
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    this.update();
                }
            }
        }
        //#endregion caption
        //#region selected
        get selected() {
            return internal(this).selected;
        }
        set selected(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
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
        get index() {
            return internal(this).owner.items.indexOf(this);
        }
        //#endregion index
        //#region isEnabled
        get isEnabled() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.enabled && priv.owner.isEnabled;
        }
        //#endregion isEnabled
        //#region owner
        get owner() {
            return internal(this).owner;
        }
        //#endregion owner
        //#endregion Getters / Setters
        //#region Methods
        //#region mouseUp
        mouseUp() {
            internal(this).owner.mouseUp();
        }
        //#endregion mouseUp
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            let prop;
            let propPos;
            //#endregion Variables déclaration
            if (priv.html) {
                if (priv.owner.orientation === Types.ORIENTATIONS.VERTICAL) {
                    prop = 'Height';
                    propPos = 'top';
                } else {
                    prop = 'Width';
                    propPos = 'left';
                }
                priv.html.style[`min${prop}`] = `${priv.size}${PX}`;
                priv.html.style[`max${prop}`] = `${priv.size}${PX}`;
                priv.html.style[`${prop.toLowerCase()}`] = `${priv.size}${PX}`;
                if (priv.owner.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
                    priv.html.style[propPos] = `${priv.pos}${PX}`;
                    priv.html.style.position = 'absolute';
                } else {
                    priv.html.style.position = 'static';
                }
                priv.html.classList.remove('disabled', 'isheader', 'selected');
                if (!priv.enabled) {
                    priv.html.classList.add('disabled');
                }
                if (priv.owner.viewCheckboxes) {
                    priv.check.classList.remove('grayed', 'checked');
                    if (priv.check) {
                        priv.check.classList.remove('checked');
                    }
                    if (priv.isChecked) {
                        priv.check.classList.add('checked');
                    } else if (priv.allowGrayed && priv.state === Types.CHECKBOXSTATES.GRAYED) {
                        priv.check.classList.add('grayed');
                    }
                }
                if (priv.isHeader) {
                    priv.html.classList.add('isheader');
                }
                if (priv.selected) {
                    priv.html.classList.add('selected');
                }
                if (priv.owner.useAlternateColor && this.index % 2 === 0) {
                    priv.html.classList.add('alternate');
                }
                if (priv.icon) {
                    priv.icon.classList.add('icon');
                    if (!String.isNullOrEmpty(priv.cssImage)) {
                        priv.icon.classList.add(priv.cssImage);
                        priv.icon.style.backgroundSize = `${priv.size}${PX} ${priv.size}${PX}`;
                    } else if (!String.isNullOrEmpty(priv.image)) {
                        priv.icon.style.backgroundImage = `url(${priv.image})`;
                        priv.icon.style.backgroundSize = `${priv.size}${PX} ${priv.size}${PX}`;
                    } else if (priv.owner.images) {
                        if (priv.imageIndex < priv.owner.images.images.length && priv.imageIndex > -1) {
                            priv.icon.style.backgroundImage = `url(${priv.owner.images.images[priv.imageIndex]})`;
                            priv.icon.style.backgroundSize = `${priv.owner.images.imageWidth}${PX} ${priv.owner.images.imageHeight}${PX}`;
                        }
                    }
                }
            }
        }
        //#endregion update
        //#region draw
        draw() {
            //#region Variables déclaration
            const priv = internal(this);
            const name = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const ORIENTATIONS = Types.ORIENTATIONS;
            //#endregion Variables déclaration
            if (!priv.html) {
                priv.html = document.createElement(`${name}`);
                if (priv.owner.viewCheckboxes) {
                    priv.check = document.createElement(`${name}-check`);
                    priv.check.jsObj = this;
                    priv.check.classList.add('CheckboxCheck', priv.owner.themeName);
                    priv.html.appendChild(priv.check);
                }
                if (priv.owner.images || !String.isNullOrEmpty(priv.image) || !String.isNullOrEmpty(priv.cssImage)) {
                    priv.icon = document.createElement(`${name}-icon`);
                    priv.icon.jsObj = this;
                    priv.html.appendChild(priv.icon);
                }
                priv.text = document.createElement(`${name}-text`);
                priv.text.classList.add(`${this.constructor.name}Caption`);
                priv.text.innerHTML = priv.caption;
                priv.html.appendChild(priv.text);
                priv.html.jsObj = this;
                priv.html.classList.add(this.constructor.name, priv.owner.themeName);
                priv.owner.orientation === ORIENTATIONS.VERTICAL ? priv.html.classList.add('VListBoxItem') : priv.html.classList.add('HListBoxItem');
                priv.owner.HTMLElement.appendChild(priv.html);
                Events.bind(priv.html, Mouse.MOUSEEVENTS.DOWN, priv.owner.selectItem);
            }
            this.update();
            //if (priv.owner.orientation === ORIENTATIONS.VERTICAL) {
            //    priv.html.style.transform = `translateY(${priv.top - priv.owner.scrollPos}${PX})`;
            //} else {
            //    priv.html.style.transform = `translateX(${priv.left - priv.owner.scrollPos}${PX})`;
            //}
            if (!String.isNullOrEmpty(priv.css)) {
                const cssPropsValues = priv.css.split(';');
                cssPropsValues.forEach(cssProp => {
                    const cssPropValue = cssProp.split(':');
                    priv.html.style[cssPropValue[0]] = cssPropValue[1];
                });
            }
            priv.owner.onDrawItem.invoke(this);
        }
        //#endregion draw
        //#region removeToHTML
        removeToHTML() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.html) {
                Events.unBind(priv.html, Mouse.MOUSEEVENTS.DOWN, priv.owner.selectItem);
                if (priv.icon) {
                    this.html.removeChild(priv.icon);
                }
                priv.html.removeChild(priv.text);
                priv.owner.HTMLElement.removeChild(priv.html);
                priv.html = null;
                priv.icon = null;
                priv.text = null;
            }
        }
        //#endregion removeToHTML
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.removeToHTML();
            priv.owner.items.remove(this);
            priv.owner = null;
            priv.caption = null;
            priv.text = null;
            priv.size = null;
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
        //#endregion destroy
        //#region clone
        clone() {
            return Object.create(this);
        }
        //#endregion clone
        //#endregion Methods
    }
    return ListBoxItem;
    //#endregion ListBoxItem
})();
Object.seal(ListBoxItem);
//#endregion ListBoxItem
//#region ListBox
const ListBox = (() => {
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
    //#region Class ListBox
    class ListBox extends ScrollControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                !props.hasOwnProperty('scrollMode') ? props.scrollMode = ScrollControl.SCROLLMODES.VIRTUAL : null;
                super(owner, props);
                const priv = internal(this);
                priv.visibleItems = [];
                priv.scrollPos = 0;
                priv.innerHeight = 0;
                priv.items = props.hasOwnProperty('items') ? props.items : null;
                priv.lastDelta = new Point;
                priv.downPos = new Point;
                priv.currentPos = new Point;
                priv.keyDir = String.EMPTY;
                priv.multiSelect = props.hasOwnProperty('multiSelect') && Tools.isBool(props.multiSelect) ? props.multiSelect : !1;
                priv.sorted = props.hasOwnProperty('sorted') && Tools.isBool(props.sorted) ? props.sorted : !1;
                priv.itemsSize = props.hasOwnProperty('itemsSize') && Tools.isNumber(props.itemsSize) ? props.itemsSize : 16;
                priv.itemsClass = props.hasOwnProperty('itemsClass') ? Core.classes[props.itemsClass] : ListBoxItem;
                Core.classes.newCollection(this, this, priv.itemsClass);
                priv.useAlternateColor = props.hasOwnProperty('useAlternateColor') && Tools.isBool(props.useAlternateColor) ? props.useAlternateColor : !1;
                priv.viewCheckboxes = props.hasOwnProperty('viewCheckboxes') && Tools.isBool(props.viewCheckboxes) ? props.viewCheckboxes : !1;
                priv.itemIndex = props.hasOwnProperty('itemIndex') && Tools.isNumber(props.itemIndex) ? props.itemIndex : -1;
                priv.columns = props.hasOwnProperty('columns') && Tools.isNumber(props.columns) ? props.columns : 1;
                priv.images = props.hasOwnProperty('images') ? props.images : null;
                this.createEventsAndBind(['onChange', 'onSelectItem', 'onDrawItem'], props);
                this.canFocused = !0;
                this.hitTest.all = !0;
                //this.animated = !0;
                priv.orientation = props.hasOwnProperty('orientation') ? props.orientation : Types.ORIENTATIONS.VERTICAL;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region multiSelect
        get multiSelect() {
            return internal(this).multiSelect;
        }
        set multiSelect(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.multiSelect !== newValue) {
                    priv.multiSelect = newValue;
                }
            }
        }
        //#endregion multiSelect
        //#region sorted
        get sorted() {
            return internal(this).sorted;
        }
        set sorted(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.sorted !== newValue) {
                    priv.sorted = newValue;
                    if (priv.sorted) {
                        this.items.sort();
                        this.draw();
                    }
                }
            }
        }
        //#endregion sorted
        //#region itemsSize
        get itemsSize() {
            return internal(this).itemsSize;
        }
        set itemsSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.itemsSize !== newValue) {
                    this.items.forEach(item => {
                        if (item.size === priv.itemsSize) {
                            item.size = newValue;
                        }
                    });
                    priv.itemsSize = newValue;
                    this.draw();
                }
            }
        }
        //#endregion itemsSize
        //#region useAlternateColor
        get useAlternateColor() {
            return internal(this).useAlternateColor;
        }
        set useAlternateColor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.useAlternateColor !== newValue) {
                    htmlElement.classList.remove('useAlternateColor');
                    priv.useAlternateColor = newValue;
                    if (newValue) {
                        htmlElement.classList.add('useAlternateColor');
                    }
                }
            }
        }
        //#endregion useAlternateColor
        //#region viewCheckboxes
        get viewCheckboxes() {
            return internal(this).viewCheckboxes;
        }
        set viewCheckboxes(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (!(this instanceof Core.classes.HorizontalListBox)) {
                    if (priv.viewCheckboxes !== newValue) {
                        priv.viewCheckboxes = newValue;
                        this.draw();
                    }
                }
            }
        }
        //#endregion viewCheckboxes
        //#region itemIndex
        get itemIndex() {
            return internal(this).itemIndex;
        }
        set itemIndex(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < this.items.length && newValue >= 0) {
                    if (priv.itemIndex !== newValue) {
                        if (priv.itemIndex > -1) {
                            this.deselectItemIndex();
                        }
                        let item = this.items[newValue];
                        while ((item.isHeader || !item.enabled) && (newValue > -1 && newValue < this.items.length)) {
                            if (priv.keyDir === Types.DIRECTIONS.LEFT) {
                                newValue--;
                            } else {
                                newValue++;
                            }
                            item = this.items[newValue];
                        }
                        newValue = Math.min(Math.max(newValue, 0), this.items.length - 1);
                        priv.itemIndex = newValue;
                        item = this.items[priv.itemIndex];
                        if (item) {
                            item.selected = !0;
                            this.scrollToItem();
                        }
                    }
                }
            }
        }
        //#endregion itemIndex
        //#region orientation
        get orientation() {
            return internal(this).orientation;
        }
        set orientation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.ORIENTATIONS)) {
                if (priv.orientation !== newValue) {
                    htmlElement.classList.remove(`orientation-${priv.orientation}`);
                    priv.orientation = newValue;
                    htmlElement.classList.remove(`orientation-${priv.orientation}`);
                    this.draw();
                }
            }
        }
        //#endregion orientation
        //#region images
        get images() {
            return internal(this).images;
        }
        set images(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.ImageList) {
                if (priv.images !== newValue) {
                    priv.images = newValue;
                    this.draw();
                }
            }
        }
        //#endregion images
        //#region count
        get count() {
            return this.items.count();
        }
        //#endregion count
        //#endregion Getters / Setters
        //#region Methods
        //#region draw
        draw() {
            //#region Variables déclaration
            const priv = internal(this);
            const oldVisibleItems = priv.visibleItems;
            const items = this.items;
            const vert = priv.orientation === Types.ORIENTATIONS.VERTICAL;
            const scrollModeNormal = this.scrollMode === ScrollControl.SCROLLMODES.NORMAL;
            const htmlElement = this.HTMLElement;
            let itemVisible = !1;
            const prop = vert ? 'Top' : 'Left';
            const propSize = vert ? 'Height' : 'Width';
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                priv.scrollPos = Math.max(Math.min(htmlElement[`scroll${prop}`], priv.innerHeight - htmlElement[`offset${propSize}`]), 0);
                priv.visibleItems = [];
                let topIndex = 0;
                topIndex = Math.max(0, ~~(priv.scrollPos / priv.itemsSize));
                let maxIndex = !oldVisibleItems.isEmpty ? topIndex + oldVisibleItems.length * 2 : ~~(htmlElement.offsetHeight / priv.itemsSize) + 1;
                maxIndex = Math.min(maxIndex, items.length);
                if (!scrollModeNormal) {
                    priv.scroller.style[propSize.toLowerCase()] = `${priv.innerHeight}${Types.CSSUNITS.PX}`;
                }
                for (let i = topIndex; i < maxIndex; i++) {
                    const item = items[i];
                    if (scrollModeNormal) {
                        itemVisible = !0;
                    } else {
                        itemVisible = !1;
                        if (((item.pos + item.size >= priv.scrollPos) && (item.pos < htmlElement[`offset${propSize}`] + priv.scrollPos))) {
                            itemVisible = !0;
                        }
                    }
                    if (itemVisible) {
                        if (this.dropDownPopup) {
                            item.dropDownPopup = this.dropDownPopup;
                        }
                        item.draw();
                        priv.visibleItems.push(item);
                    }
                }
                oldVisibleItems.forEach(item => {
                    if (priv.visibleItems.indexOf(item) === -1) {
                        item.removeToHTML();
                    }
                });
            }
        }
        //#endregion draw
        //#region selectItem
        selectItem() {
            //#region Variables déclaration
            const item = this.jsObj;
            //#endregion Variables déclaration
            item.owner._selectItem(item);
        }
        //#endregion selectItem
        //#region _selectItem
        _selectItem(item) {
            if (!item.isHeader && item.enabled && item.owner.enabled && item.owner.hitTest.mouseDown) {
                if (item.owner.multiSelect && Core.keyboard.ctrl) {
                    item.selected = !item.selected;
                } else {
                    item.owner.itemIndex = item.index;
                }
                if (item.owner.viewCheckboxes) {
                    item.isChecked = !item.isChecked;
                }
                if (item.owner.onSelectItem.hasListener) {
                    item.owner.onSelectItem.invoke();
                }
            }
            item.owner.mouseDown();
        }
        //#endregion _selectItem
        //#region deselectItemIndex
        deselectItemIndex() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.itemIndex !== -1) {
                const item = this.items[priv.itemIndex];
                if (item) {
                    item.selected = !1;
                }
            }
        }
        //#endregion deselectItemIndex
        //#region refreshInnerHeight
        refreshInnerHeight() {
            //#region Variables déclaration
            const priv = internal(this);
            const items = this.items;
            //#endregion Variables déclaration
            priv.innerHeight = 0;
            items.forEach(item => {
                priv.innerHeight += item.size;
            });
            if (this.allowUpdate) {
                this.draw();
            }
        }
        //#endregion refreshInnerHeight
        //#region addItem
        addItem(item) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (item instanceof ListBoxItem) {
                priv.innerHeight += item.size;
                item.pos = this.items.last ? this.items.last.pos + item.size : 0;
                this.items.push(item);
            }
        }
        //#endregion addItem
        //#region deleteItem
        deleteItem(item) {
            if (item instanceof ListBoxItem && this.items.indexOf(item) !== -1) {
                this.items.remove(item);
            }
        }
        //#endregion deleteItem
        //#region deleteAt
        deleteAt(index) {
            if (index >= 0 && index < this.items.length) {
                this.items.removeAt(this.items[index]);
            }
        }
        //#endregion deleteAt
        //#region moveItem
        moveItem(itemToMove, itemBefore) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (itemToMove instanceof ListBoxItem && itemBefore instanceof ListBoxItem) {
                if (priv.visibleItems.indexOf(itemToMove) > -1) {
                    this.items.beginUpdate();
                }
                this.items.remove(itemToMove);
                this.items.insert(itemBefore.index, itemToMove);
                priv.itemIndex = itemToMove.index;
                if (priv.visibleItems.indexOf(itemToMove) > -1) {
                    this.items.endUpdate();
                }
            }
        }
        //#endregion moveItem
        //#region beginUpdate
        beginUpdate() {
            this.allowUpdate = !1;
            this.items.beginUpdate();
        }
        //#endregion beginUpdate
        //#region endUpdate
        endUpdate() {
            this.allowUpdate = !0;
            this.refreshInnerHeight();
            this.items.endUpdate();
        }
        //#endregion endUpdate
        //#region clear
        clear() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.items.forEach(item => {
                item.destroy();
            });
            priv.visibleItems.clear();
            this.items.clear();
        }
        //#endregion clear
        //#region clearSelection
        clearSelection() {
            this.items.forEach(item => {
                item.selected = !1;
            });
        }
        //#endregion clearSelection
        //#region selectAll
        selectAll() {
            this.items.forEach(item => {
                item.selected = !0;
            });
        }
        //#endregion selectAll
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            while (this.items.length > 0) {
                this.items.last.destroy();
                this.items.pop();
            }
            this.items.destroy();
            priv.visibleItems.destroy();
            priv.visibleItems = null;
            priv.scrollPos = null;
            priv.innerHeight = null;
            priv.lastDelta.destroy();
            priv.lastDelta = null;
            priv.downPos.destroy();
            priv.downPos = null;
            priv.currentPos.destroy();
            priv.currentPos = null;
            priv.multiSelect = null;
            priv.sorted = null;
            priv.itemsSize = null;
            priv.useAlternateColor = null;
            priv.viewCheckboxes = null;
            priv.itemIndex = null;
            priv.columns = null;
            priv.images = null;
            this.onChange.destroy();
            this.onChange = null;
            this.canFocused = null;
            priv.mouseTracking = null;
            //priv.animated = null;
            priv.orientation = null;
            this.onSelectItem.destroy();
            this.onSelectItem = null;
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const DIRECTIONS = Types.DIRECTIONS;
            const ORIENTATIONS = Types.ORIENTATIONS;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                case VKEYSCODES.VK_UP:
                    priv.keyDir = DIRECTIONS.LEFT;
                    this.itemIndex = priv.itemIndex - 1;
                    break;
                case VKEYSCODES.VK_RIGHT:
                case VKEYSCODES.VK_DOWN:
                    priv.keyDir = DIRECTIONS.RIGHT;
                    this.itemIndex = priv.itemIndex + 1;
                    break;
                case VKEYSCODES.VK_HOME:
                    this.itemIndex = 0;
                    break;
                case VKEYSCODES.VK_END:
                    this.itemIndex = this.items.length - 1;
                    break;
                case VKEYSCODES.VK_PRIOR:
                    if (priv.orientation === ORIENTATIONS.VERTICAL) {
                        this.itemIndex = priv.itemIndex - ~~(htmlElement.offsetHeight / priv.itemsSize);
                    } else {
                        this.itemIndex = priv.itemIndex - ~~(htmlElement.offsetWidth / priv.itemsSize);
                    }
                    break;
                case VKEYSCODES.VK_NEXT:
                    if (priv.orientation === ORIENTATIONS.VERTICAL) {
                        this.itemIndex = priv.itemIndex + ~~(htmlElement.offsetHeight / priv.itemsSize);
                    } else {
                        this.itemIndex = priv.itemIndex + ~~(htmlElement.offsetWidth / priv.itemsSize);
                    }
                    break;
                case VKEYSCODES.VK_SPACE:
                    {
                        const item = this.items[priv.itemIndex];
                        if (priv.viewCheckboxes && item) {
                            item.isChecked = !item.isChecked;
                        }
                    }
                    break;
            }
        }
        //#endregion keyDown
        //#region scrollToItem
        scrollToItem() {
            //#region Variables déclaration
            const priv = internal(this);
            const inVisibleItems = priv.visibleItems.indexOf(this.items[priv.itemIndex]) === -1 || priv.visibleItems.last === this.items[priv.itemIndex];
            const isFirst = priv.visibleItems.first === this.items[priv.itemIndex] || priv.visibleItems.first === this.items[priv.itemIndex + 1];
            const ORIENTATIONS = Types.ORIENTATIONS;
            const htmlElement = this.HTMLElement;
            const prop = priv.orientation === ORIENTATIONS.VERTICAL ? 'Top' : 'Left';
            const propSize = priv.orientation === ORIENTATIONS.VERTICAL ? 'Height' : 'Width';
            //#endregion Variables déclaration
            if (this.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
                if (inVisibleItems && !isFirst) {
                    let nbrVisibleItems;
                    let base;
                    nbrVisibleItems = ~~(htmlElement[`offset${propSize}`] / priv.itemsSize);
                    base = ((nbrVisibleItems * priv.itemsSize) - htmlElement[`offset${propSize}`]) + priv.itemsSize;
                    htmlElement[`scroll${prop}`] = base + ((priv.itemIndex - nbrVisibleItems) * priv.itemsSize);
                } else if (isFirst) {
                    htmlElement[`scroll${prop}`] = priv.itemIndex * priv.itemsSize;
                }
            } else {
                if (this.items[priv.itemIndex].html[`offset${prop}`] + this.items[priv.itemIndex].html[`offset${propSize}`] >
                    htmlElement[`offset${propSize}`] + htmlElement[`scroll${prop}`]) {
                    htmlElement[`scroll${prop}`] = this.items[priv.itemIndex].html[`offset${propSize}`] +
                        this.items[priv.itemIndex].html[`offset${propSize}`] + 2 - htmlElement[`offset${propSize}`];
                } else if (htmlElement[`scroll${prop}`] > this.items[priv.itemIndex].html[`offset${prop}`]) {
                    htmlElement[`scroll${prop}`] = this.items[priv.itemIndex].html[`offset${prop}`] - 1;
                }
            }
        }
        //#endregion scrollToItem
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const name = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            //#endregion Variables déclaration
            super.loaded();
            this.getImages();
            priv.innerHeight = 0;
            priv.scroller = document.createElement(`${name}-scroller`);
            priv.scroller.classList.add('listBoxScroller');
            htmlElement.appendChild(priv.scroller);
            if (priv.items) {
                if (Tools.isArray(priv.items)) {
                    this.beginUpdate();
                    priv.items.forEach((item, idx) => {
                        const props = item;
                        props.inForm = !1;
                        props.selected = priv.itemIndex === idx;
                        props.height = item.hasOwnProperty('height') && Tools.isNumber(item.size) ? item.size : priv.itemsSize;
                        const _item = Core.classes.createComponent({
                            class: priv.itemsClass,
                            owner: this,
                            props
                        });
                        this.addItem(_item);
                    });
                    this.endUpdate();
                }
                priv.items = null;
            }
            if (priv.useAlternateColor) {
                htmlElement.classList.add('useAlternateColor');
            }
            htmlElement.classList.add(`orientation-${priv.orientation}`);
            if (this.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
                htmlElement.addEventListener(Types.HTMLEVENTS.SCROLL, this.draw.bind(this));
            }
            this.draw();
        }
        //#endregion loaded
        //#region getImages
        getImages() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(priv.images)) {
                if (this.form[priv.images]) {
                    this.images = this.form[priv.images];
                }
            }
        }
        //#endregion getImages
        //#endregion Methods
    }
    return ListBox;
    //#endregion ListBox
})();
//#endregion ListBox
Object.seal(ListBox);
Core.classes.register(Types.CATEGORIES.INTERNAL, ListBoxItem);
Core.classes.register(Types.CATEGORIES.COMMON, ListBox);
//#region Templates
if (Core.isHTMLRenderer) {
    const ListBoxTpl = ['<jagui-listbox id="{internalId}" data-class="ListBox" class="Control scrollContent ListBox {theme}">',
        '</jagui-listbox>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ListBox, template: ListBoxTpl }]);
}
//#endregion
export { ListBoxItem, ListBox };