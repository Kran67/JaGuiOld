//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { DropDownListBoxColor } from '/scripts/components/color/dropdowncolors.js';
import { Colors } from '/scripts/core/color.js';
//#endregion Import
//#region Class LabeledDropDownListBoxColor
class LabeledDropDownListBoxColor extends LabeledControl {
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        //#endregion Variables déclaration
        super.loaded();
        priv.dropDownListBoxColor = core.classes.createComponent({
            class: DropDownListBoxColor,
            owner: this,
            props: {
                inForm: !1,
                color: props.hasOwnProperty('color') ? props.color : Colors.RED
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.dropDownListBoxColor.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(LabeledDropDownListBoxColor);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledDropDownListBoxColor);
//#endregion LabeledDropDownListBoxColor
//#region Template
if (core.isHTMLRenderer) {
    const LabeledDropDownListBoxColorTpl = ['<jagui-labeleddropdownlistboxcolor id="{internalId}" data-class="LabeledDropDownListBoxColor" class="Control LabeledDropDownListBoxColor">',
        '<properties>{ "name": "{name}", "width": 205, "height": 20, "color": "red", "caption": "{caption}" }</properties>',
        '</jagui-labeleddropdownlistboxcolor>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: LabeledDropDownListBoxColor, template: LabeledDropDownListBoxColorTpl }]);
}
//#endregion
export { LabeledDropDownListBoxColor };