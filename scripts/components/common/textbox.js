//#region Imports
import { CustomTextControl } from "/scripts/core/customtextcontrol.js";
//#endregion Imports
//#region Class TextBox
class TextBox extends CustomTextControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            if (!Core.isHTMLRenderer) {
                this.width = 121;
                this.height = 21;
            }
        }
    }
    //#endregion constructor
}
Core.classes.register(Types.CATEGORIES.COMMON, TextBox);
//#endregion Class TextBox

/*(function () {
    //#region TextBox
    var TextBox = $j.classes.CustomTextControl.extend("TextBox", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                if (!$j.isHTMLRenderer()) {
                    this.width = 121;
                    this.height = 21;
                }
            }
        }
        //#region Methods
        //#endregion
        //#endregion
    });
    $j.classes.register($j.types.categories.COMMON, TextBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var TextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='TextBox' class='Control TextBox {theme}' style='width:121px;height:21px;'>\
                    <input type='text' value='{name}' class='Control csr_text TextBoxInput {theme}' />\
                    </div>";
        $j.classes.registerTemplates([{ Class: TextBox, template: TextBoxTpl }]);
    }
    //endregion
})();*/