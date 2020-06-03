//#region BaseClass
/**
 * Base class of all object in JaGui
 */
//#region BaseClass
class BaseClass {
    /**
     * Create a new instance of BaseClass.
     */
    constructor(props) {
        props = !props ? {} : props;
        this.internalKey = String.uniqueId();
        core.private(this, {
            propsEnums: {},
            name: props.hasOwnProperty('name') ? props.name : this.constructor.name,
            props
        });
    }
    //#region Getter / Setter
    //#region name
    get name() {
        return core.private(this).name;
    }
    set name(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = this.form;
        let name = priv.name;
        //#endregion Variables déclaration
        if (!String.isNullOrEmpty(newValue) && !String.isNullOrEmpty(newValue.trim())
            && name !== newValue) {
            form !== this && form && form[name] && (delete form[name]);
            priv.name = name = newValue;
            form !== this && this !== form.layout && this !== form.content && form && !form[name]
                && (form[name] = this);
        }
    }
    //#endregion name
    //#region propsEnums
    get propsEnums() {
        return core.private(this).propsEnums;
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
    destroy() {
        delete this.propsEnums;
        core.destroyPrivate(this);
    }
    addPropertyEnum(propName, _enum) {
        this.propsEnums[propName] = _enum;
    }
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, BaseClass);
//#endregion BaseClass
export { BaseClass };