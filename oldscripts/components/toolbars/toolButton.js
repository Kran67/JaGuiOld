(function () {
    "use strict";
    //#region ToolButtonSep
    var ToolButtonSep = $j.classes.ThemedControl.extend("ToolButtonSep", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.canFocused = false;
            }
        }
    });
    Object.seal(ToolButtonSep);
    //#endregion
    //#region ToolButton
    var ToolButton = $j.classes.BitmapButton.extend("ToolButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.canFocused = false;
                this.imageIndex = -1;
                this.action = null;
            }
        },
        //#region Setters
        setAction: function (newValue) {
            if (!(newValue instanceof $j.classes.Action)) return;
            if (this.action !== newValue) {
                if (this.action instanceof $j.classes.Action) this.action.unRegisterChanges(this);
                this.action = newValue;
                this.action.registerChanges(this);
                this.action.updateTarget(this);
            }
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            if (this.imageIndex > -1) {
                if (this._owner.images) {
                    if (this._owner.images._images[this.imageIndex]) {
                        this._HTMLElement.lastElementChild.style.backgroundImage = "url(" + this._owner.images._images[this.imageIndex] + ")";
                        this._HTMLElement.lastElementChild.style.backgroundSize = this._owner.images.width + $j.types.CSSUnits.PX + String.SPACE + this._owner.images.height + $j.types.CSSUnits.PX;
                    }
                }
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.imageindex;
            if (data) this.imageIndex = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.imageIndex = null;
            if (this.action) this.action.removeTarget(this);
            this.action = null;
        }
        //#endregion
    });
    Object.seal(ToolButton);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, ToolButton, ToolButtonSep);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ToolButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='ToolButton' class='Control ButtonGlyph ToolButton {theme}' style='width:23px;'>\
                       <span class='Control ButtonCaption ToolButtonCaption'>{caption}</span>\
                       <img alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' draggable='false' width='16' height='16' />\
                       </button>",
            ToolButtonSepTpl = "<div id='{internalId}' data-name='{name}' data-class='ToolButtonSep' class='Control ToolButtonSep {theme}'></div>";
        $j.classes.registerTemplates([{ Class: ToolButton, template: ToolButtonTpl }, { Class: ToolButtonSep, template: ToolButtonSepTpl }]);
    }
    //endregion
})();