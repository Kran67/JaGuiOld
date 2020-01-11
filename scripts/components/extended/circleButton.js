//#region Import
import { Button } from "/scripts/components/common/button.js";
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
    //#region getter / setter
    get width() {
        return super.width;
    }
    set width(newValue) {
        const htmlElementStyle = this.HTMLElementStyle;
        const currentHeight = this.height;
        const currentWidth = this.width;
        if (typeof newValue === Types.CONSTANTS.NUMBER) {
            if (currentWidth !== newValue) {
                if (Core.isHTMLRenderer && !this.loading) {
                    this.propertyChanged(Types.BINDABLEPROPERTIES.WIDTH);
                    if (newValue === 0) {
                        htmlElementStyle.width = String.EMPTY;
                    } else {
                        htmlElementStyle.width = `${newValue}${Types.CSSUNITS.PX}`;
                    }
                    if (currentHeight !== newValue) {
                        htmlElementStyle.height = htmlElementStyle.width;
                    }
                }
            }
        }
    }
    get height() {
        return super.width;
    }
    set height(newValue) {
        const htmlElementStyle = this.HTMLElementStyle;
        const currentHeight = this.height;
        const currentWidth = this.width;
        if (typeof newValue === Types.CONSTANTS.NUMBER) {
            if (currentHeight !== newValue) {
                if (Core.isHTMLRenderer && !this.loading) {
                    this.propertyChanged(Types.BINDABLEPROPERTIES.WIDTH);
                    if (newValue === 0) {
                        htmlElementStyle.height = String.EMPTY;
                    } else {
                        htmlElementStyle.height = `${newValue}${Types.CSSUNITS.PX}`;
                    }
                    if (currentHeight !== newValue) {
                        htmlElementStyle.width = htmlElementStyle.height;
                    }
                }
            }
        }
    }
    //#endregion
}
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, CircleButton);
export { CircleButton };