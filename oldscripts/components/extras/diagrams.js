(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "diagrams");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/diagrams");
    $j.classes.register($j.types.categories.EXTRAS, Diagrams);
    Diagrams.inherit($j.classes.ThemedControl);
    function Diagrams(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(Diagrams);
})();