//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Import
//#region Class CircularProgressBar
class CircularProgressBar extends ThemedControl {
    //#region Private fields
    #value;
    #svg;
    #backCircle;
    #progress;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.hitTest = { mouseDown: !1, mouseUp: !1 };
            props.allowUpdateOnResize = !0;
            super(owner, props);
            this.#value = props.hasOwnProperty('value') ? props.value : 0;
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region value
    get value() {
        return this.#value;
    }
    set value(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#value) {
            this.#value = Math.max(Math.min(newValue, 100), 0);
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
    //#region width
    get width() {
        return super.width;
    }
    set width(newValue) {
        //#region Variables déclaration
        const currentHeight = this.height;
        const currentWidth = this.width;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && currentWidth !== newValue && core.isHTMLRenderer && !this.loading) {
            super.width = newValue;
            currentHeight !== newValue && (this.height = newValue);
        }
    }
    //#endregion width
    //#region height
    get height() {
        return super.height;
    }
    set height(newValue) {
        //#region Variables déclaration
        const currentHeight = this.height;
        const currentWidth = this.width;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && currentHeight !== newValue && core.isHTMLRenderer && !this.loading) {
            super.height = newValue;
            currentWidth !== newValue && (this.width = newValue);
        }
    }
    //#endregion height
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update(source) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (this.#svg) {
            this.#backCircle.setAttribute('r', int(htmlElement.offsetWidth / 2) - 5);
            this.#progress.setAttribute('r', int(htmlElement.offsetWidth / 2) - 5);
            this.calcProgress();
        }
    }
    //#endregion update
    //#region calcProgress
    calcProgress() {
        //#region Variables déclaration
        const r = int(this.#progress.getAttribute('r'));
        const c = Math.PI * (r * 2);
        const pct = (100 - this.#value) / 100 * c;
        //#endregion Variables déclaration
        this.#progress.setAttribute('stroke-dasharray', c);
        this.#progress.style.strokeDashoffset = pct;
        this.HTMLElement.dataset.value = this.#value;
    }
    //#endregion calcProgress
    //#region destroy
    destroy() {
        this.#svg = null;
        this.#backCircle = null;
        this.#progress = null;
        this.#value = null;
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const SVG = core.types.SVG.SVG;
        const XMLNS = core.types.SVG.XMLNS;
        //#endregion Variables déclaration
        super.loaded();
        if (!htmlElement.querySelector(SVG)) {
            this.#svg = document.createElementNS(XMLNS, SVG);
            this.#svg.jsObj = this;
            this.#backCircle = document.createElementNS(XMLNS, 'circle');
            this.#backCircle.classList.add('Control', 'CircularProgressBar_back');
            this.#backCircle.setAttribute('cx', '50%');
            this.#backCircle.setAttribute('cy', '50%');
            this.#backCircle.setAttribute('r', '20');
            this.#progress = document.createElementNS(XMLNS, 'circle');
            this.#progress.classList.add('Control', 'CircularProgressBar_progress');
            this.#progress.setAttribute('cx', '50%');
            this.#progress.setAttribute('cy', '50%');
            this.#progress.setAttribute('r', '20');
            this.#progress.setAttribute('stroke-linecap', 'round');
            this.#svg.appendChild(this.#backCircle);
            this.#svg.appendChild(this.#progress);
            htmlElement.appendChild(this.#svg);
        }
        super.loaded();
        this.calcProgress();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(CircularProgressBar.prototype, {
    'value': {
        enumerable: !0
    }
});
Object.seal(CircularProgressBar);
core.classes.register(core.types.CATEGORIES.EXTENDED, CircularProgressBar);
//#endregion CircularProgressBar
//#region Templates
if (core.isHTMLRenderer) {
    const CircularProgressBarTpl = ['<jagui-circularprogressbar id="{internalId}" data-class="CircularProgressBar" ',
        'class="Control CircularProgressBar {theme} csr_default"><properties>{ "name": "{name}" }</properties>',
        '</jagui-circularprogressbar>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: CircularProgressBar, template: CircularProgressBarTpl }]);
}
//#endregion
export { CircularProgressBar };