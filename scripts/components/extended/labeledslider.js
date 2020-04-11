//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { Slider } from '/scripts/components/common/slider.js';
import { ValueLabel } from '/scripts/components/extended/valuelabel.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region LabeledSlider
const LabeledSlider = (() => {
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
    //#region Class LabeledSlider
    class LabeledSlider extends LabeledControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                if (!Core.isHTMLRenderer) {
                    if (!props.hasOwnProperty('width') && Tools.isNumber(props.width)) {
                        props.width = 75;
                    }
                    if (!props.hasOwnProperty('height') && Tools.isNumber(props.height)) {
                        props.height = 25;
                    }
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
            const priv = internal(this);
            const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            //#endregion Variables déclaration
            super.loaded();
            priv.slider = Core.classes.createComponent({
                class: Slider,
                owner: this,
                props: { inForm: !1, values: [props.hasOwnProperty('value')?props.value:0 ,0] },
                withTpl: !0
            });
            priv.slider.onChange.addListener(this.valueChange);
            priv.valueLabel = Core.classes.createComponent({
                class: ValueLabel,
                owner: this, 
                props: { inForm: !1, caption: priv.slider.firstValue.toFixed(priv.slider.decimalPrecision) }
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
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.slider.destroy();
            priv.slider = null;
            priv.valueLabel.destroy();
            priv.valueLabel = null;
        }
        //#endregion Methods
    }
    return LabeledSlider;
    //#endregion LabeledSlider
})();
Object.seal(LabeledSlider);
Core.classes.register(Types.CATEGORIES.EXTENDED, LabeledSlider);
//#endregion LabeledSlider
//#region Template
if (Core.isHTMLRenderer) {
    const LabeledSliderTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledSlider' class='Control LabeledSlider' style='width:205px;height:21px;'>\
                          {label}\
                          {slider}\
                          {valueLabel}\
                          </div>";
    Core.classes.registerTemplates([{ Class: LabeledSlider, template: LabeledSliderTpl }]);
}
//#endregion
export { LabeledSlider };