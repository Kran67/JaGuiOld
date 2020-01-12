(function () {
    var BitmapButton = $j.classes.SpeedButton.extend("BitmapButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.canFocused = true;
            }
        }
        //#region Methods
        //#endregion
    });
    Object.seal(BitmapButton);
    $j.classes.register($j.types.categories.EXTENDED, BitmapButton);
    //#region template
    if ($j.isHTMLRenderer()) {
        var BitmapButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='BitmapButton' class='Control ButtonGlyph BitmapButton {theme}' style='width:98px;height:58px;'>\
                         <span class='Control ButtonCaption BitmapButtonCaption'>{caption}</span>\
                         <img class='Control' width='32' height='32' alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' draggable='false' />\
                         </button>";
        $j.classes.registerTemplates([{ Class: BitmapButton, template: BitmapButtonTpl }]);
    }
    //#endregion template
})();