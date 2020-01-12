(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "clock");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/clock");
    //#region ClockModes
    $j.types.ClockModes = {
        NORMAL: "normal",
        FLIP: "flip",
        LED: "led",
        DOT: "dot"
    };
    //#endregion ClockModes
    //#region ClockTypes
    $j.types.ClockTypes = {
        CLOCK: "clock",
        COUNTDOWN: "countdown"
    };
    //#endregion ClockTypes
    var Clock = $j.classes.ThemedControl.extend("Clock", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._startTime = null;
                this._handle = null;
                this._started = false;
                this._paused = false;
                //#endregion
                this.mode = $j.types.ClockModes.NORMAL;
                this.type = $j.types.ClockTypes.CLOCK;
                this.showSeconds = true;
                this.showDays = false;
                this.showMonths = false;
                this.showYears = false;
                this.autoStart = true;
            }
        },
        //#region Setters
        setMode: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.ClockModes))) return;
            if (this.mode !== newValue) {
                this.mode = newValue;
                this.prepareContent();
                this.update();
            }
        },
        setType: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.ClockTypes))) return;
            if (this.type !== newValue) {
                this.reset();
                this.type = newValue;
                this.update();
            }
        },
        setShowSeconds: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showSeconds !== newValue) {
                this.showSeconds = newValue;
                this.update();
            }
        },
        setShowDays: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showDays !== newValue) {
                this.showDays = newValue;
                this.update();
            }
        },
        setShowMonths: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showMonths !== newValue) {
                this.showMonths = newValue;
                this.update();
            }
        },
        setShowYears: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showYears !== newValue) {
                this.showYears = newValue;
                this.update();
            }
        },
        setAutoStart: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.autoStart !== newValue) {
                this.autoStart = newValue;
            }
        },
        //#endregion
        //#region Methods
        prepareContent: function () {
            var _paused = this.pause, _started = this.started, div, sep;
            this.stop();
            this._HTMLElement.innerHTML = String.EMPTY;
            switch (this.mode) {
                case $j.types.ClockModes.NORMAL:
                    if (this.showDays) {

                    }
                    if (this.showMonths) {
                        if (this.showDays) {
                            // sep
                            sep = $j.doc.createElement($j.types.HTMLElements.DIV);
                            this._HTMLElement.appendChild(sep);
                        }
                    }
                    if (this.showYears) {
                        if (this.showMonths) {
                            // sep
                            sep = $j.doc.createElement($j.types.HTMLElements.SPAN);
                            this._HTMLElement.appendChild(sep);
                        }
                    }
                    // hours
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    // sep
                    sep = $j.doc.createElement($j.types.HTMLElements.SPAN);
                    sep.innerHTML = ':';
                    this._HTMLElement.appendChild(sep);
                    // minutes
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    div = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._HTMLElement.appendChild(div);
                    // seconds
                    if (this.showSeconds) {
                        // sep
                        sep = $j.doc.createElement($j.types.HTMLElements.SPAN);
                        sep.innerHTML = ':';
                        this._HTMLElement.appendChild(sep);
                        div = $j.doc.createElement($j.types.HTMLElements.DIV);
                        this._HTMLElement.appendChild(div);
                        div = $j.doc.createElement($j.types.HTMLElements.DIV);
                        this._HTMLElement.appendChild(div);
                    }
                    break;
                case $j.types.ClockModes.FLIP:
                    break;
                case $j.types.ClockModes.LED:
                    break;
                case $j.types.ClockModes.DOT:
                    break;
            }
            this._paused = _paused;
            this._started = _started;
            if (this._started) this.start();
        },
        loaded: function () {
            this._inherited();
            if (this.autoStart) {
                this.prepareContent();
                this.update();
                this.start();
            }
        },
        update: function () {
            if (this._paused) return;
            if (this._loading || this.form._loading) return;
        },
        start: function () {
            var clock = this;
            this._started = true;
            this._pause = false;
            this._handle = setInterval(this.update.bind(this), 1000);
        },
        pause: function () {
            this._paused = true;
        },
        stop: function () {
            this._started = false;
            this._pause = false;
            clearInterval(this._handle);
        },
        resume: function () {
            this._paused = false;
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            //if (this._textObj)) this.caption=this._textObj.innerHTML;
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-modalresult"):this._HTMLElement.dataset.modalresult;
            //if (data)) this.modalResult=data;
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-stayspressed"):this._HTMLElement.dataset.stayspressed;
            //if (data)) this.staysPressed=_conv.strToBool(data);
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-repeatclick"):this._HTMLElement.dataset.repeatclick;
            //if (data)) this.repeatClick=_conv.strToBool(data);
            //data=($j.browser.ie)?this._HTMLElement.getAttribute("data-action"):this._HTMLElement.dataset.action;
            //if (data)) this.action=data;
        },
        destroy: function () {
            this._inherited();
        }
        //#endregion
    });
    Object.seal(Clock);
    $j.classes.register($j.types.categories.COMMON, Clock);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ClockTpl = "<div id='{internalId}' data-class='Clock' data-name='{name}' class='Control Clock {theme}' data-theme='{theme}'></div>";
        $j.classes.registerTemplates([{ Class: Clock, template: ClockTpl }]);
    }
    //endregion
})();