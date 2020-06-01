//#region Imports
import { Convert } from '/scripts/core/convert.js';
//#endregion
//#region DataSet
/**
 * Class representing a DataSet.
 * @extends {Component}
 */
//#region DataSet
class DataSet extends Component {
    /**
     * Create a new instance of DataSet.
     * @param       {Component}     owner       The owner component
     * @param       {Object}        props       The object that contains default properties
     */
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //#region Properties
            //#region Private Properties
            core.private(this, {
                data: [],
                cursorIdx: -1,
                cursor: null,
                numFields: 0,
                numRecords: 0,
                keyValues: props.hasOwnProperty('keyValues') ? props.keyValues : String.EMPTY,
                dataSource: props.hasOwnProperty('dataSource') ? props.dataSource : null,
                active: props.hasOwnProperty('active') ? props.active : !1,
                activeOnLoad: props.hasOwnProperty('activeOnLoad') ? props.activeOnLoad : !0,
                isOpen: props.hasOwnProperty('isOpen') ? props.isOpen : !1,
                keyField: props.hasOwnProperty('keyField') ? props.keyField : String.EMPTY
            });
            //#endregion Private Properties
            //#region Public Properties
            //#endregion Public Properties
            //#endregion Properties
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region data
    get data() {
        return core.private(this).data;
    }
    set data(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        Array.isArray(newValue) && priv.data !== newValue
            && (priv.data = newValue);
    }
    //#endregion data
    //#region cursorIdx
    get cursorIdx() {
        return core.private(this).cursorIdx;
    }
    set cursorIdx(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.cursorIdx !== newValue
            && (priv.cursorIdx = newValue);
    }
    //#endregion cursorIdx
    //#region cursor
    get cursor() {
        return core.private(this).cursor;
    }
    set cursor(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isObject(newValue) && priv.cursor !== newValue
            && (priv.cursor = newValue);
    }
    //#endregion cursor
    //#region numFields
    get numFields() {
        return core.private(this).numFields;
    }
    set numFields(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.numFields !== newValue
            && (priv.numFields = newValue);
    }
    //#endregion numFields
    //#region numRecords
    get numRecords() {
        return core.private(this).numRecords;
    }
    set numRecords(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.numRecords !== newValue
            && (priv.numRecords = newValue);
    }
    //#endregion numRecords
    //#region keyValues
    get keyValues() {
        return core.private(this).keyValues;
    }
    set keyValues(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isString(newValue) && priv.keyValues !== newValue
            && (priv.keyValues = newValue);
    }
    //#endregion keyValues
    //#region dataSource
    get dataSource() {
        return core.private(this).dataSource;
    }
    set dataSource(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.DataSource && priv.dataSource !== newValue) {
            //priv.active = !1;
            priv.dataSource = newValue;
            //priv.active = !0;
        }
    }
    //#endregion dataSource
    //#region active
    get active() {
        return core.private(this).active;
    }
    set active(newValue) {
        //#region Variables déclaration
        let priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.active !== newValue) {
            priv.active = newValue;
            if (priv.active) {
                this.open();
                this.getKeyValues();
                priv.cursorIdx = 0;
            } else {
                this.close();
            }
        }
    }
    //#endregion active
    //#region activeOnLoad
    get activeOnLoad() {
        return core.private(this).activeOnLoad;
    }
    //#endregion activeOnLoad
    //#region isOpen
    get isOpen() {
        return core.private(this).isOpen;
    }
    set isOpen(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.isOpen !== newValue && (priv.isOpen = newValue);
    }
    //#endregion isOpen
    /**
     * Return the key field
     * @returns     {String}        the key field
     */
    //#region keyField
    get keyField() {
        return core.core.private(this).keyField;
    }
    /**
     * Set the keyField value
     * @param   {String}        newValue        the new key field
     */
    set keyField(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.keyField !== newValue) {
            priv.keyField = newValue;
            priv.dataSource.refreshControls();
        }
    }
    //#endregion keyField
    //#endregion Getter / Setters
    //#region Methods
    /**
     * Open the dataset
     */
    //#region open
    open() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (!priv.data.isEmpty) {
            priv.cursorIdx = 0;
            priv.cursor = priv.data[priv.cursorIdx];
            priv.isOpen = !0;
            priv.dataSource.refreshControls();
        }
    }
    //#endregion open
    /**
     * Close the dataset
     */
    //#region close
    close() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.isOpen = !1;
        priv.cursorIdx = -1;
        priv.keyValues = String.EMPTY;
        priv.dataSource.refreshControls();
    }
    //#endregion close
    /**
     * Move the dataset pointer to the next record
     */
    //#region next
    next() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.cursorIdx++;
        priv.cursorIdx > priv.numRecords && (priv.cursorIdx = priv.numRecords - 1);
        this.getKeyValues();
        priv.dataSource.refreshControls();
    }
    //#endregion next
    /**
     * Move the dataset pointer to the previous record
     */
    //#region prev
    prev() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.cursorIdx--;
        priv.cursorIdx = Math.max(priv.cursorIdx, 0);
        this.getKeyValues();
        priv.dataSource.refreshControls();
    }
    //#endregion prev
    /**
     * Move the dataset pointer to the first record
     */
    //#region first
    first() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.cursorIdx = 0;
        this.getKeyValues();
        priv.dataSource.refreshControls();
    }
    //#endregion first
    /**
     * Move the dataset pointer to the last record
     */
    //#region last
    last() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.cursorIdx = priv.numRecords - 1;
        this.getKeyValues();
        priv.dataSource.refreshControls();
    }
    //#endregion last
    /**
     * Indicate if the dataset contains a key field
     * @return  {Boolean}       !0
     */
    //#region hasKeyfield
    hasKeyfield() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return !priv.keyFields.isEmpty;
    }
    //#endregion hasKeyfield
    /**
     * Get the key values in the dataset
     */
    //#region getKeyValues
    getKeyValues() {
        //#region Variables déclaration
        const priv = core.private(this);
        let values = null;
        //#endregion Variables déclaration
        if (!String.isNullOrEmpty(priv.keyFields)) {
            const keyFields = this.keyFields.split(',');
            const cursor = priv.data[priv.cursorIdx];
            priv.keyValues = String.EMPTY;
            keyFields.forEach((key, i) => {
                if (cursor[key]) {
                    i > 0 && (values += '|');
                    values += cursor[key];
                }
            });
            priv.keyValues = values;
        }
    }
    //#endregion getKeyValues
    /**
     * Go to the current cursor
     */
    //#region goToCurrentCursor
    goToCurrentCursor() {
        //#region Variables déclaration
        const priv = core.private(this);
        const keyValues = prvi.keyValues;
        const keyFields = prvi.keyFields.split(',');
        let idx = -1;
        //#endregion Variables déclaration
        priv.data.filter((e, i) => {
            let ret = !1;
            let keyValue = String.EMPTY;
            keyFields.forEach((key, j) => {
                j > 0 && (keyValue += '|');
                keyValue += e[key];
            });
            if (keyValue === keyValues) {
                ret = !0;
                idx = i;
            }
            return ret;
        }
        );
        priv.cursorIdx = idx;
        priv.cursor = priv.data[priv.cursorIdx];
    }
    //#endregion goToCurrentCursor
    /**
     * Sort all records by string value
     * @param       {Number}        col         Column index
     * @param       {String}        order       The order direction
     * @returns     {Number}        if is less than 0, sort a to an index lower than b, i.e. a comes first.
     *                              if returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
     *                              if is greater than 0, sort b to an index lower than a, i.e. b comes first.
     */
    //#region sortByString
    sortByString(col, order) {
        return (a, b) => {
            let fieldsNames = Object.keys(a);
            a = a[fieldsNames[col]];
            fieldsNames = Object.keys(b);
            b = b[fieldsNames[col]];
            if (order === core.types.SORTEDORDERS.ASC) {
                return a === b ? 0 : a < b ? -1 : 1;
            } else {
                return a === b ? 0 : a < b ? 1 : -1;
            }
        };
    }
    //#endregion sortByString
    /**
     * Sort all records by date value
     * @param       {Number}        col         Column index
     * @param       {String}        order       The order direction
     * @returns     {Number}        if is less than 0, sort a to an index lower than b, i.e. a comes first.
     *                              if returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
     *                              if is greater than 0, sort b to an index lower than a, i.e. b comes first.
     */
    //#region sortByDate
    sortByDate(col, order) {
        return (a, b) => {
            let fieldsNames = Object.keys(a);
            a = a[fieldsNames[col]];
            fieldsNames = Object.keys(b);
            b = b[fieldsNames[col]];
            if (order === core.types.SORTEDORDERS.ASC) {
                return a === b ? 0 : a < b ? -1 : 1;
            } else {
                return a === b ? 0 : a < b ? 1 : -1;
            }
        };
    }
    //#endregion sortByDate
    /**
     * Sort all records by number value
     * @param       {Number}        col         Column index
     * @param       {String}        order       The order direction
     * @returns     {Number}        if is less than 0, sort a to an index lower than b, i.e. a comes first.
     *                              if returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
     *                              if is greater than 0, sort b to an index lower than a, i.e. b comes first.
     */
    //#region sortByNumber
    sortByNumber(col, order) {
        return (a, b) => {
            let fieldsNames = Object.keys(a);
            a = int(a[fieldsNames[col]]);
            fieldsNames = Object.keys(b);
            b = int(b[fieldsNames[col]]);
            if (order === core.types.SORTEDORDERS.ASC) {
                return a === b ? 0 : a < b ? -1 : 1;
            } else {
                return a === b ? 0 : a < b ? 1 : -1;
            }
        };
    }
    //#endregion sortByNumber
    /**
     * Sort all records by boolean value
     * @param       {Number}        col         Column index
     * @param       {String}        order       The order direction
     * @returns     {Number}
     */
    //#region sortByBoolean
    sortByBoolean(col, order) {
        return (a, b) => {
            let fieldsNames = Object.keys(a);
            if (core.tools.isBool(a[fieldsNames[col]])) {
                a = a[fieldsNames[col]];
            } else {
                a = Convert.strToBool(a[fieldsNames[col]].toString());
            }
            fieldsNames = Object.keys(b);
            if (core.tools.isBool(b[fieldsNames[col]])) {
                b = b[fieldsNames[col]];
            } else {
                b = Convert.strToBool(b[fieldsNames[col]].toString());
            }
            if (order === core.types.SORTEDORDERS.ASC) {
                return a === b ? 0 : a < b ? -1 : 1;
            } else {
                return a === b ? 0 : a < b ? 1 : -1;
            }
        };
    }
    //#endregion sortByBoolean
    /**
     * Destroy all properties of the instance
     * @override
     */
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.data && priv.data.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion
}
core.classes.register(core.types.CATEGORIES.NONVISUAL, DataSet);
//#region DataSet
export { DataSet };