//#region Import
import { ColorSlider } from '/scripts/components/color/colorslider.js';
//#endregion Import
//#region AlphaSlider
const AlphaSlider = (() => {
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
    //#region Class AlphaSlider
    class AlphaSlider extends ColorSlider {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.gradientEdit = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        get gradientEdit() {
            return internal(this).gradientEdit;
        }
        set gradientEdit(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.GradientEdit) {
                if (priv.gradientEdit !== newValue) {
                    priv.gradientEdit = newValue;
                }
            }
        }
        //#endregion Getters / Setters
        //#region Methods
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.gradientEdit = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return AlphaSlider;
    //#endregion AlphaSlider
})();
Object.seal(AlphaSlider);
Core.classes.register(Types.CATEGORIES.COLOR, AlphaSlider);
//#endregion AlphaSlider
export { AlphaSlider };
//#region Templates
if (Core.isHTMLRenderer) {
    const AlphaSliderTpl = ['<jagui-alphaslider id="{internalId}" data-class="AlphaSlider" class="Control Slider AlphaSlider {theme} csr_default">',
        '<properties>{ "name": "{name}", "values": [1,0], "width":  100, "height": 6 }</properties></jagui-alphaslider>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: AlphaSlider, template: AlphaSliderTpl }]);
}
//#endregion