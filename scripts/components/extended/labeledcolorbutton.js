//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { ColorButton } from '/scripts/components/color/colorbutton.js';
import { Colors } from '/scripts/core/color.js';
//#endregion Import
//#region Class LabeledColorButton
class LabeledColorButton extends LabeledControl {
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.colorButton = core.classes.createComponent({
            class: ColorButton,
            owner: this,
            props: {
                ...priv.props.colorButton,
                inForm: !1
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.colorButton.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(LabeledColorButton);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledColorButton);
//#endregion LabeledColorButton
//#region Template
if (core.isHTMLRenderer) {
    const LabeledColorButtonTpl = ['<jagui-labeledcolorbutton id="{internalId}" data-class="LabeledColorButton" class="Control LabeledColorButton">',
        '<properties>{ "name": "{name}", "width": 205, "height": 20, "color": "red", "caption": "{caption}" }</properties>',
        '</jagui-labeledcolorbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: LabeledColorButton, template: LabeledColorButtonTpl }]);
}
//#endregion
export { LabeledColorButton };