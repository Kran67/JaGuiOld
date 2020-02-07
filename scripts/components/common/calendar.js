//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Events } from "/scripts/core/events.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Keyboard } from "/scripts/core/keyboard.js";
import { Convert } from "/scripts/core/convert.js";
//#endregion Import
//#region CALENDARMODES
const CALENDARMODES = {
    DAYS: "days",
    MONTHS: "months",
    DECADES: "decades",
    CENTURIES: "centuries"
};
//#endregion CALENDARMODES
//#region Calendar
const Calendar = (() => {
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
    //#region Class CustomButton
    class Calendar extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.prevMonth = null;
                priv.thisDay = null
                priv.nextMonth = null;
                priv.thisMonth = null;
                priv.weekDays = null;
                priv.weeks = new Array(6);
                priv.months = null;
                priv.decades = null;
                priv.century = null;
                priv.lastSelectedDay = null;
                priv.autoTranslate = true;
                //#endregion
                priv.curDate = props.hasOwnProperty("date") ? new Date(props.date) : new Date(Date.now());
                priv.viewWeeksNum = props.hasOwnProperty("viewWeeksNum") && Tools.isBool(props.viewWeeksNum) ? props.viewWeeksNum : false;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "mode",
                    enum: CALENDARMODES,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        if (Tools.valueInSet(newValue, CALENDARMODES) || newValue === null) {
                            if (priv.mode !== newValue) {
                                priv.mode = newValue;
                                priv.decades.classList.remove("zoomOut");
                                priv.century.classList.remove("zoomOut");
                                priv.months.classList.remove("zoomOut");
                                switch (priv.mode) {
                                    case CALENDARMODES.DECADES:
                                        priv.decades.classList.add("zoomOut");
                                        break;
                                    case CALENDARMODES.CENTURIES:
                                        priv.century.classList.add("zoomOut");
                                        break;
                                    case CALENDARMODES.MONTHS:
                                        priv.months.classList.add("zoomOut");
                                        break;
                                }
                            }
                            this.update();
                        }
                    },
                    variable: priv,
                    value: props.hasOwnProperty("mode") ? props.mode : CALENDARMODES.DAYS,
                    forceUpdate: true
                });
                this.hitTest = [true, false, true];
                this.canFocused = true;
                this.onChange = new Core.classes.NotifyEvent(this);
                this.stopEvent = false;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region CALENDARMODES
        /**
         * @type    {Object}        CALENDARMODES
         */
        static get CALENDARMODES() {
            return CALENDARMODES;
        }
        //#endregion CALENDARMODES
        get viewWeeksNum() {
            return internal(this).viewWeeksNum;
        }
        set viewWeeksNum(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.viewWeeksNum !== newValue) {
                    priv.viewWeeksNum = newValue;
                    this.update();
                }
            }
        }
        //get mode() {
        //    return internal(this).mode;
        //}
        //set mode(newValue) {
        //}
        get date() {
            return internal(this).curDate;
        }
        set date(date) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (date instanceof Date) {
                priv.curDate = date;
                this.update();
                this.onChange.invoke();
            }
        }
        //#endregion Getters / Setters
        //#region Methods
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                const content = htmlElement.querySelector(".CalendarContent");
                const header = content.firstElementChild;
                let j = 0;
                priv.prevMonth = header.firstElementChild;
                priv.prevMonth.jsObj = this;
                Events.bind(priv.prevMonth, Mouse.MOUSEEVENTS.CLICK, this.decDate);
                priv.thisDay = header.querySelector(".CalendarThisDay");
                priv.thisDay.jsObj = this;
                Events.bind(priv.thisDay, Mouse.MOUSEEVENTS.CLICK, this.goToThisDay);
                priv.nextMonth = header.querySelector(".CalendarNextMonth");
                priv.nextMonth.jsObj = this;
                Events.bind(priv.nextMonth, Mouse.MOUSEEVENTS.CLICK, this.incDate);
                priv.thisMonth = header.querySelector(".CalendarThisMonth");
                priv.thisMonth.jsObj = this;
                Events.bind(priv.thisMonth, Mouse.MOUSEEVENTS.CLICK, this.viewMYDC);
                priv.weekDays = content.querySelector(".CalendarWeekdays");
                const weeks = htmlElement.querySelector(".CalendarWeeks");
                for (let i = 0, l = weeks.childNodes.length; i < l; i++) {
                    if (weeks.childNodes[i].nodeType === Types.XMLNODETYPES.ELEMENT_NODE) {
                        priv.weeks[j] = weeks.childNodes[i];
                        j++;
                    }
                }
                priv.months = htmlElement.querySelector(".CalendarMonths");
                priv.months.jsObj = this;
                priv.decades = htmlElement.querySelector(".CalendarDecades");
                priv.decades.jsObj = this;
                priv.century = htmlElement.querySelector(".CalendarCenturies");
                priv.century.jsObj = this;
            }
        }
        decDate(delta) {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            if (obj.isEnabled) {
                switch (obj.mode) {
                    case CALENDARMODES.MONTHS:
                        obj.date = obj.date.addYears(-1);
                        break;
                    case CALENDARMODES.DECADES:
                        obj.date = obj.date.addYears(-10);
                        break;
                    case CALENDARMODES.CENTURIES:
                        obj.date = obj.date.addYears(-100);
                        break;
                    default:
                        obj.date = obj.date.addMonths(-1);
                        break;
                }
                obj.update();
            }
        }
        goToThisDay() {
            //#region Variables déclaration
            let obj = this.jsObj;
            //#endregion Variables déclaration
            if (!obj) {
                obj = this;
            }
            if (obj.isEnabled) {
                obj.date = new Date(Date.now());
                obj.mode = CALENDARMODES.DAYS;
            }
        }
        incDate(delta) {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            if (obj.isEnabled) {
                switch (obj.mode) {
                    case CALENDARMODES.MONTHS:
                        obj.date = obj.date.addYears(1);
                        break;
                    case CALENDARMODES.DECADES:
                        obj.date = obj.date.addYears(10);
                        break;
                    case CALENDARMODES.CENTURIES:
                        obj.date = obj.date.addYears(100);
                        break;
                    default:
                        obj.date = obj.date.addMonths(1);
                        break;
                }
                obj.update();
            }
        }
        selectDay() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectDay(this.dataset.day, this);
        }
        _selectDay(data, htmlObj) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (data) {
                    priv.curDate.setDate(~~data);
                    if (htmlObj) {
                        priv.lastSelectedDay = htmlObj;
                    }
                    this.update();
                }
            }
        }
        selectMonth() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectMonth(this.dataset.month);
        }
        _selectMonth(data) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (data) {
                    priv.curDate.setMonth(~~data);
                }
                Events.bind(priv.months, "AnimationEnd", this.animationEnd);
                priv.months.dataset.view = false;
                this.mode = CALENDARMODES.DAYS;
            }
        }
        selectYear() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectYear(this.dataset.year);
        }
        _selectYear(data) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (data) {
                    priv.curDate.setFullYear(data);
                }
                Events.bind(priv.decades, "AnimationEnd", this.animationEnd);
                priv.decades.dataset.view = false;
                this.mode = CALENDARMODES.MONTHS;
            }
        }
        selectDecades() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectDecades(this.dataset.decade);
        }
        _selectDecades(data) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (data) {
                    priv.curDate.setFullYear(data);
                }
                Events.bind(priv.century, "AnimationEnd", this.animationEnd);
                priv.century.dataset.view = false;
                this.mode = CALENDARMODES.DECADES;
            }
        }
        animationEnd() {
            //#region Variables déclaration
            const data = this.dataset.view;
            //#endregion Variables déclaration
            if (data === "false") {
                this.classList.remove("zoomOut");
                Events.unBind(this, "AnimationEnd", this.jsObj.animationEnd);
            }
        }
        viewMYDC() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            if (obj.isEnabled) {
                obj.mode = Tools.getNextValueFromEnum(CALENDARMODES, obj.mode);
            }
        }
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            let d = 0;
            let w = 0;
            let div;
            let l;
            const date = new Date(Date.now());
            //#endregion Variables déclaration
            if (htmlElement) {
                super.update();
                htmlElement.classList[priv.viewWeeksNum ? "add" : "remove"]("viewweeknum");
                priv.months.classList.add("hidden");
                priv.decades.classList.add("hidden");
                priv.century.classList.add("hidden");
                switch (priv.mode) {
                    case CALENDARMODES.MONTHS:
                        d = 0;
                        div = priv.months.querySelectorAll(".CalendarMonth");
                        priv.months.dataset.view = true;
                        priv.months.classList.remove("hidden");
                        priv.thisMonth.innerHTML = priv.curDate.getFullYear();
                        for (let i = 0; i < 12; i++) {
                            div[d].classList.remove("CalendarThis", "CalendarSelected");
                            if (i === date.month) {
                                div[d].classList.add("CalendarThis");
                            }
                            if (i === priv.curDate.month) {
                                div[d].classList.add("CalendarSelected");
                            }
                            div[d].dataset.month = i;
                            div[d].jsObj = this;
                            div[d].dataset.theme = this.themeName;
                            Events.unBind(div[d], Mouse.MOUSEEVENTS.CLICK, this.selectMonth);
                            Events.bind(div[d], Mouse.MOUSEEVENTS.CLICK, this.selectMonth);
                            d++;
                        }
                        break;
                    case CALENDARMODES.DECADES:
                        div = priv.decades.querySelectorAll(".CalendarDecade");
                        d = 0;
                        l = priv.curDate.getFullYear() - ~~(priv.curDate.getFullYear().toString().substr(3, 1));
                        for (let i = l - 1; i < l + 11; i++) {
                            div[d].classList.remove("CalendarSelected", "CalendarThis", "CalendarOutMonth");
                            div[d].dataset.theme = this.themeName;
                            if (i === priv.curDate.getFullYear()) {
                                div[d].classList.add("CalendarSelected");
                            }
                            if (i === date.getFullYear()) {
                                div[d].classList.add("CalendarThis");
                            }
                            if (i === l - 1 || i === l + 10) {
                                div[d].classList.add("CalendarOutMonth");
                            }
                            div[d].innerHTML = i;
                            div[d].dataset.year = i;
                            div[d].jsObj = this;
                            Events.unBind(div[d], Mouse.MOUSEEVENTS.CLICK, this.selectYear);
                            Events.bind(div[d], Mouse.MOUSEEVENTS.CLICK, this.selectYear);
                            d++;
                        }
                        priv.thisMonth.innerHTML = l + "-" + (l + 9);
                        priv.decades.dataset.view = true;
                        priv.decades.classList.remove("hidden");
                        break;
                    case CALENDARMODES.CENTURIES:
                        {
                            const thisCentury = ~~(priv.curDate.getFullYear().toString().substr(0, 2) + "00");
                            let startCentury = thisCentury - 10;
                            const endCentury = thisCentury + 100;
                            priv.thisMonth.innerHTML = `${thisCentury}-${(endCentury - 1)}`;
                            priv.century.dataset.view = true;
                            priv.century.classList.remove("hidden");
                            d = 0;
                            div = priv.century.querySelectorAll(".CalendarCentury");
                            while (startCentury < endCentury) {
                                div[d].classList.remove("CalendarOutMonth", "CalendarThis", "CalendarSelected");
                                if (startCentury % thisCentury > 100) {
                                    div[d].classList.add("CalendarOutMonth");
                                }
                                div[d].dataset.theme = this.themeName;
                                if (date.getFullYear() >= startCentury && date.getFullYear() <= startCentury + 9) {
                                    div[d].classList.add("CalendarThis");
                                }
                                if (priv.curDate.getFullYear() >= startCentury && priv.curDate.getFullYear() <= startCentury + 9) {
                                    div[d].classList.add("CalendarSelected");
                                }
                                div[d].innerHTML = `${startCentury}<br />${(startCentury + 9)}`;
                                div[d].dataset.decade = `${startCentury + ~~(priv.curDate.getFullYear().toString().substr(3, 1))}`;
                                div[d].jsObj = this;
                                Events.unBind(div[d], Mouse.MOUSEEVENTS.CLICK, this.selectDecades);
                                Events.bind(div[d], Mouse.MOUSEEVENTS.CLICK, this.selectDecades);
                                startCentury += 10;
                                d++;
                            }
                        }
                        break;
                    default:
                        {
                            priv.weekDays.querySelector(".CalendarWeekNum").innerHTML = Tools.getLocale().date.weekShortName;
                            let firstDay = priv.curDate.firstDayOfMonth;
                            const firstDayOfWeek = firstDay.day;
                            const sdn = Tools.getLocale().date.shortestDayNames;
                            w = 0;
                            firstDay = firstDay.firstDayOfWeek;
                            if (priv.viewWeeksNum) {
                                div = Convert.nodeListToArray(htmlElement.querySelectorAll(".CalendarWeekNum"));
                                div.forEach((elem, idx) => {
                                    if (idx > 0) {
                                        firstDay = firstDay.addDays(7);
                                        elem.innerHTML = firstDay.week;
                                    }
                                });
                            }
                            // days of week
                            d = firstDayOfWeek;
                            w = 0;
                            div = htmlElement.querySelectorAll(".CalendarWeekDay");
                            while (w < 7) {
                                div[w].innerHTML = sdn[d].firstCharUpper;
                                d++;
                                if (d === 7) {
                                    d = 0;
                                }
                                w++;
                            }
                            // month
                            priv.thisMonth.innerHTML = `${Tools.getLocale().date.monthNames[priv.curDate.month - 1].firstCharUpper} ${priv.curDate.year}`;
                            // days
                            firstDay = priv.curDate.firstDayOfMonth.firstDayOfWeek;
                            div = htmlElement.querySelectorAll(".CalendarDay");
                            let i = 0;
                            w = d = 0;
                            for (w = 0; w < priv.weeks.length; w++) {
                                for (d = 0; d < 7; d++) {
                                    div[i].classList.remove("CalendarOutMonth", "CalendarNow", "CalendarSelected");
                                    if (firstDay.getMonth() !== priv.curDate.getMonth()) {
                                        div[i].classList.add("CalendarOutMonth");
                                    }
                                    if (firstDay.getDate() === date.getDate() &&
                                        firstDay.month === date.month &&
                                        firstDay.year === date.year) {
                                        div[i].classList.add("CalendarNow");
                                    }
                                    if (firstDay.getDate() === priv.curDate.getDate() && 
                                        firstDay.month === priv.curDate.month) {
                                        div[i].classList.add("CalendarSelected");
                                        priv.lastSelectedDay = div[i];
                                    }
                                    div[i].innerHTML = firstDay.getDate();
                                    div[i].dataset.day = firstDay.getDate();
                                    div[i].jsObj = this;
                                    Events.unBind(div[i], Mouse.MOUSEEVENTS.CLICK, this.selectDay);
                                    Events.bind(div[i], Mouse.MOUSEEVENTS.CLICK, this.selectDay);
                                    firstDay = firstDay.addDays(1);
                                    i++;
                                }
                            }
                        }
                        break;
                }
            }
        }
        keyDown() {
            //#region Variables déclaration
            priv = internal(this);
            //#endregion Variables déclaration
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case Keyboard.VKEYSCODES.VK_LEFT:
                    switch (priv.mode) {
                        default:
                            priv.curDate = priv.curDate.addDays(-1);
                            break;
                        case CALENDARMODES.MONTHS:
                            priv.curDate = priv.curDate.addMonths(-1);
                            priv.mode = CALENDARMODES.DAYS;
                            break;
                        case CALENDARMODES.DECADES:
                            priv.curDate = priv.curDate.addYears(-1);
                            priv.mode = CALENDARMODES.YEARS;
                            break;
                        case CALENDARMODES.CENTURIES:
                            priv.curDate = priv.curDate.addYears(-10);
                            priv.mode = CALENDARMODES.DECADES;
                            break;
                    }
                    break;
                case Keyboard.VKEYSCODES.VK_UP:
                    switch (priv.mode) {
                        default:
                            priv.curDate = priv.curDate.addDays(-7);
                            break;
                        case CALENDARMODES.MONTHS:
                            priv.curDate = priv.curDate.addMonths(-4);
                            priv.mode = CALENDARMODES.DAYS;
                            break;
                        case CALENDARMODES.DECADES:
                            priv.curDate = priv.curDate.addYears(-4);
                            priv.mode = CALENDARMODES.YEARS;
                            break;
                        case CALENDARMODES.CENTURIES:
                            priv.curDate = priv.curDate.addYears(-40);
                            priv.mode = CALENDARMODES.DECADES;
                            break;
                    }
                    break;
                case Keyboard.VKEYSCODES.VK_RIGHT:
                    switch (priv.mode) {
                        default:
                            priv.curDate = priv.curDate.addDays(1);
                            break;
                        case $j.types.CalendarModes.MONTHS:
                            priv.curDate = priv.curDate.addMonths(1);
                            priv.mode = CALENDARMODES.DAYS;
                            break;
                        case CALENDARMODES.DECADES:
                            priv.curDate = priv.curDate.addYears(1);
                            priv.mode = CALENDARMODES.YEARS;
                            break;
                        case CALENDARMODES.CENTURIES:
                            priv.curDate = priv.curDate.addYears(10);
                            priv.mode = CALENDARMODES.DECADES;
                            break;
                    }
                    break;
                case Keyboard.VKEYSCODES.VK_DOWN:
                    switch (priv.mode) {
                        default:
                            priv.curDate = priv.curDate.addDays(7);
                            break;
                        case CALENDARMODES.MONTHS:
                            priv.curDate = priv.curDate.addMonths(4);
                            priv.mode = CALENDARMODES.DAYS;
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this.curDate = this.curDate.addYears(4);
                            this.setMode($j.types.CalendarModes.YEARS);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this.curDate = this.curDate.addYears(40);
                            this.setMode($j.types.CalendarModes.DECADES);
                            break;
                    }
                    break;
                case Keyboard.VKEYSCODES.VK_HOME:
                    break;
                case Keyboard.VKEYSCODES.VK_END:
                    this.goToThisDay();
                    break;
                case Keyboard.VKEYSCODES.VK_PRIOR:
                    switch (priv.mode) {
                        default:
                            priv.curDate = priv.curDate.addMonths(-1);
                            break;
                        case CALENDARMODES.MONTHS:
                            priv.curDate = priv.curDate.addYears(-1);
                            priv.mode = CALENDARMODES.DAYS;
                            break;
                        case CALENDARMODES.DECADES:
                            priv.curDate = priv.curDate.addYears(-10);
                            priv.mode = CALENDARMODES.YEARS;
                            break;
                        case CALENDARMODES.CENTURIES:
                            priv.curDate = priv.curDate.addYears(-100);
                            priv.mode = CALENDARMODES.DECADES;
                            break;
                    }
                    break;
                case Keyboard.VKEYSCODES.VK_NEXT:
                    switch (priv.mode) {
                        default:
                            priv.curDate = priv.curDate.addMonths(1);
                            break;
                        case CALENDARMODES.MONTHS:
                            priv.curDate = priv.curDate.addYears(1);
                            priv.mode = null;
                            break;
                        case CALENDARMODES.DECADES:
                            priv.curDate = priv.curDate.addYears(10);
                            priv.mode = CALENDARMODES.YEARS;
                            break;
                        case CALENDARMODES.CENTURIES:
                            priv.curDate = priv.curDate.addYears(100);
                            priv.mode = CALENDARMODES.DECADES;
                            break;
                    }
                    break;
                case Keyboard.VKEYSCODES.VK_SPACE:
                    switch (priv.mode) {
                        case CALENDARMODES.MONTHS:
                            this.selectMonth(null);
                            break;
                        case CALENDARMODES.DECADES:
                            this.selectYear(null);
                            break;
                        case CALENDARMODES.CENTURIES:
                            this.selectDecades(null);
                            break;
                    }
                    break;
            }
            if (Core.keyboard.keyCode !== Keyboard.VKEYSCODES.VK_SPACE) {
                this.update();
            }
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.prevMonth = null;
            priv.thisDay = null;
            priv.nextMonth = null;
            priv.thisMonth = null;
            priv.weekDays = null;
            priv.weeks.destroy();
            priv.weeks = null;
            priv.monthsC = null;
            priv.decadesC = null;
            priv.centuryC = null;
            priv.lastSelectedDay = null;
            priv.autoTranslate = null;
            priv.curDate = null;
            priv.viewWeeksNum = null;
        }
        getTemplate() {
            //#region Variables déclaration
            let html = super.getTemplate();
            //#endregion Variables déclaration
            const a = html.split("{date}");
            html = a.join(Date.now());
            return html;
        }
        //#endregion Methods
    }
    return Calendar;
    //#endregion Calendar
})();
Object.seal(Calendar);
Core.classes.register(Types.CATEGORIES.COMMON, Calendar);
//#endregion Calendar

