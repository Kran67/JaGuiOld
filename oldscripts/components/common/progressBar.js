(function () {
    var ProgressBar = $j.classes.ThemedControl.extend("ProgressBar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._progress = null;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.height = 20;
                    this.width = 100;
                }
                this.value = 0;
                this.min = 0;
                this.max = 100;
                this.hitTest = false;
                //this.orientation=$j.types.orientations.HORIZONTAL;
                $j.tools.addPropertyFromSet(this, "orientation", $j.types.orientations, $j.types.orientations.HORIZONTAL);
                delete this.tabOrder;
            }
        },
        //#region setter
        setOrientation: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.orientations)) return;
            if (this.orientation !== newValue) {
                this.orientation = newValue;
                this.update();
            }
        },
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.value) {
                this.value = newValue;
                if (this.value > this.max) this.value = this.max;
                if (this.value < this.min) this.value = this.min;
                if (!$j.isHTMLRenderer()) {
                    var lastRect = this.screenRect();
                    if (this._allowUpdate) this.update();
                    this.redraw(lastRect);
                } else this.update();
            }
        },
        setMin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.min) {
                this.min = newValue;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                } else this.update();
            }
        },
        setMax: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.max) {
                this.max = newValue;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                } else this.update();
            }
        },
        setWidth: function (newValue) {
            var style = String.EMPTY;
            this._inherited(newValue);
            //this.addAnimation();
            this.update();
        },
        setHeight: function (newValue) {
            var style = String.EMPTY;
            this._inherited(newValue);
            //this.addAnimation();
            this.update();
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            this.update();
            //this.addAnimation();
        },
        calculProgress: function () {
            var style, w, nv, margin = new $j.classes.Rect, borderLeft = 0, borderTop = 0, borderRight = 0, borderBottom = 0;
            if (!$j.isHTMLRenderer()) {
                style = this.getStyle($j.types.styles.NORMAL, $j.types.styleObjects.MIDDLE);
                margin = style.margin;
            } else {
                if (this._HTMLElement) {
                    borderLeft = parseInt(getComputedStyle(this._HTMLElement).borderLeftWidth, 10);
                    borderTop = parseInt(getComputedStyle(this._HTMLElement).borderTopWidth, 10);
                    borderRight = parseInt(getComputedStyle(this._HTMLElement).borderRightWidth, 10);
                    borderBottom = parseInt(getComputedStyle(this._HTMLElement).borderBottomWidth, 10);
                }
                if (this._progress) {
                    margin.left = parseInt(getComputedStyle(this._progress).marginLeft, 10);
                    margin.top = parseInt(getComputedStyle(this._progress).marginTop, 10);
                    margin.right = parseInt(getComputedStyle(this._progress).marginRight, 10);
                    margin.bottom = parseInt(getComputedStyle(this._progress).marginBottom, 10);
                }
                style = this.localRect();
            }
            if (this.orientation === $j.types.orientations.HORIZONTAL) nv = this._HTMLElement.offsetWidth - this.padding.left - this.padding.right - margin.left - margin.right;
            else nv = this._HTMLElement.offsetHeight - this.padding.top - this.padding.bottom - margin.top - margin.bottom - borderTop - borderBottom;
            nv = ~~(((this.value - this.min) / (this.max - this.min)) * nv);
            return nv;
        },
        update: function () {
            var style, wh;
            if (this._progress) {
                wh = this.calculProgress();
                style = this._progress.style;
                if (this.orientation === $j.types.orientations.HORIZONTAL) {
                    if (this.value === this.max) {
                        style.right = 0;
                        style.width = String.EMPTY;
                    } else {
                        style.width = wh + $j.types.CSSUnits.PX;
                        style.right = String.EMPTY;
                    }
                } else {
                    if (this.value === this.max) {
                        style.top = 0;
                        style.height = String.EMPTY;
                    } else {
                        style.height = wh + $j.types.CSSUnits.PX;
                        style.top = String.EMPTY;
                    }
                }
                this._HTMLElement.dataset.value = this.value;
                this._HTMLElement.dataset.min = this.min;
                this._HTMLElement.dataset.max = this.max;
            }
        },
        getChildsHTMLElement: function (id) {
            if (this._HTMLElement) {
                this._progress = this._HTMLElement.firstElementChild;
                this._progress.jsObj = this;
            }
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.value;
            if (data) {
                this.value = parseFloat(data);
            }
            data = this._HTMLElement.dataset.min;
            if (data) this.min = parseFloat(data);
            data = this._HTMLElement.dataset.max;
            if (data) this.max = parseFloat(data);
            data = this._HTMLElement.dataset.orientation;
            if (data) this.orientation = data;
            this._inherited();
            //this.addAnimation();
        },
        addAnimation: function () {
            var style = String.EMPTY;
            // ajout de la régle pour l'animation
            $j.CSS.removeCSSRule("#" + this._internalId + "_progress" + $j.types.pseudoCSSClass.AFTER);
            style = $j.browser.getVendorPrefix("animation") + "animation: 2s linear 0s normal none infinite " + this._internalId + "_indic;";
            $j.CSS.addCSSRule("#" + this._internalId + "_progress" + $j.types.pseudoCSSClass.AFTER, style);
            style = String.EMPTY;
            if (this.orientation === $j.types.orientations.HORIZONTAL) style = "0% { left: -100px; } 100% { left: " + (this._HTMLElement.offsetWidth * 4) + "px; }";
            if (this.orientation === $j.types.orientations.VERTICAL) style = "0% { bottom: -100px; } 100% { bottom: " + (this._HTMLElement.offsetHeight * 4) + "px; }";
            $j.CSS.removeCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes " + this._internalId + "_indic", $j.types.CSSRuleTypes.KEYFRAMES_RULE);
            if (style !== String.EMPTY) $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes " + this._internalId + "_indic", style);
        },
        destroy: function () {
            this._inherited();
            this._progress = null;
            this.value = null;
            this.min = null;
            this.max = null;
            this.orientation = null;
        }
        //#endregion
    });
    Object.seal(ProgressBar);
    //#endregion
    $j.classes.register($j.types.categories.COMMON, ProgressBar);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ProgressBarTpl = "<div id='{internalId}' data-name='{name}' data-class='ProgressBar' class='Control ProgressBar {theme} orientation-horizontal' data-value='0' data-orientation='horizontal' style='width:150px;height:17px;'>\
                        <div class='Control ProgressBarProgress {theme} orientation-horizontal' style='width: 72px;'><div class='{theme} ProgressBarIndic orientation-horizontal'></div></div>\
                        </div>";
        $j.classes.registerTemplates([{ Class: ProgressBar, template: ProgressBarTpl }]);
    }
    //endregion
})();