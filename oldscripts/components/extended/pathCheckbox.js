(function () {
    var PathCheckbox = $j.classes.Checkbox.extend("PathCheckbox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                if (!$j.isHTMLRenderer()) {
                    this.height = 17;
                    this.width = 100;
                }
                this.checkSvg = "m49.568024,19.824736l-31.863983,29.73797l-17.705017,-16.521305l0,-19.824999l17.705017,16.469412l31.863983,-29.686078l0,19.825z";
                this.svgViewBox = "0 0 50 50";
                this.canFocused = false;
                delete this.tabOrder;
            }
        },
        //#region Setters
        setCheckSvg: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (newValue !== this.checkSvg) {
                this.checkSvg = newValue;
                if ($j.isHTMLRenderer()) {
                    this.addCheckedRule();
                }
            }
        },
        setAllowGrayed: function (newValue) {
            this.allowGrayed = false;
        },
        //#endregion
        //#region Methods
        update: function () {
            if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
            this._inherited();
            this._check.innerHTML = ["<svg width='100%' height='100%' viewBox='", this.svgViewBox, "' xmlns='http://www.w3.org/2000/svg'><path d='", this.checkSvg, "' /></svg>"].join(String.EMPTY);
            this._check.style.opacity = 0.2;
            if (this.isChecked) this._check.style.opacity = 1;
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.checksvg;
            if (data) this.checkSvg = atob(data);
            data = this._HTMLElement.dataset.svgviewbox;
            if (data) this.svgViewBox = data;
        },
        loaded: function () {
            this._inherited();
            this.update();
        },
        destroy: function () {
            this._inherited();
            this.checkSvg = null;
            this.svgViewBox = null;
        }
        //#endregion
    });
    Object.seal(PathCheckbox);
    $j.classes.register($j.types.categories.EXTENDED, PathCheckbox);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var PathCheckboxTpl = "<div id='{internalId}' data-name='{name}' data-class='PathCheckbox' class='Control PathCheckbox {theme}' style='width:93px;height:15px;'>\
                         <input type='checkbox' class='Control PathCheckboxInput' />\
                         <div class='Control PathCheckboxCheck {theme}'></div>{caption}\
                         </div>";
        $j.classes.registerTemplates([{ Class: PathCheckbox, template: PathCheckboxTpl }]);
    }
    //#ednregion
})();