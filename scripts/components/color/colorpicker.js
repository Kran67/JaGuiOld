//#region Imports
import { Control } from '/scripts/components/control.js';
import { Point } from '/scripts/core/geometry.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Imports
//#region Class ColorPicker
class ColorPicker extends Control {
    //#region Private fields
    #handle;
    #handleObj = null;
    #color;
    #colorQuad;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.autoCapture = !0;
            props.mouseEvents = { mousemove: !0 };
            props.clipChilds = !1;
            props.canFocused = !0;
            props.allowUpdateOnResize = !0;
            super(owner, props);
            this.#handle = new Point((props.width / 2) - 5, -5);
            this.#color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.RED;
            this.#colorQuad = props.hasOwnProperty('colorQuad') ? this.form[props.colorQuad] : null;
            this.createEventsAndBind(['onChange'], props);
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        if (newValue instanceof Color && !this.#color.equals(newValue)) {
            this.#color.assign(newValue);
            this.moveHandleByHue();
        }
    }
    //#endregion color
    //#region colorQuad
    get colorQuad() {
        return this.#colorQuad;
    }
    set colorQuad(newValue) {
        if (newValue instanceof core.classes.ColorQuad && this.#colorQuad !== newValue) {
            this.#colorQuad = newValue;
            newValue.color.assign(this.#color);
        }
    }
    //#endregion colorQuad
    //#endregion Getters / Setters
    //#region Methods
    //#region moveHandleByHue
    moveHandleByHue() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        let pos = int(this.#color.hue * htmlElement.offsetHeight / 360);
        //#endregion Variables déclaration
        this.update(new core.classes.Point(this.#handle.x, pos));
    }
    //#endregion moveHandleByHue
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.mouseDown();
        this.#color.hue = int((core.mouse.target.y * 360) / htmlElement.offsetHeight);
        core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed
            && this.update(core.mouse.target);
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
            this.#color.hue = int((point.y * 360) / htmlElement.offsetHeight);
            this.update(point);
        }
    }
    //#endregion mouseMove
    //#region destroy
    destroy() {
        this.#handle.destroy();
        this.#color.destroy();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region update
    update(point) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const COLORPICKSIZE = int(core.types.CONSTANTS.COLORPICKSIZE / 2);
        //#endregion Variables déclaration
        if (!point) {
            this.moveHandleByHue();
        } else {
            point.y -= COLORPICKSIZE;
            this.#handle.y = point.y > htmlElement.offsetHeight - COLORPICKSIZE
                ? htmlElement.offsetHeight - COLORPICKSIZE
                : point.y < -COLORPICKSIZE ? -COLORPICKSIZE : point.y;
        }
        this.#handleObj
            && (this.#handleObj.style.transform = `translate(-50%,${this.#handle.y}${core.types.CSSUNITS.PX})`);
        this.#colorQuad instanceof core.classes.ColorQuad && !this.updating && (this.#colorQuad.hue = this.#color.hue);
        !this.updating && this.onChange.invoke();
    }
    //#endregion update
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const pt = new Point(this.#handle.x, this.#handle.y);
        let changeHandle = !1;
        let offset = 1;
        const VKEYSCODES = Keyboard.VKEYSCODES;
        const COLORPICKSIZE = core.types.CONSTANTS.COLORPICKSIZE;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.keyDown();
        core.keyboard.shift && (offset *= 5);
        switch (core.keyboard.key) {
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
        changeHandle && this.update(pt);
    }
    //#endregion keyDown
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('.ColorPickerIndicator')) {
            this.#handleObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
            this.#handleObj.classList.add('ColorPickerIndicator');
            htmlElement.appendChild(this.#handleObj);
        }
        super.loaded();
        this.moveHandleByHue();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(ColorPicker.prototype, {
    'color': {
        enumerable: !0
    },
    'colorQuad': {
        enumerable: !0
    }
});
Object.seal(ColorPicker);
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