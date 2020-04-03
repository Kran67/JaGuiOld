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
                props: { inForm: false, values: [props.hasOwnProperty('value')?props.value:0 ,0] },
                withTpl: true
            });
            priv.slider.onChange.addListener(this.valueChange);
            priv.valueLabel = Core.classes.createComponent({
                class: ValueLabel,
                owner: this, 
                props: { inForm: false, caption: priv.slider.firstValue.toFixed(priv.slider.decimalPrecision) },
                withTpl: true
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

/*(function () {
    var LabeledSlider = $j.classes.LabeledControl.extend("LabeledSlider", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.slider = $j.classes.createComponent($j.classes.Slider, this, null, { _inForm: false }, false);
                this.valueLabel = $j.classes.createComponent($j.classes.ValueLabel, this, null, { _inForm: false }, false);
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            var nextId;
            if (this._HTMLElement) {
                this._inherited();
                this.slider.getHTMLElement(this._HTMLElement.querySelector(".Slider").id);
                this.slider.getChildsHTMLElement();
                this.slider.updateFromHTML();
                this.valueLabel.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.valueLabel.updateFromHTML();
                this.slider.onChange.addListener(this.valueChange);
            }
        },
        valueChange: function () {
            var lab = this._owner;
            lab.valueLabel.setCaption(lab.slider.getFirstValue().toFixed(lab.slider.decimalPrecision));
        },
        destroy: function () {
            this._inherited();
            //this.slider.destroy();
            this.slider = null;
            //this.valueLabel.destroy();
            this.valueLabel = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{slider}"), tpl;
            tpl = this.slider.getTemplate();
            html = a.join(tpl);
            a = html.split("{valueLabel}"), tpl;
            tpl = this.valueLabel.getTemplate();
            html = a.join(tpl);
            return html;
        },
        loaded: function () {
            this._inherited();
            this.valueLabel.setCaption(this.slider.getFirstValue().toFixed(this.slider.decimalPrecision));
        }
        //#endregion
    });
    Object.seal(LabeledSlider);
    $j.classes.register($j.types.categories.EXTENDED, LabeledSlider);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledSliderTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledSlider' class='Control LabeledSlider' style='width:205px;height:21px;'>\
                          {label}\
                          {slider}\
                          {valueLabel}\
                          </div>";
        $j.classes.registerTemplates([{ Class: LabeledSlider, template: LabeledSliderTpl }]);
    }
    //#endregion
})();*/