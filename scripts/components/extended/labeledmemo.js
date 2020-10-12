//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { Memo } from '/scripts/components/common/memo.js';
//#endregion Import
//#region Class LabeledMemo
class LabeledMemo extends LabeledControl {
    //#region Private fields
    #memo;
    //#endregion Private fields
    //#region Getters / Setters
    //#region memo
    get memo() {
        return this.#memo;
    }
    //#endregion memo
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.#memo = core.classes.createComponent({
            class: Memo,
            owner: this,
            props: {
                ...this.props.memo,
                inForm: !1
            }
        });
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.#memo.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
    Object.defineProperties(LabeledMemo.prototype, {
    'memo': {
        enumerable: !0
    }
});
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