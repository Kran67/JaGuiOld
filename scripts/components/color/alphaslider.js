//#region Import
import { ColorSlider } from '/scripts/components/color/colorslider.js';
//#endregion Import
//#region Class AlphaSlider
class AlphaSlider extends ColorSlider {}
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