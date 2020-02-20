//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { ColorButton } from '/scripts/components/color/colorbutton.js';
import { Colors } from '/scripts/core/color.js';
//#endregion Import
//#region LabeledColorButton
const LabeledColorButton = (() => {
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
    //#region Class LabeledColorButton
    class LabeledColorButton extends LabeledControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
            }
        }
        //#endregion constructor
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
            priv.colorButton = Core.classes.createComponent({
                class: ColorButton, 
                owner: this, 
                props: { inForm: false, color: props.hasOwnProperty('color')?props.color:Colors.RED }, 
                withTpl: true
            });
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.colorButton.destroy();
            priv.colorButton = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return LabeledColorButton;
    //#endregion LabeledColorButton
})();
Object.seal(LabeledColorButton);
Core.classes.register(Types.CATEGORIES.EXTENDED, LabeledColorButton);
//#endregion LabeledColorButton
//#region Template
if (Core.isHTMLRenderer) {
    const LabeledColorButtonTpl = ['<jagui-labeledcolorbutton id="{internalId}" data-class="LabeledColorButton" class="Control LabeledColorButton">',
        '<properties>{ "name": "{name}", "width": 205, "height": 20, "color": "red", "caption": "{caption}" }</properties>',
        '</jagui-labeledcolorbutton>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: LabeledColorButton, template: LabeledColorButtonTpl }]);
}
//#endregion
export { LabeledColorButton };