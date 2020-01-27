//#region Import
import { Layout } from "/scripts/components/containers/layout.js";
import { Keyboard } from "/scripts/core/keyboard.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region FLOWLAYOUTS
/**
    * @type    {Object}        FLOWLAYOUTS
    */
const FLOWLAYOUTS = Object.freeze({
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
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
                    propName: "layout",
                    enum: FLOWLAYOUTS,
                    variable: priv,
                    value: props.hasOwnProperty("layout") ? props.layout : FLOWLAYOUTS.HORIZONTAL
                });
                priv.hGap = props.hasOwnProperty("hGap") ? props.hGap : 5;
                priv.vGap = props.hasOwnProperty("vGap") ? props.vGap : 5;
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
        alignControls() {
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
        loaded() {
            super.loaded();
            this.alignControls();
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.layout = null;
            priv.hGap = null;
            priv.vGap = null;
        }
        //#endregion Methods
    }
    return FlowLayout;
    //#endregion FlowLayout
})();
//#endregion CustomButton
Core.classes.register(Types.CATEGORIES.CONTAINERS, FlowLayout);
export { FlowLayout };
/*(function () {
    var FlowLayout = $j.classes.Layout.extend("FlowLayout", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //this.layout=$j.types.FlowLayouts.HORIZONTAL;
                $j.tools.addPropertyFromSet(this, "layout", $j.types.FlowLayouts, $j.types.FlowLayouts.HORIZONTAL);
                this.hGap = 5;
                this.vGap = 5;
            }
        },
        //#region Methods
        alignControls: function () {
            var i = 0, l, obj, x = this.hGap, y = this.vGap, maxTop = y, maxLeft = x;
            if (this._components.length === 0) return;
            l = this._components.length;
            for (; i < l; i++) {
                obj = this._components[i];
                if (obj.visible) {
                    obj.beginUpdate();
                    if (this.layout === $j.types.FlowLayouts.HORIZONTAL) {
                        if (x + obj._HTMLElement.offsetWidth > this._HTMLElement.offsetWidth) {
                            if (maxTop < y + obj._HTMLElement.offsetHeight) maxTop = y + obj._HTMLElement.offsetHeight;
                            y = maxTop + this.vGap;
                            x = this.hGap;
                            maxTop = y;
                        }
                        obj.setTop(y);
                        obj.setLeft(x);
                        x += obj._HTMLElement.offsetWidth + this.hGap;
                        if (maxTop < y + obj._HTMLElement.offsetHeight) maxTop = y + obj._HTMLElement.offsetHeight;
                    } else {
                        if (y + obj._HTMLElement.offsetHeight > this._HTMLElement.offsetHeight) {
                            if (maxLeft < x + obj._HTMLElement.offsetWidth) maxLeft = x + obj._HTMLElement.offsetWidth;
                            x = maxLeft + this.hGap;
                            y = this.vGap;
                            maxLeft = x;
                        }
                        obj.setTop(y);
                        obj.setLeft(x);
                        y += obj._HTMLElement.offsetHeight + this.vGap;
                        if (maxLeft < x + obj._HTMLElement.offsetWidth) maxLeft = x + obj._HTMLElement.offsetWidth;
                    }
                    obj.endUpdate();
                }
            }
        },
        loaded: function () {
            this._inherited();
            this.alignControls();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.layout;
            if (data) this.layout = data;
            data = this._HTMLElement.dataset.hgap;
            if (data) this.hGap = ~~data;
            data = this._HTMLElement.dataset.vgap;
            if (data) this.vGap = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.layout = null;
            this.hGap = null;
            this.vGap = null;
        }
        //#endregion
    });
    Object.seal(FlowLayout);
    $j.classes.register($j.types.categories.CONTAINERS, FlowLayout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var FlowLayoutTpl = "<div id='{internalId}' data-name='{name}' data-class='FlowLayout' class='Control FlowLayout' data-layout='horizontal' data-hgap='5' data-vgap='5' style='width:185px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: FlowLayout, template: FlowLayoutTpl }]);
    }
    //endregion
})();
//https://github.com/bramstein/jlayout/blob/master/lib/jlayout.flow.js*/