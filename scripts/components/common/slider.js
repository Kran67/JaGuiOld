//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region SLIDERMODES
const SLIDERMODES = Object.freeze(Object.seal({
    NORMAL: 'normal',
    RANGE: 'range'
}));
//#endregion SLIDERMODES
//#region TICKMARKSPOSITION
const TICKMARKSPOSITION = Object.freeze(Object.seal({
    BOTH: 'both',
    TOP: 'top',
    BOTTOM: 'bottom'
}));
//#endregion TICKMARKSPOSITION
//#region Class Slider
class Slider extends ThemedControl {
    //#region Private fields
    #min;
    #max;
    #frequency;
    #showTooltips;
    #decimalPrecision;
    #values;
    #tickmarks;
    #showTickmarks;
    #tickmarksPosition;
    #orientation;
    #mode;
    #toolTipsPosition;
    #leftThumb;
    #rightThumb;
    #leftInput;
    #rightInput;
    #leftToolTip;
    #rightToolTip;
    #range;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            if (!core.isHTMLRenderer) {
                props.width = 100;
                props.height = 14;
            }
            !props.hasOwnProperty('canFocused') && (props.canFocused = !0);
            props.allowUpdateOnResize = !0;
            props.mouseEvents = { mousedown: !1, mouseup: !1, click: !1 };
            super(owner, props);
            this.#min = props.hasOwnProperty('min') ? props.min : 0;
            this.#max = props.hasOwnProperty('max') ? props.max : 100;
            this.#frequency = props.hasOwnProperty('frequency') ? props.frequency : 1;
            this.#showTooltips = props.hasOwnProperty('showTooltips') ? props.showTooltips : !1;
            this.#decimalPrecision = props.hasOwnProperty('decimalPrecision') ? props.decimalPrecision : 0;
            this.#values = props.hasOwnProperty('values') ? props.values : [0, 0];
            this.#tickmarks = props.hasOwnProperty('tickmarks') ? props.tickmarks : [];
            this.#showTickmarks = props.hasOwnProperty('showTickmarks') ? props.showTickmarks : !1;
            this.#tickmarksPosition = props.hasOwnProperty('tickmarksPosition')
                ? props.tickmarksPosition : TICKMARKSPOSITION.BOTH;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'orientation',
                enum: core.types.ORIENTATIONS,
                forceUpdate: !0,
                value: props.hasOwnProperty('orientation') ? props.orientation : core.types.ORIENTATIONS.HORIZONTAL
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'mode',
                enum: SLIDERMODES,
                forceUpdate: !0,
                value: props.hasOwnProperty('mode') ? props.mode : SLIDERMODES.NORMAL
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'toolTipsPosition',
                enum: core.types.ANCHORS,
                forceUpdate: !0,
                value: props.hasOwnProperty('toolTipsPosition') ? props.toolTipsPosition : core.types.ANCHORS.TOP
            });
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region SLIDERMODES
    /**
     * @type    {Object}        SLIDERMODES
     */
    static get SLIDERMODES() {
        return SLIDERMODES;
    }
    //#endregion SLIDERMODES
    //#region SLIDERMODES
    /**
     * @type    {Object}        TICKMARKSPOSITION
     */
    static get TICKMARKSPOSITION() {
        return TICKMARKSPOSITION;
    }
    //#endregion TICKMARKSPOSITION
    //#region tickmarks
    get tickmarks() {
        return this.#tickmarks;
    }
    set tickmarks(newValue) {
        if (Array.isArray(newValue) && this.#tickmarks !== newValue) {
            this.#tickmarks = newValue;
            this.drawTickmarks();
        }
    }
    //#endregion tickmarks
    //#region showTickmarks
    get showTickmarks() {
        return this.#showTickmarks;
    }
    set showTickmarks(newValue) {
        if (core.tools.isBool(newValue) && this.#showTickmarks !== newValue) {
            this.#showTickmarks = newValue;
            this.drawTickmarks();
        }
    }
    //#endregion showTickmarks
    //#region tickmarksPosition
    get tickmarksPosition() {
        return this.#tickmarksPosition;
    }
    set tickmarksPosition(newValue) {
        if (core.tools.valueInSet(newValue, TICKMARKSPOSITION) && this.#tickmarksPosition !== newValue) {
            this.#tickmarksPosition = newValue;
            this.drawTickmarks();
        }
    }
    //#endregion tickmarksPosition
    //#region orientation
    get orientation() {
        return this.#orientation;
    }
    set orientation(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        let ori = `orientation-${this.#orientation}`;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && this.#orientation !== newValue) {
            [htmlElement, this.#leftThumb, this.#rightThumb, this.#leftInput,
                this.#rightInput, this.#leftToolTip, this.#rightToolTip].forEach(item => {
                    item.classList.remove(ori);
                });
            this.#orientation = newValue;
            ori = `orientation-${this.#orientation}`;
            [htmlElement, this.#leftThumb, this.#rightThumb, this.#leftInput,
                this.#rightInput, this.#leftToolTip, this.#rightToolTip].forEach(item => {
                    item.classList.add(ori);
                });
            this.update();
        }
    }
    //#endregion orientation
    //#region min
    get min() {
        return this.#min;
    }
    set min(newValue) {
        if (core.tools.isNumber(newValue) && this.#min !== newValue) {
            this.#min = newValue;
            this.#leftInput.min = this.#min;
            this.#rightInput.min = this.#min;
        }
    }
    //#endregion min
    //#region max
    get max() {
        return this.#max;
    }
    set max(newValue) {
        if (core.tools.isNumber(newValue) && this.#max !== newValue) {
            this.#max = newValue;
            this.#leftInput.min = this.#max;
            this.#rightInput.min = this.#max;
        }
    }
    //#endregion max
    //#region frequency
    get frequency() {
        return this.#frequency;
    }
    set frequency(newValue) {
        if (core.tools.isNumber(newValue) && this.#frequency !== newValue) {
            this.#frequency = newValue;
            this.#leftInput.step = this.#frequency;
            this.#rightInput.step = this.#frequency;
        }
    }
    //#endregion frequency
    //#region getValues
    get values() {
        return new core.classes.Point(this.#leftInput.valueAsNumber, this.#rightInput.valueAsNumber);
    }
    set values(newValue) {
        if (Array.isArray(newValue)) {
            let leftValue = newValue.first;
            let rightValue = newValue.last;
            if (this.#mode === SLIDERMODES.RANGE) {
                leftValue > this.#rightInput.valueAsNumber && (leftValue = this.#rightInput.valueAsNumber - 1);
                rightValue < this.#leftInput.valueAsNumber && (rightValue = this.#leftInput.valueAsNumber + 1);
            }
            this.#leftInput.value !== leftValue && (this.#leftInput.value = leftValue);
            this.#rightInput && this.#rightInput.value !== rightValue && (this.#rightInput.value = rightValue);
            this.change();
        }
    }
    //#endregion getValues
    //#region firstValue
    get firstValue() {
        return this.#leftInput.valueAsNumber;
    }
    set firstValue(newValue) {
        if (core.tools.isNumber(newValue) && this.#leftInput.valueAsNumber !== newValue) {
            this.#leftInput.valueAsNumber = newValue;
            this.propertyChanged('firstValue');
            this.update();
        }
    }
    //#endregion firstValue
    //#region lastValue
    get lastValue() {
        return this.#rightInput.valueAsNumber;
    }
    set lastValue(newValue) {
        if (core.tools.isNumber(newValue) && this.#rightInput.valueAsNumber !== newValue) {
            this.#rightInput.valueAsNumber = newValue;
            this.propertyChanged('lastValue');
            this.update();
        }
    }
    //#endregion lastValue
    //#region mode
    get mode() {
        return this.#mode;
    }
    set mode(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, SLIDERMODES)) {
            this instanceof core.classes.ColorSlider && (newValue = SLIDERMODES.NORMAL);
            if (this.#mode !== newValue) {
                this.#mode = newValue;
                Object.keys(SLIDERMODES).forEach(mode => {
                    htmlElement.classList.remove(mode);
                });
                htmlElement.classList.add(this.#mode);
            }
        }
    }
    //#endregion mode
    //#region toolTipsPosition
    get toolTipsPosition() {
        return this.#toolTipsPosition;
    }
    set toolTipsPosition(newValue) {
        if (core.tools.valueInSet(newValue, core.types.ANCHORS) && this.#toolTipsPosition !== newValue) {
            this.#leftToolTip.classList.remove(this.#toolTipsPosition);
            this.#rightToolTip.classList.remove(this.#toolTipsPosition);
            this.#toolTipsPosition = newValue;
            this.#leftToolTip.classList.add(this.#toolTipsPosition);
            this.#rightToolTip.classList.add(this.#toolTipsPosition);
        }
    }
    //#endregion toolTipsPosition
    //#region toolTipsPosition
    get decimalPrecision() {
        return this.#toolTipsPosition;
    }
    set decimalPrecision(newValue) {
        core.tools.isNumber(newValue) && this.#decimalPrecision !== newValue && (this.#decimalPrecision = newValue);
    }
    //#endregion toolTipsPosition
    //#region showTooltips
    get showTooltips() {
        return this.#showTooltips;
    }
    set showTooltips(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#showTooltips !== newValue) {
            htmlElement.classList.remove(this.#showTooltips);
            this.#showTooltips = newValue;
            htmlElement.classList.add(this.#showTooltips);
        }
    }
    //#endregion showTooltips
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template;
        const a = html.split('{orientation}');
        //#endregion Variables déclaration
        html = a.join(this.#orientation);
        return html;
    }
    //#endregion template
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const INPUT = core.types.HTMLELEMENTS.INPUT;
        //#endregion Variables déclaration
        htmlElement.classList.add(`orientation-${this.#orientation}`);
        htmlElement.classList.add(this.#mode);
        this.#showTooltips && htmlElement.classList.add('showTooltips');
        //#region Create Inputs
        this.#leftInput = document.createElement(INPUT);
        this.#leftInput.type = 'range';
        this.#leftInput.classList.add(this.themeName, 'csr_default', 'SliderInput',
            `orientation-${this.#orientation}`);
        this.#leftInput.jsObj = this;
        htmlElement.appendChild(this.#leftInput);
        Events.bind(this.#leftInput, INPUT, this.change);
        this.#leftInput.min = this.#min;
        this.#leftInput.max = this.#max;
        this.#leftInput.step = this.#frequency;
        this.#leftInput.valueAsNumber = this.#values.first;

        this.#rightInput = document.createElement(INPUT);
        this.#rightInput.type = 'range';
        this.#rightInput.classList.add(this.themeName, 'csr_default', 'SliderInput',
            `orientation-${this.#orientation}`);
        this.#rightInput.jsObj = this;
        htmlElement.appendChild(this.#rightInput);
        Events.bind(this.#rightInput, INPUT, this.change);
        this.#leftInput.min = this.#min;
        this.#leftInput.max = this.#max;
        this.#leftInput.step = this.#frequency;
        this.#rightInput.valueAsNumber = this.#values.last;
        //#endregion Create Inputs
        //#region Create Range
        this.#range = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}range`);
        this.#range.classList.add('SliderRange', this.themeName, `orientation-${this.#orientation}`);
        this.#range.jsObj = this;
        htmlElement.appendChild(this.#range);
        //#endregion Create Range
        //#region Create Thumbs
        this.#leftThumb = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}thumb`);
        this.#leftThumb.classList.add(this.themeName, 'SliderThumb', 'csr_default');
        this.#leftThumb.jsObj = this;
        htmlElement.appendChild(this.#leftThumb);

        this.#rightThumb = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}thumb`);
        this.#rightThumb.classList.add(this.themeName, 'SliderThumb', 'csr_default');
        this.#rightThumb.jsObj = this;
        htmlElement.appendChild(this.#rightThumb);
        //#endregion Create Thumbs
        //#region Create ToolTips
        this.#leftToolTip = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}tooltip`);
        this.#leftToolTip.classList.add(this.themeName, 'SliderTooltip', 'csr_default', `orientation-${this.#orientation}`, this.#toolTipsPosition);
        htmlElement.appendChild(this.#leftToolTip);

        this.#rightToolTip = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}tooltip`);
        this.#rightToolTip.classList.add(this.themeName, 'SliderTooltip', 'csr_default', `orientation-${this.#orientation}`, this.#toolTipsPosition);
        htmlElement.appendChild(this.#rightToolTip);
        //#endregion Create ToolTips
        htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#region moveThumbs
    moveThumbs(lValue, rValue) {
        //#region Variables déclaration
        const thumbWidth = this.#leftThumb.offsetWidth / 2;
        const htmlElement = this.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        const isVertical = this.#orientation === core.types.ORIENTATIONS.VERTICAL;
        const size = !isVertical ? htmlElement.offsetWidth : htmlElement.offsetHeight;
        const prop = !isVertical ? 'translateX(' : 'translateY(';
        //#endregion Variables déclaration
        this.#leftThumb.style.transform = `${prop}${(size * (lValue / 100)) - thumbWidth}${PX})`;
        this.#rightThumb.style.transform = `${prop}${(size * (rValue / 100)) - thumbWidth}${PX})`;
    }
    //#endregion moveThumbs
    //#region change
    change(event) {
        //#region Variables déclaration
        const slider = this.jsObj ? this.jsObj : this;
        const inputs = slider.HTMLElement.querySelectorAll(core.types.HTMLELEMENTS.INPUT);
        const leftInput = inputs[0];
        const rightInput = inputs[1];
        //#endregion Variables déclaration
        event = event || core.mouse.event;
        slider.propertyChanged('firstValue');
        if (slider.mode === SLIDERMODES.RANGE) {
            event.target === leftInput && (slider.value = Math.min(slider.valueAsNumber, slider.lastValue - 1));
            if (event.target === rightInput) {
                slider.value = Math.max(slider.valueAsNumber, slider.firstValue + 1);
                slider.propertyChanged('lastValue');
            }
        }
        slider.update();
        !this.updating && slider.onChange.invoke();
        !this.focused && slider.setFocus();
    }
    //#endregion change
    //#region drawTickmarks
    drawTickmarks() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        const cStyle = getComputedStyle(htmlElement);
        const HORIZONTAL = core.types.ORIENTATIONS.HORIZONTAL;
        const workingArea = this.#orientation === HORIZONTAL ?
            this.width - parseFloat(cStyle.paddingLeft) - parseFloat(cStyle.paddingRight) :
            this.height - parseFloat(cStyle.paddingTop) - parseFloat(cStyle.paddingBottom);
        //#endregion Variables déclaration
        htmlElement.classList.remove('showTickmarks');
        htmlElementStyle.background = String.EMPTY;
        if (this.#showTickmarks) {
            htmlElement.classList.add('showTickmarks');
            const tickmarks = [];
            const tickPosition = this.#tickmarksPosition === TICKMARKSPOSITION.TOP ?
                '-18px' : this.#tickmarksPosition === TICKMARKSPOSITION.BOTTOM ? '18px' :
                    this.#orientation === HORIZONTAL ? 'top' : 'left';
            this.#tickmarks.forEach(tick => {
                const pos = workingArea * tick / 100 + parseFloat(this.#orientation === HORIZONTAL ?
                    cStyle.paddingLeft : cStyle.paddingTop);
                this.#orientation === HORIZONTAL
                    ? tickmarks.push(`linear-gradient(90deg, var(--ticks-color), var(--ticks-color)) no-repeat ${pos}% ${tickPosition}`)
                    : tickmarks.push(`linear-gradient(0deg, var(--ticks-color), var(--ticks-color)) no-repeat ${tickPosition} ${pos}%`);
            });
            htmlElementStyle.background = tickmarks.join(', ');
        }
    }
    //#endregion drawTickmarks
    //#region update
    update() {
        //#region Variables déclaration
        const lValue = 100 / (int(this.#max - this.#min)) * this.#leftInput.valueAsNumber - 100 /
            (int(this.#max - this.#min)) * int(this.#min);
        const rValue = 100 / (int(this.#max - this.#min)) * this.#rightInput.valueAsNumber - 100 /
            (int(this.#max - this.#min)) * int(this.#min);
        const PX = core.types.CSSUNITS.PX;
        const width = `${this.width + this.#leftThumb.offsetWidth}${PX}`;
        const height = `${this.height + this.#leftThumb.offsetHeight}${PX}`;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            if (this.#orientation === core.types.ORIENTATIONS.VERTICAL) {
                this.#leftInput.style.width = height;
                this.#rightInput.style.width = height;
                this.#leftInput.style.height = `${htmlElement.offsetWidth}${PX}`;
                this.#rightInput.style.height = `${htmlElement.offsetWidth}${PX}`;
            } else {
                this.#leftInput.style.width = width;
                this.#rightInput.style.width = width;
                this.#leftInput.style.height = `${htmlElement.offsetHeight}${PX}`;
                this.#rightInput.style.height = `${htmlElement.offsetHeight}${PX}`;
            }
            this.moveThumbs(lValue, rValue);
            this.moveToolTips(lValue, rValue);
            this.moveRange(lValue, rValue);
            this.drawTickmarks();
        }
    }
    //#endregion update
    //#region wheel
    wheel(event) {
        //#region Variables déclaration
        let multiplier;
        //#endregion Variables déclaration
        core.mouse.getMouseInfos(event);
        multiplier = core.mouse.wheelDelta < 0 ? 2 : -2;
        core.keyboard.shift && this.#mode === SLIDERMODES.RANGE
            ? this.scrollBy(0, -this.#frequency * multiplier)
            : this.scrollBy(-this.#frequency * multiplier, 0);
        core.mouse.stopAllEvents(event);
        this.form.focusedControl !== this && this.setFocus();
    }
    //#endregion wheel
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        const shift = core.keyboard.shift;
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
            case VKEYSCODES.VK_LEFT:
            case VKEYSCODES.VK_UP:
                shift && this.#mode === SLIDERMODES.RANGE
                    ? this.scrollBy(0, -this.#frequency)
                    : this.scrollBy(-this.#frequency, 0);
                break;
            case VKEYSCODES.VK_RIGHT:
            case VKEYSCODES.VK_DOWN:
                shift && this.#mode === SLIDERMODES.RANGE
                    ? this.scrollBy(0, this.#frequency)
                    : this.scrollBy(this.#frequency, 0);
                break;
            case VKEYSCODES.VK_HOME:
                //if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.setValues([this.leftValue, this.rightValue])
                //else this.setValues([this.min, this.rightValue]);
                break;
            case VKEYSCODES.VK_END:
                //if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.setValues([this.leftValue, this.max])
                //else this.setValues([this.max, this.rightValue]);
                break;
            case VKEYSCODES.VK_PAGEUP:
                shift && this.#mode === SLIDERMODES.RANGE
                    ? this.scrollBy(0, -this.#frequency * 2)
                    : this.scrollBy(-this.#frequency * 2, 0);
                break;
            case VKEYSCODES.VK_PAGEDOWN:
                shift && this.#mode === SLIDERMODES.RANGE
                    ? this.scrollBy(0, this.#frequency * 2)
                    : this.scrollBy(this.#frequency * 2, 0);
                break;
        }
    }
    //#endregion keyDown
    //#region scrollBy
    scrollBy(offsetFirst, offsetLast) {
        this.values = [
            this.#leftInput.valueAsNumber + offsetFirst,
            this.#rightInput ? this.#rightInput.valueAsNumber + offsetLast : 0
        ];
    }
    //#endregion scrollBy
    //#region moveToolTips
    moveToolTips(lValue, rValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        const isVertical = this.#orientation === core.types.ORIENTATIONS.VERTICAL;
        const size = !isVertical ? htmlElement.offsetWidth : htmlElement.offsetHeight;
        const prop = !isVertical ? 'translateX(' : 'translateY(';
        let leftPos = (size * (lValue / 100));
        let rightPos = (size * (rValue / 100));
        //#endregion Variables déclaration
        if (this.#showTooltips) {
            this.#leftToolTip.innerHTML = this.#leftInput.valueAsNumber.toFixed(this.#decimalPrecision);
            this.#rightToolTip.innerHTML = this.#rightInput.valueAsNumber.toFixed(this.#decimalPrecision);
            this.#leftToolTip.style.transform = `${prop}calc(${leftPos}${PX} - 50%))`;
            this.#rightToolTip.style.transform = `${prop}calc(${rightPos}${PX} - 50%))`;
        }
    }
    //#endregion moveToolTips
    //#region destroyToolTips
    destroyToolTips() {
        this.#leftToolTip = null;
        this.#rightToolTip = null;
    }
    //#endregion destroyToolTips
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        this.#leftInput ? htmlElement.removeChild(this.#leftInput) : null;
        this.#rightInput ? htmlElement.removeChild(this.#rightInput) : null;
        this.#range ? htmlElement.removeChild(this.#range) : null;
        this.#leftThumb ? htmlElement.removeChild(this.#leftThumb) : null;
        this.#rightThumb ? htmlElement.removeChild(this.#rightThumb) : null;
        this.#leftToolTip ? htmlElement.removeChild(this.#leftToolTip) : null;
        this.#rightToolTip ? htmlElement.removeChild(this.#rightToolTip) : null;
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region moveRange
    moveRange(lValue, rValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        const isVertical = this.#orientation === core.types.ORIENTATIONS.VERTICAL;
        const size = !isVertical ? htmlElement.offsetWidth : htmlElement.offsetHeight;
        const leftPos = !isVertical ? `${(size * (lValue / 100))}${PX}` : 0;
        const rightPos = !isVertical ? `${(htmlElement.offsetWidth - (size * (rValue / 100)))}${PX}` : 0;
        const topPos = isVertical ? `${(size * (lValue / 100))}${PX}` : 0;
        const bottomPos = isVertical ? `${(htmlElement.offsetHeight - (size * (rValue / 100)))}${PX}` : 0;
        //#endregion Variables déclaration
        if (this.#mode === SLIDERMODES.RANGE) {
            this.#range.style.clipPath = `inset(${topPos} ${rightPos} ${bottomPos} ${leftPos})`;
        }
    }
    //#endregion moveRange
    //#endregion Methods
}
Object.defineProperties(Slider.prototype, {
    'min': {
        enumerable: !0
    },
    'max': {
        enumerable: !0
    },
    'frequency': {
        enumerable: !0
    },
    'showTooltips': {
        enumerable: !0
    },
    'decimalPrecision': {
        enumerable: !0
    },
    'values': {
        enumerable: !0
    },
    'showTickmarks': {
        enumerable: !0
    },
    'tickmarksPosition': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, Slider);
//#endregion Slider
//#region Templates
if (core.isHTMLRenderer) {
    const SliderTpl = ['<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme} csr_default">',
        '<properties>{ "name": "{name}", "values": [20,0], "width": 100, "height": 6 }</properties></jagui-slider>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Slider, template: SliderTpl }]);
}
//#endregion
export { Slider };