//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//import { Animation } from '/scripts/core/animation.js';
//import { Interpolation } from '/scripts/core/interpolation.js';
//#endregion Imports
//#region ItemsWheel
class ItemsWheel extends ThemedControl {
    //#region Private fields
    #content;
    #lastDelta = new Point;
    #downPos = new Point;
    #currentPos = new Point;
    #down = !1;
    #scrollAni;
    #sep;
    #topGradient;
    #bottomGradient;
    #value = String.EMPTY;
    #index = -1;
    #mouseTracking = !0;
    #animated = !0;
    #items = [];
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.mouseEvents = { mousemove: !0 };
            props.canFocused = !0;
            super(owner, props);
            this.#items.convertToCollection(owner, core.types.CONSTANTS.STRING);
            this.createEventsAndBind(['onChange'], props);
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region items
    get items() {
        return this.#items;
    }
    //#endregion items
    //#region value
    get value() {
        return this.#value;
    }
    set value(newValue) {
        if (typeof newValue === typeof this.#value && newValue !== this.#value) {
            this.#value = newValue;
            !this.updating && this.onChange.invoke();
        }
    }
    //#endregion value
    //#region index
    get index() {
        return this.#index;
    }
    set index(newValue) {
        //#region Variables déclaration
        const items = this.#items;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(Math.min(newValue, items.length - 1), 0);
            if (this.#index !== newValue) {
                this.#index = Math.intCeiling(newValue, 1);
                if (this.#index !== -1) {
                    const offset = 15 * this.#index;
                    this.#content.style.top = `${-offset}${core.types.CSSUNITS.PX}`;
                }
                this.#value = items[this.#index];
                this.onChange.invoke();
            }
        }
    }
    //#endregion index
    //#region mouseTracking
    get mouseTracking() {
        return this.#mouseTracking;
    }
    set mouseTracking(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#mouseTracking && (this.#mouseTracking = newValue);
    }
    //#endregion mouseTracking
    //#region animated
    get animated() {
        return this.#animated;
    }
    set animated(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#animated && (this.#animated = newValue);
    }
    //#endregion animated
    //#endregion Getters / Setters
    //#region Methods
    //#region recreateItems
    recreateItems() {
        //#region Variables déclaration
        const content = this.#content;
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        //#endregion Variables déclaration
        if (content) {
            content.innerHTML = String.EMPTY;
            this.#items.forEach(item => {
                const _item = document.createElement(`${name}wheelitem`);
                _item.classList.add(`${this.constructor.name}Item`, 'ItemsWheelItem');
                _item.innerHTML = item;
                content.appendChild(_item);
            });
        }
    }
    //#endregion recreateItems
    //#region endUpdate
    endUpdate() {
        super.endUpdate();
        this.recreateItems();
    }
    //#endregion endUpdate
    //#region wheel
    wheel(event) {
        //#region Variables déclaration
        const d = core.mouse.wheelDelta;
        //#endregion Variables déclaration
        this.canFocused ? this.setFocus() : this.owner.canFocused && this.owner.setFocus();
        this.scrollBy(d < 0 ? -1 : 1);
        core.mouse.stopAllEvents(event);
    }
    //#endregion wheel
    //#region scrollBy
    scrollBy(offset) {
        //#region Variables déclaration
        const index = this.#index;
        //#endregion Variables déclaration
        index + offset < 0 || index + offset > this.#items.length - 1 && (offset = 0);
        if (offset === 0) {
            return;
        }
        this.index = index + offset;
    }
    //#endregion scrollBy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        let topGradient, sep, content, bottomGradient;
        //#endregion Variables déclaration
        super.loaded();
        topGradient = document.createElement(`${name}topgradient`);
        topGradient.classList.add('ItemsWheelTopGradient');
        htmlElement.appendChild(topGradient);
        sep = document.createElement(`${name}sep`);
        sep.classList.add('ItemsWheelSep', this.themeName);
        htmlElement.appendChild(sep);
        content = document.createElement(`${name}content`);
        content.classList.add('ItemsWheelContent', this.themeName);
        //content.jsObj = this;
        htmlElement.appendChild(content);
        bottomGradient = document.createElement(`${name}bottomgradient`);
        bottomGradient.classList.add('ItemsWheelBottomGradient');
        htmlElement.appendChild(bottomGradient);
        htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
        this.#topGradient = topGradient;
        this.#sep = sep;
        this.#content = content;
        this.#bottomGradient = bottomGradient;
        this.recreateItems();
    }
    //#endregion loaded
    //#region mouseDown
    mouseDown() {
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.#mouseTracking) {
            this.#lastDelta.setValues(0, 0);
            this.#downPos.assign(core.mouse.screen);
            this.#currentPos.assign(core.mouse.screen);
            this.#down = !0;
            //if (scrollAni && scrollAni.running) {
            //    scrollAni.stopAtCurrent();
            this.index = Math.intCeiling(this.#index, 1);
            //}
        }
    }
    //#endregion mouseDown
    //#region mouseMove
    mouseMove() {
        //#region Variables déclaration
        const offset = core.mouse.screen.y - this.#currentPos.y;
        //#endregion Variables déclaration
        super.mouseMove();
        if (this.#down && this.#mouseTracking) {
            this.#lastDelta.y = core.mouse.screen.y - this.#downPos.y;
            if (Math.abs(this.#lastDelta.y) < 10 && Math.abs(this.#lastDelta.y) > 3) {
                this.scrollBy(offset > 0 ? -1 : 1);
                this.#downPos.y = core.mouse.screen.y;
            }
            this.#currentPos.assign(core.mouse.screen);
        }
    }
    //#endregion mouseMove
    //#region mouseUp
    mouseUp() {
        super.mouseUp();
        if (this.#down && this.#mouseTracking) {
            this.#down = !1;
            if (this.#animated && this.#lastDelta.y !== 0) {
                if (Math.abs(this.#downPos.y - this.#currentPos.y) > 20) {
                    //this.createScrollAni();
                    //if (scrollAni.running) {
                    //    scrollAni.stopAtCurrent();
                    //}
                    //scrollAni.stopValue = ~~(this.index - this.lastDelta.y / 2);
                    //scrollAni.start();
                }
            }
        }
    }
    //#endregion mouseUp
    //#region createScrollAni
    //createScrollAni() {
    //    let scrollAni = this.scrollAni;
    //    if (!scrollAni) {
    //        scrollAni = this.scrollAni = new core.classes.FloatAnimation(this);
    //        scrollAni.animationType = Animation.ANIMATIONcore.types.OUT;
    //        scrollAni.interpolation = Interpolation.INTERPOLATIONcore.types.QUADRATIC;
    //        scrollAni.duration = 3;
    //        scrollAni.control = this;
    //        scrollAni.propertyName = "index";
    //        scrollAni.startFromCurrent = !0;
    //        scrollAni.convertToCSS = !1;
    //        scrollAni.initialValue = this.index;
    //    }
    //}
    //#endregion createScrollAni
    //#region destroy
    destroy() {
        this.#lastDelta.destroy();
        this.#downPos.destroy();
        this.#currentPos.destroy();
        this.#items.destroy();
        this.#items.clear();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
            case VKEYSCODES.VK_UP:
                this.index--;
                break;
            case VKEYSCODES.VK_DOWN:
                this.index++;
                break;
            case VKEYSCODES.VK_HOME:
                this.index = 0;
                break;
            case VKEYSCODES.VK_END:
                this.index = this.#items.length - 1;
                break;
            case VKEYSCODES.VK_PAGEUP:
                this.index -= 5;
                break;
            case VKEYSCODES.VK_PAGEDOWN:
                this.index += 5;
                break;
        }
        if ([VKEYSCODES.VK_LEFT, VKEYSCODES.VK_RIGHT].indexOf(core.keyboard.key) === -1) {
            core.keyboard.stopEvent();
        }
    }
    //#endregion keyDown
    //#endregion Methods
}
Object.defineProperties(ItemsWheel.prototype, {
    'scrollAni': {
        enumerable: !0
    },
    'value': {
        enumerable: !0
    },
    'animated': {
        enumerable: !0
    },
    'mouseTracking': {
        enumerable: !0
    }
});
Object.seal(ItemsWheel);
core.classes.register(core.types.CATEGORIES.INTERNAL, ItemsWheel);
//#endregion ItemsWheel
//#region Template
if (core.isHTMLRenderer) {
    const ItemsWheelTpl = ['<jagui-itemswheel id="{internalId}" data-class="ItemWheel" class="Control ',
        'ItemsWheel {theme}"><properties>{ "name": "{name}", "width": 20, "height": 40 }</properties>',
        '</jagui-itemswheel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ItemsWheel, template: ItemsWheelTpl }]);
}
//#endregion
export { ItemsWheel };