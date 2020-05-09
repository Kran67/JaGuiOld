//#region Import
import { ButtonGlyph } from '/scripts/components/common/buttonglyph.js';
//#endregion Import
//#region BitmapButton
class BitmapButton extends ButtonGlyph {}
core.classes.register(core.types.CATEGORIES.EXTENDED, BitmapButton);
//#endregion BitmapButton
//#region Template
if (core.isHTMLRenderer) {
    const BitmapButtonTpl = ['<jagui-bitmapbutton id="{internalId}" data-class="BitmapButton" ',
        'class="Control Button ButtonGlyph BitmapButton {theme} csr_default"><properties>{ "name": "{name}" }',
        '</properties></jagui-bitmapbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: BitmapButton, template: BitmapButtonTpl }]);
}
//#endregion Template
export { BitmapButton };