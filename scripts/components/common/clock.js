//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { NotifyEvent } from '/scripts/core/events.js';
import { Tools } from '/scripts/core/tools.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#endregion Import
//#region CLOCKMODES
const CLOCKMODES = Object.freeze(Object.seal({
    SIMPLE: 'simple', // ok
    DIGITAL: 'digital', // https://codepen.io/shaman_tito/pen/Ectwp ok
    FLIP: 'flip', // https://codepen.io/fuhye/pen/KKpNzwM ok
    LED: 'led', // https://codepen.io/killyson26/pen/jOORvJb ok
    DOTS: 'dots', // http://sooncountdown.com/ ok
    CIRCULAR: 'circular', // https://codepen.io/ahamed-abu-bakr/pen/YzXpOMj ok
    ROTATE: 'rotate' // https://codepen.io/zhoha/pen/VwLLEJd ou https://codepen.io/glaubersampaio/pen/vOZbPx
}));
//#endregion CLOCKMODES
//#region CLOCKTYPES
const CLOCKTYPES = Object.freeze(Object.seal({
    CLOCK: 'clock',
    COUNTDOWN: 'countdown'
}));
//#endregion CLOCKTYPES
//#region DOTSTYPES
const DOTSTYPES = Object.freeze(Object.seal({
    SQUARE: 'square',
    CIRCLE: 'circle'
}));
//#endregion DOTSTYPES
//#region DOTSANIMATIONDIRECTION
const DOTSANIMATIONDIRECTION = Object.freeze(Object.seal({
    TOLEFT: 'toleft',
    TORIGHT: 'toright',
    TOTOP: 'totop',
    TOBOTTOM: 'tobottom'
}));
//#endregion DOTSANIMATIONDIRECTION
//#region DOTSANIMATIONTYPES
const DOTSANIMATIONTYPES = Object.freeze(Object.seal({
    FADE: 'fade',
    SLIDE: 'slide',
    ROTOZOOM: 'rotozoom'
}));
//#endregion DOTSANIMATIONTYPES
//#region Clock
const Clock = (() => {
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
    //#region Class Clock
    class Clock extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.height = -1;
                props.width = -1;
                super(owner, props);
                const priv = internal(this);
                priv.startTime = null;
                priv.handle = null;
                priv.started = !1;
                priv.paused = !1;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'mode',
                    enum: CLOCKMODES,
                    forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty('mode') ? props.mode : CLOCKMODES.SIMPLE
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'type',
                    enum: CLOCKTYPES,
                    forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty('type') ? props.type : CLOCKTYPES.CLOCK
                });
                priv.showSeconds = props.hasOwnProperty('showSeconds') && Tools.isBool(props.showSeconds) ? props.showSeconds : !1;
                priv.showDays = props.hasOwnProperty('showDays') && Tools.isBool(props.showDays) ? props.showDays : !1;
                priv.showMonths = props.hasOwnProperty('showMonths') && Tools.isBool(props.showMonths) ? props.showMonths : !1;
                priv.showYears = props.hasOwnProperty('showYears') && Tools.isBool(props.showYears) ? props.showYears : !1;
                priv.use24H = Tools.getLocale().date.pm === String.EMPTY;
                priv.autoStart = props.hasOwnProperty('autoStart') && Tools.isBool(props.autoStart) ? props.autoStart : true;
                priv.alarm = props.hasOwnProperty('alarm') && Tools.isObject(props.alarm) ? props.alarm : null;
                priv.countDown = props.hasOwnProperty('countDown') && Tools.isObject(props.countDown) ? props.countDown : { seconds: 0 };
                if (priv.countDown.days && priv.countDown.days > 999) {
                    priv.countDown.days = 999;
                }
                if (priv.countDown.hours && priv.countDown.hours > 23) {
                    priv.countDown.hours = !String.isNullOrEmpty(priv.use24H) ? 12: 23;
                }
                if (priv.countDown.minutes && priv.countDown.days > 59) {
                    if (priv.countDown.days && !priv.countDown.hours) {
                        priv.countDown.hours = 0;
                    }
                    priv.countDown.minutes = 59;
                }
                if (priv.countDown.seconds && priv.countDown.seconds > 59) {
                    if (priv.countDown.days || priv.countDown.hours && ! priv.countDown.minutes) {
                        priv.countDown.minutes = 0;
                    }
                    priv.countDown.seconds = 59;
                }
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'dotsType',
                    enum: DOTSTYPES,
                    forceUpdate: true,
                    variable: priv,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const htmlElement = this.HTMLElement;
                        const elems = htmlElement.querySelectorAll(`.${priv.dotsType}`);
                        //#endregion Variables déclaration
                        if (Tools.valueInSet(newValue, DOTSTYPES)) {
                            if (priv.dotsType !== newValue) {
                                elems.forEach(elem => {
                                    elem.classList.remove(priv.dotsType);
                                });
                                htmlElement.querySelectorAll('.Clock_dots').forEach(elem => {
                                    elem.classList.remove(priv.dotsType);
                                });
                                priv.dotsType = newValue;
                                elems.forEach(elem => {
                                    elem.classList.add(priv.dotsType);
                                });
                                htmlElement.querySelectorAll('.Clock_dots').forEach(elem => {
                                    elem.classList.add(priv.dotsType);
                                });
                            }
                        }
                    },
                    value: props.hasOwnProperty('dotsType') ? props.dotsType : DOTSTYPES.SQUARE
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'dotsAnimationDirection',
                    enum: DOTSANIMATIONDIRECTION,
                    forceUpdate: true,
                    variable: priv,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const htmlElement = this.HTMLElement;
                        const elems = htmlElement.querySelectorAll('.Clock_dot');
                        //#endregion Variables déclaration
                        if (Tools.valueInSet(newValue, DOTSANIMATIONDIRECTION)) {
                            if (priv.dotsAnimationDirection !== newValue) {
                                elems.forEach(elem => {
                                    elem.classList.remove(priv.dotsAnimationDirection);
                                });
                                priv.dotsAnimationDirection = newValue;
                                if (priv.dotsAnimationType === DOTSANIMATIONTYPES.SLIDE) {
                                    elems.forEach(elem => {
                                        elem.classList.add(priv.dotsAnimationDirection);
                                    });
                                }
                            }
                        }
                    },
                    value: props.hasOwnProperty('dotsAnimationDirection') ? props.dotsAnimationDirection : DOTSANIMATIONDIRECTION.TOLEFT
                });
                priv.dotsGap = props.hasOwnProperty('dotsGap') && Tools.isNumber(props.dotsGap) ? props.dotsGap : 1;
                priv.dotsFirstColor = props.hasOwnProperty('dotsFirstColor') ? Color.parse(props.dotsFirstColor) : Color.parse('#3559ff');
                priv.dotsLastColor = props.hasOwnProperty('dotsLastColor') ? Color.parse(props.dotsLastColor) : Color.parse('#0a1854');
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'dotsAnimationType',
                    enum: DOTSANIMATIONTYPES,
                    forceUpdate: true,
                    variable: priv,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const htmlElement = this.HTMLElement;
                        const elems = htmlElement.querySelectorAll('.Clock_dot');
                        //#endregion Variables déclaration
                        if (Tools.valueInSet(newValue, DOTSANIMATIONTYPES)) {
                            if (priv.dotsAnimationType !== newValue) {
                                elems.forEach(elem => {
                                    Object.keys(DOTSANIMATIONTYPES).forEach(dat => {
                                        elem.classList.remove(dat);
                                    });
                                });
                                priv.dotsAnimationType = newValue;
                                elems.forEach(elem => {
                                    elem.classList.add(priv.dotsAnimationType);
                                });
                            }
                        }
                    },
                    value: props.hasOwnProperty('dotsAnimationType') ? props.dotsAnimationType : DOTSANIMATIONTYPES.FADE
                });
                this.onAlarm = new NotifyEvent(this);
                this.hitTest.all = !1;
                this.hitTest.mousedown = true;
                priv.dotsGap = priv.dotsGap > 2 ? 2 : priv.dotsGap;
                priv.numbers = {
                    '0': 'zero',
                    '1': 'one',
                    '2': 'two',
                    '3': 'three',
                    '4': 'four',
                    '5': 'five',
                    '6': 'six',
                    '7': 'seven',
                    '8': 'eight',
                    '9': 'nine'
                };
                //#region dotMatrix
                priv.dotMatrix = {
                    '0': [
                        [!1, !0, !0, !0, !1],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!1, !0, !0, !0, !1]
                    ],
                    '1': [
                        [!1, !0, !0, !1, !1],
                        [!0, !0, !0, !1, !1],
                        [!1, !0, !0, !1, !1],
                        [!1, !0, !0, !1, !1],
                        [!1, !0, !0, !1, !1],
                        [!1, !0, !0, !1, !1],
                        [!0, !0, !0, !0, !1]
                    ],
                    '2': [
                        [!1, !0, !0, !0, !1],
                        [!0, !0, !1, !0, !0],
                        [!1, !1, !1, !0, !0],
                        [!1, !1, !0, !0, !1],
                        [!1, !0, !0, !1, !1],
                        [!0, !0, !1, !1, !1],
                        [!0, !0, !0, !0, !0]
                    ],
                    '3': [
                        [!1, !0, !0, !0, !1],
                        [!0, !0, !1, !0, !0],
                        [!1, !1, !1, !0, !0],
                        [!1, !1, !0, !0, !1],
                        [!1, !1, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!1, !0, !0, !0, !1]
                    ],
                    '4': [
                        [!1, !1, !0, !0, !0],
                        [!1, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !0, !0, !0],
                        [!1, !1, !1, !0, !0],
                        [!1, !1, !1, !0, !0],
                        [!1, !1, !1, !0, !0]
                    ],
                    '5': [
                        [!0, !0, !0, !0, !0],
                        [!0, !0, !1, !1, !1],
                        [!0, !0, !1, !1, !1],
                        [!0, !0, !0, !0, !1],
                        [!1, !1, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!1, !0, !0, !0, !1]
                    ],
                    '6': [
                        [!1, !0, !0, !0, !1],
                        [!0, !0, !1, !1, !1],
                        [!0, !0, !0, !0, !1],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!1, !0, !0, !0, !1]
                    ],
                    '7': [
                        [!0, !0, !0, !0, !0],
                        [!1, !1, !1, !0, !0],
                        [!1, !1, !1, !0, !0],
                        [!1, !1, !0, !0, !1],
                        [!1, !0, !0, !1, !1],
                        [!0, !0, !1, !1, !1],
                        [!0, !0, !1, !1, !1]
                    ],
                    '8': [
                        [!1, !0, !0, !0, !1],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!1, !0, !0, !0, !1],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!1, !0, !0, !0, !1]
                    ],
                    '9': [
                        [!1, !0, !0, !0, !1],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!0, !0, !1, !0, !0],
                        [!1, !0, !0, !0, !0],
                        [!1, !1, !1, !0, !0],
                        [!1, !0, !0, !0, !1]
                    ]
                };
                //#endregion dotMatrix
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region CLOCKMODES
        static get CLOCKMODES() {
            return CLOCKMODES;
        }
        //#endregion CLOCKMODES
        //#region CLOCKTYPES
        static get CLOCKTYPES() {
            return CLOCKTYPES;
        }
        //#endregion CLOCKTYPES
        //#region DOTSTYPES
        static get DOTSTYPES() {
            return DOTSTYPES;
        }
        //#endregion DOTSTYPES
        //#region DOTSANIMATIONDIRECTION
        static get DOTSANIMATIONDIRECTION() {
            return DOTSANIMATIONDIRECTION;
        }
        //#endregion DOTSANIMATIONDIRECTION
        //#region DOTSANIMATIONTYPES
        static get DOTSANIMATIONTYPES() {
            return DOTSANIMATIONTYPES;
        }
        //#endregion DOTSANIMATIONTYPES
        //#region mode
        get mode() {
            return internal(this).mode;
        }
        set mode(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, CLOCKMODES)) {
                if (priv.mode !== newValue) {
                    priv.mode = newValue;
                    this.prepareContent();
                    this.update();
                }
            }
        }
        //#endregion mode
        //#region type
        get type() {
            return internal(this).type;
        }
        set type(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, CLOCKTYPES)) {
                if (priv.type !== newValue) {
                    this.reset();
                    priv.type = newValue;
                    this.update();
                }
            }
        }
        //#endregion type
        //#region showSeconds
        get showSeconds() {
            return internal(this).showSeconds;
        }
        set showSeconds(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showSeconds !== newValue) {
                    priv.showSeconds = newValue;
                    this.update();
                }
            }
        }
        //#endregion showSeconds
        //#region showDays
        get showDays() {
            return internal(this).showDays;
        }
        set showDays(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showDays !== newValue) {
                    priv.showDays = newValue;
                    this.update();
                }
            }
        }
        //#endregion showDays
        //#region showMonths
        get showMonths() {
            return internal(this).showMonths;
        }
        set showMonths(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showMonths !== newValue) {
                    priv.showMonths = newValue;
                    this.update();
                }
            }
        }
        //#endregion showMonths
        //#region showYears
        get showYears() {
            return internal(this).showYears;
        }
        set showYears(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showYears !== newValue) {
                    priv.showYears = newValue;
                    this.update();
                }
            }
        }
        //#endregion showYears
        //#region autoStart
        get autoStart() {
            return internal(this).autoStart;
        }
        set autoStart(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoStart !== newValue) {
                    priv.autoStart = newValue;
                }
            }
        }
        //#endregion autoStart
        //#region alarm
        get alarm() {
            return internal(this).alarm;
        }
        set alarm(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isObject(newValue)) {
                priv.alarm = newValue;
                this.update();
            }
        }
        //#endregion alarm
        //#region countDown
        get countDown() {
            return internal(this).countDown;
        }
        set countDown(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isObject(newValue) && (newValue.days || newValue.hours || newValue.minutes || newValue.seconds)) {
                this.stop();
                if (newValue.days) {
                    priv.countDown.days = newValue.days;
                }
                if (newValue.days) {
                    priv.countDown.days = newValue.days;
                }
                if (newValue.days) {
                    priv.countDown.days = newValue.days;
                }
                if (newValue.days) {
                    priv.countDown.days = newValue.days;
                }
                if (priv.autoStart) {
                    this.start();
                }
            }
        }
        //#endregion countDown
        //#region dotsGap
        get dotsGap() {
            return internal(this).dotsGap;
        }
        set dotsGap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.dotsGap !== newValue) {
                    newValue = Math.max(0, Math.min(newValue, 2));
                    priv.dotsGap = newValue;
                    this.HTMLElement.querySelectorAll('.Clock_digit').forEach(elem => {
                        elem.style.gridGap = `${priv.dotsGap}${PX}`;
                    });
                }
            }
        }
        //#endregion dotsGap
        //#endregion Getters / Setters
        //#region Methods
        //#region clearContent
        clearContent() {

        }
        //#endregion clearContent
        //#region prepareContent
        prepareContent() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const className = this.constructor.name;
            const tag = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            let div, div1, svg;
            const numDigits = [];
            const weekdays = document.createElement(`${tag}-weekdays`);
            const digits = document.createElement(`${tag}-digits`);
            const isClock = priv.type === CLOCKTYPES.CLOCK;
            let num = 1;
            let isDot = !1;
            const locale = Tools.getLocale();
            const countDownClassNames = [];
            const date = new Date();
            const days = (~~priv.countDown.days).toString().padStart(3, '0');
            const hours = (isClock ?
                date.getHours() - (!String.isNullOrEmpty(priv.use24H) && date.getHours() > 12 ? 12 : 0) :
                priv.countDown.hours ? (~~priv.countDown.hours) : 0).toString().padStart(2, '0');
            const minutes = (isClock ?
                date.getMinutes() :
                priv.countDown.minutes ? (~~priv.countDown.minutes) : 0).toString().padStart(2, '0');
            const seconds = (isClock ?
                date.getSeconds() :
                priv.countDown.seconds).toString().padStart(2, '0');
            const PX = Types.CSSUNITS.PX;
            const SVG = Types.SVG.SVG;
            const XMLNS = Types.SVG.XMLNS;
            let value, max;
            let c = Math.PI * 40;
            const dayTens = Math.floor(~~days / 10);
            const dayOnes = ~~days % 10;
            const hourTens = Math.floor(~~hours / 10);
            const hourOnes = ~~hours % 10;
            const minuteTens = Math.floor(~~minutes / 10);
            const minuteOnes = ~~minutes % 10;
            const secondTens = Math.floor(seconds / 10);
            const secondOnes = ~~seconds % 10;
            //#endregion Variables déclaration
            Object.keys(CLOCKMODES).forEach(key => {
                htmlElement.classList.remove(CLOCKMODES[key]);
            });
            htmlElement.classList.add(priv.type);
            this.stop();
            htmlElement.innerHTML = String.EMPTY;
            //#region weekdays
            weekdays.classList.add(`${className}_weekdays`);
            htmlElement.appendChild(weekdays);
            //#region days
            if (priv.showDays) {
                const countDownLabels = [];
                let limit = 7;
                if (!isClock) {
                    limit = 1;
                    if (~~days > 0) {
                        limit++;
                        countDownLabels.push(Tools.getLocale().date.daysLabel);
                        numDigits.push('days');
                        if (priv.mode !== CLOCKMODES.CIRCULAR) {
                            numDigits.push('days');
                            numDigits.push('days');
                            numDigits.push('dots');
                        }
                        countDownClassNames.push('days');
                    }
                    if (~~days + ~~hours > 0) {
                        limit++;
                        countDownLabels.push(Tools.getLocale().date.hoursLabel);
                        numDigits.push('hours');
                        if (priv.mode !== CLOCKMODES.CIRCULAR) {
                            numDigits.push('hours');
                            numDigits.push('dots');
                        }
                        countDownClassNames.push('hours');
                    }
                    if (~~days + ~~hours + ~~minutes > 0) {
                        limit++;
                        countDownLabels.push(Tools.getLocale().date.minutesLabel);
                        numDigits.push('minutes');
                        if (priv.mode !== CLOCKMODES.CIRCULAR) {
                            numDigits.push('minutes');
                            numDigits.push('dots');
                        }
                        countDownClassNames.push('minutes');
                    }
                    countDownLabels.push(Tools.getLocale().date.secondsLabel);
                    numDigits.push('seconds');
                    if (priv.mode !== CLOCKMODES.CIRCULAR) {
                        numDigits.push('seconds');
                    }
                    countDownClassNames.push('seconds');
                } else {
                    numDigits.push('hours');
                    if (priv.mode !== CLOCKMODES.CIRCULAR) {
                        numDigits.push('hours');
                        numDigits.push('dots');
                    }
                    numDigits.push('minutes');
                    if (priv.mode !== CLOCKMODES.CIRCULAR) {
                        numDigits.push('minutes');
                    }
                    if (priv.showSeconds) {
                        if (priv.mode !== CLOCKMODES.CIRCULAR) {
                            numDigits.push('dots');
                            numDigits.push('seconds');
                        }
                        numDigits.push('seconds');
                    }
                }
                for (let i = 0; i < limit; i++) {
                    div = document.createElement(`${tag}-day`);
                    div.innerHTML = isClock ?
                        Tools.getLocale().date.abbreviatedDayNames[i].replace('.', String.EMPTY).toUpperCase() :
                        countDownLabels[i];
                    div.classList.add(`${className}_day`);
                    if (!isClock) {
                        div.classList.add(countDownClassNames[i]);
                    }
                    if (isClock) {
                        if (date.getDay() === i) {
                            div.classList.add('active');
                        }
                        if (Tools.getLocale().date.firstDayOfWeek > 0 && i === 0) {
                            div.style.order = 1;
                        }
                    } else {
                        div.classList.add('active');
                    }
                    weekdays.appendChild(div);
                }
            }
            //#endregion days
            //#endregion weekdays
            //#region digits
            digits.classList.add(`${className}_digits`);
            htmlElement.appendChild(digits);
            if (isClock) {
                div = document.createElement(`${tag}-alarmarea`);
                div.classList.add(`${className}_alarmarea`);
                digits.appendChild(div);
                priv.snoozeElement = document.createElement(`${tag}-snooze`);
                priv.snoozeElement.classList.add(`${className}_snooze`, this.themeName);
                priv.snoozeElement.innerHTML = 'Z';
                div.appendChild(priv.snoozeElement);
                priv.alarmElement = document.createElement(`${tag}-alarm`);
                priv.alarmElement.innerHTML = `<${tag}-alarminner class="Clock_alarm_inner ${this.themeName}"></${tag}-alarminner>`;
                priv.alarmElement.classList.add(`${className}_alarm`, this.themeName, 'csr_pointer');
                div.appendChild(priv.alarmElement);
            }
            for (let i = 0; i < numDigits.length; i++) {
                isDot = !1;
                div = document.createElement(`${tag}-number`);
                if (numDigits[i] !== 'dots') {
                    div.classList.add(`${className}_digit`);
                } else {
                    isDot = true;
                    div.classList.add(`${className}_dots`);
                }
                div.classList.add(this.themeName);
                if (!isDot) {
                    div.classList.add(`${className}_${numDigits[i]}${num}`);
                }
                digits.appendChild(div);
                switch (priv.mode) {
                    //#region SIMPLE
                    case CLOCKMODES.SIMPLE:
                        switch (numDigits[i]) {
                            case 'days':
                                div.innerHTML = days[num - 1];
                                break;
                            case 'hours':
                                div.innerHTML = hours[num - 1];
                                break;
                            case 'minutes':
                                div.innerHTML = minutes[num - 1];
                                break;
                            case 'seconds':
                                div.innerHTML = seconds[num - 1];
                                break;
                        }
                        break;
                        //#endregion SIMPLE
                        //#region CIRCULAR
                    case CLOCKMODES.CIRCULAR:
                        switch (numDigits[i]) {
                            case 'days':
                                div.dataset.value = value = days;
                                max = ~~priv.countDown.days;
                                break;
                            case 'hours':
                                div.dataset.value = value = hours;
                                max = 23;
                                break;
                            case 'minutes':
                                div.dataset.value = value = minutes;
                                max = 59;
                                break;
                            case 'seconds':
                                div.dataset.value = value = seconds;
                                max = 59;
                                break;
                        }
                        svg = document.createElementNS(XMLNS, SVG);
                        div1 = document.createElementNS(XMLNS, Types.SHAPES.CIRCLE);
                        div1.classList.add('Control', 'ClockDigit_Circular_back', this.themeName);
                        div1.setAttribute('cx', '50%');
                        div1.setAttribute('cy', '50%');
                        div1.setAttribute('r', '20');
                        svg.appendChild(div1);
                        div1 = document.createElementNS(XMLNS, Types.SHAPES.CIRCLE);
                        div1.classList.add('Control', 'ClockDigit_Circular_progress', this.themeName);
                        div1.setAttribute('cx', '50%');
                        div1.setAttribute('cy', '50%');
                        div1.setAttribute('r', '20');
                        div1.setAttribute('stroke-dasharray', c);
                        div1.setAttribute('stroke-linecap', 'round');
                        div1.style.strokeDashoffset = c - ((c * ~~value) / max);
                        svg.appendChild(div1);
                        div.appendChild(svg);
                        break;
                        //#endregion CIRCULAR
                        //#region DIGITAL & LED 
                    case CLOCKMODES.DIGITAL:
                    case CLOCKMODES.LED:
                        if (!isDot) {
                            //https://codepen.io/shaman_tito/pen/Ectwp
                            value = 0;
                            switch (numDigits[i]) {
                                case 'days':
                                    value = days[num - 1];
                                    break;
                                case 'hours':
                                    value = hours[num - 1];
                                    break;
                                case 'minutes':
                                    value = minutes[num - 1];
                                    break;
                                case 'seconds':
                                    value = seconds[num - 1];
                                    break;
                            }

                            div.classList.add(`${className}_${priv.numbers[value]}`);
                            for (let j = 0; j < 7; j++) {
                                div1 = document.createElement(`${tag}-digit`);
                                div1.classList.add(`${className}_digit_d${j + 1}`, this.themeName);
                                div.appendChild(div1);
                            }
                        }
                        break;
                        //#endregion DIGITAL & LED
                        //#region ROTATE
                    case CLOCKMODES.ROTATE:
                        if (!isDot) {
                            let a = [];
                            value = 0;
                            switch (numDigits[i]) {
                                case 'days':
                                    value = days[num - 1];
                                    max = 10;
                                    break;
                                case 'hours':
                                    value = hours[num - 1];
                                    max = num === 1 ? 3 : 10;
                                    break;
                                case 'minutes':
                                    value = minutes[num - 1];
                                    max = num === 1 ? 6 : 10;
                                    break;
                                case 'seconds':
                                    value = seconds[num - 1];
                                    max = num === 1 ? 6 : 10;
                                    break;
                            }
                            for (let j = 0; j < max; j++) {
                                c = (j + 1) + ~~value;
                                if (c > max) {
                                    c -= max;
                                }
                                a[c] = j + 1;
                            }
                            div.classList.add(`${className}_wheels`);
                            for (let j = 0; j < max; j++) {
                                div1 = document.createElement(`${tag}-wheel`);
                                div1.innerHTML = j;
                                div1.classList.add(`${className}_wheel`);
                                switch (numDigits[i]) {
                                    case 'days':
                                        switch (num) {
                                            case 1:
                                                c = 864000;
                                                div1.style.animationDelay = `-${36000*hourTens + 3600*hourOnes + 600*minuteTens + 60*minuteOnes + 10*secondTens + secondOnes}s`;
                                                break;
                                            case 2:
                                                c = 3,154e+9;
                                                div1.style.animationDelay = `-${86400*dayOnes + 36000*hourTens + 3600*hourOnes + 600*minuteTens + 60*minuteOnes + 10*secondTens + secondOnes}s`;
                                                break;
                                            case 3:
                                                c = 3,154e+10;
                                                div1.style.animationDelay = `-${864000 * dayTens + 86400*dayOnes + 36000*hourTens + 3600*hourOnes + 600*minuteTens + 60*minuteOnes + 10*secondTens + secondOnes}s`;
                                                break;
                                        }
                                        div1.style.animation = `ten${a[j + 1]} ${c}s cubic-bezier(1, 0, 1, 0) infinite`;
                                        break;
                                    case 'hours':
                                        div1.style.animation = num === 1 ? 
                                            `three${a[j + 1]} 86400s cubic-bezier(1, 0, 1, 0) infinite` : 
                                            `ten${a[j + 1]} 36000s cubic-bezier(1, 0, 1, 0) infinite`;
                                        div1.style.animationDelay = num === 1 ? 
                                            `-${3600*hourOnes + 600*minuteTens + 60*minuteOnes + 10*secondTens + secondOnes}s` : 
                                            `-${600*minuteTens + 60*minuteOnes + 10*secondTens + secondOnes}s`;
                                        break;
                                    case 'minutes':
                                        div1.style.animation = num === 1 ? 
                                            `six${a[j + 1]} 3600s cubic-bezier(1, 0, 1, 0) infinite` : 
                                            `ten${a[j + 1]} 600s cubic-bezier(1, 0, 1, 0) infinite`;
                                        div1.style.animationDelay = num === 1 ? 
                                            `-${60*minuteOnes + 10*secondTens + secondOnes}s` : 
                                            `-${10 * secondTens + secondOnes}s`;
                                        break;
                                    case 'seconds':
                                        div1.style.animation = num === 1 ? 
                                            `six${a[j + 1]} 60s cubic-bezier(1, 0, 1, 0) infinite` : 
                                            `ten${a[j + 1]} 10s cubic-bezier(0.9, 0, 0.9, 0) infinite`;
                                        if (num === 1) {
                                            div1.style.animationDelay = `-${secondOnes}s`;
                                        }
                                        break;
                                }
                                if (priv.type === CLOCKTYPES.COUNTDOWN) {
                                    div1.style.animationDirection = 'reverse';
                                }
                                div.appendChild(div1);
                            }
                        }
                        break;
                        //#endregion ROTATE
                        //#region FLIP
                    case CLOCKMODES.FLIP:
                        if (!isDot) {
                            let txt;
                            let maxItem = 0;
                            switch (numDigits[i]) {
                                case 'days':
                                    txt = days[num - 1];
                                    maxItem = 10;
                                    break;
                                case 'hours':
                                    txt = hours[num - 1];
                                    maxItem = num === 1 ? 3 : 10;
                                    break;
                                case 'minutes':
                                    txt = minutes[num - 1];
                                    maxItem = 10;
                                    break;
                                case 'seconds':
                                    txt = seconds[num - 1];
                                    maxItem = 10;
                                    break;
                            }
                            this.updateFlip(div, txt);
                        }
                        break;
                        //#endregion Flip
                        //#region DOTS
                    case CLOCKMODES.DOTS:
                        if (!isDot) {
                            let matrix = priv.dotMatrix[i];
                            switch (numDigits[i]) {
                                case 'days':
                                    matrix = priv.dotMatrix[days[num - 1]];
                                    break;
                                case 'hours':
                                    matrix = priv.dotMatrix[hours[num - 1]];
                                    break;
                                case 'minutes':
                                    matrix = priv.dotMatrix[minutes[num - 1]];
                                    break;
                                case 'seconds':
                                    matrix = priv.dotMatrix[seconds[num - 1]];
                                    break;
                            }
                            div.classList.add('dots', priv.dotsType);
                            div.style.gridGap = `${priv.dotsGap}${PX}`;
                            for (let y = 0; y < 7; y++) {
                                for (let x = 0; x < 5; x++) {
                                    const dot = document.createElement(`${tag}-dot`);
                                    dot.classList.add(`${className}_dot`, priv.dotsAnimationDirection, this.themeName, priv.dotsAnimationType);
                                    //dot.style.backgroundColor = x === 0 ?
                                    //    priv.dotsFirstColor.toRGBHexString() :
                                    //    x === 4 ?
                                    //        priv.dotsLastColor.toRGBHexString() :
                                    //        Interpolation.color(priv.dotsFirstColor, priv.dotsLastColor, (x + 1) / 5).toRGBHexString();
                                    if (matrix[y][x]) {
                                        dot.classList.add('active');
                                    }
                                    div.appendChild(dot);
                                }
                            }
                        }
                        break;
                        //#endregion DOTS
                }
                if (!isDot) {
                    num++;
                    if (num > 2) {
                        num = 1;
                    }
                    if (priv.mode === CLOCKMODES.CIRCULAR) {
                        num = 1;
                    }
                }
            }
            if (numDigits.length === 1) {
                digits.style.justifyContent = Types.ALIGNS.CENTER;
            }
            if (!String.isNullOrEmpty(priv.use24H)) {
                div = document.createElement(`${tag}-meridian`);
                div.innerHTML = date.getHours() <= 12 ? locale.date.am : locale.date.pm;
                div.classList.add(`${className}_meridian`);
                digits.appendChild(div);
            }
            //#endregion digits
            htmlElement.classList.add(priv.mode);
            priv.lastDate = new Date();
        }
        //#endregion prepareContent
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.prepareContent();
            super.loaded();
            if (priv.autoStart || priv.type === CLOCKTYPES.CLOCK) {
                if (priv.alarmTime) {
                    this.alarm = priv.alarmTime;
                } else {
                    this.update();
                }
                this.start();
            }
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const date = new Date();
            const isClock = priv.type === CLOCKTYPES.CLOCK;
            const isCircular = priv.mode === CLOCKMODES.CIRCULAR;
            let days = (priv.countDown.days ? priv.countDown.days : 0).toString().padStart(3, '0');
            let hours = (isClock ?
                date.getHours() - (!String.isNullOrEmpty(priv.use24H) && date.getHours() > 12 ? 12 : 0) :
                priv.countDown.hours ? ~~priv.countDown.hours : 0).toString().padStart(2, '0');
            let minutes = (isClock ?
                date.getMinutes() :
                priv.countDown.minutes ? priv.countDown.minutes : 0).toString().padStart(2, '0');
            let seconds = (isClock ?
                date.getSeconds() :
                priv.countDown.seconds).toString().padStart(2, '0');
            const lDays = (priv.countDown.days ? priv.countDown.days : 0).toString().padStart(3, '0');
            const lHours = (isClock ?
                priv.lastDate.getHours() - (!String.isNullOrEmpty(priv.use24H) && priv.lastDate.getHours() > 12 ? 12 : 0) :
                priv.countDown.hours ? ~~priv.countDown.hours : 0).toString().padStart(2, '0');
            const lMinutes = (isClock ?
                priv.lastDate.getMinutes() :
                priv.countDown.minutes ? priv.countDown.minutes : 0).toString().padStart(2, '0');
            const lSeconds = (isClock ?
                priv.lastDate.getSeconds() :
                priv.countDown.seconds).toString().padStart(2, '0');
            const className = this.constructor.name;
            const htmlElement = this.HTMLElement;
            const days1 = htmlElement.querySelector(`.${className}_days1`);
            const days2 = htmlElement.querySelector(`.${className}_days2`);
            const days3 = htmlElement.querySelector(`.${className}_days3`);
            const hours1 = htmlElement.querySelector(`.${className}_hours1`);
            const hours2 = htmlElement.querySelector(`.${className}_hours2`);
            const minutes1 = htmlElement.querySelector(`.${className}_minutes1`);
            const minutes2 = htmlElement.querySelector(`.${className}_minutes2`);
            const seconds1 = htmlElement.querySelector(`.${className}_seconds1`);
            const seconds2 = htmlElement.querySelector(`.${className}_seconds2`);
            const func = `update${priv.mode.firstCharUpper}`;
            //#endregion Variables déclaration
            if (!priv.paused && !this.loading && !this.form.loading && this[func]) {
                if (!isClock) {
                    seconds = ~~seconds - 1;
                    if (seconds < 0) {
                        seconds = 59;
                        if (Tools.isNumber(priv.countDown.minutes)) {
                            minutes = ~~minutes - 1;
                            if (lMinutes < 0) {
                                minutes = 59;
                                if (Tools.isNumber(priv.countDown.hours)) {
                                    hours = ~~hours - 1;
                                    if (hours < 0) {
                                        hours = 23;
                                        if (Tools.isNumber(priv.countDown.days)) {
                                            days = ~~days - 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    days = days.toString().padStart(3, '0');
                    hours = hours.toString().padStart(2, '0');
                    minutes = minutes.toString().padStart(2, '0');
                    seconds = seconds.toString().padStart(2, '0');
                }
                if (days1 && lDays[0] !== days[0] || isCircular && lDays !== days) {
                    this[func](days1, !isCircular ? days[0] : days, 0, 9);
                }
                if (days2 && lDays[1] !== days[1]) {
                    this[func](days2, days[1], 0, 9);
                }
                if (days3 && lDays[2] !== days[2]) {
                    this[func](days3, days[2], 0, 9);
                }
                if (hours1) {
                    if (lHours[0] !== hours[0] || isCircular && lHours !== hours) {
                        this[func](hours1, !isCircular ? hours[0] : hours, 0, !isCircular ? (String.isNullOrEmpty(priv.use24H) ? 2 : 1) : 23);
                    }
                }
                if (hours2) {
                    if (lHours[1] !== hours[1]) {
                        this[func](hours2, hours[1], 0, String.isNullOrEmpty(priv.use24H) ? 3 : 2);
                    }
                }
                if (minutes1) {
                    if (lMinutes[0] !== minutes[0] || isCircular && lMinutes !== minutes) {
                        this[func](minutes1, !isCircular ? minutes[0] : minutes, 0, !isCircular ? 5 : 59);
                    }
                }
                if (minutes2) {
                    if (lMinutes[1] !== minutes[1]) {
                        this[func](minutes2, minutes[1], 0, 9);
                    }
                }
                if (seconds1) {
                    if (lSeconds[0] !== seconds[0] || isCircular && lSeconds !== seconds) {
                        this[func](seconds1, !isCircular ? seconds[0] : seconds, 0, !isCircular ? 5 : 59);
                    }
                }
                if (seconds2) {
                    if (priv.showSeconds && lSeconds[1] !== seconds[1]) {
                        this[func](seconds2, seconds[1], 0, 9);
                    }
                }
            }
            if (priv.alarm) {
                let elem = htmlElement.querySelector(`.${className}_alarm`);
                if (elem) {
                    elem.classList.add('active');
                    const aHours = (priv.alarm.hours - (!String.isNullOrEmpty(priv.use24H) && priv.alarm.hours > 12 ? 12 : 0)).toString().padStart(2, '0');
                    const aMinutes = priv.alarm.minutes.toString().padStart(2, '0');
                    const aSeconds = priv.alarm.seconds.toString().padStart(2, '0');
                    if (aHours === hours && aMinutes === minutes && aSeconds === seconds) {
                        elem.classList.add('on');
                        // snooze
                        elem = htmlElement.querySelector(`.${className}_snooze`);
                        elem.classList.add('active', 'csr_pointer');

                    }
                    if (elem.classList.contains('on')) {
                        this.onAlarm.invoke(this);
                    }
                }
            }
            if (!isClock) {
                if (~~days + ~~hours + ~~minutes + ~~seconds === 0) {
                    this.stop();
                } else {
                    if (priv.countDown.days) {
                        priv.countDown.days = ~~days;
                    }
                    if (priv.countDown.hours) {
                        priv.countDown.hours = ~~hours;
                    }
                    if (priv.countDown.minutes) {
                        priv.countDown.minutes = ~~minutes;
                    }
                    priv.countDown.seconds = seconds;
                }
            } else {
                priv.lastDate = date;
            }
        }
        //#endregion update
        //#region updateSimple
        updateSimple(element, value) {
            element.innerHTML = value;
        }
        //#endregion updateSimple
        //#region updateDigital
        updateDigital(element, value) {
            this.updateLed(element, value);
        }
        //#endregion updateDigital
        //#region updateLed
        updateLed(element, value) {
            //#region Variables déclaration
            const priv = internal(this);
            const className = this.constructor.name;
            //#endregion Variables déclaration
            Object.keys(priv.numbers).forEach(number => {
                element.classList.remove(`${className}_${priv.numbers[number]}`);
            });
            element.classList.add(`${className}_${priv.numbers[value]}`);
        }
        //#endregion updateLed
        //#region updateFlip
        updateFlip(element, txt, min, max) {
            //#region Variables déclaration
            const priv = internal(this);
            const className = this.constructor.name;
            const tag = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const isClock = priv.type === CLOCKTYPES.CLOCK;
            //#endregion Variables déclaration
            parentElement.innerHTML = String.EMPTY;
            for (let j = 0; j < 2; j++) {
                let value = j === 0 ? txt - (isClock ? 1 : -1) : txt;
                if (value > max) {
                    value = min;
                }
                if (value < min) {
                    value = max;
                }
                let div1 = document.createElement(`${tag}-flip`);
                div1.classList.add(`${className}_digit_flip`, this.themeName, 'Control');
                div1.classList.add(priv.numbers[j]);
                if (j === 0) {
                    div1.classList.add('before');
                }
                if (j === 1) {
                    div1.classList.add('active');
                }
                parentElement.appendChild(div1);
                let div4 = document.createElement(`${tag}-flip-p`);
                div4.classList.add(`${className}_digit_flip_p`);
                div1.appendChild(div4);
                let div2 = document.createElement(`${tag}-flip-up`);
                div2.classList.add(`${className}_digit_flip_up`, this.themeName, 'Control');
                div4.appendChild(div2);
                let div3 = document.createElement(`${tag}-flip-inn`);
                div3.innerHTML = value;
                div3.classList.add(`${className}_digit_flip_inn`, this.themeName, 'Control');
                div2.appendChild(div3);
                div2 = document.createElement(`${tag}-flip-down`);
                div2.classList.add(`${className}_digit_flip_down`, this.themeName, 'Control');
                div4.appendChild(div2);
                div3 = document.createElement(`${tag}-flip-inn`);
                div3.classList.add(`${className}_digit_flip_inn`, this.themeName, 'Control');
                div3.innerHTML = value;
                div2.appendChild(div3);
            }
        }
        //#endregion updateFlip
        //#region updateDots
        updateDots(element, value) {
            const priv = internal(this);
            const matrix = priv.dotMatrix[value];
            let i = 0;
            let elem;
            for (let y = 0; y < 7; y++) {
                for (let x = 0; x < 5; x++) {
                    elem = element.children[i];
                    if (matrix[y][x]) {
                        elem.classList.add('active');
                    } else {
                        elem.classList.remove('active');
                    }
                    i++;
                }
            }
        }
        //#endregion updateDots
        //#region updateCircular
        updateCircular(element, value, min, max) {
            //#region Variables déclaration
            const circle = element.querySelectorAll('circle')[1];
            const r = ~~circle.getAttribute('r');
            const c = Math.PI * (r * 2);
            const pct = c - ((c * ~~value) / max);
            //#endregion Variables déclaration
            circle.setAttribute('stroke-dasharray', c);
            circle.style.strokeDashoffset = pct;
            element.dataset.value = value;
        }
        //#endregion updateCircular
        //#region updateRotate
        //updateRotate() { }
        //#endregion updateRotate
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Core.mouse.event.toElement === priv.alarmElement && priv.alarmElement.classList.contains('on')) {
                this.stopAlarm();
            } else if (Core.mouse.event.toElement === priv.snoozeElement && priv.snoozeElement.classList.contains('active')) {
                this.snoozeAlarm();
            }
        }
        //#endregion mouseDown
        //#region start
        start() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.started = true;
            priv.pause = !1;
            priv.handle = setInterval(this.update.bind(this), 1000);
            if (priv.mode === CLOCKMODES.ROTATE) {
                this.clearContent();
                this.prepareContent();
            }
        }
        //#endregion start
        //#region pause
        pause() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.type === CLOCKTYPES.COUNTDOWN && priv.started) {
                priv.paused = true;
                if (priv.mode === CLOCKMODES.ROTATE) {
                    const elems = this.HTMLElement.querySelectorAll('.Clock_wheel');
                    elems.forEach(elem => {
                        elem.style.animationPlayState = 'paused';
                    });
                }
            }
        }
        //#endregion pause
        //#region stop
        stop() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.type === CLOCKTYPES.COUNTDOWN) {
                priv.started = !1;
                priv.pause = !1;
                clearInterval(priv.handle);
                if (priv.mode === CLOCKMODES.ROTATE) {
                    const elems = this.HTMLElement.querySelectorAll('.Clock_wheel');
                    elems.forEach(elem => {
                        elem.style.animationPlayState = 'paused';
                    });
                }
            }
        }
        //#endregion stop
        //#region resume
        resume() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.type === CLOCKTYPES.COUNTDOWN && priv.started) {
                priv.paused = !1;
                if (priv.mode === CLOCKMODES.ROTATE) {
                    const elems = this.HTMLElement.querySelectorAll('.Clock_wheel');
                    elems.forEach(elem => {
                        elem.style.animationPlayState = 'running';
                    });
                }
            }
        }
        //#endregion resume
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.startTime = null;
            priv.handle = null;
            priv.started = null;
            priv.paused = null;
            priv.mode = null;
            priv.type = null;
            priv.showSeconds = null;
            priv.showDays = null;
            priv.showMonths = null;
            priv.showYears = null;
            priv.autoStart = null;
            super.destroy();
        }
        //#endregion destroy
        //#region stopAlarm
        stopAlarm() {
            //#region Variables déclaration
            const priv = internal(this);
            const className = this.constructor.name;
            const htmlElement = this.HTMLElement;
            const alarm = htmlElement.querySelector(`.${className}_alarm`);
            const snooze = htmlElement.querySelector(`.${className}_snooze`);
            //#endregion Variables déclaration
            alarm.classList.remove('on', 'active');
            snooze.classList.remove('active');
            priv.alarm = null;
        }
        //#endregion stopAlarm
        //#region snoozeAlarm
        snoozeAlarm() {
            //#region Variables déclaration
            const priv = internal(this);
            const className = this.constructor.name;
            //#endregion Variables déclaration
            const htmlElement = this.HTMLElement;
            const snooze = htmlElement.querySelector(`.${className}_snooze`);
            const alarm = htmlElement.querySelector(`.${className}_alarm`);
            priv.alarm = new Date(Date.now());
            priv.alarm = priv.alarm.addMinutes(10);
            if (!String.isNullOrEmpty(priv.use24H) && priv.alarm.getHours() > 12) {
                priv.alarm = priv.alarm.addHours(-12);
            }
            alarm.classList.remove('on');
            snooze.classList.remove('active');
        }
        //#endregion snoozeAlarm
        //#endregion Methods
    }
    return Clock;
    //#endregion Clock
})();
Object.seal(Clock);
Core.classes.register(Types.CATEGORIES.COMMON, Clock);
//#endregion Clock
//#region Templates
if (Core.isHTMLRenderer) {
    const ClockTpl = ['<jagui-clock id="{internalId}" data-class="Clock" class="Control Clock {theme}">',
        '<properties>{ "name": "{name}", "mode": "simple", "showSeconds": true }</properties></jagui-clock>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Clock, template: ClockTpl }]);
}
//#endregion Templates
export { Clock };
/*
 *https://codepen.io/Leul-Dev/pen/MWYNmav -> Datetime chooser
 *https://codepen.io/vAhyThe/pen/ZEYjqrj -> dot
 *https://codepen.io/jxglwdco/pen/LYExqOR -> dot
 *https://codepen.io/sandeep-krishna/pen/xxxyQbX -> three js
 *
 *
*/