/*
(function () {
    //#region Calendar
    var Calendar = $j.classes.ThemedControl.extend("Calendar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._prevMonth = null;
                this._thisDay = null
                this._nextMonth = null;
                this._thisMonth = null;
                this._weekDays = null;
                this._weeks = new Array(6);
                this._months = null;
                this._decades = null;
                this._century = null;
                this._lastSelectedDay = null;
                this._autoTranslate = true;
                //#endregion
                this.curDate = Date.now();
                this.viewWeeksNum = false;
                $j.tools.addPropertyFromSet(this, "mode", $j.types.CalendarModes, $j.types.CalendarModes.DAYS);
                this.setHitTest([true, false, true]);
                this.canFocused = true;
                this.onChange = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Setter
        setViewWeeksNum: function (newValue) {
            var mode;
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.viewWeeksNum !== newValue) {
                this.viewWeeksNum = newValue;
                $j.CSS.removeClass(this._HTMLElement, "viewweeknum");
                if (this.viewWeeksNum) $j.CSS.addClass(this._HTMLElement, "viewweeknum");
            }
        },
        setMode: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.CalendarModes)) return;
            if (this.mode !== newValue) {
                this.mode = newValue;
                this._HTMLElement.dataset.mode = this.mode;
                $j.CSS.removeClass(this._decades, "zoomOut");
                $j.CSS.removeClass(this._century, "zoomOut");
                $j.CSS.removeClass(this._months, "zoomOut");
                this._months.dataset.view = false;
                this._decades.dataset.view = false;
                this._century.dataset.view = false;
                switch (this.mode) {
                    case $j.types.CalendarModes.DECADES:
                        $j.CSS.addClass(this._decades, "zoomOut");
                        break;
                    case $j.types.CalendarModes.CENTURIES:
                        $j.CSS.addClass(this._century, "zoomOut");
                        break;
                    case $j.types.CalendarModes.MONTHS:
                        $j.CSS.addClass(this._months, "zoomOut");
                        break;
                }
            }
            this.update();
        },
        setDate: function (date) {
            if (!(date instanceof Date)) return;
            this.curDate = date;
            this.update();
            this.onChange.invoke();
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                var content = this._HTMLElement.firstElementChild, header = content.firstElementChild, weeks = null, j = 0;
                this._prevMonth = header.firstElementChild;
                this._prevMonth.jsObj = this;
                $j.tools.events.bind(this._prevMonth, $j.types.mouseEvents.CLICK, this.decDate);
                this._thisDay = header.querySelector('.CalendarThisDay');
                this._thisDay.jsObj = this;
                $j.tools.events.bind(this._thisDay, $j.types.mouseEvents.CLICK, this.goToThisDay);
                this._nextMonth = header.querySelector('.CalendarNextMonth');
                this._nextMonth.jsObj = this;
                $j.tools.events.bind(this._nextMonth, $j.types.mouseEvents.CLICK, this.incDate);
                this._thisMonth = header.querySelector('.CalendarThisMonth');
                this._thisMonth.jsObj = this;
                $j.tools.events.bind(this._thisMonth, $j.types.mouseEvents.CLICK, this.viewMYDC);
                this._weekDays = content.querySelector('.CalendarWeekdays');
                weeks = this._HTMLElement.querySelector('.CalendarWeeks');
                for (var i = 0, l = weeks.childNodes.length; i < l; i++) {
                    if (weeks.childNodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                        this._weeks[j] = weeks.childNodes[i];
                        j++;
                    }
                }
                this._months = this._HTMLElement.querySelector('.CalendarMonths');
                this._months.jsObj = this;
                this._decades = this._HTMLElement.querySelector('.CalendarDecades');
                this._decades.jsObj = this;
                this._century = this._HTMLElement.querySelector('.CalendarCenturies');
                this._century.jsObj = this;
            }
        },
        decDate: function (delta) {
            var obj = this.jsObj, data;
            if (!obj.isEnabled()) return;
            switch (obj.mode) {
                case $j.types.CalendarModes.MONTHS:
                    obj.curDate = obj.curDate.addYears(-1);
                    break;
                case $j.types.CalendarModes.DECADES:
                    obj.curDate = obj.curDate.addYears(-10);
                    break;
                case $j.types.CalendarModes.CENTURIES:
                    obj.curDate = obj.curDate.addYears(-100);
                    break;
                default:
                    obj.curDate = obj.curDate.addMonths(-1);
                    break;
            }
            obj.update();
        },
        goToThisDay: function () {
            var obj = this.jsObj;
            if (!obj) obj = this;
            if (!obj.isEnabled()) return;
            obj.curDate = Date.now();
            obj.setMode($j.types.CalendarModes.DAYS);
        },
        incDate: function (delta) {
            var obj = this.jsObj, data;
            if (!obj.isEnabled()) return;
            switch (obj.mode) {
                case $j.types.CalendarModes.MONTHS:
                    obj.curDate = obj.curDate.addYears(1);
                    break;
                case $j.types.CalendarModes.DECADES:
                    obj.curDate = obj.curDate.addYears(10);
                    break;
                case $j.types.CalendarModes.CENTURIES:
                    obj.curDate = obj.curDate.addYears(100);
                    break;
                default:
                    obj.curDate = obj.curDate.addMonths(1);
                    break;
            }
            obj.update();
        },
        selectDay: function (mouseEventArgs) {
            var obj = this.jsObj, data;
            data = this.dataset.day;
            obj._selectDay(data, this);
        },
        _selectDay: function (data, htmlObj) {
            if (!this.isEnabled()) return;
            if (data) {
                this.curDate.setDate(data);
                if (htmlObj) this._lastSelectedDay = htmlObj;
                this.update();
            }
        },
        selectMonth: function (mouseEventArgs) {
            var obj = this.jsObj, data;
            data = this.dataset.month;
            obj._selectMonth(data);
        },
        _selectMonth: function (data) {
            if (!this.isEnabled()) return;
            if (data) this.curDate.setMonth(data);
            $j.tools.events.bind(this._months, $j.browser.vendorPrefix.split("-").join(String.EMPTY) + "AnimationEnd", this.animationEnd);
            this._months.dataset.view = false;
            this.setMode($j.types.CalendarModes.DAYS);
        },
        selectYear: function (mouseEventArgs) {
            var obj = this.jsObj, data;
            data = this.dataset.year;
            obj._selectYear(data);
        },
        _selectYear: function (data) {
            if (!this.isEnabled()) return;
            if (data) this.curDate.setFullYear(data);
            $j.tools.events.bind(this._decades, $j.browser.vendorPrefix.split("-").join(String.EMPTY) + "AnimationEnd", this.animationEnd);
            this._decades.dataset.view = false;
            this.setMode($j.types.CalendarModes.MONTHS);
        },
        selectDecades: function (mouseEventArgs) {
            var obj = this.jsObj, data;
            data = this.dataset.decade;
            obj._selectDecades(data);
        },
        _selectDecades: function (data) {
            if (!this.isEnabled()) return;
            if (data) this.curDate.setFullYear(data);
            $j.tools.events.bind(this._century, $j.browser.vendorPrefix.split("-").join(String.EMPTY) + "AnimationEnd", this.animationEnd);
            this._century.dataset.view = false;
            this.setMode($j.types.CalendarModes.DECADES);
        },
        animationEnd: function () {
            var data = this.dataset.view;
            if (data === "false") {
                $j.CSS.removeClass(this, "zoomOut");
                $j.tools.events.unBind(this, $j.browser.vendorPrefix.split("-").join(String.EMPTY) + "AnimationEnd", this.jsObj.animationEnd);
            }
        },
        viewMYDC: function () {
            var obj = this.jsObj, data;
            if (!obj.isEnabled()) return;
            obj.setMode($j.tools.getNextValueFromEnum($j.types.CalendarModes, obj.mode));
        },
        update: function () {
            var firstDay, firstDayOfWeek, d = 0, w = 0, sdn, div, i, l;
            if (!this._HTMLElement) return;
            $j.CSS.addClass(this._months, "hidden");
            $j.CSS.addClass(this._decades, "hidden");
            $j.CSS.addClass(this._century, "hidden");
            switch (this.mode) {
                case $j.types.CalendarModes.MONTHS:
                    d = 0;
                    div = this._months.querySelectorAll(".CalendarMonth");
                    this._months.dataset.view = true;
                    $j.CSS.removeClass(this._months, "hidden");
                    this._thisMonth.innerHTML = this.curDate.getFullYear();
                    for (i = 0; i < 12; i++) {
                        $j.CSS.removeClass(div[d], "CalendarThis CalendarSelected");
                        if (i === Date.now().getMonth()) $j.CSS.addClass(div[d], "CalendarThis");
                        if (i === this.curDate.getMonth()) $j.CSS.addClass(div[d], "CalendarSelected");
                        div[d].dataset.month = i;
                        div[d].jsObj = this;
                        div[d].dataset.theme = this.getThemeName();
                        $j.tools.events.unBind(div[d], $j.types.mouseEvents.CLICK, this.selectMonth);
                        $j.tools.events.bind(div[d], $j.types.mouseEvents.CLICK, this.selectMonth);
                        d++;
                    }
                    break;
                case $j.types.CalendarModes.DECADES:
                    div = this._decades.querySelectorAll(".CalendarDecade");
                    d = 0;
                    l = this.curDate.getFullYear() - ~~(this.curDate.getFullYear().toString().substr(3, 1));
                    for (i = l - 1; i < l + 11; i++) {
                        $j.CSS.removeClass(div[d], "CalendarSelected CalendarThis CalendarOutMonth");
                        div[d].dataset.theme = this.getThemeName();
                        if (i === this.curDate.getFullYear()) $j.CSS.addClass(div[d], "CalendarSelected");
                        if (i === Date.now().getFullYear()) $j.CSS.addClass(div[d], "CalendarThis");
                        if (i === l - 1 || i === l + 10) $j.CSS.addClass(div[d], "CalendarOutMonth");
                        div[d].innerHTML = i;
                        div[d].dataset.year = i;
                        div[d].jsObj = this;
                        $j.tools.events.unBind(div[d], $j.types.mouseEvents.CLICK, this.selectYear);
                        $j.tools.events.bind(div[d], $j.types.mouseEvents.CLICK, this.selectYear);
                        d++;
                    }
                    this._thisMonth.innerHTML = l + "-" + (l + 9);
                    this._decades.dataset.view = true;
                    $j.CSS.removeClass(this._decades, "hidden");
                    break;
                case $j.types.CalendarModes.CENTURIES:
                    var thisCentury = ~~(this.curDate.getFullYear().toString().substr(0, 2) + "00"), startCentury = thisCentury - 10, endCentury = thisCentury + 100;
                    this._thisMonth.innerHTML = thisCentury + "-" + (endCentury - 1);
                    this._century.dataset.view = true;
                    $j.CSS.removeClass(this._century, "hidden");
                    d = 0;
                    div = this._century.querySelectorAll(".CalendarCentury");
                    while (startCentury < endCentury) {
                        $j.CSS.removeClass(div[d], "CalendarOutMonth CalendarThis CalendarSelected");
                        if (startCentury % thisCentury > 100) $j.CSS.addClass(div[d], "CalendarOutMonth");
                        div[d].dataset.theme = this.getThemeName();
                        if (Date.now().getFullYear() >= startCentury && Date.now().getFullYear() <= startCentury + 9) $j.CSS.addClass(div[d], "CalendarThis");
                        if (this.curDate.getFullYear() >= startCentury && this.curDate.getFullYear() <= startCentury + 9) $j.CSS.addClass(div[d], "CalendarSelected");
                        div[d].innerHTML = startCentury + "<br />" + (startCentury + 9);
                        div[d].dataset.decade = startCentury + ~~(this.curDate.getFullYear().toString().substr(3, 1));
                        div[d].jsObj = this;
                        $j.tools.events.unBind(div[d], $j.types.mouseEvents.CLICK, this.selectDecades);
                        $j.tools.events.bind(div[d], $j.types.mouseEvents.CLICK, this.selectDecades);
                        startCentury += 10;
                        d++;
                    }
                    break;
                default:
                    this._weekDays.querySelector(".CalendarWeekNum").innerHTML = $j.tools.getLocale().date.weekShortName;
                    firstDay = this.curDate.getFirstDayOfMonth();
                    firstDayOfWeek = firstDay.day();
                    sdn = $j.tools.getLocale().date.shortestDayNames;
                    d = firstDayOfWeek;
                    w = 0;
                    // days of week
                    div = this._HTMLElement.querySelectorAll(".CalendarWeekDay");
                    while (w < 7) {
                        div[w].innerHTML = sdn[d].firstCharUpper();
                        d++;
                        if (d === 7) d = 0;
                        w++;
                    }
                    // month
                    this._thisMonth.innerHTML = $j.tools.getLocale().date.monthNames[this.curDate.getMonth()].firstCharUpper() + String.SPACE + this.curDate.year();
                    // days
                    div = this._HTMLElement.querySelectorAll(".CalendarDay");
                    firstDay = firstDay.getFirstDayOfWeek();
                    w = d = i = 0;
                    for (w = 0; w < this._weeks.length; w++) {
                        for (d = 0; d < 7; d++) {
                            $j.CSS.removeClass(div[i], 'CalendarOutMonth CalendarNow CalendarSelected');
                            if (firstDay.getMonth() !== this.curDate.getMonth()) $j.CSS.addClass(div[i], "CalendarOutMonth");
                            if (firstDay.getDate() === Date.now().getDate() && firstDay.getMonth() === Date.now().getMonth()) $j.CSS.addClass(div[i], "CalendarNow");
                            if (firstDay.getDate() === this.curDate.getDate() && firstDay.getMonth() === this.curDate.getMonth()) {
                                $j.CSS.addClass(div[i], "CalendarSelected");
                                this._lastSelectedDay = div[i];
                            }
                            div[i].innerHTML = firstDay.getDate();
                            div[i].dataset.day = firstDay.getDate();
                            div[i].jsObj = this;
                            $j.tools.events.unBind(div[i], $j.types.mouseEvents.CLICK, this.selectDay);
                            $j.tools.events.bind(div[i], $j.types.mouseEvents.CLICK, this.selectDay);
                            firstDay = firstDay.addDays(1);
                            i++;
                        }
                    }
                    break;
            }
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.date;
            if (data) this.curDate = new Date(data);
            data = this._HTMLElement.dataset.viewweeknum;
            if (data) this.setViewWeeksNum(_conv.strToBool(data));
            this._inherited();
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                    switch (this.mode) {
                        default:
                            this.curDate = this.curDate.addDays(-1);
                            break;
                        case $j.types.CalendarModes.MONTHS:
                            this.curDate = this.curDate.addMonths(-1);
                            this.setMode($j.types.CalendarModes.DAYS);
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this.curDate = this.curDate.addYears(-1);
                            this.setMode($j.types.CalendarModes.YEARS);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this.curDate = this.curDate.addYears(-10);
                            this.setMode($j.types.CalendarModes.DECADES);
                            break;
                    }
                    break;
                case $j.types.VKeysCodes.VK_UP:
                    switch (this.mode) {
                        default:
                            this.curDate = this.curDate.addDays(-7);
                            break;
                        case $j.types.CalendarModes.MONTHS:
                            this.curDate = this.curDate.addMonths(-4);
                            this.setMode($j.types.CalendarModes.DAYS);
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this.curDate = this.curDate.addYears(-4);
                            this.setMode($j.types.CalendarModes.YEARS);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this.curDate = this.curDate.addYears(-40);
                            this.setMode($j.types.CalendarModes.DECADES);
                            break;
                    }
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                    switch (this.mode) {
                        default:
                            this.curDate = this.curDate.addDays(1);
                            break;
                        case $j.types.CalendarModes.MONTHS:
                            this.curDate = this.curDate.addMonths(1);
                            this.setMode($j.types.CalendarModes.DAYS);
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this.curDate = this.curDate.addYears(1);
                            this.setMode($j.types.CalendarModes.YEARS);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this.curDate = this.curDate.addYears(10);
                            this.setMode($j.types.CalendarModes.DECADES);
                            break;
                    }
                    break;
                case $j.types.VKeysCodes.VK_DOWN:
                    switch (this.mode) {
                        default:
                            this.curDate = this.curDate.addDays(7);
                            break;
                        case $j.types.CalendarModes.MONTHS:
                            this.curDate = this.curDate.addMonths(4);
                            this.setMode($j.types.CalendarModes.DAYS);
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this.curDate = this.curDate.addYears(4);
                            this.setMode($j.types.CalendarModes.YEARS);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this.curDate = this.curDate.addYears(40);
                            this.setMode($j.types.CalendarModes.DECADES);
                            break;
                    }
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                    break;
                case $j.types.VKeysCodes.VK_END:
                    this.goToThisDay();
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    switch (this.mode) {
                        default:
                            this.curDate = this.curDate.addMonths(-1);
                            break;
                        case $j.types.CalendarModes.MONTHS:
                            this.curDate = this.curDate.addYears(-1);
                            this.setMode($j.types.CalendarModes.DAYS);
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this.curDate = this.curDate.addYears(-10);
                            this.setMode($j.types.CalendarModes.YEARS);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this.curDate = this.curDate.addYears(-100);
                            this.setMode($j.types.CalendarModes.DECADES);
                            break;
                    }
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    switch (this.mode) {
                        default:
                            this.curDate = this.curDate.addMonths(1);
                            break;
                        case $j.types.CalendarModes.MONTHS:
                            this.curDate = this.curDate.addYears(1);
                            this.mode = null;
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this.curDate = this.curDate.addYears(10);
                            this.setMode($j.types.CalendarModes.YEARS);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this.curDate = this.curDate.addYears(100);
                            this.setMode($j.types.CalendarModes.DECADES);
                            break;
                    }
                    break;
                case $j.types.VKeysCodes.VK_SPACE:
                    switch (this.mode) {
                        case $j.types.CalendarModes.MONTHS:
                            this._selectMonth(null);
                            break;
                        case $j.types.CalendarModes.DECADES:
                            this._selectYear(null);
                            break;
                        case $j.types.CalendarModes.CENTURIES:
                            this._selectDecades(null);
                            break;
                    }
                    break;
            }
            if ($j.keyboard.keyCode !== $j.types.VKeysCodes.VK_SPACE) this.update();
        },
        destroy: function () {
            this._inherited();
            this._prevMonth = null;
            this._thisDay = null
            this._nextMonth = null;
            this._thisMonth = null;
            this._weekDays = null;
            this._weeks.destroy();
            this._weeks = null;
            this._monthsC = null;
            this._decadesC = null;
            this._centuryC = null;
            this._lastSelectedDay = null;
            this._autoTranslate = null;
            this.curDate = null;
            this.viewWeeksNum = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{date}");
            html = a.join(Date.now());
            return html;
        },
        loaded: function () {
            this._inherited();
            this.update();
        }
        //#endregion
    });
    //#endregion
    Object.seal(Calendar);
    $j.classes.register($j.types.categories.COMMON, Calendar);
    //#region Templates
    var CalendarTpl = "<div id='{internalId}' data-class='Calendar' data-name='{name}' class='Control Calendar {theme}' data-viewweeknum='false' data-date='{date}'>\
                   <div class='Control CalendarContent {theme}'>\
                   <div class='Control CalendarHeader {theme}'>\
                   <div class='Control CalendarPrevMonth {theme}'></div>\
                   <div title='Aller à aujourd’hui' class='Control CalendarThisDay {theme}'></div>\
                   <div class='Control CalendarNextMonth {theme}'></div>\
                   <div class='Control CalendarThisMonth {theme}'>Octobre 2014</div>\
                   </div>\
                   <div class='Control CalendarWeekdays {theme}'>\
                   <div class='Control CalendarWeekNum {theme}'>se</div>\
                   <div class='Control CalendarWeekDay {theme}'>Lu</div>\
                   <div class='Control CalendarWeekDay {theme}'>Ma</div>\
                   <div class='Control CalendarWeekDay {theme}'>Me</div>\
                   <div class='Control CalendarWeekDay {theme}'>Je</div>\
                   <div class='Control CalendarWeekDay {theme}'>Ve</div>\
                   <div class='Control CalendarWeekDay {theme}'>Sa</div>\
                   <div class='Control CalendarWeekDay {theme}'>Di</div>\
                   </div>\
                   <div class='Control CalendarWeeks {theme}'>\
                   <div class='Control CalendarWeek CalendarFirstWeek {theme} alternate' data-week='0'>\
                   <div class='Control CalendarWeekNum {theme}'>40</div>\
                   <div class='Control CalendarDay {theme}'>29</div>\
                   <div class='Control CalendarDay {theme}'>30</div>\
                   <div class='Control CalendarDay {theme}'>1</div>\
                   <div class='Control CalendarDay {theme}'>2</div>\
                   <div class='Control CalendarDay {theme}'>3</div>\
                   <div class='Control CalendarDay {theme}'>4</div>\
                   <div class='Control CalendarDay {theme}'>5</div>\
                   </div>\
                   <div class='Control CalendarWeek CalendarSecondWeek {theme}' data-week='1'>\
                   <div class='Control CalendarWeekNum {theme}'>41</div>\
                   <div class='Control CalendarDay {theme}'>6</div>\
                   <div class='Control CalendarDay {theme}'>7</div>\
                   <div class='Control CalendarDay {theme}'>8</div>\
                   <div class='Control CalendarDay {theme}'>9</div>\
                   <div class='Control CalendarDay {theme}'>10</div>\
                   <div class='Control CalendarDay {theme}'>11</div>\
                   <div class='Control CalendarDay {theme}'>12</div>\
                   </div>\
                   <div class='Control CalendarWeek CalendarThirdWeek {theme} alternate' data-week='2'>\
                   <div class='Control CalendarWeekNum {theme}'>42</div>\
                   <div class='Control CalendarDay {theme}'>13</div>\
                   <div class='Control CalendarDay {theme}'>14</div>\
                   <div class='Control CalendarDay {theme}'>15</div>\
                   <div class='Control CalendarDay {theme}'>16</div>\
                   <div class='Control CalendarDay {theme}'>17</div>\
                   <div class='Control CalendarDay {theme}'>18</div>\
                   <div class='Control CalendarDay {theme}'>19</div>\
                   </div>\
                   <div class='Control CalendarWeek CalendarFourthWeek {theme}' data-week='3'>\
                   <div class='Control CalendarWeekNum {theme}'>43</div>\
                   <div class='Control CalendarDay {theme}'>20</div>\
                   <div class='Control CalendarDay {theme}'>21</div>\
                   <div class='Control CalendarDay {theme}'>22</div>\
                   <div class='Control CalendarDay {theme}'>23</div>\
                   <div class='Control CalendarDay {theme}'>24</div>\
                   <div class='Control CalendarDay {theme}'>25</div>\
                   <div class='Control CalendarDay {theme}'>26</div>\
                   </div>\
                   <div class='Control CalendarWeek CalendarFifthWeek {theme} alternate' data-week='4'>\
                   <div class='Control CalendarWeekNum {theme}'>44</div>\
                   <div class='Control CalendarDay {theme}'>27</div>\
                   <div class='Control CalendarDay {theme}'>28</div>\
                   <div class='Control CalendarDay {theme}'>29</div>\
                   <div class='Control CalendarDay {theme}'>30</div>\
                   <div class='Control CalendarDay {theme}'>31</div>\
                   <div class='Control CalendarDay {theme}'>1</div>\
                   <div class='Control CalendarDay {theme}'>2</div>\
                   </div>\
                   <div class='Control CalendarWeek CalendarSixthWeek {theme}' data-week='5'>\
                   <div class='Control CalendarWeekNum {theme}'>45</div>\
                   <div class='Control CalendarDay {theme}'>3</div>\
                   <div class='Control CalendarDay {theme}'>4</div>\
                   <div class='Control CalendarDay {theme}'>5</div>\
                   <div class='Control CalendarDay {theme}'>6</div>\
                   <div class='Control CalendarDay {theme}'>7</div>\
                   <div class='Control CalendarDay {theme}'>8</div>\
                   <div class='Control CalendarDay {theme}'>9</div>\
                   </div>\
                   </div>\
                   </div>\
                   <div class='Control CalendarMonths hidden {theme}'>\
                   <div data-month='0' class='Control CalendarMDC CalendarMonth {theme}'>Jan</div>\
                   <div data-month='1' class='Control CalendarMDC CalendarMonth {theme}'>Fev</div>\
                   <div data-month='2' class='Control CalendarMDC CalendarMonth {theme}'>Mars</div>\
                   <div data-month='3' class='Control CalendarMDC CalendarMonth {theme}'>Avr</div>\
                   <div data-month='4' class='Control CalendarMDC CalendarMonth {theme}'>Mai</div>\
                   <div data-month='5' class='Control CalendarMDC CalendarMonth {theme}'>Jun</div>\
                   <div data-month='6' class='Control CalendarMDC CalendarMonth {theme}'>Juil</div>\
                   <div data-month='7' class='Control CalendarMDC CalendarMonth {theme}'>Aout</div>\
                   <div data-month='8' class='Control CalendarMDC CalendarMonth {theme}'>Sep</div>\
                   <div data-month='9' class='Control CalendarMDC CalendarMonth {theme}'>Oct</div>\
                   <div data-month='10' class='Control CalendarMDC CalendarMonth {theme}'>Nov</div>\
                   <div data-month='11' class='Control CalendarMDC CalendarMonth {theme}'>Dec</div>\
                   </div>\
                   <div class='CalendarDecades hidden {theme}'>\
                   <div data-decade='0' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='1' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='2' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='3' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='4' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='5' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='6' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='7' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='8' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='9' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='10' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   <div data-decade='11' class='Control CalendarMDC CalendarDecade {theme}'></div>\
                   </div>\
                   <div class='CalendarCenturies hidden {theme}'>\
                   <div data-century='0' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='1' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='2' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='3' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='4' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='5' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='6' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='7' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='8' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='9' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   <div data-century='10' class='Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}'></div>\
                   </div>\
                   </div>";
    $j.classes.registerTemplates([{ Class: Calendar, template: CalendarTpl }]);
    //#endregion
})();*/