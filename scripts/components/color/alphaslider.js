//#region Import
import { ColorSlider } from '/scripts/components/color/colorslider.js';
//#endregion Import
//#region Class AlphaSlider
class AlphaSlider extends ColorSlider {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, { gradientEdit: null });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    get gradientEdit() {
        return core.private(this).gradientEdit;
    }
    set gradientEdit(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        newValue instanceof core.classes.GradientEdit && priv.gradientEdit !== newValue
            && (priv.gradientEdit = newValue);
    }
    //#endregion Getters / Setters
    //#region Methods
    //#endregion Methods
}
Object.seal(AlphaSlider);
core.classes.register(core.types.CATEGORIES.COLOR, AlphaSlider);
//#endregion AlphaSlider
//#region Templates
if (core.isHTMLRenderer) {
    const AlphaSliderTpl = ['<jagui-alphaslider id="{internalId}" data-class="AlphaSlider" class="Control Slider AlphaSlider {theme} csr_default">',
        '<properties>{ "name": "{name}", "values": [1,0], "width":  100, "height": 6 }</properties></jagui-alphaslider>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: AlphaSlider, template: AlphaSliderTpl }]);
}
//#endregion
export { AlphaSlider };