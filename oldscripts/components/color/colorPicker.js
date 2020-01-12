(function () {
    "use strict";
    var ColorPicker = $j.classes.GraphicControl.extend("ColorPicker", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._handle = new $j.classes.Point((this.width / 2) - 5, -5);
                this._handleObj = null;
                //#endregion
                this.onChange = new $j.classes.NotifyEvent(this);
                this.color = new $j.classes.Color(_colors.RED);
                this.autoCapture = true;
                this.setHitTest(true);
                this.colorQuad = null;
                this.clipChilds = false;
                this.canFocused = true;
                delete this.fillColor;
                delete this.strokeColor;
                delete this.strokeWidth;
                delete this.setStrokeWidth;
                delete this.setFillColor;
                delete this.setStrokeColor;
                delete this.tabOrder;
            }
        },
        //#region Setters
        setColor: function (newValue) {
            var pos;
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.color.equals(newValue)) {
                this.color.assign(newValue);
                pos = (this.color.hue * this._HTMLElement.offsetHeight / 360) | 0;
                pos -= _const.COLORPICKSIZE / 2;
                this._handle.y = (pos > this._HTMLElement.offsetHeight - 5 ? this._HTMLElement.offsetHeight - 5 : (pos < -5) ? -5 : pos);
                this._update();
            }
        },
        setColorQuad: function (newValue) {
            if (!(newValue instanceof $j.classes.ColorQuad)) return;
            if (this.colorQuad !== newValue) {
                this.colorQuad = newValue;
                if (this.colorQuad instanceof $j.classes.ColorQuad) this.colorQuad.color.assign(this.color);
            }
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            this._update();
        },
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this._isPressed) {
                if (this._HTMLElement.offsetHeight !== 0) {
                    var point = this.documentToClient();
                    this.update(point);
                }
            }
        },
        mouseMove: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this._isPressed) {
                if (this._HTMLElement.offsetHeight !== 0) {
                    var point = this.documentToClient();
                    this.update(point);
                }
            }
        },
        mouseUp: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this._isPressed) {
                if (this._HTMLElement.offsetHeight !== 0) {
                    var point = this.documentToClient();
                    this.update(point);
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._handle.destroy();
            this._handle = null;
            this._handleObj = null;
            this.onChange.destroy();
            this.onChange = null;
            this.color.destroy();
            this.color = null;
            this.autoCapture = null;
            this.colorQuad = null;
            this.clipChilds = null;
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._handleObj = this._HTMLElement.firstElementChild;
                this._handleObj.jsObj = this;
            }
        },
        update: function (point) {
            if (!point) {
                point = $j.classes.Point;
                point.x = 0;
                point.y = 0;
            }
            this.color.setHue(~~((point.y * 360) / this._HTMLElement.offsetHeight));
            if (!$j.isHTMLRenderer()) {
                point.x -= _const.COLORPICKSIZE * 2;
                point.y -= _const.COLORPICKSIZE * 2;
            } else {
                point.y -= _const.COLORPICKSIZE / 2;
            }
            this._handle.y = (point.y > this._HTMLElement.offsetHeight - 5 ? this._HTMLElement.offsetHeight - 5 : (point.y < -5) ? -5 : point.y);
            if (this._handleObj) {
                this._update();
            }
            if (!this._updating) this.onChange.invoke();
        },
        _update: function () {
            this._handleObj.style.transform = "translate(-50%," + this._handle.y + $j.types.CSSUnits.PX + ")";
            if (!this._updating) {
                if (this.colorQuad instanceof $j.classes.ColorQuad) this.colorQuad.setHue(this.color.hue);
            }
        },
        updateFromHTML: function () {
            this._inherited();
            var data = this._HTMLElement.dataset.colorquad;
            if (data) this.colorQuad = this.form[data];
            data = this._HTMLElement.dataset.color;
            if (data) this.color.assign(_colors.parse(data));
        },
        keyDown: function () {
            var pt = new $j.classes.Point(this._handle.x, this._handle.y), changeHandle = false, offset = 1;
            this._inherited();
            if ($j.keyboard.shift) offset *= 5;
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_UP:
                    pt.y -= offset - _const.COLORPICKSIZE / 2;
                    if (pt.y < 0) pt.y = 0;
                    changeHandle = true;
                    break;
                case $j.types.VKeysCodes.VK_DOWN:
                    pt.y += offset + _const.COLORPICKSIZE / 2;
                    if (pt.y > this._HTMLElement.offsetHeight) pt.y = this._HTMLElement.offsetHeight;
                    changeHandle = true;
                    break;
            }
            if (changeHandle) this.update(pt);
        }
        //#endregion
    });
    Object.seal(ColorPicker);
    $j.classes.register($j.types.categories.COLOR, ColorPicker);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ColorPickerTpl = "<div id='{internalId}' data-name='{name}' data-class='ColorPicker' class='Control ColorPicker' data-color='{color}' style='width:50px;height:140px;'>\
                        <div class='Control ColorPickerIndicator'></div>\
                        </div>";
        $j.classes.registerTemplates([{ Class: ColorPicker, template: ColorPickerTpl }]);
    }
    //endregion
})();