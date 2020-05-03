//#region Import
import { ColorSlider } from '/scripts/components/color/colorslider.js';
//#endregion Import
//#region BWSlider
class BWSlider extends ColorSlider {}
Object.seal(BWSlider);
core.classes.register(core.types.CATEGORIES.COLOR, BWSlider);
//#endregion BWSlider
//#region Templates
if (core.isHTMLRenderer) {
    const BWSliderTpl = ['<jagui-bwslider id="{internalId}" data-class="BWSlider" class="Control Slider BWSlider {theme} csr_default">',
        '<properties>{ "name": "{name}", "values": [1,0], "width":  100, "height": 6 }</properties></jagui-bwslider>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: BWSlider, template: BWSliderTpl }]);
}
//#endregion
export { BWSlider };