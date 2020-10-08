//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
//#endregion Import
//#region Class GridLayout
class GridLayout extends Layout {
    //#region Private fields
    #columnGap;
    #rowGap;
    #columns;
    #rows;
    #templateColumns;
    #templateRows;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#columnGap = props.hasOwnProperty('columnGap') ? props.columnGap : 5;
            this.#rowGap = props.hasOwnProperty('rowGap') ? props.rowGap : 5;
            this.#columns = props.hasOwnProperty('columns') ? props.columns : 5;
            this.#rows = props.hasOwnProperty('rows') ? props.rows : 5;
            this.#templateColumns = props.hasOwnProperty('templateColumns')
                ? props.templateColumns : String.EMPTY;
            this.#templateRows = props.hasOwnProperty('templateRows') ? props.templateRows : String.EMPTY;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region columnGap
    get columnGap() {
        return this.#columnGap;
    }
    set columnGap(newValue) {
        if (core.tools.isNumber(newValue) && this.#columnGap !== newValue) {
            this.#columnGap = newValue;
            this.update();
        }
    }
    //#endregion columnGap
    //#region rowGap
    get rowGap() {
        return this.#rowGap;
    }
    set rowGap(newValue) {
        if (core.tools.isNumber(newValue) && this.#rowGap !== newValue) {
            this.#rowGap = newValue;
            this.update();
        }
    }
    //#endregion rowGap
    //#region columns
    get columns() {
        return this.#columns;
    }
    set columns(newValue) {
        if (core.tools.isNumber(newValue) && this.#columns !== newValue) {
            this.#columns = newValue;
            this.update();
        }
    }
    //#endregion columns
    //#region rows
    get rows() {
        return this.#rows;
    }
    set rows(newValue) {
        if (core.tools.isNumber(newValue) && this.#rows !== newValue) {
            this.#rows = newValue;
            this.update();
        }
    }
    //#endregion rows
    //#region templateColumns
    get templateColumns() {
        return this.#templateColumns;
    }
    set templateColumns(newValue) {
        if (core.tools.isString(newValue) && this.#templateColumns !== newValue) {
            this.#templateColumns = newValue;
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion templateColumns
    //#region templateRows
    get templateRows() {
        return this.#templateRows;
    }
    set templateRows(newValue) {
        if (core.tools.isString(newValue) && this.#templateRows !== newValue) {
            this.#templateRows = newValue;
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion templateRows
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        //super.update();
        htmlElementStyle.gridTemplateColumns = !String.isNullOrEmpty(this.#templateColumns)
            ? this.#templateColumns : `repeat(${this.#columns}, 1fr [col-start])`;
        htmlElementStyle.gridTemplateRows = !String.isNullOrEmpty(this.#templateRows)
            ? this.#templateRows : `repeat(${this.#rows}, 1fr [row-start])`;
        htmlElementStyle.columnGap = `${this.#columnGap}${PX}`;
        htmlElementStyle.rowGap = `${this.#rowGap}${PX}`;
        this.components.forEach(comps => {
            //comps.HTMLElement.classList.remove('Control');
            comps.HTMLElementStyle.width = 'auto';
            comps.HTMLElementStyle.height = 'auto';
            core.tools.isFunc(comps.update) && comps.update();
        });
    }
    //#endregion update
    //#region loaded
    loaded() {
        super.loaded();
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(GridLayout.prototype, {
    'columnGap': {
        enumerable: !0
    },
    'rowGap': {
        enumerable: !0
    },
    'columns': {
        enumerable: !0
    },
    'rows': {
        enumerable: !0
    },
    'templateColumns': {
        enumerable: !0
    },
    'templateRows': {
        enumerable: !0
    }
});
Object.seal(GridLayout);
core.classes.register(core.types.CATEGORIES.CONTAINERS, GridLayout);
//#endregion GridLayout
//#region Templates
if (core.isHTMLRenderer) {
    const GridLayoutTpl = ['<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout"><properties>',
        '{ "name": "{name}" }</properties></jagui-gridlayout>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: GridLayout, template: GridLayoutTpl }]);
}
//#endregion
export { GridLayout };