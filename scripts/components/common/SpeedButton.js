//#region Import
import { ButtonGlyph } from '/scripts/components/common/buttonglyph.js';
//#endregion Import
//#region SpeedButton
class SpeedButton extends ButtonGlyph {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.canFocused = !1;
            props.glyphSpacing = 0;
            super(owner, props);
        }
    }
    //#endregion Constructor
}
core.classes.register(core.types.CATEGORIES.COMMON, SpeedButton);
//#endregion SpeedButton
export { SpeedButton };