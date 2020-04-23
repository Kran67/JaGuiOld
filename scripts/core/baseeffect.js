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
    class BaseEffect {
        /**
         * Create a new instance of BaseEffect.
         * @param   {owner}     owner   the owner of the effect
         */
        //#region constructor
        constructor(owner) {
            //#region Properties
            //#region Private Properties
            const priv = internal(this);
            priv.owner = owner;
            priv.enabled = !1;
            priv.trigger = String.EMPTY;
            priv.prepareBeforePaint = !1;
            priv.applyOnChilds = !1;
            priv.disablePaint = !1;
            //#endregion Private Properties
            //#region Public Properties
            Object.defineProperties(this, {
                'enabled': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).enabled;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const owner = priv.owner;
                        //#endregion Variables déclaration
                        if (core.tools.isBool(newValue) && priv.enabled !== newValue) {
                            priv.enabled = newValue;
                            owner.form.addControlToRedraw(owner);
                        }
                    }
                },
                'trigger': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).trigger;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        String.isNullOrEmpty(newValue) && priv.trigger !== newValue
                            ? priv.trigger = newValue
                            : 1;
                    }
                },
                'prepareBeforePaint': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).prepareBeforePaint;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.prepareBeforePaint !== newValue
                            ? priv.prepareBeforePaint = newValue
                            : 1;
                    }
                },
                'applyOnChilds': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).applyOnChilds;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.applyOnChilds !== newValue
                            ? priv.applyOnChilds = newValue
                            : 1;
                    }
                },
                'disablePaint': {
                    enumerable: !0,
                    configurable: !0,
                    get: function () {
                        return internal(this).disablePaint;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isBool(newValue) && priv.disablePaint !== newValue
                            ? priv.disablePaint = newValue
                            : 1;
                    }
                }
            });
            //#endregion Public Properties
            //#endregion Properties
        }
        //#region constructor
        //#region Methods
        /**
         * rect
         * @param {Rect} rect - the rect
         * @abstract
         */
        //#region rect
        rect(rect) { }
        //#endregion rect
        /**
         * Apply the effect
         * @abstract
         */
        //#region applyEffect
        applyEffect() { }
        //#endregion applyEffect
        /**
         * Apply the effect with a trigger
         * @param {Control} instance - the control to apply the effect
         * @param {String} trigger - the trigger property
         */
        //#region applyTrigger
        applyTrigger(instance, trigger) {
            //#region Variables déclaration
            const priv = internal(this);
            let prop = null;
            let value = null;
            //#endregion Variables déclaration
            if (instance && this.trigger.toLowerCase().indexOf(trigger.toLowerCase()) > -1) {
                let line = null;
                line = this.trigger;
                let setter = null;
                setter = line.split(";");
                let startValue = !1;
                startValue = !1;
                while (setter.length > 0) {
                    prop = setter[0].split("=")[0];
                    value = setter[0].split("=")[1];
                    if (instance.hasOwnProperty(prop)) {
                        startValue = instance[prop].toString().toLowerCase() === value.toLowerCase();
                    }
                    setter.removeAt(0);
                }
                priv.enabled = startValue;
            }
        }
        //#endregion applyTrigger
        //#region destroy
        destroy() {
            priv.owner = null;
            priv.enabled = null;
            priv.trigger = null;
            priv.prepareBeforePaint = null;
            priv.applyOnChilds = null;
            priv.disablePaint = null;
            delete this.enabled;
            delete this.trigger;
            delete this.prepareBeforePaint;
            delete this.applyOnChilds;
            delete this.disablePaint;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return BaseEffect;
    //#endregion BaseEffect
})();
core.classes.register(core.types.CATEGORIES.INTERNAL, BaseEffect);
//#endregion
export { BaseEffect };