(function () {
    var NumberBox = $j.classes.CustomTextBox.extedn("NumberBox", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(NumberBox);
    $j.classes.register($j.types.categories.EXTENDED, NumberBox);
    //#region template
    //var NumberBoxTpl="<div id='{internalId}' data-name='{name}' data-class='{className}' style='{style}' class='{className} {theme}_{className} {theme}_default '><p data-name='{name}_caption' style='white-space:nowrap'>{caption}</p><img data-name='{name}_glyph' class='hidden' style='{style}vertical-align: middle;' alt='' src='{source}' /></div>";
    //$j.classes.registerTemplates([{component:BitmapButton,template:BitmapButtonTpl}]);
    //#endregion template
})();