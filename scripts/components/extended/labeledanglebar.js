//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { AngleButton } from '/scripts/components/extended/anglebutton.js';
import { ValueLabel } from '/scripts/components/extended/valuelabel.js';
import { GridLayout } from '/scripts/components/containers/gridlayout.js';
//#endregion Import
//#region Class CustomButton
class LabeledAngleBar extends LabeledControl {
    //#region Private fields
    #angleButton;
    #layout;
    #valueLabel;
    //#endregion Private fields
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
    //#region angleButton
    get angleButton() {
        return this.#angleButton;
    }
    //#endregion angleButton
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
                columns: 2,
                rows: 1,
                columnGap: 0,
                rowGap: 0
            }
        });
        this.#angleButton = core.classes.createComponent({
            class: AngleButton,
            owner: this.#layout,
            props: {
                inForm: !1,
                height: this.height,
                showValue: !1,
                value: props.hasOwnProperty('value') ? props.value : 0
            }
        });
        this.#angleButton.onChanged.addListener(this.valueChanged);
        this.#valueLabel = core.classes.createComponent({
            class: ValueLabel,
            owner: this.#layout,
            props: {
                inForm: !1,
                vertAlign: core.types.VERTTEXTALIGNS.MIDDLE,
                horizAlign: core.types.TEXTALIGNS.CENTER,
                caption: `${this.#angleButton.value}°`,
                margin: { top:3, bottom: 3 }
            }
        });
        this.#angleButton.valueLabel = this.#valueLabel;
    }
    valueChanged() {
        //#region Variables déclaration
        const lab = this.owner.owner;
        //#endregion Variables déclaration
        this.valueLabel.caption = `${this.value}°`;
        lab.onChanged.invoke();
    }
    destroy() {
        this.#angleButton.destroy();
        this.#valueLabel.destroy();
        this.#layout.destroy();
        this.unBindAndDestroyEvents(['onChanged']);
        super.destroy();
    }
    //#endregion Methods
}
Object.defineProperties(LabeledAngleBar.prototype, {
    'angleButton': {
        enumerable: !0
    },
    'valueLabel': {
        enumerable: !0
    }
});
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