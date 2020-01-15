//#region Imports
import { BaseClass } from "/scripts/core/baseclass.js";
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
        constructor() {
            super();
            const priv = internal(this);
            priv.dataBindings = {};
            //#region Private properties
            //#endregion
            //Tools.Debugger.log(arguments,this,t);
        }
        //#region Getter / Setter
        get dataBindings() {
            return internal(this).dataBindings;
        }
        //#endregion Getter / Setter
        //#region Methods
        /**
         * Add properties can be binded
         * @param   {Array}     propNames       All properties to bind
         */
        addBindableProperties(propNames) {
            if (Array.isArray(propNames)) {
                propNames.forEach(propName => {
                    if (Core.bindableProperties.indexOf(propName.toUpperCase()) === -1) {
                        Core.bindableProperties.push(propName);
                        Core.bindableProperties[propName.toUpperCase()] = propName;
                    }
                });
            }
        }
        /**
         * Remove binded properties
         * @param   {Array}     propNames       All properties to bind
         */
        removeBindableProperties(propNames) {
            if (Array.isArray(propNames)) {
                propNames.forEach(propName => {
                    //if (Core.bindableProperties.indexOf(propNames[i]) > -1)
                    //{
                    //    Core.bindableProperties.remove(propNames[i]);
                    //    delete bindableProperties[propNames[i].toUpperCase()];
                    //    //Types.bindableProperties[propNames[i].toUpperCase()]=propNames[i];
                    //}
                });
            }
        }
        /**
         * The property has changed, report new value to binded property on another components
         * @param   {Array}     propName       The changed property
         */
        propertyChanged(propName) {
            //var t=new Date().getTime();
            //var infos,value;
            //if(Control === null) return;
            //if($j.bindableProperties.indexOf(propName) === -1) return;
            //if(this instanceof $j.classes.Bindable) {
            //  for(var i=0,l=this._dataBindings.length;i<l;i++) {
            //    infos=this._dataBindings[i].split(",");
            //    if(this.form[infos[1]]) {
            //      if(!infos[0].includes(".")) {
            //        value=this[infos[0]];
            //        if(typeof this.form[infos[1]][infos[2]]==="string") value=value.toString();
            //        infos[2]=infos[2].firstCharUpper();
            //        //if (typeof this.form[infos[1]]["set"+infos[2]]===_const.FUNCTION) this.form[infos[1]]["set"+infos[2]](value);
            //        this.form[infos[1]][infos[2]]=value;
            //      } else {
            //      }
            //    }
            //  }
            //}
            //Tools.Debugger.log(arguments,this,t);
        }
        /**
         * Add a property to binding system from a component to another
         * @param   {String}        propertyToBind      Property to bind
         * @param   {String}        objectName          Component name to proterty binded
         * @param   {String}        objectProperty      Property to reveive the new value
         */
        addDataBinding(propertyToBind, objectName, objectProperty) {
            //var t=new Date().getTime();
            //this._dataBindings.push(propertyToBind+","+objectName+","+objectProperty);
            //var prop=objectProperty.firstCharUpper(),value=this[propertyToBind];
            //if(typeof this.form[objectName][objectProperty]==="string") value=value.toString();
            //this.form[objectName]["set"+prop](value);
            //this.form[objectName][prop]=value;
            //Tools.Debugger.log(arguments,this,t);
        }
        /**
         * Remove a property to binding system
         * @param   {String}        propertyToBind      Property to bind
         * @param   {String}        objectName          Component name to proterty binded
         */
        removeDataBinding(propertyToBind, objectName) {
            //var t=new Date().getTime();
            //if(this._dataBindings[propertyToBind]) {
            //  if(this._dataBindings[propertyToBind][objectName]) this._dataBindings[propertyToBind][objectName]=null;
            //}
            //Tools.Debugger.log(arguments,this,t);
        }
        /**
         * Remove all binded properties of this component
         */
        clearDataBinding() {

        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            internal(this).dataBindings.destroy();
            super.destroy();
        }
        //#endregion
    }
    return Bindable;
    //#endregion Bindable
})();
Core.classes.register(Types.CATEGORIES.INTERNAL, Bindable);
//#endregion
export { Bindable };