//#region Imports
import { Convert } from '/scripts/core/convert.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion
//#region DataSet
/**
 * Class representing a DataSet.
 * @extends {Component}
 */
const DataSet = (() => {
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
                const priv = internal(this);
                priv.data = [];
                priv.cursorIdx = -1;
                priv.cursor = null;
                priv.numFields = 0;
                priv.numRecords = 0;
                priv.keyValues = props.hasOwnProperty('keyValues') ? props.keyValues: String.EMPTY;
                priv.dataSource = props.hasOwnProperty('dataSource') ? props.dataSource : null;
                priv.active = props.hasOwnProperty('active') ? props.active: false;
                priv.activeOnLoad = props.hasOwnProperty('activeOnLoad') ? props.activeOnLoad: true;
                priv.isOpen = props.hasOwnProperty('isOpen') ? props.isOpen: false;
                priv.keyField = props.hasOwnProperty('keyField') ? props.keyField: String.EMPTY;
                this.addBindableProperties(['active', 'isOpen']);
            }
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region data
        get data() {
            return internal(this).data;
        }
        set data(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Array.isArray(newValue)) {
                if (priv.data !== newValue) {
                    priv.data = newValue;
                }
            }
        }
        //#endregion data
        //#region cursorIdx
        get cursorIdx() {
            return internal(this).cursorIdx;
        }
        set cursorIdx(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.cursorIdx !== newValue) {
                    priv.cursorIdx = newValue;
                }
            }
        }
        //#endregion cursorIdx
        //#region cursor
        get cursor() {
            return internal(this).cursor;
        }
        set cursor(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.cursor !== newValue) {
                priv.cursor = newValue;
            }
        }
        //#endregion cursor
        //#region numFields
        get numFields() {
            return internal(this).numFields;
        }
        set numFields(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.numFields !== newValue) {
                    priv.numFields = newValue;
                }
            }
        }
        //#endregion numFields
        //#region numRecords
        get numRecords() {
            return internal(this).numRecords;
        }
        set numRecords(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.numRecords !== newValue) {
                    priv.numRecords = newValue;
                }
            }
        }
        //#endregion numRecords
        //#region keyValues
        get keyValues() {
            return internal(this).keyValues;
        }
        set keyValues(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.keyValues !== newValue) {
                    priv.keyValues = newValue;
                }
            }
        }
        //#endregion keyValues
        //#region dataSource
        get dataSource() {
            return internal(this).dataSource;
        }
        set dataSource(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.DataSource) {
                if (priv.dataSource !== newValue) {
                    priv.active = false;
                    priv.dataSource = newValue;
                    priv.active = true;
                }
            }
        }
        //#endregion dataSource
        /**
         * Return the active status
         * @returns     {Boolean}       the active status
         */
        //#region active
        get active() {
            return _active;
        }
        /**
         * Set the active status of the dataset
         * @param   {Boolean}       newValue        the new active status
         */
        set active(newValue) {
            if (Tools.isBool(newValue)) {
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
        //#endregion active
        //#region activeOnLoad
        get activeOnLoad() {
            return internal(this).activeOnLoad;
        }
        //#endregion activeOnLoad
        //#region isOpen
        get isOpen() {
            return internal(this).isOpen;
        }
        set isOpen(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.isOpen !== newValue) {
                    priv.isOpen = newValue;
                }
            }
        }
        //#endregion isOpen
        /**
         * Return the key field
         * @returns     {String}        the key field
         */
        //#region keyField
        get keyField() {
            return internal(this).keyField;
        }
        /**
         * Set the keyField value
         * @param   {String}        newValue        the new key field
         */
        set keyField(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.keyField !== newValue) {
                    priv.keyField = newValue;
                    priv.dataSource.refreshControls();
                }
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
            if (!this.data.isEmpty) {
                this.cursorIdx = 0;
                this.cursor = this.data[this.cursorIdx];
                this.isOpen = true;
                this.dataSource.refreshControls();
            }
        }
        //#endregion open
        /**
         * Close the dataset
         */
        //#region close
        close() {
            this.isOpen = false;
            this.cursorIdx = -1;
            this.keyValues = String.EMPTY;
            this.dataSource.refreshControls();
        }
        //#endregion close
        /**
         * Move the dataset pointer to the next record
         */
        //#region next
        next() {
            this.cursorIdx++;
            if (this.cursorIdx > this.numRecords) {
                this.cursorIdx = this.numRecords - 1;
            }
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        //#endregion next
        /**
         * Move the dataset pointer to the previous record
         */
        //#region prev
        prev() {
            this.cursorIdx--;
            if (this.cursorIdx < 0) {
                this.cursorIdx = 0;
            }
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        //#endregion prev
        /**
         * Move the dataset pointer to the first record
         */
        //#region first
        first() {
            this.cursorIdx = 0;
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        //#endregion first
        /**
         * Move the dataset pointer to the last record
         */
        //#region last
        last() {
            this.cursorIdx = this.numRecords - 1;
            this.getKeyValues();
            this.dataSource.refreshControls();
        }
        //#endregion last
        /**
         * Indicate if the dataset contains a key field
         * @return  {Boolean}       true
         */
        //#region hasKeyfield
        hasKeyfield() {
            return !this.keyFields.isEmpty;
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
            if (!String.isNullOrEmpty(this.keyFields)) {
                const keyFields = this.keyFields.split(',');
                const cursor = this.data[this.cursorIdx];
                this.keyValues = String.EMPTY;
                keyFields.forEach((key, i) => {
                    if (cursor[key]) {
                        if (i > 0) {
                            values += '|';
                        }
                        values += cursor[key];
                    }
                });
                this.keyValues = values;
            }
        }
        //#endregion getKeyValues
        /**
         * Go to the current cursor
         */
        //#region goToCurrentCursor
        goToCurrentCursor() {
            //#region Variables déclaration
            const keyValues = this.keyValues;
            const keyFields = this._keyFields.split(',');
            let idx = -1;
            //#endregion Variables déclaration
            this.data.filter((e, i) => {
                let ret = false;
                let keyValue = String.EMPTY;
                keyFields.forEach((key, j) => {
                    if (j > 0) {
                        keyValue += '|';
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
                if (order === Types.SORTEDORDERS.ASC) {
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
                if (order === Types.SORTEDORDERS.ASC) {
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
                if (Tools.isBool(a[fieldsNames[col]])) {
                    a = a[fieldsNames[col]];
                } else {
                    a = Convert.strToBool(a[fieldsNames[col]].toString());
                }
                fieldsNames = Object.keys(b);
                if (Tools.isBool(b[fieldsNames[col]])) {
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
        //#endregion sortByBoolean
        /**
         * Destroy all properties of the instance
         * @override
         */
        //#region destroy
        destroy() {
            if (this.data) {
                this.data.destroy();
            }
            super.destroy();
        }
        //#endregion destroy
        //#endregion
    }
    return DataSet;
    //#region DataSet
})();
//#region DataSet
//#region DataSet defineProperties
Object.defineProperties(DataSet, {
    'dataSource': {
        enumerable: true
    },
    'active': {
        enumerable: true
    },
    'isOpen': {
        enumerable: true
    },
    'keyField': {
        enumerable: true
    }
});
//#endregion DataSet defineProperties
Core.classes.register(Types.CATEGORIES.NONVISUAL, DataSet);
export { DataSet };