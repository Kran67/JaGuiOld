//#region Imports
import { Control } from '/scripts/components/control.js';
import { Point } from '/scripts/core/geometry.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Imports
//#region Class ColorPicker
class ColorPicker extends Control {
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
            core.private(this, {
                handle: new Point((props.width / 2) - 5, -5),
                handleObj: null,
                color: props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.RED,
                colorQuad: props.hasOwnProperty('colorQuad') ? this.form[props.colorQuad] : null
            });
            this.createEventsAndBind(['onChange'], props);
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region color
    get color() {
        return core.private(this).color;
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const COLORPICKSIZE = core.types.CONSTANTS.COLORPICKSIZE;
        //#endregion Variables déclaration
        if (newValue instanceof Color && !priv.color.equals(newValue)) {
            priv.color.assign(newValue);
            let pos = int(priv.color.hue * htmlElement.offsetHeight / 360);
            pos -= COLORPICKSIZE / 2;
            priv.handle.y = (pos > htmlElement.offsetHeight - 5
                ? htmlElement.offsetHeight - 5 : (pos < -5) ? -5 : pos);
            this.update(new core.classes.Point(priv.handle.x, priv.handle.y));
        }
    }
    //#endregion color
    //#region colorQuad
    get colorQuad() {
        return core.private(this).colorQuad;
    }
    set colorQuad(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.ColorQuad && priv.colorQuad !== newValue) {
            priv.colorQuad = newValue;
            newValue.color.assign(priv.color);
        }
    }
    //#endregion colorQuad
    //#endregion Getters / Setters
    //#region Methods
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.mouseDown();
        priv.color.hue = int((core.mouse.target.y * 360) / htmlElement.offsetHeight);
        core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed
            && this.update(core.mouse.target);
    }
    //#endregion mouseDown
    //#region mouseMove
    mouseMove() {
        //#region Variables déclaration
        const priv = core.private(this);
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
            priv.color.hue = int((point.y * 360) / htmlElement.offsetHeight);
            this.update(point);
        }
    }
    //#endregion mouseMove
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.handle.destroy();
        priv.color.destroy();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region update
    update(point) {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const COLORPICKSIZE = int(core.types.CONSTANTS.COLORPICKSIZE / 2);
        //#endregion Variables déclaration
        if (!point) {
            point = new Point;
            point.x = 0;
            point.y = -COLORPICKSIZE;
        }
        //priv.color.hue = int((point.y * 360) / htmlElement.offsetHeight);
        if (!core.isHTMLRenderer) {
            point.x -= COLORPICKSIZE * 2;
            point.y -= COLORPICKSIZE * 2;
        } else {
            //point.y -= COLORPICKSIZE;
        }
        console.log(point.y);
        priv.handle.y = point.y > htmlElement.offsetHeight - COLORPICKSIZE
            ? htmlElement.offsetHeight - COLORPICKSIZE
            : point.y < -COLORPICKSIZE ? -COLORPICKSIZE : point.y;
        priv.handleObj
            && (priv.handleObj.style.transform = `translate(-50%,${priv.handle.y}${core.types.CSSUNITS.PX})`);
        priv.colorQuad instanceof core.classes.ColorQuad && !this.updating && (priv.colorQuad.hue = priv.color.hue);
        !this.updating && this.onChange.invoke();
    }
    //#endregion update
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        const pt = new Point(priv.handle.x, priv.handle.y);
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
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('.ColorPickerIndicator')) {
            priv.handleObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
            priv.handleObj.classList.add('Control', 'ColorPickerIndicator');
            priv.handleObj.jsObj = this;
            htmlElement.appendChild(priv.handleObj);
        }
        super.loaded();
        priv.colorQuad instanceof core.classes.ColorQuad && (priv.colorQuad.hue = priv.color.hue);
    }
    //#endregion loaded
    //#endregion Methods
}
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