(function () {
    var RoundButton = $j.classes.Button.extend("RoundButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
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
    Object.seal(RoundButton);
    $j.classes.register($j.types.categories.EXTENDED, RoundButton);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var RoundButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='RoundButton' class='Control RoundButton {theme}' style='width:75px;height:21px;'>{caption}</button>";
        $j.classes.registerTemplates([{ Class: RoundButton, template: RoundButtonTpl }]);
    }
    //#endregion
})();