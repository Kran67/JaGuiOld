//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
import { BaseClass } from '/scripts/core/baseclass.js';
import { HitTest } from '/scripts/core/hittest.js';
import { Events, NotifyEvent } from '/scripts/core/events.js';
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
                priv.stopEvent = true;
                priv.props = {};
                priv.caption = props.hasOwnProperty('caption') ? props.caption : String.EMPTY;
                priv.height = props.hasOwnProperty('height') ? props.height : owner.itemsHeight;
                priv.isChecked = props.hasOwnProperty('isChecked') && Tools.isBool(props.isChecked) ? props.isChecked : false;
                priv.isHeader = props.hasOwnProperty('isHeader') && Tools.isBool(props.isHeader) ? props.isHeader : false;
                priv.enabled = props.hasOwnProperty('enabled') && Tools.isBool(props.enabled) ? props.enabled : true;
                priv.form = owner.form;
                priv.selected = props.hasOwnProperty('selected') && Tools.isBool(props.selected) ? props.selected : false;
                priv.hitTest = new HitTest;
                priv.hitTest.all = false;
                priv.css = String.EMPTY;
                priv.imageIndex = props.hasOwnProperty('imageIndex') && Tools.isNumber(props.imageIndex) ? props.imageIndex : -1;
                priv.image = props.hasOwnProperty('image') ? props.image : String.EMPTY;
                priv.cssImage = props.hasOwnProperty('cssImage') ? props.cssImage : String.EMPTY;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'state',
                    enum: Types.CHECKBOXSTATES,
                    forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty('state') ? props.state : Checkbox.CHECKBOXSTATES.UNCHECKED
                });
                priv.allowGrayed = props.hasOwnProperty('allowGrayed') && Tools.isBool(props.allowGrayed) ? props.allowGrayed : false;
                //this.onDraw = new $j.classes.NotifyEvent(this);
                if (owner instanceof ListBox) {
                    if (owner.allowUpdate) {
                        owner.draw();
                    }
                }
            }
        }
        //#endregion constructor
        //#region Getters / Setters
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
        //#region height
        get height() {
            return internal(this).height;
        }
        set height(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.HTMLElement.offsetHeight !== newValue) {
                    priv.height = newValue;
                    priv.owner.refreshInnerHeight();
                }
            }
        }
        //#endregion height
        //#region text
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
        //#endregion text
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
            //#endregion Variables déclaration
            if (priv.html) {
                if (priv.owner.orientation === Types.ORIENTATIONS.VERTICAL) {
                    priv.html.style.minHeight = `${priv.height}${PX}`;
                    priv.html.style.maxHeight = `${priv.height}${PX}`;
                    priv.html.style.height = `${priv.height}${PX}`;
                } else {
                    priv.html.style.minWidth = `${priv.height}${PX}`;
                    priv.html.style.maxWidth = `${priv.height}${PX}`;
                    priv.html.style.width = `${priv.height}${PX}`;
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
                if (priv.icon) {
                    priv.icon.classList.add('icon');
                    if (!String.isNullOrEmpty(priv.cssImage)) {
                        priv.icon.classList.add(priv.cssImage);
                        priv.icon.style.backgroundSize = `${priv.height}${PX} ${priv.height}${PX}`;
                    } else if (!String.isNullOrEmpty(priv.image)) {
                        priv.icon.style.backgroundImage = `url(${priv.image})`;
                        priv.icon.style.backgroundSize = `${priv.height}${PX} ${priv.height}${PX}`;
                    } else if (priv.owner.images) {
                        if (priv.imageIndex < priv.owner.images.images.length && priv.imageIndex > -1) {
                            priv.icon.style.backgroundImage = `url(${priv.owner.images.images[priv.imageIndex]})`;
                            priv.icon.style.backgroundSize = `${priv.owner.images.imageWidth}${PX} ${priv.owner.images.imageHeight}${PX}`;
                        }
                    }
                }
                //this.updateDataSet();
            }
        }
        //#endregion update
        //#region draw
        draw() {
            //#region Variables déclaration
            const priv = internal(this);
            const name = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const ORIENTATIONS = Types.ORIENTATIONS;
            const PX = Types.CSSUNITS.PX;
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
                if (priv.owner.orientation === ORIENTATIONS.VERTICAL) {
                    priv.html.classList.add('VListBoxItem');
                } else {
                    priv.html.classList.add('HListBoxItem');
                }
                priv.owner.HTMLElement.appendChild(priv.html);
                Events.bind(priv.html, Mouse.MOUSEEVENTS.DOWN, priv.owner.selectItem);
            }
            this.update();
            if (priv.owner.orientation === ORIENTATIONS.VERTICAL) {
                priv.html.style.transform = `translateY(${priv.top - priv.owner.scrollTop}${PX})`;
            } else {
                priv.html.style.transform = `translateX(${priv.left - priv.owner.scrollTop}${PX})`;
            }
            if (!String.isNullOrEmpty(priv.css)) {
                const cssPropsValues = priv.css.split(';');
                for (let i = 0, l = cssPropsValues.length; i < l; i++) {
                    const cssPropValue = cssPropsValues[i].split(':');
                    priv.html.style[cssPropValue[0]] = cssPropValue[1];
                }
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
                //if (this._icon)) this._html.removeChild(this._icon);
                //this._html.removeChild(this._text);
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
                super(owner, props);
                const priv = internal(this);
                priv.visibleItems = [];
                priv.scrollTop = 0;
                priv.innerHeight = 0;
                priv.items = props.hasOwnProperty('items') ? props.items : null;
                priv.lastDelta = new Point;
                priv.downPos = new Point;
                priv.currentPos = new Point;
                priv.keyDir = String.EMPTY;
                priv.multiSelect = props.hasOwnProperty('multiSelect') && Tools.isBool(props.multiSelect) ? props.multiSelect : false;
                priv.sorted = props.hasOwnProperty('sorted') && Tools.isBool(props.sorted) ? props.sorted : false;
                priv.itemsHeight = props.hasOwnProperty('itemsHeight') && Tools.isNumber(props.itemsHeight) ? props.itemsHeight : 16;
                priv.itemsClass = props.hasOwnProperty('itemsClass') ? Core.classes[props.itemsClass] : ListBoxItem;
                Core.classes.newCollection(this, this, priv.itemsClass);
                priv.useAlternateColor = props.hasOwnProperty('useAlternateColor') && Tools.isBool(props.useAlternateColor) ? props.useAlternateColor : false;
                priv.viewCheckboxes = props.hasOwnProperty('viewCheckboxes') && Tools.isBool(props.viewCheckboxes) ? props.viewCheckboxes : false;
                priv.itemIndex = props.hasOwnProperty('itemIndex') && Tools.isNumber(props.itemIndex) ? props.itemIndex : -1;
                priv.columns = props.hasOwnProperty('columns') && Tools.isNumber(props.columns) ? props.columns : 1;
                priv.images = props.hasOwnProperty('images') ? props.images : null;
                this.onChange = new NotifyEvent(this);
                this.canFocused = true;
                this.hitTest.all = true;
                //this.animated = true;
                priv.orientation = props.hasOwnProperty('orientation') ? props.orientation : Types.ORIENTATIONS.VERTICAL;
                this.onSelectItem = new NotifyEvent(this);
                this.onDrawItem = new NotifyEvent(this);
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
        //#region itemsHeight
        get itemsHeight() {
            return internal(this).itemsHeight;
        }
        set itemsHeight(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.itemsHeight !== newValue) {
                    this.items.forEach(item => {
                        if (item.height === priv.itemsHeight) {
                            item.height = newValue;
                        }
                    });
                    priv.itemsHeight = newValue;
                    this.draw();
                }
            }
        }
        //#endregion itemsHeight
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
                            item.selected = true;
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
            let itemVisible = false;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (vert) {
                    priv.scrollTop = Math.max(Math.min(priv.scrollTop, priv.innerHeight - this.HTMLElement.offsetHeight), 0);
                }
                else {
                    priv.scrollTop = Math.max(Math.min(priv.scrollTop, priv.innerHeight - this.HTMLElement.offsetWidth), 0);
                }
                priv.visibleItems = [];
                let topIndex = 0;
                topIndex = ~~(priv.scrollTop / priv.itemsHeight);
                if (topIndex < 0) {
                    topIndex = 0;
                }
                let maxIndex = 0;
                if (!oldVisibleItems.isEmpty) {
                    maxIndex = topIndex + oldVisibleItems.length * 2;
                } else {
                    maxIndex = ~~(this.HTMLElement.offsetHeight / priv.itemsHeight) + 1;
                }
                if (maxIndex > items.length) {
                    maxIndex = items.length;
                }
                for (let i = topIndex; i < maxIndex; i++) {
                    const item = items[i];
                    itemVisible = true;
                    //if (vert && ((item.top + item.height >= priv.scrollTop) && (item.top < this.HTMLElement.offsetHeight + priv.scrollTop))) {
                    //    itemVisible = true;
                    //} else if (!vert && ((item.left + item.height >= priv.scrollTop) && (item.left <= this.HTMLElement.offsetWidth + priv.scrollTop))) {
                    //    itemVisible = true;
                    //}
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
                    item.selected = false;
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
                priv.innerHeight += item.height;
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
                priv.innerHeight += item.height;
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
            this.allowUpdate = false;
            this.items.beginUpdate();
        }
        //#endregion beginUpdate
        //#region endUpdate
        endUpdate() {
            this.allowUpdate = true;
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
                item.selected = false;
            });
        }
        //#endregion clearSelection
        //#region selectAll
        selectAll() {
            this.items.forEach(item => {
                item.selected = true;
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
            this.items = null;
            priv.visibleItems.destroy();
            priv.visibleItems = null;
            priv.scrollTop = null;
            priv.innerHeight = null;
            priv.lastDelta.destroy();
            priv.lastDelta = null;
            priv.downPos.destroy();
            priv.downPos = null;
            priv.currentPos.destroy();
            priv.currentPos = null;
            priv.multiSelect = null;
            priv.sorted = null;
            priv.itemsHeight = null;
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
                        this.itemIndex = priv.itemIndex - ~~(htmlElement.offsetHeight / priv.itemsHeight);
                    } else {
                        this.itemIndex = priv.itemIndex - ~~(htmlElement.offsetWidth / priv.itemsHeight);
                    }
                    break;
                case VKEYSCODES.VK_NEXT:
                    if (priv.orientation === ORIENTATIONS.VERTICAL) {
                        this.itemIndex = priv.itemIndex + ~~(htmlElement.offsetHeight / priv.itemsHeight);
                    } else {
                        this.itemIndex = priv.itemIndex + ~~(htmlElement.offsetWidth / priv.itemsHeight);
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
            //#endregion Variables déclaration
            if (this.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
                if (inVisibleItems && !isFirst) {
                    let nbrVisibleItems;
                    let base;
                    if (priv.orientation === ORIENTATIONS.VERTICAL) {
                        nbrVisibleItems = ~~(htmlElement.offsetHeight / priv.itemsHeight);
                        base = ((nbrVisibleItems * priv.itemsHeight) - htmlElement.offsetHeight) + priv.itemsHeight;
                        //this._VScrollBar.setValue(base + ((this.itemIndex - nbrVisibleItems) * this.itemsHeight));
                    } else {
                        nbrVisibleItems = ~~(htmlElement.offsetWidth / priv.itemsHeight);
                        base = ((nbrVisibleItems * priv.itemsHeight) - htmlElement.offsetWidth) + priv.itemsHeight;
                        //this._HScrollBar.setValue(base + ((this.itemIndex - nbrVisibleItems) * this.itemsHeight));
                    }
                } else if (isFirst) {
                    //if (priv.orientation === ORIENTATIONS.VERTICAL) {
                    //    this._VScrollBar.setValue((this.itemIndex * this.itemsHeight));
                    //} else {
                    //    this._HScrollBar.setValue((this.itemIndex * this.itemsHeight));
                    //}
                }
            } else {
                if (priv.orientation === ORIENTATIONS.VERTICAL) {
                    if (this.items[priv.itemIndex].html.offsetTop + this.items[priv.itemIndex].html.offsetHeight > htmlElement.offsetHeight + htmlElement.scrollTop) {
                        htmlElement.scrollTop = this.items[priv.itemIndex].html.offsetTop + this.items[priv.itemIndex].html.offsetHeight + 2 - htmlElement.offsetHeight;
                    } else if (htmlElement.scrollTop > this.items[priv.itemIndex].html.offsetTop) {
                        htmlElement.scrollTop = this.items[priv.itemIndex].html.offsetTop - 1;
                    }
                } else {
                    if (this.items[priv.itemIndex].html.offsetLeft + this.items[priv.itemIndex].html.offsetWidth > htmlElement.offsetWidth + htmlElement.scrollLeft) {
                        htmlElement.scrollLeft = this.items[priv.itemIndex].html.offsetLeft + this.items[priv.itemIndex].html.offsetWidth + 2 - htmlElement.offsetWidth;
                    } else if (htmlElement.scrollLeft > this.items[priv.itemIndex].html.offsetLeft) {
                        htmlElement.scrollLeft = this.items[priv.itemIndex].html.offsetLeft - 1;
                    }
                }
            }
        }
        //#endregion scrollToItem
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.loaded();
            this.getImages();
            priv.innerHeight = 0;
            if (priv.items) {
                if (Tools.isArray(priv.items)) {
                    priv.items.forEach((item, idx) => {
                        const _item = Core.classes.createComponent({
                            class: priv.itemsClass,
                            owner: this,
                            props: {
                                inForm: false,
                                caption: item.caption,
                                height: item.hasOwnProperty('height') && Tools.isNumber(item.height) ? item.height : priv.itemsHeight,
                                isHeader: item.isHeader,
                                isChecked: item.isChecked,
                                selected: priv.itemIndex === idx,
                                cssImage: item.hasOwnProperty('cssImage') ? item.cssImage : String.EMPTY
                            }
                        });
                        this.items.push(_item);
                        priv.innerHeight += _item.height;
                    });
                }
            }
            if (priv.useAlternateColor) {
                htmlElement.classList.add('useAlternateColor');
            }
            htmlElement.classList.add(`orientation-${priv.orientation}`);
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