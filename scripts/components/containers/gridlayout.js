//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
import { Tools } from '/scripts/core/tools.js';
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
                priv.columnGap = props.hasOwnProperty('columnGap') ? props.columnGap : 5;
                priv.rowGap = props.hasOwnProperty('rowGap') ? props.rowGap : 5;
                priv.columns = props.hasOwnProperty('columns') ? props.columns : 5;
                priv.rows = props.hasOwnProperty('rows') ? props.rows : 5;
                priv.templateColumns = props.hasOwnProperty('templateColumns') ? props.templateColumns : String.EMPTY;
                priv.templateRows = props.hasOwnProperty('templateRows') ? props.templateRows : String.EMPTY;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region columnGap
        get columnGap() {
            return internal(this).columnGap;
        }
        set columnGap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.columnGap !== newValue) {
                    priv.columnGap = newValue;
                    this.update();
                }
            }
        }
        //#endregion columnGap
        //#region rowGap
        get rowGap() {
            return internal(this).rowGap;
        }
        set rowGap(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.rowGap !== newValue) {
                    priv.rowGap = newValue;
                    this.update();
                }
            }
        }
        //#endregion rowGap
        //#region columns
        get columns() {
            return internal(this).columns;
        }
        set columns(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.columns !== newValue) {
                    priv.columns = newValue;
                    this.update();
                }
            }
        }
        //#endregion columns
        //#region rows
        get rows() {
            return internal(this).rows;
        }
        set rows(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.rows !== newValue) {
                    priv.rows = newValue;
                    this.update();
                }
            }
        }
        //#endregion rows
        get templateColumns() {
            return internal(this).templateColumns;
        }
        set templateColumns(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.templateColumns !== newValue) {
                    priv.templateColumns = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        get templateRows() {
            return internal(this).templateRows;
        }
        set templateRows(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.templateRows !== newValue) {
                    priv.templateRows = newValue;
                    if (Core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion Getters / Setters
        //#region Methods
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            //super.update();
            htmlElementStyle.gridTemplateColumns = !String.isNullOrEmpty(priv.templateColumns) ? priv.templateColumns : `repeat(${priv.columns}, 1fr [col-start])`;
            htmlElementStyle.gridTemplateRows = !String.isNullOrEmpty(priv.templateRows) ? priv.templateRows : `repeat(${priv.rows}, 1fr [row-start])`;
            htmlElementStyle.columnGap = `${priv.columnGap}${PX}`;
            htmlElementStyle.rowGap = `${priv.rowGap}${PX}`;
            this.components.forEach(comps => {
                comps.HTMLElement.classList.remove('Control');
                comps.HTMLElementStyle.width = 'auto';
                comps.HTMLElementStyle.height = 'auto';
                if (Tools.isFunc(comps.update)) {
                    comps.update();
                }
            });
        }
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.itemWidth = null;
            priv.itemHeight = null;
            priv.hGap = null;
            priv.vGap = null;
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#endregion loaded
        //#endregion Methods
    }
    return GridLayout;
    //#endregion GridLayout
})();
Object.seal(GridLayout);
//#endregion GridLayout
Core.classes.register(Types.CATEGORIES.CONTAINERS, GridLayout);
export { GridLayout };
//#region Templates
if (Core.isHTMLRenderer) {
    const GridLayoutTpl = ['<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout"><properties>',
        '{ "name": "{name}" }</properties></jagui-gridlayout>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: GridLayout, template: GridLayoutTpl }]);
}
//#endregion