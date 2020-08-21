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
    //#region Private fields
    #data = [];
    #cursorIdx = -1;
    #cursor = null;
    #numFields = 0;
    #numRecords = 0;
    #keyValues;
    #dataSource;
    #active;
    #activeOnLoad;
    #isOpen;
    #keyField;
    //#endregion Private fields
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
            this.#keyValues = props.hasOwnProperty('keyValues') ? props.keyValues : String.EMPTY;
            this.#dataSource = props.hasOwnProperty('dataSource') ? props.dataSource : null;
            this.#active = props.hasOwnProperty('active') ? props.active : !1;
            this.#activeOnLoad = props.hasOwnProperty('activeOnLoad') ? props.activeOnLoad : !0;
            this.#isOpen = props.hasOwnProperty('isOpen') ? props.isOpen : !1;
            this.#keyField = props.hasOwnProperty('keyField') ? props.keyField : String.EMPTY;
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
        return this.#data;
    }
    set data(newValue) {
        Array.isArray(newValue) && this.#data !== newValue
            && (this.#data = newValue);
    }
    //#endregion data
    //#region cursorIdx
    get cursorIdx() {
        return this.#cursorIdx;
    }
    set cursorIdx(newValue) {
        core.tools.isNumber(newValue) && this.#cursorIdx !== newValue
            && (this.#cursorIdx = newValue);
    }
    //#endregion cursorIdx
    //#region cursor
    get cursor() {
        return this.#cursor;
    }
    set cursor(newValue) {
        core.tools.isObject(newValue) && this.#cursor !== newValue
            && (this.#cursor = newValue);
    }
    //#endregion cursor
    //#region numFields
    get numFields() {
        return this.#numFields;
    }
    set numFields(newValue) {
        core.tools.isNumber(newValue) && this.#numFields !== newValue
            && (this.#numFields = newValue);
    }
    //#endregion numFields
    //#region numRecords
    get numRecords() {
        return this.#numRecords;
    }
    set numRecords(newValue) {
        core.tools.isNumber(newValue) && this.#numRecords !== newValue
            && (this.#numRecords = newValue);
    }
    //#endregion numRecords
    //#region keyValues
    get keyValues() {
        return this.#keyValues;
    }
    set keyValues(newValue) {
        core.tools.isString(newValue) && this.#keyValues !== newValue
            && (this.#keyValues = newValue);
    }
    //#endregion keyValues
    //#region dataSource
    get dataSource() {
        return this.#dataSource;
    }
    set dataSource(newValue) {
        if (newValue instanceof core.classes.DataSource && this.#dataSource !== newValue) {
            //this.#active = !1;
            this.#dataSource = newValue;
            //this.#active = !0;
        }
    }
    //#endregion dataSource
    //#region active
    get active() {
        return this.#active;
    }
    set active(newValue) {
        if (core.tools.isBool(newValue) && this.#active !== newValue) {
            this.#active = newValue;
            if (this.#active) {
                this.open();
                this.getKeyValues();
                this.#cursorIdx = 0;
            } else {
                this.close();
            }
        }
    }
    //#endregion active
    //#region activeOnLoad
    get activeOnLoad() {
        return this.#activeOnLoad;
    }
    //#endregion activeOnLoad
    //#region isOpen
    get isOpen() {
        return this.#isOpen;
    }
    set isOpen(newValue) {
        core.tools.isBool(newValue) && this.#isOpen !== newValue && (this.#isOpen = newValue);
    }
    //#endregion isOpen
    /**
     * Return the key field
     * @returns     {String}        the key field
     */
    //#region keyField
    get keyField() {
        return core.this.#keyField;
    }
    /**
     * Set the keyField value
     * @param   {String}        newValue        the new key field
     */
    set keyField(newValue) {
        if (core.tools.isString(newValue) && this.#keyField !== newValue) {
            this.#keyField = newValue;
            this.#dataSource.refreshControls();
        }
    }
    //#endregion keyField
    //#endregion Getters / Setters
    //#region Methods
    /**
     * Open the dataset
     */
    //#region open
    open() {
        if (!this.#data.isEmpty) {
            this.#cursorIdx = 0;
            this.#cursor = this.#data[this.#cursorIdx];
            this.#isOpen = !0;
            this.#dataSource.refreshControls();
        }
    }
    //#endregion open
    /**
     * Close the dataset
     */
    //#region close
    close() {
        this.#isOpen = !1;
        this.#cursorIdx = -1;
        this.#keyValues = String.EMPTY;
        this.#dataSource.refreshControls();
    }
    //#endregion close
    /**
     * Move the dataset pointer to the next record
     */
    //#region next
    next() {
        this.#cursorIdx++;
        this.#cursorIdx > this.#numRecords && (this.#cursorIdx = this.#numRecords - 1);
        this.getKeyValues();
        this.#dataSource.refreshControls();
    }
    //#endregion next
    /**
     * Move the dataset pointer to the previous record
     */
    //#region prev
    prev() {
        this.#cursorIdx--;
        this.#cursorIdx = Math.max(this.#cursorIdx, 0);
        this.getKeyValues();
        this.#dataSource.refreshControls();
    }
    //#endregion prev
    /**
     * Move the dataset pointer to the first record
     */
    //#region first
    first() {
        this.#cursorIdx = 0;
        this.getKeyValues();
        this.#dataSource.refreshControls();
    }
    //#endregion first
    /**
     * Move the dataset pointer to the last record
     */
    //#region last
    last() {
        this.#cursorIdx = this.#numRecords - 1;
        this.getKeyValues();
        this.#dataSource.refreshControls();
    }
    //#endregion last
    /**
     * Indicate if the dataset contains a key field
     * @return  {Boolean}       !0
     */
    //#region hasKeyfield
    hasKeyfield() {
        return !this.#keyFields.isEmpty;
    }
    //#endregion hasKeyfield
    /**
     * Get the key values in the dataset
     */
    //#region getKeyValues
    getKeyValues() {
        //#region Variables déclaration
        let values = null;
        //#endregion Variables déclaration
        if (!String.isNullOrEmpty(this.#keyFields)) {
            const keyFields = this.keyFields.split(',');
            const cursor = this.#data[this.#cursorIdx];
            this.#keyValues = String.EMPTY;
            keyFields.forEach((key, i) => {
                if (cursor[key]) {
                    i > 0 && (values += '|');
                    values += cursor[key];
                }
            });
            this.#keyValues = values;
        }
    }
    //#endregion getKeyValues
    /**
     * Go to the current cursor
     */
    //#region goToCurrentCursor
    goToCurrentCursor() {
        //#region Variables déclaration
        const keyValues = prvi.keyValues;
        const keyFields = prvi.keyFields.split(',');
        let idx = -1;
        //#endregion Variables déclaration
        this.#data.filter((e, i) => {
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
        });
        this.#cursorIdx = idx;
        this.#cursor = this.#data[this.#cursorIdx];
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
        this.#data && this.#data.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(DataSet.prototype, {
    'dataSource': {
        enumerable: !0
    },
    'active': {
        enumerable: !0
    },
    'activeOnLoad': {
        enumerable: !0
    },
    'keyField': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.NONVISUAL, DataSet);
//#region DataSet
export { DataSet };