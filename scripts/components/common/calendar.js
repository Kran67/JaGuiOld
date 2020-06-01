//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion Import
//#region CALENDARMODES
const CALENDARMODES = Object.freeze(Object.seal({
    DAYS: 'days',
    MONTHS: 'months',
    DECADES: 'decades',
    CENTURIES: 'centuries'
}));
//#endregion CALENDARMODES
//#region Class CustomButton
class Calendar extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !0;
            super(owner, props);
            core.private(this, {
                prevMonth: null,
                thisDay: null,
                nextMonth: null,
                thisMonth: null,
                weekDays: null,
                weeks: new Array(6),
                months: null,
                decades: null,
                centuries: null,
                lastSelectedDay: null,
                autoTranslate: !0,
                curDate: props.hasOwnProperty('date') ? new Date(props.date) : new Date(Date.now()),
                viewWeeksNum: props.hasOwnProperty('viewWeeksNum') && core.tools.isBool(props.viewWeeksNum)
                    ? props.viewWeeksNum : !1
            });
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'mode',
                enum: CALENDARMODES,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, CALENDARMODES) || newValue === null) {
                        if (priv.mode !== newValue) {
                            priv.mode = newValue;
                            priv.decades.classList.remove('zoomOut');
                            priv.centuries.classList.remove('zoomOut');
                            priv.months.classList.remove('zoomOut');
                            switch (priv.mode) {
                                case CALENDARMODES.DECADES:
                                    priv.decades.classList.add('zoomOut');
                                    break;
                                case CALENDARMODES.CENTURIES:
                                    priv.centuries.classList.add('zoomOut');
                                    break;
                                case CALENDARMODES.MONTHS:
                                    priv.months.classList.add('zoomOut');
                                    break;
                            }
                        }
                        this.update();
                    }
                },
                value: props.hasOwnProperty('mode') ? props.mode : CALENDARMODES.DAYS,
                forceUpdate: !0
            });
            this.createEventsAndBind(['onChange'], props);
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
        return core.private(this).viewWeeksNum;
    }
    set viewWeeksNum(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.viewWeeksNum !== newValue) {
            priv.viewWeeksNum = newValue;
            this.update();
        }
    }
    //#endregion viewWeeksNum
    //#region date
    get date() {
        return core.private(this).curDate;
    }
    set date(date) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (date instanceof Date) {
            priv.curDate = date;
            this.update();
            this.onChange.invoke();
        }
    }
    //#endregion date
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template;
        //#endregion Variables déclaration
        const a = html.split('{date}');
        html = a.join(Date.now());
        return html;
    }
    //#endregion template
    //#endregion Getters / Setters
    //#region Methods
    //#region decDate
    decDate() {
        if (this.isEnabled) {
            switch (this.mode) {
                case CALENDARMODES.MONTHS:
                    this.date = this.date.addYears(-1);
                    break;
                case CALENDARMODES.DECADES:
                    this.date = this.date.addYears(-10);
                    break;
                case CALENDARMODES.CENTURIES:
                    this.date = this.date.addYears(-100);
                    break;
                default:
                    this.date = this.date.addMonths(-1);
                    break;
            }
            this.update();
        }
    }
    //#endregion decDate
    //#region goToThisDay
    goToThisDay() {
        if (this.isEnabled) {
            this.date = new Date(Date.now());
            this.mode = CALENDARMODES.DAYS;
        }
    }
    //#endregion goToThisDay
    //#region incDate
    incDate() {
        if (this.isEnabled) {
            switch (this.mode) {
                case CALENDARMODES.MONTHS:
                    this.date = this.date.addYears(1);
                    break;
                case CALENDARMODES.DECADES:
                    this.date = this.date.addYears(10);
                    break;
                case CALENDARMODES.CENTURIES:
                    this.date = this.date.addYears(100);
                    break;
                default:
                    this.date = this.date.addMonths(1);
                    break;
            }
            this.update();
        }
    }
    //#endregion incDate
    //#region selectDay
    selectDay() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlObj = core.mouse.event.target;
        const day = htmlObj.dataset.day;
        //#endregion Variables déclaration
        if (this.isEnabled && day) {
            priv.curDate.setDate(int(day));
            htmlObj && (priv.lastSelectedDay = htmlObj);
            this.update();
        }
    }
    //#endregion selectDay
    //#region selectMonth
    selectMonth() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlObj = core.mouse.event.target;
        const month = htmlObj.dataset.month;
        //#endregion Variables déclaration
        if (this.isEnabled) {
            month && priv.curDate.setMonth(int(month));
            Events.bind(priv.months, 'AnimationEnd', this.animationEnd);
            priv.months.dataset.view = !1;
            this.mode = CALENDARMODES.DAYS;
        }
    }
    //#endregion selectMonth
    //#region selectYear
    selectYear() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlObj = core.mouse.event.target;
        const year = htmlObj.dataset.year;
        //#endregion Variables déclaration
        if (this.isEnabled) {
            year && priv.curDate.setFullYear(int(year));
            Events.bind(priv.decades, 'AnimationEnd', this.animationEnd);
            priv.decades.dataset.view = !1;
            this.mode = CALENDARMODES.MONTHS;
        }
    }
    //#endregion selectYear
    //#region selectDecades
    selectDecades() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlObj = core.mouse.event.target;
        const decade = htmlObj.dataset.decade;
        //#endregion Variables déclaration
        if (this.isEnabled) {
            decade && priv.curDate.setFullYear(int(decade));
            Events.bind(priv.centuries, 'AnimationEnd', this.animationEnd);
            priv.centuries.dataset.view = !1;
            this.mode = CALENDARMODES.DECADES;
        }
    }
    //#endregion selectDecades
    //#region animationEnd
    animationEnd() {
        //#region Variables déclaration
        const data = this.dataset.view;
        //#endregion Variables déclaration
        if (data === 'false') {
            this.classList.remove('zoomOut');
            Events.unBind(this, 'AnimationEnd', this.jsObj.animationEnd);
        }
    }
    //#endregion animationEnd
    //#region viewMYDC
    viewMYDC() {
        this.isEnabled && (this.mode = core.tools.getNextValueFromEnum(CALENDARMODES, this.mode));
    }
    //#endregion viewMYDC
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        let d = 0;
        let w = 0;
        let div;
        let l;
        const date = new Date(Date.now());
        //#endregion Variables déclaration
        if (htmlElement) {
            htmlElement.classList[priv.viewWeeksNum ? 'add' : 'remove']('viewweeknum');
            priv.months.classList.add('hidden');
            priv.decades.classList.add('hidden');
            priv.centuries.classList.add('hidden');
            switch (priv.mode) {
                case CALENDARMODES.MONTHS:
                    d = 0;
                    div = priv.months.querySelectorAll('.CalendarMonth');
                    priv.months.dataset.view = !0;
                    priv.months.classList.remove('hidden');
                    priv.thisMonth.innerHTML = priv.curDate.getFullYear();
                    for (let i = 0; i < 12; i++) {
                        div[d].classList.remove('CalendarThis', 'CalendarSelected');
                        i === date.month - 1 && div[d].classList.add('CalendarThis');
                        i === priv.curDate.month - 1 && div[d].classList.add('CalendarSelected');
                        div[d].jsObj = this;
                        div[d].dataset.theme = this.themeName;
                        d++;
                    }
                    break;
                case CALENDARMODES.DECADES:
                    div = priv.decades.querySelectorAll('.CalendarDecade');
                    d = 0;
                    l = priv.curDate.getFullYear() - int(priv.curDate.getFullYear().toString().substr(3, 1));
                    for (let i = l - 1; i < l + 11; i++) {
                        div[d].classList.remove('CalendarSelected', 'CalendarThis', 'CalendarOutMonth');
                        div[d].dataset.theme = this.themeName;
                        i === priv.curDate.getFullYear() && div[d].classList.add('CalendarSelected');
                        i === date.getFullYear() && div[d].classList.add('CalendarThis');
                        i === l - 1 || i === l + 10 && div[d].classList.add('CalendarOutMonth');
                        div[d].innerHTML = i;
                        div[d].dataset.year = i;
                        div[d].jsObj = this;
                        d++;
                    }
                    priv.thisMonth.innerHTML = `${l}-${(l + 9)}`;
                    priv.decades.dataset.view = !0;
                    priv.decades.classList.remove('hidden');
                    break;
                case CALENDARMODES.CENTURIES:
                    {
                        const thisCentury = int(priv.curDate.getFullYear().toString().substr(0, 2) + '00');
                        let startCentury = thisCentury - 10;
                        const endCentury = thisCentury + 100;
                        priv.thisMonth.innerHTML = `${thisCentury}-${(endCentury - 1)}`;
                        priv.centuries.dataset.view = !0;
                        priv.centuries.classList.remove('hidden');
                        d = 0;
                        div = priv.centuries.querySelectorAll('.CalendarCentury');
                        while (startCentury < endCentury) {
                            div[d].classList.remove('CalendarOutMonth', 'CalendarThis', 'CalendarSelected');
                            startCentury % thisCentury > 100 && div[d].classList.add('CalendarOutMonth');
                            div[d].dataset.theme = this.themeName;
                            date.getFullYear() >= startCentury && date.getFullYear() <= startCentury + 9
                                && div[d].classList.add('CalendarThis');
                            priv.curDate.getFullYear() >= startCentury
                                && priv.curDate.getFullYear() <= startCentury + 9
                                && div[d].classList.add('CalendarSelected');
                            div[d].innerHTML = `${startCentury}<br />${(startCentury + 9)}`;
                            div[d].dataset.decade = `${startCentury + int(priv.curDate.getFullYear().toString().substr(3, 1))}`;
                            div[d].jsObj = this;
                            startCentury += 10;
                            d++;
                        }
                    }
                    break;
                default:
                    {
                        priv.weekDays.querySelector('.CalendarWeekNum').innerHTML = core.tools.getLocale().date.weekShortName;
                        let firstDay = priv.curDate.firstDayOfMonth;
                        const firstDayOfWeek = firstDay.day;
                        const sdn = core.tools.getLocale().date.shortestDayNames;
                        w = 0;
                        firstDay = firstDay.firstDayOfWeek;
                        if (priv.viewWeeksNum) {
                            div = Convert.nodeListToArray(htmlElement.querySelectorAll('.CalendarWeekNum'));
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
                        div = htmlElement.querySelectorAll('.CalendarWeekDay');
                        while (w < 7) {
                            div[w].innerHTML = sdn[d].firstCharUpper;
                            d++;
                            d === 7 && (d = 0);
                            w++;
                        }
                        // month
                        priv.thisMonth.innerHTML = `${core.tools.getLocale().date.monthNames[priv.curDate.month - 1].firstCharUpper} ${priv.curDate.year}`;
                        // days
                        firstDay = priv.curDate.firstDayOfMonth.firstDayOfWeek;
                        div = htmlElement.querySelectorAll('.CalendarDay');
                        let i = 0;
                        w = d = 0;
                        for (w = 0; w < priv.weeks.length; w++) {
                            for (d = 0; d < 7; d++) {
                                div[i].classList.remove('CalendarOutMonth', 'CalendarNow', 'CalendarSelected');
                                firstDay.getMonth() !== priv.curDate.getMonth()
                                    && div[i].classList.add('CalendarOutMonth');
                                if (firstDay.getDate() === date.getDate() &&
                                    firstDay.month === date.month &&
                                    firstDay.year === date.year) {
                                    div[i].classList.add('CalendarNow');
                                }
                                if (firstDay.getDate() === priv.curDate.getDate() &&
                                    firstDay.month === priv.curDate.month) {
                                    div[i].classList.add('CalendarSelected');
                                    priv.lastSelectedDay = div[i];
                                }
                                div[i].innerHTML = firstDay.getDate();
                                div[i].dataset.day = firstDay.getDate();
                                div[i].jsObj = this;
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
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
                    case $j.core.types.CalendarModes.MONTHS:
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
                    case CALENDARMODES.DECADES:
                        this.curDate = this.curDate.addYears(4);
                        this.setMode(CALENDARMODES.YEARS);
                        break;
                    case CALENDARMODES.CENTURIES:
                        this.curDate = this.curDate.addYears(40);
                        this.setMode(CALENDARMODES.DECADES);
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
        core.keyboard.key !== Keyboard.VKEYSCODES.VK_SPACE && this.update();
    }
    //#endregion keyDown
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const self = this;
        const tag = `${core.name.toLowerCase()}-${self.constructor.name.toLowerCase()}`;
        //#region generateContentHeaderAndWeeks
        const generateContent = function () {
            const content = document.createElement(`${tag}content`);
            content.classList.add('Control', 'CalendarContent', self.themeName);
            htmlElement.appendChild(content);
            generateHeader(content);
            generateWeekDays(content);
            generateWeeks(content);
            generateMonths(content);
            generateDecades(content);
            generateCenturies(content);
        };
        //#endregion generateContentHeaderAndWeeks
        //#region generateHeader
        const generateHeader = function (content) {
            const header = document.createElement(`${tag}header`);
            header.classList.add('Control', 'CalendarHeader', self.themeName);
            content.appendChild(header);
            priv.prevMonth = document.createElement(`${tag}prevmonth`);
            priv.prevMonth.classList.add('Control', 'CalendarPrevMonth', self.themeName);
            priv.prevMonth.jsObj = self;
            header.appendChild(priv.prevMonth);
            priv.thisDay = document.createElement(`${tag}thisday`);
            priv.thisDay.classList.add('Control', 'CalendarThisDay', self.themeName);
            priv.thisDay.jsObj = self;
            header.appendChild(priv.thisDay);
            priv.nextMonth = document.createElement(`${tag}nextmonth`);
            priv.nextMonth.classList.add('Control', 'CalendarNextMonth', self.themeName);
            priv.nextMonth.jsObj = self;
            header.appendChild(priv.nextMonth);
            priv.thisMonth = document.createElement(`${tag}thismonth`);
            priv.thisMonth.classList.add('Control', 'CalendarThisMonth', self.themeName);
            priv.thisMonth.jsObj = self;
            header.appendChild(priv.thisMonth);
        };
        //#endregion generateHeader
        //#region generateWeekDays
        const generateWeekDays = function (content) {
            priv.weekDays = document.createElement(`${tag}weekdays`);
            priv.weekDays.classList.add('Control', 'CalendarWeekdays', self.themeName);
            content.appendChild(priv.weekDays);
            generateWeekNumAndDay(priv.weekDays, !0);
        };
        //#endregion generateWeekDays
        //#region generateWeekNumAndDay
        const generateWeekNumAndDay = function (content, isWeekDay) {
            const weekNum = document.createElement(`${tag}weeknum`);
            weekNum.classList.add('Control', 'CalendarWeekNum', self.themeName);
            content.appendChild(weekNum);
            for (let i = 0; i < 7; i++) {
                const weekDay = document.createElement(`${tag}weekday`);
                weekDay.classList.add('Control', `Calendar${isWeekDay ? 'Week' : String.EMPTY}Day`, self.themeName);
                content.appendChild(weekDay);
            }
        };
        //#endregion generateWeekNumAndDay
        //#region generateWeeks
        const generateWeeks = function (content) {
            const weeks = document.createElement(`${tag}weeks`);
            weeks.classList.add('Control', 'CalendarWeeks', self.themeName);
            content.appendChild(weeks);
            ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].forEach((weekName, idx) => {
                const week = document.createElement(`${tag}${weekName.toLowerCase()}week`);
                week.classList.add('Control', 'CalendarWeek', `Calendar${weekName}Week`, self.themeName);
                idx % 2 === 0 && week.classList.add('alternate');
                week.dataset.week = idx;
                weeks.appendChild(week);
                generateWeekNumAndDay(week);
            });
        };
        //#endregion generateWeeks
        //#region generateMonths
        const generateMonths = function (content) {
            priv.months = document.createElement(`${tag}months`);
            priv.months.classList.add("Control", "CalendarMonths", self.themeName);
            priv.months.jsObj = self;
            content.appendChild(priv.months);
            for (let i = 0; i < 12; i++) {
                const month = document.createElement(`${tag}month`);
                month.innerHTML = core.tools.getLocale().date.abbreviatedMonthNames[i].firstCharUpper;
                month.classList.add('Control', 'CalendarMDC', 'CalendarMonth', self.themeName);
                month.dataset.month = i;
                priv.months.appendChild(month);
            }
        };
        //#endregion generateMonths
        //#region generateDecades
        const generateDecades = function (content) {
            priv.decades = document.createElement(`${tag}decades`);
            priv.decades.classList.add('Control', 'CalendarDecades', self.themeName);
            priv.decades.jsObj = self;
            content.appendChild(priv.decades);
            let currentYear = new Date().getFullYear() - 1;
            for (let i = 0; i < 12; i++) {
                const decade = document.createElement(`${tag}decade`);
                decade.innerHTML = currentYear;
                decade.classList.add('Control', 'CalendarMDC', 'CalendarDecade', self.themeName);
                decade.dataset.decade = i;
                priv.decades.appendChild(decade);
                currentYear++;
            }
        };
        //#endregion generateDecades
        //#region generateCenturies
        const generateCenturies = function (content) {
            priv.centuries = document.createElement(`${tag}centuries`);
            priv.centuries.classList.add('Control', 'CalendarCenturies', self.themeName);
            priv.centuries.jsObj = self;
            content.appendChild(priv.centuries);
            for (let i = 0; i < 11; i++) {
                const century = document.createElement(`${tag}century`);
                century.classList.add('Control', 'CalendarMDC', 'CalendarMDCx2', 'CalendarCentury', self.themeName);
                century.dataset.century = i;
                priv.centuries.appendChild(century);
            }
        };
        //#endregion generateCenturies
        //#endregion Variables déclaration
        super.loaded();
        !htmlElement.querySelector('.CalendarContent') && generateContent();
        this.update();
    }
    //#endregion loaded
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const tag = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        //#endregion Variables déclaration
        super.mouseDown();
        switch (core.mouse.event.target.tagName.toLowerCase()) {
            case `${tag}weekday`:
                this.selectDay();
                break;
            case `${tag}thismonth`:
                this.viewMYDC();
                break;
            case `${tag}nextmonth`:
                this.incDate();
                break;
            case `${tag}thisday`:
                this.goToThisDay();
                break;
            case `${tag}prevmonth`:
                this.decDate();
                break;
            case `${tag}month`:
                this.selectMonth();
                break;
            case `${tag}decade`:
                this.selectYear();
                break;
            case `${tag}century`:
                this.selectDecades();
                break;
        }
    }
    //#endregion mouseDown
    //#endregion Methods
}
Object.seal(Calendar);
core.classes.register(core.types.CATEGORIES.COMMON, Calendar);
//#endregion Calendar
//#region Templates
const CalendarTpl = ['<jagui-calendar id="{internalId}" data-class="Calendar" class="Control Calendar {theme}">',
    '<properties>{ "name": "{name}" }</properties></jagui-calendar>'].join(String.EMPTY);
core.classes.registerTemplates([{ Class: Calendar, template: CalendarTpl }]);
//#endregion
export { Calendar };