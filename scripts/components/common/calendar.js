//#region Import
import { BaseClass } from '/scripts/core/baseclass.js';
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
//#region Class CalendarItem
class CalendarItem extends BaseClass {
    //#region constructor
    constructor(owner, props) {
        const div = document.createElement(core.types.HTMLELEMENTS.DIV);
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !1;
            super(owner, props);
            props.hasOwnProperty('parentHTML') && (div.innerHTML = props.html);
            const priv = core.private(this, {
                owner,
                form: owner.form,
                caption: props.hasOwnProperty('caption') ? props.caption : String.EMPTY,
                cssClasses: props.hasOwnProperty('cssClasses') ? props.cssClasses : String.EMPTY,
                selected: props.hasOwnProperty('selected') && core.tools.isBool(props.selected)
                    ? props.selected : !1,
                enabled: props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled)
                    ? props.enabled : !0,
                html: props.hasOwnProperty('parentHTML') ? div.firstElementChild : null,
                value: props.hasOwnProperty('value') ? props.value : null
            });
            this.mouseEvents = new core.classes.MouseEvents();
            props.hasOwnProperty('parentHTML') && props.parentHTML.appendChild(priv.html);
            priv.html && (priv.html.innerHTML = priv.caption);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region form
    get form() {
        return core.private(this).owner.form;
    }
    //#endregion form
    //#region html
    get html() {
        return core.private(this).html;
    }
    //#endregion html
    //#region app
    get app() {
        return core.private(this).owner.app;
    }
    //#endregion app
    //#region enabled
    get enabled() {
        return core.private(this).enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.enabled !== newValue) {
            priv.enabled = newValue;
            priv.html && priv.html.classList[priv.enabled ? 'remove' : 'add']('disabled');
        }
    }
    //#endregion enabled
    //#region caption
    get caption() {
        return core.private(this).caption;
    }
    set caption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.caption !== newValue) {
            priv.caption = newValue;
            priv.html && (priv.html.innerHTML = priv.caption);
        }
    }
    //#endregion caption
    //#region selected
    get selected() {
        return core.private(this).selected;
    }
    set selected(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && !priv.isHeader && priv.enabled && priv.selected !== newValue) {
            priv.selected = newValue;
            priv.html && priv.html.classList[priv.selected ? 'add' : 'remove']('CalendarSelected');
        }
    }
    //#endregion selected
    //#region isEnabled
    get isEnabled() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.enabled && priv.owner.isEnabled;
    }
    //#endregion isEnabled
    //#region html
    get html() {
        return core.private(this).html;
    }
    //#endregion html
    //#region owner
    get owner() {
        return core.private(this).owner;
    }
    //#endregion owner
    //#region value
    get value() {
        return core.private(this).value;
    }
    set value(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.value !== newValue && (priv.value = newValue);
    }
    //#endregion selected
    //#endregion Getters / Setters
    //#region Methods
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.mouseEvents.destroy();
        this.mouseEvents = null;
        delete this.mouseEvents;
        super.destroy();
    }
    //#endregion destroy
    //#region mouseDown
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        !String.isNullOrEmpty(priv.cssClasses) && priv.html.classList.add(...priv.cssClasses.split(' '));
    }
    //#endregion mouseDown
    //#endregion Methods
}
Object.defineProperties(CalendarItem.prototype, {
    'caption': {
        enumerable: !0
    },
    'enabled': {
        enumerable: !0
    },
    'selected': {
        enumerable: !0
    },
    'cssClasses': {
        enumerable: !0
    }
});
Object.seal(CalendarItem);
//#endregion Class CalendarItem
//#region Class Calendar
class Calendar extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !0;
            super(owner, props);
            core.private(this, {
                weeks: new Array(6),
                autoTranslate: !0,
                curDate: props.hasOwnProperty('date') ? new Date(props.date) : new Date(Date.now()),
                viewWeeksNum: props.hasOwnProperty('viewWeeksNum') && core.tools.isBool(props.viewWeeksNum)
                    ? props.viewWeeksNum : !1,
                dayItems: [],
                monthItems: [],
                decadeItems: [],
                centuryItems: []
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
        const owner = this.owner;
        const oPriv = core.private(owner);
        const day = int(priv.value);
        //#endregion Variables déclaration
        if (this.isEnabled) {
            oPriv.curDate.setDate(day);
            priv.html && (oPriv.lastSelectedDay = priv.html);
            owner.update();
        }
    }
    //#endregion selectDay
    //#region selectMonth
    selectMonth() {
        //#region Variables déclaration
        const priv = core.private(this);
        const owner = this.owner;
        const oPriv = core.private(this.owner);
        const month = int(priv.value);
        //#endregion Variables déclaration
        if (this.isEnabled) {
            oPriv.curDate.setMonth(month);
            Events.bind(oPriv.months, 'AnimationEnd', owner.animationEnd);
            owner.mode = CALENDARMODES.DAYS;
        }
    }
    //#endregion selectMonth
    //#region selectYear
    selectYear() {
        //#region Variables déclaration
        const priv = core.private(this);
        const owner = this.owner;
        const oPriv = core.private(this.owner);
        const year = int(priv.value);
        //#endregion Variables déclaration
        if (this.isEnabled) {
            oPriv.curDate.setFullYear(year);
            Events.bind(priv.decades, 'AnimationEnd', owner.animationEnd);
            owner.mode = CALENDARMODES.MONTHS;
        }
    }
    //#endregion selectYear
    //#region selectDecades
    selectDecades() {
        //#region Variables déclaration
        const priv = core.private(this);
        const owner = this.owner;
        const oPriv = core.private(this.owner);
        const decade = int(priv.value);
        //#endregion Variables déclaration
        if (this.isEnabled) {
            oPriv.curDate.setFullYear(decade);
            Events.bind(priv.centuries, 'AnimationEnd', owner.animationEnd);
            owner.mode = CALENDARMODES.DECADES;
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
                    priv.months.dataset.view = !0;
                    priv.months.classList.remove('hidden');
                    priv.thisMonth.caption = priv.curDate.getFullYear().toString();
                    for (let i = 0; i < 12; i++) {
                        const month = priv.monthItems[d];
                        const mHtml = month.html;
                        mHtml.classList.remove('CalendarThis', 'CalendarSelected');
                        i === date.month - 1 && mHtml.classList.add('CalendarThis');
                        i === priv.curDate.month - 1 && mHtml.classList.add('CalendarSelected');
                        month.value = i;
                        d++;
                    }
                    break;
                case CALENDARMODES.DECADES:
                    d = 0;
                    l = priv.curDate.getFullYear();
                    for (let i = l - 1; i < l + 11; i++) {
                        const year = priv.decadeItems[d];
                        const mHtml = year.html;
                        mHtml.classList.remove('CalendarSelected', 'CalendarThis', 'CalendarOutMonth');
                        i === priv.curDate.getFullYear() && mHtml.classList.add('CalendarSelected');
                        i === date.getFullYear() && mHtml.classList.add('CalendarThis');
                        (i === l - 1 || i === l + 10) && mHtml.classList.add('CalendarOutMonth');
                        year.value = i;
                        year.caption = i.toString();
                        d++;
                    }
                    priv.thisMonth.caption = `${l}-${l + 9}`;
                    priv.decades.dataset.view = !0;
                    priv.decades.classList.remove('hidden');
                    break;
                case CALENDARMODES.CENTURIES:
                    {
                        const thisCentury = int(priv.curDate.getFullYear().toString().substr(0, 2) + '00');
                        let startCentury = thisCentury - 10;
                        const endCentury = thisCentury + 100;
                        priv.thisMonth.caption = `${thisCentury}-${(endCentury - 1)}`;
                        priv.centuries.dataset.view = !0;
                        priv.centuries.classList.remove('hidden');
                        d = 0;
                        while (startCentury < endCentury) {
                            const century = priv.centuryItems[d];
                            const mHtml = century.html;
                            mHtml.classList.remove('CalendarOutMonth', 'CalendarThis', 'CalendarSelected');
                            startCentury % thisCentury > 100 && mHtml.classList.add('CalendarOutMonth');
                            date.getFullYear() >= startCentury && date.getFullYear() <= startCentury + 9
                                && mHtml.classList.add('CalendarThis');
                            priv.curDate.getFullYear() >= startCentury
                                && priv.curDate.getFullYear() <= startCentury + 9
                                && mHtml.classList.add('CalendarSelected');
                            century.value = startCentury;
                            century.caption = `${startCentury}<br />${century.value}`;
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
                        priv.thisMonth.caption = `${core.tools.getLocale().date.monthNames[priv.curDate.month - 1].firstCharUpper} ${priv.curDate.year}`;
                        // days
                        firstDay = priv.curDate.firstDayOfMonth.firstDayOfWeek;
                        let i = 0;
                        w = d = 0;
                        for (w = 0; w < priv.weeks.length; w++) {
                            for (d = 0; d < 7; d++) {
                                const day = priv.dayItems[i];
                                const dHtml = day.html;
                                dHtml.classList.remove('CalendarOutMonth', 'CalendarNow', 'CalendarSelected');
                                firstDay.getMonth() !== priv.curDate.getMonth()
                                    && dHtml.classList.add('CalendarOutMonth');
                                if (firstDay.getDate() === date.getDate() &&
                                    firstDay.month === date.month &&
                                    firstDay.year === date.year) {
                                    dHtml.classList.add('CalendarNow');
                                }
                                if (firstDay.getDate() === priv.curDate.getDate() &&
                                    firstDay.month === priv.curDate.month) {
                                    dHtml.classList.add('CalendarSelected');
                                    priv.lastSelectedDay = dHtml;
                                }
                                day.caption = firstDay.getDate().toString();
                                day.value = firstDay.getDate();
                                dHtml.dataset.day = firstDay.getDate();
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
            case Keyboard.VKEYSCODES.VK_PAGEUP:
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
            case Keyboard.VKEYSCODES.VK_PAGEDOWN:
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
            content.classList.add('CalendarContent', self.themeName);
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
            header.classList.add('CalendarHeader', self.themeName);
            content.appendChild(header);
            priv.prevMonth = core.classes.createComponent({
                class: CalendarItem,
                owner: self,
                props: {
                    caption: String.EMPTY,
                    cssClasses: `CalendarPrevMonth ${self.themeName}`,
                    html: core.classes.getTemplate('CalendarItem'),
                    parentHTML: header
                }
            });
            Events.bind(priv.prevMonth.html, Mouse.MOUSEEVENTS.DOWN, self.decDate.bind(self));
            priv.prevMonth.loaded();
            priv.thisDay = core.classes.createComponent({
                class: CalendarItem,
                owner: self,
                props: {
                    caption: String.EMPTY,
                    cssClasses: `CalendarThisDay ${self.themeName}`,
                    html: core.classes.getTemplate('CalendarItem'),
                    parentHTML: header
                }
            });
            Events.bind(priv.thisDay.html, Mouse.MOUSEEVENTS.DOWN, self.goToThisDay.bind(self));
            priv.thisDay.loaded();
            priv.nextMonth = core.classes.createComponent({
                class: CalendarItem,
                owner: self,
                props: {
                    caption: String.EMPTY,
                    cssClasses: `CalendarNextMonth ${self.themeName}`,
                    html: core.classes.getTemplate('CalendarItem'),
                    parentHTML: header
                }
            });
            Events.bind(priv.nextMonth.html, Mouse.MOUSEEVENTS.DOWN, self.incDate.bind(self));
            priv.nextMonth.loaded();
            priv.thisMonth = core.classes.createComponent({
                class: CalendarItem,
                owner: self,
                props: {
                    caption: String.EMPTY,
                    cssClasses: `Control CalendarThisMonth ${self.themeName}`,
                    html: core.classes.getTemplate('CalendarItem'),
                    parentHTML: header,  
                }
            });
            Events.bind(priv.thisMonth.html, Mouse.MOUSEEVENTS.DOWN, self.viewMYDC.bind(self));
            priv.thisMonth.loaded();
        };
        //#endregion generateHeader
        //#region generateWeekDays
        const generateWeekDays = function (content) {
            priv.weekDays = document.createElement(`${tag}weekdays`);
            priv.weekDays.classList.add('CalendarWeekdays', self.themeName);
            content.appendChild(priv.weekDays);
            generateWeekNumAndDay(priv.weekDays, !0);
        };
        //#endregion generateWeekDays
        //#region generateWeekNumAndDay
        const generateWeekNumAndDay = function (content, isWeekDay) {
            const weekNum = document.createElement(`${tag}weeknum`);
            weekNum.classList.add('CalendarWeekNum', self.themeName);
            content.appendChild(weekNum);
            for (let i = 0; i < 7; i++) {
                if (isWeekDay) {
                    const week = document.createElement(`${tag}weekday`);
                    week.classList.add('CalendarWeekDay', self.themeName);
                    !isWeekDay && week.classList.add('Control');
                    content.appendChild(week);
                } else {
                    const day = core.classes.createComponent({
                        class: CalendarItem,
                        owner: self,
                        props: {
                            caption: String.EMPTY,
                            cssClasses: `Control CalendarDay ${self.themeName}`,
                            html: core.classes.getTemplate('CalendarItem'),
                            parentHTML: content
                        }
                    });
                    Events.bind(day.html, Mouse.MOUSEEVENTS.DOWN, self.selectDay.bind(day));
                    day.loaded();
                    priv.dayItems = [...priv.dayItems, day];
                }
            }
        };
        //#endregion generateWeekNumAndDay
        //#region generateWeeks
        const generateWeeks = function (content) {
            const weeks = document.createElement(`${tag}weeks`);
            weeks.classList.add('CalendarWeeks', self.themeName);
            content.appendChild(weeks);
            ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].forEach((weekName, idx) => {
                const week = document.createElement(`${tag}${weekName.toLowerCase()}week`);
                week.classList.add('CalendarWeek', `Calendar${weekName}Week`, self.themeName);
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
            priv.months.classList.add('CalendarMonths', self.themeName);
            priv.months.jsObj = self;
            content.appendChild(priv.months);
            for (let i = 0; i < 12; i++) {
                const month = core.classes.createComponent({
                    class: CalendarItem,
                    owner: self,
                    props: {
                        caption: core.tools.getLocale().date.abbreviatedMonthNames[i].firstCharUpper,
                        cssClasses: `Control CalendarMDC CalendarMonth ${self.themeName}`,
                        html: core.classes.getTemplate('CalendarItem'),
                        parentHTML: priv.months,  
                    }
                });
                Events.bind(month.html, Mouse.MOUSEEVENTS.DOWN, self.selectMonth.bind(month));
                month.loaded();
                priv.monthItems = [...priv.monthItems, month];
            }
        };
        //#endregion generateMonths
        //#region generateDecades
        const generateDecades = function (content) {
            priv.decades = document.createElement(`${tag}decades`);
            priv.decades.classList.add('CalendarDecades', self.themeName);
            priv.decades.jsObj = self;
            content.appendChild(priv.decades);
            let currentYear = new Date().getFullYear() - 1;
            for (let i = 0; i < 12; i++) {
                const decade = core.classes.createComponent({
                    class: CalendarItem,
                    owner: self,
                    props: {
                        caption: currentYear.toString(),
                        cssClasses: `Control CalendarMDC CalendarDecade ${self.themeName}`,
                        html: core.classes.getTemplate('CalendarItem'),
                        parentHTML: priv.decades,
                    }
                });
                Events.bind(decade.html, Mouse.MOUSEEVENTS.DOWN, self.selectYear.bind(decade));
                decade.loaded();
                priv.decadeItems = [...priv.decadeItems, decade];
                currentYear++;
            }
        };
        //#endregion generateDecades
        //#region generateCenturies
        const generateCenturies = function (content) {
            priv.centuries = document.createElement(`${tag}centuries`);
            priv.centuries.classList.add('CalendarCenturies', self.themeName);
            priv.centuries.jsObj = self;
            content.appendChild(priv.centuries);
            const thisCentury = int(priv.curDate.getFullYear().toString().substr(0, 2) + '00');
            let startCentury = thisCentury - 10;
            const endCentury = thisCentury + 100;
            for (let i = 0; i < 11; i++) {
                const century = core.classes.createComponent({
                    class: CalendarItem,
                    owner: self,
                    props: {
                        caption: `${startCentury}<br />${(startCentury + 9)}`,
                        cssClasses: `Control CalendarMDC CalendarMDCx2 CalendarCentury ${self.themeName}`,
                        html: core.classes.getTemplate('CalendarItem'),
                        parentHTML: priv.centuries,
                    }
                });
                Events.bind(century.html, Mouse.MOUSEEVENTS.DOWN, self.selectDecades.bind(century));
                century.loaded();
                priv.centuryItems = [...priv.centuryItems, century];
                startCentury+=10;
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
Object.defineProperties(Calendar.prototype, {
    'autoTranslate': {
        enumerable: !0
    },
    'curDate': {
        enumerable: !0
    },
    'viewWeeksNum': {
        enumerable: !0
    }
});
Object.seal(Calendar);
core.classes.register(core.types.CATEGORIES.COMMON, Calendar);
//#endregion Calendar
//#region Templates
const CalendarTpl = ['<jagui-calendar id="{internalId}" data-class="Calendar" class="Control Calendar {theme}">',
    '<properties>{ "name": "{name}" }</properties></jagui-calendar>'].join(String.EMPTY);
const CalendarItemTpl = ['<jagui-calendaritem id="{internalId}" data-class="Calendar" class="Control CalendarItem"></jagui-calendaritem>'].join(String.EMPTY);
core.classes.registerTemplates([{ Class: Calendar, template: CalendarTpl }, { Class: CalendarItem, template: CalendarItemTpl }]);
//#endregion
export { Calendar };