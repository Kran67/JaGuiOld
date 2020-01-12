(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "imageEditor");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/imageEditor");
    $j.classes.register($j.types.categories.EXTRAS, ImageEditor);
    ImageEditor.inherit($j.classes.ThemedControl);
    function ImageEditor(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(ImageEditor);
})();