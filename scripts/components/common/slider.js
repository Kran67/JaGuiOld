//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Events } from "/scripts/core/events.js";
import { Keyboard } from "/scripts/core/keyboard.js";
import { NotifyEvent } from "/scripts/core/events.js";
import { Tools } from "/scripts/core/tools.js";
import { Text } from "/scripts/core/text.js";
//#endregion Import
//#region SLIDERMODES
const SLIDERMODES = {
    NORMAL: "normal",
    RANGE: "range"
};
//#endregion SLIDERMODES
//#region TICKMARKSPOSITION
const TICKMARKSPOSITION = {
    BOTH: "both",
    TOP: "top",
    BOTTOM: "bottom"
};
//#endregion TICKMARKSPOSITION
//#region Slider
const Slider = (() => {
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
    //#region Class Slider
    class Slider extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "orientation",
                    enum: Types.ORIENTATIONS,
                    forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty("orientation") ? props.orientation : Types.ORIENTATIONS.HORIZONTAL
                });
                this.leftInput = null;
                this.rightInput = null;
                this.range = null;
                this.leftToolTip = null;
                this.rightToolTip = null;
                this.offset = 0;
                if (!Core.isHTMLRenderer) {
                    this.width = 100;
                    this.height = 14;
                }
                this.canFocused = true;
                priv.min = props.hasOwnProperty("min") ? props.min : 0;
                priv.max = props.hasOwnProperty("max") ? props.max : 100;
                priv.frequency = props.hasOwnProperty("frequency") ? props.frequency : 1;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "mode",
                    enum: SLIDERMODES,
                    forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty("mode") ? props.mode : SLIDERMODES.NORMAL
                });
                this.hitTest = true;
                priv.showValues = props.hasOwnProperty("showValues") ? props.showValues : false;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "toolTipsPosition",
                    enum: Types.ANCHORS,
                    forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty("toolTipsPosition") ? props.toolTipsPosition : Types.ANCHORS.TOP
                });
                priv.decimalPrecision = props.hasOwnProperty("decimalPrecision") ? props.decimalPrecision : 0;
                this.onChange = new NotifyEvent(this);
                priv.blockedThumbs = true;
                priv.values = props.hasOwnProperty("values") ? props.values : null;
                priv.tickmarks = props.hasOwnProperty("tickmarks") ? props.tickmarks : [];
                priv.showTickmarks = props.hasOwnProperty("showTickmarks") ? props.showTickmarks : false;
                priv.tickmarksPosition = props.hasOwnProperty("tickmarksPosition") ? props.tickmarksPosition : TICKMARKSPOSITION.BOTH;
                this.allowUpdateOnResize = true;
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
            if (Array.isArray(newValue)) {
                if (priv.tickmarks !== newValue) {
                    priv.tickmarks = newValue;
                    this.drawTickmarks();
                }
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
            if (Tools.isBool(newValue)) {
                if (priv.showTickmarks !== newValue) {
                    priv.showTickmarks = newValue;
                    this.drawTickmarks();
                }
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
            if (Tools.valueInSet(newValue, TICKMARKSPOSITION)) {
                if (priv.tickmarksPosition !== newValue) {
                    priv.tickmarksPosition = newValue;
                    this.drawTickmarks();
                }
            }
        }
        //#endregion tickmarksPosition
        //#region blockedThumbs
        get blockedThumbs() {
            return internal(this).blockedThumbs;
        }
        set blockedThumbs(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.blockedThumbs !== newValue) {
                    priv.blockedThumbs = newValue;
                }
            }
        }
        //#endregion blockedThumbs
        //#region orientation
        get orientation() {
            return internal(this).orientation;
        }
        set orientation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.ORIENTATIONS)) {
                if (priv.orientation !== newValue) {
                    htmlElement.classList.remove(`orientation-${priv.orientation}`);
                    priv.orientation = newValue;
                    priv.leftThumb.orientation = priv.orientation;
                    if (priv.rightThumb) {
                        priv.rightThumb.orientation = priv.orientation;
                    }
                    htmlElement.classList.add(`orientation-${priv.orientation}`);
                    this.update();
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.min !== newValue) {
                    priv.min = newValue;
                    priv.leftInput.min = priv.min;
                    priv.rightInput.min = priv.min;
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.max !== newValue) {
                    priv.max = newValue;
                    priv.leftInput.min = priv.max;
                    priv.rightInput.min = priv.max;
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.frequency !== newValue) {
                    priv.frequency = newValue;
                    priv.leftInput.step = priv.frequency;
                    priv.rightInput.step = priv.frequency;
                }
            }
        }
        //#endregion frequency
        //#region getValues
        get values() {
            const priv = internal(this);
            return new Core.classes.Point(priv.leftInput.valueAsNumber, priv.rightInput.valueAsNumber);
        }
        set values(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Array.isArray(newValue)) {
                if (priv.leftInput.value !== newValue.first) {
                    priv.leftInput.value = newValue.first;
                }
                if (priv.rightInput && priv.rightInput.value !== newValue.last) {
                    priv.rightInput.value = newValue.last;
                }
                this.change();
            }
        }
        //#endregion getValues
        //#region firstValue
        get firstValue() {
            return internal(this).leftInput.valueAsNumber;
        }
        set leftValue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.leftInput.value !== newValue) {
                    priv.leftInput.value = newValue;
                    priv.change();
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.rightInput.value !== newValue) {
                    priv.rightInput.value = newValue;
                    priv.change();
                }
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
            const DISPLAYS = Types.DISPLAYS;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, SLIDERMODES)) {
                if (this instanceof Core.classes.ColorSlider) {
                    newValue = SLIDERMODES.NORMAL;
                }
                if (priv.mode !== newValue) {
                    priv.mode = newValue;
                    if (priv.mode === SLIDERMODES.NORMAL) {
                        priv.range.style.display = DISPLAYS.NONE;
                        priv.rightInput.style.display = DISPLAYS.NONE;
                    } else {
                        priv.range.style.display = DISPLAYS.BLOCK;
                        priv.rightInput.style.display = DISPLAYS.BLOCK;
                    }
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
            if (Tools.valueInSet(newValue, Types.ANCHORS)) {
                if (priv.toolTipsPosition !== newValue) {
                    priv.toolTipsPosition = newValue;
                    this.update();
                }
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
            if (Tools.isNumber(newValue)) {
                if (priv.decimalPrecision !== newValue) {
                    priv.decimalPrecision = newValue;
                }
            }
        }
        //#endregion toolTipsPosition
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const INPUT = Types.HTMLELEMENTS.INPUT;
            //#endregion Variables déclaration
            //#region Create Inputs
            priv.leftInput = document.createElement(INPUT);
            priv.leftInput.type = "range";
            priv.leftInput.classList.add("Control", this.themeName, "csr_default", "SliderInput");
            priv.leftInput.jsObj = this;
            htmlElement.appendChild(priv.leftInput);
            Events.bind(priv.leftInput, INPUT, this.change.bind(this));
            priv.leftInput.value = priv.values.first;

            priv.rightInput = document.createElement(INPUT);
            priv.rightInput.type = "range";
            priv.rightInput.classList.add("Control", this.themeName, "csr_default", "SliderInput");
            priv.rightInput.jsObj = this;
            htmlElement.appendChild(priv.rightInput);
            Events.bind(priv.rightInput, INPUT, this.change.bind(this));
            priv.rightInput.value = priv.values.last;
            //#endregion Create Inputs
            //#region Create Range
            priv.range = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}range`);
            priv.range.classList.add("Control", "SliderRange", this.themeName, `orientation-${this.orientation}`);
            priv.range.jsObj = this;
            htmlElement.appendChild(priv.range);
            //#endregion Create Range
            //#region Create Thumbs
            priv.leftThumb = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}thumb`);
            priv.leftThumb.classList.add("Control", this.themeName, "SliderThumb", "csr_default");
            priv.leftThumb.jsObj = this;
            htmlElement.appendChild(priv.leftThumb);

            priv.rightThumb = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}thumb`);
            priv.rightThumb.classList.add("Control", this.themeName, "SliderThumb", "csr_default");
            priv.rightThumb.jsObj = this;
            htmlElement.appendChild(priv.rightThumb);
            //#endregion Create Thumbs
            //#region Create ToolTips
            priv.leftTooltip = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}tooltip`);
            priv.leftTooltip.classList.add("Control", this.themeName, "SliderTooltip", "csr_default");
            priv.leftTooltip.jsObj = this;
            htmlElement.appendChild(priv.leftTooltip);

            priv.rightTooltip = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}tooltip`);
            priv.rightTooltip.classList.add("Control", this.themeName, "SliderTooltip", "csr_default");
            priv.rightTooltip.jsObj = this;
            htmlElement.appendChild(priv.rightTooltip);
            //#endregion Create ToolTips
            this.bindEventToHTML("onChange");
            super.loaded();
            //this.createToolTips();
            this.update();
            //this.thumbSize();
            //this.hideToolTips();
            //this.moveToolTips();
            //this.moveRange();
            this.drawTickmarks();
        }
        //#endregion loaded
        //#region thumPos
        //thumbPos(thumb) {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    const range = priv.max - priv.min;
        //    const position = (thumb.valueAsNumber - priv.min) / range * 100;
        //    const positionOffset = Math.round(priv.offset * position / 100) - priv.offset / 2;
        //    //#endregion Variables déclaration
        //    return { position: position, positionOffset: positionOffset };
        //}
        //#endregion thumPos
        //#region change
        change() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            //    if (priv.blockedThumbs && priv.mode === SLIDERMODES.RANGE) {
            //        if (document.activeElement === priv.rightInput && priv.rightInput.valueAsNumber < priv.leftInput.valueAsNumber + 5) {
            //            priv.rightInput.value = priv.leftInput.valueAsNumber + 5;
            //        }
            //        if (document.activeElement === priv.leftInput && priv.leftInput.valueAsNumber > priv.rightInput.valueAsNumber - 5) {
            //            priv.leftInput.value = priv.rightInput.valueAsNumber - 5;
            //        }
            //    }
            this.onChange.invoke();
            //    this.moveToolTips();
            //    this.moveRange();
        }
        //#endregion change
        drawTickmarks() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const cStyle = getComputedStyle(htmlElement);
            const workingArea = this.width - parseFloat(cStyle.paddingLeft) - parseFloat(cStyle.paddingRight);
            htmlElement.classList.remove("showTickmarks");
            htmlElementStyle.background = String.EMPTY;
            if (priv.showTickmarks) {
                htmlElement.classList.add("showTickmarks");
                const tickmarks = [];
                const tickPosition = priv.tickmarksPosition === TICKMARKSPOSITION.TOP ? "-18px" : priv.tickmarksPosition === TICKMARKSPOSITION.BOTTOM ? "18px" : "top";
                priv.tickmarks.forEach(tick => {
                    const x = workingArea * tick / 100 + parseFloat(cStyle.paddingLeft);
                    tickmarks.push(`linear-gradient(90deg, var(--ticks-color), var(--ticks-color)) no-repeat ${x}% ${tickPosition}`);
                });
                htmlElementStyle.background = tickmarks.join(", ");
            }
        }
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            //const workingArea = this.width - 12;
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (priv.leftInput) {
                    priv.leftInput.min = priv.min;
                    priv.leftInput.max = priv.max;
                    priv.leftInput.step = priv.frequency;
                }
                if (priv.rightInput) {
                    priv.rightInput.min = priv.min;
                    priv.rightInput.max = priv.max;
                    priv.rightInput.step = priv.frequency;
                }
                if (priv.values) {
                    priv.rightInput.value = priv.values.last;
                    priv.leftInput.value = priv.values.first;
                }
                ["horizontal", "vertical"].forEach(ori => {
                    const orientation = `orientation-${ori}`;
                    htmlElement.classList.remove(orientation);
                    priv.leftTooltip.classList.remove(orientation);
                    priv.rightTooltip.classList.remove(orientation);
                });
                Object.keys(SLIDERMODES).forEach(mode => {
                    htmlElement.classList.remove(mode);
                });
                htmlElement.classList.add(priv.mode);
                htmlElement.classList.add(`orientation-${priv.orientation}`);
                priv.leftTooltip.classList.add(`orientation-${priv.orientation}`);
                priv.rightTooltip.classList.add(`orientation-${priv.orientation}`);
            }
        }
        //#endregion update
        //#region mouseEnter
        //mouseEnter() {
        //    super.mouseEnter();
        //    this.moveToolTips();
        //}
        //#endregion mouseEnter
        //#region mouseLeave
        //mouseLeave() {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    //#endregion Variables déclaration
        //    super.mouseLeave();
        //    if (priv.showValues) {
        //        this.hideToolTips();
        //    }
        //}
        //#endregion mouseLeave
        //#region mouseWheel
        mouseWheel() {
            //#region Variables déclaration
            const priv = internal(this);
            const wheelDelta = Core.mouse.wheelDelta;
            const multiplier = wheelDelta < 0 ? -2 : 2;
            //#endregion Variables déclaration
            if (Core.keyboard.shift && priv.mode === SLIDERMODES.RANGE) {
                this.scrollBy(0, -priv.frequency * multiplier);
            } else {
                this.scrollBy(-priv.frequency * multiplier, 0);
            }
            super.mouseWheel();
            if (this.form.focusedControl !== this) {
                this.setFocus();
            }
        }
        //#endregion mouseWheel
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const shift = Core.keyboard.shift;
            //#endregion Variables déclaration
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                case VKEYSCODES.VK_UP:
                    if (shift && priv.mode === SLIDERMODES.RANGE) {
                        this.scrollBy(0, -priv.frequency);
                    } else {
                        this.scrollBy(-priv.frequency, 0);
                    }
                    break;
                case VKEYSCODES.VK_RIGHT:
                case VKEYSCODES.VK_DOWN:
                    if (shift && priv.mode === SLIDERMODES.RANGE) {
                        this.scrollBy(0, priv.frequency);
                    } else {
                        this.scrollBy(priv.frequency, 0);
                    }
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
                    if (shift && priv.mode === SLIDERMODES.RANGE) {
                        this.scrollBy(0, -priv.frequency * 2);
                    } else {
                        this.scrollBy(-priv.frequency * 2, 0);
                    }
                    break;
                case VKEYSCODES.VK_NEXT:
                    if (shift && priv.mode === SLIDERMODES.RANGE) {
                        this.scrollBy(0, priv.frequency * 2);
                    } else {
                        this.scrollBy(priv.frequency * 2, 0);
                    }
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
        //moveToolTips() {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    const VISIBLE = Types.CSSVALUES.VISIBLE;
        //    const PO = Types.CSSUNITS.PO;
        //    const PX = Types.CSSUNITS.PX;
        //    const prop = Types.CSSPROPERTIES.LEFT;
        //    //#endregion Variables déclaration
        //    if (priv.showValues) {
        //        this.thumbSize();
        //        let x;
        //        if (priv.leftToolTip) {
        //            if (this.isMouseOver) {
        //                priv.leftToolTip.style.visibility = VISIBLE;
        //            }
        //            Text.setTextNode(priv.leftToolTip, priv.leftInput.valueAsNumber.toFixed(priv.decimalPrecision));
        //            x = this.thumbPos(priv.leftInput);
        //            priv.leftToolTip.style[prop] = `calc(${x.position}${PO} - ${x.positionOffset}${PX})`;
        //        }
        //        if (priv.mode === SLIDERMODES.RANGE) {
        //            if (priv.rightInput) {
        //                if (priv.rightToolTip) {
        //                    if (this.isMouseOver) {
        //                        priv.rightToolTip.style.visibility = VISIBLE;
        //                    }
        //                    Text.setTextNode(priv.rightToolTip, priv.rightInput.valueAsNumber.toFixed(priv.decimalPrecision));
        //                    x = this.thumbPos(priv.rightInput);
        //                    priv.rightToolTip.style[prop] = `calc(${x.position}${PO} - ${x.positionOffset}${PX})`;
        //                }
        //            }
        //        }
        //    }
        //}
        //#endregion moveToolTips
        //#region createToolTips
        //createToolTips() {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    const DIV = Types.HTMLELEMENTS.DIV;
        //    const theme = this.themeName;
        //    const d = document.createElement(DIV);
        //    const customTag = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        //    const htmlElement = this.HTMLElement;
        //    //#endregion Variables déclaration
        //    this.destroyToolTips(true);
        //    let tooltip = `<${customTag}-lefttooltip class='Control SliderLeftToolTip'>${priv.leftInput ? +priv.leftInput.value : 0}<//${customTag}-lefttooltiparrow class='Control SliderLeftToolTipArrow'></${customTag}-lefttooltiparrow><${customTag}-//lefttooltiparrowfront class='Control SliderLeftToolTipArrowFront'></${customTag}-lefttooltiparrowfront></${customTag}-//lefttooltip>`;
        //    d.innerHTML = tooltip;
        //    htmlElement.appendChild(d.firstElementChild);
        //    priv.leftToolTip = htmlElement.lastElementChild;
        //    priv.leftToolTip.jsObj = this;
        //    priv.leftToolTip.classList.add(priv.toolTipsPosition, theme);
        //    priv.leftToolTip.firstElementChild.classList.add(priv.toolTipsPosition, theme);
        //    priv.leftToolTip.lastElementChild.classList.add(priv.toolTipsPosition, theme);
        //    if (priv.mode === SLIDERMODES.RANGE) {
        //        tooltip = `<${customTag}-righttooltip class='Control SliderRightToolTip'>${priv.rightInput ? priv.rightInput.value : 0}/</${customTag}-righttooltiparrow class='Control SliderRightToolTipArrow'></${customTag}-righttooltiparrow><${customTag}-//righttooltiparrowfront class='Control SliderRightToolTipArrowFront'></${customTag}-righttooltiparrowfront><//${customTag}-/righttooltip>`;
        //        d.innerHTML = tooltip;
        //        htmlElement.appendChild(d.firstElementChild);
        //        // appliquer les styles
        //        priv.rightToolTip = htmlElement.lastElementChild;
        //        priv.rightToolTip.jsObj = this;
        //        priv.rightToolTip.classList.add(priv.toolTipsPosition, theme);
        //        priv.rightToolTip.firstElementChild.classList.add(priv.toolTipsPosition, theme);
        //        priv.rightToolTip.lastElementChild.classList.add(priv.toolTipsPosition, theme);
        //    }
        //}
        //#endregion createToolTips
        //#region thumbSize
        thumbSize() {
            //#region Variables déclaration
            const priv = internal(this);
            const a = document.createElement(Types.HTMLELEMENTS.DIV);
            //#endregion Variables déclaration
            a.className = "Control thumb";
            this.HTMLElement.appendChild(a);
            priv.offset = a.offsetWidth;
            a.remove();
        }
        //#endregion thumbSize
        //#region destroyToolTips
        //destroyToolTips() {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    //#endregion Variables déclaration
        //    if (priv.leftToolTip) {
        //        this.HTMLElement.removeChild(priv.leftToolTip);
        //        priv.leftToolTip = null;
        //    }
        //    if (priv.mode === SLIDERMODES.RANGE) {
        //        if (priv.rightToolTip) {
        //            this.HTMLElement.removeChild(priv.rightToolTip);
        //            priv.rightToolTip = null;
        //        }
        //    }
        //}
        //#endregion destroyToolTips
        //#region hideToolTips
        //hideToolTips() {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    const HIDDEN = Types.CSSVALUES.HIDDEN;
        //    //#endregion Variables déclaration
        //    if (priv.leftToolTip) {
        //        priv.leftToolTip.style.visibility = HIDDEN;
        //    }
        //    if (priv.rightToolTip) {
        //        priv.rightToolTip.style.visibility = HIDDEN;
        //    }
        //}
        //#endregion hideToolTips
        //#region getTemplate
        getTemplate() {
            //#region Variables déclaration
            let html = super.getTemplate();
            const a = html.split("{orientation}");
            //#endregion Variables déclaration
            html = a.join(this.orientation);
            return html;
        }
        //#endregion getTemplate
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.destroyToolTips();
            super.destroy();
            priv.leftInput = null;
            priv.rightInput = null;
            priv.range = null;
            priv.leftToolTip = null;
            priv.rightToolTip = null;
            priv.orientation = null;
            priv.min = null;
            priv.max = null;
            priv.frequency = null;
            priv.mode = null;
            priv.showValues = null;
            priv.toolTipsPosition = null;
            priv.decimalPrecision = null;
            priv.showTickmarks = null;
            priv.tickmarks = null;
            this.onChange.destroy();
            this.onChange = null;
        }
        //#endregion destroy
        //#region moveRange
        //moveRange() {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    const PX = Types.CSSUNITS.PX;
        //    //#endregion Variables déclaration
        //    if (priv.mode === SLIDERMODES.RANGE) {
        //        let x1 = priv.leftToolTip.offsetLeft;
        //        let x2 = priv.rightToolTip.offsetLeft;
        //        if (x2 < x1 && !priv.blockedThumbs) {
        //            [x1, x2] = [x2, x1];
        //        }
        //        priv.range.style.transform = `translateX(${x1}${PX})`;
        //        priv.range.style.width = `${x2 - x1 + ~~(priv.offset * 0.5)}${PX}`;
        //        priv.range.style.display = Types.DISPLAYS.BLOCK;
        //    }
        //}
        //#endregion moveRange
        //#endregion Methods
    }
    return Slider;
    //#endregion Slider
})();
Core.classes.register(Types.CATEGORIES.COMMON, Slider);
//#endregion Slider
export { Slider };
//#region Templates
if (Core.isHTMLRenderer) {
    const SliderTpl = ["<jagui-slider id=\"{internalId}\" data-class=\"Slider\" class=\"Control Slider {theme} csr_default\">",
        "<properties>{ \"name\": \"{name}\", \"values\": [20,0], \"width\": 100, \"height\": 6 }</properties></jagui-slider>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Slider, template: SliderTpl }]);
}
//#endregion
//https://codepen.io/glitchworker/pen/XVdKqj