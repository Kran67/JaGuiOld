(function () {
    var PopupButton = $j.classes.Button.extend("PopupButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Privates
                this._textObj = null;
                //#endregion
            }
        },
        //#region Setters
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = $j.tools.text.replace(newValue, _const.HOTKEYPREFIX, String.EMPTY);
                this.update();
            }
        },
        //#endregion
        //#region Methods
        click: function () {
            var pt;
            this.onClick.invoke();
            if (this.popupMenu) {
                if (this.popupMenu instanceof $j.classes.PopupMenu) {
                    pt = this.clientToDocument();
                    this.popupMenu._control = this;
                    this.popupMenu.show(pt.x, pt.y + this._HTMLElement.offsetHeight);
                }
            }
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_UP:
                case $j.types.VKeysCodes.VK_RIGHT:
                case $j.types.VKeysCodes.VK_DOWN:
                case $j.types.VKeysCodes.VK_RETURN:
                case $j.types.VKeysCodes.VK_ENTER:
                    if (!this.form._popups.isEmpty()) this.form._popups.last().keyDown();
                    $j.keyboard.stopEvent();
                    break;
                case $j.types.VKeysCodes.VK_ESCAPE:
                    break;
            }
        },
        keyUp: function () {
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_RETURN:
                case $j.types.VKeysCodes.VK_ENTER:
                    $j.keyboard.stopEvent();
                    break;
            }
            this._inherited();
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._textObj = this._HTMLElement.firstElementChild;
                this._textObj.jsObj = this;
                this.caption = this._textObj.innerHTML;
            }
        },
        update: function () {
            if (this._textObj) this._textObj.innerHTML = this.caption;
        },
        destroy: function () {
            this._textObj = null;
            this._inherited();
        }
        //#endregion
    });
    Object.seal(PopupButton);
    $j.classes.register($j.types.categories.EXTENDED, PopupButton);
    //#region Template
    if ($j.isHTMLRenderer()) {
        PopupButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='PopupButton' class='Control PopupButton {theme}' style='width:75px;height:21px;'>\
                    <span class='Control ButtonCaption'>PopupButton</span>\
                    <div class='Control PopupButtonArrow'>8</div>\
                    </button>";
        $j.classes.registerTemplates([{ Class: PopupButton, template: PopupButtonTpl }]);
    }
    //#ednregion
})();