//#region Import
import { Control } from "/scripts/components/control.js";
import { Tools } from "/scripts/core/tools.js";
import { NotifyEvent } from "/scripts/core/events.js";
import { Convert } from "/scripts/core/convert.js";
import { Text } from "/scripts/core/text.js";
//#endregion Import

//#region BatteryIndicator
const BatteryIndicator = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class BatteryIndicator
    class BatteryIndicator extends Control {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.showLegend = props.hasOwnProperty("showLegend")?props.showLegend:false;
                priv.showPercent = props.hasOwnProperty("showPercent")?props.showPercent:false;
                priv.battery = null;
                priv.baseWidth = 120;
                priv.baseHeight = 230;
                priv.baseFluidHeight = 190;
                priv.bib = null; // BatteryIndicatorBefore
                priv.bia = null; // BatteryIndicatorAfter
                priv.NiMH = null;
                priv.NiMHBefore = null;
                priv.PPole = null;
                priv.PPoleBefore = null;
                priv.PPoleAfter = null;
                this.onChargingChange = new NotifyEvent(this);
                this.onLevelChange = new NotifyEvent(this);
                this.onChargingTimeChange = new NotifyEvent(this);
                this.onDischargingTimeChange = new NotifyEvent(this);
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region showLegend
        get showLegend() {
            return internal(this).showLegend;
        }
        set showLegend(newValue) {
            const priv = internal(this);
            if (Tools.isBool(newValue)) {
                if (priv.showLegend !== newValue) {
                    priv.showLegend = newValue;
                    this.update();
                }
            }
        }
        //#endregion showLegend
        //#region showPercent
        get showPercent() {
            return internal(this).showPercent;
        }
        set showPercent(newValue) {
            const priv = internal(this);
            if (Tools.isBool(newValue)) {
                if (priv.showPercent !== newValue) {
                    priv.showPercent = newValue;
                    this.update();
                }
            }
        }
        //#endregion showPercent
        //#endregion Getters / Setters
        //#region Methods
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            let ctxt = this;
            if (this.obj) {
                ctxt = this.obj;
            }
            const htmlElement = ctxt.HTMLElement;
            const htmlElementStyle = ctxt.HTMLElementStyle;
            const bib = htmlElement.querySelector(".BatteryIndicatorBefore");
            const bia = htmlElement.querySelector(".BatteryIndicatorAfter");
            const NiMH = htmlElement.querySelector(".NiMH");
            const NiMHBefore = htmlElement.querySelector(".NiMHBefore");
            const PPole = htmlElement.querySelector(".PPole");
            const PPoleBefore = htmlElement.querySelector(".PPoleBefore");
            const PPoleAfter = htmlElement.querySelector(".PPoleAfter");
            const battery = ctxt.battery;
            const value = battery.level * 100;
            const PX = Types.CSSUNITS.PX;
            let text = String.EMPTY;
            let ratioW = 1;
            let ratioH = 1;
            //#endregion Variables déclaration

            if (this.width !== priv.baseWidth || this.height !== priv.baseHeight) {
                if (this.width !== priv.baseWidth) {
                    ratioW = this.width > priv.baseWidth ? priv.baseWidth / this.width: this.width / priv.baseWidth;
                }
                if (this.height !== priv.baseHeight) {
                    ratioH = this.height > priv.baseHeight ? priv.baseHeight / this.height: this.height / priv.baseHeight;
                }
            }

            if (battery.charging) {
                htmlElement.dataset.legend1 = "En charge";
                if (battery.chargingTime > 0 && battery.chargingTime !== Infinity) {
                    if (battery.charging) {
                        htmlElement.dataset.legend2 = `Temp de charge : ${Convert.sec2hrs(battery.chargingTime)}`;
                    }
                }
            } else if (battery.dischargingTime !== Infinity) {
                htmlElement.dataset.legend1 = `${Convert.sec2hrs(battery.dischargingTime)} restants`;
            }
            if (ctxt.showPercent) {
                htmlElement.dataset.percentvalue = `${(text.length>0?"\A":String.EMPTY)}${value}${Types.CSSUNITS.PO}`;
            }
            htmlElement.dataset.value = value;
            NiMH.classList.remove("empty", "warning", "alarm");
            NiMHBefore.classList.remove("empty", "warning", "alarm");

            if (value === 0) {
                NiMH.classList.add("empty");
                NiMHBefore.classList.add("empty");
            } else if (value > 0 && value <= 20) {
                NiMH.classList.add("alarm");
                NiMHBefore.classList.add("alarm");
            } else if (value > 20 && value <= 40) {
                NiMH.classList.add("warning");
                NiMHBefore.classList.add("warning");
            }
            htmlElementStyle.borderRadius = `${60 * ratioW}${PX}/${30 * ratioH}${PX}`;
            htmlElementStyle.fontSize = `${14 * (ratioW>ratioH?ratioW:ratioH)}pt`;
            bib.style.top = `${179 * ratioH}${PX}`;
            bib.style.height = `${46 * ratioH}${PX}`;
            bib.style.left = `${5 * ratioW}${PX}`;
            bib.style.right = `${5 * ratioW}${PX}`;
            bib.style.borderRadius = `${60 * ratioW}${PX}/${25 * ratioH}${PX}`;
            bia.style.right = `${40 * ratioW}${PX}`;
            bia.style.left = `${40 * ratioW}${PX}`;
            bia.style.top = `${1 * ratioH}${PX}`;
            bia.style.height = `${14 * ratioH}${PX}`;
            bia.style.borderRadius = `${60 * ratioW}${PX}/${25 * ratioH}${PX}`;
            NiMH.style.left = `${5 * ratioW}${PX}`;
            NiMH.style.right = `${5 * ratioW}${PX}`;
            NiMH.style.bottom = `${5 * ratioH}${PX}`;
            NiMH.style.paddingTop = `${30 * ratioH}${PX}`;
            NiMH.style.borderRadius = `${54 * ratioW}${PX}/${24 * ratioH}${PX}`;
            NiMHBefore.style.height = `${50 * ratioH}${PX}`;
            NiMHBefore.style.borderRadius = `${54 * ratioW}${PX}/${25 * ratioH}${PX}`;
            PPole.style.top = `${-1 * ratioH}${PX}`;
            PPole.style.height = `${57 * ratioH}${PX}`;
            PPole.style.borderRadius = `${60 * ratioW}${PX}/${30 * ratioH}${PX}`;
            PPoleBefore.style.left = `${9 * ratioW}${PX}`;
            PPoleBefore.style.right = `${9 * ratioW}${PX}`;
            PPoleBefore.style.top = `${7 * ratioH}${PX}`;
            PPoleBefore.style.height = `${41 * ratioH}${PX}`;
            PPoleBefore.style.borderRadius = `${55 * ratioW}${PX}/${24 * ratioH}${PX}`;
            PPoleAfter.style.right = `${37 * ratioW}${PX}`;
            PPoleAfter.style.left = `${37 * ratioW}${PX}`;
            PPoleAfter.style.top = `${1 * ratioH}${PX}`;
            PPoleAfter.style.height = `${30 * ratioH}${PX}`;
            PPoleAfter.style.borderRadius = `${60 * ratioW}${PX}/${27 * ratioH}${PX}`;
            NiMH.style.height = `${(priv.baseFluidHeight * battery.level) * ratioH}${PX}`;
        }
        loaded() {
            //#region Variables déclaration
            const ctxt = this;
            //#endregion Variables déclaration
            super.loaded();
            navigator.getBattery().then(battery => {
                battery.obj = ctxt;
                ctxt.battery = battery;
                battery.addEventListener('chargingchange', ctxt.update);
                battery.addEventListener('levelchange', ctxt.update);
                battery.addEventListener('chargingtimechange', ctxt.update);
                battery.addEventListener('dischargingtimechange', ctxt.update);
                ctxt.update();
            });
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.onChargingChange.destroy();
            this.onLevelChange.destroy();
            this.onChargingTimeChange.destroy();
            this.onDischargingTimeChange.destroy();
            this.onChargingChange = null;
            this.onLevelChange = null;
            this.onChargingTimeChange = null;
            this.onDischargingTimeChange = null;
            priv.showLegend = null;
            priv.showPercent = null;
            priv.battery = null;
            supper.destroy();
        }
        //#endregion Methods
    }
    return BatteryIndicator;
    //#endregion BatteryIndicator
})();
//#endregion BatteryIndicator
Core.classes.register(Types.CATEGORIES.COMMON, BatteryIndicator);
export { BatteryIndicator };

/*(function () {
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
})();*/