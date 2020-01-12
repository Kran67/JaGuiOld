(function () {
    "use strict";
    var ColorQuad = $j.classes.GraphicControl.extend("ColorQuad", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._handleObj = null;
                this._handle = new $j.classes.Point;
                //#endregion
                this.autoCapture = true;
                this.colorBox = null;
                this.onChange = new $j.classes.NotifyEvent(this);
                this.color = new $j.classes.Color(this.fillColor);
                $j.tools.addPropertyFromSet(this, "format", $j.types.colorFormats, $j.types.colorFormats.HSL);
                this.setHitTest(true);
                this.clipChilds = false;
                this.gradientEdit = null;
                this.canFocused = true;
                delete this.tabOrder;
            }
        },
        //#region Setter
        setColorBox: function (newValue) {
            if (!(newValue instanceof $j.classes.ColorBox)) return;
            if (this.colorBox !== newValue) {
                this.colorBox = newValue;
                if (this.colorBox instanceof $j.classes.ColorBox) {
                    if (this.colorBox.fillColor) this.colorBox.fillColor.assign(this.color);
                }
            }
        },
        setColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.color.equals(newValue)) {
                this.color.assign(newValue);
                this.fillColor.assign(newValue);
                this.update();
            }
        },
        setHue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0) newValue = 0;
            if (newValue > 360) newValue = 359;
            if (this.fillColor.hue !== newValue) {
                this.color.hue = newValue;
                this.update();
            }
        },
        setFormat: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.colorFormats)) return;
            if (newValue !== this.format) {
                this.format = newValue;
                if ($j.isHTMLRenderer()) {
                    if (this._HTMLElement) {
                        this._HTMLElement.dataset.format = this.format;
                        this.update();
                    }
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        setWidth: function (newValue) {
            if (this._HTMLElement.offsetWidth === newValue) return;
            this._inherited(newValue);
            if (!$j.isHTMLRenderer()) {
                destroy(this.colorBitmap);
                this.colorBitmap = null;
            }
        },
        setHeight: function (newValue) {
            if (this._HTMLElement.offsetHeight === newValue) return;
            this._inherited(newValue);
            if (!$j.isHTMLRenderer()) {
                destroy(this.colorBitmap);
                this.colorBitmap = null;
            }
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            this._update();
        },
        update: function (point) {
            var value;
            if (!point) {
                point = $j.classes.Point;
                if (this.format === $j.types.colorFormats.HSV) value = this.color.value;
                else value = this.color.lightness;
                point.x = ((this.color.saturation * this._HTMLElement.offsetWidth / 100) | 0);
                point.y = (this._HTMLElement.offsetHeight - (value * this._HTMLElement.offsetHeight / 100) | 0);
            }
            this._handle.x = point.x;
            this._handle.y = point.y;
            if (this._handle.x < 0) this._handle.x = 0;
            if (this._handle.x > this._HTMLElement.offsetWidth) this._handle.x = this._HTMLElement.offsetWidth;
            if (this._handle.y < 0) this._handle.y = 0;
            if (this._handle.y > this._HTMLElement.offsetHeight) this._handle.y = this._HTMLElement.offsetHeight;
            this._handleObj.style.transform = "translate(" + (this._handle.x - _const.COLORPICKSIZE / 2) + $j.types.CSSUnits.PX + "," + (this._handle.y - _const.COLORPICKSIZE / 2) + $j.types.CSSUnits.PX + ")";
            this._update();
        },
        mouseDown: function (mouseButton, point) {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this._isPressed) {
                var point = this.documentToClient();
                this.update(point);
            }
        },
        mouseMove: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this._isPressed) {
                var point = this.documentToClient();
                this.update(point);
            }
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._handleObj = this._HTMLElement.firstElementChild;
                this._handleObj.jsObj = this;
            }
        },
        _update: function () {
            var value, saturation;
            if (this._loading || this.form._loading) return;
            if (!this._HTMLElement) return;
            this._HTMLElement.dataset.format = this.format;
            this.fillColor.hue = this.color.hue;
            this.fillColor.saturation = 100;
            this.fillColor.value = 100;
            this.fillColor.lightness = 50;
            if (this.format === $j.types.colorFormats.HSV) this.fillColor.HSVtoRGB();
            else this.fillColor.HSLtoRGB();
            this._HTMLElementStyle.backgroundColor = this.fillColor.toARGBString();
            value = 100 - (this._handle.y * 100 / this._HTMLElement.offsetHeight) | 0;
            saturation = this._handle.x * 100 / this._HTMLElement.offsetWidth | 0;
            if (this.format === $j.types.colorFormats.HSV) this.color.setHSV(this.fillColor.hue, saturation, value);
            else this.color.setHSL(this.fillColor.hue, saturation, value);
            if (!this._updating) {
                if (this.colorBox instanceof $j.classes.ColorBox) this.colorBox.setColor(this.color);
                if (this.gradientEdit instanceof $j.classes.GradientEdit) this.gradientEdit.changeCurrentPointColor(this.color);
                this.onChange.invoke();
            }
        },
        destroy: function () {
            this._inherited();
            this._handleObj = null;
            this._handle.destroy();
            this._handle = null;
            this.autoCapture = null;
            this.colorBox = null;
            this.onChange.destroy();
            this.onChange = null;
            this.color.destroy();
            this.color = null;
            this.format = null;
            this.clipChilds = null;
            this.gradientEdit = null;
        },
        updateFromHTML: function () {
            this._inherited();
            var data = this._HTMLElement.dataset.format;
            if (data) this.format = data;
            data = this._HTMLElement.dataset.color;
            if (data) this.setColor(_colors.parse(data));
            data = this._HTMLElement.dataset.colorbox;
            if (data) this.colorBox = this.form[data];
            this.bindEventToHTML("onChange");
        },
        keyDown: function () {
            var pt = new $j.classes.Point(this._handle.x, this._handle.y), changeHandle = false, offset = 1;
            this._inherited();
            if ($j.keyboard.shift) offset *= 5;
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                    pt.x -= offset;
                    if (pt.x < 0) pt.x = 0;
                    changeHandle = true;
                    break;
                case $j.types.VKeysCodes.VK_UP:
                    pt.y -= offset;
                    if (pt.y < 0) pt.y = 0;
                    changeHandle = true;
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                    pt.x += offset;
                    if (pt.x > this._HTMLElement.offsetWidth) pt.x = this._HTMLElement.offsetWidth;
                    changeHandle = true;
                    break;
                case $j.types.VKeysCodes.VK_DOWN:
                    pt.y += offset;
                    if (pt.y > this._HTMLElement.offsetHeight) pt.y = this._HTMLElement.offsetHeight;
                    changeHandle = true;
                    break;
            }
            if (changeHandle) this.update(pt);
        }
        //#endregion
    });
    Object.seal(ColorQuad);
    $j.classes.register($j.types.categories.COLOR, ColorQuad);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ColorQuadTpl = "<div id='{internalId}' data-name='{name}' data-class='ColorQuad' class='Control ColorQuad hsl' data-color='blue' data-format='hsl' style='width:100px;height:100px;'>\
                      <div class='Control ColorQuadIndicator'></div>\
                      </div>";
        $j.classes.registerTemplates([{ Class: ColorQuad, template: ColorQuadTpl }]);
    }
    //endregion
})();