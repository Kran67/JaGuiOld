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
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.mouseEvents = { mousemove: !0 };
            props.canFocused = !0;
            super(owner, props);
            core.private(this, {
                content: null,
                lastDelta: new Point,
                downPos: new Point,
                currentPos: new Point,
                down: !1,
                scrollAni: null,
                sep: null,
                topGradient: null,
                bottomGradient: null,
                value: String.EMPTY,
                index: -1,
                mouseTracking: !0,
                animated: !0
            });
            core.classes.newCollection(this, this, core.types.CONSTANTS.STRING);
            this.createEventsAndBind(['onChange'], props);
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region value
    get value() {
        return core.private(this).value;
    }
    set value(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (typeof newValue === typeof priv.value && newValue !== priv.value) {
            priv.value = newValue;
            !this.updating && this.onChange.invoke();
        }
    }
    //#endregion value
    //#region index
    get index() {
        return core.private(this).index;
    }
    set index(newValue) {
        //#region Variables déclaration
        const items = this.items;
        let priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(Math.min(newValue, items.length - 1), 0);
            if (priv.index !== newValue) {
                priv.index = Math.intCeiling(newValue, 1);
                if (priv.index !== -1) {
                    const offset = 15 * priv.index;
                    priv.content.style.top = `${-offset}${core.types.CSSUNITS.PX}`;
                }
                //priv.value = items[priv.index];
                this.onChange.invoke();
            }
        }
    }
    //#endregion index
    //#region mouseTracking
    get mouseTracking() {
        return core.private(this).mouseTracking;
    }
    set mouseTracking(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && newValue !== priv.mouseTracking && (priv.mouseTracking = newValue);
    }
    //#endregion mouseTracking
    //#region animated
    get animated() {
        return core.private(this).animated;
    }
    set animated(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && newValue !== priv.animated && (priv.animated = newValue);
    }
    //#endregion animated
    //#endregion Getter / Setter
    //#region Methods
    //#region recreateItems
    recreateItems() {
        //#region Variables déclaration
        const priv = core.private(this);
        const content = priv.content;
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
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
        const priv = core.private(this);
        const index = priv.index;
        //#endregion Variables déclaration
        index + offset < 0 || index + offset > this.items.length - 1 && (offset = 0);
        if (offset === 0) {
            return;
        }
        this.index = index + offset;
    }
    //#endregion scrollBy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const name = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        let topGradient, sep, content, bottomGradient;
        //#endregion Variables déclaration
        super.loaded();
        topGradient = document.createElement(`${name}topgradient`);
        topGradient.classList.add('Control', 'ItemsWheelTopGradient');
        htmlElement.appendChild(topGradient);
        sep = document.createElement(`${name}sep`);
        sep.classList.add('Control', 'ItemsWheelSep', this.themeName);
        htmlElement.appendChild(sep);
        content = document.createElement(`${name}content`);
        content.classList.add('Control', 'ItemsWheelContent', this.themeName);
        content.jsObj = this;
        htmlElement.appendChild(content);
        bottomGradient = document.createElement(`${name}bottomgradient`);
        bottomGradient.classList.add('Control', 'ItemsWheelBottomGradient');
        htmlElement.appendChild(bottomGradient);
        htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
        core.private(this, {
            topGradient, sep, content, bottomGradient
        });
        this.recreateItems();
    }
    //#endregion loaded
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        //const scrollAni = this.scrollAni;
        //#endregion Variables déclaration
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && priv.mouseTracking) {
            priv.lastDelta.setValues(0, 0);
            priv.downPos.assign(core.mouse.screen);
            priv.currentPos.assign(core.mouse.screen);
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
        const priv = core.private(this);
        const offset = core.mouse.screen.y - priv.currentPos.y;
        //#endregion Variables déclaration
        super.mouseMove();
        if (priv.down && priv.mouseTracking) {
            priv.lastDelta.y = core.mouse.screen.y - priv.downPos.y;
            if (Math.abs(priv.lastDelta.y) < 10 && Math.abs(priv.lastDelta.y) > 3) {
                this.scrollBy(offset > 0 ? -1 : 1);
                priv.downPos.y = core.mouse.screen.y;
            }
            priv.currentPos.assign(core.mouse.screen);
        }
    }
    //#endregion mouseMove
    //#region mouseUp
    mouseUp() {
        //#region Variables déclaration
        const priv = core.private(this);
        //const scrollAni = this.scrollAni;
        //#endregion Variables déclaration
        super.mouseUp();
        //const offset = core.mouse.screen.y - currentPos.y;
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.lastDelta.destroy();
        priv.downPos.destroy();
        priv.currentPos.destroy();
        this.items.destroy();
        this.items.clear();
        delete this.items;
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
        switch (core.keyboard.keyCode) {
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