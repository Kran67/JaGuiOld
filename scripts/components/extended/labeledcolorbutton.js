(function () {
    var LabeledColorButton = $j.classes.LabeledControl.extend("LabeledColorButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.colorButton = $j.classes.createComponent($j.classes.ColorButton, this, null, { _inForm: false }, false);
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._inherited();
                this.colorButton.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.colorButton.getChildsHTMLElement();
                this.colorButton.updateFromHTML();
            }
        },
        destroy: function () {
            this._inherited();
            //this.colorButton.destroy();
            this.colorButton = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{colorButton}"), tpl;
            tpl = this.colorButton.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion
    });
    Object.seal(LabeledColorButton);
    $j.classes.register($j.types.categories.EXTENDED, LabeledColorButton);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledColorButtonTpl = "<div id='{internalId}' data-name='LabeledColorButton1' data-class='{name}' class='Control LabeledColorButton' style='width:205px;height:21px;'>\
                               {label}\
                               {colorButton}\
                               </div>";
        $j.classes.registerTemplates([{ Class: LabeledColorButton, template: LabeledColorButtonTpl }]);
    }
    //#endregion
})();