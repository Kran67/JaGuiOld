(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "outlookBar");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/outlookBar");
    $j.classes.register($j.types.categories.EXTRAS, OutlookBar);
    OutlookBar.inherit($j.classes.ThemedControl);
    function OutlookBar(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(OutlookBar);
})();