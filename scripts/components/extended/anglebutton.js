//#region Import
import { Button } from "/scripts/components/common/button.js";
import { NotifyEvent } from "/scripts/core/events.js";
import { Vector } from "/scripts/core/geometry.js";
import { Keyboard } from "/scripts/core/keyboard.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region AngleButton
const AngleButton = (() => {
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
    //#region Class AngleButton
    class AngleButton extends Button {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.internalValue = 0;
                priv.knob = null;
                priv.saveValue = 0;
                priv.textObj = null;
                if (!Core.isHTMLRenderer) {
                    this.width = 30;
                    this.height = 30;
                }
                priv.frequency = props.hasOwnProperty("frequency")?props.frequency:1;
                priv.tracking = props.hasOwnProperty("tracking")?props.tracking:true;
                priv.value = props.hasOwnProperty("value")?props.value:0;
                priv.showValue = props.hasOwnProperty("showValue")?props.showValue:true;
                this.autoCapture = true;
                this.caption = String.EMPTY;
                this.canFocused = true;
                this.onChanged = new NotifyEvent(this);
                const self = this;
                priv.setInternalValue = function(newValue) {
                    if (Tools.isNumber(newValue)) {
                        const priv = this;
                        if (priv.internalValue !== newValue) {
                            if (priv.frequency === 0) {
                                priv.internalValue = newValue;
                            } else {
                                const nv = Math.round(newValue / priv.frequency) * priv.frequency;
                                if (priv.internalValue !== nv) {
                                    priv.internalValue = nv;
                                }
                            }
                            if (priv.internalValue > 0) {
                                priv.value = Math.round(360 - priv.internalValue, 0);
                            } else {
                                priv.value = 360 - Math.round(360 + priv.internalValue, 0);
                            }
                            if (!Core.isHTMLRenderer) {
                                if (self.allowUpdate) {
                                    self.update();
                                }
                                self.redraw();
                            } else {
                                self.update();
                            }
                            self.onChanged.invoke();
                        }
                    }
                };
            }
        }
        //#endregion Constructor
        //#region Setters
        //#region frequency
        get frequency() {
            return internal(this).frequency;
        }
        set frequency(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.frequency !== newValue) {
                    priv.frequency = newValue;
                }
            }
        }
        //#endregion frequency
        //#region tracking
        get tracking() {
            return internal(this).tracking;
        }
        set tracking(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.tracking !== newValue) {
                    priv.tracking = newValue;
                }
            }
        }
        //#endregion tracking
        //#region value
        get value() {
            return internal(this).value;
        }
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue >= 360) {
                    newValue = 0;
                } else if (newValue < 0) {
                    newValue = 0;
                }
                if (priv.value !== newValue) {
                    priv.value = 360 - newValue;
                    priv.setInternalValue(priv.value);
                }
            }
        }
        //#endregion value
        //#region showValue
        get showValue() {
            return internal(this).showValue;
        }
        set showValue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const cssValues = Types.CSSVALUES;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showValue !== newValue) {
                    priv.showValue = newValue;
                    if (priv.showValue) {
                        priv.textObj.style.visibility = cssValues.NORMAL;
                    } else {
                        priv.textObj.style.visibility = cssValues.HIDDEN;
                    }
                    //this._textObj
                    //if (!$j.isHTMLRenderer()) {
                    //  if (this._allowUpdate) this.update();
                    //  this.redraw();
                    //} else this.update();
                }
            }
        }
        //#endregion showValue
        //#endregion
        //#region Methods
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                priv.saveValue = priv.internalValue;
                this.valueFromPoint(this.documentToClient());
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            super.mouseMove();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                this.valueFromPoint(this.documentToClient());
            }
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            super.mouseUp();
            if (this.isPressed) {
                this.valueFromPoint(this.documentToClient());
            }
        }
        //#endregion mouseUp
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                priv.knob.style.transform = `rotate(${priv.internalValue}deg)`;
                //this._knob.style.lineHeight=this._knob.offsetHeight+$j.types.CSSUnits.PX;
                priv.textObj.innerHTML = `${priv.value}&deg;`;
                priv.textObj.style.lineHeight = `${priv.textObj.offsetHeight}${Types.CSSUNITS.PX}`;
            }
        }
        //#endregion update
        //#region valueFromPoint
        valueFromPoint(point) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const v = new Vector(point.x - htmlElement.offsetWidth / 2, point.y - htmlElement.offsetHeight / 2);
            const v1 = new Vector(1, 0, 0);
            //#endregion Variables déclaration
            priv.setInternalValue(-v1.angle(v));
        }
        //#endregion valueFromPoint
        //#region mouseWheel
        mouseWheel() {
            //#region Variables déclaration
            const priv = internal(this);
            let newVal = priv.internalValue + ~~(Core.mouse.wheelDelta * 10);
            //#endregion Variables déclaration
            if (newVal < -360) {
                newVal = 360 + newVal;
            } else if (newVal > 360) {
                newVal = 360 - newVal;
            }
            priv.setInternalValue(newVal);
        }
        //#endregion mouseWheel
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            priv.textObj = htmlElement.querySelector(".AngleButtonCaption");
            priv.textObj.jsObj = this;
            priv.knob = htmlElement.querySelector(".AngleButtonKnob");
            priv.knob.jsObj = this;
        }
        //#endregion getHTMLElement
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.internalValue = null;
            priv.knob = null;
            priv.textObj = null;
            priv.saveValue = null;
            priv.frequency = null;
            priv.tracking = null;
            priv.value = null;
            priv.showValue = null;
            //this.autoCapture = null;
            //this.caption = null;
            priv.onChanged.destroy();
            priv.onChanged = null;
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const VKeysCodes = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case VKeysCodes.VK_LEFT:
                case VKeysCodes.VK_UP:
                    priv.value += priv.frequency;
                    break;
                case VKeysCodes.VK_RIGHT:
                case VKeysCodes.VK_DOWN:
                    priv.value -= priv.frequency;
                    break;
                case VKeysCodes.VK_HOME:
                case VKeysCodes.VK_END:
                    priv.value = 0;
                    break;
                case VKeysCodes.VK_PRIOR:
                    priv.value += priv.frequency * 5;
                    break;
                case VKeysCodes.VK_NEXT:
                    priv.value -= priv.frequency * 5;
                    break;
            }
        }
        //#endregion keyDown
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#endregion loaded
        //#endregion
    }
    return AngleButton;
    //#endregion
})();
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, AngleButton);
export { AngleButton };
/*
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var AngleButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='AngleButton' class='Control AngleButton {theme}' style='width:30px;height:30px;'>\
                        <div class='Control AngleButtonCaption'>0°</div>\
                        <div class='Control AngleButtonKnob'>3</div>\
                        </button>";
        $j.classes.registerTemplates([{ Class: AngleButton, template: AngleButtonTpl }]);
    }
    //endregion
})();
*/