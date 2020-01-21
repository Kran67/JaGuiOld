//#region Import
import { Button } from "/scripts/components/common/button.js";
import { Tools } from "/scripts/core/tools.js";
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
        const htmlElementStyle = this.HTMLElementStyle;
        const currentHeight = this.height;
        const currentWidth = this.width;
        //#endregion Variables déclaration
        if (Tools.isNumber(newValue)) {
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
    //#endregion width
    //#region height
    get height() {
        return super.width;
    }
    set height(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        const currentHeight = this.height;
        //const currentWidth = this.width;
        //#endregion Variables déclaration
        if (Tools.isNumber(newValue)) {
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
    //#endregion height
    //#endregion Getter / Setter
}
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, CircleButton);
export { CircleButton };