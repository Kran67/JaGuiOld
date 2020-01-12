(function () {
    var Panel = $j.classes.ThemedControl.extend("Panel", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(Panel);
    $j.classes.register($j.types.categories.CONTAINERS, Panel);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var PanelTpl = "<div id='{internalId}' data-name='{name}' data-class='Panel' class='Control Panel {theme}' style='width:181px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: Panel, template: PanelTpl }]);
    }
    //endregion
})();