//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { Slider } from '/scripts/components/common/slider.js';
import { ValueLabel } from '/scripts/components/extended/valuelabel.js';
import { GridLayout } from '/scripts/components/containers/gridlayout.js';
//#endregion Import
//#region Class LabeledSlider
class LabeledSlider extends LabeledControl {
    //#region Private fields
    #slider;
    #layout;
    #valueLabel;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            if (!core.isHTMLRenderer) {
                !props.hasOwnProperty('width') && core.tools.isNumber(props.width) && (props.width = 75);
                !props.hasOwnProperty('height') && core.tools.isNumber(props.height) && (props.height = 25);
            }
            super(owner, props);
            this.createEventsAndBind(['onChanged'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region slider
    get slider() {
        return this.#slider;
    }
    //#endregion slider
    //#endregion Getters / Setters
    //#region Methods
    loaded() {
        //#region Variables déclaration
        const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        //#endregion Variables déclaration
        super.loaded();
        this.#layout = core.classes.createComponent({
            class: GridLayout,
            owner: this,
            props: {
                inForm: !1,
                templateColumns: '1fr 40px',
                rows: 1,
                columnGap: 0,
                rowGap: 0
            }
        });
        this.#slider = core.classes.createComponent({
            class: Slider,
            owner: this.#layout,
            props: {
                inForm: !1,
                values: [props.hasOwnProperty('value') ? props.value : 0, 0],
                margin: { left:10, right: 10 }
            }
        });
        this.#slider.onChange.addListener(this.valueChange);
        this.#valueLabel = core.classes.createComponent({
            class: ValueLabel,
            owner: this.#layout,
            props: {
                inForm: !1,
                vertAlign: core.types.VERTTEXTALIGNS.MIDDLE,
                horizAlign: core.types.TEXTALIGNS.CENTER,
                caption: this.#slider.firstValue.toFixed(this.#slider.decimalPrecision),
                margin: { top:3, bottom: 3 }
            }
        });
        this.#slider.valueLabel = this.#valueLabel;
    }
    valueChange() {
        const lab = this.owner.owner;
        this.valueLabel.caption = this.firstValue.toFixed(this.decimalPrecision);
        lab.onChanged.invoke();
    }
    destroy() {
        this.#slider.destroy();
        this.#valueLabel.destroy();
        this.#layout.destroy();
        this.unBindAndDestroyEvents(['onChanged']);
        super.destroy();
    }
    //#endregion Methods
}
Object.defineProperties(LabeledSlider.prototype, {
    'slider': {
        enumerable: !0
    },
    'valueLabel': {
        enumerable: !0
    }
});
Object.seal(LabeledSlider);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledSlider);
//#endregion LabeledSlider
//#region Template
if (core.isHTMLRenderer) {
    const LabeledSliderTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledSlider' class='Control LabeledSlider' style='width:205px;height:21px;'>\
                          {label}\
                          {slider}\
                          {valueLabel}\
                          </div>";
    core.classes.registerTemplates([{ Class: LabeledSlider, template: LabeledSliderTpl }]);
}
//#endregion
export { LabeledSlider };