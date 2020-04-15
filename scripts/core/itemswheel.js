//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { NotifyEvent } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//import { Animation } from '/scripts/core/animation.js';
//import { Interpolation } from '/scripts/core/interpolation.js';
//#endregion Imports
//#region ItemsWheel
const ItemsWheel = (() => {
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
    //#region ItemsWheel
    class ItemsWheel extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.lastDelta = new Point;
                priv.downPos = new Point;
                priv.currentPos = new Point;
                priv.down = !1;
                priv.scrollAni = null;
                priv.sep = null;
                priv.topGradient = null;
                priv.bottomGradient = null;
                priv.value = String.EMPTY;
                priv.index = -1;
                priv.mouseTracking = !0;
                priv.animated = !0;
                this.hitTest = !0;
                Core.classes.newCollection(this, this, Types.CONSTANTS.STRING);
                this.createEventsAndBind(['onChange'], props);
                this.canFocused = !0;
                delete this.tabOrder;
                this.stopEvent = !0;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region value
        get value() {
            return internal(this).value;
        }
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === typeof priv.value) {
                if (newValue !== priv.value) {
                    priv.value = newValue;
                    if (!this.updating) {
                        this.onChange.invoke();
                    }
                }
            }
        }
        //#endregion value
        //#region index
        get index() {
            return internal(this).index;
        }
        set index(newValue) {
            //#region Variables déclaration
            const items = this.items;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue < 0) newValue = 0;
                if (newValue > items.length - 1) {
                    newValue = items.length - 1;
                }
                if (priv.index !== newValue) {
                    priv.index = Math.intCeiling(newValue, 1);
                    if (priv.index !== -1) {
                        const offset = 15 * priv.index;
                        priv.content.style.top = `${-offset}${Types.CSSUNITS.PX}`;
                    }
                    priv.value = items[priv.index];
                    this.onChange.invoke();
                }
            }
        }
        //#endregion index
        //#region mouseTracking
        get mouseTracking() {
            return internal(this).mouseTracking;
        }
        set mouseTracking(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (newValue !== priv.mouseTracking) {
                    priv.mouseTracking = newValue;
                }
            }
        }
        //#endregion mouseTracking
        //#region animated
        get animated() {
            return internal(this).animated;
        }
        set animated(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (newValue !== priv.animated) {
                    priv.animated = newValue;
                }
            }
        }
        //#endregion animated
        //#endregion Getter / Setter
        //#region Methods
        //#region recreateItems
        recreateItems() {
            //#region Variables déclaration
            const priv = internal(this);
            const content = priv.content;
            const name = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            //#endregion Variables déclaration
            if (content) {
                content.innerHTML = String.EMPTY;
                this.items.forEach(item => {
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
        //#region mouseWheel
        mouseWheel() {
            //#region Variables déclaration
            const d = Core.mouse.wheelDelta;
            //#endregion Variables déclaration
            super.mouseWheel();
            this.scrollBy(d < 0 ? 1 : -1);
        }
        //#endregion mouseWheel
        //#region scrollBy
        scrollBy(offset) {
            //#region Variables déclaration
            const priv = internal(this);
            const index = priv.index;
            //#endregion Variables déclaration
            if (index + offset < 0 || index + offset > this.items.length - 1) {
                offset = 0;
            }
            if (offset === 0) {
                return;
            }
            this.index = index + offset;
        }
        //#endregion scrollBy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const name = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            //#endregion Variables déclaration
            super.loaded();
            priv.topGradient = document.createElement(`${name}topgradient`);
            priv.topGradient.classList.add('Control', 'ItemsWheelTopGradient');
            htmlElement.appendChild(priv.topGradient);
            priv.sep = document.createElement(`${name}sep`);
            priv.sep.classList.add('Control', 'ItemsWheelSep', this.themeName);
            htmlElement.appendChild(priv.sep);
            priv.content = document.createElement(`${name}content`);
            priv.content.classList.add('Control', 'ItemsWheelContent', this.themeName);
            priv.content.jsObj = this;
            htmlElement.appendChild(priv.content);
            priv.bottomGradient = document.createElement(`${name}bottomgradient`);
            priv.bottomGradient.classList.add('Control', 'ItemsWheelBottomGradient');
            htmlElement.appendChild(priv.bottomGradient);
            this.recreateItems();
        }
        //#endregion loaded
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //const scrollAni = this.scrollAni;
            //#endregion Variables déclaration
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && priv.mouseTracking) {
                priv.lastDelta.setValues(0, 0);
                priv.downPos.assign(Core.mouse.screen);
                priv.currentPos.assign(Core.mouse.screen);
                priv.down = !0;
                //if (scrollAni && scrollAni.running) {
                //    scrollAni.stopAtCurrent();
                this.index = Math.intCeiling(priv.index, 1);
                //}
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const priv = internal(this);
            const offset = Core.mouse.screen.y - priv.currentPos.y;
            //#endregion Variables déclaration
            super.mouseMove();
            if (priv.down && priv.mouseTracking) {
                priv.lastDelta.y = Core.mouse.screen.y - priv.downPos.y;
                if (Math.abs(priv.lastDelta.y) < 10 && Math.abs(priv.lastDelta.y) > 3) {
                    this.scrollBy(offset > 0 ? -1 : 1);
                    priv.downPos.y = Core.mouse.screen.y;
                }
                priv.currentPos.assign(Core.mouse.screen);
            }
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //const scrollAni = this.scrollAni;
            //#endregion Variables déclaration
            super.mouseUp();
            //const offset = Core.mouse.screen.y - currentPos.y;
            if (priv.down && priv.mouseTracking) {
                priv.down = !1;
                if (priv.animated && priv.lastDelta.y !== 0) {
                    if (Math.abs(priv.downPos.y - priv.currentPos.y) > 20) {
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
        //        scrollAni = this.scrollAni = new Core.classes.FloatAnimation(this);
        //        scrollAni.animationType = Animation.ANIMATIONTYPES.OUT;
        //        scrollAni.interpolation = Interpolation.INTERPOLATIONTYPES.QUADRATIC;
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.lastDelta.destroy();
            priv.downPos.destroy();
            priv.currentPos.destroy();
            this.items.destroy();
            this.onChange.destroy();
            super.destroy();
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const VKEYSCODES = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
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
        //#endregion keyDown
        //#endregion Methods
    }
    return ItemsWheel;
    //#endregion ItemsWheel
})();
//#region ItemsWheel defineProperties
Object.defineProperties(ItemsWheel, {
    'value': {
        enumerable: !0
    },
    'mouseTracking': {
        enumerable: !0
    },
    'animated': {
        enumerable: !0
    }
});
//#endregion ItemsWheel defineProperties
Object.seal(ItemsWheel);
Core.classes.register(Types.CATEGORIES.INTERNAL, ItemsWheel);
//#endregion
//#region Template
if (Core.isHTMLRenderer) {
    const ItemsWheelTpl = ['<jagui-itemswheel id="{internalId}" data-class="ItemWheel" class="Control ',
        'ItemsWheel {theme}"><properties>{ "name": "{name}", "width": 20, "height": 40 }</properties>',
        '</jagui-itemswheel>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ItemsWheel, template: ItemsWheelTpl }]);
}
//#endregion
export { ItemsWheel };