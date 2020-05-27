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
//#region Slider
const Slider = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class Slider
    class Slider extends ThemedControl {
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
                const priv = internal(this);
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'orientation',
                    enum: core.types.ORIENTATIONS,
                    forceUpdate: !0,
                    variable: priv,
                    value: props.hasOwnProperty('orientation') ? props.orientation : core.types.ORIENTATIONS.HORIZONTAL
                });
                priv.leftInput = null;
                priv.rightInput = null;
                priv.range = null;
                priv.leftToolTip = null;
                priv.rightToolTip = null;
                priv.min = props.hasOwnProperty('min') ? props.min : 0;
                priv.max = props.hasOwnProperty('max') ? props.max : 100;
                priv.frequency = props.hasOwnProperty('frequency') ? props.frequency : 1;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'mode',
                    enum: SLIDERMODES,
                    forceUpdate: !0,
                    variable: priv,
                    value: props.hasOwnProperty('mode') ? props.mode : SLIDERMODES.NORMAL
                });
                priv.showTooltips = props.hasOwnProperty('showTooltips') ? props.showTooltips : !1;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'toolTipsPosition',
                    enum: core.types.ANCHORS,
                    forceUpdate: !0,
                    variable: priv,
                    value: props.hasOwnProperty('toolTipsPosition') ? props.toolTipsPosition : core.types.ANCHORS.TOP
                });
                priv.decimalPrecision = props.hasOwnProperty('decimalPrecision') ? props.decimalPrecision : 0;
                priv.values = props.hasOwnProperty('values') ? props.values : [0, 0];
                priv.tickmarks = props.hasOwnProperty('tickmarks') ? props.tickmarks : [];
                priv.showTickmarks = props.hasOwnProperty('showTickmarks') ? props.showTickmarks : !1;
                priv.tickmarksPosition = props.hasOwnProperty('tickmarksPosition') ? props.tickmarksPosition : TICKMARKSPOSITION.BOTH;
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
            return internal(this).tickmarks;
        }
        set tickmarks(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Array.isArray(newValue) && priv.tickmarks !== newValue) {
                priv.tickmarks = newValue;
                this.drawTickmarks();
            }
        }
        //#endregion tickmarks
        //#region showTickmarks
        get showTickmarks() {
            return internal(this).showTickmarks;
        }
        set showTickmarks(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.showTickmarks !== newValue) {
                priv.showTickmarks = newValue;
                this.drawTickmarks();
            }
        }
        //#endregion showTickmarks
        //#region tickmarksPosition
        get tickmarksPosition() {
            return internal(this).tickmarksPosition;
        }
        set tickmarksPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, TICKMARKSPOSITION) && priv.tickmarksPosition !== newValue) {
                priv.tickmarksPosition = newValue;
                this.drawTickmarks();
            }
        }
        //#endregion tickmarksPosition
        //#region orientation
        get orientation() {
            return internal(this).orientation;
        }
        set orientation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            let ori = `orientation-${priv.orientation}`;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && priv.orientation !== newValue) {
                [htmlElement, priv.leftThumb, priv.rightThumb, priv.leftInput,
                    priv.rightInput, priv.leftTooltip, priv.rightTooltip].forEach(item => {
                        item.classList.remove(ori);
                    });
                priv.orientation = newValue;
                ori = `orientation-${priv.orientation}`;
                [htmlElement, priv.leftThumb, priv.rightThumb, priv.leftInput,
                    priv.rightInput, priv.leftTooltip, priv.rightTooltip].forEach(item => {
                        item.classList.add(ori);
                    });
                this.update();
            }
        }
        //#endregion orientation
        //#region min
        get min() {
            return internal(this).min;
        }
        set min(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.min !== newValue) {
                priv.min = newValue;
                priv.leftInput.min = priv.min;
                priv.rightInput.min = priv.min;
            }
        }
        //#endregion min
        //#region max
        get max() {
            return internal(this).max;
        }
        set max(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.max !== newValue) {
                priv.max = newValue;
                priv.leftInput.min = priv.max;
                priv.rightInput.min = priv.max;
            }
        }
        //#endregion max
        //#region frequency
        get frequency() {
            return internal(this).frequency;
        }
        set frequency(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.frequency !== newValue) {
                priv.frequency = newValue;
                priv.leftInput.step = priv.frequency;
                priv.rightInput.step = priv.frequency;
            }
        }
        //#endregion frequency
        //#region getValues
        get values() {
            const priv = internal(this);
            return new core.classes.Point(priv.leftInput.valueAsNumber, priv.rightInput.valueAsNumber);
        }
        set values(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Array.isArray(newValue)) {
                let leftValue = newValue.first;
                let rightValue = newValue.last;
                if (priv.mode === SLIDERMODES.RANGE) {
                    leftValue > priv.rightInput.valueAsNumber && (leftValue = priv.rightInput.valueAsNumber - 1);
                    rightValue < priv.leftInput.valueAsNumber && (rightValue = priv.leftInput.valueAsNumber + 1);
                }
                priv.leftInput.value !== leftValue && (priv.leftInput.value = leftValue);
                priv.rightInput && priv.rightInput.value !== rightValue && (priv.rightInput.value = rightValue);
                this.change();
            }
        }
        //#endregion getValues
        //#region firstValue
        get firstValue() {
            return internal(this).leftInput.valueAsNumber;
        }
        set firstValue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.leftInput.valueAsNumber !== newValue) {
                priv.leftInput.valueAsNumber = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                this.update();
            }
        }
        //#endregion firstValue
        //#region lastValue
        get lastValue() {
            return internal(this).rightInput.valueAsNumber;
        }
        set lastValue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.rightInput.valueAsNumber !== newValue) {
                priv.rightInput.valueAsNumber = newValue;
                this.propertyChanged(core.tools.getPropertyName());
                this.update();
            }
        }
        //#endregion lastValue
        //#region mode
        get mode() {
            return internal(this).mode;
        }
        set mode(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, SLIDERMODES)) {
                this instanceof core.classes.ColorSlider && (newValue = SLIDERMODES.NORMAL);
                if (priv.mode !== newValue) {
                    priv.mode = newValue;
                    Object.keys(SLIDERMODES).forEach(mode => {
                        htmlElement.classList.remove(mode);
                    });
                    htmlElement.classList.add(priv.mode);
                }
            }
        }
        //#endregion mode
        //#region toolTipsPosition
        get toolTipsPosition() {
            return internal(this).toolTipsPosition;
        }
        set toolTipsPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.ANCHORS) && priv.toolTipsPosition !== newValue) {
                priv.leftToolTip.classList.remove(priv.toolTipsPosition);
                priv.rightToolTip.classList.remove(priv.toolTipsPosition);
                priv.toolTipsPosition = newValue;
                priv.leftToolTip.classList.add(priv.toolTipsPosition);
                priv.rightToolTip.classList.add(priv.toolTipsPosition);
            }
        }
        //#endregion toolTipsPosition
        //#region toolTipsPosition
        get decimalPrecision() {
            return internal(this).toolTipsPosition;
        }
        set decimalPrecision(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.decimalPrecision !== newValue && (priv.decimalPrecision = newValue);
        }
        //#endregion toolTipsPosition
        //#region showTooltips
        get showTooltips() {
            return internal(this).showTooltips;
        }
        set showTooltips(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.showTooltips !== newValue) {
                htmlElement.classList.remove(priv.showTooltips);
                priv.showTooltips = newValue;
                htmlElement.classList.add(priv.showTooltips);
            }
        }
        //#endregion showTooltips
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template;
            const a = html.split('{orientation}');
            //#endregion Variables déclaration
            html = a.join(priv.orientation);
            return html;
        }
        //#endregion template
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const INPUT = core.types.HTMLELEMENTS.INPUT;
            //#endregion Variables déclaration
            htmlElement.classList.add(`orientation-${priv.orientation}`);
            htmlElement.classList.add(priv.mode);
            priv.showTooltips && htmlElement.classList.add('showTooltips');
            //#region Create Inputs
            priv.leftInput = document.createElement(INPUT);
            priv.leftInput.type = 'range';
            priv.leftInput.classList.add('Control', this.themeName, 'csr_default', 'SliderInput',
                `orientation-${priv.orientation}`);
            priv.leftInput.jsObj = this;
            htmlElement.appendChild(priv.leftInput);
            Events.bind(priv.leftInput, INPUT, this.change);
            priv.leftInput.min = priv.min;
            priv.leftInput.max = priv.max;
            priv.leftInput.step = priv.frequency;
            priv.leftInput.valueAsNumber = priv.values.first;

            priv.rightInput = document.createElement(INPUT);
            priv.rightInput.type = 'range';
            priv.rightInput.classList.add('Control', this.themeName, 'csr_default', 'SliderInput',
                `orientation-${priv.orientation}`);
            priv.rightInput.jsObj = this;
            htmlElement.appendChild(priv.rightInput);
            Events.bind(priv.rightInput, INPUT, this.change);
            priv.leftInput.min = priv.min;
            priv.leftInput.max = priv.max;
            priv.leftInput.step = priv.frequency;
            priv.rightInput.valueAsNumber = priv.values.last;
            //#endregion Create Inputs
            //#region Create Range
            priv.range = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}range`);
            priv.range.classList.add('Control', 'SliderRange', this.themeName, `orientation-${priv.orientation}`);
            priv.range.jsObj = this;
            htmlElement.appendChild(priv.range);
            //#endregion Create Range
            //#region Create Thumbs
            priv.leftThumb = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}thumb`);
            priv.leftThumb.classList.add('Control', this.themeName, 'SliderThumb', 'csr_default');
            priv.leftThumb.jsObj = this;
            htmlElement.appendChild(priv.leftThumb);

            priv.rightThumb = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}thumb`);
            priv.rightThumb.classList.add('Control', this.themeName, 'SliderThumb', 'csr_default');
            priv.rightThumb.jsObj = this;
            htmlElement.appendChild(priv.rightThumb);
            //#endregion Create Thumbs
            //#region Create ToolTips
            priv.leftTooltip = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}tooltip`);
            priv.leftTooltip.classList.add('Control', this.themeName, 'SliderTooltip', 'csr_default', `orientation-${priv.orientation}`, priv.toolTipsPosition);
            htmlElement.appendChild(priv.leftTooltip);

            priv.rightTooltip = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}tooltip`);
            priv.rightTooltip.classList.add('Control', this.themeName, 'SliderTooltip', 'csr_default', `orientation-${priv.orientation}`, priv.toolTipsPosition);
            htmlElement.appendChild(priv.rightTooltip);
            //#endregion Create ToolTips
            htmlElement.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
            super.loaded();
            this.update();
        }
        //#endregion loaded
        //#region moveThumbs
        moveThumbs(lValue, rValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const thumbWidth = priv.leftThumb.offsetWidth / 2;
            const htmlElement = this.HTMLElement;
            const PX = core.types.CSSUNITS.PX;
            const isVertical = priv.orientation === core.types.ORIENTATIONS.VERTICAL;
            const size = !isVertical ? htmlElement.offsetWidth : htmlElement.offsetHeight;
            const prop = !isVertical ? 'translateX(' : 'translateY(';
            //#endregion Variables déclaration
            priv.leftThumb.style.transform = `${prop}${(size * (lValue / 100)) - thumbWidth}${PX})`;
            priv.rightThumb.style.transform = `${prop}${(size * (rValue / 100)) - thumbWidth}${PX})`;
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
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const cStyle = getComputedStyle(htmlElement);
            const HORIZONTAL = core.types.ORIENTATIONS.HORIZONTAL;
            const workingArea = priv.orientation === HORIZONTAL ?
                this.width - parseFloat(cStyle.paddingLeft) - parseFloat(cStyle.paddingRight) :
                this.height - parseFloat(cStyle.paddingTop) - parseFloat(cStyle.paddingBottom);
            //#endregion Variables déclaration
            htmlElement.classList.remove('showTickmarks');
            htmlElementStyle.background = String.EMPTY;
            if (priv.showTickmarks) {
                htmlElement.classList.add('showTickmarks');
                const tickmarks = [];
                const tickPosition = priv.tickmarksPosition === TICKMARKSPOSITION.TOP ?
                    '-18px' : priv.tickmarksPosition === TICKMARKSPOSITION.BOTTOM ? '18px' :
                        priv.orientation === HORIZONTAL ? 'top' : 'left';
                priv.tickmarks.forEach(tick => {
                    const pos = workingArea * tick / 100 + parseFloat(priv.orientation === HORIZONTAL ?
                        cStyle.paddingLeft : cStyle.paddingTop);
                    priv.orientation === HORIZONTAL
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
            const priv = internal(this);
            const lValue = 100 / (int(priv.max - priv.min)) * priv.leftInput.valueAsNumber - 100 /
                (int(priv.max - priv.min)) * int(priv.min);
            const rValue = 100 / (int(priv.max - priv.min)) * priv.rightInput.valueAsNumber - 100 /
                (int(priv.max - priv.min)) * int(priv.min);
            const PX = core.types.CSSUNITS.PX;
            const width = `${this.width + priv.leftThumb.offsetWidth}${PX}`;
            const height = `${this.height + priv.leftThumb.offsetHeight}${PX}`;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (priv.orientation === core.types.ORIENTATIONS.VERTICAL) {
                    priv.leftInput.style.width = height;
                    priv.rightInput.style.width = height;
                    priv.leftInput.style.height = `${htmlElement.offsetWidth}${PX}`;
                    priv.rightInput.style.height = `${htmlElement.offsetWidth}${PX}`;
                } else {
                    priv.leftInput.style.width = width;
                    priv.rightInput.style.width = width;
                    priv.leftInput.style.height = `${htmlElement.offsetHeight}${PX}`;
                    priv.rightInput.style.height = `${htmlElement.offsetHeight}${PX}`;
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
            const priv = internal(this);
            const multiplier = core.mouse.wheelDelta < 0 ? 2 : -2;
            //#endregion Variables déclaration
            core.keyboard.shift && priv.mode === SLIDERMODES.RANGE
                ? this.scrollBy(0, -priv.frequency * multiplier)
                : this.scrollBy(-priv.frequency * multiplier, 0);
            core.mouse.stopAllEvents(event);
            this.form.focusedControl !== this && this.setFocus();
        }
        //#endregion wheel
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const shift = core.keyboard.shift;
            //#endregion Variables déclaration
            super.keyDown();
            switch (core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                case VKEYSCODES.VK_UP:
                    shift && priv.mode === SLIDERMODES.RANGE
                        ? this.scrollBy(0, -priv.frequency)
                        : this.scrollBy(-priv.frequency, 0);
                    break;
                case VKEYSCODES.VK_RIGHT:
                case VKEYSCODES.VK_DOWN:
                    shift && priv.mode === SLIDERMODES.RANGE
                        ? this.scrollBy(0, priv.frequency)
                        : this.scrollBy(priv.frequency, 0);
                    break;
                case VKEYSCODES.VK_HOME:
                    //if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.setValues([this.leftValue, this.rightValue])
                    //else this.setValues([this.min, this.rightValue]);
                    break;
                case VKEYSCODES.VK_END:
                    //if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.setValues([this.leftValue, this.max])
                    //else this.setValues([this.max, this.rightValue]);
                    break;
                case VKEYSCODES.VK_PRIOR:
                    shift && priv.mode === SLIDERMODES.RANGE
                        ? this.scrollBy(0, -priv.frequency * 2)
                        : this.scrollBy(-priv.frequency * 2, 0);
                    break;
                case VKEYSCODES.VK_NEXT:
                    shift && priv.mode === SLIDERMODES.RANGE
                        ? this.scrollBy(0, priv.frequency * 2)
                        : this.scrollBy(priv.frequency * 2, 0);
                    break;
            }
        }
        //#endregion keyDown
        //#region scrollBy
        scrollBy(offsetFirst, offsetLast) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.values = [
                priv.leftInput.valueAsNumber + offsetFirst,
                priv.rightInput ? priv.rightInput.valueAsNumber + offsetLast : 0
            ];
        }
        //#endregion scrollBy
        //#region moveToolTips
        moveToolTips(lValue, rValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const PX = core.types.CSSUNITS.PX;
            const isVertical = priv.orientation === core.types.ORIENTATIONS.VERTICAL;
            const size = !isVertical ? htmlElement.offsetWidth : htmlElement.offsetHeight;
            const prop = !isVertical ? 'translateX(' : 'translateY(';
            let leftPos = (size * (lValue / 100));
            let rightPos = (size * (rValue / 100));
            //#endregion Variables déclaration
            if (priv.showTooltips) {
                priv.leftTooltip.innerHTML = priv.leftInput.valueAsNumber.toFixed(priv.decimalPrecision);
                priv.rightTooltip.innerHTML = priv.rightInput.valueAsNumber.toFixed(priv.decimalPrecision);
                priv.leftTooltip.style.transform = `${prop}calc(${leftPos}${PX} - 50%))`;
                priv.rightTooltip.style.transform = `${prop}calc(${rightPos}${PX} - 50%))`;
            }
        }
        //#endregion moveToolTips
        //#region destroyToolTips
        destroyToolTips() {
            priv.leftToolTip = null;
            priv.rightToolTip = null;
        }
        //#endregion destroyToolTips
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            priv.leftInput ? htmlElement.removeChild(priv.leftInput) : null;
            priv.rightInput ? htmlElement.removeChild(priv.rightInput) : null;
            priv.range ? htmlElement.removeChild(priv.range) : null;
            priv.leftThumb ? htmlElement.removeChild(priv.leftThumb) : null;
            priv.rightThumb ? htmlElement.removeChild(priv.rightThumb) : null;
            priv.leftToolTip ? htmlElement.removeChild(priv.leftToolTip) : null;
            priv.rightToolTip ? htmlElement.removeChild(priv.rightToolTip) : null;
            priv.leftInput = null;
            priv.rightInput = null;
            priv.range = null;
            priv.leftThumb = null;
            priv.rightThumb = null;
            priv.leftToolTip = null;
            priv.rightToolTip = null;
            priv.orientation = null;
            priv.min = null;
            priv.max = null;
            priv.frequency = null;
            priv.mode = null;
            priv.showTooltips = null;
            priv.toolTipsPosition = null;
            priv.decimalPrecision = null;
            priv.showTickmarks = null;
            priv.tickmarks = null;
            priv.values = null;
            priv.tickmarksPosition = null;
            this.unBindAndDestroyEvents(['onChange']);
            super.destroy();
        }
        //#endregion destroy
        //#region moveRange
        moveRange(lValue, rValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const PX = core.types.CSSUNITS.PX;
            const isVertical = priv.orientation === core.types.ORIENTATIONS.VERTICAL;
            const size = !isVertical ? htmlElement.offsetWidth : htmlElement.offsetHeight;
            const leftPos = !isVertical ? `${(size * (lValue / 100))}${PX}` : 0;
            const rightPos = !isVertical ? `${(htmlElement.offsetWidth - (size * (rValue / 100)))}${PX}` : 0;
            const topPos = isVertical ? `${(size * (lValue / 100))}${PX}` : 0;
            const bottomPos = isVertical ? `${(htmlElement.offsetHeight - (size * (rValue / 100)))}${PX}` : 0;
            //#endregion Variables déclaration
            if (priv.mode === SLIDERMODES.RANGE) {
                priv.range.style.clipPath = `inset(${topPos} ${rightPos} ${bottomPos} ${leftPos})`;
            }
        }
        //#endregion moveRange
        //#endregion Methods
    }
    return Slider;
    //#endregion Slider
})();
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