﻿//#region Import
import { Button } from '/scripts/components/common/button.js';
import { NotifyEvent } from '/scripts/core/events.js';
import { Vector } from '/scripts/core/geometry.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
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
                priv.frequency = props.hasOwnProperty('frequency')?props.frequency:1;
                priv.tracking = props.hasOwnProperty('tracking')?props.tracking:true;
                priv.value = props.hasOwnProperty('value')?props.value:0;
                priv.showValue = props.hasOwnProperty('showValue')?props.showValue:true;
                this.autoCapture = true;
                this.caption = String.EMPTY;
                this.canFocused = true;
                this.onChanged = new NotifyEvent(this);
                const self = this;
                priv.setInternalValue = function(newValue) {
                    //#region Variables déclaration
                    const priv = this;
                    //#endregion Variables déclaration
                    if (Tools.isNumber(newValue)) {
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
                                    self.updateKnobAndText();
                                }
                                self.redraw();
                            } else {
                                self.updateKnobAndText();
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
                }
            }
        }
        //#endregion showValue
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            //#region Variables déclaration
            const currentHeight = this.height;
            const currentWidth = this.width;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (currentWidth !== newValue) {
                    if (Core.isHTMLRenderer && !this.loading) {
                        super.width = newValue;
                        if (currentHeight !== newValue) {
                            this.height = newValue;
                        }
                        this.updateKnobAndText();
                    }
                }
            }
        }
        //#endregion width
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            //#region Variables déclaration
            const currentHeight = this.height;
            const currentWidth = this.width;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (currentHeight !== newValue) {
                    if (Core.isHTMLRenderer && !this.loading) {
                        super.height = newValue;
                        if (currentWidth !== newValue) {
                            htmlElementStyle.width = newValue;
                        }
                        this.updateKnobAndText();
                    }
                }
            }
        }
        //#endregion height
        //#endregion Getters / Setters
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
            super.update();
            if (!this.loading && !this.form.loading) {
                this.updateKnobAndText();
            }
        }
        //#endregion update
        updateKnobAndText() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.knob.style.transform = `rotate(${priv.internalValue}deg)`;
            priv.textObj.innerHTML = `${priv.value}&deg;`;
            priv.textObj.style.lineHeight = `${priv.textObj.offsetHeight}${Types.CSSUNITS.PX}`;
        }
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
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector('.AngleButtonCaption')) {
                priv.textObj = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}caption`);
                priv.textObj.classList.add('Control', 'AngleButtonCaption');
                priv.textObj.jsObj = this;
                priv.knob = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}knob`);
                priv.knob.classList.add('Control', 'AngleButtonKnob');
                priv.knob.innerHTML = '3';
                priv.knob.jsObj = this;
                htmlElement.appendChild(priv.textObj);
                htmlElement.appendChild(priv.knob);
            }
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
//#region Templates
if (Core.isHTMLRenderer) {
    const AngleButtonTpl = ['<jagui-anglebutton id="{internalId}" data-class="AngleButton" class="Control Button AngleButton {theme} csr_default">',
        '<properties>{ "name": "{name}" }</properties></jagui-anglebutton>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: AngleButton, template: AngleButtonTpl }]);
}
//#endregion