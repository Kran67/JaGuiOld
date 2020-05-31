//#region Import
import { Layout } from '/scripts/components/containers/layout.js';
//#endregion Import
//#region Class GridLayout
class GridLayout extends Layout {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                columnGap: props.hasOwnProperty('columnGap') ? props.columnGap : 5,
                rowGap: props.hasOwnProperty('rowGap') ? props.rowGap : 5,
                columns: props.hasOwnProperty('columns') ? props.columns : 5,
                rows: props.hasOwnProperty('rows') ? props.rows : 5,
                templateColumns: props.hasOwnProperty('templateColumns')
                    ? props.templateColumns : String.EMPTY,
                templateRows: props.hasOwnProperty('templateRows') ? props.templateRows : String.EMPTY
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region columnGap
    get columnGap() {
        return core.private(this).columnGap;
    }
    set columnGap(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.columnGap !== newValue) {
            priv.columnGap = newValue;
            this.update();
        }
    }
    //#endregion columnGap
    //#region rowGap
    get rowGap() {
        return core.private(this).rowGap;
    }
    set rowGap(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.rowGap !== newValue) {
            priv.rowGap = newValue;
            this.update();
        }
    }
    //#endregion rowGap
    //#region columns
    get columns() {
        return core.private(this).columns;
    }
    set columns(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.columns !== newValue) {
            priv.columns = newValue;
            this.update();
        }
    }
    //#endregion columns
    //#region rows
    get rows() {
        return core.private(this).rows;
    }
    set rows(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv.rows !== newValue) {
            priv.rows = newValue;
            this.update();
        }
    }
    //#endregion rows
    get templateColumns() {
        return core.private(this).templateColumns;
    }
    set templateColumns(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.templateColumns !== newValue) {
            priv.templateColumns = newValue;
            core.isHTMLRenderer && this.update();
        }
    }
    get templateRows() {
        return core.private(this).templateRows;
    }
    set templateRows(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.templateRows !== newValue) {
            priv.templateRows = newValue;
            core.isHTMLRenderer && this.update();
        }
    }
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        //super.update();
        htmlElementStyle.gridTemplateColumns = !String.isNullOrEmpty(priv.templateColumns)
            ? priv.templateColumns : `repeat(${priv.columns}, 1fr [col-start])`;
        htmlElementStyle.gridTemplateRows = !String.isNullOrEmpty(priv.templateRows)
            ? priv.templateRows : `repeat(${priv.rows}, 1fr [row-start])`;
        htmlElementStyle.columnGap = `${priv.columnGap}${PX}`;
        htmlElementStyle.rowGap = `${priv.rowGap}${PX}`;
        this.components.forEach(comps => {
            comps.HTMLElement.classList.remove('Control');
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