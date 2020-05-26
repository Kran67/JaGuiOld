//#region BaseClass
/**
 * Base class of all object in JaGui
 */
const BaseClass = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#region BaseClass
    class BaseClass {
        /**
         * Create a new instance of BaseClass.
         */
        constructor(props) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            props = !props ? {} : props;
            //priv.stopEvent = props.hasOwnProperty('stopEvent') && core.tools.isBool(props.stopEvent)
            //    ? props.stopEvent : !0;
            priv.propsEnums = {};
            priv.name = props.hasOwnProperty('name') ? props.name : this.constructor.name;
        }
        //#region Getter / Setter
        //#region name
        get name() {
            return internal(this).name;
        }
        set name(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            let name = priv.name;
            //#endregion Variables déclaration
            if (!String.isNullOrEmpty(newValue) && !String.isNullOrEmpty(newValue.trim())
                && priv.name !== newValue) {
                form !== this && form && form[name] && (delete form[name]);
                name = priv.name = newValue;
                form !== this && this !== form.layout && this !== form.content && form && !form[name]
                    && (form[name] = this);
            }
        }
        //#endregion name
        //#region propsEnums
        get propsEnums() {
            return internal(this).propsEnums;
        }
        //#endregion propsEnums
        //#region stopEvent
        //get stopEvent() {
        //    return internal(this).stopEvent;
        //}
        //set stopEvent(newValue) {
        //    //#region Variables déclaration
        //    const priv = internal(this);
        //    //#endregion Variables déclaration
        //    core.tools.isBool(newValue) && priv.stopEvent !== newValue && (priv.stopEvent = newValue);
        //}
        //#endregion stopEvent
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
        }
        addPropertyEnum(propName, _enum) {
            this.propsEnums[propName] = _enum;
        }
        //#endregion Methods
    }
    return BaseClass;
    //#endregion BaseClass
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, BaseClass);
//#endregion BaseClass
export { BaseClass };