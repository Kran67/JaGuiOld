(function() {
    $j.classes.register($j.types.categories.CONTAINERS,DOMLayout);
    DOMLayout.inherit($j.classes.Layout);
    function DOMLayout(owner) {
        if(owner) {
            $j.classes.Layout.apply(this,arguments);
        }
    }
    //#region Methods
    //#endregion
    Object.seal(DOMLayout);
})();