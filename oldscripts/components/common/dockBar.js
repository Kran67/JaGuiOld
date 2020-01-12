(function() {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "dockBar");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/dockBar");
    $j.classes.register($j.types.categories.COMMON,DockBar);
    DockBar.inherit($j.classes.ThemedControl);
    function DockBar(owner) {
        if(owner) {
            $j.classes.ThemedControl.apply(this,arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(DockBar);
})();
//https://github.com/coderespawn/dock-spawn