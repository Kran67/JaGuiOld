//#region BaseClass
/**
 * Base class of all object in JaGui
 */
//#region BaseClass
class BaseClass {
    //#region Private fields
    #propsEnums;
    #name;
    //#endregion Private fields
    /**
     * Create a new instance of BaseClass.
     */
    constructor(props) {
        props = !props ? {} : props;
        this.internalKey = String.uniqueId();
        this.#propsEnums = {};
        this.#name = props.hasOwnProperty('name') ? props.name : this.constructor.name;
        this.props = props;
    }
    //#region Getter / Setter
    //#region name
    get name() {
        return this.#name;
    }
    set name(newValue) {
        //#region Variables déclaration
        const form = this.form;
        let name = this.#name;
        //#endregion Variables déclaration
        if (!String.isNullOrEmpty(newValue) && !String.isNullOrEmpty(newValue.trim())
            && name !== newValue) {
            form !== this && form && form[name] && (delete form[name]);
            this.#name = name = newValue;
            form !== this && this !== form.layout && this !== form.content && form && !form[name] && this.inform
                && (form[name] = this);
        }
    }
    //#endregion name
    //#region propsEnums
    get propsEnums() {
        return this.#propsEnums;
    }
    //#endregion propsEnums
    //#endregion Getter / Setter
    //#region Methods
    /**
     * Mixin for classes
     * @param       {Class}         _baseClass      The baseClass to mixin
     * @param       {Array}         mixins          Classes to copy
     * @returns     {Class}         The baseClass mixined
     */
    static inherits(_baseClass, ...mixins) {
        const base = class _Combined extends _baseClass {
            constructor(...args) {
                super(...args);
                mixins.forEach((mixin) => {
                    mixin.prototype.initializer.call(this);
                });
            }
        };
        const copyProps = (target, source) => {
            Object.getOwnPropertyNames(source)
                .concat(Object.getOwnPropertySymbols(source))
                .forEach((prop) => {
                    if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                        return;
                    Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
                });
        };
        mixins.forEach((mixin) => {
            copyProps(base.prototype, mixin.prototype);
            copyProps(base, mixin);
        });
        return base;
    }
    /**
     * Destroy all properties of the instance
     * @override
     */
    destroy() { }
    addPropertyEnum(propName, _enum) {
        this.#propsEnums[propName] = _enum;
    }
    //#endregion Methods
}
Object.defineProperties(BaseClass.prototype, {
    'name': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, BaseClass);
//#endregion BaseClass
export { BaseClass };