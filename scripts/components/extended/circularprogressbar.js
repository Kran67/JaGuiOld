//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region CircularProgressBar
const CircularProgressBar = (() => {
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
    //#region Class CircularProgressBar
    class CircularProgressBar extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.value = props.hasOwnProperty("value") ? props.value : 0;
                this.hitTest.all = false;
                priv.svg = null;
                priv.backCircle = null;
                priv.progress = null;
                delete this.tabOrder;
                this.allowUpdateOnResize = true;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
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
                    if (priv.value > 100) {
                        priv.value = 100;
                    }
                    if (priv.value < 0) {
                        priv.value = 0;
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
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            //#region Variables déclaration
            const currentHeight = this.height;
            const currentWidth = this.width;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (currentWidth !== newValue) {
                    if (Core.isHTMLRenderer && !this.loading) {
                        super.width = newValue;
                        if (currentHeight !== newValue) {
                            this.height = newValue;
                        }
                    }
                }
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
            if (Tools.isNumber(newValue)) {
                if (currentHeight !== newValue) {
                    if (Core.isHTMLRenderer && !this.loading) {
                        super.height = newValue;
                        if (currentWidth !== newValue) {
                            this.width = newValue;
                        }
                    }
                }
            }
        }
        //#endregion height
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update(source) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (priv.svg) {
                priv.backCircle.setAttribute("r", ~~(htmlElement.offsetWidth / 2) - 5);
                priv.progress.setAttribute("r", ~~(htmlElement.offsetWidth / 2) - 5);
                this.calcProgress();
            }
        }
        //#endregion update
        //#region calcProgress
        calcProgress() {
            //#region Variables déclaration
            const priv = internal(this);
            const r = ~~priv.progress.getAttribute("r");
            const c = Math.PI * (r * 2);
            const pct = (100 - priv.value) / 100 * c;
            //#endregion Variables déclaration
            priv.progress.setAttribute("stroke-dasharray", c);
            priv.progress.style.strokeDashoffset = pct;
            this.HTMLElement.dataset.value = priv.value;
        }
        //#endregion calcProgress
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.svg = null;
            priv.backCircle = null;
            priv.progress = null;
            super.destroy();
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const SVG = Types.SVG.SVG;
            const XMLNS = Types.SVG.XMLNS;
            //#endregion Variables déclaration
            super.loaded();
            if (!htmlElement.querySelector(SVG)) {
                priv.svg = document.createElementNS(XMLNS, SVG);
                priv.svg.jsObj = this;
                priv.backCircle = document.createElementNS(XMLNS, Types.SHAPES.CIRCLE);
                priv.backCircle.classList.add("Control", "CircularProgressBar_back");
                priv.backCircle.setAttribute("cx", "50%");
                priv.backCircle.setAttribute("cy", "50%");
                priv.backCircle.setAttribute("r", "20");
                priv.progress = document.createElementNS(XMLNS, Types.SHAPES.CIRCLE);
                priv.progress.classList.add("Control", "CircularProgressBar_progress");
                priv.progress.setAttribute("cx", "50%");
                priv.progress.setAttribute("cy", "50%");
                priv.progress.setAttribute("r", "20");
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
    return CircularProgressBar;
    //#endregion CircularProgressBar
})();
//#endregion CircularProgressBar
Object.seal(CircularProgressBar);
Core.classes.register(Types.CATEGORIES.EXTENDED, CircularProgressBar);
export { CircularProgressBar };
//#region Templates
if (Core.isHTMLRenderer) {
    const CircularProgressBarTpl = ["<jagui-circularprogressbar id=\"{internalId}\" data-class=\"CircularProgressBar\" class=\"Control CircularProgressBar {theme} csr_default\"><properties>{ \"name\": \"{name}\" }</properties></jagui-circularprogressbar>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: CircularProgressBar, template: CircularProgressBarTpl }]);
}
//#endregion