//#region Imports
import { Component } from '/scripts/core/component.js';
//#endregion
//#region BaseEffect
/**
 * Class representing an base class of all effect in JaGui
 * @extend  {Component}
 */
const BaseEffect = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#region BaseEffect
    class BaseEffect extends Component {
        /**
         * Create a new instance of BaseEffect.
         * @param   {owner}     owner   the owner of the effect
         */
        //#region constructor
        constructor(owner) {
            super(owner);
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.enabled = false;
            priv.trigger = String.EMPTY;
            priv.prepareBeforePaint = false;
            priv.applyOnChilds = false;
            priv.disablePaint = false;
        }
        //#region constructor
        //#region Getter/Setter
        //#region enabled
        /**
         * Get the enabled property
         */
        get enabled() {
            return internal(this).enabled;
        }
        /**
         * Set the enabled property
         */
        set enabled(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = priv.owner;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.enabled !== newValue) {
                    //let lastRect = owner.screenRect();
                    priv.enabled = newValue;
                    owner.form.addControlToRedraw(owner);
                }
            }
        }
        //#endregion enabled
        //#region trigger
        /**
         * Get the trigger property
         */
        get trigger() {
            return internal(this).trigger;
        }
        /**
         * Set the trigger property
         */
        set trigger(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (String.isNullOrEmpty(newValue)) {
                if (priv.trigger !== newValue) {
                    priv.trigger = newValue;
                }
            }
        }
        //#endregion trigger
        //#region prepareBeforePaint
        /**
         * Get the prepareBeforePaint property
         */
        get prepareBeforePaint() {
            return internal(this).prepareBeforePaint;
        }
        /**
         * Set the prepareBeforePaint property
         */
        set prepareBeforePaint(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.prepareBeforePaint !== newValue) {
                    priv.prepareBeforePaint = newValue;
                }
            }
        }
        //#endregion prepareBeforePaint
        //#region applyOnChilds
        /**
         * Get the applyOnChilds property
         */
        get applyOnChilds() {
            return internal(this).applyOnChilds;
        }
        /**
         * Set the applyOnChilds property
         */
        set applyOnChilds(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.applyOnChilds !== newValue) {
                    priv.applyOnChilds = newValue;
                }
            }
        }
        //#endregion applyOnChilds
        //#region disablePaint
        /**
         * Get the disablePaint property
         * @return  {Boolean}
         */
        get disablePaint() {
            return internal(this).disablePaint;
        }
        /**
         * Set the disablePaint property
         * @param   {Boolean}  newValue    -
         */
        set disablePaint(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.disablePaint !== newValue) {
                    priv.disablePaint = newValue;
                }
            }
        }
        //#endregion disablePaint
        //#endregion
        //#region Methods
        /**
         * rect
         * @param {Rect} rect - the rect
         * @abstract
         */
        rect(rect) { }
        /**
         * Apply the effect
         * @abstract
         */
        applyEffect() { }
        /**
         * Apply the effect with a trigger
         * @param {Control} instance - the control to apply the effect
         * @param {String} trigger - the trigger property
         */
        applyTrigger(instance, trigger) {
            //#region Variables déclaration
            let prop = null;
            let value = null;
            //#endregion Variables déclaration
            if (instance && this.trigger.toLowerCase().indexOf(trigger.toLowerCase()) > -1) {
                let line = null;
                line = this._trigger;
                let setter = null;
                setter = line.split(";");
                let startValue = false;
                startValue = false;
                while (setter.length > 0) {
                    prop = setter[0].split("=")[0];
                    value = setter[0].split("=")[1];
                    if (instance.hasOwnProperty(prop)) {
                        startValue = instance[prop].toString().toLowerCase() === value.toLowerCase();
                    }
                    setter.removeAt(0);
                }
                this.enabled = startValue;
            }
        }
        //#endregion
    }
    return BaseEffect;
    //#endregion BaseEffect
})();
//#region BaseEffect defineProperties
Object.defineProperties(BaseEffect, {
    'enabled': {
        enumerable: true
    },
    'trigger': {
        enumerable: true
    },
    'prepareBeforePaint': {
        enumerable: true
    },
    'applyOnChilds': {
        enumerable: true
    },
    'disablePaint': {
        enumerable: true
    }
});
//#endregion BaseEffect defineProperties
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, BaseEffect);
export { BaseEffect };