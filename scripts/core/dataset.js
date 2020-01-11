//#region Imports
import { Convert } from "/scripts/core/convert.js";
//#endregion
//#region DataSet
/**
 * Class representing a DataSet.
 * @extends {Component}
 */
const DataSet = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class DataSet extends Component {
        /**
         * Create a new instance of DataSet.
         * @param       {Component}     owner       The owner component
         * @param       {Object}        props       The object that contains default properties
         */
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.data = [];
                priv.cursorIdx = -1;
                priv.cursor = null;
                priv.numFields = 0;
                priv.numRecords = 0;
                priv.keyValues = String.EMPTY;
                priv.dataSource = null;
                priv.active = false;
                priv.activeOnLoad = true;
                priv.isOpen = false;
                priv.keyField = String.EMPTY;
                this.addBindableProperties(["active", "isOpen"]);
            }
        }
        //#region Setters
        get data() {
            return internal(this).data;
        }
        set data(newValue) {
            const priv = internal(this);
            if (Array.isArray(newValue)) {
                if (priv.data !== newValue) {
                    priv.data = newValue;
                }
            }
        }
        get cursorIdx() {
            return internal(this).cursorIdx;
        }
        set cursorIdx(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.cursorIdx !== newValue) {
                    priv.cursorIdx = newValue;
                }
            }
        }
        get cursor() {
            return internal(this).cursor;
        }
        set cursor(newValue) {
            const priv = internal(this);
            if (priv.cursor !== newValue) {
                priv.cursor = newValue;
            }
        }
        get numFields() {
            return internal(this).numFields;
        }
        set numFields(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.numFields !== newValue) {
                    priv.numFields = newValue;
                }
            }
        }
        get numRecords() {
            return internal(this).numRecords;
        }
        set numRecords(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.numRecords !== newValue) {
                    priv.numRecords = newValue;
                }
            }
        }
        get keyValues() {
            return internal(this).keyValues;
        }
        set keyValues(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.keyValues !== newValue) {
                    priv.keyValues = newValue;
                }
            }
        }
        get dataSource() {
            return internal(this).dataSource;
        }
        set dataSource(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.DataSource) {
                if (priv.dataSource !== newValue) {
                    priv.active = false;
                    priv.dataSource = newValue;
                    priv.active = true;
                }
            }
        }
        /**
         * Return the active status
         * @returns     {Boolean}       the active status
         */
        get active() {
            return _active;
        }
        /**
         * Set the active status of the dataset
         * @param   {Boolean}       newValue        the new active status
         */
        set active(newValue) {
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (_active !== newValue) {
                    _active = newValue;
                    if (_active) {
                        this.open();
                        this.getKeyValues();
                        _cursorIdx = 0;
                    } else {
                        this.close();
                    }
                }
            }
        }
        get activeOnLoad() {
            return internal(this).activeOnLoad;
        }
        get isOpen() {
            return internal(this).isOpen;
        }
        set isOpen(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.isOpen !== newValue) {
                    priv.isOpen = newValue;
                }
            }
        }
        /**
         * Return the key field
         * @returns     {String}        the key field
         */
        get keyField() {
            return internal(this).keyField;
        }
        /**
         * Set the keyField value
         * @param   {String}        newValue        the new key field
         */
        set keyField(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.keyField !== newValue) {
                    priv.keyField = newValue;
                    priv.dataSource.refreshControls();
                }
            }
        }
        //#endregion
        //#region Methods
        /**
         * Open the dataset
         */
        open() {
            if (!this.data.isEmpty) {
                this.cursorIdx = 0;
                this.cursor = this.data[this.cursorIdx];
                this.isOpen = true;
                this.dataSource.refreshControls();
            }
        }
        /**
         * Close the dataset
         */
        close() {
            this.isOpen = false;
            this.cursorIdx = -1;
            this.keyValues = String.EMPTY;
            this.dataSource.refreshControls();
        }
        /**
         * Move the dataset pointer to the next record
         */
        next() {
            this.cursorIdx++;
            if (this.cursorIdx > this.numRecords) {
                this.cursorIdx = this.numRecords - 1;
            }
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        /**
         * Move the dataset pointer to the previous record
         */
        prev() {
            this.cursorIdx--;
            if (this.cursorIdx < 0) {
                this.cursorIdx = 0;
            }
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        /**
         * Move the dataset pointer to the first record
         */
        first() {
            this.cursorIdx = 0;
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        /**
         * Move the dataset pointer to the last record
         */
        last() {
            this.cursorIdx = this.numRecords - 1;
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        /**
         * Indicate if the dataset contains a key field
         * @return  {Boolean}       true
         */
        hasKeyfield() {
            return !this.keyFields.isEmpty;
        }
        /**
         * Get the key values in the dataset
         */
        getKeyValues() {
            let values = null;
            if (this.keyFields !== String.EMPTY) {
                const keyFields = this.keyFields.split(",");
                const cursor = this.data[this.cursorIdx];
                this.keyValues = String.EMPTY;
                keyFields.forEach((key, i) => {
                    if (cursor[key]) {
                        if (i > 0) {
                            values += "|";
                        }
                        values += cursor[key];
                    }
                });
                this.keyValues = values;
            }
        }
        /**
         * Go to the current cursor
         */
        goToCurrentCursor() {
            const keyValues = this.keyValues;
            const keyFields = this._keyFields.split(",");
            let idx = -1;
            this.data.filter((e, i) => {
                let ret = false;
                let keyValue = String.EMPTY;
                keyFields.forEach((key, j) => {
                    if (j > 0) {
                        keyValue += "|";
                    }
                    keyValue += e[key];
                });
                if (keyValue === keyValues) {
                    ret = true;
                    idx = i;
                }
                return ret;
            }
            );
            this.cursorIdx = idx;
            this.cursor = this.data[this.cursorIdx];
        }
        /**
         * Sort all records by string value
         * @param       {Number}        col         Column index
         * @param       {String}        order       The order direction
         * @returns     {Number}        if is less than 0, sort a to an index lower than b, i.e. a comes first.
         *                              if returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
         *                              if is greater than 0, sort b to an index lower than a, i.e. b comes first.
         */
        sortByString(col, order) {
            return (a, b) => {
                let fieldsNames = Object.keys(a);
                a = a[fieldsNames[col]];
                fieldsNames = Object.keys(b);
                b = b[fieldsNames[col]];
                if (order === Types.SORTEDORDERS.ASC) {
                    return a === b ? 0 : a < b ? -1 : 1;
                } else {
                    return a === b ? 0 : a < b ? 1 : -1;
                }
            };
        }
        /**
         * Sort all records by date value
         * @param       {Number}        col         Column index
         * @param       {String}        order       The order direction
         * @returns     {Number}        if is less than 0, sort a to an index lower than b, i.e. a comes first.
         *                              if returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
         *                              if is greater than 0, sort b to an index lower than a, i.e. b comes first.
         */
        sortByDate(col, order) {
            return (a, b) => {
                let fieldsNames = Object.keys(a);
                a = a[fieldsNames[col]];
                fieldsNames = Object.keys(b);
                b = b[fieldsNames[col]];
                if (order === Types.SORTEDORDERS.ASC) {
                    return a === b ? 0 : a < b ? -1 : 1;
                } else {
                    return a === b ? 0 : a < b ? 1 : -1;
                }
            };
        }
        /**
         * Sort all records by number value
         * @param       {Number}        col         Column index
         * @param       {String}        order       The order direction
         * @returns     {Number}        if is less than 0, sort a to an index lower than b, i.e. a comes first.
         *                              if returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.
         *                              if is greater than 0, sort b to an index lower than a, i.e. b comes first.
         */
        sortByNumber(col, order) {
            return (a, b) => {
                let fieldsNames = Object.keys(a);
                a = ~~parseFloat(a[fieldsNames[col]]);
                fieldsNames = Object.keys(b);
                b = ~~parseFloat(b[fieldsNames[col]]);
                if (order === Types.SORTEDORDERS.ASC) {
                    return a === b ? 0 : a < b ? -1 : 1;
                } else {
                    return a === b ? 0 : a < b ? 1 : -1;
                }
            };
        }
        /**
         * Sort all records by boolean value
         * @param       {Number}        col         Column index
         * @param       {String}        order       The order direction
         * @returns     {Number}
         */
        sortByBoolean(col, order) {
            return (a, b) => {
                const BOOLEAN = Types.CONSTANTS.BOOLEAN;
                let fieldsNames = Object.keys(a);
                if (typeof a[fieldsNames[col]] === BOOLEAN) {
                    a = a[fieldsNames[col]];
                } else {
                    a = Convert.strToBool(a[fieldsNames[col]].toString());
                }
                fieldsNames = Object.keys(b);
                if (typeof b[fieldsNames[col]] === BOOLEAN) {
                    b = b[fieldsNames[col]];
                } else {
                    b = Convert.strToBool(b[fieldsNames[col]].toString());
                }
                if (order === Types.SORTEDORDERS.ASC) {
                    return a === b ? 0 : a < b ? -1 : 1;
                } else {
                    return a === b ? 0 : a < b ? 1 : -1;
                }
            };
        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            if (this.data) {
                this.data.destroy();
            }
            super.destroy();
        }
        //#endregion
    }
    return DataSet;
})();
Object.defineProperties(DataSet, {
    "dataSource": {
        enumerable: true
    },
    "active": {
        enumerable: true
    },
    "isOpen": {
        enumerable: true
    },
    "keyField": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.NONVISUAL, DataSet);
export { DataSet };