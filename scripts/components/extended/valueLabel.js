//#region Import
import { Label } from '/scripts/components/common/label.js';
import { Text } from '/scripts/core/text.js';
//#endregion Import
//#region ValueLabel
class ValueLabel extends Label {
    //#region Getters / Setters
    //#region caption
    get caption() {
        return super.caption;
    }
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.caption !== newValue) {
            super.caption = Text.replace(newValue, '<br>', String.SPACE);
            this.update();
        }
    }
    //#endregion caption
    //#endregion Getters / Setters
}
//#endregion
core.classes.register(core.types.CATEGORIES.CONTAINERS, ValueLabel);
//#region Template
if (core.isHTMLRenderer) {
    const ValueLabelTpl = ['<jagui-valuelabel id="{internalId}" data-class="ValueLabel" class="Control csr_default ValueLabel {theme}">',
        '<properties>{ "name": "{name}", "caption": "{caption}" }</properties></jagui-valuelabel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ValueLabel, template: ValueLabelTpl }]);
}
//#endregion
export { ValueLabel };