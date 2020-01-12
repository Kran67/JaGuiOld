(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "flipBook");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/flipBook");
    $j.classes.register($j.types.categories.EXTRAS, FlipBook);
    FlipBook.inherit($j.classes.ThemedControl);
    function FlipBook(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(FlipBook);
})();