﻿//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//import { Window } from '/scripts/components/containers/window.js';
//import { Keyboard } from '/scripts/core/keyboard.js';
//import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region CLOCKMODES
const CLOCKMODES = Object.freeze(Object.seal({
    SIMPLE: "simple", // ok
    DIGITAL: 'digital', // https://codepen.io/shaman_tito/pen/Ectwp ok
    FLIP: "flip", // https://codepen.io/fuhye/pen/KKpNzwM
    LED: "led", // https://codepen.io/killyson26/pen/jOORvJb ok
    DOT: "dot", // http://sooncountdown.com/
    CIRCULAR: 'circular', // https://codepen.io/ahamed-abu-bakr/pen/YzXpOMj
    ROTATE: 'rotate' // https://codepen.io/zhoha/pen/VwLLEJd
}));
//#endregion CLOCKMODES
//#region CLOCKTYPES
const CLOCKTYPES = Object.freeze(Object.seal({
    CLOCK: "clock",
    COUNTDOWN: "countdown"
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
                priv.showAlarm = props.hasOwnProperty('showAlarm') ? props.showAlarm : false;
                priv.use24H = props.hasOwnProperty('use24H') ? props.use24H : false;
                priv.autoStart = props.hasOwnProperty('autoStart') ? props.autoStart : true;
                priv.lastDate = null;
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
        //#endregion Getters / Setters
        //#region Methods
        //#region prepareContent
        prepareContent() {
            //#region Variables déclaration
            const priv = internal(this);
            const paused = priv.pause;
            const started = priv.started;
            const htmlElement = this.HTMLElement;
            const className = this.constructor.name;
            const tag = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            let div, div1;
            const date = new Date(Date.now());
            const numDigits = priv.showSeconds ? 8 : 5;
            const weekdays = document.createElement(`${tag}-weekdays`);
            const digits = document.createElement(`${tag}-digits`);
            const hours = (date.getHours() - (!priv.use24H && date.getHours() > 12 ? 12 : 0)).toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            let firstDigit;
            let lastDigit;
            //#endregion Variables déclaration
            priv.lastDate = date;
            Object.keys(CLOCKMODES).forEach(key => {
                htmlElement.classList.remove(CLOCKMODES[key]);
            });
            this.stop();
            htmlElement.innerHTML = String.EMPTY;
            //#region weekdays
            weekdays.classList.add(`${className}_weekdays`);
            htmlElement.appendChild(weekdays);
            //#region days
            if (priv.showDays) {
                for (let i = 0; i < 7; i++) {
                    div = document.createElement(`${tag}-day`);
                    div.innerHTML = Tools.getLocale().date.abbreviatedDayNames[i].replace('.', String.EMPTY).toUpperCase();
                    div.classList.add(`${className}_day`);
                    if (date.getDay() === i) {
                        div.classList.add('active');
                    }
                    if (Tools.getLocale().date.firstDayOfWeek > 0 && i === 0) {
                        div.style.order = 1;
                    }
                    weekdays.appendChild(div);
                }
            }
            //#endregion days
            //#endregion weekdays
            //#region digits
            digits.classList.add(`${className}_digits`);
            htmlElement.appendChild(digits);
            if (priv.showAlarm) {
                div = document.createElement(`${tag}-alarm`);
                div.innerHTML = `<${tag}-alarminner class="Clock_alarm_inner ${this.themeName}"></${tag}-alarminner>`;
                div.classList.add(`${className}_alarm`, this.themeName);
                digits.appendChild(div);
            }
            for (let i = 0; i < numDigits; i++) {
                div = document.createElement(`${tag}-number`);
                div.classList.add(`${className}_${[2, 5].indexOf(i) > -1 ? 'dots' : 'digit'}`, this.themeName);
                [0, 1].indexOf(i) > -1 ? div.classList.add(`${className}_hours${i % 2 === 0 ? '1' : '2'}`) : null;
                [3, 4].indexOf(i) > -1 ? div.classList.add(`${className}_minutes${i % 2 !== 0 ? '1' : '2'}`) : null;
                priv.showSeconds ? [6, 7].indexOf(i) > -1 ? div.classList.add(`${className}_seconds${i % 2 === 0 ? '1' : '2'}`) : null : null;
                digits.appendChild(div);
                switch (priv.mode) {
                    case CLOCKMODES.SIMPLE:
                        switch (i) {
                            case 0:
                                firstDigit = hours.split(String.EMPTY).first;
                                div.innerHTML = firstDigit;
                                break;
                            case 1:
                                lastDigit = hours.split(String.EMPTY).last;
                                div.innerHTML = lastDigit;
                                break;
                            case 3:
                                firstDigit = minutes.split(String.EMPTY).first;
                                div.innerHTML = firstDigit;
                                break;
                            case 4:
                                lastDigit = minutes.split(String.EMPTY).last;
                                div.innerHTML = lastDigit;
                                break;
                            case 6:
                                if (priv.showSeconds) {
                                    firstDigit = seconds.split(String.EMPTY).first;
                                    div.innerHTML = firstDigit;
                                }
                                break;
                            case 7:
                                if (priv.showSeconds) {
                                    lastDigit = seconds.split(String.EMPTY).last;
                                    div.innerHTML = lastDigit;
                                }
                                break;
                        }
                        break;
                    case CLOCKMODES.CIRCULAR:
                        break;
                    case CLOCKMODES.DIGITAL:
                    case CLOCKMODES.LED:
                        //https://codepen.io/shaman_tito/pen/Ectwp
                        for (let j = 0; j < 7; j++) {
                            if ([2, 5].indexOf(i) === -1) {
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
                        if (i !== 2 && i !== 5) {
                            let txt;
                            let maxItem = 10;
                            maxItem = i === 0 ? 3 : maxItem;
                            maxItem = i === 3 || i === 6 ? 6 : maxItem;
                            switch (i) {
                                case 0:
                                    txt = hours.split(String.EMPTY).first;
                                    break;
                                case 1:
                                    txt = hours.split(String.EMPTY).last;
                                    break;
                                case 3:
                                    txt = minutes.split(String.EMPTY).first;
                                    break;
                                case 4:
                                    txt = minutes.split(String.EMPTY).last;
                                    break;
                                case 6:
                                    txt = seconds.split(String.EMPTY).first;
                                    break;
                                case 7:
                                    txt = seconds.split(String.EMPTY).last;
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
                                let div2 = document.createElement(`${tag}-flip-up`);
                                div2.classList.add(`${className}_digit_flip_up`, this.themeName, 'Control');
                                div1.appendChild(div2);
                                let div3 = document.createElement(`${tag}-flip-inn`);
                                div3.innerHTML = j;
                                div3.classList.add(`${className}_digit_flip_inn`, this.themeName, 'Control');
                                div2.appendChild(div3);
                                div2 = document.createElement(`${tag}-flip-down`);
                                div2.classList.add(`${className}_digit_flip_down`, this.themeName, 'Control');
                                div1.appendChild(div2);
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
            }
            if (!priv.use24H) {
                div = document.createElement(`${tag}-meridian`);
                div.innerHTML = date.getHours() <= 12 ? 'AM' : 'PM';
                div.classList.add(`${className}_meridian`);
                digits.appendChild(div);
            }
            //#endregion digits
            htmlElement.classList.add(priv.mode);
            priv.paused = paused;
            priv.started = started;
            if (priv.started && priv.type === CLOCKTYPES.COUNTDOWN) {
                this.start();
            }
        }
        //#endregion prepareContent
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            if (priv.autoStart) {
                this.prepareContent();
                this.update();
                this.start();
            }
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const date = new Date(Date.now());
            const hours = (date.getHours() - (!priv.use24H && date.getHours() > 12 ? 12 : 0)).toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const milliseconds = date.getMilliseconds().toString();
            const className = this.constructor.name;
            const htmlElement = this.HTMLElement;
            let firstDigit;
            let lastDigit;
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
            if (!priv.paused && !this.loading && !this.form.loading) {
                const hours1 = htmlElement.querySelector(`.${className}_hours1`);
                const hours2 = htmlElement.querySelector(`.${className}_hours2`);
                const minutes1 = htmlElement.querySelector(`.${className}_minutes1`);
                const minutes2 = htmlElement.querySelector(`.${className}_minutes2`);
                const seconds1 = htmlElement.querySelector(`.${className}_seconds1`);
                const seconds2 = htmlElement.querySelector(`.${className}_seconds2`);
                switch (priv.mode) {
                    case CLOCKMODES.SIMPLE:
                        firstDigit = hours.split(String.EMPTY).first;
                        lastDigit = hours.split(String.EMPTY).last;
                        hours1.innerHTML = firstDigit;
                        hours2.innerHTML = lastDigit;
                        firstDigit = minutes.split(String.EMPTY).first;
                        lastDigit = minutes.split(String.EMPTY).last;
                        minutes1.innerHTML = firstDigit;
                        minutes2.innerHTML = lastDigit;
                        if (priv.showSeconds) {
                            firstDigit = seconds.split(String.EMPTY).first;
                            lastDigit = seconds.split(String.EMPTY).last;
                            seconds1.innerHTML = firstDigit;
                            seconds2.innerHTML = lastDigit;
                        }
                        break;
                    case CLOCKMODES.CIRCULAR:
                        break;
                    case CLOCKMODES.DIGITAL:
                    case CLOCKMODES.LED:
                        firstDigit = hours.split(String.EMPTY).first;
                        lastDigit = hours.split(String.EMPTY).last;
                        Object.keys(numbers).forEach(number => {
                            hours1.classList.remove(`${className}_${numbers[number]}`);
                            hours2.classList.remove(`${className}_${numbers[number]}`);
                        });
                        hours1.classList.add(`${className}_${numbers[firstDigit]}`);
                        hours2.classList.add(`${className}_${numbers[lastDigit]}`);
                        firstDigit = minutes.split(String.EMPTY).first;
                        lastDigit = minutes.split(String.EMPTY).last;
                        Object.keys(numbers).forEach(number => {
                            minutes1.classList.remove(`${className}_${numbers[number]}`);
                            minutes2.classList.remove(`${className}_${numbers[number]}`);
                        });
                        minutes1.classList.add(`${className}_${numbers[firstDigit]}`);
                        minutes2.classList.add(`${className}_${numbers[lastDigit]}`);
                        if (priv.showSeconds) {
                            firstDigit = seconds.split(String.EMPTY).first;
                            lastDigit = seconds.split(String.EMPTY).last;
                            Object.keys(numbers).forEach(number => {
                                seconds1.classList.remove(`${className}_${numbers[number]}`);
                                seconds2.classList.remove(`${className}_${numbers[number]}`);
                            });
                            seconds1.classList.add(`${className}_${numbers[firstDigit]}`);
                            seconds2.classList.add(`${className}_${numbers[lastDigit]}`);
                        }
                        break;
                    case CLOCKMODES.FLIP:
                        if (priv.lastDate !== date) {
                            let lFirstDigit;
                            let lLastDigit;
                            let elem;
                            let idx = 0;
                            let i = 0;
                            const lDate = priv.lastDate;
                            const lHours = (lDate.getHours() - (!priv.use24H && lDate.getHours() > 12 ? 12 : 0)).toString().padStart(2, '0');
                            const lMinutes = lDate.getMinutes().toString().padStart(2, '0');
                            const lSeconds = lDate.getSeconds().toString().padStart(2, '0');
                            // Hours changed
                            if (hours !== lHours) {
                                //console.log('hours changed');
                            }
                            // Minutes changed
                            if (minutes !== lMinutes) {
                                //console.log('minute changed');
                            }
                            // Seconds changed
                            if (seconds !== lSeconds && priv.showSeconds) {
                                //console.log('seconds changed');
                                firstDigit = seconds.split(String.EMPTY).first;
                                lastDigit = seconds.split(String.EMPTY).last;
                                lFirstDigit = lSeconds.split(String.EMPTY).first;
                                lLastDigit = lSeconds.split(String.EMPTY).last;
                                if (lastDigit !== lLastDigit) {
                                    i = 1;
                                }
                                if (firstDigit !== lFirstDigit) {
                                    i = 0;
                                }
                                for (; i < 2; i++) {
                                    elem = htmlElement.querySelector(`.Clock_seconds${i + 1} .before`);
                                    elem.classList.remove('before');
                                    elem = htmlElement.querySelector(`.Clock_seconds${i + 1} .active`);
                                    elem.classList.remove('active');
                                    elem.classList.add('before');
                                    if (elem.nextElementSibling) {
                                        elem.nextElementSibling.classList.add('active');
                                    } else {
                                        elem.parentNode.firstElementChild.classList.add('active');
                                    }
                                }
                            }

                        }
                        priv.lastDate = date;
                        break;
                    case CLOCKMODES.DOT:
                        break;
                }
            }
        }
        //#endregion update
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
            priv.paused = true;
        }
        //#endregion pause
        //#region stop
        stop() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.started = false;
            priv.pause = false;
            clearInterval(priv.handle);
        }
        //#endregion stop
        //#region resume
        resume() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.paused = false;
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
    var ClockTpl = "<div id='{internalId}' data-class='Clock' data-name='{name}' class='Control Clock {theme}' data-theme='{theme}'></div>";
    Core.classes.registerTemplates([{ Class: Clock, template: ClockTpl }]);
}
//#endregion Templates
export { Clock };

/*(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "clock");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/clock");
    //#region ClockModes
    $j.types.ClockModes = {
        ANALOG: 'analog',
        DIGITAL: 'digital',
        NORMAL: "normal",
        FLIP: "flip",
        LED: "led",
        DOT: "dot",
        CIRCULAR: 'circular',
        WALL: 'wall',
        ROTATE: 'rotate'
    };
    //#endregion ClockModes
    //#region ClockTypes
    $j.types.ClockTypes = {
        CLOCK: "clock",
        COUNTDOWN: "countdown"
    };
    //#endregion ClockTypes
    var Clock = $j.classes.ThemedControl.extend("Clock", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._startTime = null;
                this._handle = null;
                this._started = false;
                this._paused = false;
                //#endregion
                this.mode = $j.types.ClockModes.NORMAL;
                this.type = $j.types.ClockTypes.CLOCK;
                this.showSeconds = true;
                this.showDays = false;
                this.showMonths = false;
                this.showYears = false;
                this.autoStart = true;
            }
        },
        //#region Setters
        setMode: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.ClockModes))) return;
            if (this.mode !== newValue) {
                this.mode = newValue;
                this.prepareContent();
                this.update();
            }
        },
        setType: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.ClockTypes))) return;
            if (this.type !== newValue) {
                this.reset();
                this.type = newValue;
                this.update();
            }
        },
        setShowSeconds: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showSeconds !== newValue) {
                this.showSeconds = newValue;
                this.update();
            }
        },
        setShowDays: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showDays !== newValue) {
                this.showDays = newValue;
                this.update();
            }
        },
        setShowMonths: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showMonths !== newValue) {
                this.showMonths = newValue;
                this.update();
            }
        },
        setShowYears: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showYears !== newValue) {
                this.showYears = newValue;
                this.update();
            }
        },
        setAutoStart: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.autoStart !== newValue) {
                this.autoStart = newValue;
            }
        },
        //#endregion
        //#region Methods
        prepareContent: function () {
            var _paused = this.pause, _started = this.started, div, sep;
            this.stop();
            this._HTMLElement.innerHTML = String.EMPTY;
            switch (this.mode) {
                case $j.types.ClockModes.NORMAL:
                    if (this.showDays) {

                    }
                    if (this.showMonths) {
                        if (this.showDays) {
                            // sep
                            sep = $j.doc.createElement($j.types.HTMLElements.DIV);
                            this._HTMLElement.appendChild(sep);
                        }
                    }
                    if (this.showYears) {
                        if (this.showMonths) {
                            // sep
                            sep = $j.doc.createElement($j.types.HTMLElements.SPAN);
                            this._HTMLElement.appendChild(sep);
                        }
                    }
                    // hours
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    // sep
                    sep = $j.doc.createElement($j.types.HTMLElements.SPAN);
                    sep.innerHTML = ':';
                    this._HTMLElement.appendChild(sep);
                    // minutes
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    // seconds
                    if (this.showSeconds) {
                        // sep
                        sep = $j.doc.createElement($j.types.HTMLElements.SPAN);
                        sep.innerHTML = ':';
                        this._HTMLElement.appendChild(sep);
                        div = $j.doc.createElement($j.types.HTMLElements.DIV);
                        this._HTMLElement.appendChild(div);
                        div = $j.doc.createElement($j.types.HTMLElements.DIV);
                        this._HTMLElement.appendChild(div);
                    }
                    break;
                case $j.types.ClockModes.FLIP:
                    break;
                case $j.types.ClockModes.LED:
                    break;
                case $j.types.ClockModes.DOT:
                    break;
            }
            this._paused = _paused;
            this._started = _started;
            if (this._started) this.start();
        },
        loaded: function () {
            this._inherited();
            if (this.autoStart) {
                this.prepareContent();
                this.update();
                this.start();
            }
        },
        update: function () {
            if (this._paused) return;
            if (this._loading || this.form._loading) return;
        },
        start: function () {
            var clock = this;
            this._started = true;
            this._pause = false;
            this._handle = setInterval(this.update.bind(this), 1000);
        },
        pause: function () {
            this._paused = true;
        },
        stop: function () {
            this._started = false;
            this._pause = false;
            clearInterval(this._handle);
        },
        resume: function () {
            this._paused = false;
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            //if (this._textObj)) this.caption=this._textObj.innerHTML;
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-modalresult"):this._HTMLElement.dataset.modalresult;
            //if (data)) this.modalResult=data;
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-stayspressed"):this._HTMLElement.dataset.stayspressed;
            //if (data)) this.staysPressed=_conv.strToBool(data);
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-repeatclick"):this._HTMLElement.dataset.repeatclick;
            //if (data)) this.repeatClick=_conv.strToBool(data);
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-action"):this._HTMLElement.dataset.action;
            //if (data)) this.action=data;
        },
        destroy: function () {
            this._inherited();
        }
        //#endregion
    });
    Object.seal(Clock);
    $j.classes.register($j.types.categories.COMMON, Clock);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ClockTpl = "<div id='{internalId}' data-class='Clock' data-name='{name}' class='Control Clock {theme}' data-theme='{theme}'></div>";
        $j.classes.registerTemplates([{ Class: Clock, template: ClockTpl }]);
    }
    //endregion
})();
/*
 *https://codepen.io/Leul-Dev/pen/MWYNmav -> Datetime chooser
 *https://codepen.io/vAhyThe/pen/ZEYjqrj -> dot
 *https://codepen.io/jxglwdco/pen/LYExqOR -> dot
 *https://codepen.io/sandeep-krishna/pen/xxxyQbX -> three js
*/