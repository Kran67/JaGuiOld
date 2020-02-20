//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { Tools } from '/scripts/core/tools.js';
import { Memo } from '/scripts/components/common/memo.js';
//#endregion Import
//#region LabeledMemo
const LabeledMemo = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class LabeledMemo
    class LabeledMemo extends LabeledControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            //#endregion Variables déclaration
            super.loaded();
            priv.memo = Core.classes.createComponent({
                class: Memo,
                owner: this,
                props: { inForm: false, text: props.hasOwnProperty('text')?props.text:String.EMPTY },
                withTpl: true
            });
            priv.memo.canFocused = false;
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.memo.destroy();
            priv.memo = null;
        }
        //#endregion Methods
    }
    return LabeledMemo;
    //#endregion LabeledMemo
})();
Object.seal(LabeledMemo);
Core.classes.register(Types.CATEGORIES.EXTENDED, LabeledMemo);
//#endregion LabeledMemo
//#region Template
if (Core.isHTMLRenderer) {
    const LabeledMemoTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledMemo' class='Control LabeledMemo' style='width:205px;height:60px;'>\
                        {label}\
                        {memo}\
                        </div>";
    Core.classes.registerTemplates([{ Class: LabeledMemo, template: LabeledMemoTpl }]);
}
//#endregion
export { LabeledMemo };
/*(function () {
    var LabeledMemo = $j.classes.LabeledControl.extend("LabeledMemo", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.memo = $j.classes.createComponent($j.classes.Memo, this, null, { _inForm: false }, false);
                this.memo.canFocused = false;
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._inherited();
                this.memo.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.memo.getChildsHTMLElement();
                this.memo.updateFromHTML();
            }
        },
        destroy: function () {
            this._inherited();
            this.memo = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{memo}"), tpl;
            tpl = this.memo.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion
    });
    Object.seal(LabeledMemo);
    $j.classes.register($j.types.categories.EXTENDED, LabeledMemo);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledMemoTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledMemo' class='Control LabeledMemo' style='width:205px;height:60px;'>\
                        {label}\
                        {memo}\
                        </div>";
        $j.classes.registerTemplates([{ Class: LabeledMemo, template: LabeledMemoTpl }]);
    }
    //#endregion
})();*/