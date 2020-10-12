//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { DropDownListBoxColor } from '/scripts/components/color/dropdowncolors.js';
//#endregion Import
//#region Class LabeledDropDownListBoxColor
class LabeledDropDownListBoxColor extends LabeledControl {
    //#region Private fields
    #dropDownListBoxColor;
    //#endregion Private fields
    //#region Getters / Setters
    //#region dropDownListBoxColor
    get dropDownListBoxColor() {
        return this.#dropDownListBoxColor;
    }
    //#endregion dropDownListBoxColor
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.#dropDownListBoxColor = core.classes.createComponent({
            class: DropDownListBoxColor,
            owner: this,
            props: {
                inForm: !1,
                ...this.props.dropDownListBoxColor,
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.#dropDownListBoxColor.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(LabeledDropDownListBoxColor.prototype, {
    'dropDownListBoxColor': {
        enumerable: !0
    }
});
Object.seal(LabeledDropDownListBoxColor);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledDropDownListBoxColor);
//#endregion LabeledDropDownListBoxColor
//#region Template
if (core.isHTMLRenderer) {
    const LabeledDropDownListBoxColorTpl = ['<jagui-labeleddropdownlistboxcolor id="{internalId}" data-class="LabeledDropDownListBoxColor" class="Control LabeledDropDownListBoxColor">',
        '<properties>{ "name": "{name}" }</properties>',
        '</jagui-labeleddropdownlistboxcolor>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: LabeledDropDownListBoxColor, template: LabeledDropDownListBoxColorTpl }]);
}
//#endregion
export { LabeledDropDownListBoxColor };