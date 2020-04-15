//#region Import
import { Calendar } from '/scripts/components/common/calendar.js';
import { PopupBox } from '/scripts/core/popupbox.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
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
        const obj = this.jsObj;
        super.selectDay();
        obj.dropDownCalendar.date = obj.date;
        obj.form.closePopups();
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
        if (!_private.has(key)) {
            _private.set(key, {});
        }
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
            if (!priv.calendar.HTMLElement) {
                priv.calendar.getHTMLElement(priv.calendar.internalId);
            }
        }
        //#endregion show
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.calendar = Core.classes.createComponent({
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
            if (htmlElement) {
                htmlElement.classList.remove('animated', 'fadeIn');
            }
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
        if (!_private.has(key)) {
            _private.set(key, {});
        }
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
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.dropDownPopup = null;
                priv.opened = props.hasOwnProperty('opened') && Tools.isBool(props.opened) ? props.opened : false;
                priv.date = props.hasOwnProperty('date') ? new Date(props.date) : new Date();
                priv.text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
                //priv.editable=false;
                this.hitTest.all = true;
                this.hitTest.mouseWheel = false;
                this.hitTest.dblClick = false;
                this.createEventsAndBind(['onChange'], props);
                this.stopEvent = !0;
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
            if (Tools.isString(newValue)) {
                if (priv.text !== newValue) {
                    priv.text = newValue;
                    this.update();
                }
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
            if (Tools.isBool(newValue)) {
                if (priv.opened !== newValue) {
                    priv.opened = newValue;
                    this.update();
                    if (priv.opened) {
                        this.showPopup();
                    } else {
                        this.form.closePopups();
                    }
                }
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
            if ((newValue instanceof Date)) {
                if (!priv.date.equals(newValue)) {
                    priv.date = new Date(newValue);
                    priv.text = priv.date.toString(Tools.getLocale().date.formatPatterns.shortDate);
                    this.update();
                    this.onChange.invoke();
                }
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
            html = a.join(priv.date.toString());
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
            if (priv.content) {
                priv.content.innerHTML = priv.text;
            }
        }
        //#endregion update
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const lastOpened = priv.opened;
            //#endregion Variables déclaration
            if (this === this.form.focusedControl) {
                if (lastOpened) {
                    this.closePopups = false;
                }
            }
            super.mouseDown();
            this.closePopups = true;
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
                priv.dropDownPopup = Core.classes.createComponent({
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
            super.keyDown();
            if (Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                if (!priv.opened) {
                    this.opened = true;
                } else {
                    if (!priv.dropDownPopup.calendar.mode) {
                        this.text = priv.dropDownPopup.calendar.curDate.toString(Tools.getLocale().date.formatPatterns.shortDate);
                        this.opened = false;
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
            const TAG = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.loaded();
            priv.content = document.createElement(`${TAG}caption`);
            priv.content.classList.add('DropDownCalendarCaption');
            priv.content.jsObj = this;
            htmlElement.appendChild(priv.content);
            htmlElement.appendChild(document.createElement(`${TAG}arrow`));
            htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
            priv.text = priv.date.toString(Tools.getLocale().date.formatPatterns.shortDate);
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
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return DropDownCalendar;
    //#endregion DropDownCalendar
})();
Object.seal(DropDownCalendar);
//#endregion DropDownCalendar
Core.classes.register(Types.CATEGORIES.INTERNAL, CalendarPopup, DropDownCalendarPopup);
Core.classes.register(Types.CATEGORIES.COMMON, DropDownCalendar);
//#region Templates
if (Core.isHTMLRenderer) {
    const DropDownCalendarTpl = `<jagui-dropdowncalendar id="{internalId}" data-class="DropDownCalendar" class="Control DropDownListBox DropDownCalendar {theme}"><properties>{ "name": "{name}", "width": 80 }</properties></jagui-dropdowncalendar>`;
    const DropDownCalendarPopupTpl = Core.templates['PopupBox'].replace('PopupBox', 'PopupBox PopupBoxCalendar');
    Core.classes.registerTemplates([
        { Class: DropDownCalendar, template: DropDownCalendarTpl },
        { Class: DropDownCalendarPopup, template: DropDownCalendarPopupTpl },
        { Class: CalendarPopup, template: Core.templates['Calendar'] }
    ]);
}
//#endregion
export { CalendarPopup, DropDownCalendarPopup, DropDownCalendar }