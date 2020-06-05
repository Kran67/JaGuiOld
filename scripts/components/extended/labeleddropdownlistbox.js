//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { DropDownListBox } from '/scripts/components/common/dropdownlistbox.js';
//#endregion Import
//#region Class LabeledDropDownListBox
class LabeledDropDownListBox extends LabeledControl {
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.dropDownListBox = core.classes.createComponent({
            class: DropDownListBox,
            owner: this,
            props: {
                inForm: !1,
                ...priv.props.dropDownListBox,
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.dropDownListBox.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
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