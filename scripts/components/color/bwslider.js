//#region Import
import { ColorSlider } from "/scripts/components/color/colorslider.js";
//#endregion Import
//#region BWSlider
//#region Class BWSlider
class BWSlider extends ColorSlider {
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
    //#endregion Methods
}
//#endregion BWSlider
Object.seal(BWSlider);
Core.classes.register(Types.CATEGORIES.COLOR, BWSlider);
//#endregion BWSlider
export { BWSlider };
//#region Templates
if (Core.isHTMLRenderer) {
    const BWSliderTpl = ["<jagui-bwslider id=\"{internalId}\" data-class=\"BWSlider\" class=\"Control Slider BWSlider {theme} csr_default\">",
        "<properties>{ \"name\": \"{name}\", \"values\": [1,0], \"width\":  100, \"height\": 6 }</properties></jagui-bwslider>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: BWSlider, template: BWSliderTpl }]);
}
//#endregion