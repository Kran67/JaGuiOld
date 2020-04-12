//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { TextBox } from '/scripts/components/common/textbox.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region LabeledTextBox
const LabeledTextBox = (() => {
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
    //#region Class LabeledTextBox
    class LabeledTextBox extends LabeledControl {
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            //#endregion Variables déclaration
            super.loaded();
            priv.textBox = Core.classes.createComponent({
                class: TextBox,
                owner: this,
                props: { inForm: !1, text: props.hasOwnProperty('text')?props.text:String.EMPTY }
            });
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.textBox.destroy();
            priv.textBox = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return LabeledTextBox;
    //#endregion LabeledTextBox
})();
Object.seal(LabeledTextBox);
Core.classes.register(Types.CATEGORIES.EXTENDED, LabeledTextBox);
//#endregion LabeledTextBox
//#region Template
if (Core.isHTMLRenderer) {
    const LabeledTextBoxTpl = ['<jagui-labeledtextbox id="{internalId}" data-class="LabeledTextBox" class="Control LabeledTextBox">',
        '<properties>{ "name": "{name}", "width": 205, "height": 20, "text": "{caption}" }</jagui-labeledtextbox>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: LabeledTextBox, template: LabeledTextBoxTpl }]);
}
//#endregion
export { LabeledTextBox };