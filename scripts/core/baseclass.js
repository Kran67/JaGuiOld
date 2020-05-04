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
        constructor(owner, props) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.tag = null;
            priv.propsEnums = {};
        }
        //#region Getter / Setter
        get propsEnums() {
            return internal(this).propsEnums;
        }
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
            this.tag != null && core.tools.isObject(this.tag) && core.tools.isFunc(this.tag.destroy)
                && this.tag.destroy();
            this.tag = null;
            delete this.tag;
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