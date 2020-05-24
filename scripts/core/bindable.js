//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion
//#region Bindable
/**
 * Class representing a component support binding.
 * @extends {BaseClass}
 */
const Bindable = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Bindable
    class Bindable extends BaseClass {
        /**
         * Create a new instance of Bindable.
         */
        constructor(props) {
            super(props);
            const priv = internal(this);
            priv.dataBindings = props && props.hasOwnProperty('dataBindings') ? props.dataBindings : [];
        }
        //#region Getters / Setters
        //#region dataBindings
        get dataBindings() {
            return internal(this).dataBindings;
        }
        //#endregion dataBindings
        //#endregion Getters / Setters
        //#region Methods
        //#region addDataBindings
        addDataBindings(dataBindings) {
            Array.isArray(dataBindings)
                && dataBindings.forEach(dataBinding => {
                    this.addDataBinding(...dataBinding);
                });
        }
        //#endregion addDataBindings
        //#region removeDataBindings
        removeDataBindings(dataBindings) {
            Array.isArray(dataBindings)
                && dataBindings.forEach(dataBinding => {
                    this.removeDataBinding(...dataBinding);
                });
        }
        //#endregion removeDataBindings
        //#region propertyChanged
        propertyChanged(property) {
            //#region Variables déclaration
            const priv = internal(this);
            const dataBindings = priv.dataBindings;
            const form = this.form;
            //#endregion Variables déclaration
            dataBindings.find(item => item.property === property)
                && dataBindings.filter(item => item.property === property)
                    .forEach(dataBinding => {
                        const destination = dataBinding.destination;
                        if (form[destination.component]) {
                            const sourceProperty = this[property];
                            const destControl = form[destination.component];
                            const destProperty = destControl[destination.property];
                            let value = this[property];
                            //destination.method && (value = core.tools[destination.expression](value));
                            //destination.expression && (value = core.tools[destination.expression](value));
                            destination.convertor && (value = Convert[destination.convertor](value));
                            //destination.format && (value = value[format]());
                            core.tools.isObject(sourceProperty) && core.tools.isObject(destProperty) 
                                && core.tools.isFunc(destProperty.assign) 
                                ? destProperty.assign(value)
                                : destControl[destination.property] = value;
                        }
                    });
        }
        //#endregion propertyChanged
        //#region addDataBinding
        addDataBinding(property, component, propertyComponent) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            const dataBinding = {
                property,
                destination: {
                    component,
                    property: propertyComponent
                }
            }
            //#endregion Variables déclaration
            if (!core.tools.isUndefined(this[property]) && form && form[component]) {
                if (!core.tools.isUndefined(form[component][propertyComponent]) &&
                    typeof this[property] === typeof form[component][propertyComponent]) {
                    priv.dataBindings.push(dataBinding);
                } else {
                    console.log('');
                }
            }
        }
        //#endregion addDataBinding
        //#region removeDataBinding
        removeDataBinding(property, component) {
            //#region Variables déclaration
            const priv = internal(this);
            const dataBindings = priv.dataBindings;
            const dataBindingsFromOtherProperty = dataBindings.filter(item => { return item.property !== property; });
            const dataBindingsFromProperty = dataBindings.filter(item => { return item.property === property && item.destination.component !== component; });
            //#endregion Variables déclaration
            priv.dataBindings = [...dataBindingsFromOtherProperty, ...dataBindingsFromProperty];
        }
        //#endregion removeDataBinding
        //#region clear
        clear() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.dataBindings.length = 0;
        }
        //#endregion clear
        //#region destroy
        destroy() {
            this.clear();
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Bindable;
    //#endregion Bindable
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, Bindable);
//#endregion Bindable
export { Bindable };