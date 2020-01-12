(function () {
    var CircleButton = $j.classes.Button.extend("CircleButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.wordWrap = true;
            }
        },
        //#region Setter
        setWidth: function (newValue) {
            this._inherited(newValue);
            this.update($j.types.jsCSSProperties.WIDTH);
        },
        setHeight: function (newValue) {
            this._inherited(newValue);
            this.update($j.types.jsCSSProperties.HEIGHT);
        },
        //#endregion
        //#region Methods
        update: function (source) {
            this._inherited();
            if (source) {
                switch (source) {
                    case $j.types.jsCSSProperties.WIDTH:
                        this._HTMLElementStyle.height = this._HTMLElement.offsetWidth + $j.types.CSSUnits.PX;
                        //$j.CSS.updateInlineCSS(this,$j.types.jsCSSProperties.HEIGHT);
                        break;
                    case $j.types.jsCSSProperties.HEIGHT:
                        this._HTMLElementStyle.width = this._HTMLElement.offsetHeight + $j.types.CSSUnits.PX;
                        //$j.CSS.updateInlineCSS(this,$j.types.jsCSSProperties.WIDTH);
                        break;
                }
            } else {
                if (this._HTMLElement.offsetWidth > this._HTMLElement.offsetHeight) {
                    this._HTMLElementStyle.height = this._HTMLElement.offsetWidth + $j.types.CSSUnits.PX;
                    //$j.CSS.updateInlineCSS(this,$j.types.jsCSSProperties.HEIGHT);
                } else {
                    this._HTMLElementStyle.width = this._HTMLElement.offsetHeight + $j.types.CSSUnits.PX;
                    //$j.CSS.updateInlineCSS(this,$j.types.jsCSSProperties.WIDTH);
                }
            }
        }
        //#endregion
    });
    Object.seal(CircleButton);
    $j.classes.register($j.types.categories.EXTENDED, CircleButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var CircleButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='CircleButton' class='Control CircleButton {theme}' style='width:50px;height:50px;'>{caption}</button>";
        $j.classes.registerTemplates([{ Class: CircleButton, template: CircleButtonTpl }]);
    }
    //#endregion
})();