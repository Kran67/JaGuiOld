//#region Class CustomLayout
class CustomLayout {
    //#region Private fields
    #owner;
    #oldUpdate;
    #layoutMode;
    #flexDirection;
    #justifyContent;
    #alignItems;
    #templateColumns;
    #columns;
    #templateRows;
    #rows;
    #columnGap;
    #rowGap;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            this.#owner = owner;
            if (owner.update) {
                this.#oldUpdate = owner.update;
            }
            this.#layoutMode = props.layoutMode ? props.layoutMode : core.types.LAYOUTMODES.NORMAL;
            this.#justifyContent = props.justifyContent ? props.justifyContent : core.types.JUSTIFYCONTENT.FLEXSTART;
            this.#alignItems = props.alignItems ? props.alignItems : core.types.ALIGNITEMS.FLEXSTART;
            this.#flexDirection = props.flexDirection ? props.flexDirection : core.types.FLEXDIRECTIONS.ROW;
            this.#columnGap = props.columnGap ? props.columnGap : 5;
            this.#rowGap = props.rowGap ? props.rowGap : 5;
            this.#columns = props.columns ? props.columns : 5;
            this.#rows = props.rows ? props.rows : 5;
            this.#templateColumns = props.templateColumns ? props.templateColumns : String.EMPTY;
            this.#templateRows = props.templateRows ? props.templateRows : String.EMPTY;
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region layoutMode
    get layoutMode() {
        return this.#layoutMode;
    }
    set layoutMode(newValue) {
        if (core.tools.valueInSet(newValue, core.types.LAYOUTMODES) && this.#layoutMode !== newValue) {
            this.#layoutMode = newValue;
            isHtmlRenderer && this.update();
        }
    }
    //#endregion layoutMode
    //#region justifyContent
    get justifyContent() {
        return this.#justifyContent;
    }
    set justifyContent(newValue) {
        if (core.tools.valueInSet(newValue, core.types.JUSTIFYCONTENT) && this.#justifyContent !== newValue) {
            this.#justifyContent = newValue;
            isHtmlRenderer && this.update();
        }
    }
    //#endregion justifyContent
    //#region alignItems
    get alignItems() {
        return this.#alignItems;
    }
    set alignItems(newValue) {
        if (core.tools.valueInSet(newValue, core.types.ALIGNITEMS) && this.#alignItems !== newValue) {
            this.#alignItems = newValue;
            isHtmlRenderer && this.update();
        }
    }
    //#endregion alignItems
    //#region flexDirection
    get flexDirection() {
        return this.#flexDirection;
    }
    set flexDirection(newValue) {
        if (core.tools.valueInSet(newValue, core.types.FLEXDIRECTIONS) && this.#flexDirection !== newValue) {
            this.#flexDirection = newValue;
            isHtmlRenderer && this.update();
        }
    }
    //#endregion flexDirection
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
        if (core.tools.isNumber(newValue) && this.#templateColumns !== newValue) {
            this.#templateColumns = newValue;
            this.update();
        }
    }
    //#endregion templateColumns
    //#region templateRows
    get templateRows() {
        return this.#templateRows;
    }
    set templateRows(newValue) {
        if (core.tools.isNumber(newValue) && this.#templateRows !== newValue) {
            this.#templateRows = newValue;
            this.update();
        }
    }
    //#endregion templateRows
    //#endregion Getters / Setters
    //#region Methods
    update() {
        //#region Variables déclaration
        const htmlElementStyle = this.#owner.HTMLElementStyle;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        this.#oldUpdate();
        switch (this.#layoutMode) {
            case core.types.LAYOUTMODES.NORMAL:
                htmlElementStyle.display = core.types.DISPLAYS.BLOCK;
                break;
            case core.types.LAYOUTMODES.FLEX:
                htmlElementStyle.display = core.types.DISPLAYS.FLEX;
                htmlElementStyle.flexDirection = this.#flexDirection;
                htmlElementStyle.justifyContent = this.#justifyContent;
                htmlElementStyle.alignItems = this.#alignItems;
                break;
            case core.types.LAYOUTMODES.GRID:
                htmlElementStyle.display = core.types.DISPLAYS.GRID;
                htmlElementStyle.gridTemplateColumns = !String.isNullOrEmpty(this.#templateColumns)
                    ? this.#templateColumns : `repeat(${this.#columns}, 1fr [col-start])`;
                htmlElementStyle.gridTemplateRows = !String.isNullOrEmpty(this.#templateRows)
                    ? this.#templateRows : `repeat(${this.#rows}, 1fr [row-start])`;
                htmlElementStyle.columnGap = `${this.#columnGap}${PX}`;
                htmlElementStyle.rowGap = `${this.#rowGap}${PX}`;
                break;
        }
    };
    //#endregion Methods
}
Object.seal(CustomLayout);
Object.defineProperties(CustomLayout.prototype, {
    'layoutMode': {
        enumerable: !0
    },
    'flexDirection': {
        enumerable: !0
    },
    'justifyContent': {
        enumerable: !0
    },
    'alignItems': {
        enumerable: !0
    },
    'templateColumns': {
        enumerable: !0
    },
    'columns': {
        enumerable: !0
    },
    'templateRows': {
        enumerable: !0
    },
    'rows': {
        enumerable: !0
    },
    'columnGap': {
        enumerable: !0
    },
    'rowGap': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomLayout);
//#region Class CustomLayout
export { CustomLayout };