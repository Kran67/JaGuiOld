(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "ribbonBar");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/ribbonBar");
    $j.classes.register($j.types.categories.EXTRAS, RibbonBar);
    RibbonBar.inherit($j.classes.ThemedControl);
    function RibbonBar(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(RibbonBar);
})();