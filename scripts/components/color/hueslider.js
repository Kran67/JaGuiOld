//#region Import
import { ColorSlider } from '/scripts/components/color/colorslider.js';
//#endregion Import
//#region HUESlider
//#region Class HUESlider
class HUESlider extends ColorSlider {}
//#endregion HUESlider
Object.seal(HUESlider);
core.classes.register(core.types.CATEGORIES.COLOR, HUESlider);
//#endregion HUESlider
//#region Templates
if (core.isHTMLRenderer) {
    const HUESliderTpl = ['<jagui-hueslider id="{internalId}" data-class="HUESlider" class="Control Slider HUESlider {theme} csr_default">',
        '<properties>{ "name": "{name}", "values": [1,0], "width":  100, "height": 6 }</properties></jagui-hueslider>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: HUESlider, template: HUESliderTpl }]);
}
//#endregion
export { HUESlider };