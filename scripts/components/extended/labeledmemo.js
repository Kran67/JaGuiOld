//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { Memo } from '/scripts/components/common/memo.js';
//#endregion Import
//#region Class LabeledMemo
class LabeledMemo extends LabeledControl {
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        //#endregion Variables déclaration
        super.loaded();
        priv.memo = core.classes.createComponent({
            class: Memo,
            owner: this,
            props: {
                inForm: !1,
                text: props.hasOwnProperty('text') ? props.text : String.EMPTY
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.memo.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(LabeledMemo);
core.classes.register(core.types.CATEGORIES.EXTENDED, LabeledMemo);
//#endregion LabeledMemo
//#region Template
if (core.isHTMLRenderer) {
    const LabeledMemoTpl = ['<jagui-labeledmemo id="{internalId}" data-class="LabeledMemo" class="Control LabeledMemo"><properties>',
        '{ "name": "{name}", "width": 205, "height": 60, "caption": "{caption}" }</properties></jagui-labeledmemo>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: LabeledMemo, template: LabeledMemoTpl }]);
}
//#endregion
export { LabeledMemo };