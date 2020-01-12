(function () {
    //#region TabControl
    var TabControl = $j.classes.CustomTabControl.extend("TabControl", {
        init: function (owner, props) {
            props = props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
            }
        }
    });
    //#endregion
    Object.seal(TabControl);
    $j.classes.register($j.types.categories.CONTAINERS, TabControl);
    //#region Template
    if ($j.isHTMLRenderer()) {
        $j.classes.registerTemplates([{ Class: TabControl, template: $j.templates["CustomTabControl"] }]);
    }
    //#endregion
})();