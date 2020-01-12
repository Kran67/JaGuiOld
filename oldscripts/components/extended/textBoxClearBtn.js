(function () {
    //#region TextBoxClearBtn
    var TextBoxClearBtn = $j.classes.CustomTextBoxBtn.extend("TextBoxClearBtn", {
        init: function (owner, props) {
            if (owner) {
                props = !props ? {} : props;
                props._btnClass = $j.classes.TextButton;
                this._inherited(owner, props);
                //#region Private
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 121;
                    this.height = 21;
                }
            }
        },
        //#region Setters
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this._inherited(newValue);
                if (this.enabled) this._btns.first()._HTMLElement.removeAttribute("disabled");
                else this._btns.first()._HTMLElement.setAttribute("disabled", "disabled");
            }
        },
        //#endregion
        //#region Methods
        clearInput: function (event) {
            $j.mouse.getMouseInfos(event);
            if ($j.isHTMLRenderer()) {
                if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                    this.jsObj._owner._inputObj.value = this.jsObj._owner.text = String.EMPTY;
                }
            } else {
            }
            this.jsObj._owner._HTMLElement.dataset.length = this.jsObj._owner._inputObj.value.length;
            this.jsObj._owner.update();
            this.jsObj._owner._inputObj.focus();
        },
        loaded: function () {
            this._inherited();
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.CLICK, this.clearInput);
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.EXTENDED, TextBoxClearBtn);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var TextBoxClearBtnTpl = "<div id='{internalId}' data-name='{name}' data-class='TextBoxClearBtn' class='Control TextBox TextBoxClearBtn {theme}' data-length='0' style='width:121px;height:21px;'>\
                            <input type='text' class='Control csr_text TextBoxInput TextBoxClearBtnInput {theme}' />\
                            <button id='{internalId}_1' data-class='TextButton' class='Control TextButton TextBoxClearBtnButton {theme}'></button>\
                            </div>";
        $j.classes.registerTemplates([{ Class: TextBoxClearBtn, template: TextBoxClearBtnTpl }]);
    }
    //endregion
})();