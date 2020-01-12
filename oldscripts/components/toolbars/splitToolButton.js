(function () {
    "use strict";
    //#region SplitToolButton
    var SplitToolButton = $j.classes.ThemedControl.extend("SplitToolButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._btn = $j.classes.createComponent($j.classes.BitmapButton, this, null, { _inForm: false }, false);
                this._popupBtn = $j.classes.createComponent($j.classes.PopupButton, this, null, { _inForm: false }, false);
                this._btn.canFocused = false;
                this._popupBtn.canFocused = false;
                this._popupBtn.click = this.clickPopup;
                //#endregion
                this.onCloseMenu = new $j.classes.NotifyEvent(this);
                this.onOpenMenu = new $j.classes.NotifyEvent(this);
                this.imageIndex = -1;
                this.action = null;
            }
        },
        //#region Setters
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            this._btn.setCaption(newValue);
        },
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
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.imageindex;
            if (data) this.imageIndex = ~~data;
        },
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._btn.getHTMLElement(this._HTMLElement.firstElementChild.id);
                this._btn.getChildsHTMLElement();
                this._btn.updateFromHTML();
                this._popupBtn.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this._popupBtn.updateFromHTML();
            }
        },
        loaded: function () {
            this._inherited();
            if (this.popupMenu instanceof $j.classes.PopupMenu) this._popupBtn.popupMenu = this.popupMenu;
            if (this.imageIndex > -1) {
                if (this._owner.images) {
                    if (this._owner.images._images[this.imageIndex]) {
                        this._btn._HTMLElement.lastElementChild.style.backgroundImage = "url(" + this._owner.images._images[this.imageIndex] + ")";
                        this._btn._HTMLElement.lastElementChild.style.backgroundSize = this._owner.images.width + $j.types.CSSUnits.PX + String.SPACE + this._owner.images.height + $j.types.CSSUnits.PX;
                    }
                }
            }
        },
        clickPopup: function () {
            var pt;
            if (this.popupMenu) {
                if (this.popupMenu instanceof $j.classes.PopupMenu) {
                    pt = this._owner.clientToDocument();
                    this.popupMenu._control = this._owner;
                    this.popupMenu.show(pt.x, pt.y + this._owner._HTMLElement.offsetHeight);
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._btn = null;
            this._popupBtn = null;
            this.onCloseMenu.destroy();
            this.onCloseMenu = null;
            this.onOpenMenu.destroy();
            this.onOpenMenu = null;
            this.imageIndex = null;
            if (this.action) this.action.removeTarget(this);
            this.action = null;
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, SplitToolButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var SplitToolButtonTpl = "<div id='{internalId}' data-name='{name}' data-class='SplitToolButton' class='Control SplitToolButton {theme}' style='width:127px;'>\
                            <button id='{internalId}_1' data-class='BitmapButton' class='Control ButtonGlyph BitmapButton {theme}'>\
                            <span class='Control ButtonCaption BitmapButtonCaption'>{caption}</span>\
                            <img alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' draggable='false' width='32' height='32' />\
                            </button>\
                            <button id='{internalId}_2' data-class='PopupButton' class='Control PopupButton {theme}'>\
                            <span class='Control ButtonCaption'></span>\
                            <div class='Control PopupButtonArrow'>8</div>\
                            </button>\
                            </div>";

        $j.classes.registerTemplates([{ Class: SplitToolButton, template: SplitToolButtonTpl }]);
    }
    //#endregion
})();