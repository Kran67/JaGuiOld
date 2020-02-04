//#region Imports
import { GraphicControl } from "/scripts/core/graphiccontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Point } from "/scripts/core/geometry.js";
import { NotifyEvent } from "/scripts/core/events.js";
import { Color, Colors } from "/scripts/core/color.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Keyboard } from "/scripts/core/keyboard.js";
//#endregion Imports
//#region ColorPicker
const ColorPicker = (() => {
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
    //#region Class ColorPicker
    class ColorPicker extends GraphicControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.handle = new Point((props.width / 2) - 5, -5);
                priv.handleObj = null;
                this.onChange = new NotifyEvent(this);
                priv.color = props.hasOwnProperty("color")?Color.parse(props.color):new Color(Colors.RED);
                this.autoCapture = true;
                this.hitTest.all = true;
                priv.colorQuad = props.hasOwnProperty("colorQuad")?this.form[props.colorQuad]:null;
                this.clipChilds = false;
                this.canFocused = true;
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
            const COLORPICKSIZE = Types.CONSTANTS.COLORPICKSIZE;
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (!priv.color.equals(newValue)) {
                    priv.color.assign(newValue);
                    let pos = ~~(priv.color.hue * htmlElement.offsetHeight / 360);
                    pos -= COLORPICKSIZE / 2;
                    priv.handle.y = (pos > htmlElement.offsetHeight - 5 ? htmlElement.offsetHeight - 5 : (pos < -5) ? -5 : pos);
                    this._update();
                }
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
            if (newValue instanceof Core.classes.ColorQuad) {
                if (priv.colorQuad !== newValue) {
                    priv.colorQuad = newValue;
                    if (priv.colorQuad instanceof Core.classes.ColorQuad) {
                        priv.colorQuad.color.assign(priv.color);
                    }
                }
            }
        }
        //#endregion colorQuad
        //#endregion Getters / Setters
        //#region Methods
        //#region mouseDown
        mouseDown() {
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                if (this.HTMLElement.offsetHeight !== 0) {
                    this.update(this.documentToClient());
                }
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            super.mouseMove();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                if (this.HTMLElement.offsetHeight !== 0) {
                    this.update(this.documentToClient());
                }
            }
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            super.mouseUp();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                if (this.HTMLElement.offsetHeight !== 0) {
                    this.update(this.documentToClient());
                }
            }
        }
        //#endregion mouseUp
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.handle.destroy();
            priv.handle = null;
            priv.handleObj = null;
            this.onChange.destroy();
            this.onChange = null;
            priv.color.destroy();
            priv.color = null;
            this.autoCapture = null;
            priv.colorQuad = null;
            this.clipChilds = null;
        }
        //#endregion destroy
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                priv.handleObj = htmlElement.querySelector(".ColorPickerIndicator");
                priv.handleObj.jsObj = this;
            }
        }
        //#endregion getHTMLElement
        //#region update
        update(point) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const COLORPICKSIZE = Types.CONSTANTS.COLORPICKSIZE;
            //#endregion Variables déclaration
            super.update();
            if (!point) {
                point = new Point;
                point.x = 0;
                point.y = 0;
            }
            priv.color.hue = ~~((point.y * 360) / htmlElement.offsetHeight);
            if (!Core.isHTMLRenderer) {
                point.x -= COLORPICKSIZE * 2;
                point.y -= COLORPICKSIZE * 2;
            } else {
                point.y -= COLORPICKSIZE / 2;
            }
            priv.handle.y = (point.y > htmlElement.offsetHeight - 5 ? htmlElement.offsetHeight - 5 : (point.y < -5) ? -5 : point.y);
            if (priv.handleObj) {
                if (priv.handleObj) {
                    priv.handleObj.style.transform = `translate(-50%,${priv.handle.y}${Types.CSSUNITS.PX})`;
                }
                if (!this.updating) {
                    if (priv.colorQuad instanceof Core.classes.ColorQuad) {
                        priv.colorQuad.hue = priv.color.hue;
                    }
                }
            }
            if (!this.updating) {
                this.onChange.invoke();
            }
        }
        //#endregion update
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const pt = new Point(priv.handle.x, priv.handle.y);
            let changeHandle = false;
            let offset = 1;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const COLORPICKSIZE = Types.CONSTANTS.COLORPICKSIZE;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.keyDown();
            if (Core.keyboard.shift) {
                offset *= 5;
            }
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_UP:
                    pt.y -= offset - COLORPICKSIZE / 2;
                    if (pt.y < 0) pt.y = 0;
                    changeHandle = true;
                    break;
                case VKEYSCODES.VK_DOWN:
                    pt.y += offset + COLORPICKSIZE / 2;
                    if (pt.y > htmlElement.offsetHeight) {
                        pt.y = htmlElement.offsetHeight;
                    }
                    changeHandle = true;
                    break;
            }
            if (changeHandle) {
                this.update(pt);
            }
        }
        //#endregion keyDown
        //#endregion Methods
    }
    return ColorPicker;
    //#endregion ColorPicker
})();
//#endregion ColorPicker
Core.classes.register(Types.CATEGORIES.COLOR, ColorPicker);
export { ColorPicker };

/*
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ColorPickerTpl = "<div id='{internalId}' data-name='{name}' data-class='ColorPicker' class='Control ColorPicker' data-color='{color}' style='width:50px;height:140px;'>\
                        <div class='Control ColorPickerIndicator'></div>\
                        </div>";
        $j.classes.registerTemplates([{ Class: ColorPicker, template: ColorPickerTpl }]);
    }
    //endregion
})();*/