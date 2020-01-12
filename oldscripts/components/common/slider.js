(function () {
    //#region SliderModes
    $j.types.sliderModes = {
        NORMAL: "normal",
        RANGE: "range"
    };
    //#endregion
    //#region Slider
    var Slider = $j.classes.ThemedControl.extend("Slider", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                $j.tools.addPropertyFromSet(this, "orientation", $j.types.orientations, $j.types.orientations.HORIZONTAL);
                this._leftInput = null;
                this._rightInput = null;
                this._range = null;
                this._leftToolTip = null;
                this._rightToolTip = null;
                this._offset = 0;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 100;
                    this.height = 14;
                }
                this.canFocused = true;
                this.min = 0;
                this.max = 100;
                this.frequency = 1;
                $j.tools.addPropertyFromSet(this, "mode", $j.types.sliderModes, $j.types.sliderModes.NORMAL);
                this.setHitTest(true);
                this.showValues = false;
                $j.tools.addPropertyFromSet(this, "toolTipsPosition", $j.types.anchors, $j.types.anchors.TOP);
                this.decimalPrecision = 0;
                this.onChange = new $j.classes.NotifyEvent(this);
                this.blockedThumbs = true;
            }
        },
        //#region Getters
        getValues: function () {
            return new $j.classes.Point(this._leftInput.valueAsNumber, this._rightInput.valueAsNumber);
        },
        getFirstValue: function () {
            return this._leftInput.valueAsNumber;
        },
        getLastValue: function () {
            return this._rightInput.valueAsNumber;
        },
        //#endregion
        //#region Setters
        setBlockedThumbs: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.blockedThumbs != newValue) {
                this.blockedThumbs != newValue;
            }
        },
        setOrientation: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.orientations))) return;
            if (this.orientation !== newValue) {
                $j.CSS.removeClass(this._HTMLElement, "orientation-" + this.orientation);
                this.orientation = newValue;
                //if (this.orientation === $j.types.orientations.HORIZONTAL && ((this.toolTipsPosition === $j.types.anchors.LEFT) || (this.toolTipsPosition === $j.types.anchors.RIGHT))) this.toolTipsPosition === $j.types.anchors.TOP;
                //else if (this.orientation === $j.types.orientations.VERTICAL && ((this.toolTipsPosition === $j.types.anchors.TOP) || (this.toolTipsPosition === $j.types.anchors.BOTTOM))) this.toolTipsPosition === $j.types.anchors.LEFT;
                this._leftThumb.orientation = this.orientation;
                if (this._rightThumb) this._rightThumb.orientation = this.orientation;
                $j.CSS.addClass(this._HTMLElement, "orientation-" + this.orientation);
                this.update();
            }
        },
        setMin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.min !== newValue) {
                this.min = newValue;
                this._leftInput.min = this.min;
                this._rightInput.min = this.min;
            }
        },
        setMax: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.max !== newValue) {
                this.max = newValue;
                this._leftInput.min = this.max;
                this._rightInput.min = this.max;
            }
        },
        setFrequency: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.frequency !== newValue) {
                this.frequency = newValue;
                this._leftInput.step = this.frequency;
                this._rightInput.step = this.frequency;
            }
        },
        setValues: function (newValue) {
            if (!Array.isArray(newValue)) return;
            if (this._leftInput.value !== newValue.first()) this._leftInput.value = newValue.first();
            if (this._rightInput && this._rightInput.value !== newValue.last()) this._rightInput.value = newValue.last();
            this._change();
        },
        setLeftValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._leftInput.value !== newValue) {
                this._leftInput.value = newValue;
                this._change();
            }
        },
        setRightValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._rightInput.value !== newValue) {
                this._rightInput.value = newValue;
                this._change();
            }
        },
        setMode: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.sliderModes))) return;
            if (this instanceof $j.classes.ColorSlider) newValue = $j.types.sliderModes.NORMAL;
            if (this.mode !== newValue) {
                this.mode = newValue;
                if (this.mode === $j.types.sliderModes.NORMAL) {
                    this._range.style.display = $j.types.displays.NONE;
                    this._rightInput.style.display = $j.types.displays.NONE;
                } else {
                    this._range.style.display = $j.types.displays.BLOCK;
                    this._rightInput.style.display = $j.types.displays.BLOCK;
                }
            }
        },
        setToolTipsPosition: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.anchors))) return;
            if (this.mode !== newValue) {
                this.toolTipsPosition = newValue;
            }
        },
        setDecimalPrecision: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.decimalPrecision !== newValue) {
                this.decimalPrecision = newValue;
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._rightInput = this._HTMLElement.lastElementChild;
                this._rightInput.jsObj = this;
                $j.tools.events.bind(this._rightInput, $j.types.HTMLEvents.INPUT, this._change.bind(this));
                this._range = this._HTMLElement.firstElementChild;
                this._range.jsObj = this;
                this._leftInput = this._HTMLElement.querySelector('input[data-jsonname="leftthumb"]');
                this._leftInput.jsObj = this;
                $j.tools.events.bind(this._leftInput, $j.types.HTMLEvents.INPUT, this._change.bind(this));
            }
        },
        _getThumPos: function(thumb) {
            var position, range, positionOffset;
            range = this.max - this.min;
            position = ((thumb.valueAsNumber - this.min) / range) * 100;
            positionOffset = Math.round(this._offset * position / 100) - (this._offset / 2);
            return { position: position, positionOffset: positionOffset };
        },
        _change: function () {
            var x1, x2, t;
            if (this.blockedThumbs && this.mode === $j.types.sliderModes.RANGE) {
                if ($j.doc.activeElement === this._rightInput && this._rightInput.valueAsNumber < this._leftInput.valueAsNumber + 5) this._rightInput.value = this._leftInput.valueAsNumber + 5;
                if ($j.doc.activeElement === this._leftInput && this._leftInput.valueAsNumber > this._rightInput.valueAsNumber - 5) this._leftInput.value = this._rightInput.valueAsNumber - 5;
            }
            this.onChange.invoke();
            this.moveToolTips();
            this.moveRange();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.values;
            if (data) {
                data = JSON.parse(data)
                this._leftInput.value = data.first();
                if (this._rightInput) this._rightInput.value = data.last();
            }
            data = this._HTMLElement.dataset.min;
            if (data) this.min = ~~data;
            data = this._HTMLElement.dataset.max;
            if (data) this.max = ~~data;
            data = this._HTMLElement.dataset.orientation;
            if (data) {
                this.orientation = data;
            }
            data = this._HTMLElement.dataset.mode;
            if (data) this.mode = data;
            if (this.mode === $j.types.sliderModes.RANGE) this._range.style.display = $j.types.displays.BLOCK;
            else if (this._range) this._range.style.display = $j.types.displays.NONE;
            data = this._HTMLElement.dataset.frequency;
            if (data) this.frequency = parseFloat(data);
            data = this._HTMLElement.dataset.showvalues;
            if (data) this.showValues = _conv.strToBool(data);
            data = this._HTMLElement.dataset.tooltipsposition;
            if (data) this.toolTipsPosition = data;
            data = this._HTMLElement.dataset.decimalprecision;
            if (data) this.decimalPrecision = ~~data;
            data = this._HTMLElement.dataset.blockedthumbs;
            if (data) this.blockedThumbs = _conv.strToBool(data);
            this.bindEventToHTML("onChange");
            this.createToolTips();
            this.moveRange();
        },
        update: function () {
            if (this._loading || this.form._loading) return;
            this._HTMLElement.dataset.mode = this.mode;
            this._HTMLElement.dataset.min = this.min;
            this._HTMLElement.dataset.max = this.max;
            this._HTMLElement.dataset.orientation = this.orientation;
            this._HTMLElement.dataset.frequency = this.frequency;
            if (this._leftInput) {
                this._leftInput.min = this.min;
                this._leftInput.max = this.max;
                this._leftInput.step = this.frequency;
            }
            if (this._rightInput) {
                this._rightInput.min = this.min;
                this._rightInput.max = this.max;
                this._rightInput.step = this.frequency;
            }
        },
        mouseEnter: function () {
            this._inherited();
            this.moveToolTips();
        },
        mouseLeave: function () {
            this._inherited();
            if (this.showValues) this.hideToolTips();
        },
        mouseWheel: function () {
            var multiplier, wheelDelta = $j.mouse.wheelDelta;
            multiplier = wheelDelta < 0 ? -2 : 2;
            if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.scrollBy(0, -this.frequency * multiplier);
            else this.scrollBy(-this.frequency * multiplier, 0);
            this._inherited();
            if (this.form._focusedControl !== this) this.setFocus();
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_UP:
                    if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.scrollBy(0, -this.frequency);
                    else this.scrollBy(-this.frequency, 0);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                case $j.types.VKeysCodes.VK_DOWN:
                    if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.scrollBy(0, this.frequency);
                    else this.scrollBy(this.frequency, 0);
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                    //if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.setValues([this.leftValue, this.rightValue])
                    //else this.setValues([this.min, this.rightValue]);
                    break;
                case $j.types.VKeysCodes.VK_END:
                    //if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.setValues([this.leftValue, this.max])
                    //else this.setValues([this.max, this.rightValue]);
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.scrollBy(0, -this.frequency * 2);
                    else this.scrollBy(-this.frequency * 2, 0);
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    if ($j.keyboard.shift && this.mode === $j.types.sliderModes.RANGE) this.scrollBy(0, this.frequency * 2);
                    else this.scrollBy(this.frequency * 2, 0);
                    break;
            }
        },
        scrollBy: function (offsetFirst, offsetLast) {
            this.setValues([this._leftInput.valueAsNumber + offsetFirst, this._rightInput?this._rightInput.valueAsNumber + offsetLast:0]);
        },
        moveToolTips: function () {
            var x, prop = "left";
            if (!this.showValues) return;
            this._getThumbSize();
            if (this._leftToolTip) {
                if (this._isMouseOver) this._leftToolTip.style.visibility = "visible";
                $j.tools.text.setTextNode(this._leftToolTip, (this._leftInput.valueAsNumber).toFixed(this.decimalPrecision));
                x = this._getThumPos(this._leftInput);
                this._leftToolTip.style[prop] = "calc(" + x.position + $j.types.CSSUnits.PO + " - " + x.positionOffset + $j.types.CSSUnits.PX + ")";
            }
            if (this.mode === $j.types.sliderModes.RANGE) {
                if (this._rightInput) {
                    if (this._rightToolTip) {
                        if (this._isMouseOver) this._rightToolTip.style.visibility = "visible";
                        $j.tools.text.setTextNode(this._rightToolTip, (this._rightInput.valueAsNumber).toFixed(this.decimalPrecision));
                        x = this._getThumPos(this._rightInput);
                        this._rightToolTip.style[prop] = "calc(" + x.position + $j.types.CSSUnits.PO + " - " + x.positionOffset + $j.types.CSSUnits.PX + ")";
                    }
                }
            }
        },
        createToolTips: function () {
            var theme, style, tooltip, a, d, s, s1;
            this.destroyToolTips(true);
            tooltip = "<div class='Control SliderLeftToolTip'>{value}<div class='Control SliderLeftToolTipArrow'></div><div class='Control SliderLeftToolTipArrowFront'></div></div>";
            d = $j.doc.createElement($j.types.HTMLElements.DIV);
            a = tooltip.split("{value}");
            tooltip = a.join(this._leftInput?+this._leftInput.value:0);
            d.innerHTML = tooltip;
            this._HTMLElement.appendChild(d.firstElementChild);
            this._leftToolTip = this._HTMLElement.lastElementChild;
            this._leftToolTip.jsObj = this;
            $j.CSS.addClass(this._leftToolTip, this.toolTipsPosition + String.SPACE + this.getThemeName());
            $j.CSS.addClass(this._leftToolTip.firstElementChild, this.toolTipsPosition + String.SPACE + this.getThemeName());
            $j.CSS.addClass(this._leftToolTip.lastElementChild, this.toolTipsPosition + String.SPACE + this.getThemeName());
            if (this.mode === $j.types.sliderModes.RANGE) {
                tooltip = "<div class='Control SliderRightToolTip'>{value}<div class='Control SliderRightToolTipArrow'></div><div class='Control SliderRightToolTipArrowFront'></div></div>";
                a = tooltip.split("{value}");
                tooltip = a.join(this._rightInput?this._rightInput.value:0);
                d.innerHTML = tooltip;
                this._HTMLElement.appendChild(d.firstElementChild);
                // appliquer les styles
                this._rightToolTip = this._HTMLElement.lastElementChild;
                this._rightToolTip.jsObj = this;
                $j.CSS.addClass(this._rightToolTip, this.toolTipsPosition + String.SPACE + this.getThemeName());
                $j.CSS.addClass(this._rightToolTip.firstElementChild, this.toolTipsPosition + String.SPACE + this.getThemeName());
                $j.CSS.addClass(this._rightToolTip.lastElementChild, this.toolTipsPosition + String.SPACE + this.getThemeName());
            }
            this._getThumbSize();
            this.hideToolTips();
            this.moveToolTips();
        },
        _getThumbSize: function() {
            var a = $j.doc.createElement($j.types.HTMLElements.DIV);
            a.className = "Control" + String.SPACE + "thumb";
            this._HTMLElement.appendChild(a);
            this._offset = a.offsetWidth;
            a.remove();
            a = null;
        },
        destroyToolTips: function (force) {
            if (this._leftToolTip) {
                this._HTMLElement.removeChild(this._leftToolTip);
                this._leftToolTip = null;
            }
            if (this.mode === $j.types.sliderModes.RANGE) {
                if (this._rightToolTip) {
                    this._HTMLElement.removeChild(this._rightToolTip);
                    this._rightToolTip = null;
                }
            }
        },
        hideToolTips: function () {
            if (this._leftToolTip) this._leftToolTip.style.visibility = "hidden";
            if (this._rightToolTip) this._rightToolTip.style.visibility = "hidden";
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{orientation}");
            html = a.join(this.orientation);
            return html;
        },
        loaded: function () {
            this._inherited();
            this.update();
        },
        destroy: function () {
            this.destroyToolTips();
            this._inherited();
            this._leftInput = null;
            this._rightInput = null;
            this._range = null;
            this._leftToolTip = null;
            this._rightToolTip = null;
            this.orientation = null;
            this.min = null;
            this.max = null;
            this.frequency = null;
            this.mode = null;
            this.showValues = null;
            this.toolTipsPosition = null;
            this.decimalPrecision = null;
            this.onChange.destroy();
            this.onChange = null;
        },
        moveRange: function () {
            if (this.mode === $j.types.sliderModes.RANGE) {
                x1 = this._leftToolTip.offsetLeft;
                x2 = this._rightToolTip.offsetLeft;
                if (x2 < x1 && !this.blockedThumbs) {
                    t = x2;
                    x2 = x1;
                    x1 = t;
                }
                this._range.style.transform = "translateX(" + x1 + $j.types.CSSUnits.PX + ")";
                this._range.style.width = (x2 - x1 + ~~(this._offset * .5)) + $j.types.CSSUnits.PX;
                this._range.style.display = $j.types.displays.BLOCK;
            }
        }
        //#endregion
    });
    //#endregion
    //#region ColorSlider
    var ColorSlider = Slider.extend("ColorSlider", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.max = 1;
                this.decimalPrecision = 1;
                this.frequency = 0.01;
            }
        },
        //#region Setters
        setMode: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.sliderModes))) return;
            this.mode = $j.types.sliderModes.NORMAL;
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._leftInput = this._HTMLElement.lastElementChild;
                this._leftInput.jsObj = this;
                $j.tools.events.bind(this._leftInput, $j.types.HTMLEvents.INPUT, this._change.bind(this));
                this._leftInput.max = this.max;
                this._leftInput.step = this.frequency;
            }
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, ColorSlider);
    $j.classes.register($j.types.categories.COMMON, Slider);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var SliderTpl = "<div id='{internalId}' data-name='{name}' data-class='Slider' class='Control Slider {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-showvalues='false' style='width:92px;height:6px;'>\
                   <div class='Control SliderRange {theme}' style='display:none;'></div>\
                   <input type='range' id='{internalId}_1' name='{internalId}_thumb' class='Control {theme} csr_default' data-jsonname='leftthumb' />\
                   <input type='range' id='{internalId}_2' name='{internalId}_thumb' class='Control {theme} csr_default' style='display:none;' />\
                   </div>";
        $j.classes.registerTemplates([{ Class: Slider, template: SliderTpl }]);
    }
    //endregion
})();

//https://css-tricks.com/custom-interactive-range-inputs/
//https://stackoverflow.com/questions/4753946/html5-slider-with-two-inputs-possible
/*
  input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background-color: red;
  border-radius: 5px;
}
input[type=range]:focus {
  outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  margin:0 -15px;
}
input[type=range]::-webkit-slider-thumb {
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background-color: rgba(255,0,0,0.5);
  -webkit-appearance: none;
  margin-top: -5px;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: #ac51b5;
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background: #65001c;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 39px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #ac51b5;
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #ac51b5;
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range]::-ms-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background: #65001c;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #ac51b5;
}
input[type=range]:focus::-ms-fill-upper {
  background: #ac51b5;
}

body {
  padding: 30px;
}

  input.addEventListener('input', function() {
    var min = this.min || 0,
      max = this.max || 100,
      c_style, u, edge_w, val, str = '';

    this.setAttribute('value', this.value);

    val = this.value + '% 100%';
    str += 'input[type="range"]' + track_sel[0] + '{background-size:' + val + '}';

    styles[0] = str;
    style_el.textContent = styles.join('');
  }, false);
*/