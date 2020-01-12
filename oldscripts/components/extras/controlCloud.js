(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "controlCloud");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/controlCloud");
    $j.classes.register($j.types.categories.EXTRAS, ControlCloud);
    ControlCloud.inherit($j.classes.ThemedControl);
    function ControlCloud(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(ControlCloud);
})();