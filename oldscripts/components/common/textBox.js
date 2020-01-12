(function () {
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
})();