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
        //#region viewWeeksNum
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
        //#endregion viewWeeksNum
        //#region date
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
        //#endregion date
        //#endregion Getters / Setters
        //#region Methods
        //#region getHTMLElement
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
        //#endregion getHTMLElement
        //#region decDate
        decDate() {
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
        //#endregion decDate
        //#region goToThisDay
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
        //#ndregion goToThisDay
        //#region incDate
        incDate() {
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
        //#endregion incDate
        //#region selectDay
        selectDay() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectDay(this.dataset.day, this);
        }
        //#endregion selectDay
        //#region _selectDay
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
        //#endregion _selectDay
        //#region selectMonth
        selectMonth() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectMonth(this.dataset.month);
        }
        //#endregion selectMonth
        //#region _selectMonth
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
        //#endregion _selectMonth
        //#region selectYear
        selectYear() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectYear(this.dataset.year);
        }
        //#endregion selectYear
        //#region _selectYear
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
        //#endregion _selectYear
        //#region selectDecades
        selectDecades() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            obj._selectDecades(this.dataset.decade);
        }
        //#endregion selectDecades
        //#region _selectDecades
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
        //#endregion _selectDecades
        //#region animationEnd
        animationEnd() {
            //#region Variables déclaration
            const data = this.dataset.view;
            //#endregion Variables déclaration
            if (data === "false") {
                this.classList.remove("zoomOut");
                Events.unBind(this, "AnimationEnd", this.jsObj.animationEnd);
            }
        }
        //#endregion animationEnd
        //#region viewMYDC
        viewMYDC() {
            //#region Variables déclaration
            const obj = this.jsObj;
            //#endregion Variables déclaration
            if (obj.isEnabled) {
                obj.mode = Tools.getNextValueFromEnum(CALENDARMODES, obj.mode);
            }
        }
        //#endregion viewMYDC
        //#region update
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
                //super.update();
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
        //#endregion update
        //#region keyDown
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
        //#endregion keyDown
        //#region destroy
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
        //#endregion destroy
        //#region getTemplate
        getTemplate() {
            //#region Variables déclaration
            let html = super.getTemplate();
            //#endregion Variables déclaration
            const a = html.split("{date}");
            html = a.join(Date.now());
            return html;
        }
        //#endregion getTemplate
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#region loaded
        //#endregion Methods
    }
    return Calendar;
    //#endregion Calendar
})();
Object.seal(Calendar);
Core.classes.register(Types.CATEGORIES.COMMON, Calendar);
//#endregion Calendar
//#region Templates
const CalendarTpl = ["<jagui-calendar id=\"{internalId}\" data-class=\"Calendar\" class=\"Control Calendar {theme}\">",
    "<properties>{ \"name\": \"{name}\" }</properties>",
    "<jagui-calendarcontent class=\"Control CalendarContent {theme}\">",
    "<jagui-calendarheader class=\"Control CalendarHeader {theme}\">",
    "<jagui-calendarprevmonth class=\"Control CalendarPrevMonth {theme}\"></jagui-calendarprevmonth>",
    "<jagui-calendarthisday class=\"Control CalendarThisDay {theme}\"></jagui-calendarthisday>",
    "<jagui-calendarnextmonth class=\"Control CalendarNextMonth {theme}\"></jagui-calendarnextmonth>",
    "<jagui-calendarthismonth class=\"Control CalendarThisMonth {theme}\"></jagui-calendarthismonth>",
    "</jagui-calendarheader>",
    "<jagui-calendarweekdays class=\"Control CalendarWeekdays {theme}\">",
    "<jagui-calendarweeknum class=\"Control CalendarWeekNum {theme}\"></jagui-calendarweeknum>",
    "<jagui-calendarweekday class=\"Control CalendarWeekDay {theme}\"></jagui-calendarweekday>",
    "<jagui-calendarweekday class=\"Control CalendarWeekDay {theme}\"></jagui-calendarweekday>",
    "<jagui-calendarweekday class=\"Control CalendarWeekDay {theme}\"></jagui-calendarweekday>",
    "<jagui-calendarweekday class=\"Control CalendarWeekDay {theme}\"></jagui-calendarweekday>",
    "<jagui-calendarweekday class=\"Control CalendarWeekDay {theme}\"></jagui-calendarweekday>",
    "<jagui-calendarweekday class=\"Control CalendarWeekDay {theme}\"></jagui-calendarweekday>",
    "<jagui-calendarweekday class=\"Control CalendarWeekDay {theme}\"></jagui-calendarweekday>",
    "</jagui-calendarweekdays>",
    "<jagui-calendarweeks class=\"Control CalendarWeeks {theme}\">",
    "<jagui-calendarfirstweek class=\"Control CalendarWeek CalendarFirstWeek {theme} alternate\" data-week=\"0\">",
    "<jagui-calendarweeknum class=\"Control CalendarWeekNum {theme}\"></jagui-calendarweeknum>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "</jagui-calendarfirstweek>",
    "<jagui-calendarsecondweek class=\"Control CalendarWeek CalendarSecondWeek {theme}\" data-week=\"1\">",
    "<jagui-calendarweeknum class=\"Control CalendarWeekNum {theme}\"></jagui-calendarweeknum>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "</jagui-calendarsecondweek>",
    "<jagui-calendarthirdweek class=\"Control CalendarWeek CalendarThirdWeek {theme} alternate\" data-week=\"2\">",
    "<jagui-calendarweeknum class=\"Control CalendarWeekNum {theme}\"></jagui-calendarweeknum>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "</jagui-calendarthirdweek>",
    "<jagui-calendarfourthweek class=\"Control CalendarWeek CalendarFourthWeek {theme}\" data-week=\"3\">",
    "<jagui-calendarweeknum class=\"Control CalendarWeekNum {theme}\"></jagui-calendarweeknum>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "</jagui-calendarfourthweek>",
    "<jagui-calendarfifthweek class=\"Control CalendarWeek CalendarFifthWeek {theme} alternate\" data-week=\"4\">",
    "<jagui-calendarweeknum class=\"Control CalendarWeekNum {theme}\"></jagui-calendarweeknum>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "</jagui-calendarfifthweek>",
    "<jagui-calendarsixthweek class=\"Control CalendarWeek CalendarSixthWeek {theme}\" data-week=\"5\">",
    "<jagui-calendarweeknum class=\"Control CalendarWeekNum {theme}\"></jagui-calendarweeknum>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "<jagui-calendarday class=\"Control CalendarDay {theme}\"></jagui-calendarday>",
    "</jagui-calendarsixthweek>",
    "</jagui-calendarweeks>",
    "</jagui-calendarcontent>",
    "<jagui-calendarmonths class=\"Control CalendarMonths {theme}\">",
    "<jagui-calendarmonth data-month=\"0\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"1\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"2\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"3\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"4\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"5\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"6\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"7\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"8\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"9\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"10\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "<jagui-calendarmonth data-month=\"11\" class=\"Control CalendarMDC CalendarMonth {theme}\"></jagui-calendarmonth>",
    "</jagui-calendarmonths>",
    "<jagui-calendardecades class=\"Control CalendarDecades {theme}\">",
    "<jagui-calendardecade data-decade=\"0\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"1\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"2\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"3\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"4\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"5\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"6\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"7\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"8\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"9\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"10\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "<jagui-calendardecade data-decade=\"11\" class=\"Control CalendarMDC CalendarDecade {theme}\"></jagui-calendardecade>",
    "</jagui-calendardecades>",
    "<jagui-calendarcenturies class=\"Control CalendarCenturies {theme}\">",
    "<jagui-calendarcentury data-century=\"0\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"1\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"2\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"3\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"4\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"5\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"6\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"7\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"8\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"9\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "<jagui-calendarcentury data-century=\"10\" class=\"Control CalendarMDC CalendarMDCx2 CalendarCentury {theme}\"></jagui-calendarcentury>",
    "</jagui-calendarcenturies>",
    "</jagui-calendar>"].join(String.EMPTY);
Core.classes.registerTemplates([{ Class: Calendar, template: CalendarTpl }]);
    //#endregion