//#region Import
import { ColorSlider } from "/scripts/components/color/colorslider.js";
//#endregion Import
//#region HUESlider
//#region Class HUESlider
class HUESlider extends ColorSlider {
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
//#endregion HUESlider
Object.seal(HUESlider);
Core.classes.register(Types.CATEGORIES.COLOR, HUESlider);
//#endregion HUESlider
export { HUESlider };
//#region Templates
if (Core.isHTMLRenderer) {
    const HUESliderTpl = ["<jagui-hueslider id=\"{internalId}\" data-class=\"HUESlider\" class=\"Control Slider HUESlider {theme} csr_default\">",
        "<properties>{ \"name\": \"{name}\", \"values\": [1,0], \"width\":  100, \"height\": 6 }</properties></jagui-hueslider>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: HUESlider, template: HUESliderTpl }]);
}
//#endregion