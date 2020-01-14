//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Rect } from "/scripts/core/geometry.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region ProgressBar
const ProgressBar = (() => {
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
    //#region Class SplitButton
    class ProgressBar extends ThemedControl {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const orientations = Types.ORIENTATIONS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.progress = null;
                if (!Core.isHTMLRenderer) {
                    this.height = props.hasOwnProperty("height")?props.height:20;
                    this.width = props.hasOwnProperty("width")?props.width:100;
                }
                priv.value = props.hasOwnProperty("value")?props.value:0;
                priv.min = props.hasOwnProperty("min")?props.min:0;
                priv.max = props.hasOwnProperty("max")?props.max:100;
                this.hitTest = false;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "orientation",
                    enum: orientations,
                    variable: priv,
                    value: props.hasOwnProperty("orientation")?props.orientation:orientations.NONE
                });
                delete this.tabOrder;
            }
        }
        //#endregion Constructor
        //#region Getter / Setter
        //#region orientation
        set orientation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.ORIENTATIONS)) {
                if (priv.orientation !== newValue) {
                    priv.orientation = newValue;
                    this.update();
                }
            }
        }
        //#endregion orientation
        //#region value
        get value() {
            return internal(this).value;
        }
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== this.value) {
                    priv.value = newValue;
                    if (priv.value > priv.max) {
                        priv.value = priv.max;
                    }
                    if (priv.value < priv.min) {
                        priv.value = priv.min;
                    }
                    if (!Core.isHTMLRenderer) {
                        const lastRect = this.screenRect();
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw(lastRect);
                    } else {
                        this.update();
                    }
                }
            }
        }
        //#endregion value
        //#region min
        get min() {
            return internal(this).min;
        }
        set min(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.min) {
                    priv.min = newValue;
                    if (!Core.isHTMLRenderer) {
                        if (this.allowUpdate) {
                            this.update();
                        }
                        this.redraw();
                    } else {
                        this.update();
                    }
                }
            }
        }
        //#endregion min
        //#region max
        get max() {
            return internal(this).max;
        }
        set max(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
            if (newValue !== priv.max) {
                priv.max = newValue;
                if (!Core.isHTMLRenderer) {
                    if (this.allowUpdate) {
                        this.update();
                    }
                    this.redraw();
                } else {
                    this.update();
                }
            }
            }
        }
        //#endregion max
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            //var style = String.EMPTY;
            super.width = newValue;
            //this.addAnimation();
            this.update();
        }
        //#endregion width
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            //var style = String.EMPTY;
            super.height = newValue;
            //this.addAnimation();
            this.update();
        }
        //#endregion height
        //#endregion Getter / Setter
        //#region Methods
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
            //this.addAnimation();
        }
        //#endregion loaded
        //#region calculProgress
        calculProgress() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            let nv = 0;
            const margin = new Rect;
            const padding = this.padding;
            let borderLeft = 0;
            let borderTop = 0;
            let borderRight = 0;
            let borderBottom = 0;
            //#endregion Variables déclaration
            if (!Core.isHTMLRenderer) {
                //style = this.getStyle(Types.STYLES.NORMAL, Types.styleObjects.MIDDLE);
                //margin = style.margin;
            } else {
                if (htmlElement) {
                    borderLeft = parseInt(getComputedStyle(htmlElement).borderLeftWidth, 10);
                    borderTop = parseInt(getComputedStyle(htmlElement).borderTopWidth, 10);
                    borderRight = parseInt(getComputedStyle(htmlElement).borderRightWidth, 10);
                    borderBottom = parseInt(getComputedStyle(htmlElement).borderBottomWidth, 10);
                }
                if (priv.progress) {
                    margin.left = parseInt(getComputedStyle(priv.progress).marginLeft, 10);
                    margin.top = parseInt(getComputedStyle(priv.progress).marginTop, 10);
                    margin.right = parseInt(getComputedStyle(priv.progress).marginRight, 10);
                    margin.bottom = parseInt(getComputedStyle(priv.progress).marginBottom, 10);
                }
                //style = this.localRect();
            }
            if (priv.orientation === Types.ORIENTATIONS.HORIZONTAL) {
                nv = htmlElement.offsetWidth - padding.left - padding.right - margin.left - margin.right;
            } else {
                nv = htmlElement.offsetHeight - padding.top - padding.bottom - margin.top - margin.bottom - borderTop - borderBottom;
            }
            nv = ~~(((priv.value - priv.min) / (priv.max - priv.min)) * nv);
            return nv;
        }
        //#endregion calculProgress
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //const htmlElementStyle = this.HTMLElementStyle;
            const PX = Types.CSSUNITS.PX;
            const progressStyle = this.HTMLElement.firstElementChild.style;
            //#endregion Variables déclaration
            if (priv.progress) {
                const wh = this.calculProgress();
                //style = this._progress.style;
                if (priv.orientation === Types.ORIENTATIONS.HORIZONTAL) {
                    if (priv.value === priv.max) {
                        progressStyle.right = 0;
                        progressStyle.width = String.EMPTY;
                    } else {
                        progressStyle.width = `${wh}${PX}`;
                        progressStyle.right = String.EMPTY;
                    }
                } else {
                    if (priv.value === priv.max) {
                        progressStyle.top = 0;
                        progressStyle.height = String.EMPTY;
                    } else {
                        progressStyle.height = `${wh}${PX}`;
                        progressStyle.top = String.EMPTY;
                    }
                }
            }
        }
        //#endregion update
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                priv.progress = htmlElement.querySelector(".ProgressBarProgress");
                priv.progress.jsObj = this;
            }
        }
        //#endregion getHTMLElement
        //#endregion Methods
    };
    return ProgressBar;
    //#endregion Class ProgressBar
})();
//#endregion
Core.classes.register(Types.CATEGORIES.COMMON, ProgressBar);
export { ProgressBar };

/*
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
*/