//#region Import
import { Control } from "/scripts/components/control.js";
import { Tools } from "/scripts/core/tools.js";
import { NotifyEvent } from "/scripts/core/events.js";
//#endregion Import
//#region PaintBox
const PaintBox = (() => {
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
    //#region Class PaintBox
    class PaintBox extends Control {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.ctx = null;
                delete this.tabOrder;
                priv.onPaint = new NotifyEvent(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region ctx
        get ctx() {
            return internal(this).ctx;
        }
        //#endregion ctx
        //#region width
        get width() {
            return super.width;
        }
        set width(newValue) {
            if (Tools.isNumber(newValue)) {
                if (this.width !== newValue) {
                    super.width = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.paint();
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
            if (Tools.isNumber(newValue)) {
                if (this.height !== newValue) {
                    super.height = newValue;
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.paint();
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
                priv.ctx = htmlElement.getContext("2d");
            }
        }
        //#endregion getHTMLElement
        //#region update
        update() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            //if (!this.form.loading && !this.form.creating) {
                htmlElement.setAttribute('width', htmlElement.offsetWidth);
                htmlElement.setAttribute('height', htmlElement.offsetHeight);
                this.paint();
            //}
        }
        //#endregion update
        //#region paint
        paint() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (htmlElement.offsetWidth !== 0 && htmlElement.offsetHeight !== 0) {
                if (!this.form.loading && !this.form.creating) {
                    if (this.isEnabled) {
                        if (Core.isHTMLRenderer) {
                            priv.ctx.clear();
                            this.onPaint.invoke();
                        }
                    }
                }
            }
        }
        //#endregion paint
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.ctx = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PaintBox;
    //#endregion PaintBox
})();
//#endregion CustomButton
Object.seal(PaintBox);
Core.classes.register(Types.CATEGORIES.COMMON, PaintBox);
export { PaintBox };

//#region Templates
if (Core.isHTMLRenderer) {
    const PaintBoxTpl = "<canvas id=\"{internalId}\" data-class=\"PaintBox\" class=\"Control PaintBox\"><properties>{ \"name\": \"{name}\", \"width\": 105, \"height\": 105 }</properties></canvas>";
    Core.classes.registerTemplates([{ Class: PaintBox, template: PaintBoxTpl }]);
}
//endregion