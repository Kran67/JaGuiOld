(function () {
    var AngleButton = $j.classes.CustomButton.extend("AngleButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._internalValue = 0;
                this._knob = null;
                this._saveValue = 0;
                this._textObj = null;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 30;
                    this.height = 30;
                }
                this.frequency = 1;
                this.tracking = true;
                this.value = 0;
                this.showValue = true;
                this.autoCapture = true;
                this.caption = String.EMPTY;
                this.canFocused = true;
                this.onChanged = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Setters
        setFrequency: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.frequency !== newValue) this.frequency = newValue;
        },
        setTracking: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.tracking !== newValue) this.tracking = newValue;
        },
        setInternalValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._internalValue !== newValue) {
                if (this.frequency === 0) {
                    this._internalValue = newValue;
                } else {
                    var nv = $j.round(newValue / this.frequency) * this.frequency;
                    if (this._internalValue !== nv) {
                        this._internalValue = nv;
                    }
                }
                if (this._internalValue > 0) this.value = $j.round(360 - this._internalValue, 0);
                else this.value = 360 - $j.round(360 + this._internalValue, 0);
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                } else this.update();
                this.onChanged.invoke();
            }
        },
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue >= 360) newValue = 0;
            if (newValue < 0) newValue = 0;
            if (this.value !== newValue) {
                this.value = 360 - newValue;
                this.setInternalValue(this.value);
            }
        },
        setShowValue: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showValue !== newValue) {
                this.showValue = newValue;
                if (this.showValue) this._textObj.style.visibility = "normal";
                else this._textObj.style.visibility = "hidden";
                //this._textObj
                //if (!$j.isHTMLRenderer()) {
                //  if (this._allowUpdate) this.update();
                //  this.redraw();
                //} else this.update();
            }
        },
        //#endregion
        //#region Methods
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                this._saveValue = this._internalValue;
            }
        },
        mouseMove: function () {
            this._inherited();
            if (($j.mouse.button === $j.types.mouseButtons.LEFT) && this._isPressed) {
                var point = this.documentToClient();
                this.valueFromPoint(point);
            }
        },
        mouseUp: function () {
            var pressing = this._isPressed;
            this._inherited();
            if (pressing) {
                var point = this.documentToClient();
                this.valueFromPoint(point);
            }
        },
        update: function () {
            if (this._loading || this.form._loading) return;
            this._knob.style.transform = "rotate(" + this._internalValue + "deg)";
            //this._knob.style.lineHeight=this._knob.offsetHeight+$j.types.CSSUnits.PX;
            this._textObj.innerHTML = this.value + "&deg;";
            this._textObj.style.lineHeight = this._textObj.offsetHeight + $j.types.CSSUnits.PX;
        },
        valueFromPoint: function (point) {
            var v = new $j.classes.Vector(point.x - this._HTMLElement.offsetWidth / 2, point.y - this._HTMLElement.offsetHeight / 2);
            var v1 = new $j.classes.Vector(1, 0, 0);
            this.setInternalValue(-v1.angle(v));
        },
        mouseWheel: function () {
            var newVal = this._internalValue + ~~($j.mouse.wheelDelta * 10);
            if (newVal < -360) newVal = 360 + newVal;
            else if (newVal > 360) newVal = 360 - newVal;
            this.setInternalValue(newVal);
        },
        getChildsHTMLElement: function () {
            this._inherited();
            this._textObj = this._HTMLElement.firstElementChild;
            this._textObj.jsObj = this;
            this._knob = this._HTMLElement.lastElementChild;
            this._knob.jsObj = this;
        },
        destroy: function () {
            this._inherited();
            this._internalValue = null;
            this._knob = null;
            this._textObj = null;
            this._saveValue = null;
            this.frequency = null;
            this.tracking = null;
            this.value = null;
            this.showValue = null;
            this.autoCapture = null;
            this.caption = null;
            this.onChanged.destroy();
            this.onChanged = null;
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_UP:
                    this.setValue(this.value + this.frequency);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                case $j.types.VKeysCodes.VK_DOWN:
                    this.setValue(this.value - this.frequency);
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                case $j.types.VKeysCodes.VK_END:
                    this.setValue(0);
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    this.setValue(this.value + this.frequency * 5);
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    this.setValue(this.value - this.frequency * 5);
                    break;
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.showvalue;
            if (data) this.setShowValue(_conv.strToBool(data));
        },
        loaded: function () {
            this._inherited();
            this.update();
        }
        //#endregion
    });
    Object.seal(AngleButton);
    $j.classes.register($j.types.categories.EXTENDED, AngleButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var AngleButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='AngleButton' class='Control AngleButton {theme}' style='width:30px;height:30px;'>\
                        <div class='Control AngleButtonCaption'>0°</div>\
                        <div class='Control AngleButtonKnob'>3</div>\
                        </button>";
        $j.classes.registerTemplates([{ Class: AngleButton, template: AngleButtonTpl }]);
    }
    //endregion
})();