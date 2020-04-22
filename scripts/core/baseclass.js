//#region BaseClass
/**
 * Base class of all object in JaGui
 */
const BaseClass = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#region BaseClass
    class BaseClass {
        /**
         * Create a new instance of BaseClass.
         */
        constructor(props) {
            props = !props ? {} : props;
            //#region Properties
            //#region Private Properties
            const priv = internal(this);
            priv.propsEnums = {};
            priv.name = props.hasOwnProperty('name') ? props.name : String.EMPTY;
            //#endregion Private Properties
            //#region Public Properties
            this.tag = null;
            Object.defineProperties(this, {
                'name': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).name;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const form = priv.form;
                        let name = priv.name;
                        //#endregion Variables déclaration
                        if (String.isNullOrEmpty(newValue) && newValue.trim() !== String.EMPTY) {
                            if (priv.name !== newValue) {
                                form !== this && form && form[name] ? delete form[name] : 1;
                                name = priv.name = newValue;
                                form !== this && this !== form.layout && this !== form.content
                                    ? form && !form[name]
                                        ? form[name] = this
                                        : 1
                                    : 1;
                            }
                        }
                    }
                },
                'propsEnums': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).propsEnums;
                    }
                }
            });
            //#endregion Public Properties
            //#endregion Properties
        }
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.tag != null && core.tools.isObject(this.tag) && core.tools.isFunc(this.tag.destroy) ? this.tag.destroy() : 1;
            this.tag = null;
            delete this.tag;
            delete priv.propsEnums;
            delete this.propsEnums;
            delete this.name;
        }
        //#endregion Methods
    }
    return BaseClass;
    //#endregion BaseClass
})();
//#endregion
core.classes.register(core.types.CATEGORIES.INTERNAL, BaseClass);
export { BaseClass };