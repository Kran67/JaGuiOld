(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "richTextBox");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/richTextBox");
    $j.classes.register($j.types.categories.EXTRAS, RichTextBox);
    RichTextBox.inherit($j.classes.ThemedControl);
    function RichTextBox(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(RichTextBox);
})();