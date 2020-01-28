//#region Import
import { Layout } from "/scripts/components/containers/layout.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region GridLayout
const GridLayout = (() => {
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
    //#region Class GridLayout
    class GridLayout extends Layout {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.columnGap = props.hasOwnProperty("columnGap") ? props.columnGap : 5;
                priv.rowGap = props.hasOwnProperty("rowGap") ? props.rowGap : 5;
                priv.columns = props.hasOwnProperty("columns") ? props.columns : 5;
                priv.rows = props.hasOwnProperty("rows") ? props.rows : 5;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        get columnGap() {
            return internal(this).columnGap;
        }
        set columnGap(newValue) {
            const priv = internal(this);
            if (Tools.isNumber(newValue)) {
                if (priv.columnGap !== newValue) {
                    priv.columnGap = newValue;
                    this.update();
                }
            }
        }
        get rowGap() {
            return internal(this).rowGap;
        }
        set rowGap(newValue) {
            const priv = internal(this);
            if (Tools.isNumber(newValue)) {
                if (priv.rowGap !== newValue) {
                    priv.rowGap = newValue;
                    this.update();
                }
            }
        }
        get columns() {
            return internal(this).columns;
        }
        set columns(newValue) {
            const priv = internal(this);
            if (Tools.isNumber(newValue)) {
                if (priv.columns !== newValue) {
                    priv.columns = newValue;
                    this.update();
                }
            }
        }
        get rows() {
            return internal(this).rows;
        }
        set rows(newValue) {
            const priv = internal(this);
            if (Tools.isNumber(newValue)) {
                if (priv.rows !== newValue) {
                    priv.rows = newValue;
                    this.update();
                }
            }
        }
        //#endregion Getters / Setters
        //#region Methods
        update() {
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const htmlElementStyle = this.HTMLElementStyle;
            super.update();
            htmlElementStyle.gridTemplateColumns = "1fr ".repeat(priv.columns);
            htmlElementStyle.gridTemplateRows = "1fr ".repeat(priv.rows);
            htmlElementStyle.columnGap = `${priv.columnGap}${PX}`;
            htmlElementStyle.rowGap = `${priv.rowGap}${PX}`;
            this.components.forEach(comps => {

            });
        }
        destroy() {
            const priv = internal(this);
            super.destroy();
            priv.itemWidth = null;
            priv.itemHeight = null;
            priv.hGap = null;
            priv.vGap = null;
        }
        loaded() {
            super.loaded();
            this.update();
        }
        //#endregion Methods
    }
    return GridLayout;
    //#endregion GridLayout
})();
//#endregion GridLayout
Core.classes.register(Types.CATEGORIES.CONTAINERS, GridLayout);
export { GridLayout };

/*(function () {
    GridLayout = $j.classes.Layout.extend("GridLayout", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.itemWidth = 64;
                this.itemHeight = 64;
                this.hGap = 5;
                this.vGap = 5;
            }
        },
        //#region Methods
        alignControls: function () {
            var i = 0, l, obj, x = this.hGap, y = this.vGap, maxTop = y;
            if (this._components.length === 0) return;
            l = this._components.length;
            for (; i < l; i++) {
                obj = this._components[i];
                if (obj.visible) {
                    if (x + this.itemWidth > this._HTMLElement.offsetWidth) {
                        if (maxTop < y + this.itemHeight) maxTop = y + this.itemHeight;
                        y = maxTop + this.vGap;
                        x = this.hGap;
                    }
                    obj.setWidth(this.itemWidth);
                    obj.setHeight(this.itemHeight);
                    obj.setLeft(x);
                    obj.setTop(y);
                    x += this.itemWidth + this.hGap;
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
            data = this._HTMLElement.dataset.itemwidth;
            if (data) this.itemWidth = ~~data;
            data = this._HTMLElement.dataset.itemheight;
            if (data) this.itemHeight = ~~data;
            data = this._HTMLElement.dataset.hgap;
            if (data) this.hGap = ~~data;
            data = this._HTMLElement.dataset.vgap;
            if (data) this.vGap = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.itemWidth = null;
            this.itemHeight = null;
            this.hGap = null;
            this.vGap = null;
        }
        //#endregion
    });
    Object.seal(GridLayout);
    $j.classes.register($j.types.categories.CONTAINERS, GridLayout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var GridLayoutTpl = "<div id='{internalId}' data-name='{name}' data-class='GridLayout' class='Control GridLayout' data-itemwidth='64' data-itemheight='64' data-hgap='5' data-vgap='5' style='width:185px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: GridLayout, template: GridLayoutTpl }]);
    }
    //endregion
})();*/