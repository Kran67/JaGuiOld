(function () {
    //#region spinBoxTypes
    $j.types.spinBoxTypes = {
        INTEGER: "integer",
        FLOAT: "float"
    };
    Object.seal($j.types.spinBoxTypes); Object.freeze($j.types.spinBoxTypes);
    //#endregion
    //#region SpinBox
    var SpinBox = $j.classes.CustomTextBoxBtn.extend("SpinBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props._btnClass = $j.classes.TextButton;
                props.btns = 2;
                this._inherited(owner, props);
                //#region Private
                this._btnPlus = this._btns.last();
                this._btnMinus = this._btns.first();
                this._btnPlus.repeatClick = true;
                this._btnMinus.repeatClick = true;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 100;
                    this.height = 21;
                }
                $j.tools.addPropertyFromSet(this, "valueType", $j.types.spinBoxTypes, $j.types.spinBoxTypes.INTEGER);
                this.value = 0;
                this.increment = 1;
                this.decimalDigits = 2;
                this.min = 0;
                this.max = 100;
                this.filterChars = '0123456789.,-';
                this._btnMinus.onMouseDown.addListener(this.decValue);
                this._btnPlus.onMouseDown.addListener(this.incValue);
            }
        },
        //#region Setter
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.value !== newValue) {
                if (newValue > this.max) newValue = this.max;
                if (newValue < this.min) newValue = this.min;
                this.value = newValue;
                if (this.valueType === $j.types.spinBoxTypes.FLOAT) this.value = parseFloat(this.value.toFixed(this.decimalDigits));
                var DecimalSeparator = ".";
                if (($j.frac(this.value) === 0) || (this.valueType === $j.types.spinBoxTypes.INTEGER)) this.setText(_conv.intToStr($j.trunc(this.value)));
                else this.setText(_conv.floatToStr(this.value));
                this.onChange.invoke();
            }
        },
        setIncrement: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.increment !== newValue) this.increment = newValue;
        },
        setDecimalDigits: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.decimalDigits !== newValue) {
                this.decimalDigits = newValue;
                var oldValue = this.value;
                this.value = 0;
                this.value = oldValue;
            }
        },
        setMin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.min !== newValue) {
                this.min = newValue;
                if (this.value > this.min) this.setValue(this.min);
                this.update();
            }
        },
        setMax: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.max !== newValue) {
                this.max = newValue;
                if (this.value > this.max) this.setValue(this.max);
                this.update();
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this._inherited(newValue);
                if (this.enabled) {
                    this._btnPlus._HTMLElement.dataset.enabled = true;
                    this._btnMinus._HTMLElement.dataset.enabled = true;
                    this._btnPlus.setEnabled(true);
                    this._btnMinus.setEnabled(true);
                } else {
                    this._btnPlus._HTMLElement.dataset.enabled = false;
                    this._btnMinus._HTMLElement.dataset.enabled = false;
                    this._btnPlus.setEnabled(false);
                    this._btnMinus.setEnabled(false);
                }
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            if (this._loading || this.form._loading) return;
            if (this._inputObj) {
                if (this.text === String.EMPTY || !$j.isNumber(this._inputObj.value)) {
                    this.value = 0;
                    this.text = "0";
                    this._inputObj.value = 0;
                }
            }
            if (this.value === this.min) this._btnMinus.setEnabled(false);
            else this._btnMinus.setEnabled(true);
            if (this.value === this.max) this._btnPlus.setEnabled(false);
            else this._btnPlus.setEnabled(true);
        },
        loaded: function () {
            this._inherited();
            this.text = this.value;
            //this._btnMinus.setCaption('*');
            //this._btnPlus.setCaption(')');
            this.update();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.value;
            if (data) this.value = ~~data;
            data = this._HTMLElement.dataset.min;
            if (data) this.setMin(~~data);
            data = this._HTMLElement.dataset.max;
            if (data) this.setMax(~~data);
        },
        decValue: function () {
            if (!this.isEnabled()) return;
            if (!this.hitTest.mouseDown) return;
            this._owner.setValue(this._owner.value - this._owner.increment);
            if (this._owner.value < this._owner.min) this._owner.setValue(this._owner.min);
        },
        incValue: function () {
            if (!this.isEnabled()) return;
            if (!this.hitTest.mouseDown) return;
            this._owner.setValue(this._owner.value + this._owner.increment);
            if (this._owner.value > this._owner.max) this._owner.setValue(this._owner.max);
        },
        keyDown: function () {
            this._inherited();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_DOWN) this.decValue();
            else if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_UP) this.incValue();
        },
        keyUp: function () {
            this._inherited();
            this.setValue(this.valueType === $j.types.spinBoxTypes.INTEGER ? ~~this._inputObj.value : parseFloat(this._inputObj.value));
        },
        destroy: function () {
            this._inherited();
            this._btnPlus = null;
            this._btnMinus = null;
            this.valueType = null;
            this.value = null;
            this.increment = null;
            this.decimalDigits = null;
            this.min = null;
            this.max = null;
            this.filterChars = null;
        }
        //#endregion
    });
    $j.classes.register($j.types.categories.COMMON, SpinBox);
    //#endregion
    //#region Template
    if ($j.isHTMLRenderer()) {
        var SpinBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='SpinBox' class='Control TextBox SpinBox {theme}' style='width:81px;height:21px;'>\
                    <input type='text' value='0' class='Control csr_text TextBoxInput SpinBoxInput {theme}' />\
                    <button id='{internalId}_1' data-class='TextButton' class='Control TextButton {theme} SpinBoxMinusBtn'></button>\
                    <button id='{internalId}_2' data-class='TextButton' class='Control TextButton {theme} SpinBoxPlusBtn'></button>\
                    </div>";
        $j.classes.registerTemplates([{ Class: SpinBox, template: SpinBoxTpl }]);
    }
    //#endregion
})();