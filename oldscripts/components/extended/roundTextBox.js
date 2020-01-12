(function () {
    //#region RoundTextBox
    var RoundTextBox = $j.classes.CustomTextControl.extend("RoundTextBox", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                if (!$j.isHTMLRenderer()) {
                    this.width = 121;
                    this.height = 21;
                }
            }
        },
        //#region Setter
        setWidth: function (newValue) {
            this._inherited(newValue);
            this.updateRadius();
        },
        setHeight: function (newValue) {
            this._inherited(newValue);
            this.updateRadius();
        },
        //#endregion
        //#region Methods
        radius: function () {
            var radius;
            if (this._HTMLElement.offsetHeight < this._HTMLElement.offsetWidth) radius = $j.ceil(this._HTMLElement.offsetHeight * 0.5);
            else radius = $j.ceil(this._HTMLElement.offsetWidth * 0.5);
            return radius;
        },
        update: function () {
            this.updateRadius();
        },
        updateRadius: function () {
            if (this._HTMLElement) {
                this._HTMLElementStyle.borderRadius = this.radius() + $j.types.CSSUnits.PX;
            }
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.EXTENDED, RoundTextBox);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var RoundTextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='RoundTextBox' class='Control TextBox RoundTextBox {theme}' style='width:121px;height:21px;'>\
                         <input type='text' class='Control csr_text TextBoxInput RoundTextBoxInput {theme}' />\
                         </div>";
        $j.classes.registerTemplates([{ Class: RoundTextBox, template: RoundTextBoxTpl }]);
    }
    //#endregion
})();