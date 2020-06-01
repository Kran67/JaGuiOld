//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#endregion Import
//#region Class CircularProgressBar
class CircularProgressBar extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.hitTest = { mouseDown: !1, mouseUp: !1 };
            props.allowUpdateOnResize = !0;
            super(owner, props);
            core.private(this, {
                value : props.hasOwnProperty('value') ? props.value : 0,
                svg : null,
                backCircle : null,
                progress : null
            });
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region value
    get value() {
        return core.private(this).value;
    }
    set value(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && newValue !== priv.value) {
            priv.value = Math.max(Math.min(newValue, 100), 0);
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
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (priv.svg) {
            priv.backCircle.setAttribute('r', int(htmlElement.offsetWidth / 2) - 5);
            priv.progress.setAttribute('r', int(htmlElement.offsetWidth / 2) - 5);
            this.calcProgress();
        }
    }
    //#endregion update
    //#region calcProgress
    calcProgress() {
        //#region Variables déclaration
        const priv = core.private(this);
        const r = int(priv.progress.getAttribute('r'));
        const c = Math.PI * (r * 2);
        const pct = (100 - priv.value) / 100 * c;
        //#endregion Variables déclaration
        priv.progress.setAttribute('stroke-dasharray', c);
        priv.progress.style.strokeDashoffset = pct;
        this.HTMLElement.dataset.value = priv.value;
    }
    //#endregion calcProgress
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.svg = null;
        priv.backCircle = null;
        priv.progress = null;
        priv.value = null;
        super.destroy();
    }
    //#endregion destroy
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const SVG = core.types.SVG.SVG;
        const XMLNS = core.types.SVG.XMLNS;
        //#endregion Variables déclaration
        super.loaded();
        if (!htmlElement.querySelector(SVG)) {
            priv.svg = document.createElementNS(XMLNS, SVG);
            priv.svg.jsObj = this;
            priv.backCircle = document.createElementNS(XMLNS, 'circle');
            priv.backCircle.classList.add('Control', 'CircularProgressBar_back');
            priv.backCircle.setAttribute('cx', '50%');
            priv.backCircle.setAttribute('cy', '50%');
            priv.backCircle.setAttribute('r', '20');
            priv.progress = document.createElementNS(XMLNS, 'circle');
            priv.progress.classList.add('Control', 'CircularProgressBar_progress');
            priv.progress.setAttribute('cx', '50%');
            priv.progress.setAttribute('cy', '50%');
            priv.progress.setAttribute('r', '20');
            priv.progress.setAttribute('stroke-linecap', 'round');
            priv.svg.appendChild(priv.backCircle);
            priv.svg.appendChild(priv.progress);
            htmlElement.appendChild(priv.svg);
        }
        super.loaded();
        this.calcProgress();
    }
    //#endregion loaded
    //#endregion Methods
}
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