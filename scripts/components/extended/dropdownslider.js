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
//#region DropDownSliderPopup
const DropDownSliderPopup = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class DropDownSliderPopup
    class DropDownSliderPopup extends PopupBox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.closePopups = !1;
                props.canFocused = !1
                super(owner, props);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region Slider
        get slider() {
            return internal(this).slider;
        }
        //#endregion Slider
        //#endregion Getters / Setters
        //#region Methods
        //#region show
        show(x, y) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.show(x, y);
            !priv.slider.HTMLElement && priv.slider.getHTMLElement(priv.slider.internalId);
        }
        //#endregion show
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.slider = core.classes.createComponent({
                class: SliderPopup,
                owner: this,
                props: {
                    width: 100,
                    height: 14,
                    values: [this.refControl.value, 0]
                }
            });
            priv.slider.dropDownSlider = this.owner;
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            htmlElement && htmlElement.classList.remove('animated', 'fadeIn');
            priv.slider.destroy();
            priv.slider = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return DropDownSliderPopup;
    //#endregion DropDownSliderPopup
})();
Object.seal(DropDownSliderPopup);
//#endregion DropDownSliderPopup
//#region DropDownSlider
const DropDownSlider = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class DropDownSlider
    class DropDownSlider extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.height = 20;
                props.canFocused = !0;
                props.autoCapture = !0;
                props.hitTest = { mouseMove: !0 };
                props.stopEvent = !0;
                super(owner, props);
                const priv = internal(this);
                priv.content = null;
                priv.dropDownPopup = null;
                priv.opened = props.hasOwnProperty('opened') && core.tools.isBool(props.opened) ? props.opened : !1;
                priv.value = props.hasOwnProperty('value') && core.tools.isNumber(props.value) ? props.value : 0;
                priv.min = 0;
                priv.max = 100;
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
        //#region value
        get value() {
            return internal(this).value;
        }
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.value !== newValue) {
                priv.value = newValue;
                this.update();
            }
        }
        //#endregion value
        //#region min
        get min() {
            return internal(this).min;
        }
        set min(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.min !== newValue && (priv.min = newValue);
        }
        //#endregion min
        //#region max
        get max() {
            return internal(this).max;
        }
        set max(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && this.max !== newValue && (this.max = newValue);
        }
        //#endregion max
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template();
            let a = html.split('{value}');
            //#endregion Variables déclaration
            html = a.join(priv.value.toString());
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
            priv.content && (priv.content.innerHTML = priv.value);
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
                    class: DropDownSliderPopup,
                    owner: this,
                    props: {
                        parentHTML: document.body,
                        refControl: this,
                        width: 110,
                        height: 24
                    }
                });
                priv.dropDownPopup.slider.value = priv.value;
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
            priv.dropDownPopup.slider.destroy();
            priv.dropDownPopup.destroy();
            priv.dropDownPopup = null;
            priv.opened = !1;
        }
        //#endregion destroyPopup
        //#region keyDown
        keyDown() {
            super.keyDown();
            if (core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                if (!priv.opened) {
                    this.opened = !0;
                } else {
                    priv.dropDownPopup && priv.dropDownPopup.slider.keyDown();
                }
            } else if (priv.dropDownPopup) {
                priv.dropDownPopup.slider.keyDown();
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
            priv.content.classList.add('DropDownSliderCaption');
            priv.content.jsObj = this;
            htmlElement.appendChild(priv.content);
            htmlElement.appendChild(document.createElement(`${TAG}arrow`));
            htmlElement.lastElementChild.classList.add('DropDownListBoxArrow');
            priv.content.innerHTML = priv.value.toFixed(this.decimalPrecision);
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.content = null;
            priv.opened = null;
            priv.min = null;
            priv.max = null;
            priv.value = null;
            this.unBindAndDestroyEvents(['onChange']);
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return DropDownSlider;
    //#endregion DropDownSlider
})();
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
export { SliderPopup, DropDownSliderPopup, DropDownSlider }