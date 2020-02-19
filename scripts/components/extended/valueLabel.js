//#region Import
import { Label } from '/scripts/components/common/label.js';
import { Text } from '/scripts/core/text.js';
//#endregion Import
//#region ValueLabel
class ValueLabel extends Label {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return super.caption;
    }
    set caption(newValue) {
        if (typeof newValue !== _const.STRING) return;
        if (this.caption !== newValue) {
            this.caption = Text.replace(newValue, '<br>', String.SPACE);
            this.update();
        }
    }
    //#endregion caption
    //#endregion Getters / Setters
}
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, ValueLabel);
export { ValueLabel };
//#region Template
if (Core.isHTMLRenderer) {
    const ValueLabelTpl = ['<jagui-valuelabel id="{internalId}" data-class="ValueLabel" class="Control csr_default ValueLabel {theme}">',
        '<properties>{ "name": "{name}", "caption": "{caption}" }</properties></jagui-valuelabel>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ValueLabel, template: ValueLabelTpl }]);
}
//#endregion