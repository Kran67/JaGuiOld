//#region Imports
import { Control } from '/scripts/components/control.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Imports
//#region ColorQuad
const ColorQuad = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region ColorQuad
    class ColorQuad extends Control {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.autoCapture = !0;
                props.mouseEvents = { mousemove: !0 };
                props.clipChilds = !1;
                props.canFocused = !0;
                props.allowUpdateOnResize = !0;
                props.autoCapture = !0;
                super(owner, props);
                const priv = internal(this);
                priv.handleObj = null;
                priv.handle = new Point;
                priv.colorBox = props.hasOwnProperty('colorBox') ? this.form[props.colorBox] : null;
                priv.color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.BLUE;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'format',
                    enum: core.types.COLORFORMATS,
                    variable: priv,
                    value: props.hasOwnProperty('format') ? props.format : core.types.COLORFORMATS.HSL
                });
                priv.gradientEdit = props.hasOwnProperty('gradientEdit') ? this.form[props.gradientEdit] : null;
                this.createEventsAndBind(['onChange'], props);
                delete this.tabOrder;
                priv.props = props;
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region colorBox
        get colorBox() {
            return internal(this).colorBox;
        }
        set colorBox(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.classes.ColorBox && priv.colorBox !== newValue && (priv.colorBox = newValue);
        }
        //#endregion colorBox
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof core.classes.Color && !priv.color.equals(newValue)) {
                priv.color.assign(newValue);
                this.update();
            }
        }
        //#endregion color
        //#region hue
        get hue() {
            return internal(this).hue;
        }
        set hue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue)) {
                newValue = Math.min(Math.max(newValue, 0), 359);
                if (priv.color.hue !== newValue) {
                    priv.color.hue = newValue;
                    this.update();
                }
            }
        }
        //#endregion hue
        //#region format
        get format() {
            return internal(this).format;
        }
        set format(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.COLORFORMATS) && newValue !== priv.format) {
                priv.format = newValue;
                if (!core.isHTMLRenderer) {
                    this.redraw();
                }
                this.HTMLElement && this.update();
            }
        }
        //#endregion format
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            this.HTMLElement.offsetWidth !== newValue && (super.width = newValue);
        }
        //#endregion width
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            this.HTMLElement.offsetHeight !== newValue && (super.height = newValue);
        }
        //#endregion height
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update(point) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const COLORPICKSIZE = core.types.CONSTANTS.COLORPICKSIZE;
            const PX = core.types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (!point) {
                point = new Point;
                let value;
                value = priv.format === core.types.COLORFORMATS.HSV
                    ? priv.color.value : priv.color.lightness;
                point.x = int(priv.color.saturation * htmlElement.offsetWidth / 100);
                point.y = int(htmlElement.offsetHeight - value * htmlElement.offsetHeight / 100);
            }
            priv.handle.x = Math.max(Math.min(point.x, htmlElement.offsetWidth), 0);
            priv.handle.y = Math.max(Math.min(point.y, htmlElement.offsetHeight), 0);
            priv.handleObj
                && (priv.handleObj.style.transform = `translate(${(priv.handle.x - COLORPICKSIZE / 2)}${PX},${(priv.handle.y - COLORPICKSIZE / 2)}${PX})`);
            this._update();
        }
        //#endregion update
        //#region mouseDown
        mouseDown() {
            super.mouseDown();
            core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed && this.update(core.mouse.target);
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
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector('.ColorQuadIndicator')) {
                priv.handleObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
                priv.handleObj.classList.add('Control', 'ColorQuadIndicator');
                priv.handleObj.jsObj = this;
                htmlElement.appendChild(priv.handleObj);
            }
            Object.keys(core.types.COLORFORMATS).forEach(format => {
                htmlElement.classList.remove(format);
            });
            htmlElement.classList.add(priv.format);
            super.loaded();
            priv.props.hasOwnProperty('colorBox') && !priv.colorBox
                && (priv.colorBox = this.form[priv.props.colorBox]);
            priv.props.hasOwnProperty('gradientEdit') && !priv.gradientEdit
                && (priv.gradientEdit = this.form[priv.props.gradientEdit]);
            priv.colorBox instanceof core.classes.ColorBox && (priv.colorBox.color = priv.color);
            //priv.gradientEdit instanceof core.classes.GradientEdit && (priv.gradientEdit.color = priv.color);
            delete priv.props;
        }
        //#region loaded
        //#region _update
        _update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const COLORFORMATS = core.types.COLORFORMATS;
            const color = Colors.BLACK;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading && htmlElement) {
                color.hue = priv.color.hue;
                color.saturation = 100;
                color.value = 100;
                color.lightness = 50;
                priv.format === COLORFORMATS.HSV ? color.HSVtoRGB() : color.HSLtoRGB();
                this.HTMLElementStyle.backgroundColor = color.toRGBAString();
                const value = 100 - int(priv.handle.y * 100 / htmlElement.offsetHeight);
                const saturation = int(priv.handle.x * 100 / htmlElement.offsetWidth);
                priv.format === COLORFORMATS.HSV
                    ? priv.color.setHSV(color.hue, saturation, value)
                    : priv.color.setHSL(color.hue, saturation, value);
                if (!this.updating) {
                    priv.colorBox instanceof core.classes.ColorBox && (priv.colorBox.color = priv.color);
                    //priv.gradientEdit instanceof core.classes.GradientEdit
                    //    && (priv.gradientEdit.changeCurrentPointColor(priv.color));
                    this.onChange.invoke();
                }
            }
        }
        //#endregion _update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.handleObj = null;
            priv.handle.destroy();
            priv.handle = null;
            priv.colorBox = null;
            this.unBindAndDestroyEvents(['onChange']);
            priv.color.destroy();
            priv.color = null;
            priv.format = null;
            priv.gradientEdit = null;
            super.destroy();
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const pt = new Point(priv.handle.x, priv.handle.y);
            let changeHandle = !1;
            let offset = 1;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            super.keyDown();
            core.keyboard.shift && (offset *= 5);
            switch (core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                    pt.x -= offset;
                    pt.x = Math.max(pt.x, 0);
                    changeHandle = !0;
                    break;
                case VKEYSCODES.VK_UP:
                    pt.y -= offset;
                    pt.y = Math.max(pt.y, 0);
                    changeHandle = !0;
                    break;
                case VKEYSCODES.VK_RIGHT:
                    pt.x += offset;
                    pt.x = Math.min(pt.x, htmlElement.offsetWidth);
                    changeHandle = !0;
                    break;
                case VKEYSCODES.VK_DOWN:
                    pt.y += offset;
                    pt.y = Math.min(pt.y, htmlElement.offsetHeight);
                    changeHandle = !0;
                    break;
            }
            changeHandle && this.update(pt);
        }
        //#endregion keyDown
        //#endregion Methods
    }
    return ColorQuad;
    //#endregion ColorQuad
})();
core.classes.register(core.types.CATEGORIES.EXTENDED, ColorQuad);
//#endregion ColorQuad
//#region Templates
if (core.isHTMLRenderer) {
    const ColorQuadTpl = ['<jagui-colorquad id="{internalId}" data-class="ColorQuad" class="Control ColorQuad">',
        '<properties>{ "name": "{name}", }</properties></jagui-colorquad>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ColorQuad, template: ColorQuadTpl }]);
}
//#endregion
export { ColorQuad };