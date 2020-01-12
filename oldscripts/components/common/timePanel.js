(function () {
    //#region TimePanel
    var TimePanel = $j.classes.ThemedControl.extend("TimePanel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._hours = $j.classes.createComponent($j.classes.NumberWheel, this, null, { _inForm: false, cssClasses: "TimePanel_Hours" }, false);
                this._hours.max = 23;
                this._hours.canFocused = false;
                this._hours.onChange.addListener(this.change);
                this._minutes = $j.classes.createComponent($j.classes.NumberWheel, this, null, { _inForm: false, cssClasses: "TimePanel_Minutes" }, false);
                this._minutes.max = 59;
                this._minutes.canFocused = false;
                this._minutes.onChange.addListener(this.change);
                this._seconds = $j.classes.createComponent($j.classes.NumberWheel, this, null, { _inForm: false, cssClasses: "TimePanel_Seconds" }, false);
                this._seconds.max = 59;
                this._seconds.canFocused = false;
                this._seconds.onChange.addListener(this.change);
                this._meridiem = $j.classes.createComponent($j.classes.ItemsWheel, this, null, { _inForm: false, cssClasses: "TimePanel_Meridiem" }, false);
                this._meridiem.items.push("AM");
                this._meridiem.items.push("PM");
                this._meridiem.canFocused = false;
                this._meridiem.onChange.addListener(this.change);
                this._currentItemWheel = null;
                //#endregion
                this.time = String.EMPTY;
                this.use24H = true;
                this.viewSeconds = false;
                this.onChange = new $j.classes.NotifyEvent(this);
                this.canFocused = true;
            }
        },
        //#region Setters
        setTime: function (newValue) {
            var timeParts;
            if (typeof newValue !== _const.STRING) return;
            if (this.time !== newValue) {
                this.time = newValue;
                timeParts = this.time.split(String.SPACE);
                timeParts[0] = timeParts[0].split(":");
                this._hours.setIndex(this._hours.items.indexOf(timeParts[0].first()));
                this._minutes.setIndex(this._minutes.items.indexOf(timeParts[0][1]));
                if (timeParts[0].length > 2) this._seconds.setIndex(this._seconds.items.indexOf(timeParts[0].last()));
                if (timeParts.length > 1) this._meridiem.setIndex(this._meridiem.items.indexOf(timeParts.last()));
            }
        },
        setUse24H: function (newValue) {
            var max = 24, str;
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.use24H !== newValue) {
                this.use24H = newValue;
                if (!this.use24H) max = 12;
                this._hours.items.clear();
                this._hours.setMax(max);
                this.update();
            }
        },
        setViewSeconds: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.viewSeconds !== newValue) {
                this.viewSeconds = newValue;
                this.update();
            }
        },
        setIsFocused: function (newValue) {
            this._inherited(newValue);
            if (!this._currentItemWheel) {
                this._currentItemWheel = this._hours;
                //this._hours.setIsFocused(newValue);
            }
            if (this._isFocused) $j.CSS.addClass(this._currentItemWheel._HTMLElement, "focused");
            else $j.CSS.removeClass(this._currentItemWheel._HTMLElement, "focused");
        },
        //#endregion
        //#region Methods
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{hours}");
            html = a.join(this._hours.getTemplate());
            a = html.split("{minutes}");
            html = a.join(this._minutes.getTemplate());
            a = html.split("{seconds}");
            html = a.join(this._seconds.getTemplate());
            a = html.split("{meridiem}");
            html = a.join(this._meridiem.getTemplate());
            return html;
        },
        getChildsHTMLElement: function () {
            var min, sec, mer;
            this._hours.getHTMLElement(this._HTMLElement.firstElementChild.id);
            this._minutes.getHTMLElement(this._HTMLElement.querySelector(".TimePanel_Minutes").id);
            this._seconds.getHTMLElement(this._HTMLElement.querySelector(".TimePanel_Seconds").id);
            this._meridiem.getHTMLElement(this._HTMLElement.lastElementChild.id);
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.use24h;
            if (data) this.use24H = _conv.strToBool(data);
            data = this._HTMLElement.dataset.viewseconds;
            if (data) this.viewSeconds = _conv.strToBool();
            data = this._HTMLElement.dataset.time;
            if (data) this.time = data;
            this._inherited();
            this._seconds.setVisible(this.viewSeconds);
            this._meridiem.setVisible(!this.use24H);
            this._seconds.setDisplay(this.viewSeconds ? $j.types.displays.BLOCK : $j.types.displays.NONE);
            this._meridiem.setDisplay(!this.use24H ? $j.types.displays.BLOCK : $j.types.displays.NONE);
        },
        update: function () {
            if (this._HTMLElement) {
                this._HTMLElement.dataset.use24h = this.use24H;
                this._HTMLElement.dataset.viewseconds = this.viewSeconds;
            }
        },
        change: function () {
            var hr, mi, se, me, val;
            hr = this._owner._hours.value;
            mi = this._owner._minutes.value;
            se = this._owner._seconds.value;
            me = this._owner._meridiem.value;
            val = hr + ":" + mi;
            if (this._owner.viewSeconds) val += ":" + se;
            if (!this._owner.use24H) {
                if (me !== String.EMPTY) val += String.SPACE + me;
            }
            this._owner.time = val;
            if (!this._owner._updating) this._owner.onChange.invoke();
        },
        loaded: function () {
            var oldVal = this.time;
            this._inherited();
            if (this.time !== String.EMPTY) {
                this.time = String.EMPTY;
                this.setTime(oldVal);
            }
        },
        destroy: function () {
            this._inherited();
            this._hours = null;
            this._minutes = null;
            this._seconds = null;
            this._meridiem = null;
            this.time = null;
            this.use24H = null;
            this.viewSeconds = null;
            this.onChange.destroy();
            this.onChange = null;
            this._currentItemWheel = null;
        },
        keyDown: function () {
            this._inherited();
            if (this._currentItemWheel) this._currentItemWheel.keyDown();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                    $j.CSS.removeClass(this._currentItemWheel._HTMLElement, "focused");
                    if (this._currentItemWheel === this._minutes) {
                        this._currentItemWheel = this._hours;
                    } else if (this._currentItemWheel === this._seconds) {
                        this._currentItemWheel = this._minutes;
                    } else if (this._currentItemWheel === this._meridiem) {
                        if (this.viewSeconds) this._currentItemWheel = this._seconds;
                        else this._currentItemWheel = this._minutes;
                    }
                    $j.CSS.addClass(this._currentItemWheel._HTMLElement, "focused");
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                    $j.CSS.removeClass(this._currentItemWheel._HTMLElement, "focused");
                    if (this._currentItemWheel === this._hours) {
                        this._currentItemWheel = this._minutes;
                    } else if (this._currentItemWheel === this._minutes) {
                        if (this.viewSeconds) this._currentItemWheel = this._seconds;
                        else if (!this.use24H) this._currentItemWheel = this._meridiem;
                    } else if (this._currentItemWheel === this._seconds) {
                        if (!this.use24H) this._currentItemWheel = this._meridiem;
                    }
                    $j.CSS.addClass(this._currentItemWheel._HTMLElement, "focused");
                    break;
            }
        }
        //#endregion
    });
    $j.classes.register($j.types.categories.COMMON, TimePanel);
    //#endregion
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var TimePanelTpl = "<div id='{internalId}' data-name='{name}' data-class='TimePanel' class='Control TimePanel {theme}' data-use24h='false' data-viewseconds='false' data-time='00:00 AM'>\
                      {hours}\
                      {minutes}\
                      {seconds}\
                      {meridiem}\
                      </div>";
        $j.classes.registerTemplates([{ Class: TimePanel, template: TimePanelTpl }]);
    }
    //#endregion
})();