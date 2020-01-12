(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "coverFlow");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/coverFlow");
    $j.classes.register($j.types.categories.EXTRAS, CoverFlow);
    CoverFlow.inherit($j.classes.ThemedControl);
    function CoverFlow(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(CoverFlow);
})();