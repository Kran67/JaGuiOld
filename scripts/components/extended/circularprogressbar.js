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
                priv.value = props.hasOwnProperty("value")?props.value:0;
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
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                priv.svg = htmlElement.querySelector("svg");
                priv.svg.jsObj = this;
                const cirlces = priv.svg.querySelectorAll("circle");
                priv.backCircle = cirlces[0];
                priv.progress = priv.svg.lastElementChild;
            }
        }
        //#endregion getHTMLElement
        //#region update
        update(source) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement= this.HTMLElement;
            //#endregion Variables déclaration
            //super.update();
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
            const r = ~~priv.progress.getAttribute('r');
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

/*
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var CircularProgressBarTpl = "<div id='{internalId}' data-name='{name}' data-class='CircularProgressBar' class='Control CircularProgressBar {theme}' data-value='0' style='width:50px;height:50px;'>\
                                        <svg width='100%' height='100%'>\
                                            <defs></defs>\
                                            <circle class='Control CircularProgressBar_backborder' cx='50%' cy='50%' r='20' />\
                                            <circle class='Control CircularProgressBar_progress' cx='50%' cy='50%' r='20' />\
                                        </svg>\
                                      </div>";
        $j.classes.registerTemplates([{ Class: CircularProgressBar, template: CircularProgressBarTpl }]);
    }
    //#endregion
})();*/