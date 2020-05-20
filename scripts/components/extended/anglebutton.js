//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Vector } from '/scripts/core/geometry.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region AngleButton
const AngleButton = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                if (!core.isHTMLRenderer) {
                    props.width = 30;
                    props.height = 30;
                }
                props.autoCapture = !0;
                props.caption = String.EMPTY;
                props.canFocused = !0;
                props.mouseEvents = { mousemove: !0 };
                super(owner, props);
                const priv = internal(this);
                priv.internalValue = 0;
                priv.knob = null;
                priv.saveValue = 0;
                priv.textObj = null;
                priv.frequency = props.hasOwnProperty('frequency') ? props.frequency : 1;
                priv.tracking = props.hasOwnProperty('tracking') ? props.tracking : !0;
                priv.value = props.hasOwnProperty('value') ? props.value : 0;
                priv.showValue = props.hasOwnProperty('showValue') ? props.showValue : !0;
                const self = this;
                priv.setInternalValue = function (newValue) {
                    //#region Variables déclaration
                    const priv = this;
                    //#endregion Variables déclaration
                    if (core.tools.isNumber(newValue) && priv.internalValue !== newValue) {
                        if (priv.frequency === 0) {
                            priv.internalValue = newValue;
                        } else {
                            const nv = Math.round(newValue / priv.frequency) * priv.frequency;
                            if (priv.internalValue !== nv) {
                                priv.internalValue = nv;
                            }
                        }
                        priv.value = priv.internalValue > 0
                            ? Math.round(360 - priv.internalValue, 0)
                            : 360 - Math.round(360 + priv.internalValue, 0);
                        if (!core.isHTMLRenderer) {
                            self.allowUpdate && self.updateKnobAndText();
                            self.redraw();
                        } else {
                            self.updateKnobAndText();
                        }
                        self.onChanged.invoke();
                    }
                };
                this.createEventsAndBind(['onChanged'], props);
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region frequency
        get frequency() {
            return internal(this).frequency;
        }
        set frequency(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.frequency !== newValue && (priv.frequency = newValue);
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
            core.tools.isBool(newValue) && priv.tracking !== newValue && (priv.tracking = newValue);
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
            if (core.tools.isNumber(newValue)) {
                newValue = Math.max(Math.min(newValue, 360), 0);
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
            const cssValues = core.types.CSSVALUES;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.showValue !== newValue) {
                priv.showValue = newValue;
                priv.textObj.style.visibility = priv.showValue ? cssValues.NORMAL : cssValues.HIDDEN;
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
            if (core.tools.isNumber(newValue) && currentWidth !== newValue && core.isHTMLRenderer && !this.loading) {
                super.width = newValue;
                currentHeight !== newValue && (this.height = newValue);
                this.updateKnobAndText();
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
            if (core.tools.isNumber(newValue) && currentHeight !== newValue && core.isHTMLRenderer && !this.loading) {
                super.height = newValue;
                currentWidth !== newValue && (htmlElementStyle.width = newValue);
                this.updateKnobAndText();
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
            if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                priv.saveValue = priv.internalValue;
                this.valueFromPoint(core.mouse.target);
            }
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
                this.valueFromPoint(point);
            }
        }
        //#endregion mouseMove
        //#region update
        update() {
            super.update();
            !this.loading && !this.form.loading && this.updateKnobAndText();
        }
        //#endregion update
        //#region updateKnobAndText
        updateKnobAndText() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.knob.style.transform = `rotate(${priv.internalValue}deg)`;
            priv.textObj.innerHTML = `${priv.value}&deg;`;
            priv.textObj.style.lineHeight = `${priv.textObj.offsetHeight}${core.types.CSSUNITS.PX}`;
        }
        //#endregion updateKnobAndText
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
        //#region wheel
        wheel(event) {
            //#region Variables déclaration
            const priv = internal(this);
            let newVal = priv.internalValue + int(core.mouse.wheelDelta * 10);
            //#endregion Variables déclaration
            if (newVal < -360) {
                newVal = 360 + newVal;
            } else if (newVal > 360) {
                newVal = 360 - newVal;
            }
            priv.setInternalValue(newVal);
            core.mouse.stopAllEvent(event);
        }
        //#endregion wheel
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.internalValue = null;
            priv.knob = null;
            priv.textObj = null;
            priv.saveValue = null;
            priv.frequency = null;
            priv.tracking = null;
            priv.value = null;
            priv.showValue = null;
            priv.setInternalValue = null;
            this.unBindAndDestroyEvents(['onChanged']);
            super.destroy();
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const VKeysCodes = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            super.keyDown();
            switch (core.keyboard.keyCode) {
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
            const cssValues = core.types.CSSVALUES;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector('.AngleButtonCaption')) {
                priv.textObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}caption`);
                priv.textObj.classList.add('Control', 'AngleButtonCaption');
                priv.textObj.jsObj = this;
                priv.knob = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}knob`);
                priv.knob.classList.add('Control', 'AngleButtonKnob');
                priv.knob.innerHTML = '3';
                priv.knob.jsObj = this;
                htmlElement.appendChild(priv.textObj);
                htmlElement.appendChild(priv.knob);
                priv.textObj.style.visibility = priv.showValue ? cssValues.NORMAL : cssValues.HIDDEN;
            }
            htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
            super.loaded();
            this.update();
        }
        //#endregion loaded
        //#endregion
    }
    return AngleButton;
    //#endregion AngleButton
})();
core.classes.register(core.types.CATEGORIES.EXTENDED, AngleButton);
//#endregion AngleButton
//#region Templates
if (core.isHTMLRenderer) {
    const AngleButtonTpl = ['<jagui-anglebutton id="{internalId}" data-class="AngleButton" class="Control Button AngleButton {theme} csr_default">',
        '<properties>{ "name": "{name}" }</properties></jagui-anglebutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: AngleButton, template: AngleButtonTpl }]);
}
//#endregion
export { AngleButton };