﻿//#region Imports
import { Convert } from '/scripts/core/convert.js';
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
                //#region Properties
                //#region Private Properties
                const priv = internal(this);
                priv.data = [];
                priv.cursorIdx = -1;
                priv.cursor = null;
                priv.numFields = 0;
                priv.numRecords = 0;
                priv.keyValues = props.hasOwnProperty('keyValues') ? props.keyValues : String.EMPTY;
                priv.dataSource = props.hasOwnProperty('dataSource') ? props.dataSource : null;
                priv.active = props.hasOwnProperty('active') ? props.active : !1;
                priv.activeOnLoad = props.hasOwnProperty('activeOnLoad') ? props.activeOnLoad : !0;
                priv.isOpen = props.hasOwnProperty('isOpen') ? props.isOpen : !1;
                priv.keyField = props.hasOwnProperty('keyField') ? props.keyField : String.EMPTY;
                //#endregion Private Properties
                //#region Public Properties
                Object.defineProperties(this, {
                    'data': {
                        enumerable: !1,
                        configurable: !0,
                        get: function () {
                            return internal(this).data;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            Array.isArray(newValue) && priv.data !== newValue ? priv.data = newValue : 1;
                        }
                    },
                    'cursorIdx': {
                        enumerable: !1,
                        configurable: !0,
                        get: function () {
                            return internal(this).cursorIdx;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            core.tools.isNumber(newValue) && priv.cursorIdx !== newValue ? priv.cursorIdx = newValue : 1;
                        }
                    },
                    'cursor': {
                        enumerable: !1,
                        configurable: !0,
                        get: function () {
                            return internal(this).cursor;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            priv.cursor !== newValue ? priv.cursor = newValue : 1;
                        }
                    },
                    'numFields': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).numFields;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            core.tools.isNumber(newValue) && priv.numFields !== newValue ? priv.numFields = newValue : 1;
                        }
                    },
                    'numRecords': {
                        enumerable: !1,
                        configurable: !0,
                        get: function () {
                            return internal(this).numRecords;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            core.tools.isNumber(newValue) && priv.numRecords !== newValue ? priv.numRecords = newValue : 1;
                        }
                    },
                    'keyValues': {
                        enumerable: !1,
                        configurable: !0,
                        get: function () {
                            return internal(this).keyValues;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            core.tools.isString(newValue) && priv.keyValues !== newValue ? priv.keyValues = newValue : 1;
                        }
                    },
                    'dataSource': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).dataSource;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
                            //#endregion Variables déclaration
                            if (newValue instanceof core.classes.DataSource && priv.dataSource !== newValue) {
                                priv.active = !1;
                                priv.dataSource = newValue;
                                priv.active = !0;
                            }
                        }
                    },
                    'active': {
                        enumerable: !0,
                        configurable: !0,
                        get: function () {
                            return internal(this).active;
                        },
                        set: function (newValue) {
                            //#region Variables déclaration
                            const priv = internal(this);
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
                    },
                    '': {
                        enumerable: !0,
                        configurable: !0,

                    },
                    '': {
                        enumerable: !0,
                        configurable: !0,

                    },
                    '': {
                        enumerable: !0,
                        configurable: !0,

                    },
                    '': {
                        enumerable: !0,
                        configurable: !0,

                    },
                });
                //#endregion Public Properties
                //#endregion Properties
            }
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region data
        //#endregion data
        //#region cursorIdx
        //#endregion cursorIdx
        //#region cursor
        //#endregion cursor
        //#region numFields
        //#endregion numFields
        //#region numRecords
        //#endregion numRecords
        //#region keyValues
        //#endregion keyValues
        //#region dataSource
        //#endregion dataSource
        /**
         * Return the active status
         * @returns     {Boolean}       the active status
         */
        //#region active
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
            if (core.tools.isBool(newValue)) {
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
            if (core.tools.isString(newValue)) {
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
            //#region Variables déclaration
            const priv = internal(this);
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
            const priv = internal(this);
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
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.cursorIdx++;
            if (priv.cursorIdx > priv.numRecords) {
                priv.cursorIdx = priv.numRecords - 1;
            }
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
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.cursorIdx--;
            if (priv.cursorIdx < 0) {
                priv.cursorIdx = 0;
            }
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
            const priv = internal(this);
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
            const priv = internal(this);
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
            const priv = internal(this);
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
            const priv = internal(this);
            let values = null;
            //#endregion Variables déclaration
            if (!String.isNullOrEmpty(priv.keyFields)) {
                const keyFields = this.keyFields.split(',');
                const cursor = priv.data[priv.cursorIdx];
                priv.keyValues = String.EMPTY;
                keyFields.forEach((key, i) => {
                    if (cursor[key]) {
                        if (i > 0) {
                            values += '|';
                        }
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
            const priv = internal(this);
            const keyValues = prvi.keyValues;
            const keyFields = prvi.keyFields.split(',');
            let idx = -1;
            //#endregion Variables déclaration
            priv.data.filter((e, i) => {
                let ret = !1;
                let keyValue = String.EMPTY;
                keyFields.forEach((key, j) => {
                    if (j > 0) {
                        keyValue += '|';
                    }
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
                a = ~~parseFloat(a[fieldsNames[col]]);
                fieldsNames = Object.keys(b);
                b = ~~parseFloat(b[fieldsNames[col]]);
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
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.cursorIdx = null;
            priv.cursor = null;
            priv.numFields = null;
            priv.numRecords = null;
            priv.keyValues = null;
            priv.dataSource = null;
            priv.active = null;
            priv.activeOnLoad = null;
            priv.isOpen = null;
            priv.keyField = null;
            if (priv.data) {
                priv.data.destroy();
            }
            priv.data = null;
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
        enumerable: !0
    },
    'active': {
        enumerable: !0
    },
    'isOpen': {
        enumerable: !0
    },
    'keyField': {
        enumerable: !0
    }
});
//#endregion DataSet defineProperties
core.classes.register(core.types.CATEGORIES.NONVISUAL, DataSet);
export { DataSet };