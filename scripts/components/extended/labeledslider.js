//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { Slider } from '/scripts/components/common/slider.js';
import { ValueLabel } from '/scripts/components/extended/valuelabel.js';
//#endregion Import
//#region Class LabeledSlider
class LabeledSlider extends LabeledControl {
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
    //#endregion Getters / Setters
    //#region Methods
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        //#endregion Variables déclaration
        super.loaded();
        priv.slider = core.classes.createComponent({
            class: Slider,
            owner: this,
            props: {
                inForm: !1,
                values: [props.hasOwnProperty('value') ? props.value : 0, 0]
            }
        });
        priv.slider.onChange.addListener(this.valueChange);
        priv.valueLabel = core.classes.createComponent({
            class: ValueLabel,
            owner: this,
            props: {
                inForm: !1,
                caption: priv.slider.firstValue.toFixed(priv.slider.decimalPrecision)
            }
        });
        priv.slider.valueLabel = priv.valueLabel;
    }
    valueChange() {
        const lab = this.owner;
        this.valueLabel.caption = this.firstValue.toFixed(this.decimalPrecision);
        lab.onChanged.invoke();
    }
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.slider.destroy();
        priv.valueLabel.destroy();
        this.unBindAndDestroyEvents(['onChanged']);
        super.destroy();
    }
    //#endregion Methods
}
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