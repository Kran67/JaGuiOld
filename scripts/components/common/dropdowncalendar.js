//#region Import
import { Calendar } from '/scripts/components/common/calendar.js';
import { PopupBox } from '/scripts/core/popupbox.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class CalendarPopup
class CalendarPopup extends Calendar {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Methods
    //#region selectDay
    selectDay() {
        //#region Variables déclaration
        const owner = this.owner;
        //#endregion Variables déclaration
        super.selectDay();
        owner.dropDownCalendar.date = owner.date;
        owner.form.closePopups();
    }
    //#endregion selectDay
    //#endregion Methods
}
//#endregion CalendarPopup
//#region Class DropDownCalendarPopup
class DropDownCalendarPopup extends PopupBox {
    //#region Private fields
    #calendar;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.canFocused = !1
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region calendar
    get calendar() {
        return this.#calendar;
    }
    //#endregion calendar
    //#endregion Getters / Setters
    //#region Methods
    //#region show
    show(x, y) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.show(x, y);
        !this.#calendar.HTMLElement && this.#calendar.getHTMLElement(this.#calendar.internalId);
    }
    //#endregion show
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        this.#calendar = core.classes.createComponent({
            class: CalendarPopup,
            owner: this,
            canFocused: !1
        });
        this.#calendar.dropDownCalendar = this.owner;
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        htmlElement && htmlElement.classList.remove('animated', 'fadeIn');
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(DropDownCalendarPopup);
//#endregion DropDownCalendarPopup
//#region Class DropDownCalendar
class DropDownCalendar extends ThemedControl {
    //#region Private fields
    #opened;
    #date;
    #text;
    #dropDownPopup;
    #content;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            props.height = 20;
            props.canFocused = !0;
            props.autoCapture = !0;
            //this.#editable=!1;
            super(owner, props);
            this.#opened = props.hasOwnProperty('opened') && core.tools.isBool(props.opened)
                    ? props.opened : !1;
            this.#date = props.hasOwnProperty('date') ? new Date(props.date) : new Date();
            this.#text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region dropDownPopup
    get dropDownPopup() {
        return this.#dropDownPopup;
    }
    //#endregion dropDownPopup
    //#region text
    get text() {
        return this.#text;
    }
    set text(newValue) {
        if (core.tools.isString(newValue) && this.#text !== newValue) {
            this.#text = newValue;
            this.update();
        }
    }
    //#endregion text
    //#region opened
    get opened() {
        return this.#opened;
    }
    set opened(newValue) {
        if (core.tools.isBool(newValue) && this.#opened !== newValue) {
            this.#opened = newValue;
            this.update();
            this.#opened ? this.showPopup() : this.form.closePopups();
        }
    }
    //#endregion opened
    //#region date
    get date() {
        return this.#date;
    }
    set date(newValue) {
        if ((newValue instanceof Date) && !this.#date.equals(newValue)) {
            this.#date = new Date(newValue);
            this.#text = this.#date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate);
            this.update();
            this.onChange.invoke();
        }
    }
    //#endregion date
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template();
        let a = html.split('{date}');
        //#endregion Variables déclaration
        html = a.join(this.#date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate));
        return html;
    }
    //#endregion template
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        this.#opened ? htmlElement.classList.add('opened') : htmlElement.classList.remove('opened');
        this.#content && (this.#content.innerHTML = this.#text);
    }
    //#endregion update
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const lastOpened = this.#opened;
        //#endregion Variables déclaration
        this === this.form.focusedControl && lastOpened && (this.closePopups = !1);
        super.mouseDown();
        this.closePopups = !0;
        this.opened = !this.opened;
    }
    //#endregion mouseDown
    //#region showPopup
    showPopup() {
        //#region Variables déclaration
        const pt = this.clientToDocument();
        //#endregion Variables déclaration
        if (!this.#dropDownPopup) {
            this.#dropDownPopup = core.classes.createComponent({
                class: DropDownCalendarPopup,
                owner: this,
                props: {
                    parentHTML: document.body,
                    refControl: this
                }
            });
            this.#dropDownPopup.calendar.date = new Date(this.#date);
            this.#dropDownPopup.HTMLElement.classList.remove('hidden');
            this.#dropDownPopup.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
            this.#dropDownPopup.HTMLElement.classList.add('animated', 'fadeIn');
        }
    }
    //#endregion showPopup
    //#region destroyPopup
    destroyPopup() {
        this.#dropDownPopup.calendar.destroy();
        this.#dropDownPopup.destroy();
        this.#dropDownPopup = null;
        this.#opened = !1;
    }
    //#endregion destroyPopup
    //#region keyDown
    keyDown() {
        super.keyDown();
        if (core.keyboard.key === Keyboard.VKEYSCODES.VK_SPACE) {
            if (!this.#opened) {
                this.opened = !0;
            } else {
                if (!this.#dropDownPopup.calendar.mode) {
                    this.text = this.#dropDownPopup.calendar.curDate.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate);
                    this.opened = !1;
                } else if (this.#dropDownPopup) {
                    this.#dropDownPopup.calendar.keyDown();
                }
            }
        } else if (this.#dropDownPopup) {
            this.#dropDownPopup.calendar.keyDown();
        }
    }
    //#endregion keyDown
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const TAG = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        this.#content = document.createElement(`${TAG}caption`);
        this.#content.classList.add('DropDownCalendarCaption');
        this.#content.jsObj = this;
        htmlElement.appendChild(this.#content);
        htmlElement.appendChild(document.createElement(`${TAG}arrow`));
        htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
        this.#text = this.#date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate);
        this.#content.innerHTML = this.#text;
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(DropDownCalendar.prototype, {
    'date': {
        enumerable: !0
    }
});
Object.seal(DropDownCalendar);
core.classes.register(core.types.CATEGORIES.INTERNAL, CalendarPopup, DropDownCalendarPopup);
core.classes.register(core.types.CATEGORIES.COMMON, DropDownCalendar);
//#endregion DropDownCalendar
//#region Templates
if (core.isHTMLRenderer) {
    const DropDownCalendarTpl = `<jagui-dropdowncalendar id="{internalId}" data-class="DropDownCalendar" class="Control DropDownListBox DropDownCalendar {theme}"><properties>{ "name": "{name}", "width": 80 }</properties></jagui-dropdowncalendar>`;
    const DropDownCalendarPopupTpl = core.templates['PopupBox'].replace('PopupBox', 'PopupBox PopupBoxCalendar');
    core.classes.registerTemplates([
        { Class: DropDownCalendar, template: DropDownCalendarTpl },
        { Class: DropDownCalendarPopup, template: DropDownCalendarPopupTpl },
        { Class: CalendarPopup, template: core.templates['Calendar'] }
    ]);
}
//#endregion
export { CalendarPopup, DropDownCalendarPopup, DropDownCalendar }