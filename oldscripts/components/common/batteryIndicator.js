(function () {
    var BatteryIndicator = $j.classes.Control.extend("BatteryIndicator", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                delete this.tabOrder;
                this.showLegend = true;
                this.showPercent = true;
                this.onChargingChange = new $j.classes.NotifyEvent(this);
                this.onLevelChange = new $j.classes.NotifyEvent(this);
                this.onChargingTimeChange = new $j.classes.NotifyEvent(this);
                this.onDischargingTimeChange = new $j.classes.NotifyEvent(this);
                this._battery = null;
            }
        },
        //#region Setters
        setShowLegend: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showLegend !== newValue) {
                this.showLegend = newValue;
                this.update();
            }
        },
        setShowPercent: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showPercent !== newValue) {
                this.showPercent = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var legend = [], ctxt = this;
            if (this.obj) ctxt = this.obj;
            if (ctxt._battery.charging) {
                legend.push("En charge");
                if (ctxt._battery.chargingTime > 0 && ctxt._battery.chargingTime !== Infinity) {
                    if (ctxt._battery.charging) legend.push("Temp de charge : " + _conv.sec2hrs(ctxt._battery.chargingTime));
                }
            } else if (ctxt._battery.dischargingTime !== Infinity) legend.push(_conv.sec2hrs(ctxt._battery.dischargingTime) + " restants");
            if (ctxt.showLegend && !legend.isEmpty()) ctxt._HTMLElement.innerHTML = (legend.length > 1) ? legend.join("<br />") : legend.first();
            else ctxt._HTMLElement.innerHTML = String.EMPTY;
            ctxt._HTMLElement.dataset.value = ctxt._battery.level * 100;
            $j.CSS.removeClass(ctxt._HTMLElement, "showpercent");
            if (ctxt.showPercent) $j.CSS.addClass(ctxt._HTMLElement, "showpercent");
            $j.CSS.removeClass(ctxt._HTMLElement, "showpercent");
            if (ctxt._battery.charging) $j.CSS.addClass(ctxt._HTMLElement, "showpercent");
            $j.CSS.removeClass(ctxt._HTMLElement, "incharge");
            if (ctxt._battery.charging) {
                if (ctxt._battery.chargingTime !== Infinity) $j.CSS.addClass(ctxt._HTMLElement, "incharge");
            }
            $j.CSS.removeClass(ctxt._HTMLElement, "empty");
            $j.CSS.removeClass(ctxt._HTMLElement, "low");
            $j.CSS.removeClass(ctxt._HTMLElement, "medium");
            $j.CSS.removeClass(ctxt._HTMLElement, "full");
            if (ctxt._HTMLElement.dataset.value === 0) $j.CSS.addClass(ctxt._HTMLElement, "empty");
            if (ctxt._HTMLElement.dataset.value > 0 && ctxt._HTMLElement.dataset.value <= 20) $j.CSS.addClass(ctxt._HTMLElement, "low");
            else if (ctxt._HTMLElement.dataset.value > 20 && ctxt._HTMLElement.dataset.value <= 80) $j.CSS.addClass(ctxt._HTMLElement, "medium");
            else $j.CSS.addClass(ctxt._HTMLElement, "full");
        },
        loaded: function () {
            var ctxt = this;
            this._inherited();
            navigator.getBattery().then(function (battery) {
                battery.obj = ctxt;
                ctxt._battery = battery;
                battery.addEventListener('chargingchange', ctxt.update);
                battery.addEventListener('levelchange', ctxt.update);
                battery.addEventListener('chargingtimechange', ctxt.update);
                battery.addEventListener('dischargingtimechange', ctxt.update);
                ctxt.update();
            });
        },
        destroy: function () {
            this.onChargingChange.destroy();
            this.onLevelChange.destroy();
            this.onChargingTimeChange.destroy();
            this.onDischargingTimeChange.destroy();
            this.onChargingChange = null;
            this.onLevelChange = null;
            this.onChargingTimeChange = null;
            this.onDischargingTimeChange = null;
            this._battery = null;
            this._inherited();
        }
        //#endregion Methods
    });
    Object.seal(BatteryIndicator);
    //#endregion BusyIndicator
    $j.classes.register($j.types.categories.COMMON, BatteryIndicator);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var BatteryIndicatorTpl = "<div id='{internalId}' data-name='{name}' data-class='BatteryIndicator' class='Control BatteryIndicator {theme}' data-value='100' style='height:64px;'></div>";
        $j.classes.registerTemplates([{ Class: BatteryIndicator, template: BatteryIndicatorTpl }]);
    }
    //#endregion
})();