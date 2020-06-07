//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { TextBox } from '/scripts/components/common/textbox.js';
//#endregion Import
//#region Class LabeledTextBox
class LabeledTextBox extends LabeledControl {
    //#region Getters / Setters
    //#region textBox
    get textBox() {
        return core.private(this).textBox;
    }
    //#endregion textBox
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.textBox = core.classes.createComponent({
            class: TextBox,
            owner: this,
            props: {
                ...priv.props.textBox,
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
        priv.textBox.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(LabeledTextBox);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledTextBox);
//#endregion LabeledTextBox
//#region Template
if (core.isHTMLRenderer) {
    const LabeledTextBoxTpl = ['<jagui-labeledtextbox id="{internalId}" data-class="LabeledTextBox" class="Control LabeledTextBox">',
        '<properties>{ "name": "{name}", "width": 205, "height": 20, "text": "{caption}" }</jagui-labeledtextbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: LabeledTextBox, template: LabeledTextBoxTpl }]);
}
//#endregion
export { LabeledTextBox };