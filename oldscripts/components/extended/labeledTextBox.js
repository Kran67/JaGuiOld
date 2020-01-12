(function () {
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
})();