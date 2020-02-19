//#region Import
import { ButtonGlyph } from '/scripts/components/common/buttonglyph.js';
//#endregion Import
//#region SpeedButton
class SpeedButton extends ButtonGlyph {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.canFocused = false;
            this.glyphSpacing = 0;
        }
    }
    //#endregion Constructor
}
//#endregion
Core.classes.register(Types.CATEGORIES.COMMON, SpeedButton);
export { SpeedButton };