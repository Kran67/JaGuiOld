//#region Imports
import { GraphicControl } from '/scripts/core/graphiccontrol.js';
import { Tools } from '/scripts/core/tools.js';
import { Color } from '/scripts/core/color.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion Imports
//#region ColorQuad
const ColorQuad = (() => {
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
    //#region ColorQuad
    class ColorQuad extends GraphicControl {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.handleObj = null;
                priv.handle = new Point;
                this.autoCapture = !0;
                priv.colorBox = props.hasOwnProperty('colorBox') ? this.form[props.colorBox] : null;
                this.createEventsAndBind(['onChange'], props);
                priv.color = props.hasOwnProperty('color') ? Color.parse(props.color) : new Color(this.fillColor);
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'format',
                    enum: Types.COLORFORMATS,
                    variable: priv,
                    value: props.hasOwnProperty('format') ? props.format : Types.COLORFORMATS.HSL
                });
                this.hitTest.all = !0;
                this.clipChilds = !1;
                priv.gradientEdit = props.hasOwnProperty('gradientEdit') ? this.form[props.gradientEdit] : null;
                this.canFocused = !0;
                delete this.tabOrder;
                this.allowUpdateOnResize = !0;
                this.autoCapture = !0;
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
            if (newValue instanceof Core.classes.ColorBox) {
                if (priv.colorBox !== newValue) {
                    priv.colorBox = newValue;
                    //if (priv.colorBox instanceof Core.classes.ColorBox) {
                    //    if (priv.colorBox.fillColor) {
                    //        priv.colorBox.fillColor.assign(priv.color);
                    //    }
                    //}
                }
            }
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
            if (newValue instanceof Core.classes.Color) {
                if (!priv.color.equals(newValue)) {
                    priv.color.assign(newValue);
                    this.fillColor.assign(newValue);
                    this.update();
                }
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
            if (Tools.isNumber(newValue)) {
                newValue = Math.min(Math.max(newValue, 0), 359);
                if (this.fillColor.hue !== newValue) {
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
            if (Tools.valueInSet(newValue, Types.COLORFORMATS)) {
                if (newValue !== priv.format) {
                    priv.format = newValue;
                    if (Core.isHTMLRenderer) {
                        if (this.HTMLElement) {
                            //this.HTMLElement.dataset.format = this.format;
                            this.update();
                        }
                    } else {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    }
                }
            }
        }
        //#endregion format
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            if (this.HTMLElement.offsetWidth !== newValue) {
                super.width = newValue;
                //if (!Core.isHTMLRenderer) {
                //    destroy(this.colorBitmap);
                //    this.colorBitmap = null;
                //}
            }
        }
        //#endregion width
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            if (this.HTMLElement.offsetHeight !== newValue) {
                super.height = newValue;
                //if (!Core.isHTMLRenderer) {
                //    destroy(this.colorBitmap);
                //    this.colorBitmap = null;
                //}
            }
        }
        //#endregion height
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update(point) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const COLORPICKSIZE = Types.CONSTANTS.COLORPICKSIZE;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (!point) {
                point = new Point;
                let value;
                if (priv.format === Types.COLORFORMATS.HSV) {
                    value = priv.color.value;
                } else {
                    value = priv.color.lightness;
                }
                point.x = ~~(priv.color.saturation * htmlElement.offsetWidth / 100);
                point.y = ~~(htmlElement.offsetHeight - value * htmlElement.offsetHeight / 100);
            }
            priv.handle.x = Math.max(Math.min(point.x, htmlElement.offsetWidth), 0);
            priv.handle.y = Math.max(Math.min(point.y, htmlElement.offsetHeight), 0);
            if (priv.handleObj) {
                priv.handleObj.style.transform = `translate(${(priv.handle.x - COLORPICKSIZE / 2)}${PX},${(priv.handle.y - COLORPICKSIZE / 2)}${PX})`;
            }
            this._update();
        }
        //#endregion update
        //#region mouseDown
        mouseDown() {
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                this.update(Core.mouse.target);
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const point = new Core.classes.Point;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.mouseMove();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                if (Core.mouse.event.target !== htmlElement) {
                    point.assign(Core.mouse.window);
                    const bounds = htmlElement.getBoundingClientRect();
                    point.x -= bounds.left;
                    point.y -= bounds.top;
                } else {
                    point.assign(Core.mouse.target);
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
                priv.handleObj = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
                priv.handleObj.classList.add('Control', 'ColorQuadIndicator');
                priv.handleObj.jsObj = this;
                htmlElement.appendChild(priv.handleObj);
            }
            Object.keys(Types.COLORFORMATS).forEach(format => {
                htmlElement.classList.remove(format);
            });
            htmlElement.classList.add(priv.format);
            super.loaded();
            if (priv.colorBox instanceof Core.classes.ColorBox) {
                priv.colorBox.color = priv.color;
            }
        }
        //#region loaded
        //#region _update
        _update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const COLORFORMATS = Types.COLORFORMATS;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (htmlElement) {
                    this.fillColor.hue = priv.color.hue;
                    this.fillColor.saturation = 100;
                    this.fillColor.value = 100;
                    this.fillColor.lightness = 50;
                    if (priv.format === COLORFORMATS.HSV) {
                        this.fillColor.HSVtoRGB();
                    } else {
                        this.fillColor.HSLtoRGB();
                    }
                    this.HTMLElementStyle.backgroundColor = this.fillColor.toRGBAString();
                    const value = 100 - ~~(priv.handle.y * 100 / htmlElement.offsetHeight);
                    const saturation = ~~(priv.handle.x * 100 / htmlElement.offsetWidth);
                    if (priv.format === COLORFORMATS.HSV) {
                        this.color.setHSV(this.fillColor.hue, saturation, value);
                    } else {
                        priv.color.setHSL(this.fillColor.hue, saturation, value);
                    }
                    if (!this.updating) {
                        if (priv.colorBox instanceof Core.classes.ColorBox) {
                            priv.colorBox.color = priv.color;
                        }
                        //if (priv.gradientEdit instanceof Core.classes.GradientEdit) {
                        //    priv.gradientEdit.changeCurrentPointColor(priv.color);
                        //}
                        this.onChange.invoke();
                    }
                }
            }
        }
        //#endregion _update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.handleObj = null;
            priv.handle.destroy();
            priv.handle = null;
            this.autoCapture = null;
            priv.colorBox = null;
            this.onChange.destroy();
            this.onChange = null;
            priv.color.destroy();
            priv.color = null;
            priv.format = null;
            this.clipChilds = null;
            priv.gradientEdit = null;
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
            if (Core.keyboard.shift) {
                offset *= 5;
            }
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                    pt.x -= offset;
                    if (pt.x < 0) {
                        pt.x = 0;
                    }
                    changeHandle = !0;
                    break;
                case VKEYSCODES.VK_UP:
                    pt.y -= offset;
                    if (pt.y < 0) {
                        pt.y = 0;
                    }
                    changeHandle = !0;
                    break;
                case VKEYSCODES.VK_RIGHT:
                    pt.x += offset;
                    if (pt.x > htmlElement.offsetWidth) {
                        pt.x = htmlElement.offsetWidth;
                    }
                    changeHandle = !0;
                    break;
                case VKEYSCODES.VK_DOWN:
                    pt.y += offset;
                    if (pt.y > htmlElement.offsetHeight) {
                        pt.y = htmlElement.offsetHeight;
                    }
                    changeHandle = !0;
                    break;
            }
            if (changeHandle) {
                this.update(pt);
            }
        }
        //#endregion keyDown
        //#endregion Methods
    }
    return ColorQuad;
    //#endregion ColorQuad
})();
//#endregion ColorQuad
Core.classes.register(Types.CATEGORIES.EXTENDED, ColorQuad);
export { ColorQuad };
//#region Templates
if (Core.isHTMLRenderer) {
    const ColorQuadTpl = ['<jagui-colorquad id="{internalId}" data-class="ColorQuad" class="Control ColorQuad">',
        '<properties>{ "name": "{name}", }</properties></jagui-colorquad>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ColorQuad, template: ColorQuadTpl }]);
}
//#endregion