//#region Imports
//#endregion Imports
//#region PasswordTextBox
const PasswordTextBox = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class PasswordTextBox
    class PasswordTextBox extends CustomTextBoxBtn {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                props.btnClass = Core.classes.TextButton;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return PasswordTextBox;
    //#endregion PasswordTextBox
})();
Core.classes.register(Types.CATEGORIES.COMMON, PasswordTextBox);
//#endregion PasswordTextBox

/*(function () {
    //#region PasswordTextBox
    var PasswordTextBox = $j.classes.CustomTextBoxBtn.extend("PasswordTextBox", {
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
                $j.tools.addPropertyFromSet(this, "type", $j.types.HTMLInputTypes, $j.types.HTMLInputTypes.PASSWORD);
                this.text = String.EMPTY;
            }
        },
        //#region Setters
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this._inherited(newValue);
                if (this.enabled) this._btn._HTMLElement.removeAttribute("disabled");
                else this._btns.first()._HTMLElement.setAttribute("disabled", "disabled");
            }
        },
        //#endregion
        //#region Methods
        //update:function() {
        //  if (this._loading||this.form._loading) return;
        //  this._inherited();
        //  //this.recalcInputWidth();
        //},
        revealPassword: function (event) {
            if (!this.jsObj.isEnabled()) return;
            $j.mouse.getMouseInfos(event);
            if ($j.isHTMLRenderer()) {
                if ($j.mouse.button === $j.types.mouseButtons.LEFT && $j.mouse.eventType === $j.types.mouseEvents.DOWN) this.jsObj._owner._inputObj.setAttribute("type", $j.types.HTMLInputTypes.TEXT);
                else {
                    this.jsObj._owner._inputObj.setAttribute("type", $j.types.HTMLInputTypes.PASSWORD);
                    this.jsObj._owner._inputObj.focus();
                }
            } else {
            }
        },
        //keyUp:function() {
        //  this._inherited();
        //  this.recalcInputWidth();
        //},
        //recalcInputWidth:function() {
        //  if (this._inputObj)) {
        //    if (this._inputObj.value.length===0) {
        //      this._inputObj.style.width="calc(100% - 4px)";
        //      this._btns.first()._HTMLElementStyle.display=$j.types.displays.NONE;
        //      //this._btns.first().setVisible(false);
        //    } else {
        //      this._inputObj.style.width="calc(100% - 20px)";
        //      this._btns.first()._HTMLElementStyle.display=$j.types.displays.BLOCK;
        //      //this._btns.first().setVisible(true);
        //    }
        //  }
        //},
        destroy: function () {
            this._inherited();
            this.type = null;
            this.text = null;
        },
        loaded: function () {
            this._inherited();
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.DOWN, this.revealPassword);
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.UP, this.revealPassword);
            $j.tools.events.bind(this._btns.first()._HTMLElement, $j.types.mouseEvents.OUT, this.revealPassword);
            //this.recalcInputWidth();
            //this._btns.first().setCaption('0');
        }
        //#endregion
    });
    $j.classes.register($j.types.categories.COMMON, PasswordTextBox);
    //#endregion
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var PasswordTextBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='PasswordTextBox' class='Control TextBox PasswordTextBox {theme}' data-length='0' style='width:121px;height:21px;'>\
                            <input type='password' placeholder='type your password here' class='Control csr_text {theme} TextBoxInput PasswordTextBoxInput' />\
                            <button id='{internalId}_1' data-class='TextButton' class='Control TextButton {theme} PasswordTextBoxButton csr_default'></button>\
                            </div>";
        $j.classes.registerTemplates([{ Class: PasswordTextBox, template: PasswordTextBoxTpl }]);
    }
    //endregion
})();*/