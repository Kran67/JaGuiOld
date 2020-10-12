//#region Import
import { Slider } from '/scripts/components/common/slider.js';
import { PopupBox } from '/scripts/core/popupbox.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class SliderPopup
class SliderPopup extends Slider {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.canFocused = !1;
            props.margin = { left: 10, top: 0, right: 10, bottom: 0 };
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Methods
    //#region change
    change() {
        //#region Variables déclaration
        const obj = this.jsObj ? this.jsObj : this;
        //#endregion Variables déclaration
        super.change();
        obj.dropDownSlider.value = parseFloat(obj.firstValue.toFixed(obj.decimalPrecision));
    }
    //#endregion change
    //#endregion Methods
}
//#endregion SliderPopup
//#region Class DropDownSliderPopup
class DropDownSliderPopup extends PopupBox {
    //#region Private fields
    #slider;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.closePopups = !1;
            props.canFocused = !1;
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region Slider
    get slider() {
        return this.#slider;
    }
    //#endregion Slider
    //#endregion Getters / Setters
    //#region Methods
    //#region show
    show(x, y) {
        super.show(x, y);
        !this.#slider.HTMLElement && this.#slider.getHTMLElement(this.#slider.internalId);
    }
    //#endregion show
    //#region loaded
    loaded() {
        super.loaded();
        this.#slider = core.classes.createComponent({
            class: SliderPopup,
            owner: this,
            props: {
                width: 100,
                height: 14,
                values: [this.refControl.value, 0]
            }
        });
        this.#slider.dropDownSlider = this.owner;
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        htmlElement && htmlElement.classList.remove('animated', 'fadeIn');
        this.#slider.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(DropDownSliderPopup);
//#endregion DropDownSliderPopup
//#region Class DropDownSlider
class DropDownSlider extends ThemedControl {
    //#region Private fields
    #content = null;
    #dropDownPopup = null;
    #opened;
    #value;
    #min = 0;
    #max = 100;
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
            this.#value = props.hasOwnProperty('value') && core.tools.isNumber(props.value) ? props.value : 0;
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
    //#region value
    get value() {
        return this.#value;
    }
    set value(newValue) {
        if (core.tools.isNumber(newValue) && this.#value !== newValue) {
            this.#value = newValue;
            this.update();
        }
    }
    //#endregion value
    //#region min
    get min() {
        return this.#min;
    }
    set min(newValue) {
        core.tools.isNumber(newValue) && this.#min !== newValue && (this.#min = newValue);
    }
    //#endregion min
    //#region max
    get max() {
        return this.#max;
    }
    set max(newValue) {
        core.tools.isNumber(newValue) && this.#max !== newValue && (this.#max = newValue);
    }
    //#endregion max
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template();
        let a = html.split('{value}');
        //#endregion Variables déclaration
        html = a.join(this.#value.toString());
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
        this.#content && (this.#content.innerHTML = this.#value);
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
                class: DropDownSliderPopup,
                owner: this,
                props: {
                    parentHTML: document.body,
                    refControl: this,
                    width: 110,
                    height: 24
                }
            });
            this.#dropDownPopup.slider.value = this.#value;
            this.#dropDownPopup.HTMLElement.classList.remove('hidden');
            this.#dropDownPopup.show(pt.x, pt.y + this.HTMLElement.offsetHeight);
            this.#dropDownPopup.HTMLElement.classList.add('animated', 'fadeIn');
        }
    }
    //#endregion showPopup
    //#region destroyPopup
    destroyPopup() {
        this.#dropDownPopup.destroy();
        this.#dropDownPopup = null;
        this.#opened = !1;
    }
    //#endregion destroyPopup
    //#region keyDown
    keyDown() {
        super.keyDown();
        if (core.keyboard.key === Keyboard.VKEYSCODES.VK_SPACE) {
            !this.#opened ? this.opened = !0 : this.#dropDownPopup && this.#dropDownPopup.slider.keyDown();
        } else if (this.#dropDownPopup) {
            this.#dropDownPopup.slider.keyDown();
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
        this.#content.classList.add('DropDownSliderCaption');
        this.#content.jsObj = this;
        htmlElement.appendChild(this.#content);
        htmlElement.appendChild(document.createElement(`${TAG}arrow`));
        htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
        this.#content.innerHTML = this.#value.toFixed(this.decimalPrecision);
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
Object.defineProperties(DropDownSlider.prototype, {
    'value': {
        enumerable: !0
    },
    'min': {
        enumerable: !0
    },
    'max': {
        enumerable: !0
    }
});
Object.seal(DropDownSlider);
core.classes.register(core.types.CATEGORIES.INTERNAL, SliderPopup, DropDownSliderPopup);
core.classes.register(core.types.CATEGORIES.COMMON, DropDownSlider);
//#endregion DropDownSlider
//#region Templates
if (core.isHTMLRenderer) {
    const DropDownSliderTpl = `<jagui-dropdownslider id="{internalId}" data-class="DropDownSlider" class="Control DropDownListBox DropDownSlider {theme}"><properties>{ "name": "{name}", "width": 50 }</properties></jagui-dropdownslider>`;
    const DropDownSliderPopupTpl = core.templates['PopupBox'].replace('PopupBox', 'PopupBox PopupBoxSlider');
    core.classes.registerTemplates([
        { Class: DropDownSlider, template: DropDownSliderTpl },
        { Class: DropDownSliderPopup, template: DropDownSliderPopupTpl },
        { Class: SliderPopup, template: core.templates['Slider'] }
    ]);
}
//#endregion
export { SliderPopup, DropDownSliderPopup, DropDownSlider };