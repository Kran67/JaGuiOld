(function () {
    var Toggle = $j.classes.Checkbox.extend("Toggle", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                if (!$j.isHTMLRenderer()) {
                    this.height = 21;
                    this.width = 50;
                }
                this._uncheckedLabel = 'NO';
                this._checkedLabel = 'YES';
                this.allowGrayed = false;
            }
        },
        //#region Setters
        setAllowGrayed: function (newValue) {
            this.allowGrayed = false;
        },
        setUncheckedLabel: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this._uncheckedLabel !== newValue) {
                this._uncheckedLabel = newValue;
                this.update();
            }
        },
        setCheckedLabel: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this._checkedLabel !== newValue) {
                this._checkedLabel = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
            this._inherited();
            if (this._check) {
                this._HTMLElement.dataset.unchecked = this._uncheckedLabel;
                this._HTMLElement.dataset.checked = this._checkedLabel;
                $j.CSS.removeCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.BEFORE);
                $j.CSS.removeCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.AFTER);
                if (this._checkedLabel.contains("data:image")) $j.CSS.addCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.BEFORE, "content: url(" + this._checkedLabel + ")");
                if (this._uncheckedLabel.contains("data:image")) $j.CSS.addCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.AFTER, "content: url(" + this._uncheckedLabel + ")");
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.unchecked;
            if (data) this._uncheckedLabel = data;
            data = this._HTMLElement.dataset.checked;
            if (data) this._checkedLabel = data;
        }
        //#endregion
    });
    Object.seal(Toggle);
    $j.classes.register($j.types.categories.EXTENDED, Toggle);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var ToggleTpl = "<div id='{internalId}' data-name='{name}' data-class='Toggle' class='Control Toggle {theme}' style='width:50px;height:21px;' data-unchecked='NO' data-checked='YES'>\
                         <input type='checkbox' class='Control CheckboxInput' />\
                         <div class='Control {theme} CheckboxCheck'></div>\
                         </div>";
        $j.classes.registerTemplates([{ Class: Toggle, template: ToggleTpl }]);
    }
    //#ednregion
})();