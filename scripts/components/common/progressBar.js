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
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.value) {
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
            if (Tools.isNumber(newValue)) {
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
            if (Tools.isNumber(newValue)) {
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
            super.height = newValue;
            //this.addAnimation();
            this.update();
        }
        //#endregion height
        //#endregion Getter / Setter
        //#region Methods
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
            const PX = Types.CSSUNITS.PX;
            const progressStyle = this.HTMLElement.firstElementChild.style;
            //#endregion Variables déclaration
            super.update();
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