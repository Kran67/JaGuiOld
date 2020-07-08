/*(function () {
    //#region Timer
    var Timer = $j.classes.Component.extend("Timer", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._handle = null;
                //#endregion
                this.onTimer = new $j.classes.NotifyEvent(this);
                this.enabled = false;
                this.interval = 1000;
            }
        },
        //#region Methods
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this.enabled = newValue;
                if (this.enabled) this.startTimer();
                else this.stopTimer();
            }
        },
        setInterval: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.interval !== newValue) {
                this.stopTimer();
                this.interval = newValue;
                if (this.interval < 0) this.interval = 0;
                this.startTimer();
            }
        },
        startTimer: function () {
            if (!this._handle) this._handle = setInterval(this._onTimer.bind(this), this.interval);
        },
        stopTimer: function () {
            clearInterval(this._handle);
            this._handle = null;
            this.enabled = false;
        },
        _onTimer: function () {
            if (!this.enabled) return;
            this.onTimer.invoke();
        },
        loaded: function () {
            $j.classes.Component.prototype.loaded.apply(this, []);
            if (this.enabled) this.startTimer();
        },
        destroy: function () {
            this.stopTimer();
            this._inherited();
            this.onTimer.destroy();
            this.onTimer = null;
            this.enabled = null;
            this.interval = null;
        }
        //#endregion
    });
    //#endregion
    Object.seal(Timer);
    $j.classes.register($j.types.categories.NONVISUAL, Timer);
    //#region ConstantTimer
    var ConstantTimer = $j.classes.Component.extend("ConstantTimer", {
        init: function (owner, props) {
            this.enabled = false;
            if (owner) {
                this._inherited(owner, props);
                this.onTimer = new $j.classes.NotifyEvent(this);
                this.setEnabled = function (newValue) {
                    if (typeof newValue !== _const.BOOLEAN) return;
                    if (newValue !== this.enabled) this.enabled = newValue;
                    if (this.enabled) $j.looper.addListener(this, "_onTimer");
                    else $j.renderer.removeListener(this);
                };
            }
        },
        //#region Methods
        _onTimer: function () {
            if (!this.enabled) return;
            this.onTimer.invoke();
        }
        //#endregion
    });
    //#endregion
    Object.seal(ConstantTimer);
    $j.classes.register($j.types.categories.NONVISUAL, ConstantTimer);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var TimerTpl = "<div id='{internalId}' data-name='{name}' data-class='Timer' class='Control ShortCutIcon'>\
                  <div class='Control ShortCutIconImg timer'></div>\
                  <div class='Control ShortCutIconCaption'>{name}</div>\
                  </div>",
            ConstantTimerTpl = "<div id='{internalId}' data-name='{name}' data-class='ConstantTimer' class='Control ShortCutIcon'>\
                          <div class='Control ShortCutIconImg constanttimer'></div>\
                          <div class='Control ShortCutIconCaption'>{name}</div>\
                          </div>";
        $j.classes.registerTemplates([{ Class: Timer, template: TimerTpl }, { Class: ConstantTimer, template: ConstantTimerTpl }]);
    }
    //#endregion
})();*/