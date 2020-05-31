//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region SizeConstraints
class SizeConstraints extends BaseClass {
    //#region constructor
    constructor(control) {
        if (control instanceof core.classes.Control) {
            super();
            core.private(this, {
                control,
                maxHeight: 0,
                maxWidth: 0,
                minHeight: 0,
                minWidth: 0
            });
            this.onChange = new core.classes.NotifyEvent(control);
        }
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region control
    get control() {
        return core.private(this).control;
    }
    set control(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'control';
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Control && newValue !== priv[propName]) {
            priv[propName] = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion control
    //#region maxHeight
    get maxHeight() {
        return core.private(this).maxHeight;
    }
    set maxHeight(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'maxHeight';
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Control && newValue !== priv[propName]) {
            priv[propName] = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion maxHeight
    //#region maxWidth
    get maxWidth() {
        return core.private(this).maxWidth;
    }
    set maxWidth(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'maxWidth';
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Control && newValue !== priv[propName]) {
            priv[propName] = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion maxWidth
    //#region minHeight
    get minHeight() {
        return core.private(this).minHeight;
    }
    set minHeight(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'minHeight';
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Control && newValue !== priv[propName]) {
            priv[propName] = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion minHeight
    //#region minWidth
    get minWidth() {
        return core.private(this).minWidth;
    }
    set minWidth(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = 'minWidth';
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Control && newValue !== priv[propName]) {
            priv[propName] = newValue;
            this.onChange.invoke();
        }
    }
    //#endregion minWidth
    //#region isEmpty
    get isEmpty() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.maxHeight === 0 && priv.maxWidth === 0 && priv.minHeight === 0 && priv.minWidth === 0;
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
        if (core.tools.isNumber(index) && core.tools.isNumber(value)) {
            switch (index) {
                case 0:
                    if (value !== maxHeight) {
                        this.maxHeight = value;
                        value > 0 && value < minHeight && (this.minHeight = value);
                        this.change();
                    }
                    break;
                case 1:
                    if (value !== maxWidth) {
                        this.maxWidth = value;
                        value > 0 && value < minWidth && (this.minWidth = value);
                        this.change();
                    }
                    break;
                case 2:
                    if (value !== minHeight) {
                        this.minHeight = value;
                        maxHeight > 0 && value > maxHeight && (this.maxHeight = value);
                        this.change();
                    }
                    break;
                case 3:
                    if (value !== minWidth) {
                        this.minWidth = value;
                        maxWidth > 0 && value > maxWidth && (this.maxWidth = value);
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (dest instanceof core.classes.SizeConstraints) {
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
        this.onChange = null;
        delete this.onChange;
        super.destroy();
    }
    //#endregion destroy
    //#region equals
    equals(sizeConstraints) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        return priv.maxHeight === sizeConstraints.maxHeight && priv.maxWidth === sizeConstraints.maxWidth &&
            priv.minHeight === sizeConstraints.minHeight && priv.minWidth === sizeConstraints.minWidth;
    }
    //#endregion equals
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, SizeConstraints);
//#endregion SizeConstraints
export { SizeConstraints };