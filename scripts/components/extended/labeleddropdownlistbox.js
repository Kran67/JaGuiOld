//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { DropDownListBox } from '/scripts/components/common/dropdownlistbox.js';
//#endregion Import
//#region Class LabeledDropDownListBox
class LabeledDropDownListBox extends LabeledControl {
    //#region Private fields
    #dropDownListBox;
    //#endregion Private fields
    //#region Getters / Setters
    //#region dropDownListBox
    get dropDownListBox() {
        return this.#dropDownListBox;
    }
    //#endregion dropDownListBox
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.#dropDownListBox = core.classes.createComponent({
            class: DropDownListBox,
            owner: this,
            props: {
                inForm: !1,
                ...this.props.dropDownListBox
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.#dropDownListBox.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(LabeledDropDownListBox.prototype, {
    'dropDownListBox': {
        enumerable: !0
    }
});
Object.seal(LabeledDropDownListBox);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledDropDownListBox);
//#endregion LabeledDropDownListBox
//#region Template
if (core.isHTMLRenderer) {
    const LabeledDropDownListBoxTpl = ['<jagui-labeleddropdownlistbox id="{internalId}" data-class="LabeledDropDownListBox" class="Control LabeledDropDownListBox">',
        '<properties>{ "name": "{name}" }</properties>',
        '</jagui-labeleddropdownlistbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: LabeledDropDownListBox, template: LabeledDropDownListBoxTpl }]);
}
//#endregion
export { LabeledDropDownListBox };