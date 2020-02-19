//#region Import
import { Button } from '/scripts/components/common/button.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region CircleButton
class CircleButton extends Button {
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion
    //#region Getter / Setter
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        //#region Variables déclaration
        const currentHeight = this.height;
        const currentWidth = this.width;
        //#endregion Variables déclaration
        if (Tools.isNumber(newValue)) {
            if (currentWidth !== newValue) {
                if (Core.isHTMLRenderer && !this.loading) {
                    super.width = newValue;
                    if (currentHeight !== newValue) {
                        this.height = newValue;
                    }
                }
            }
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
        if (Tools.isNumber(newValue)) {
            if (currentHeight !== newValue) {
                if (Core.isHTMLRenderer && !this.loading) {
                    super.height = newValue;
                    if (currentWidth !== newValue) {
                        this.width = newValue;
                    }
                }
            }
        }
    }
    //#endregion height
    //#endregion Getter / Setter
}
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, CircleButton);
export { CircleButton };