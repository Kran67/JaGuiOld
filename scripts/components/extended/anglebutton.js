//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Vector } from '/scripts/core/geometry.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class AngleButton
class AngleButton extends Button {
    //#region Private fields
    #internalValue = 0;
    #knob = null;
    #saveValue = 0;
    #textObj = null;
    #frequency;
    #tracking;
    #value;
    #showValue;
    //#endregion Private fields
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
            const self = this;
            this.#frequency = props.hasOwnProperty('frequency') ? props.frequency : 1;
            this.#tracking = props.hasOwnProperty('tracking') ? props.tracking : !0;
            this.#value = props.hasOwnProperty('value') ? props.value : 0;
            this.#showValue = props.hasOwnProperty('showValue') ? props.showValue : !0;
            this.createEventsAndBind(['onChanged'], props);
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region frequency
    get frequency() {
        return this.#frequency;
    }
    set frequency(newValue) {
        core.tools.isNumber(newValue) && this.#frequency !== newValue && (this.#frequency = newValue);
    }
    //#endregion frequency
    //#region tracking
    get tracking() {
        return this.#tracking;
    }
    set tracking(newValue) {
        core.tools.isBool(newValue) && this.#tracking !== newValue && (this.#tracking = newValue);
    }
    //#endregion tracking
    //#region value
    get value() {
        return this.#value;
    }
    set value(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(Math.min(newValue, 360), 0);
            if (this.#value !== newValue) {
                this.#value = 360 - newValue;
                this.#setInternalValue(this.#value);
            }
        }
    }
    //#endregion value
    //#region showValue
    get showValue() {
        return this.#showValue;
    }
    set showValue(newValue) {
        //#region Variables déclaration
        const cssValues = core.types.CSSVALUES;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#showValue !== newValue) {
            this.#showValue = newValue;
            this.#textObj.style.visibility = this.#showValue ? cssValues.NORMAL : cssValues.HIDDEN;
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
    //#region privates Methods
    //#region setInternalValue
    #setInternalValue(newValue) {
        if (core.tools.isNumber(newValue) && this.#internalValue !== newValue) {
            if (this.#frequency === 0) {
                this.#internalValue = newValue;
            } else {
                const nv = Math.round(newValue / this.#frequency) * this.#frequency;
                if (this.#internalValue !== nv) {
                    this.#internalValue = nv;
                }
            }
            this.#value = this.#internalValue > 0
                ? Math.round(360 - this.#internalValue, 0)
                : 360 - Math.round(360 + this.#internalValue, 0);
            if (!core.isHTMLRenderer) {
                this.allowUpdate && this.updateKnobAndText();
                this.redraw();
            } else {
                this.updateKnobAndText();
            }
            this.onChanged.invoke();
        }
    }
    //#endregion setInternalValue
    //#endregion privates Methods
    //#region mouseDown
    mouseDown() {
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
            this.#saveValue = this.#internalValue;
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
        this.#knob.style.transform = `rotate(${this.#internalValue}deg)`;
        this.#textObj.innerHTML = `${this.#value}&deg;`;
        this.#textObj.style.lineHeight = `${this.#textObj.offsetHeight}${core.types.CSSUNITS.PX}`;
    }
    //#endregion updateKnobAndText
    //#region valueFromPoint
    valueFromPoint(point) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const v = new Vector(point.x - htmlElement.offsetWidth / 2, point.y - htmlElement.offsetHeight / 2);
        const v1 = new Vector(1, 0, 0);
        //#endregion Variables déclaration
        this.#setInternalValue(-v1.angle(v));
    }
    //#endregion valueFromPoint
    //#region wheel
    wheel(event) {
        //#region Variables déclaration
        let newVal = this.#internalValue + (core.mouse.getWheelDetail(event) * 10);
        //#endregion Variables déclaration
        if (newVal < -360) {
            newVal = 360 + newVal;
        } else if (newVal > 360) {
            newVal = 360 - newVal;
        }
        this.#setInternalValue(newVal);
        core.mouse.stopAllEvents(event);
    }
    //#endregion wheel
    //#region destroy
    destroy() {
        this.unBindAndDestroyEvents(['onChanged']);
        super.destroy();
    }
    //#endregion destroy
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const VKeysCodes = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
            case VKeysCodes.VK_LEFT:
            case VKeysCodes.VK_UP:
                this.#value += this.#frequency;
                break;
            case VKeysCodes.VK_RIGHT:
            case VKeysCodes.VK_DOWN:
                this.#value -= this.#frequency;
                break;
            case VKeysCodes.VK_HOME:
            case VKeysCodes.VK_END:
                this.#value = 0;
                break;
            case VKeysCodes.VK_PAGEUP:
                this.#value += this.#frequency * 5;
                break;
            case VKeysCodes.VK_PAGEDOWN:
                this.#value -= this.#frequency * 5;
                break;
        }
    }
    //#endregion keyDown
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const cssValues = core.types.CSSVALUES;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('.AngleButtonCaption')) {
            this.#textObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}caption`);
            this.#textObj.classList.add('AngleButtonCaption');
            this.#textObj.jsObj = this;
            this.#knob = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}knob`);
            this.#knob.classList.add('AngleButtonKnob');
            this.#knob.innerHTML = '3';
            this.#knob.jsObj = this;
            htmlElement.appendChild(this.#textObj);
            htmlElement.appendChild(this.#knob);
            this.#textObj.style.visibility = this.#showValue ? cssValues.NORMAL : cssValues.HIDDEN;
        }
        htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(AngleButton.prototype, {
    'frequency': {
        enumerable: !0
    },
    'tracking': {
        enumerable: !0
    },
    'value': {
        enumerable: !0
    },
    'showValue': {
        enumerable: !0
    }
});
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