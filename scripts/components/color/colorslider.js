//#region Import
import { Slider } from '/scripts/components/common/slider.js';
//#endregion Import
//#region Class ColorSlider
class ColorSlider extends Slider {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.max = 1;
            props.decimalPrecision = 2;
            props.frequency = 0.01;
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region mode
    get mode() {
        return super.mode;
    }
    set mode(newValue) {
        super.mode = Slider.SLIDERMODES.NORMAL;
    }
    //#endregion mode
    //#endregion Getters / Setters
    //#region Methods
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, ColorSlider);
//#endregion ColorSlider
export { ColorSlider };