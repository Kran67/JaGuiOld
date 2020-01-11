import { ThemedControl } from "/scripts/core/themedcontrol.js";
//import { Point } from "/scripts/core/geometry.js";
import { Type } from "/scripts/core/types.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//import { Animation } from "/scripts/core/animation.js";
import { Interpolation } from "/scripts/core/interpolation.js";
//#region ItemsWheel
const ItemsWheel = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class ItemsWheel extends ThemedControl {
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.lastDelta = new Core.classes.Point;
                priv.downPos = new Core.classes.Point;
                priv.currentPos = new Core.classes.Point;
                priv.down = false;
                priv.scrollAni = null;
                priv.sep = null;
                priv.topGradient = null;
                priv.bottomGradient = null;
                priv.value = String.EMPTY;
                priv.index = -1;
                priv.mouseTracking = true;
                priv.animated = true;
                this.addBindableProperties(["value"]);
                this.hitTest = true;
                //this._items=[];
                Core.classes.newCollection(this, this, Types.CONSTANTS.STRING);
                this.onChange = new Core.classes.NotifyEvent(this);
                //this.tabStop=true;
                this.canFocused = true;
                delete this.tabOrder;
            }
        }
        get content() {
            return internal(this).content;
        }
        set content(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.content !== newValue) {
                    priv.content = newValue;
                }
            }
        }
        get lastDelta() {
            return internal(this).lastDelta;
        }
        set lastDelta(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Point) {
                if (priv.lastDelta.equals(newValue)) {
                    priv.lastDelta.assign(newValue);
                }
            }
        }
        get downPos() {
            return internal(this).downPos;
        }
        set downPos(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Point) {
                if (priv.downPos.equals(newValue)) {
                    priv.downPos.assign(newValue);
                }
            }
        }
        get currentPos() {
            return internal(this).currentPos;
        }
        set currentPos(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Point) {
                if (priv.currentPos.equals(newValue)) {
                    priv.currentPos.assign(newValue);
                }
            }
        }
        get down() {
            return internal(this).down;
        }
        set down(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.down !== newValue) {
                    priv.down = newValue;
                }
            }
        }
        get scrollAni() {
            return internal(this).scrollAni;
        }
        set scrollAni(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.FloatAnimation) {
                if (priv.scrollAni !== newValue) {
                    priv.scrollAni = newValue;
                }
            }
        }
        get sep() {
            return internal(this).sep;
        }
        set sep(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.sep !== newValue) {
                    priv.sep = newValue;
                }
            }
        }
        get topGradient() {
            return internal(this).topGradient;
        }
        set topGradient(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.topGradient !== newValue) {
                    priv.topGradient = newValue;
                }
            }
        }
        get bottomGradient() {
            return internal(this).bottomGradient;
        }
        set bottomGradient(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.bottomGradient !== newValue) {
                    priv.bottomGradient = newValue;
                }
            }
        }
        get value() {
            return internal(this).value;
        }
        set value(newValue) {
            const priv = internal(this);
            if (typeof newValue === typeof priv.value) {
                if (newValue !== priv.value) {
                    priv.value = newValue;
                    if (!this.updating) {
                        this.onChange.invoke();
                    }
                }
            }
        }
        get index() {
            return internal(this).index;
        }
        set index(newValue) {
            const items = internal(this).items;
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue < 0) newValue = 0;
                if (newValue > items.length - 1) {
                    newValue = items.length - 1;
                }
                if (priv.index !== newValue) {
                    priv.index = Math.intCeiling(newValue, 1);
                    if (priv.index !== -1) {
                        const offset = 15 * priv.index;
                        priv.content.style.top = -offset + Types.CSSUNITS.PX;
                    }
                    priv.value = items[priv.index];
                }
            }
        }
        get mouseTracking() {
            return internal(this).mouseTracking;
        }
        set mouseTracking(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.mouseTracking) {
                    priv.mouseTracking = newValue;
                }
            }
        }
        get animated() {
            return internal(this).animated;
        }
        set animated(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.animated) {
                    priv.animated = newValue;
                }
            }
        }
        //#region Methods
        recreateItems() {
            const content = this.content;
            if (content) {
                content.innerHTML = String.EMPTY;
                this.items.forEach(item => {
                    const _item = document.createElement(Types.HTMLElements.DIV);
                    _item.classList.add(this.constructor.name + "Item ItemsWheelItem");
                    //item.dataset.theme = this.form.getThemeName();
                    const str = item;
                    item.innerHTML = str;
                    this.content.appendChild(_item);
                });
            }
        }
        updateFromHTML() {
            //let data = this.HTMLElement.dataset.value;
            //if (data) this.value = data;
            super.updateFromHTML();
            //this.recreateItems();
        }
        getHTMLElement(id) {
            let content = this.content;
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                this.topGradient = htmlElement.firstElementChild;
                this.sep = htmlElement.querySelector(".ItemsWheelSep");
                content = htmlElement.querySelector(".ItemsWheelContent");
                content.jsObj = this;
                this.bottomGradient = htmlElement.lastElementChild;
            }
        }
        mouseWheel() {
            const  d = Core.mouse.wheelDelta;
            let offsetValue = 0;
            super.mouseWheel();
            if (d < 0) {
                offsetValue = 1;
            } else {
                offsetValue = -1;
            }
            this.scrollBy(offsetValue);
        }
        scrollBy(offset) {
            let topOffset = 0;
            const index = this.index;
            if (index + offset < 0 || index + offset > this.items.length - 1) {
                offset = 0;
            }
            if (offset === 0) {
                return;
            }
            if (offset < 0) {
                topOffset = 15 * offset;
            } else {
                topOffset = 15 * offset;
            }
            this.index += index + offset;
        }
        loaded() {
            super.loaded();
            this.recreateItems();
        }
        mouseDown() {
            const scrollAni = this.scrollAni;
            super.mouseDown();
            if (Core.mouse.button === Mouse.mouseButtons.LEFT && this.mouseTracking) {
                this.lastDelta.setValues(0, 0);
                this.downPos.assign(Core.mouse.screen);
                this.currentPos.assign(Core.mouse.screen);
                this.down = true;
                if (scrollAni && scrollAni.running) {
                    scrollAni.stopAtCurrent();
                    this.index = Math.intCeiling(this.index, 1);
                }
            }
        }
        mouseMove() {
            const currentPos = this.currentPos;
            const offset = Core.mouse.screen.y - currentPos.y;
            const downPos = this.downPos;
            const lastDelta = this.lastDelta;
            super.mouseMove();
            if (this.down && this.mouseTracking) {
                lastDelta.y = Core.mouse.screen.y - downPos.y;
                if (Core.abs(lastDelta.y) < 10 && Math.abs(lastDelta.y) > 3) {
                    this.scrollBy(offset > 0 ? -1 : 1);
                    downPos.y = Core.mouse.screen.y;
                }
                currentPos.assign(Core.mouse.screen);
            }
        }
        mouseUp() {
            const currentPos = this.currentPos;
            const scrollAni = this.scrollAni;
            super.mouseUp();
            //const offset = Core.mouse.screen.y - currentPos.y;
            if (this.down && this.mouseTracking) {
                this.down = false;
                if (this.animated && this.lastDelta.y !== 0) {
                    if (Math.abs(this.downPos.y - currentPos.y) > 20) {
                        this.createScrollAni();
                        if (scrollAni.running) {
                            scrollAni.stopAtCurrent();
                        }
                        scrollAni.stopValue = ~~(this.index - this.lastDelta.y / 2);
                        scrollAni.start();
                    }
                }
            }
        }
        createScrollAni() {
            let scrollAni = this.scrollAni;
            if (!scrollAni) {
                scrollAni = this.scrollAni = new Core.classes.FloatAnimation(this);
                scrollAni.animationType = Animation.ANIMATIONTYPES.OUT;
                scrollAni.interpolation = Interpolation.INTERPOLATIONTYPES.QUADRATIC;
                scrollAni.duration = 3;
                scrollAni.control = this;
                scrollAni.propertyName = "index";
                scrollAni.startFromCurrent = true;
                scrollAni.convertToCSS = false;
                scrollAni.initialValue = this.index;
            }
        }
        destroy() {
            this.lastDelta.destroy();
            this.downPos.destroy();
            this.currentPos.destroy();
            this.items.destroy();
            this.onChange.destroy();
            super.destroy();
        }
        keyDown() {
            const VKEYSCODES = Keyboard.VKEYSCODES;
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                    break;
                case VKEYSCODES.VK_UP:
                    this.index--;
                    break;
                case VKEYSCODES.VK_RIGHT:
                    break;
                case VKEYSCODES.VK_DOWN:
                    this.index++;
                    break;
                case VKEYSCODES.VK_HOME:
                    this.index = 0;
                    break;
                case VKEYSCODES.VK_END:
                    this.index = this.items.length - 1;
                    break;
                case VKEYSCODES.VK_PRIOR:
                    this.index -= 5;
                    break;
                case VKEYSCODES.VK_NEXT:
                    this.index += 5;
                    break;
            }
        }
        getTemplate() {
            let html = super.getTemplate();
            const a = html.split("{name}");
            html = a.join(this.name);
            return html;
        }
        //#endregion
    }
    return ItemsWheel;
})();
Object.defineProperties(ItemsWheel, {
    "value": {
        enumerable: true
    },
    "mouseTracking": {
        enumerable: true
    },
    "animated": {
        enumerable: true
    }
});
Object.seal(ItemsWheel);
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, ItemsWheel);
export { ItemsWheel };