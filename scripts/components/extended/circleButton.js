//#region Import
import { Button } from '/scripts/components/common/button.js';
//#endregion Import
//#region CircleButton
class CircleButton extends Button {
    //#region Getters / Setters
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        //#region Variables déclaration
        const currentHeight = this.height;
        const currentWidth = this.width;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && currentWidth !== newValue && core.isHTMLRenderer && !this.loading) {
            super.width = newValue;
            currentHeight !== newValue && (this.height = newValue);
        }
    }
    //#endregion width
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        //#region Variables déclaration
        const currentHeight = this.height;
        const currentWidth = this.width;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && currentHeight !== newValue && core.isHTMLRenderer && !this.loading) {
            super.height = newValue;
            currentWidth !== newValue && (this.width = newValue);
        }
    }
    //#endregion height
    //#endregion Getters / Setters
}
core.classes.register(core.types.CATEGORIES.EXTENDED, CircleButton);
//#endregion CircleButton
export { CircleButton };