//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region FLOWLAYOUTS
/**
    * @type    {Object}        FLOWLAYOUTS
    */
const FLOWLAYOUTS = Object.freeze({
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
});
//#endregion
//#region FlowLayout
const FlowLayout = (() => {
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
    //#region Class FlowLayout
    class FlowLayout extends Layout {
        //#region FLOWLAYOUTS
        /**
         * @type    {Object}        FLOWLAYOUTS
         */
        static get FLOWLAYOUTS() {
            return FLOWLAYOUTS;
        }
        //#endregion
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'layout',
                    enum: FLOWLAYOUTS,
                    variable: priv,
                    value: props.hasOwnProperty('layout') ? props.layout : FLOWLAYOUTS.HORIZONTAL
                });
                priv.hGap = props.hasOwnProperty('hGap') ? props.hGap : 5;
                priv.vGap = props.hasOwnProperty('vGap') ? props.vGap : 5;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region hGap
        get hGap() {
            return internal(this).hGap;
        }
        set hGap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.hGap !== newValue) {
                    priv.hGap = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion hGap
        //#region vGap
        get vGap() {
            return internal(this).vGap;
        }
        set vGap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.vGap !== newValue) {
                    priv.vGap = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion vGap
        //#endregion Getters / Setters
        //#region Methods
        //#region alignControls
        realignChilds() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (this.components.length > 0) {
                let x = priv.hGap;
                let y = priv.vGap;
                let maxTop = y;
                let maxLeft = x;
                this.components.forEach(obj => {
                    const oHtmlElement = obj.HTMLElement;
                    if (obj.visible) {
                        obj.beginUpdate();
                        if (priv.layout === FLOWLAYOUTS.HORIZONTAL) {
                            if (x + oHtmlElement.offsetWidth > htmlElement.offsetWidth) {
                                if (maxTop < y + oHtmlElement.offsetHeight) {
                                    maxTop = y + oHtmlElement.offsetHeight;
                                }
                                y = maxTop + priv.vGap;
                                x = priv.hGap;
                                maxTop = y;
                            }
                            obj.top = y;
                            obj.left = x;
                            x += oHtmlElement.offsetWidth + priv.hGap;
                            if (maxTop < y + oHtmlElement.offsetHeight) {
                                maxTop = y + oHtmlElement.offsetHeight;
                            }
                        } else {
                            if (y + oHtmlElement.offsetHeight > htmlElement.offsetHeight) {
                                if (maxLeft < x + oHtmlElement.offsetWidth) {
                                    maxLeft = x + oHtmlElement.offsetWidth;
                                }
                                x = maxLeft + priv.hGap;
                                y = priv.vGap;
                                maxLeft = x;
                            }
                            obj.top = y;
                            obj.left = x;
                            y += oHtmlElement.offsetHeight + priv.vGap;
                            if (maxLeft < x + oHtmlElement.offsetWidth) {
                                maxLeft = x + oHtmlElement.offsetWidth;
                            }
                        }
                        obj.endUpdate();
                    }
                });
            }
        }
        //#endregion alignControls
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.layout = null;
            priv.hGap = null;
            priv.vGap = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return FlowLayout;
    //#endregion FlowLayout
})();
//#endregion CustomButton
Object.seal(FlowLayout);
Core.classes.register(Types.CATEGORIES.CONTAINERS, FlowLayout);
export { FlowLayout };
//#region Templates
if (Core.isHTMLRenderer) {
    const FlowLayoutTpl = ['<jagui-flowlayout id="{internalId}" data-class="FlowLayout" class="Control FlowLayout">',
        '<properties>{ "name": "{name}" }</properties>'].join();
    Core.classes.registerTemplates([{ Class: FlowLayout, template: FlowLayoutTpl }]);
}
//#endregion