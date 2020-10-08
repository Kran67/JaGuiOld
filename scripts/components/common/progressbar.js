//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Import
//#region Class SplitButton
class ProgressBar extends ThemedControl {
    //#region Private fields
    #value;
    #min;
    #max;
    #orientation;
    #progress;
    //#endregion Private fields
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
            this.#value = props.hasOwnProperty('value') ? props.value : 0;
            this.#min = props.hasOwnProperty('min') ? props.min : 0;
            this.#max = props.hasOwnProperty('max') ? props.max : 100;
            this.addPropertyEnum('orientation', orientations);
            this.#orientation = props.hasOwnProperty('orientation') ? props.orientation : orientations.NONE;
            delete this.tabOrder;
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region orientation
    get orientation() {
        return this.#orientation;
    }
    set orientation(newValue) {
        if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && this.#orientation !== newValue) {
            this.#orientation = newValue;
            this.update();
        }
    }
    //#endregion orientation
    //#region value
    get value() {
        return this.#value;
    }
    set value(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#value) {
            this.#value = newValue;
            this.#value = Math.max(Math.min(this.#value, this.#max), this.#min);
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
        return this.#min;
    }
    set min(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#min) {
            this.#min = newValue;
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
        return this.#max;
    }
    set max(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#max) {
            this.#max = newValue;
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
                borderTop = parseInt(getComputedStyle(htmlElement).borderTopWidth, 10);
                borderBottom = parseInt(getComputedStyle(htmlElement).borderBottomWidth, 10);
            }
            if (this.#progress) {
                margin.left = parseInt(getComputedStyle(this.#progress).marginLeft, 10);
                margin.top = parseInt(getComputedStyle(this.#progress).marginTop, 10);
                margin.right = parseInt(getComputedStyle(this.#progress).marginRight, 10);
                margin.bottom = parseInt(getComputedStyle(this.#progress).marginBottom, 10);
            }
        }
        nv = this.#orientation === core.types.ORIENTATIONS.HORIZONTAL
            ? htmlElement.offsetWidth - padding.left - padding.right - margin.left - margin.right
            : htmlElement.offsetHeight - padding.top - padding.bottom - margin.top - margin.bottom - borderTop - borderBottom;
        nv = int(((this.#value - this.#min) / (this.#max - this.#min)) * nv);
        return nv;
    }
    //#endregion calculProgress
    //#region update
    update() {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const progressStyle = this.HTMLElement.firstElementChild.style;
        //#endregion Variables déclaration
        if (this.#progress) {
            const wh = this.calculProgress();
            if (this.#orientation === core.types.ORIENTATIONS.HORIZONTAL) {
                if (this.#value === this.#max) {
                    progressStyle.right = 0;
                    progressStyle.width = String.EMPTY;
                } else {
                    progressStyle.width = `${wh}${PX}`;
                    progressStyle.right = String.EMPTY;
                }
            } else {
                if (this.#value === this.#max) {
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
        const progressBarIndic = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}indicator`);
        //#endregion Variables déclaration
        this.#progress = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}progress`);
        this.#progress.classList.add('Control', 'ProgressBarProgress', this.themeName, `orientation-${this.#orientation}`);
        this.#progress.jsObj = this;
        progressBarIndic.classList.add('Control', this.themeName, 'ProgressBarIndic', `orientation-${this.#orientation}`);
        this.#progress.appendChild(progressBarIndic);
        this.HTMLElement.appendChild(this.#progress);
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
};
Object.defineProperties(ProgressBar.prototype, {
    'value': {
        enumerable: !0
    },
    'min': {
        enumerable: !0
    },
    'max': {
        enumerable: !0
    }
});
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