(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "scheduler");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/scheduler");
    $j.classes.register($j.types.categories.EXTRAS, Scheduler);
    Scheduler.inherit($j.classes.ThemedControl);
    function Scheduler(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(Scheduler);
})();