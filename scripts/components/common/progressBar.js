//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region ProgressBar
const ProgressBar = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class SplitButton
    class ProgressBar extends ThemedControl {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const orientations = core.types.ORIENTATIONS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                if (!core.isHTMLRenderer) {
                    !props.hasOwnProperty('height') && (props.height = 20);
                    !props.hasOwnProperty('width') && (props.width = 100);
                }
                props.hitTest = {
                    mouseDown: !1, mouseUp: !1
                };
                props.allowUpdateOnResize = !0;
                super(owner, props);
                const priv = internal(this);
                priv.progress = null;
                priv.value = props.hasOwnProperty('value') ? props.value : 0;
                priv.min = props.hasOwnProperty('min') ? props.min : 0;
                priv.max = props.hasOwnProperty('max') ? props.max : 100;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'orientation',
                    enum: orientations,
                    variable: priv,
                    value: props.hasOwnProperty('orientation') ? props.orientation : orientations.NONE
                });
                delete this.tabOrder;
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region orientation
        set orientation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && priv.orientation !== newValue) {
                priv.orientation = newValue;
                this.update();
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
            if (core.tools.isNumber(newValue) && newValue !== priv.value) {
                priv.value = newValue;
                priv.value = Math.max(Math.min(priv.value, priv.max), priv.min);
                if (!core.isHTMLRenderer) {
                    const lastRect = this.screenRect();
                    this.allowUpdate && this.update();
                    this.redraw(lastRect);
                } else {
                    this.update();
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
            if (core.tools.isNumber(newValue) && newValue !== priv.min) {
                priv.min = newValue;
                if (!core.isHTMLRenderer) {
                    this.allowUpdate && this.update();
                    this.redraw();
                } else {
                    this.update();
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
            if (core.tools.isNumber(newValue) && newValue !== priv.max) {
                priv.max = newValue;
                if (!core.isHTMLRenderer) {
                    this.allowUpdate && this.update();
                    this.redraw();
                } else {
                    this.update();
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
        //#endregion Getters / Setters
        //#region Methods
        //#region calculProgress
        calculProgress() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            let nv = 0;
            const margin = new Rect;
            const padding = this.padding;
            let borderTop = 0;
            let borderBottom = 0;
            //#endregion Variables déclaration
            if (!core.isHTMLRenderer) {
                //
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
            }
            nv = priv.orientation === core.types.ORIENTATIONS.HORIZONTAL
                ? htmlElement.offsetWidth - padding.left - padding.right - margin.left - margin.right
                : htmlElement.offsetHeight - padding.top - padding.bottom - margin.top - margin.bottom - borderTop - borderBottom;
            nv = ~~(((priv.value - priv.min) / (priv.max - priv.min)) * nv);
            return nv;
        }
        //#endregion calculProgress
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = core.types.CSSUNITS.PX;
            const progressStyle = this.HTMLElement.firstElementChild.style;
            //#endregion Variables déclaration
            if (priv.progress) {
                const wh = this.calculProgress();
                if (priv.orientation === core.types.ORIENTATIONS.HORIZONTAL) {
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
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const progressBarIndic = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
            //#endregion Variables déclaration
            priv.progress = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}progress`);
            priv.progress.classList.add('Control', 'ProgressBarProgress', this.themeName, `orientation-${priv.orientation}`);
            priv.progress.jsObj = this;
            progressBarIndic.classList.add('Control', this.themeName, 'ProgressBarIndic', `orientation-${priv.orientation}`);
            priv.progress.appendChild(progressBarIndic);
            this.HTMLElement.appendChild(priv.progress);
            super.loaded();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.progress = null;
            priv.value = null;
            priv.min = null;
            priv.max = null;
            priv.orientation = null;
            this.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    };
    return ProgressBar;
    //#endregion Class ProgressBar
})();
core.classes.register(core.types.CATEGORIES.COMMON, ProgressBar);
//#endregion ProgressBar
//#region Templates
if (core.isHTMLRenderer) {
    const ProgressBarTpl = ['<jagui-progressbar id="{internalId}" data-class="ProgressBar" class="Control ProgressBar {theme} orientation-horizontal">',
        '<properties>{ "name": "{name}", "value": 50, "orientation": "horizontal", "width": 100, "height": 17 }</properties>',
        '</jagui-progressbar>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ProgressBar, template: ProgressBarTpl }]);
}
//#endregion Templates
export { ProgressBar };