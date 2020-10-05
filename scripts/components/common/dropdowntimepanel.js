//#region Import
import { TimePanel } from '/scripts/components/common/timepanel.js';
import { PopupBox } from '/scripts/core/popupbox.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class TimePanelPopup
class TimePanelPopup extends TimePanel {
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
    //#region change
    change() {
        super.change();
        this.owner.dropDownTimePanel.text = this.owner.time;
    }
    //#endregion change
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        const hours = this.hours;
        hours.closePopups = this.minutes.closePopups = this.seconds.closePopups = this.meridiem.closePopups = !1;
        hours.canFocused = this.minutes.canFocused = this.seconds.canFocused = this.meridiem.canFocused = !1;
        hours.HTMLElement.classList.add('focused');
        this.isFocused = !0;
    }
    //#endregion loaded
    //#endregion Methods
}
//#endregion TimePanelPopup
//#region Class DropDownTimePanelPopup
class DropDownTimePanelPopup extends PopupBox {
    //#region Private fields
    #use24H;
    #viewSeconds;
    #timePanel;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.canFocused = !1;
            super(owner, props);
            this.#use24H = props.use24H;
            this.#viewSeconds = props.viewSeconds;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region timePanel
    get timePanel() {
        return this.#timePanel;
    }
    //#endregion timePanel
    //#endregion Getters / Setters
    //#region Methods
    //#region show
    show(x, y) {
        super.show(x, y);
        !this.#timePanel.HTMLElement && this.#timePanel.getHTMLElement(this.#timePanel.internalId);
        this.#timePanel.HTMLElement.classList.add('focused');
        this.#timePanel.time = this.owner.text;
    }
    //#endregion show
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const owner = this.owner;
        //#endregion Variables déclaration
        super.loaded();
        this.#timePanel = core.classes.createComponent({
            class: TimePanelPopup,
            owner: this,
            props: {
                canFocused: !1,
                use24H: this.#use24H,
                viewSeconds: this.#viewSeconds
            }
        });
        this.#timePanel.dropDownTimePanel = owner;
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
Object.seal(DropDownTimePanelPopup);
//#endregion DropDownTimePanelPopup
//#region Class DropDownTimePanel
class DropDownTimePanel extends ThemedControl {
    //#region Private fields
    #content = null;
    #dropDownPopup = null;
    #opened;
    #text;
    #use24H;
    #viewSeconds;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.height = 20;
            props.canFocused = !0;
            props.autoCapture = !0;
            super(owner, props);
            this.#opened = props.hasOwnProperty('opened') && core.tools.isBool(props.opened) ? props.opened : !1;
            this.#text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
            this.#use24H = props.hasOwnProperty('use24H') && core.tools.isBool(props.use24H) ? props.use24H : !1;
            this.#viewSeconds = props.hasOwnProperty('viewSeconds') && core.tools.isBool(props.viewSeconds)
                    ? props.viewSeconds : !1;
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
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template;
        let a = html.split('{text}');
        //#endregion Variables déclaration
        html = a.join(this.#text.toString());
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
        this === this.form.focusedControl && lastOpened && (this.closePopups = false);
        super.mouseDown();
        this.closePopups = true;
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
                class: DropDownTimePanelPopup,
                owner: this,
                props: {
                    parentHTML: document.body,
                    refControl: this,
                    use24H: this.#use24H,
                    viewSeconds: this.#viewSeconds,
                    time: this.#text
                }
            });
            this.#dropDownPopup.HTMLElement.classList.remove('hidden');
            this.#dropDownPopup.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
            this.#dropDownPopup.HTMLElement.classList.add('animated', 'fadeIn');
        }
    }
    //#endregion showPopup
    //#region destroyPopup
    destroyPopup() {
        this.#dropDownPopup.timePanel.destroy();
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
            } else if (this.#dropDownPopup) {
                this.#dropDownPopup.timePanel.keyDown();
            }
        } else if (this.#dropDownPopup) {
            this.#dropDownPopup.timePanel.keyDown();
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
        this.#content.classList.add('DropDownTimePanelCaption');
        this.#content.jsObj = this;
        htmlElement.appendChild(this.#content);
        htmlElement.appendChild(document.createElement(`${TAG}arrow`));
        htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
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
Object.defineProperties(DropDownTimePanel.prototype, {
    'text': {
        enumerable: !0
    },
    'use24H': {
        enumerable: !0
    },
    'viewSeconds': {
        enumerable: !0
    }
});
Object.seal(DropDownTimePanel);
core.classes.register(core.types.CATEGORIES.INTERNAL, TimePanelPopup, DropDownTimePanelPopup);
core.classes.register(core.types.CATEGORIES.COMMON, DropDownTimePanel);
//#endregion DropDownTimePanel
//#region Templates
if (core.isHTMLRenderer) {
    const DropDownTimePanelTpl = `<jagui-dropdowncalendar id="{internalId}" data-class="DropDownTimePanel" class="Control DropDownListBox DropDownTimePanel {theme}"><properties>{ "name": "{name}", "width": 80 }</properties></jagui-dropdowntimepanel>`;
    const DropDownTimePanelPopupTpl = core.templates['PopupBox'].replace('PopupBox', 'PopupBox PopupBoxTimePanel');
    core.classes.registerTemplates([
        { Class: DropDownTimePanel, template: DropDownTimePanelTpl },
        { Class: DropDownTimePanelPopup, template: DropDownTimePanelPopupTpl },
        { Class: TimePanelPopup, template: core.templates['TimePanel'] }
    ]);
}
//#endregion
export { TimePanelPopup, DropDownTimePanelPopup, DropDownTimePanel };