﻿//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Color } from '/scripts/core/color.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion Import
//#region CLOCKMODES
const CLOCKMODES = Object.freeze(Object.seal({
    SIMPLE: 'simple',
    DIGITAL: 'digital',
    FLIP: 'flip',
    LED: 'led',
    DOTS: 'dots',
    CIRCULAR: 'circular',
    ROTATE: 'rotate'
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
//#region Class Clock
class Clock extends ThemedControl {
    //#region Private fields
    #started = !1;
    #paused = !1;
    #showSeconds;
    #showDays;
    #showDate;
    #use24H;
    #autoStart;
    #alarm;
    #countDown;
    #dotsGap;
    #dotsFirstColor;
    #dotsLastColor;
    #numbers = {
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
    #dotMatrix = {
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
    #mode;
    #type;
    #dotsType;
    #dotsAnimationDirection;
    #dotsAnimationType;
    #showMonths;
    #showYears;
    #snoozeElement;
    #alarmElement;
    #lastDate;
    #alarmTime;
    #pause;
    #handle;
    //#endregion dotMatrix
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.height = -1;
            props.width = -1;
            props.hitTest = { mouseUp: !1 };
            super(owner, props);
            this.#showSeconds = props.hasOwnProperty('showSeconds') && core.tools.isBool(props.showSeconds)
                    ? props.showSeconds : !1;
            this.#showDays = props.hasOwnProperty('showDays') && core.tools.isBool(props.showDays) ? props.showDays : !1;
            this.#showDate = props.hasOwnProperty('showDate') && core.tools.isBool(props.showDate) ? props.showDate : !0;
            this.#use24H = core.tools.getLocale().date.pm === String.EMPTY;
            this.#autoStart = props.hasOwnProperty('autoStart') && core.tools.isBool(props.autoStart)
                    ? props.autoStart : !0;
            this.#alarm = props.hasOwnProperty('alarm') && core.tools.isObject(props.alarm) ? props.alarm : null;
            this.#countDown = props.hasOwnProperty('countDown') && core.tools.isObject(props.countDown)
                    ? props.countDown : { seconds: 0 };
            this.#dotsGap = props.hasOwnProperty('dotsGap') && core.tools.isNumber(props.dotsGap)
                    ? Math.min(props.dotsGap, 2) : 1;
            this.#dotsFirstColor = props.hasOwnProperty('dotsFirstColor')
                    ? Color.parse(props.dotsFirstColor) : Color.parse('#3559ff');
            this.#dotsLastColor = props.hasOwnProperty('dotsLastColor')
                    ? Color.parse(props.dotsLastColor) : Color.parse('#0a1854');
            this.#countDown.days && this.#countDown.days > 999 && (this.#countDown.days = 999);
            if (this.#countDown.hours && this.#countDown.hours > 23) {
                this.#countDown.hours = !String.isNullOrEmpty(this.#use24H) ? 12 : 23;
            }
            if (this.#countDown.minutes && this.#countDown.days > 59) {
                if (this.#countDown.days && !this.#countDown.hours) {
                    this.#countDown.hours = 0;
                }
                this.#countDown.minutes = 59;
            }
            if (this.#countDown.seconds && this.#countDown.seconds > 59) {
                if (this.#countDown.days || this.#countDown.hours && !this.#countDown.minutes) {
                    this.#countDown.minutes = 0;
                }
                this.#countDown.seconds = 59;
            }
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'mode',
                enum: CLOCKMODES,
                forceUpdate: !0,
                value: props.hasOwnProperty('mode') ? props.mode : CLOCKMODES.SIMPLE,
                setter: function (newValue) {
                    if (core.tools.valueInSet(newValue, CLOCKMODES) && this.#mode !== newValue) {
                        this.#mode = newValue;
                        this.prepareContent();
                        this.update();
                    }
                }
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'type',
                enum: CLOCKTYPES,
                forceUpdate: !0,
                value: props.hasOwnProperty('type') ? props.type : CLOCKTYPES.CLOCK,
                setter: function (newValue) {
                    if (core.tools.valueInSet(newValue, CLOCKTYPES) && this.#type !== newValue) {
                        this.reset();
                        this.#type = newValue;
                        this.update();
                    }
                }
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'dotsType',
                enum: DOTSTYPES,
                forceUpdate: !0,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const htmlElement = this.HTMLElement;
                    const elems = htmlElement.querySelectorAll(`.${this.#dotsType}`);
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, DOTSTYPES)) {
                        if (this.#dotsType !== newValue) {
                            elems.forEach(elem => {
                                elem.classList.remove(this.#dotsType);
                            });
                            htmlElement.querySelectorAll('.Clock_dots').forEach(elem => {
                                elem.classList.remove(this.#dotsType);
                            });
                            this.#dotsType = newValue;
                            elems.forEach(elem => {
                                elem.classList.add(this.#dotsType);
                            });
                            htmlElement.querySelectorAll('.Clock_dots').forEach(elem => {
                                elem.classList.add(this.#dotsType);
                            });
                        }
                    }
                },
                value: props.hasOwnProperty('dotsType') ? props.dotsType : DOTSTYPES.SQUARE
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'dotsAnimationDirection',
                enum: DOTSANIMATIONDIRECTION,
                forceUpdate: !0,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const htmlElement = this.HTMLElement;
                    const elems = htmlElement.querySelectorAll('.Clock_dot');
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, DOTSANIMATIONDIRECTION)) {
                        if (this.#dotsAnimationDirection !== newValue) {
                            elems.forEach(elem => {
                                elem.classList.remove(this.#dotsAnimationDirection);
                            });
                            this.#dotsAnimationDirection = newValue;
                            this.#dotsAnimationType === DOTSANIMATIONTYPES.SLIDE
                                && elems.forEach(elem => {
                                    elem.classList.add(this.#dotsAnimationDirection);
                                });
                        }
                    }
                },
                value: props.hasOwnProperty('dotsAnimationDirection')
                    ? props.dotsAnimationDirection : DOTSANIMATIONDIRECTION.TOLEFT
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'dotsAnimationType',
                enum: DOTSANIMATIONTYPES,
                forceUpdate: !0,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const htmlElement = this.HTMLElement;
                    const elems = htmlElement.querySelectorAll('.Clock_dot');
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, DOTSANIMATIONTYPES)) {
                        if (this.#dotsAnimationType !== newValue) {
                            elems.forEach(elem => {
                                Object.keys(DOTSANIMATIONTYPES).forEach(dat => {
                                    elem.classList.remove(dat);
                                });
                            });
                            this.#dotsAnimationType = newValue;
                            elems.forEach(elem => {
                                elem.classList.add(this.#dotsAnimationType);
                            });
                        }
                    }
                },
                value: props.hasOwnProperty('dotsAnimationType') ? props.dotsAnimationType : DOTSANIMATIONTYPES.FADE
            });
            this.createEventsAndBind(['onAlarm', 'onCountdownEnd', 'onCountdownEnd'], props);
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
    //#region showSeconds
    get showSeconds() {
        return this.#showSeconds;
    }
    set showSeconds(newValue) {
        if (core.tools.isBool(newValue) && this.#showSeconds !== newValue) {
            this.#showSeconds = newValue;
            this.update();
        }
    }
    //#endregion showSeconds
    //#region showDays
    get showDays() {
        return this.#showDays;
    }
    set showDays(newValue) {
        if (core.tools.isBool(newValue) && this.#showDays !== newValue) {
            this.#showDays = newValue;
            this.update();
        }
    }
    //#endregion showDays
    //#region showMonths
    get showMonths() {
        return this.#showMonths;
    }
    set showMonths(newValue) {
        if (core.tools.isBool(newValue) && this.#showMonths !== newValue) {
            this.#showMonths = newValue;
            this.update();
        }
    }
    //#endregion showMonths
    //#region showYears
    get showYears() {
        return this.#showYears;
    }
    set showYears(newValue) {
        if (core.tools.isBool(newValue) && this.#showYears !== newValue) {
            this.#showYears = newValue;
            this.update();
        }
    }
    //#endregion showYears
    //#region autoStart
    get autoStart() {
        return this.#autoStart;
    }
    set autoStart(newValue) {
        core.tools.isBool(newValue) && this.#autoStart !== newValue && (this.#autoStart = newValue);
    }
    //#endregion autoStart
    //#region alarm
    get alarm() {
        return this.#alarm;
    }
    set alarm(newValue) {
        if (core.tools.isObject(newValue)) {
            this.#alarm = newValue;
            this.update();
        }
    }
    //#endregion alarm
    //#region countDown
    get countDown() {
        return this.#countDown;
    }
    set countDown(newValue) {
        if (core.tools.isObject(newValue) && (newValue.days || newValue.hours || newValue.minutes || newValue.seconds)) {
            this.stop();
            newValue.days && (this.#countDown.days = newValue.days);
            newValue.days && (this.#countDown.days = newValue.days);
            newValue.days && (this.#countDown.days = newValue.days);
            newValue.days && (this.#countDown.days = newValue.days);
            this.#autoStart && this.start();
        }
    }
    //#endregion countDown
    //#region dotsGap
    get dotsGap() {
        return this.#dotsGap;
    }
    set dotsGap(newValue) {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && this.#dotsGap !== newValue) {
            newValue = Math.max(0, Math.min(newValue, 2));
            this.#dotsGap = newValue;
            this.HTMLElement.querySelectorAll('.Clock_digit').forEach(elem => {
                elem.style.gridGap = `${this.#dotsGap}${PX}`;
            });
        }
    }
    //#endregion dotsGap
    //#endregion Getters / Setters
    //#region Methods
    //#region clearContent
    clearContent() {
        this.HTMLElement.innerHTML = String.EMPTY;
    }
    //#endregion clearContent
    //#region prepareContent
    prepareContent() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const className = this.constructor.name;
        const tag = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        let div, div1, svg;
        const numDigits = [];
        const weekdays = document.createElement(`${tag}-weekdays`);
        const currentDate = document.createElement(`${tag}-currentdate`);
        const digits = document.createElement(`${tag}-digits`);
        const isClock = this.#type === CLOCKTYPES.CLOCK;
        let num = 1;
        let isDot = !1;
        const locale = core.tools.getLocale();
        const countDownClassNames = [];
        const date = new Date();
        const days = (int(this.#countDown.days)).toString().padStart(3, '0');
        const hours = (isClock ?
            date.getHours() - (!String.isNullOrEmpty(this.#use24H) && date.getHours() > 12 ? 12 : 0) :
            this.#countDown.hours ? (int(this.#countDown.hours)) : 0).toString().padStart(2, '0');
        const minutes = (isClock ?
            date.getMinutes() :
            this.#countDown.minutes ? (int(this.#countDown.minutes)) : 0).toString().padStart(2, '0');
        const seconds = (isClock ?
            date.getSeconds() :
            this.#countDown.seconds).toString().padStart(2, '0');
        const PX = core.types.CSSUNITS.PX;
        const SVG = core.types.SVG.SVG;
        const XMLNS = core.types.SVG.XMLNS;
        let value, max, h;
        const c = Math.PI * 40;
        //#endregion Variables déclaration
        Object.keys(CLOCKMODES).forEach(key => {
            htmlElement.classList.remove(CLOCKMODES[key]);
        });
        htmlElement.classList.add(this.#type);
        this.stop();
        htmlElement.innerHTML = String.EMPTY;
        //#region weekdays
        weekdays.classList.add(`${className}_weekdays`);
        htmlElement.appendChild(weekdays);
        //#region days
        if (this.#showDays) {
            const countDownLabels = [];
            let limit = 7;
            if (!isClock) {
                limit = 1;
                if (int(days) > 0) {
                    limit++;
                    countDownLabels.push(core.tools.getLocale().date.daysLabel);
                    numDigits.push('days');
                    if (this.#mode !== CLOCKMODES.CIRCULAR) {
                        numDigits.push('days');
                        numDigits.push('days');
                        numDigits.push('dots');
                    }
                    countDownClassNames.push('days');
                }
                if (int(days + hours) > 0) {
                    limit++;
                    countDownLabels.push(core.tools.getLocale().date.hoursLabel);
                    numDigits.push('hours');
                    if (this.#mode !== CLOCKMODES.CIRCULAR) {
                        numDigits.push('hours');
                        numDigits.push('dots');
                    }
                    countDownClassNames.push('hours');
                }
                if (int(days + hours + minutes) > 0) {
                    limit++;
                    countDownLabels.push(core.tools.getLocale().date.minutesLabel);
                    numDigits.push('minutes');
                    if (this.#mode !== CLOCKMODES.CIRCULAR) {
                        numDigits.push('minutes');
                        numDigits.push('dots');
                    }
                    countDownClassNames.push('minutes');
                }
                countDownLabels.push(core.tools.getLocale().date.secondsLabel);
                numDigits.push('seconds');
                if (this.#mode !== CLOCKMODES.CIRCULAR) {
                    numDigits.push('seconds');
                }
                countDownClassNames.push('seconds');
            } else {
                numDigits.push('hours');
                if (this.#mode !== CLOCKMODES.CIRCULAR) {
                    numDigits.push('hours');
                    numDigits.push('dots');
                }
                numDigits.push('minutes');
                if (this.#mode !== CLOCKMODES.CIRCULAR) {
                    numDigits.push('minutes');
                }
                if (this.#showSeconds) {
                    if (this.#mode !== CLOCKMODES.CIRCULAR) {
                        numDigits.push('dots');
                        numDigits.push('seconds');
                    }
                    numDigits.push('seconds');
                }
            }
            for (let i = 0; i < limit; i++) {
                div = document.createElement(`${tag}-day`);
                div.innerHTML = isClock ?
                    core.tools.getLocale().date.abbreviatedDayNames[i].replace('.', String.EMPTY).toUpperCase() :
                    countDownLabels[i];
                div.classList.add(`${className}_day`);
                !isClock && div.classList.add(countDownClassNames[i]);
                if (isClock) {
                    date.getDay() === i && div.classList.add('active');
                    core.tools.getLocale().date.firstDayOfWeek > 0 && i === 0 && (div.style.order = 1);
                } else {
                    div.classList.add('active');
                }
                weekdays.appendChild(div);
            }
        }
        //#endregion days
        //#endregion weekdays
        //#region DayMonthYear
        if (this.#showDate && isClock) {
            currentDate.classList.add(`${className}_currentdate`);
            currentDate.innerHTML = date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.longDate);
            htmlElement.appendChild(currentDate);
        }
        //#endregion DayMonthYear
        //#region digits
        digits.classList.add(`${className}_digits`);
        htmlElement.appendChild(digits);
        if (isClock) {
            div = document.createElement(`${tag}-alarmarea`);
            div.classList.add(`${className}_alarmarea`);
            digits.appendChild(div);
            this.#snoozeElement = document.createElement(`${tag}-snooze`);
            this.#snoozeElement.classList.add(`${className}_snooze`, this.themeName);
            this.#snoozeElement.innerHTML = 'Z';
            div.appendChild(this.#snoozeElement);
            this.#alarmElement = document.createElement(`${tag}-alarm`);
            this.#alarmElement.innerHTML = `<${tag}-alarminner class="Clock_alarm_inner ${this.themeName}"></${tag}-alarminner>`;
            this.#alarmElement.classList.add(`${className}_alarm`, this.themeName, 'csr_pointer');
            div.appendChild(this.#alarmElement);
        }
        for (let i = 0; i < numDigits.length; i++) {
            isDot = !1;
            div = document.createElement(`${tag}-number`);
            if (numDigits[i] !== 'dots') {
                div.classList.add(`${className}_digit`);
            } else {
                isDot = !0;
                div.classList.add(`${className}_dots`);
            }
            div.classList.add(this.themeName);
            !isDot && div.classList.add(`${className}_${numDigits[i]}${num}`);
            digits.appendChild(div);
            h = parseFloat(getComputedStyle(div).height);
            switch (this.#mode) {
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
                            max = int(this.#countDown.days);
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
                    div1 = document.createElementNS(XMLNS, 'circle');
                    div1.classList.add('Control', 'ClockDigit_Circular_back', this.themeName);
                    div1.setAttribute('cx', '50%');
                    div1.setAttribute('cy', '50%');
                    div1.setAttribute('r', '20');
                    svg.appendChild(div1);
                    div1 = document.createElementNS(XMLNS, 'circle');
                    div1.classList.add('Control', 'ClockDigit_Circular_progress', this.themeName);
                    div1.setAttribute('cx', '50%');
                    div1.setAttribute('cy', '50%');
                    div1.setAttribute('r', '20');
                    div1.setAttribute('stroke-dasharray', c);
                    div1.setAttribute('stroke-linecap', 'round');
                    div1.style.strokeDashoffset = c - ((c * int(value)) / max);
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

                        div.classList.add(`${className}_${this.#numbers[value]}`);
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
                        value = 0;
                        switch (numDigits[i]) {
                            case 'days':
                                value = int(days[num - 1]);
                                max = 9;
                                break;
                            case 'hours':
                                value = int(hours[num - 1]);
                                max = num === 1 ? 2 : 9;
                                break;
                            case 'minutes':
                                value = int(minutes[num - 1]);
                                max = num === 1 ? 5 : 9;
                                break;
                            case 'seconds':
                                value = int(seconds[num - 1]);
                                max = num === 1 ? 5 : 9;
                                break;
                        }
                        div.classList.add(`${className}_wheels`);
                        for (let j = max; j >= 0; j--) {
                            div1 = document.createElement(`${tag}-wheel`);
                            div1.innerHTML = j;
                            div1.classList.add(`${className}_wheel`);
                            div.appendChild(div1);
                            j === value && (div.style.transform = `translateY(${-((max * h) - (j * h))}${PX})`);
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
                        let matrix = this.#dotMatrix[i];
                        switch (numDigits[i]) {
                            case 'days':
                                matrix = this.#dotMatrix[days[num - 1]];
                                break;
                            case 'hours':
                                matrix = this.#dotMatrix[hours[num - 1]];
                                break;
                            case 'minutes':
                                matrix = this.#dotMatrix[minutes[num - 1]];
                                break;
                            case 'seconds':
                                matrix = this.#dotMatrix[seconds[num - 1]];
                                break;
                        }
                        div.classList.add('dots', this.#dotsType);
                        div.style.gridGap = `${this.#dotsGap}${PX}`;
                        for (let y = 0; y < 7; y++) {
                            for (let x = 0; x < 5; x++) {
                                const dot = document.createElement(`${tag}-dot`);
                                dot.classList.add(`${className}_dot`, this.#dotsAnimationDirection, this.themeName, this.#dotsAnimationType);
                                //dot.style.backgroundColor = x === 0 ?
                                //    this.#dotsFirstColor.toRGBHexString() :
                                //    x === 4 ?
                                //        this.#dotsLastColor.toRGBHexString() :
                                //        Interpolation.color(this.#dotsFirstColor, this.#dotsLastColor, (x + 1) / 5).toRGBHexString();
                                matrix[y][x] && dot.classList.add('active');
                                div.appendChild(dot);
                            }
                        }
                    }
                    break;
                //#endregion DOTS
            }
            if (!isDot) {
                num++;
                num > 2 && (num = 1);
                this.#mode === CLOCKMODES.CIRCULAR && (num = 1);
            }
        }
        numDigits.length === 1 && (digits.style.justifyContent = core.types.ALIGNS.CENTER);
        if (!String.isNullOrEmpty(this.#use24H)) {
            div = document.createElement(`${tag}-meridian`);
            div.innerHTML = date.getHours() <= 12 ? locale.date.am : locale.date.pm;
            div.classList.add(`${className}_meridian`);
            digits.appendChild(div);
        }
        //#endregion digits
        htmlElement.classList.add(this.#mode);
        this.#lastDate = new Date();
    }
    //#endregion prepareContent
    //#region loaded
    loaded() {
        this.prepareContent();
        super.loaded();
        if (this.#autoStart || this.#type === CLOCKTYPES.CLOCK) {
            this.#alarmTime ? this.alarm = this.#alarmTime : this.update();
            this.start();
        }
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const date = new Date();
        const isClock = this.#type === CLOCKTYPES.CLOCK;
        const isCircular = this.#mode === CLOCKMODES.CIRCULAR;
        let days = (this.#countDown.days ? this.#countDown.days : 0).toString().padStart(3, '0');
        let hours = (isClock ?
            date.getHours() - (!String.isNullOrEmpty(this.#use24H) && date.getHours() > 12 ? 12 : 0) :
            this.#countDown.hours ? int(this.#countDown.hours) : 0).toString().padStart(2, '0');
        let minutes = (isClock ?
            date.getMinutes() :
            this.#countDown.minutes ? this.#countDown.minutes : 0).toString().padStart(2, '0');
        let seconds = (isClock ?
            date.getSeconds() :
            this.#countDown.seconds).toString().padStart(2, '0');
        const lDays = (this.#countDown.days ? this.#countDown.days : 0).toString().padStart(3, '0');
        const lHours = (isClock ?
            this.#lastDate.getHours() - (!String.isNullOrEmpty(this.#use24H) && this.#lastDate.getHours() > 12 ? 12 : 0) :
            this.#countDown.hours ? int(this.#countDown.hours) : 0).toString().padStart(2, '0');
        const lMinutes = (isClock ?
            this.#lastDate.getMinutes() :
            this.#countDown.minutes ? this.#countDown.minutes : 0).toString().padStart(2, '0');
        const lSeconds = (isClock ?
            this.#lastDate.getSeconds() :
            this.#countDown.seconds).toString().padStart(2, '0');
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
        const func = `update${this.#mode.firstCharUpper}`;
        //#endregion Variables déclaration
        if (!this.#paused && !this.loading && !this.form.loading && this[func]) {
            if (!isClock) {
                seconds = int(seconds) - 1;
                if (seconds < 0) {
                    seconds = 59;
                    if (core.tools.isNumber(this.#countDown.minutes)) {
                        minutes = int(minutes) - 1;
                        if (minutes < 0) {
                            minutes = 59;
                            if (core.tools.isNumber(this.#countDown.hours)) {
                                hours = int(hours) - 1;
                                if (hours < 0) {
                                    hours = 23;
                                    core.tools.isNumber(this.#countDown.days) && (days = int(days) - 1);
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
            days1 && lDays[0] !== days[0] || isCircular && lDays !== days
                && this[func](days1, !isCircular ? days[0] : days, 0, 9);
            days2 && lDays[1] !== days[1] && this[func](days2, days[1], 0, 9);
            days3 && lDays[2] !== days[2] && this[func](days3, days[2], 0, 9);
            hours1 && lHours[0] !== hours[0] || isCircular && lHours !== hours
                && this[func](hours1, !isCircular ? hours[0] : hours, 0, !isCircular
                    ? (String.isNullOrEmpty(this.#use24H) ? 2 : 1) : 23);
            hours2 && lHours[1] !== hours[1]
                && this[func](hours2, hours[1], 0, String.isNullOrEmpty(this.#use24H) ? 3 : 2);
            minutes1 && lMinutes[0] !== minutes[0] || isCircular && lMinutes !== minutes
                && this[func](minutes1, !isCircular ? minutes[0] : minutes, 0, !isCircular ? 5 : 59);
            minutes2 && lMinutes[1] !== minutes[1] && this[func](minutes2, minutes[1], 0, 9);
            seconds1 && lSeconds[0] !== seconds[0] || isCircular && lSeconds !== seconds
                && this[func](seconds1, !isCircular ? seconds[0] : seconds, 0, !isCircular ? 5 : 59);
            seconds2 && this.#showSeconds && lSeconds[1] !== seconds[1] && this[func](seconds2, seconds[1], 0, 9);
        }
        if (this.#alarm) {
            let elem = htmlElement.querySelector(`.${className}_alarm`);
            if (elem) {
                elem.classList.add('active');
                const aHours = (this.#alarm.hours -
                    (!String.isNullOrEmpty(this.#use24H) && this.#alarm.hours > 12 ? 12 : 0)).toString().padStart(2, '0');
                const aMinutes = this.#alarm.minutes.toString().padStart(2, '0');
                const aSeconds = this.#alarm.seconds.toString().padStart(2, '0');
                if (aHours === hours && aMinutes === minutes && aSeconds === seconds) {
                    elem.classList.add('on');
                    // snooze
                    elem = htmlElement.querySelector(`.${className}_snooze`);
                    elem.classList.add('active', 'csr_pointer');

                }
                elem.classList.contains('on') && this.onAlarm.invoke(this);
            }
        }
        if (!isClock) {
            if (int(days + hours + minutes + seconds) === 0) {
                this.stop();
                this.onCountdownEnd.invoke(this);
            } else {
                this.#countDown.days && (this.#countDown.days = int(days));
                this.#countDown.hours && (this.#countDown.hours = int(hours));
                this.#countDown.minutes && (this.#countDown.minutes = int(minutes));
                this.#countDown.seconds = seconds;
            }
        } else {
            htmlElement.querySelector('.Clock_day.active').classList.remove('active');
            Convert.nodeListToArray(htmlElement.querySelectorAll('.Clock_day')).forEach(day => {
                if (day.innerHTML ===
                    core.tools.getLocale().date.abbreviatedDayNames[date.getDay()].replace('.', String.EMPTY).toUpperCase()) {
                    day.classList.add('active');
                }
            });
            htmlElement.querySelector('.Clock_currentdate').innerHTML =
                date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.longDate);
            this.#lastDate = date;
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
        const className = this.constructor.name;
        //#endregion Variables déclaration
        Object.keys(this.#numbers).forEach(number => {
            element.classList.remove(`${className}_${this.#numbers[number]}`);
        });
        element.classList.add(`${className}_${this.#numbers[value]}`);
    }
    //#endregion updateLed
    //#region updateFlip
    updateFlip(element, txt, min, max) {
        //#region Variables déclaration
        const className = this.constructor.name;
        const tag = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        const isClock = this.#type === CLOCKTYPES.CLOCK;
        //#endregion Variables déclaration
        element.innerHTML = String.EMPTY;
        for (let j = 0; j < 2; j++) {
            let value = j === 0 ? txt - (isClock ? 1 : -1) : txt;
            value > max && (value = min);
            value < min && (value = max);
            let div1 = document.createElement(`${tag}-flip`);
            div1.classList.add(`${className}_digit_flip`, this.themeName, 'Control');
            div1.classList.add(this.#numbers[j]);
            j === 0 && div1.classList.add('before');
            j === 1 && div1.classList.add('active');
            element.appendChild(div1);
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
        //#region Variables déclaration
        const matrix = this.#dotMatrix[value];
        let i = 0;
        let elem;
        //#endregion Variables déclaration
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
                elem = element.children[i];
                matrix[y][x] ? elem.classList.add('active') : elem.classList.remove('active');
                i++;
            }
        }
    }
    //#endregion updateDots
    //#region updateCircular
    updateCircular(element, value, min, max) {
        //#region Variables déclaration
        const circle = element.querySelectorAll('circle')[1];
        const r = int(circle.getAttribute('r'));
        const c = Math.PI * (r * 2);
        const pct = c - ((c * int(value)) / max);
        //#endregion Variables déclaration
        circle.setAttribute('stroke-dasharray', c);
        circle.style.strokeDashoffset = pct;
        element.dataset.value = value;
    }
    //#endregion updateCircular
    //#region updateRotate
    updateRotate(element, value, min, max) {
        //#region Variables déclaration
        const isClock = this.#type === CLOCKTYPES.CLOCK;
        const PX = core.types.CSSUNITS.PX;
        const h = parseFloat(getComputedStyle(element.parentNode).height);
        //#endregion Variables déclaration
        value = max === 3
            ? -((element.children.length - 1) - int(value)) * h
            : isClock ? -(max * h) + (h * int(value)) : -((max * h) - (int(value) * h));
        element.style.transform = `translateY(${value}${PX})`;
    }
    //#endregion updateRotate
    //#region mouseDown
    mouseDown() {
        if (core.mouse.event.toElement === this.#alarmElement && this.#alarmElement.classList.contains('on')) {
            this.stopAlarm();
        } else if (core.mouse.event.toElement === this.#snoozeElement && this.#snoozeElement.classList.contains('active')) {
            this.snoozeAlarm();
        }
    }
    //#endregion mouseDown               
    //#region start
    start() {
        this.#started = !0;
        this.#pause = !1;
        this.#handle = setInterval(this.update.bind(this), 1000);
    }
    //#endregion start
    //#region pause
    pause() {
        this.#type === CLOCKTYPES.COUNTDOWN && this.#started && (this.#paused = !0);
    }
    //#endregion pause
    //#region stop
    stop() {
        if (this.#type === CLOCKTYPES.COUNTDOWN) {
            this.#started = !1;
            this.#pause = !1;
            clearInterval(this.#handle);
        }
    }
    //#endregion stop
    //#region resume
    resume() {
        this.#type === CLOCKTYPES.COUNTDOWN && this.#started && (this.#paused = !1);
    }
    //#endregion resume
    //#region destroy
    destroy() {
        this.#dotsFirstColor.destroy();
        this.#dotsLastColor.destroy();
        this.unBindAndDestroyEvents(['onAlarm', 'onCountdownEnd', 'onCountdownEnd']);
        super.destroy();
    }
    //#endregion destroy
    //#region stopAlarm
    stopAlarm() {
        //#region Variables déclaration
        const className = this.constructor.name;
        const htmlElement = this.HTMLElement;
        const alarm = htmlElement.querySelector(`.${className}_alarm`);
        const snooze = htmlElement.querySelector(`.${className}_snooze`);
        //#endregion Variables déclaration
        alarm.classList.remove('on', 'active');
        snooze.classList.remove('active');
        this.#alarm = null;
    }
    //#endregion stopAlarm
    //#region snoozeAlarm
    snoozeAlarm() {
        //#region Variables déclaration
        const className = this.constructor.name;
        //#endregion Variables déclaration
        const htmlElement = this.HTMLElement;
        const snooze = htmlElement.querySelector(`.${className}_snooze`);
        const alarm = htmlElement.querySelector(`.${className}_alarm`);
        this.#alarm = new Date(Date.now());
        this.#alarm = this.#alarm.addMinutes(10);
        !String.isNullOrEmpty(this.#use24H) && this.#alarm.getHours() > 12 && (this.#alarm = this.#alarm.addHours(-12));
        alarm.classList.remove('on');
        snooze.classList.remove('active');
    }
    //#endregion snoozeAlarm
    //#endregion Methods
}
Object.defineProperties(Clock.prototype, {
    'showSeconds': {
        enumerable: !0
    },
    'showDays': {
        enumerable: !0
    },
    'showDate': {
        enumerable: !0
    },
    'use24H': {
        enumerable: !0
    },
    'autoStart': {
        enumerable: !0
    },
    'alarm': {
        enumerable: !0
    },
    'countDown': {
        enumerable: !0
    },
    'dotsGap': {
        enumerable: !0
    },
    'dotsFirstColor': {
        enumerable: !0
    },
    'dotsLastColor': {
        enumerable: !0
    }
});
Object.seal(Clock);
core.classes.register(core.types.CATEGORIES.COMMON, Clock);
//#endregion Clock
//#region Templates
if (core.isHTMLRenderer) {
    const ClockTpl = ['<jagui-clock id="{internalId}" data-class="Clock" class="Control Clock {theme}">',
        '<properties>{ "name": "{name}", "mode": "simple", "showSeconds": true }</properties></jagui-clock>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Clock, template: ClockTpl }]);
}
//#endregion Templates
export { Clock };