//#region Import
import { Checkbox } from "/scripts/components/common/checkbox.js";
import { Tools } from "/scripts/core/tools.js";
import { Css } from "/scripts/core/css.js";
//#endregion Import
//#region Toggle
const Toggle = (() => {
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
    //#region Class Toggle
    class Toggle extends Checkbox {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                if (!Core.isHTMLRenderer) {
                    this.height = 21;
                    this.width = 50;
                }
                priv.uncheckedLabel = props.hasOwnProperty("uncheckedLabel") ? props.uncheckedLabel : "NO";
                priv.checkedLabel = props.hasOwnProperty("checkedLabel") ? props.checkedLabel : "YES";
                this.allowGrayed = false;
                this.autoWidth = false;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        get allowGrayed() {
            return super.allowGrayed;
        }
        set allowGrayed(newValue) {
            super.allowGrayed = false;
        }
        get uncheckedLabel() {
            //#region constructor
            const priv = internal(this);
            //#endregion constructor
            return priv.uncheckedLabel;
        }
        set uncheckedLabel(newValue) {
            //#region constructor
            const priv = internal(this);
            //#endregion constructor
            if (Tools.isString(newValue)) {
                if (priv.uncheckedLabel !== newValue) {
                    priv.uncheckedLabel = newValue;
                    this.update();
                }
            }
        }
        get checkedLabel() {
            //#region constructor
            const priv = internal(this);
            //#endregion constructor
            return priv.checkedLabel;
        }
        set checkedLabel(newValue) {
            if (Tools.isString(newValue)) {
                if (priv.checkedLabel !== newValue) {
                    priv.checkedLabel = newValue;
                    this.update();
                }
            }
        }
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region constructor
            const priv = internal(this);
            const PSEUDOCSSCLASS = Types.PSEUDOCSSCLASS;
            const htmlElement = this.HTMLElement;
            //#endregion constructor
            if (!this.loading && !this.form.loading) {
                super.update();
                if (this.check) {
                htmlElement.dataset.unchecked = priv.uncheckedLabel;
                htmlElement.dataset.checked = priv.checkedLabel;
                    Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`);
                    Css.removeCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`);
                    if (priv.checkedLabel.includes("data:image")) {
                        Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.BEFORE}`, `content: url(${priv.checkedLabel})`);
                    }
                    if (priv.uncheckedLabel.includes("data:image")) {
                        Css.addCSSRule(`#${this.internalId}${PSEUDOCSSCLASS.AFTER}`, `content: url(${this.uncheckedLabel})`);
                    }
                }
            }
        }
        //#endregion update
        //loaded() {
        //    super.l
        //}
        //#endregion Methods
    }
    return Toggle;
    //#endregion Toggle
})();
//#endregion Toggle
Object.seal(Toggle);
Core.classes.register(Types.CATEGORIES.EXTENDED, Toggle);
export { Toggle };

/*(function () {
    var Toggle = $j.classes.Checkbox.extend("Toggle", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                if (!$j.isHTMLRenderer()) {
                    this.height = 21;
                    this.width = 50;
                }
                this._uncheckedLabel = 'NO';
                this._checkedLabel = 'YES';
                this.allowGrayed = false;
            }
        },
        //#region Setters
        setAllowGrayed: function (newValue) {
            this.allowGrayed = false;
        },
        setUncheckedLabel: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this._uncheckedLabel !== newValue) {
                this._uncheckedLabel = newValue;
                this.update();
            }
        },
        setCheckedLabel: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this._checkedLabel !== newValue) {
                this._checkedLabel = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
            this._inherited();
            if (this._check) {
                this._HTMLElement.dataset.unchecked = this._uncheckedLabel;
                this._HTMLElement.dataset.checked = this._checkedLabel;
                $j.CSS.removeCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.BEFORE);
                $j.CSS.removeCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.AFTER);
                if (this._checkedLabel.contains("data:image")) $j.CSS.addCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.BEFORE, "content: url(" + this._checkedLabel + ")");
                if (this._uncheckedLabel.contains("data:image")) $j.CSS.addCSSRule("#" + this._internalId + $j.types.pseudoCSSClass.AFTER, "content: url(" + this._uncheckedLabel + ")");
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.unchecked;
            if (data) this._uncheckedLabel = data;
            data = this._HTMLElement.dataset.checked;
            if (data) this._checkedLabel = data;
        }
        //#endregion
    });
    Object.seal(Toggle);
    $j.classes.register($j.types.categories.EXTENDED, Toggle);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var ToggleTpl = "<div id='{internalId}' data-name='{name}' data-class='Toggle' class='Control Toggle {theme}' style='width:50px;height:21px;' data-unchecked='NO' data-checked='YES'>\
                         <input type='checkbox' class='Control CheckboxInput' />\
                         <div class='Control {theme} CheckboxCheck'></div>\
                         </div>";
        $j.classes.registerTemplates([{ Class: Toggle, template: ToggleTpl }]);
    }
    //#ednregion
})();*/