//#region Imports
import { Component } from "/scripts/core/component.js";
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
    class BaseEffect extends Component {
        /**
         * Create a new instance of BaseEffect.
         * @param   {owner}     owner   the owner of the effect
         */
        constructor(owner) {
            super(owner);
            const priv = internal(this);
            priv.enabled = false;
            priv.trigger = String.EMPTY;
            priv.prepareBeforePaint = false;
            priv.applyOnChilds = false;
            priv.disablePaint = false;
        }
        //#region Getter/Setter
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
            const priv = internal(this);
            const owner = priv.owner;
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.enabled !== newValue) {
                    //let lastRect = owner.screenRect();
                    priv.enabled = newValue;
                    owner.form.addControlToRedraw(owner);
                }
            }
        }
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
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.trigger !== newValue) {
                    priv.trigger = newValue;
                }
            }
        }
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
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.prepareBeforePaint !== newValue) {
                    priv.prepareBeforePaint = newValue;
                }
            }
        }
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
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.applyOnChilds !== newValue) {
                    priv.applyOnChilds = newValue;
                }
            }
        }
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
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.disablePaint !== newValue) {
                    priv.disablePaint = newValue;
                }
            }
        }
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
            let startValue = false;
            let line = null;
            let setter = null;
            let prop = null;
            let value = null;
            if (instance && this.trigger.toLowerCase().indexOf(trigger.toLowerCase()) > -1) {
                line = this._trigger;
                setter = line.split(";");
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
})();
Object.defineProperties(BaseEffect, {
    "enabled": {
        enumerable: true
    },
    "trigger": {
        enumerable: true
    },
    "prepareBeforePaint": {
        enumerable: true
    },
    "applyOnChilds": {
        enumerable: true
    },
    "disablePaint": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, BaseEffect);
export { BaseEffect };