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
            props.forceMouseWheel = !0;
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
        hours.forceMouseWheel = this.minutes.forceMouseWheel = this.seconds.forceMouseWheel = this.meridiem.forceMouseWheel = !0;
        hours.closePopups = this.minutes.closePopups = this.seconds.closePopups = this.meridiem.closePopups = !1;
        hours.canFocused = this.minutes.canFocused = this.seconds.canFocused = this.meridiem.canFocused = !1;
        hours.HTMLElement.classList.add('focused');
        this.isFocused = !0;
    }
    //#endregion loaded
    //#endregion Methods
}
//#endregion TimePanelPopup
//#region DropDownTimePanelPopup
const DropDownTimePanelPopup = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class DropDownTimePanelPopup
    class DropDownTimePanelPopup extends PopupBox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.closePopups = !1;
                props.canFocused = !1;
                super(owner, props);
                const priv = internal(this);
                priv.use24H = props.use24H;
                priv.viewSeconds = props.viewSeconds;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region timePanel
        get timePanel() {
            return internal(this).timePanel;
        }
        //#endregion timePanel
        //#endregion Getters / Setters
        //#region Methods
        //#region show
        show(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.show(x, y);
            !priv.timePanel.HTMLElement && priv.timePanel.getHTMLElement(priv.timePanel.internalId);
            priv.timePanel.HTMLElement.classList.add('focused');
            priv.timePanel.time = this.owner.text;
        }
        //#endregion show
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            //#endregion Variables déclaration
            super.loaded();
            priv.timePanel = core.classes.createComponent({
                class: TimePanelPopup,
                owner: this,
                props: {
                    canFocused: !1,
                    use24H: priv.use24H,
                    viewSeconds: priv.viewSeconds
                }
            });
            priv.timePanel.dropDownTimePanel = owner;
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            htmlElement && htmlElement.classList.remove('animated', 'fadeIn');
            priv.use24H = null;
            priv.viewSeconds = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return DropDownTimePanelPopup;
    //#endregion DropDownTimePanelPopup
})();
Object.seal(DropDownTimePanelPopup);
//#endregion DropDownTimePanelPopup
//#region DropDownTimePanel
const DropDownTimePanel = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class DropDownTimePanel
    class DropDownTimePanel extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.height = 20;
                props.canFocused = !0;
                props.autoCapture = !0;
                props.stopEvent = !0;
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.dropDownPopup = null;
                priv.opened = props.hasOwnProperty('opened') && core.tools.isBool(props.opened) ? props.opened : !1;
                priv.text = props.hasOwnProperty('text') ? props.text : String.EMPTY;
                priv.use24H = props.hasOwnProperty('use24H') && core.tools.isBool(props.use24H) ? props.use24H : !1;
                priv.viewSeconds = props.hasOwnProperty('viewSeconds') && core.tools.isBool(props.viewSeconds) ? props.viewSeconds : !1;
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
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template;
            let a = html.split('{text}');
            //#endregion Variables déclaration
            html = a.join(priv.text.toString());
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
            this === this.form.focusedControl && lastOpened && (this.closePopups = false);
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
                priv.dropDownPopup = core.classes.createComponent({
                    class: DropDownTimePanelPopup,
                    owner: this,
                    props: {
                        parentHTML: document.body,
                        refControl: this,
                        use24H: priv.use24H,
                        viewSeconds: priv.viewSeconds,
                        time: priv.text
                    }
                });
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
            priv.dropDownPopup.timePanel.destroy();
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
                } else if (priv.dropDownPopup) {
                    priv.dropDownPopup.timePanel.keyDown();
                }
            } else if (priv.dropDownPopup) {
                priv.dropDownPopup.timePanel.keyDown();
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
            priv.content.classList.add('DropDownTimePanelCaption');
            priv.content.jsObj = this;
            htmlElement.appendChild(priv.content);
            htmlElement.appendChild(document.createElement(`${TAG}arrow`));
            htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
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
            priv.text = null;
            priv.dropDownPopup = null;
            priv.use24H = null;
            priv.viewSeconds = null;
            this.unBindAndDestroyEvents(['onChange']);
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return DropDownTimePanel;
    //#endregion DropDownTimePanel
})();
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
export { TimePanelPopup, DropDownTimePanelPopup, DropDownTimePanel }