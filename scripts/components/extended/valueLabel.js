//#region Import
import { Label } from "/scripts/components/common/label.js";
import { Text } from "/scripts/core/text.js";
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
            this.caption = Text.replace(newValue, "<br>", String.SPACE);
            this.update();
        }
    }
    //#endregion caption
    //#endregion Getters / Setters
}
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, ValueLabel);
export { ValueLabel };

/*
    //#region Template
    if ($j.isHTMLRenderer()) {
        var ValueLabelTpl = "<label id='{internalId}' data-name='{name}' data-class='ValueLabel' class='Control csr_default ValueLabel {theme}'>{caption}</label>";
        $j.classes.registerTemplates([{ Class: ValueLabel, template: ValueLabelTpl }]);
    }
    //#endregion
*/