﻿//#region Import
import { ButtonGlyph } from "/scripts/components/common/buttonGlyph.js";
//#endregion Import
//#region BitmapButton
class BitmapButton extends ButtonGlyph {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.canFocused = true;
        }
    }
}
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, BitmapButton);
export { BitmapButton };