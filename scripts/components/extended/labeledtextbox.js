//#region Import
import { LabeledControl } from '/scripts/core/labeledcontrol.js';
import { TextBox } from '/scripts/components/common/textbox.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region LabeledTextBox
const LabeledTextBox = (() => {
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
    //#region Class LabeledTextBox
    class LabeledTextBox extends LabeledControl {
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
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const props = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            //#endregion Variables déclaration
            super.loaded();
            priv.textBox = Core.classes.createComponent({
                class: TextBox,
                owner: this,
                props: { inForm: false, text: props.hasOwnProperty('text')?props.text:String.EMPTY },
                withTpl: true
            });
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.textBox.destroy();
            priv.textBox = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return LabeledTextBox;
    //#endregion LabeledTextBox
})();
Object.seal(LabeledTextBox);
Core.classes.register(Types.CATEGORIES.EXTENDED, LabeledTextBox);
//#endregion LabeledTextBox
//#region Template
if (Core.isHTMLRenderer) {
    const LabeledTextBoxTpl = ['<jagui-labeledtextbox id="{internalId}" data-class="LabeledTextBox" class="Control LabeledTextBox">',
        '<properties>{ "name": "{name}", "width": 205, "height": 20, "text": "{caption}" }</jagui-labeledtextbox>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: LabeledTextBox, template: LabeledTextBoxTpl }]);
}
//#endregion
export { LabeledTextBox };
/*(function () {
    var LabeledTextBox = $j.classes.LabeledControl.extend("LabeledTextBox", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.textBox = $j.classes.createComponent($j.classes.TextBox, this, null, { _inForm: false }, false);
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._inherited();
                this.textBox.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.textBox.getChildsHTMLElement();
                this.textBox.updateFromHTML();
            }
        },
        destroy: function () {
            this._inherited();
            //this.textBox.destroy();
            this.textBox = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{textBox}"), tpl, b;
            tpl = this.textBox.getTemplate();
            b = tpl.split("{text}");
            tpl = b.join(String.EMPTY);
            html = a.join(tpl);
            return html;
        }
        //#endregion
    });
    Object.seal(LabeledTextBox);
    $j.classes.register($j.types.categories.EXTENDED, LabeledTextBox);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledTextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledTextBox' class='Control LabeledTextBox' style='width:205px;height:21px;'>\
                           {label}\
                           {textBox}\
                           </div>";
        $j.classes.registerTemplates([{ Class: LabeledTextBox, template: LabeledTextBoxTpl }]);
    }
    //#endregion
})();*/