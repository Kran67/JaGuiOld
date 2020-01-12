(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "syntaxEditor");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/syntaxEditor");
    $j.classes.register($j.types.categories.EXTRAS, SyntaxEditor);
    SyntaxEditor.inherit($j.classes.ThemedControl);
    function SyntaxEditor(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(SyntaxEditor);
})();