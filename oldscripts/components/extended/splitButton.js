(function () {
    //#region SplitButton
    var SplitButton = $j.classes.ThemedControl.extend("SplitButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._btn = $j.classes.createComponent($j.classes.BitmapButton, this, null, { _inForm: false }, false);
                this._btn.canFocused = false;
                this._popupBtn = $j.classes.createComponent($j.classes.PopupButton, this, null, { _inForm: false }, false);
                this._popupBtn.canFocused = false;
                this._popupBtn.click = this.clickPopup;
                //#endregion
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

        },
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._btn.getHTMLElement(this._HTMLElement.firstElementChild.id);
                this._btn.getChildsHTMLElement();
                this._btn.updateFromHTML();
                this._popupBtn.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this._popupBtn.getChildsHTMLElement();
                this._popupBtn.updateFromHTML();
            }
        },
        loaded: function () {
            this._inherited();
            if (this.popupMenu instanceof $j.classes.PopupMenu) this._popupBtn.popupMenu = this.popupMenu;
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
            if (this.action) this.action.removeTarget(this);
            this.action = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{bitmapButton}"), tpl;
            tpl = this._btn.getTemplate();
            html = a.join(tpl);
            a = html.split("{popupButton}"), tpl;
            tpl = this._popupBtn.getTemplate();
            html = a.join(tpl);
            return html;
        },
        loaded: function () {
            this._inherited();
            this._btn.setCaption(this.name);
            this._btn.setGlyphSize(0);
            this._popupBtn.setCaption(String.EMPTY);
        },
        update: function () {
            this._btn.update();
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.EXTENDED, SplitButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var SplitButtonTpl = "<div id='{internalId}' data-name='{name}' data-class='SplitButton' class='Control SplitButton {theme} csr_default' style='width:75px;height:21px;'>\
                        {bitmapButton}\
                        {popupButton}\
                        </div>";
        $j.classes.registerTemplates([{ Class: SplitButton, template: SplitButtonTpl }]);
    }
    //#endregion
})();