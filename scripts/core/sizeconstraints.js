//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region SizeConstraints
class SizeConstraints extends BaseClass {
    //#region Private fields
    #control;
    #maxHeight = 0;
    #maxWidth = 0;
    #minHeight = 0;
    #minWidth = 0;
    //#endregion Private fields
    //#region constructor
    constructor(control) {
        if (control instanceof core.classes.Control) {
            super();
            this.#control = control;
            this.onChange = new core.classes.NotifyEvent(control);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region control
    get control() {
        return this.#control;
    }
    set control(newValue) {
        if (newValue instanceof core.classes.Control && newValue !== this.#control) {
            this.#control = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion control
    //#region maxHeight
    get maxHeight() {
        return this.#maxHeight;
    }
    set maxHeight(newValue) {
        if (newValue instanceof core.classes.Control && newValue !== this.#maxHeight) {
            this.#maxHeight = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion maxHeight
    //#region maxWidth
    get maxWidth() {
        return this.#maxWidth;
    }
    set maxWidth(newValue) {
        if (newValue instanceof core.classes.Control && newValue !== this.#maxWidth) {
            this.#maxWidth = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion maxWidth
    //#region minHeight
    get minHeight() {
        return this.#minHeight;
    }
    set minHeight(newValue) {
        if (newValue instanceof core.classes.Control && newValue !== this.#minHeight) {
            this.#minHeight = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion minHeight
    //#region minWidth
    get minWidth() {
        return this.#minWidth;
    }
    set minWidth(newValue) {
        if (newValue instanceof core.classes.Control && newValue !== this.#minWidth) {
            this.#minWidth = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion minWidth
    //#region isEmpty
    get isEmpty() {
        return this.#maxHeight === 0 && this.#maxWidth === 0 && this.#minHeight === 0 && this.#minWidth === 0;
    }
    //#endregion isEmpty
    //#region properties
    get properties() {
        //#region Variables déclaration
        const props = core.tools.getPropertiesFromObject(this);
        //#endregion Variables déclaration
        return props;
    }
    //#endregion properties
    //#endregion Getters / Setters
    //#region Methods
    //#region setConstraints
    setConstraints(index, value) {
        //#region Variables déclaration
        const minHeight = this.#minHeight;
        const maxHeight = this.#maxHeight;
        const minWidth = this.#minWidth;
        const maxWidth = this.#maxWidth;
        //#endregion Variables déclaration
        if (core.tools.isNumber(index) && core.tools.isNumber(value)) {
            switch (index) {
                case 0:
                    if (value !== maxHeight) {
                        this.maxHeight = value;
                        value > 0 && value < minHeight && (this.#minHeight = value);
                        this.change();
                    }
                    break;
                case 1:
                    if (value !== maxWidth) {
                        this.maxWidth = value;
                        value > 0 && value < minWidth && (this.#minWidth = value);
                        this.change();
                    }
                    break;
                case 2:
                    if (value !== minHeight) {
                        this.minHeight = value;
                        maxHeight > 0 && value > maxHeight && (this.#maxHeight = value);
                        this.change();
                    }
                    break;
                case 3:
                    if (value !== minWidth) {
                        this.minWidth = value;
                        maxWidth > 0 && value > maxWidth && (this.#maxWidth = value);
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
        if (typeof minWidth === NUMBER && typeof minHeight === NUMBER && typeof maxWidth === NUMBER
            && typeof maxHeight === NUMBER) {
            this.maxHeight = maxHeight;
            this.maxWidth = maxWidth;
            this.minHeight = minHeight;
            this.minWidth = minWidth;
        }
    }
    //#endregion setValues
    //#region assignTo
    assignTo(dest) {
        if (dest instanceof core.classes.SizeConstraints) {
            dest.minHeight = this.#minHeight;
            dest.maxHeight = this.#maxHeight;
            dest.minWidth = this.#minWidth;
            dest.maxWidth = this.#maxWidth;
            dest.change();
        }
    }
    //#endregion assignTo
    //#region destroy
    destroy() {
        this.onChange.destroy();
        this.onChange = null;
        delete this.onChange;
        super.destroy();
    }
    //#endregion destroy
    //#region equals
    equals(sizeConstraints) {
        return this.#maxHeight === sizeConstraints.maxHeight && this.#maxWidth === sizeConstraints.maxWidth &&
            this.#minHeight === sizeConstraints.minHeight && this.#minWidth === sizeConstraints.minWidth;
    }
    //#endregion equals
    //#endregion Methods
}
Object.defineProperties(SizeConstraints.prototype, {
    'maxHeight': {
        enumerable: !0
    },
    'maxWidth': {
        enumerable: !0
    },
    'minHeight': {
        enumerable: !0
    },
    'minWidth': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, SizeConstraints);
//#endregion SizeConstraints
export { SizeConstraints };