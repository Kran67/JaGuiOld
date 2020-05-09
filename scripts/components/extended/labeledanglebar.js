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
        !_private.has(key) && _private.set(key, {});
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
            priv.angleButton = core.classes.createComponent({
                class: AngleButton,
                owner: this,
                props: {
                    inForm: !1,
                    height: this.height,
                    showValue: !1,
                    value: props.hasOwnProperty('value') ? props.value : 0
                }
            });
            priv.angleButton.onChanged.addListener(this.valueChanged);
            priv.valueLabel = core.classes.createComponent({
                class: ValueLabel,
                owner: this,
                props: {
                    inForm: !1,
                    caption: `${priv.angleButton.value}°`
                }
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
            priv.angleButton.destroy();
            priv.angleButton = null;
            priv.valueLabel.destroy();
            priv.valueLabel = null;
            this.unBindAndDestroyEvents(['onChanged']);
            super.destroy();
        }
        //#endregion Methods
    }
    return LabeledAngleBar;
    //#endregion LabeledAngleBar
})();
Object.seal(LabeledAngleBar);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledAngleBar);
//#endregion LabeledAngleBar
//#region Template
if (core.isHTMLRenderer) {
    const LabeledAngleBarTpl = ['<jagui-labeledanglebar id="{internalId}" data-class="LabeledAngleBar" class="Control ',
        'LabeledAngleBar"><properties>{ "name": "{name}", "width": 205, "height": 20, "value": 0, "caption": ',
        '"{caption}" }</properties></jagui-labeledanglebar>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: LabeledAngleBar, template: LabeledAngleBarTpl }]);
}
//#endregion
export { LabeledAngleBar };