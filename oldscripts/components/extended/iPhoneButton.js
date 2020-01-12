(function () {
    var IPhoneButton = $j.classes.BitmapButton.extend("IPhoneButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._halo = null;
                //#endregion
                delete this.tabOrder;
            }
        },
        //#region Methods
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._halo = this._HTMLElement.lastElementChild;
            }
        },
        destroy: function () {
            this._halo = null;
            this._inherited();
        }
        //#endregion
    });
    Object.seal(IPhoneButton);
    $j.classes.register($j.types.categories.EXTENDED, IPhoneButton);
    //#region template
    if ($j.isHTMLRenderer()) {
        var IPhoneButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='IPhoneButton' class='Control IPhoneButton {theme} csr_default' style='width:50px;height:50px;'>\
                         <span class='Control IPhoneButtonCaption'></span>\
                         <img class='Control' alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' draggable='false' style='width: 32px;height: 32px;left: 9px;top: 9px;' />\
                         <div class='Control IPhoneButtonHalo'></div>\
                         </button>";
        $j.classes.registerTemplates([{ Class: IPhoneButton, template: IPhoneButtonTpl }]);
    }
    //#endregion template
})();