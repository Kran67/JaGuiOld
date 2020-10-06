//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
//#endregion Import
//#region FLOWLAYOUTS
/**
    * @type    {Object}        FLOWLAYOUTS
    */
const FLOWLAYOUTS = Object.freeze(Object.seal({
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
}));
//#endregion FLOWLAYOUTS
//#region Class FlowLayout
class FlowLayout extends Layout {
    //#region Private fields
    #hGap;
    #vGap;
    #layout;
    //#endregion Private fields
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
            this.#hGap = props.hasOwnProperty('hGap') ? props.hGap : 5;
            this.#vGap = props.hasOwnProperty('vGap') ? props.vGap : 5;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'layout',
                enumerable: !1,
                enum: FLOWLAYOUTS,
                value: props.hasOwnProperty('layout') ? props.layout : FLOWLAYOUTS.HORIZONTAL
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region hGap
    get hGap() {
        return this.#hGap;
    }
    set hGap(newValue) {
        if (core.tools.isNumber(newValue) && this.#hGap !== newValue) {
            this.#hGap = newValue;
            icore.isHTMLRenderer && this.update();
        }
    }
    //#endregion hGap
    //#region vGap
    get vGap() {
        return this.#vGap;
    }
    set vGap(newValue) {
        if (core.tools.isNumber(newValue) && this.#vGap !== newValue) {
            this.#vGap = newValue;
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion vGap
    //#endregion Getters / Setters
    //#region Methods
    //#region alignControls
    realignChilds() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (this.components.length > 0) {
            let x = this.#hGap;
            let y = this.#vGap;
            let maxTop = y;
            let maxLeft = x;
            this.components.forEach(obj => {
                const oHtmlElement = obj.HTMLElement;
                if (obj.visible) {
                    obj.beginUpdate();
                    if (this.#layout === FLOWLAYOUTS.HORIZONTAL) {
                        if (x + oHtmlElement.offsetWidth > htmlElement.offsetWidth) {
                            maxTop < y + oHtmlElement.offsetHeight && (maxTop = y + oHtmlElement.offsetHeight);
                            y = maxTop + this.#vGap;
                            x = this.#hGap;
                            maxTop = y;
                        }
                        obj.top = y;
                        obj.left = x;
                        x += oHtmlElement.offsetWidth + this.#hGap;
                        maxTop < y + oHtmlElement.offsetHeight && (maxTop = y + oHtmlElement.offsetHeight);
                    } else {
                        if (y + oHtmlElement.offsetHeight > htmlElement.offsetHeight) {
                            maxLeft < x + oHtmlElement.offsetWidth && (maxLeft = x + oHtmlElement.offsetWidth);
                            x = maxLeft + this.#hGap;
                            y = this.#vGap;
                            maxLeft = x;
                        }
                        obj.top = y;
                        obj.left = x;
                        y += oHtmlElement.offsetHeight + this.#vGap;
                        maxLeft < x + oHtmlElement.offsetWidth && (maxLeft = x + oHtmlElement.offsetWidth);
                    }
                    obj.endUpdate();
                }
            });
        }
    }
    //#endregion alignControls
    //#endregion Methods
}
Object.defineProperties(FlowLayout.prototype, {
    'hGap': {
        enumerable: !0
    },
    'vGap': {
        enumerable: !0
    }
});
Object.seal(FlowLayout);
core.classes.register(core.types.CATEGORIES.CONTAINERS, FlowLayout);
//#endregion FlowLayout
//#region Templates
if (core.isHTMLRenderer) {
    const FlowLayoutTpl = ['<jagui-flowlayout id="{internalId}" data-class="FlowLayout" class="Control FlowLayout">',
        '<properties>{ "name": "{name}" }</properties>'].join();
    core.classes.registerTemplates([{ Class: FlowLayout, template: FlowLayoutTpl }]);
}
//#endregion
export { FlowLayout };