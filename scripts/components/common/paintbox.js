//#region Import
import { Control } from '/scripts/components/control.js';
//#endregion Import
//#region PaintBox
const PaintBox = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                props.allowUpdateOnResize = !0;
                super(owner, props);
                const priv = internal(this);
                priv.ctx = null;
                delete this.tabOrder;
                this.createEventsAndBind(['onPaint'], props);
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
            if (core.tools.isNumber(newValue) && this.width !== newValue) {
                super.width = newValue;
                core.isHTMLRenderer && !this.loading && !this.form.loading && this.paint();
            }
        }
        //#endregion width
        //#region height
        get height() {
            return super.height;
        }
        set height(newValue) {
            if (core.tools.isNumber(newValue) && this.height !== newValue) {
                super.height = newValue;
                core.isHTMLRenderer && !this.loading && !this.form.loading && his.paint();
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
            htmlElement && (priv.ctx = htmlElement.getContext('2d'));
        }
        //#endregion getHTMLElement
        //#region update
        update() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            //super.update();
            htmlElement.setAttribute('width', htmlElement.offsetWidth);
            htmlElement.setAttribute('height', htmlElement.offsetHeight);
            this.paint();
        }
        //#endregion update
        //#region paint
        paint() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (htmlElement.offsetWidth !== 0 && htmlElement.offsetHeight !== 0 && !this.form.loading
                & !this.form.creating && this.isEnabled && core.isHTMLRenderer) {
                priv.ctx.clear();
                this.onPaint.invoke();
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
            priv.ctx = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return PaintBox;
    //#endregion PaintBox
})();
Object.seal(PaintBox);
core.classes.register(core.types.CATEGORIES.COMMON, PaintBox);
//#endregion CustomButton
//#region Templates
if (core.isHTMLRenderer) {
    const PaintBoxTpl = ['<canvas id="{internalId}" data-class="PaintBox" class="Control PaintBox">',
        '<properties>{ "name": "{name}", "width": 105, "height": 105 }</properties></canvas>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PaintBox, template: PaintBoxTpl }]);
}
//#endregion
export { PaintBox };