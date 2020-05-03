//#region Imports
import { GraphicControl } from '/scripts/core/graphiccontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Imports
//#region ColorPicker
const ColorPicker = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class ColorPicker
    class ColorPicker extends GraphicControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.autoCapture = !0;
                props.hitTest = { all: !0 };
                props.clipChilds = !1;
                props.canFocused = !0;
                props.allowUpdateOnResize = !0;
                super(owner, props);
                const priv = internal(this);
                priv.handle = new Point((props.width / 2) - 5, -5);
                priv.handleObj = null;
                priv.color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.RED;
                priv.colorQuad = props.hasOwnProperty('colorQuad') ? this.form[props.colorQuad] : null;
                this.createEventsAndBind(['onChange'], props);
                delete this.fillColor;
                delete this.strokeColor;
                delete this.strokeWidth;
                delete this.setStrokeWidth;
                delete this.setFillColor;
                delete this.setStrokeColor;
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const COLORPICKSIZE = core.types.CONSTANTS.COLORPICKSIZE;
            //#endregion Variables déclaration
            if (newValue instanceof Color && !priv.color.equals(newValue)) {
                priv.color.assign(newValue);
                let pos = ~~(priv.color.hue * htmlElement.offsetHeight / 360);
                pos -= COLORPICKSIZE / 2;
                priv.handle.y = (pos > htmlElement.offsetHeight - 5 ? htmlElement.offsetHeight - 5 : (pos < -5) ? -5 : pos);
                this.update();
            }
        }
        //#endregion color
        //#region colorQuad
        get colorQuad() {
            return internal(this).colorQuad;
        }
        set colorQuad(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof core.classes.ColorQuad && priv.colorQuad !== newValue) {
                priv.colorQuad = newValue;
                priv.colorQuad instanceof core.classes.ColorQuad
                    ? priv.colorQuad.color.assign(priv.color) : 1;
            }
        }
        //#endregion colorQuad
        //#endregion Getters / Setters
        //#region Methods
        //#region mouseDown
        mouseDown() {
            super.mouseDown();
            core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed
                ? this.update(core.mouse.target) : 1;
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const point = new core.classes.Point;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.mouseMove();
            if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                if (core.mouse.event.target !== htmlElement) {
                    point.assign(core.mouse.window);
                    const bounds = htmlElement.getBoundingClientRect();
                    point.x -= bounds.left;
                    point.y -= bounds.top;
                } else {
                    point.assign(core.mouse.target);
                }
                this.update(point);
            }
        }
        //#endregion mouseMove
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.handle.destroy();
            priv.handle = null;
            priv.handleObj = null;
            this.unBindAndDestroyEvents(['onChange']);
            priv.color.destroy();
            priv.color = null;
            priv.colorQuad = null;
        }
        //#endregion destroy
        //#region update
        update(point) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const COLORPICKSIZE = core.types.CONSTANTS.COLORPICKSIZE;
            //#endregion Variables déclaration
            if (!point) {
                point = new Point;
                point.x = 0;
                point.y = 0;
            }
            priv.color.hue = ~~((point.y * 360) / htmlElement.offsetHeight);
            if (!core.isHTMLRenderer) {
                point.x -= COLORPICKSIZE * 2;
                point.y -= COLORPICKSIZE * 2;
            } else {
                point.y -= COLORPICKSIZE / 2;
            }
            priv.handle.y = point.y > htmlElement.offsetHeight - 5 ? htmlElement.offsetHeight - 5 : point.y < -5 ? -5 : point.y;
            priv.handleObj
                ? priv.handleObj.style.transform = `translate(-50%,${priv.handle.y}${core.types.CSSUNITS.PX})` : 1;
            priv.colorQuad instanceof core.classes.ColorQuad ? priv.colorQuad.hue = priv.color.hue : 1;
            !this.updating ? this.onChange.invoke() : 1;
        }
        //#endregion update
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const pt = new Point(priv.handle.x, priv.handle.y);
            let changeHandle = !1;
            let offset = 1;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const COLORPICKSIZE = core.types.CONSTANTS.COLORPICKSIZE;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.keyDown();
            core.keyboard.shift ? offset *= 5 : 1;
            switch (core.keyboard.keyCode) {
                case VKEYSCODES.VK_UP:
                    pt.y -= offset - COLORPICKSIZE / 2;
                    pt.y = Math.max(pt.y, 0);
                    changeHandle = !0;
                    break;
                case VKEYSCODES.VK_DOWN:
                    pt.y += offset + COLORPICKSIZE / 2;
                    pt.y = Math.min(pt.y, htmlElement.offsetHeight);
                    changeHandle = !0;
                    break;
            }
            changeHandle ? this.update(pt) : 1;
        }
        //#endregion keyDown
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector('.ColorPickerIndicator')) {
                priv.handleObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
                priv.handleObj.classList.add('Control', 'ColorPickerIndicator');
                priv.handleObj.jsObj = this;
                htmlElement.appendChild(priv.handleObj);
            }
            super.loaded();
            priv.colorQuad instanceof core.classes.ColorQuad ? priv.colorQuad.hue = priv.color.hue : 1;
        }
        //#endregion loaded
        //#endregion Methods
    }
    return ColorPicker;
    //#endregion ColorPicker
})();
core.classes.register(core.types.CATEGORIES.COLOR, ColorPicker);
//#endregion ColorPicker
//#region Templates
if (core.isHTMLRenderer) {
    const ColorPickerTpl = ['<jagui-colorpicker id="{internalId}" data-class="ColorPicker" class="Control ColorPicker">',
        '<properties>{ "name": "{name}" }</properties></jagui-colorpicker>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ColorPicker, template: ColorPickerTpl }]);
}
//#endregion
export { ColorPicker };