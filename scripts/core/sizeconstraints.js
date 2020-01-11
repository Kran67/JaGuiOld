import { BaseClass } from "/scripts/core/baseclass.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//import { Control } from "/scripts/components/control.js";
//#region SizeConstraints
const SizeConstraints = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class SizeConstraints extends BaseClass {
        constructor(control) {
            if (!(control instanceof Core.classes.Control)) {
                return;
            }
            super();
            const priv = internal(this);
            priv.control = control;
            priv.maxHeight = 0;
            priv.maxWidth = 0;
            priv.minHeight = 0;
            priv.minWidth = 0;
            this.onChange = new Core.classes.NotifyEvent(control);
        }
        get control() {
            return internal(this).control;
        }
        set control(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Control) {
                if (newValue !== priv.control) {
                    priv.control = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get maxHeight() {
            return internal(this).maxHeight;
        }
        set maxHeight(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.maxHeight) {
                    priv.maxHeight = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get maxWidth() {
            return internal(this).maxWidth;
        }
        set maxWidth(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.maxWidth) {
                    priv.maxWidth = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get minHeight() {
            return internal(this).minHeight;
        }
        set minHeight(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.minHeight) {
                    priv.minHeight = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get minWidth() {
            return internal(this).minWidth;
        }
        set minWidth(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.minWidth) {
                    priv.minWidth = newValue;
                    this.onChange.invoke();
                }
            }
        }
        get isEmpty() {
            const priv = internal(this);
            return priv.maxHeight === 0 && priv.maxWidth === 0 && priv.minHeight === 0 && priv.minWidth === 0;
        }
        get properties() {
            const props = Tools.getPropertiesFromObject(this);
            return props;
        }
        //#region Methods
        setConstraints(index, value) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            const minHeight = this.minHeight;
            const maxHeight = this.maxHeight;
            const minWidth = this.minWidth;
            const maxWidth = this.maxWidth;
            if (typeof index === NUMBER && typeof value === NUMBER) {
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
        change() { this.onChange.invoke(); }
        setValues(minWidth, minHeight, maxWidth, maxHeight) {
            const NUMBER = Types.CONSTANTS.NUMBER;
            if (typeof minWidth === NUMBER && typeof minHeight === NUMBER && typeof maxWidth === NUMBER && typeof maxHeight === NUMBER) {
                this.maxHeight = maxHeight;
                this.maxWidth = maxWidth;
                this.minHeight = minHeight;
                this.minWidth = minWidth;
            }
        }
        assignTo(dest) {
            if (dest instanceof Core.classes.SizeConstraints) {
                dest.minHeight = this.minHeight;
                dest.maxHeight = this.maxHeight;
                dest.minWidth = this.minWidth;
                dest.maxWidth = this.maxWidth;
                dest.change();
            }
        }
        destroy() {
            this.onChange.destroy();
        }
        equals(sizeConstraints) {
            return this.maxHeight === sizeConstraints.maxHeight && this.maxWidth === sizeConstraints.maxWidth &&
                this.minHeight === sizeConstraints.minHeight && this.minWidth === sizeConstraints.minWidth;
        }
        //#endregion
    }
    return SizeConstraints;
})();
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
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, SizeConstraints);
export { SizeConstraints };