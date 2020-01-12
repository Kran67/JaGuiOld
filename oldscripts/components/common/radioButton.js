(function () {
    var RadioButton = $j.classes.Checkbox.extend("RadioButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.groupName = String.EMPTY;
                //#region Privates
                this._checkChar = "3";
                this._grayedChar = String.EMPTY;
                //#endregion
            }
        },
        //#region Setters
        setAllowGrayed: function (newValue) {
            this.allowGrayed = false;
        },
        //#endregion
        //#region Methods
        setIsChecked: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.isChecked !== newValue) {
                if (newValue) this.isChecked = newValue;
                // group
                var c = 0, cc = 0;
                if (this.form) {
                    var list = this._owner._components;
                    for (var i = 0, l = list.length; i < l; i++)
                        if (list[i] instanceof $j.classes.RadioButton && (list[i] !== this) && (list[i].groupName === this.groupName)) {
                            if (list[i].isChecked) cc++;
                            if (newValue) list[i].setIsChecked(false);
                            c++;
                        }
                    list = null;
                }
                // check
                if (!newValue && (c === 0)) return;
                if (!newValue && (cc === 0)) return;
                this.isChecked = newValue;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                } else this.update();
                // event
                if (!this._updating) this.onChange.invoke();
            }
        },
        destroy: function () {
            this._inherited();
            this.groupName = null;
        }
        //#endregion
    });
    Object.seal(RadioButton);
    $j.classes.register($j.types.categories.COMMON, RadioButton);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var RadioButtonTpl = "<div id='{internalId}' data-name='{name}' data-class='RadioButton' class='Control RadioButton {theme}' style='width:51px;height:15px;'>\
                        <input type='radio' class='Control RadioButtonInput' />\
                        <div class='Control {theme} RadioButtonCheck'></div>{caption}\
                        </div>";
        $j.classes.registerTemplates([{ Class: RadioButton, template: RadioButtonTpl }]);
    }
    //#endregion
})();