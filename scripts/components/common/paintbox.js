//#region Import
import { Control } from "/scripts/components/control.js";
import { Tools } from "/scripts/core/tools.js";
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
                //#endregion
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
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
        update() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!this.form.loading && !this.form.creating) {
                htmlElement.setAttribute('width', htmlElement.offsetWidth);
                htmlElement.setAttribute('height', htmlElement.offsetHeight);
                this.paint();
            }
        }
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
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.ctx = null;
        }
        //#endregion Methods
    }
    return PaintBox;
    //#endregion PaintBox
})();
//#endregion CustomButton
    Object.seal(PaintBox);
Core.classes.register(Types.CATEGORIES.COMMON, PaintBox);
export { PaintBox };

/*(function () {
    var PaintBox = $j.classes.Control.extend("PaintBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._ctx = null;
                //#endregion
                delete this.tabOrder;
            }
        },
        //#region Setter
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            if (this.width !== newValue) {
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.paint();
                }
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            if (this.height !== newValue) {
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.paint();
                }
            }
        },
        //#endregion
        //#region Methods
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._ctx = this._HTMLElement.getContext("2d");
            }
        },
        update: function () {
            if (this.form._loading || this.form._creating) return;
            this._HTMLElement.setAttribute('width', this._HTMLElement.offsetWidth);
            this._HTMLElement.setAttribute('height', this._HTMLElement.offsetHeight);
            this.paint();
        },
        paint: function () {
            if ((this._HTMLElement.offsetWidth === 0) || (this._HTMLElement.offsetHeight === 0)) return;
            if (this.form._loading || this.form._creating) return;
            if (!this.isEnabled()) return;
            if ($j.isHTMLRenderer()) {
                this._ctx.clear();
                this.onPaint.invoke();
            }
        },
        destroy: function () {
            this._inherited();
            this._ctx = null;
        }
        //updateFromHTML:function() {
        //  this._inherited();
        //  this.width=parseInt(this._HTMLElement.getAttribute("width"),10);
        //  this.height=parseInt(this._HTMLElement.getAttribute("height"),10);
        //}
        //#endregion
    });
    Object.seal(PaintBox);
    $j.classes.register($j.types.categories.COMMON, PaintBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var PaintBoxTpl = "<canvas id='{internalId}' data-class='PaintBox' class='Control PaintBox' data-name='{name}'' width='105' height='105' style='width:105px;height:105px;'></canvas>";
        $j.classes.registerTemplates([{ Class: PaintBox, template: PaintBoxTpl }]);
    }
    //endregion
})();*/