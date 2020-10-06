//#region Imports
import { Control } from '/scripts/components/control.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Imports
//#region ColorQuad
class ColorQuad extends Control {
    //#region Private fields
    #handleObj = null;
    #handle;
    #colorBox;
    #color;
    #gradientEdit;
    #preserveColorAlpha;
    #hue;
    #format;
    //#endregion Private fields
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
            this.#handle = new Point;
            this.#colorBox = props.hasOwnProperty('colorBox') ? this.form[props.colorBox] : null;
            this.#color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.BLUE;
            this.#gradientEdit = props.hasOwnProperty('gradientEdit') ? this.form[props.gradientEdit] : null;
            this.#preserveColorAlpha = props.hasOwnProperty('preserveColorAlpha')
                && core.tools.isBool(props.preserveColorAlpha)
                ? props.preserveColorAlpha : !1;
            this.addPropertyEnum('format', core.types.COLORFORMATS);
            this.#format = props.hasOwnProperty('format') ? props.format : core.types.COLORFORMATS.HSL;
            this.createEventsAndBind(['onChange'], props);
            delete this.tabOrder;
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region colorBox
    get colorBox() {
        return this.#colorBox;
    }
    set colorBox(newValue) {
        newValue instanceof core.classes.ColorBox && this.#colorBox !== newValue
            && (this.#colorBox = newValue);
    }
    //#endregion colorBox
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        if (newValue instanceof core.classes.Color && !this.#color.equals(newValue)) {
            this.#color.assign(newValue);
            //this.fillColor.assign(newValue);
            this.moveIndicator();
        }
    }
    //#endregion color
    //#region hue
    get hue() {
        return this.#hue;
    }
    set hue(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.min(Math.max(newValue, 0), 359);
            //if (this.fillColor.hue !== newValue) {
            if (this.#color.hue !== newValue) {
                this.#color.hue = newValue;
                this.update();
            }
        }
    }
    //#endregion hue
    //#region format
    get format() {
        return this.#format;
    }
    set format(newValue) {
        //#region Variables déclaration
        let value;
        const point = new Point;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.COLORFORMATS) && newValue !== this.#format) {
            this.#format = newValue;
            !core.isHTMLRenderer && this.redraw();
            if (this.HTMLElement) {
                value = this.#format === core.types.COLORFORMATS.HSV
                    ? this.#color.value : this.#color.lightness;
                point.x = int(this.#color.saturation * htmlElement.offsetWidth / 100);
                point.y = int(htmlElement.offsetHeight - value * htmlElement.offsetHeight / 100);
                this.update(point);
            }
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
    //#region preserveColorAlpha
    get preserveColorAlpha() {
        return this.#preserveColorAlpha;
    }
    set preserveColorAlpha(newValue) {
        core.tools.isBool(newValue) && this.#preserveColorAlpha !== newValue
            && (this.#preserveColorAlpha = newValue);
    }
    //#endregion preserveColorAlpha
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update(point) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const COLORPICKSIZE = core.types.CONSTANTS.COLORPICKSIZE;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        //if (!point) {
        //    point = new Point;
        //    let value;
        //    value = this.#format === core.types.COLORFORMATS.HSV
        //        ? this.#color.value : this.#color.lightness;
        //    point.x = int(this.#color.saturation * htmlElement.offsetWidth / 100);
        //    point.y = int(htmlElement.offsetHeight - value * htmlElement.offsetHeight / 100);
        //}
        if (point) {
            this.#handle.x = Math.max(Math.min(point.x, htmlElement.offsetWidth), 0);
            this.#handle.y = Math.max(Math.min(point.y, htmlElement.offsetHeight), 0);
            this.#handleObj
                && (this.#handleObj.style.transform = `translate(${(this.#handle.x - (COLORPICKSIZE / 2))}${PX},${(this.#handle.y - (COLORPICKSIZE / 2))}${PX})`);
        }
        this._update();
    }
    //#endregion update
    //#region moveIndicator
    moveIndicator() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const point = new Point;
        let value;
        //#endregion Variables déclaration
        value = this.#format === core.types.COLORFORMATS.HSV
            ? this.#color.value : this.#color.lightness;
        point.x = int(this.#color.saturation * htmlElement.offsetWidth / 100);
        point.y = int(htmlElement.offsetHeight - value * htmlElement.offsetHeight / 100);
        this.update(point);
    }
    //#endregion moveIndicator
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
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('.ColorQuadIndicator')) {
            this.#handleObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
            this.#handleObj.classList.add('ColorQuadIndicator');
            htmlElement.appendChild(this.#handleObj);
        }
        //Object.keys(core.types.COLORFORMATS).forEach(format => {
        //    htmlElement.classList.remove(format);
        //});
        //htmlElement.classList.add(this.#format);
        super.loaded();
        this.props.hasOwnProperty('colorBox') && !this.#colorBox
            && (this.#colorBox = this.form[this.props.colorBox]);
        this.props.hasOwnProperty('gradientEdit') && !this.#gradientEdit
            && (this.#gradientEdit = this.form[this.props.gradientEdit]);
        if (this.#colorBox instanceof core.classes.ColorBox) {
            let oldAlpha;
            this.#preserveColorAlpha && (oldAlpha = this.#colorBox.color.alpha);
            this.#colorBox.color.assign(this.#color);
            this.#preserveColorAlpha && (this.#colorBox.color.alpha = oldAlpha);
        }
        //this.#gradientEdit instanceof core.classes.GradientEdit && (this.#gradientEdit.color = this.#color);
        this.moveIndicator();
    };
    //#region loaded
    //#region _update
    _update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const COLORFORMATS = core.types.COLORFORMATS;
        const color = Colors.BLACK;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading && htmlElement) {
            //this.#color.hue = this.#color.hue;
            this.#color.saturation = 100;
            this.#color.value = 100;
            this.#color.lightness = 50;
            this.#format === COLORFORMATS.HSV ? this.#color.HSVtoRGB() : this.#color.HSLtoRGB();
            this.HTMLElementStyle.backgroundColor = this.#color.toRGBAString();
            const value = 100 - (this.#handle.y * 100 / htmlElement.offsetHeight) | 0;
            const saturation = (this.#handle.x * 100 / htmlElement.offsetWidth) | 0;
            this.#format === COLORFORMATS.HSV
                ? this.#color.setHSV(this.#color.hue, saturation, value)
                : this.#color.setHSL(this.#color.hue, saturation, value);
            if (!this.updating) {
                if (this.#colorBox instanceof core.classes.ColorBox) {
                    let oldAlpha;
                    this.#preserveColorAlpha && (oldAlpha = this.#colorBox.color.alpha);
                    this.#colorBox.color.assign(this.#color);
                    this.#preserveColorAlpha && (this.#colorBox.color.alpha = oldAlpha);
                }
                //this.#gradientEdit instanceof core.classes.GradientEdit
                //    && (this.#gradientEdit.changeCurrentPointColor(this.#color));
                this.propertyChanged('color');
                this.onChange.invoke();
            }
            Object.keys(COLORFORMATS).forEach(format => {
                htmlElement.classList.remove(format.toLowerCase());
            });
            htmlElement.classList.add(this.#format);
        }
    }
    //#endregion _update
    //#region destroy
    destroy() {
        this.#handle.destroy();
        this.#color.destroy();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const pt = new Point(this.#handle.x, this.#handle.y);
        let changeHandle = !1;
        let offset = 1;
        const VKEYSCODES = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyDown();
        core.keyboard.shift && (offset *= 5);
        switch (core.keyboard.key) {
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
Object.defineProperties(ColorQuad.prototype, {
    'colorBox': {
        enumerable: !0
    },
    'color': {
        enumerable: !0
    },
    'gradientEdit': {
        enumerable: !0
    },
    'preserveColorAlpha': {
        enumerable: !0
    }
});
Object.seal(ColorQuad);
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