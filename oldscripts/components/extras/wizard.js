(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "wizard");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/wizard");
    $j.classes.register($j.types.categories.EXTRAS, Wizard);
    Wizard.inherit($j.classes.PageControl);
    function Wizard(owner) {
        if (owner) {
            $j.classes.PageControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(Wizard);
})();