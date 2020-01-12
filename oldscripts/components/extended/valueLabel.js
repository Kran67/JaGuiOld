(function () {
    var ValueLabel = $j.classes.Label.extend("ValueLabel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.wordWrap = false;
                this.autoSize = false;
            }
        },
        //#region setter
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = $j.tools.text.replace(newValue, "<br>", String.SPACE);
                this.update();
            }
        }
        //#endregion
        //#region Methods
        //#endregion
    });
    Object.seal(ValueLabel);
    $j.classes.register($j.types.categories.EXTENDED, ValueLabel);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var ValueLabelTpl = "<label id='{internalId}' data-name='{name}' data-class='ValueLabel' class='Control csr_default ValueLabel {theme}'>{caption}</label>";
        $j.classes.registerTemplates([{ Class: ValueLabel, template: ValueLabelTpl }]);
    }
    //#endregion
})();