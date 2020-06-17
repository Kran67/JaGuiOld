//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
import { BaseClass } from '/scripts/core/baseclass.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Point } from '/scripts/core/geometry.js';
import { Events } from '/scripts/core/events.js';
import { Checkbox } from '/scripts/components/common/checkbox.js';
//#endregion Import
//#region Class ListBoxItem
class ListBoxItem extends BaseClass {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            const priv = core.private(this, {
                owner,
                html: null,
                check: null,
                icon: null,
                text: null,
                caption: props.hasOwnProperty('caption') ? props.caption : String.EMPTY,
                size: props.hasOwnProperty('size') ? props.size : owner.itemsSize,
                checked: props.hasOwnProperty('checked') && core.tools.isBool(props.checked)
                    ? props.checked : !1,
                isHeader: props.hasOwnProperty('isHeader') && core.tools.isBool(props.isHeader)
                    ? props.isHeader : !1,
                enabled: props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled)
                    ? props.enabled : !0,
                form: owner.form,
                selected: props.hasOwnProperty('selected') && core.tools.isBool(props.selected)
                    ? props.selected : !1,
                css: props.hasOwnProperty('css') ? props.css : String.EMPTY,
                imageIndex: props.hasOwnProperty('imageIndex') && core.tools.isNumber(props.imageIndex)
                    ? props.imageIndex : -1,
                image: props.hasOwnProperty('image') ? props.image : String.EMPTY,
                cssImage: props.hasOwnProperty('cssImage') ? props.cssImage : String.EMPTY,
                pos: props.hasOwnProperty('pos') && core.tools.isNumber(props.pos) ? props.pos : 0,
                allowGrayed: props.hasOwnProperty('allowGrayed') && core.tools.isBool(props.allowGrayed)
                    ? props.allowGrayed : !1,
                autoTranslate: props.hasOwnProperty('autoTranslate') && core.tools.isBool(props.autoTranslate)
                    ? props.autoTranslate : !0,
                translationKey: props.hasOwnProperty('translationKey') ? props.translationKey : String.EMPTY,
            });
            priv.autoTranslate && !String.isNullOrEmpty(priv.translationKey) && this.app.getLocalText(this);
            this.mouseEvents = new core.classes.MouseEvents();
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'state',
                enum: Checkbox.CHECKBOXSTATES,
                forceUpdate: !0,
                value: props.hasOwnProperty('state') ? props.state : Checkbox.CHECKBOXSTATES.UNCHECKED
            });
            owner instanceof ListBox && owner.allowUpdate && owner.draw();
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region translationKey
    get translationKey() {
        return core.private(this).translationKey;
    }
    set translationKey(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.translationKey !== newValue
            && (priv.translationKey = newValue);
    }
    //#endregion translationKey
    //#region autoTranslate
    get autoTranslate() {
        return core.private(this).autoTranslate;
    }
    set autoTranslate(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.autoTranslate !== newValue
            && (priv.autoTranslate = newValue);
    }
    //#endregion autoTranslate
    //#region pos
    get pos() {
        return core.private(this).pos;
    }
    set pos(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && (priv.pos = newValue);
    }
    //#endregion pos
    //#region form
    get form() {
        return core.private(this).owner.form;
    }
    //#endregion form
    //#region html
    get html() {
        return core.private(this).html;
    }
    //#endregion html
    //#region app
    get app() {
        return core.private(this).owner.app;
    }
    //#endregion app
    //#region checked
    get checked() {
        return core.private(this).checked;
    }
    set checked(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const checkboxStates = Checkbox.CHECKBOXSTATES;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue)) {
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
            if (priv.checked !== newValue) {
                priv.checked = newValue;
                if (!priv.owner.loading && !priv.owner.form.loading) {
                    if (!core.isHTMLRenderer) {
                        priv.owner.allowUpdate && priv.owner.update();
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
        return core.private(this).isHeader;
    }
    set isHeader(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.isHeader !== newValue) {
            priv.isHeader = newValue;
            this.update();
        }
    }
    //#endregion isHeader
    //#region enabled
    get enabled() {
        return core.private(this).enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.enabled !== newValue) {
            priv.enabled = newValue;
            this.update();
        }
    }
    //#endregion enabled
    //#region size
    get size() {
        return core.private(this).size;
    }
    set size(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.size !== newValue) {
            priv.size = newValue;
            priv.owner.refreshInnerSize();
        }
    }
    //#endregion height
    //#region caption
    get caption() {
        return core.private(this).caption;
    }
    set caption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.caption !== newValue) {
            priv.caption = newValue;
            this.update();
        }
    }
    //#endregion caption
    //#region selected
    get selected() {
        return core.private(this).selected;
    }
    set selected(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && !priv.isHeader && priv.enabled && priv.selected !== newValue) {
            priv.selected = newValue;
            this.update();
        }
    }
    //#endregion selected
    //#region imageIndex
    get imageIndex() {
        return core.private(this).imageIndex;
    }
    set imageIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.imageIndex !== newValue) {
            priv.imageIndex = newValue;
            priv.owner.allowUpdate && this.update();
        }
    }
    //#endregion imageIndex
    //#region cssImage
    get cssImage() {
        return core.private(this).cssImage;
    }
    set cssImage(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.cssImage !== newValue) {
            priv.cssImage = newValue;
            priv.owner.allowUpdate && this.update();
        }
    }
    //#endregion cssImage
    //#region image
    get image() {
        return core.private(this).image;
    }
    set image(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.image !== newValue) {
            priv.image = newValue;
            priv.owner.allowUpdate && this.update();
        }
    }
    //#endregion image
    //#region index
    get index() {
        return core.private(this).owner.items ? core.private(this).owner.items.indexOf(this) : -1;
    }
    //#endregion index
    //#region isEnabled
    get isEnabled() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.enabled && priv.owner.isEnabled;
    }
    //#endregion isEnabled
    //#region owner
    get owner() {
        return core.private(this).owner;
    }
    //#endregion owner
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const PX = core.types.CSSUNITS.PX;
        let prop;
        let propPos;
        //#endregion Variables déclaration
        if (priv.html) {
            if (priv.owner.orientation === core.types.ORIENTATIONS.VERTICAL) {
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
            !priv.enabled && priv.html.classList.add('disabled');
            if (priv.owner.viewCheckboxes) {
                priv.check.classList.remove('grayed', 'checked');
                priv.check && priv.check.classList.remove('checked');
                if (priv.checked) {
                    priv.check.classList.add('checked');
                } else if (priv.allowGrayed && priv.state === core.types.CHECKBOXSTATES.GRAYED) {
                    priv.check.classList.add('grayed');
                }
            }
            priv.isHeader && priv.html.classList.add('isheader');
            priv.selected && priv.html.classList.add('selected');
            priv.owner.useAlternateColor && this.index % 2 === 0 && priv.html.classList.add('alternate');
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
                        priv.icon.style.backgroundSize
                            = `${priv.owner.images.imageWidth}${PX} ${priv.owner.images.imageHeight}${PX}`;
                    }
                }
            }
        }
    }
    //#endregion update
    //#region draw
    draw() {
        //#region Variables déclaration
        const priv = core.private(this);
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        const ORIENTATIONS = core.types.ORIENTATIONS;
        //#endregion Variables déclaration
        if (!priv.html) {
            priv.html = document.createElement(`${name}`);
            if (priv.owner.viewCheckboxes) {
                priv.check = document.createElement(`${name}-check`);
                priv.check.jsObj = this;
                priv.check.classList.add('CheckboxCheck', priv.owner.themeName);
                priv.html.appendChild(priv.check);
            }
            if (priv.owner.images || !String.isNullOrEmpty(priv.image)
                || !String.isNullOrEmpty(priv.cssImage)) {
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
            priv.owner.orientation === ORIENTATIONS.VERTICAL
                ? priv.html.classList.add('VListBoxItem') : priv.html.classList.add('HListBoxItem');
            priv.owner.HTMLElement.appendChild(priv.html);
            !String.isNullOrEmpty(priv.css) && (priv.html.style.cssText += priv.css);
            //Events.bind(priv.html, Mouse.MOUSEEVENTS.DOWN, priv.owner.selectItem);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (priv.html) {
            //Events.unBind(priv.html, Mouse.MOUSEEVENTS.DOWN, priv.owner.selectItem);
            priv.icon && this.html.removeChild(priv.icon);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.removeToHTML();
        priv.owner.items.remove(this);
        this.mouseEvents.destroy();
        this.mouseEvents = null;
        delete this.mouseEvents;
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
    //#region mouseDown
    mouseDown() {
        core.mouse.stopAllEvents();
        this.owner.selectItem(this);
    }
    //#endregion mouseDown
    //#endregion Methods
}
Object.seal(ListBoxItem);
//#endregion ListBoxItem
//#region Class ListBox
class ListBox extends ScrollControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            !props.hasOwnProperty('scrollMode') ? props.scrollMode = ScrollControl.SCROLLMODES.VIRTUAL : null;
            props.canFocused = !0;
            //props.hitTest = { /*mouseMove : !0,*/ mouseWheel: !0/*, dblClick : !0*/ };
            super(owner, props);
            const priv = core.private(this, {
                visibleItems: [],
                scrollPos: 0,
                innerHeight: 0,
                lastDelta: new Point,
                downPos: new Point,
                currentPos: new Point,
                keyDir: String.EMPTY,
                multiSelect: props.hasOwnProperty('multiSelect') && core.tools.isBool(props.multiSelect)
                    ? props.multiSelect : !1,
                sorted: props.hasOwnProperty('sorted') && core.tools.isBool(props.sorted)
                    ? props.sorted : !1,
                itemsSize: props.hasOwnProperty('itemsSize') && core.tools.isNumber(props.itemsSize)
                    ? props.itemsSize : 16,
                itemsClass: props.hasOwnProperty('itemsClass')
                    ? core.classes[props.itemsClass] : ListBoxItem,
                useAlternateColor: props.hasOwnProperty('useAlternateColor')
                    && core.tools.isBool(props.useAlternateColor)
                    ? props.useAlternateColor : !1,
                viewCheckboxes: props.hasOwnProperty('viewCheckboxes')
                    && core.tools.isBool(props.viewCheckboxes)
                    ? props.viewCheckboxes : !1,
                itemIndex: props.hasOwnProperty('itemIndex') && core.tools.isNumber(props.itemIndex)
                    ? props.itemIndex : -1,
                columns: props.hasOwnProperty('columns') && core.tools.isNumber(props.columns)
                    ? props.columns : 1,
                images: props.hasOwnProperty('images') ? props.images : null,
                //this.animated : !0,
                orientation: props.hasOwnProperty('orientation')
                    ? props.orientation : core.types.ORIENTATIONS.VERTICAL,
                scrollToItemMode: props.hasOwnProperty('scrollToItemMode')
                    ? props.scrollToItemMode : 'last',
                props
            });
            core.classes.newCollection(this, this, priv.itemsClass);
            this.createEventsAndBind(['onChange', 'onSelectItem', 'onDrawItem'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region multiSelect
    get multiSelect() {
        return core.private(this).multiSelect;
    }
    set multiSelect(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.multiSelect !== newValue && (priv.multiSelect = newValue);
    }
    //#endregion multiSelect
    //#region sorted
    get sorted() {
        return core.private(this).sorted;
    }
    set sorted(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.sorted !== newValue) {
            priv.sorted = newValue;
            if (priv.sorted) {
                priv.items.sort();
                this.draw();
            }
        }
    }
    //#endregion sorted
    //#region itemsSize
    get itemsSize() {
        return core.private(this).itemsSize;
    }
    set itemsSize(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.itemsSize !== newValue) {
            priv.items.forEach(item => {
                item.size === priv.itemsSize && (item.size = newValue);
            });
            priv.itemsSize = newValue;
            this.draw();
        }
    }
    //#endregion itemsSize
    //#region useAlternateColor
    get useAlternateColor() {
        return core.private(this).useAlternateColor;
    }
    set useAlternateColor(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.useAlternateColor !== newValue) {
            htmlElement.classList.remove('useAlternateColor');
            priv.useAlternateColor = newValue;
            newValue && htmlElement.classList.add('useAlternateColor');
        }
    }
    //#endregion useAlternateColor
    //#region viewCheckboxes
    get viewCheckboxes() {
        return core.private(this).viewCheckboxes;
    }
    set viewCheckboxes(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && !(this instanceof core.classes.HorizontalListBox)) {
            if (priv.viewCheckboxes !== newValue) {
                priv.viewCheckboxes = newValue;
                this.draw();
            }
        }
    }
    //#endregion viewCheckboxes
    //#region itemIndex
    get itemIndex() {
        return core.private(this).itemIndex;
    }
    set itemIndex(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue < priv.items.length && newValue >= 0) {
            if (priv.itemIndex !== newValue) {
                priv.itemIndex > -1 && this.deselectItemIndex();
                let item = priv.items[newValue];
                while ((item.isHeader || !item.enabled) && (newValue > -1 && newValue < priv.items.length)) {
                    priv.keyDir === core.types.DIRECTIONS.LEFT ? newValue-- : newValue++;
                    item = priv.items[newValue];
                }
                newValue = Math.min(Math.max(newValue, 0), priv.items.length - 1);
                priv.itemIndex = newValue;
                item = priv.items[priv.itemIndex];
                if (item) {
                    item.selected = !0;
                    this.scrollToItem();
                }
            }
        }
    }
    //#endregion itemIndex
    //#region orientation
    get orientation() {
        return core.private(this).orientation;
    }
    set orientation(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && priv.orientation !== newValue) {
            htmlElement.classList.remove(`orientation-${priv.orientation}`);
            priv.orientation = newValue;
            htmlElement.classList.remove(`orientation-${priv.orientation}`);
            this.draw();
        }
    }
    //#endregion orientation
    //#region images
    get images() {
        return core.private(this).images;
    }
    set images(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.ImageList && priv.images !== newValue) {
            priv.images = newValue;
            this.draw();
        }
    }
    //#endregion images
    //#region count
    get count() {
        return core.private(this).items.count();
    }
    //#endregion count
    //#endregion Getters / Setters
    //#region Methods
    //#region draw
    draw() {
        //#region Variables déclaration
        const priv = core.private(this);
        const oldVisibleItems = priv.visibleItems;
        const items = priv.items;
        const vert = priv.orientation === core.types.ORIENTATIONS.VERTICAL;
        const scrollModeNormal = this.scrollMode === ScrollControl.SCROLLMODES.NORMAL;
        const htmlElement = this.HTMLElement;
        let itemVisible = !1;
        const prop = vert ? 'Top' : 'Left';
        const propSize = vert ? 'Height' : 'Width';
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            priv.scrollPos =
                Math.max(Math.min(htmlElement[`scroll${prop}`], priv.innerHeight
                    - htmlElement[`offset${propSize}`]), 0);
            priv.visibleItems = [];
            let topIndex = 0;
            topIndex = Math.max(0, int(priv.scrollPos / priv.itemsSize));
            let maxIndex = !oldVisibleItems.isEmpty
                ? topIndex + oldVisibleItems.length * 2 : int(htmlElement.offsetHeight / priv.itemsSize) + 1;
            maxIndex = Math.min(maxIndex, items.length);
            !scrollModeNormal && (priv.scroller.style[propSize.toLowerCase()]
                = `${priv.innerHeight}${core.types.CSSUNITS.PX}`);
            for (let i = topIndex; i < maxIndex; i++) {
                const item = items[i];
                if (scrollModeNormal) {
                    itemVisible = !0;
                } else {
                    itemVisible = !1;
                    ((item.pos + item.size >= priv.scrollPos)
                        && (item.pos < htmlElement[`offset${propSize}`] + priv.scrollPos))
                        && (itemVisible = !0);
                }
                if (itemVisible) {
                    this.dropDownPopup && (item.dropDownPopup = this.dropDownPopup);
                    item.draw();
                    priv.visibleItems.push(item);
                }
            }
            oldVisibleItems.forEach(item => {
                priv.visibleItems.indexOf(item) === -1 && item.removeToHTML();
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
        this.mouseDown();
    }
    //#endregion selectItem
    //#region deselectItemIndex
    deselectItemIndex() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (priv.itemIndex !== -1) {
            const item = priv.items[priv.itemIndex];
            item && (item.selected = !1);
        }
    }
    //#endregion deselectItemIndex
    //#region refreshInnerHeight
    refreshInnerHeight() {
        //#region Variables déclaration
        const priv = core.private(this);
        const items = priv.items;
        //#endregion Variables déclaration
        priv.innerHeight = 0;
        items.forEach(item => {
            priv.innerHeight += item.size;
        });
        this.allowUpdate && this.draw();
    }
    //#endregion refreshInnerHeight
    //#region addItem
    addItem(item) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (item instanceof ListBoxItem) {
            priv.innerHeight += item.size;
            item.pos = priv.items.last ? priv.items.last.pos + item.size : 0;
            priv.items.push(item);
        }
    }
    //#endregion addItem
    //#region deleteItem
    deleteItem(item) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        item instanceof ListBoxItem && priv.items.indexOf(item) !== -1 && priv.items.remove(item);
    }
    //#endregion deleteItem
    //#region deleteAt
    deleteAt(index) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        index >= 0 && index < priv.items.length && priv.items.removeAt(priv.items[index]);
    }
    //#endregion deleteAt
    //#region moveItem
    moveItem(itemToMove, itemBefore) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (itemToMove instanceof ListBoxItem && itemBefore instanceof ListBoxItem) {
            priv.visibleItems.indexOf(itemToMove) > -1 && priv.items.beginUpdate();
            priv.items.remove(itemToMove);
            priv.items.insert(itemBefore.index, itemToMove);
            priv.itemIndex = itemToMove.index;
            priv.visibleItems.indexOf(itemToMove) > -1 && priv.items.endUpdate();
        }
    }
    //#endregion moveItem
    //#region beginUpdate
    beginUpdate() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.allowUpdate = !1;
        priv.items.beginUpdate();
    }
    //#endregion beginUpdate
    //#region endUpdate
    endUpdate() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.allowUpdate = !0;
        this.refreshInnerHeight();
        priv.items.endUpdate();
    }
    //#endregion endUpdate
    //#region clear
    clear() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.visibleItems.clear();
        if (priv.items) {
            while (priv.items.length > 0) {
                priv.items.pop().destroy();
            }
            priv.items.clear();
        }
    }
    //#endregion clear
    //#region clearSelection
    clearSelection() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.items.forEach(item => {
            item.selected = !1;
        });
    }
    //#endregion clearSelection
    //#region selectAll
    selectAll() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.items.forEach(item => {
            item.selected = !0;
        });
    }
    //#endregion selectAll
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (priv.items) {
            while (priv.items.length > 0) {
                priv.items.last.destroy();
                priv.items.pop();
            }
            priv.items.destroy();
        }
        priv.visibleItems.destroy();
        priv.lastDelta.destroy();
        priv.downPos.destroy();
        priv.currentPos.destroy();
        //priv.animated = null;
        this.unBindAndDestroyEvents(['onChange', 'onSelectItem', 'onDrawItem']);
        super.destroy();
    }
    //#endregion destroy
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        const VKEYSCODES = Keyboard.VKEYSCODES;
        const DIRECTIONS = core.types.DIRECTIONS;
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
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
                this.itemIndex = priv.items.length - 1;
                break;
            case VKEYSCODES.VK_PRIOR:
                this.itemIndex = priv.orientation === ORIENTATIONS.VERTICAL
                    ? priv.itemIndex - int(htmlElement.offsetHeight / priv.itemsSize)
                    : priv.itemIndex - int(htmlElement.offsetWidth / priv.itemsSize);
                break;
            case VKEYSCODES.VK_NEXT:
                this.itemIndex = priv.orientation === ORIENTATIONS.VERTICAL
                    ? priv.itemIndex + int(htmlElement.offsetHeight / priv.itemsSize)
                    : priv.itemIndex + int(htmlElement.offsetWidth / priv.itemsSize);
                break;
            case VKEYSCODES.VK_SPACE:
                {
                    const item = priv.items[priv.itemIndex];
                    priv.viewCheckboxes && item && (item.checked = !item.checked);
                }
                break;
        }
    }
    //#endregion keyDown
    //#region scrollToItem
    scrollToItem() {
        //#region Variables déclaration
        const priv = core.private(this);
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const htmlElement = this.HTMLElement;
        const prop = priv.orientation === ORIENTATIONS.VERTICAL ? 'Top' : 'Left';
        const propSize = priv.orientation === ORIENTATIONS.VERTICAL ? 'Height' : 'Width';
        //#endregion Variables déclaration
        if (this.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
            const nbrVisibleItems = int(htmlElement[`offset${propSize}`] / priv.itemsSize);
            const base = ((nbrVisibleItems * priv.itemsSize) - htmlElement[`offset${propSize}`]) + priv.itemsSize;
            htmlElement[`scroll${prop}`] = priv.scrollToItemMode === 'last'
                ? base + ((priv.itemIndex - nbrVisibleItems) * priv.itemsSize) + 2
                : priv.itemIndex * priv.itemsSize;
        } else {
            if (priv.items[priv.itemIndex].html[`offset${prop}`]
                + priv.items[priv.itemIndex].html[`offset${propSize}`] >
                htmlElement[`offset${propSize}`] + htmlElement[`scroll${prop}`]) {
                htmlElement[`scroll${prop}`] = priv.items[priv.itemIndex].html[`offset${propSize}`] +
                    priv.items[priv.itemIndex].html[`offset${propSize}`] + 2
                    - htmlElement[`offset${propSize}`];
            } else if (htmlElement[`scroll${prop}`] > priv.items[priv.itemIndex].html[`offset${prop}`]) {
                htmlElement[`scroll${prop}`] = priv.items[priv.itemIndex].html[`offset${prop}`] - 1;
            }
        }
    }
    //#endregion scrollToItem
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        //#endregion Variables déclaration
        super.loaded();
        this.getImages();
        priv.innerHeight = 0;
        priv.scroller = document.createElement(`${name}-scroller`);
        priv.scroller.classList.add('listBoxScroller');
        htmlElement.appendChild(priv.scroller);
        if (priv.props.items) {
            if (core.tools.isArray(priv.props.items)) {
                this.beginUpdate();
                priv.props.items.forEach((item, idx) => {
                    const props = item;
                    props.inForm = !1;
                    props.selected = priv.itemIndex === idx;
                    props.height = item.hasOwnProperty('height') && core.tools.isNumber(item.size)
                        ? item.size : priv.itemsSize;
                    const _item = core.classes.createComponent({
                        class: priv.itemsClass,
                        owner: this,
                        props
                    });
                    this.addItem(_item);
                });
                this.endUpdate();
            }
        }
        priv.useAlternateColor && htmlElement.classList.add('useAlternateColor');
        htmlElement.classList.add(`orientation-${priv.orientation}`);
        this.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL
            && Events.bind(htmlElement, core.types.HTMLEVENTS.SCROLL, () => {
                core.mouse.stopAllEvents(); this.setFocus(); this.draw();
            });
        this.draw();
    }
    //#endregion loaded
    //#region getImages
    getImages() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(priv.images) && this.form[priv.images] && (this.images = this.form[priv.images]);
    }
    //#endregion getImages
    //#endregion Methods
}
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