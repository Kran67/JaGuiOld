(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "treeListView");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/treeListView");
    $j.classes.register($j.types.categories.EXTRAS, TreeListView);
    TreeListView.inherit($j.classes.ThemedControl);
    function TreeListView(owner) {
        if (owner) {
            $j.classes.ThemedControl.apply(this, arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(TreeListView);
})();