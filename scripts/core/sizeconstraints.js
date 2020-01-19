//#region Imports
import { BaseClass } from "/scripts/core/baseclass.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//import { Control } from "/scripts/components/control.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Imports
//#region SizeConstraints
const SizeConstraints = (() => {
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
    //#region SizeConstraints
    class SizeConstraints extends BaseClass {
        //#region constructor
        constructor(control) {
            if (control instanceof Core.classes.Control) {
                super();
                const priv = internal(this);
                priv.control = control;
                priv.maxHeight = 0;
                priv.maxWidth = 0;
                priv.minHeight = 0;
                priv.minWidth = 0;
                this.onChange = new Core.classes.NotifyEvent(control);
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region control
        get control() {
            return internal(this).control;
        }
        set control(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Control) {
                if (newValue !== priv.control) {
                    priv.control = newValue;
                    this.onChange.invoke();
                }
            }
        }
        //#endregion control
        //#region maxHeight
        get maxHeight() {
            return internal(this).maxHeight;
        }
        set maxHeight(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.maxHeight) {
                    priv.maxHeight = newValue;
                    this.onChange.invoke();
                }
            }
        }
        //#endregion maxHeight
        //#region maxWidth
        get maxWidth() {
            return internal(this).maxWidth;
        }
        set maxWidth(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.maxWidth) {
                    priv.maxWidth = newValue;
                    this.onChange.invoke();
                }
            }
        }
        //#endregion maxWidth
        //#region minHeight
        get minHeight() {
            return internal(this).minHeight;
        }
        set minHeight(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.minHeight) {
                    priv.minHeight = newValue;
                    this.onChange.invoke();
                }
            }
        }
        //#endregion minHeight
        //#region minWidth
        get minWidth() {
            return internal(this).minWidth;
        }
        set minWidth(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.minWidth) {
                    priv.minWidth = newValue;
                    this.onChange.invoke();
                }
            }
        }
        //#endregion minWidth
        //#region isEmpty
        get isEmpty() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.maxHeight === 0 && priv.maxWidth === 0 && priv.minHeight === 0 && priv.minWidth === 0;
        }
        //#endregion isEmpty
        //#region properties
        get properties() {
            //#region Variables déclaration
            const props = Tools.getPropertiesFromObject(this);
            //#endregion Variables déclaration
            return props;
        }
        //#endregion properties
        //#endregion Getter / Setter
        //#region Methods
        //#region setConstraints
        setConstraints(index, value) {
            //#region Variables déclaration
            const minHeight = this.minHeight;
            const maxHeight = this.maxHeight;
            const minWidth = this.minWidth;
            const maxWidth = this.maxWidth;
            //#endregion Variables déclaration
            if (Tools.isNumber(index) && Tools.isNumber(value)) {
                switch (index) {
                    case 0:
                        if (value !== maxHeight) {
                            this.maxHeight = value;
                            if (value > 0 && value < minHeight) {
                                this.minHeight = value;
                            }
                            this.change();
                        }
                        break;
                    case 1:
                        if (value !== maxWidth) {
                            this.maxWidth = value;
                            if (value > 0 && value < minWidth) {
                                this.minWidth = value;
                            }
                            this.change();
                        }
                        break;
                    case 2:
                        if (value !== minHeight) {
                            this.minHeight = value;
                            if (maxHeight > 0 && value > maxHeight) {
                                this.maxHeight = value;
                            }
                            this.change();
                        }
                        break;
                    case 3:
                        if (value !== minWidth) {
                            this.minWidth = value;
                            if (maxWidth > 0 && value > maxWidth) {
                                this.maxWidth = value;
                            }
                            this.change();
                        }
                        break;
                }
            }
        }
        //#endregion setConstraints
        //#region change
        change() { this.onChange.invoke(); }
        //#endregion change
        //#region setValues
        setValues(minWidth, minHeight, maxWidth, maxHeight) {
            if (typeof minWidth === NUMBER && typeof minHeight === NUMBER && typeof maxWidth === NUMBER && typeof maxHeight === NUMBER) {
                this.maxHeight = maxHeight;
                this.maxWidth = maxWidth;
                this.minHeight = minHeight;
                this.minWidth = minWidth;
            }
        }
        //#endregion setValues
        //#region assignTo
        assignTo(dest) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (dest instanceof Core.classes.SizeConstraints) {
                dest.minHeight = priv.minHeight;
                dest.maxHeight = priv.maxHeight;
                dest.minWidth = priv.minWidth;
                dest.maxWidth = priv.maxWidth;
                dest.change();
            }
        }
        //#endregion assignTo
        //#region destroy
        destroy() {
            this.onChange.destroy();
        }
        //#endregion destroy
        //#region equals
        equals(sizeConstraints) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.maxHeight === sizeConstraints.maxHeight && priv.maxWidth === sizeConstraints.maxWidth &&
                priv.minHeight === sizeConstraints.minHeight && priv.minWidth === sizeConstraints.minWidth;
        }
        //#endregion equals
        //#endregion Methods
    }
    return SizeConstraints;
    //#endregion SizeConstraints
})();
//#region BaseWindow defineProperties
Object.defineProperties(SizeConstraints, {
    "maxHeight": {
        enumerable: true
    },
    "maxWidth": {
        enumerable: true
    },
    "minHeight": {
        enumerable: true
    },
    "minWidth": {
        enumerable: true
    }
});
//#endregion BaseWindow defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, SizeConstraints);
export { SizeConstraints };