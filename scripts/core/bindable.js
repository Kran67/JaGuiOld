//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Tools } from '/scripts/core/tools.js';
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
        if (!_private.has(key)) {
            _private.set(key, {});
        }
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
            super();
            const priv = internal(this);
            priv.dataBindings = props && props.hasOwnProperty('dataBindings') ? props.dataBindings : [];
        }
        //#region Getter / Setter
        //#region dataBindings
        get dataBindings() {
            return internal(this).dataBindings;
        }
        //#endregion dataBindings
        //#endregion Getter / Setter
        //#region Methods
        //#region addDataBindings
        addDataBindings(dataBindings) {
            if (Array.isArray(dataBindings)) {
                dataBindings.forEach(dataBinding => {
                    this.addDataBinding(...dataBinding);
                });
            }
        }
        //#endregion addDataBindings
        //#region removeDataBindings
        removeDataBindings(dataBindings) {
            if (Array.isArray(dataBindings)) {
                dataBindings.forEach(dataBinding => {
                    this.removeDataBinding(...dataBinding);
                });
            }
        }
        //#endregion removeDataBindings
        //#region propertyChanged
        propertyChanged(property) {
            //#region Variables déclaration
            const priv = internal(this);
            const dataBindings = priv.dataBindings;
            const form = this.form;
            //#endregion Variables déclaration
            if (dataBindings.find(item => item.property === property)) {
                dataBindings.filter(item => item.property === property)
                    .forEach(dataBinding => {
                        const destination = dataBinding.destination;
                        if (form[destination.component]) {
                            form[destination.component][destination.property] = this[property];
                        }
                    });
            }
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
            if (!Tools.isUndefined(this[property])) {
                if (form && form[component]) {
                    if (!Tools.isUndefined(form[component][propertyComponent]) &&
                        typeof this[property] === typeof form[component][propertyComponent]) {
                        priv.dataBindings.push(dataBinding);
                    } else {
                        console.log('');
                    }
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
Core.classes.register(Types.CATEGORIES.INTERNAL, Bindable);
//#endregion Bindable
export { Bindable };