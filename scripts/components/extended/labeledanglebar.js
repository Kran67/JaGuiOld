//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { AngleButton } from '/scripts/components/extended/anglebutton.js';
import { ValueLabel } from '/scripts/components/extended/valuelabel.js';
//#endregion Import
//#region LabeledAngleBar
const LabeledAngleBar = (() => {
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
    //#region Class CustomButton
    class LabeledAngleBar extends LabeledControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
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
            priv.angleButton = Core.classes.createComponent({
                class: AngleButton,
                owner: this,
                props: { inForm: false, height: this.height, showValue: false, value: props.hasOwnProperty('value')?props.value:0 },
                withTpl: true
            });
            priv.angleButton.onChanged.addListener(this.valueChanged);
            priv.valueLabel = Core.classes.createComponent({
                class: ValueLabel,
                owner: this,
                props: { inForm: false, caption: `${priv.angleButton.value}°` },
                withTpl: true
            });
            priv.angleButton.valueLabel = priv.valueLabel;
        }
        valueChanged() {
            const lab = this.owner;
            this.valueLabel.caption = `${this.value}°`;
            lab.onChanged.invoke();
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.angleButton.destroy();
            priv.angleButton = null;
            priv.valueLabel.destroy();
            priv.valueLabel = null;
            this.onChanged.destroy();
            this.onChanged = null;
        }
        //#endregion Methods
    }
    return LabeledAngleBar;
    //#endregion LabeledAngleBar
})();
Object.seal(LabeledAngleBar);
Core.classes.register(Types.CATEGORIES.EXTENDED, LabeledAngleBar);
//#endregion LabeledAngleBar
//#region Template
if (Core.isHTMLRenderer) {
    const LabeledAngleBarTpl = ['<jagui-labeledanglebar id="{internalId}" data-class="LabeledAngleBar" class="Control ',
        'LabeledAngleBar"><properties>{ "name": "{name}", "width": 205, "height": 20, "value": 0, "caption": ',
        '"{caption}" }</properties></jagui-labeledanglebar>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: LabeledAngleBar, template: LabeledAngleBarTpl }]);
}
//#endregion
export { LabeledAngleBar };