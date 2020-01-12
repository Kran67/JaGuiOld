(function () {
    $j.types.busyIndicatorStyles = {
        SPIN: "spin",
        WIN8CIRCLE: "win8Circle",
        BALL: "ball",
        CIRCLE: "circle"
    };
    Object.freeze($j.types.busyIndicatorStyles);
    //#region BusyIndicatorSpinOptions
    var BusyIndicatorSpinOptions = $j.classes.Bindable.extend("BusyIndicatorSpinOptions", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                // The number of lines to draw
                this.lines = 12;
                // The length of each line
                this.length = 7;
                // The line thickness
                this.width = 4;
                // Roundness (0..1)
                this.corners = 0;
                // 1: clockwise, -1: counterclockwise
                this.direction = 1;
                // Rounds per second
                this.speed = 1;
                // Afterglow percentage
                this.trail = 100;
            }
        },
        //#region Setters
        setLines: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 5 || newValue > 17) newValue = 12;
            if (this.lines !== newValue) {
                this.lines = newValue;
                this.propertyChanged("lines");
                this._owner.update();
            }
        },
        setLength: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0 || newValue > 40) newValue = 7;
            if (this.length !== newValue) {
                this.length = newValue;
                this.propertyChanged("length");
                this._owner.update();
            }
        },
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 2 || newValue > 30) newValue = 4;
            if (this.width !== newValue) {
                this.width = newValue;
                this.propertyChanged("width");
                this._owner.update();
            }
        },
        setCorners: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0 || newValue > 1) newValue = 0;
            if (this.corners !== newValue) {
                this.corners = newValue;
                this.propertyChanged("corners");
                this._owner.update();
            }
        },
        setDirection: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < -1 || newValue > 1) newValue = 1;
            if (this.direction !== newValue) {
                this.direction = newValue;
                this.propertyChanged("direction");
                this._owner.update();
            }
        },
        setSpeed: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0.5 || newValue > 2.2) newValue = 1;
            if (this.speed !== newValue) {
                this.speed = newValue;
                this.propertyChanged("speed");
                this._owner.update();
            }
        },
        setTrail: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 10 || newValue > 100) newValue = 100;
            if (this.trail !== newValue) {
                this.properties.trail = newValue;
                this.propertyChanged("trail");
                this._owner.update();
            }
        },
        //#endregion
        //#region Methods
        destroy: function () {
            this._inherited();
            this.lines = null;
            this.length = null;
            this.width = null;
            this.corners = null;
            this.direction = null;
            this.speed = null;
            this.trail = null;
        }
        //#endregion Methods
    });
    //#endregion BusyIndicatorSpinOptions
    //#region BusyIndicator
    var BusyIndicator = $j.classes.ThemedControl.extend("BusyIndicator", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                $j.tools.addPropertyFromSet(this, "indicatorStyle", $j.types.busyIndicatorStyles, $j.types.busyIndicatorStyles.SPIN);
                this.spinIndicatorOptions = new $j.classes.BusyIndicatorSpinOptions(this);
                delete this.tabOrder;
            }
        },
        //#region Setters
        setIndicatorStyle: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.busyIndicatorStyles)) return
            if (this.indicatorStyle !== newValue) {
                this.indicatorStyle = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            this.addAnimations();
        },
        addAnimations: function () {
            var cssProp, transform = $j.browser.getVendorPrefix("transform"), atf = $j.browser.getVendorPrefix("animation-timing-function");
            switch (this.indicatorStyle) {
                case $j.types.busyIndicatorStyles.WIN8CIRCLE:
                    if (!$j.CSS.isCSSRuleExist("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes orbit")) {
                        cssProp = ["0% { ", transform, "transform: rotate(225deg);opacity: 1;", atf, "animation-timing-function: ease-out; } ",
                                 "7% { ", transform, "transform: rotate(345deg);", atf, "animation-timing-function: linear; } ",
                                 "30% { ", transform, "transform: rotate(455deg);", atf, "animation-timing-function: ease-in-out; } ",
                                 "39% { ", transform, "transform: rotate(690deg);", atf, "animation-timing-function: linear; } ",
                                 "70% { ", transform, "transform: rotate(815deg);opacity: 1;", atf, "animation-timing-function: ease-out; } ",
                                 "75% { ", transform, "transform: rotate(945deg);", atf, "animation-timing-function: ease-out; } ",
                                 "76% { ", transform, "transform: rotate(945deg);opacity: 0; } ",
                                 "100% { ", transform, "transform: rotate(945deg);opacity: 0; } "].join(String.EMPTY);
                        $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes orbit", cssProp);
                    }
                    break;
                case $j.types.busyIndicatorStyles.BALL:
                    if (!$j.CSS.isCSSRuleExist("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes spinoff")) {
                        cssProp = "0% { " + transform + "transform: rotate(0deg); }";
                        cssProp += "100% { " + transform + "transform: rotate(360deg); }";
                        $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes spin", cssProp);
                        cssProp = "0% { " + transform + "transform: rotate(0deg); }";
                        cssProp += "100% { " + transform + "transform: rotate(-360deg); }";
                        $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes spinoff", cssProp);
                    }
                    break;
                case $j.types.busyIndicatorStyles.CIRCLE:
                    if (!$j.CSS.isCSSRuleExist("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes spinoffPulse")) {
                        cssProp += "50% { " + transform + "transform: rotate(145deg);opacity: 1; } ";
                        cssProp += "100% { " + transform + "transform: rotate(-320deg);opacity: 0; }; ";
                        $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes spinPulse", cssProp);
                        cssProp = "0% { " + transform + "transform: rotate(0deg); } ";
                        cssProp += "100% { " + transform + "transform: rotate(360deg); }; ";
                        $j.CSS.addCSSRule("@" + $j.browser.getVendorPrefix("keyframes") + "keyframes spinoffPulse", cssProp);
                    }
                    break;
            }
        },
        removeCssRules: function () {
            switch (this.indicatorStyle) {
                case $j.types.busyIndicatorStyles.SPIN:
                    break;
                case $j.types.busyIndicatorStyles.WIN8CIRCLE:
                    $j.CSS.removeCSSRule("#" + this._internalId + " ." + this.getThemeName() + ".win8circle" + $j.types.pseudoCSSClass.AFTER);
                    $j.CSS.removeCSSRule("#" + this._internalId + " .win8circle");
                    break;
                case $j.types.busyIndicatorStyles.BALL:
                    break;
                case $j.types.busyIndicatorStyles.CIRCLE:
                    break;
            }
        },
        update: function () {
            var child, child1, child2, cssRuleValues = String.EMPTY, i = 0, style = String.EMPTY, sio, name, start, z;
            if (!this._HTMLElement) return;
            this._HTMLElement.innerHTML = String.EMPTY;
            switch (this.indicatorStyle) {
                case $j.types.busyIndicatorStyles.SPIN:
                    // based on http://fgnass.github.io/spin.js/
                    sio = this.spinIndicatorOptions;
                    child = $j.doc.createElement($j.types.HTMLElements.DIV);
                    $j.CSS.addClass(child, "spinContainer");
                    for (; i < sio.lines; i++) {
                        child1 = $j.doc.createElement($j.types.HTMLElements.DIV);
                        style = "top:" + (1 + ~(sio.width / 2)) + $j.types.CSSUnits.PX + ";";
                        style += "opacity:0;";
                        child1.setAttribute("id", this._internalId + "_" + (i + 1));
                        start = 0.01 + i / sio.lines * 100;
                        z = $j.max(1 - 1 / sio.trail * (100 - start), 0);
                        style += $j.browser.getVendorPrefix("animation") + "animation:" + child1.id + ' ' + 1 / sio.speed + 's linear infinite';
                        $j.CSS.removeCSSRule('@' + $j.browser.getVendorPrefix("keyframes") + "keyframes " + child1.id);
                        $j.CSS.addCSSRule('@' + $j.browser.getVendorPrefix("keyframes") + "keyframes " + child1.id,
                          '0%{opacity:' + z + '}' +
                          start + '%{opacity:0}' +
                          (start + 0.01) + '%{opacity:1}' +
                          (start + sio.trail) % 100 + '%{opacity:0}' +
                          '100%{opacity:' + z + '}'
                        );
                        child1.setAttribute("style", style);
                        child1.jsObj = this;
                        $j.CSS.addClass(child1, "spinC");
                        child2 = $j.doc.createElement($j.types.HTMLElements.DIV);
                        style = "width:" + (sio.length + sio.width) + $j.types.CSSUnits.PX + ";";
                        style += "height:" + sio.width + $j.types.CSSUnits.PX + ";";
                        style += $j.browser.getVendorPrefix("transform-origin") + "transform-origin:left;";
                        style += $j.browser.getVendorPrefix("transform") + "transform:rotate(" + ~~(360 / sio.lines * i) + "deg) " + $j.browser.getVendorPrefix("translate") + "translate(" + sio.length + $j.types.CSSUnits.PX + ",0);";
                        style += "border-radius:" + (sio.corners * sio.width >> 1) + $j.types.CSSUnits.PX + ";";
                        child2.setAttribute("style", style);
                        $j.CSS.addClass(child2, "spinIndic" + String.SPACE + this.getThemeName());
                        child2.jsObj = this;
                        child1.appendChild(child2);
                        child.appendChild(child1);
                        this._HTMLElement.appendChild(child);
                    }
                    break;
                case $j.types.busyIndicatorStyles.WIN8CIRCLE:
                    // based on http://codepen.io/janrubio/pen/DusIE
                    $j.CSS.removeCSSRule("#" + this._internalId + " .win8circle" + $j.types.pseudoCSSClass.AFTER);
                    for (var i = 0; i < 5; i++) {
                        child = $j.doc.createElement($j.types.HTMLElements.DIV);
                        $j.CSS.addClass(child, "win8circle");
                        child.jsObj = this;
                        style = child.style;
                        switch (i) {
                            case 1:
                                style.mozAnimationDelay = "240ms";
                                style.oAnimationDelay = "240ms";
                                style.msAnimationDelay = "240ms";
                                style.webkitAnimationDelay = "240ms";
                                style.animationDelay = "240ms";
                                break;
                            case 2:
                                style.mozAnimationDelay = "480ms";
                                style.oAnimationDelay = "480ms";
                                style.msAnimationDelay = "480ms";
                                style.webkitAnimationDelay = "480ms";
                                style.animationDelay = "480ms";
                                break;
                            case 3:
                                style.mozAnimationDelay = "720ms";
                                style.oAnimationDelay = "720ms";
                                style.msAnimationDelay = "720ms";
                                style.webkitAnimationDelay = "720ms";
                                style.animationDelay = "720ms";
                                break;
                            case 4:
                                style.mozAnimationDelay = "960ms";
                                style.oAnimationDelay = "960ms";
                                style.msAnimationDelay = "960ms";
                                style.webkitAnimationDelay = "960ms";
                                style.animationDelay = "960ms";
                                break;
                        }
                        this._HTMLElement.appendChild(child);
                    }
                    break;
                case $j.types.busyIndicatorStyles.BALL:
                    // based on http://www.alessioatzeni.com/wp-content/tutorials/html-css/CSS3-loading-animation-loop/index.html
                    child = $j.doc.createElement($j.types.HTMLElements.DIV);
                    $j.CSS.addClass(child, "ballIndic" + String.SPACE + this.getThemeName());
                    child.jsObj = this;
                    this._HTMLElement.appendChild(child);
                    child = $j.doc.createElement($j.types.HTMLElements.DIV);
                    $j.CSS.addClass(child, "ball1Indic" + String.SPACE + this.getThemeName());
                    child.jsObj = this;
                    this._HTMLElement.appendChild(child);
                    break;
                case $j.types.busyIndicatorStyles.CIRCLE:
                    // based on http://www.alessioatzeni.com/wp-content/tutorials/html-css/CSS3-loading-animation-loop/index.html
                    child = $j.doc.createElement($j.types.HTMLElements.DIV);
                    $j.CSS.addClass(child, "circleIndic" + String.SPACE + this.getThemeName());
                    child.jsObj = this;
                    this._HTMLElement.appendChild(child);
                    child = $j.doc.createElement($j.types.HTMLElements.DIV);
                    $j.CSS.addClass(child, "circle1Indic" + String.SPACE + this.getThemeName());
                    child.jsObj = this;
                    this._HTMLElement.appendChild(child);
                    break;
            }
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.style;
            if (data) this.indicatorStyle = data;
            this.update();
            this._inherited();
        },
        destroy: function () {
            this._inherited();
            this.indicatorStyle = null;
            this.spinIndicatorOptions.destroy();
            this.spinIndicatorOptions = null;
        }
        //#endregion Methods
    });
    Object.seal(BusyIndicator);
    //#endregion BusyIndicator
    $j.classes.register($j.types.categories.INTERNAL, BusyIndicatorSpinOptions);
    $j.classes.register($j.types.categories.COMMON, BusyIndicator);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var BusyIndicatorTpl = "<div id='{internalId}' data-name='{name}' data-class='BusyIndicator' class='Control BusyIndicator {theme}' data-style='spin' style='width:50px;height:50px;'></div>";
        $j.classes.registerTemplates([{ Class: BusyIndicator, template: BusyIndicatorTpl }]);
    }
    //#endregion
})();