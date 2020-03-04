﻿//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//import { Window } from '/scripts/components/containers/window.js';
import { NotifyEvent } from '/scripts/core/events.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region CLOCKMODES
const CLOCKMODES = Object.freeze(Object.seal({
    SIMPLE: 'simple', // ok
    DIGITAL: 'digital', // https://codepen.io/shaman_tito/pen/Ectwp ok
    FLIP: 'flip', // https://codepen.io/fuhye/pen/KKpNzwM
    LED: 'led', // https://codepen.io/killyson26/pen/jOORvJb ok
    DOT: 'dot', // http://sooncountdown.com/
    CIRCULAR: 'circular', // https://codepen.io/ahamed-abu-bakr/pen/YzXpOMj
    ROTATE: 'rotate' // https://codepen.io/zhoha/pen/VwLLEJd
}));
//#endregion CLOCKMODES
//#region CLOCKTYPES
const CLOCKTYPES = Object.freeze(Object.seal({
    CLOCK: 'clock',
    COUNTDOWN: 'countdown'
}));
//#endregion CLOCKTYPES
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
                priv.started = false;
                priv.paused = false;
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
                priv.showSeconds = props.hasOwnProperty('showSeconds') ? props.showSeconds : false;
                priv.showDays = props.hasOwnProperty('showDays') ? props.showDays : false;
                priv.showMonths = props.hasOwnProperty('showMonths') ? props.showMonths : false;
                priv.showYears = props.hasOwnProperty('showYears') ? props.showYears : false;
                priv.use24H = Tools.getLocale().date.pm === String.EMPTY;
                priv.autoStart = props.hasOwnProperty('autoStart') ? props.autoStart : true;
                priv.lastDate = null;
                priv.alarm = props.hasOwnProperty('alarm') ? props.alarm : null;
                priv.countDownDate = new Date();
                if (props.hasOwnProperty('distance')) {
                    if (props.distance.days) {
                        priv.countDownDate = priv.countDownDate.addDays(props.distance.days);
                    }
                    if (props.distance.hours) {
                        priv.countDownDate = priv.countDownDate.addHours(props.distance.hours);
                    }
                    if (props.distance.minutes) {
                        priv.countDownDate = priv.countDownDate.addMinutes(props.distance.minutes);
                    }
                    if (props.distance.seconds) {
                        priv.countDownDate = priv.countDownDate.addSeconds(props.distance.seconds);
                    }
                }
                this.onAlarm = new NotifyEvent(this);
                this.hitTest.all = false;
                this.hitTest.mousedown = true;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
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
        //#endregion Getters / Setters
        //#region Methods
        clearContent() {

        }
        //#region prepareContent
        prepareContent() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const className = this.constructor.name;
            const tag = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            let div, div1;
            const date = new Date(Date.now());
            const distance = priv.countDownDate - date.getTime();
            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
            const numDigits = [];
            const weekdays = document.createElement(`${tag}-weekdays`);
            const digits = document.createElement(`${tag}-digits`);
            const isClock = priv.type === CLOCKTYPES.CLOCK;
            const hours = (isClock ?
                date.getHours() - (!priv.use24H && date.getHours() > 12 ? 12 : 0) :
                Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))).toString().padStart(2, '0');
            const minutes = (isClock ?
                date.getMinutes() :
                Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))).toString().padStart(2, '0');
            const seconds = (isClock ?
                date.getSeconds() :
                Math.floor(distance % (1000 * 60) / 1000)).toString().padStart(2, '0');
            let firstDigit;
            let lastDigit;
            let num = 1;
            let isDot = false;
            const offset = isClock ? 0 : 3;
            const locale = Tools.getLocale();
            const countDownClassNames = [];
            //#endregion Variables déclaration
            priv.lastDate = date;
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
                        numDigits.push('days');
                        numDigits.push('days');
                        numDigits.push('dots');
                        countDownClassNames.push('days');
                    }
                    if (~~days + ~~hours > 0) {
                        limit++;
                        countDownLabels.push(Tools.getLocale().date.hoursLabel);
                        numDigits.push('hours');
                        numDigits.push('hours');
                        numDigits.push('dots');
                        countDownClassNames.push('hours');
                    }
                    if (~~days + ~~hours + ~~minutes > 0) {
                        limit++;
                        countDownLabels.push(Tools.getLocale().date.minutesLabel);
                        numDigits.push('minutes');
                        numDigits.push('minutes');
                        numDigits.push('dots');
                        countDownClassNames.push('minutes');
                    }
                    countDownLabels.push(Tools.getLocale().date.secondsLabel);
                    numDigits.push('seconds');
                    numDigits.push('seconds');
                    countDownClassNames.push('seconds');
                } else {
                    numDigits.push('hours');
                    numDigits.push('hours');
                    numDigits.push('dots');
                    numDigits.push('minutes');
                    numDigits.push('minutes');
                    if (priv.showSeconds) {
                        numDigits.push('dots');
                        numDigits.push('seconds');
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
                isDot = false;
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
                    case CLOCKMODES.CIRCULAR:
                        break;
                    case CLOCKMODES.DIGITAL:
                    case CLOCKMODES.LED:
                        //https://codepen.io/shaman_tito/pen/Ectwp
                        const numbers = {
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
                        let value = 0;
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

                        div.classList.add(`${className}_${numbers[value]}`);
                        for (let j = 0; j < 7; j++) {
                            if (!isDot) {
                                div1 = document.createElement(`${tag}-digit`);
                                div1.classList.add(`${className}_digit_d${j + 1}`, this.themeName);
                                div.appendChild(div1);
                            }
                        }
                        break;
                    case CLOCKMODES.ROTATE:
                        if (i !== 2 && i !== 5) {
                            let maxItem = 10;
                            maxItem = i === 0 ? 3 : maxItem;
                            maxItem = i === 3 || i === 6 ? 6 : maxItem;
                            for (let j = 0; j < maxItem; j++) {
                                div1 = document.createElement(`${tag}-wheel`);
                                div1.classList.add(`${className}_digit_wheel`, this.themeName);
                                div.appendChild(div1);
                            }
                        }
                        break;
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

                            let hasBefore = false;
                            for (let j = 0; j < maxItem; j++) {
                                div1 = document.createElement(`${tag}-flip`);
                                div1.classList.add(`${className}_digit_flip`, this.themeName, 'Control');
                                if (j === ~~txt - 1 || (!hasBefore && j === maxItem - 1)) {
                                    hasBefore = true;
                                    div1.classList.add('before');
                                }
                                if (j === ~~txt) {
                                    div1.classList.add('active');
                                }
                                div.appendChild(div1);
                                let div4 = document.createElement(`${tag}-flip-p`);
                                div4.classList.add(`${className}_digit_flip_p`);
                                div1.appendChild(div4);
                                let div2 = document.createElement(`${tag}-flip-up`);
                                div2.classList.add(`${className}_digit_flip_up`, this.themeName, 'Control');
                                div4.appendChild(div2);
                                let div3 = document.createElement(`${tag}-flip-inn`);
                                div3.innerHTML = j;
                                div3.classList.add(`${className}_digit_flip_inn`, this.themeName, 'Control');
                                div2.appendChild(div3);
                                div2 = document.createElement(`${tag}-flip-down`);
                                div2.classList.add(`${className}_digit_flip_down`, this.themeName, 'Control');
                                div4.appendChild(div2);
                                div3 = document.createElement(`${tag}-flip-inn`);
                                div3.classList.add(`${className}_digit_flip_inn`, this.themeName, 'Control');
                                div3.innerHTML = j;
                                div2.appendChild(div3);
                            }
                        }
                        break;
                    case CLOCKMODES.DOT:
                        break;
                }
                if (!isDot) {
                    num++;
                    if (num > 2) {
                        num = 1;
                    }
                }
            }
            if (!priv.use24H) {
                div = document.createElement(`${tag}-meridian`);
                div.innerHTML = date.getHours() <= 12 ? locale.am : locale.pm;
                div.classList.add(`${className}_meridian`);
                digits.appendChild(div);
            }
            //#endregion digits
            htmlElement.classList.add(priv.mode);
        }
        //#endregion prepareContent
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            this.prepareContent();
            if (priv.autoStart) {
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
            const date = new Date(Date.now());
            const distance = priv.countDownDate - date.getTime();
            const isClock = priv.type === CLOCKTYPES.CLOCK;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
            const hours = (isClock ?
                (date.getHours() - (!priv.use24H && date.getHours() > 12 ? 12 : 0)) :
                Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, '0');
            const minutes = (isClock ?
                date.getMinutes() :
                Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
            const seconds = (isClock ?
                date.getSeconds() :
                Math.floor((distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
            const lDate = priv.lastDate;
            const lDistance = priv.countDownDate - lDate.getTime();
            const lDays = Math.floor(lDistance / (1000 * 60 * 60 * 24)).toString().padStart(3, '0');
            const lHours = (isClock ?
                (lDate.getHours() - (!priv.use24H && lDate.getHours() > 12 ? 12 : 0)) :
                Math.floor((lDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, '0');
            const lMinutes = (isClock ?
                lDate.getMinutes() :
                Math.floor((lDistance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
            const lSeconds = (isClock ?
                lDate.getSeconds() :
                Math.floor((lDistance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
            const className = this.constructor.name;
            const htmlElement = this.HTMLElement;
            let firstDigit;
            let lastDigit;
            //#endregion Variables déclaration
            if (!priv.paused && !this.loading && !this.form.loading) {
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
                if (days1) {
                    if (!isClock && lDays[0] !== days[0]) {
                        this[func](days1, days[0]);
                    }
                }
                if (days2) {
                    if (isClock && priv.showSeconds || !isClock && lDays[1] !== days[1]) {
                        this[func](days2, days[1]);
                    }
                }
                if (days3) {
                    if (isClock && priv.showSeconds || !isClock && lDays[3] !== days[3]) {
                        this[func](days3, days[3]);
                    }
                }
                if (hours1) {
                    if (isClock && priv.showSeconds || !isClock && lHours[0] !== hours[0]) {
                        this[func](hours1, hours[0]);
                    }
                }
                if (hours2) {
                    if (isClock && priv.showSeconds || !isClock && lHours[1] !== hours[1]) {
                        this[func](hours2, hours[1]);
                    }
                }
                if (minutes1) {
                    if (isClock && priv.showSeconds || !isClock && lMinutes[0] !== minutes[0]) {
                        this[func](minutes1, minutes[0]);
                    }
                }
                if (minutes2) {
                    if (isClock && priv.showSeconds || !isClock && lMinutes[1] !== minutes[1]) {
                        this[func](minutes2, minutes[1]);
                    }
                }
                if (seconds1) {
                    if (isClock && priv.showSeconds || !isClock && lSeconds[0] !== seconds[0]) {
                        this[func](seconds1, seconds[0]);
                    }
                }
                if (seconds2) {
                    if (isClock && priv.showSeconds || !isClock && lSeconds[1] !== seconds[1]) {
                        this[func](seconds2, seconds[1]);
                    }
                }
            }
            if (priv.alarm) {
                let elem = htmlElement.querySelector(`.${className}_alarm`);
                if (elem) {
                    elem.classList.add('active');
                    const aHours = (priv.alarm.hours - (!priv.use24H && priv.alarm.hours > 12 ? 12 : 0)).toString().padStart(2, '0');
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
            if (!isClock && ~~days + ~~hours + ~~minutes + ~~seconds === 0) {
                this.stop();
            }
            priv.lastDate = new Date(Date.now());
        }
        //#endregion update
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
        //#region updateLed
        updateLed(element, value) {
            //#region Variables déclaration
            const className = this.constructor.name;
            const numbers = {
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
            //#endregion Variables déclaration
            Object.keys(numbers).forEach(number => {
                element.classList.remove(`${className}_${numbers[number]}`);
            });
            element.classList.add(`${className}_${numbers[value]}`);
        }
        //#endregion updateLed
        //#region updateSimple
        updateSimple(element, value) {
            element.innerHTML = value;
        }
        //#endregion updateSimple
        //#region updateFlip
        updateFlip(element, value) {
            //#region Variables déclaration
            const priv = internal(this);
            const isClock = priv.type === CLOCKTYPES.CLOCK;
            //#endregion Variables déclaration
            let elem = element.querySelector('.before');
            if (elem) {
                elem.classList.remove('before');
            }
            elem = element.querySelector('.active');
            if (elem) {
                elem.classList.remove('active');
                elem.classList.add('before');
                if (isClock) {
                    if (elem.nextElementSibling) {
                        elem.nextElementSibling.classList.add('active');
                    } else {
                        elem.parentNode.firstElementChild.classList.add('active');
                    }
                } else {
                    if (elem.previousElementSibling) {
                        elem.previousElementSibling.classList.add('active');
                    } else {
                        elem.parentNode.lastElementChild.classList.add('active');
                    }

                }
            }
        }
        //#endregion updateFlip
        //#region start
        start() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.started = true;
            priv.pause = false;
            priv.handle = setInterval(this.update.bind(this), 1000);
        }
        //#endregion start
        //#region pause
        pause() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.type === CLOCKTYPES.COUNTDOWN) {
                priv.paused = true;
            }
        }
        //#endregion pause
        //#region stop
        stop() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.type === CLOCKTYPES.COUNTDOWN) {
                priv.started = false;
                priv.pause = false;
                clearInterval(priv.handle);
            }
        }
        //#endregion stop
        //#region resume
        resume() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.type === CLOCKTYPES.COUNTDOWN) {
                priv.paused = false;
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
            if (!priv.use24H && priv.alarm.getHours() > 12) {
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
*/