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
        //#region Variables déclaration
        //#endregion Variables déclaration
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
        super.selectDay();
        this.dropDownCalendar.date = this.date;
        this.form.closePopups();
    }
    //#endregion selectDay
    //#endregion Methods
}
//#endregion CalendarPopup
//#region DropDownCalendarPopup
const DropDownCalendarPopup = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class DropDownCalendarPopup
    class DropDownCalendarPopup extends PopupBox {
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
            return internal(this).calendar;
        }
        //#endregion calendar
        //#endregion Getters / Setters
        //#region Methods
        //#region show
        show(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.show(x, y);
            !priv.calendar.HTMLElement && priv.calendar.getHTMLElement(priv.calendar.internalId);
        }
        //#endregion show
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.calendar = core.classes.createComponent({
                class: CalendarPopup,
                owner: this,
                canFocused: !1
            });
            priv.calendar.dropDownCalendar = this.owner;
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
    return DropDownCalendarPopup;
    //#endregion DropDownCalendarPopup
})();
Object.seal(DropDownCalendarPopup);
//#endregion DropDownCalendarPopup
//#region DropDownCalendar
const DropDownCalendar = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class DropDownCalendar
    class DropDownCalendar extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                props.height = 20;
                props.canFocused = !0;
                props.autoCapture = !0;
                //priv.editable=!1;
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.dropDownPopup = null;
                priv.opened = props.hasOwnProperty('opened') && core.tools.isBool(props.opened) ? props.opened : !1;
                priv.date = props.hasOwnProperty('date') ? new Date(props.date) : new Date();
                priv.text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
                this.createEventsAndBind(['onChange'], props);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region dropDownPopup
        get dropDownPopup() {
            return internal(this).dropDownPopup;
        }
        //#endregion dropDownPopup
        //#region text
        get text() {
            return internal(this).text;
        }
        set text(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && priv.text !== newValue) {
                priv.text = newValue;
                this.update();
            }
        }
        //#endregion text
        //#region opened
        get opened() {
            return internal(this).opened;
        }
        set opened(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.opened !== newValue) {
                priv.opened = newValue;
                this.update();
                priv.opened ? this.showPopup() : this.form.closePopups();
            }
        }
        //#endregion opened
        //#region date
        get date() {
            return internal(this).date;
        }
        set date(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if ((newValue instanceof Date) && !priv.date.equals(newValue)) {
                priv.date = new Date(newValue);
                priv.text = priv.date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate);
                this.update();
                this.onChange.invoke();
            }
        }
        //#endregion date
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template();
            let a = html.split('{date}');
            //#endregion Variables déclaration
            html = a.join(priv.date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate));
            return html;
        }
        //#endregion template
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            priv.opened ? htmlElement.classList.add('opened') : htmlElement.classList.remove('opened');
            priv.content && (priv.content.innerHTML = priv.text);
        }
        //#endregion update
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const lastOpened = priv.opened;
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
            const priv = internal(this);
            const pt = this.clientToDocument();
            //#endregion Variables déclaration
            if (!priv.dropDownPopup) {
                priv.dropDownPopup = core.classes.createComponent({
                    class: DropDownCalendarPopup,
                    owner: this,
                    props: {
                        parentHTML: document.body,
                        refControl: this
                    }
                });
                priv.dropDownPopup.calendar.date = new Date(priv.date);
                priv.dropDownPopup.HTMLElement.classList.remove('hidden');
                priv.dropDownPopup.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
                priv.dropDownPopup.HTMLElement.classList.add('animated', 'fadeIn');
            }
        }
        //#endregion showPopup
        //#region destroyPopup
        destroyPopup() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.dropDownPopup.calendar.destroy();
            priv.dropDownPopup.destroy();
            priv.dropDownPopup = null;
            priv.opened = !1;
        }
        //#endregion destroyPopup
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.keyDown();
            if (core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                if (!priv.opened) {
                    this.opened = !0;
                } else {
                    if (!priv.dropDownPopup.calendar.mode) {
                        this.text = priv.dropDownPopup.calendar.curDate.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate);
                        this.opened = !1;
                    } else if (priv.dropDownPopup) {
                        priv.dropDownPopup.calendar.keyDown();
                    }
                }
            } else if (priv.dropDownPopup) {
                priv.dropDownPopup.calendar.keyDown();
            }
        }
        //#endregion keyDown
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const TAG = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.loaded();
            priv.content = document.createElement(`${TAG}caption`);
            priv.content.classList.add('DropDownCalendarCaption');
            priv.content.jsObj = this;
            htmlElement.appendChild(priv.content);
            htmlElement.appendChild(document.createElement(`${TAG}arrow`));
            htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
            priv.text = priv.date.toString(core.currentLocale, core.tools.getLocale().date.formatPatterns.shortDate);
            priv.content.innerHTML = priv.text;
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.content = null;
            priv.opened = null;
            priv.date = null;
            priv.text = null;
            priv.dropDownPopup = null;
            this.unBindAndDestroyEvents(['onChange']);
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return DropDownCalendar;
    //#endregion DropDownCalendar
})();
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