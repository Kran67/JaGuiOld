//#region Imports
import { Component } from '/scripts/core/component.js';
//#endregion
//#region BaseEffect
/**
 * Class representing an base class of all effect in JaGui
 * @extend  {Component}
 */
//#region BaseEffect
class BaseEffect extends Component {
    //#region Private fields
    #enabled = !1;
    #trigger = String.EMPTY;
    #prepareBeforePaint = !1;
    #applyOnChilds = !1;
    #disablePaint = !1;
    //#endregion Private fields
    /**
     * Create a new instance of BaseEffect.
     * @param   {owner}     owner   the owner of the effect
     */
    //#region Getters / Setters
    //#region enabled
    /**
     * Get the enabled property
     */
    get enabled() {
        return this.#enabled;
    }
    /**
     * Set the enabled property
     */
    set enabled(newValue) {
        //#region Variables déclaration
        const owner = this.#owner;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#enabled !== newValue) {
            //let lastRect = owner.screenRect();
            this.#enabled = newValue;
            owner.form.addControlToRedraw(owner);
        }
    }
    //#endregion enabled
    //#region trigger
    /**
     * Get the trigger property
     */
    get trigger() {
        return this.#trigger;
    }
    /**
     * Set the trigger property
     */
    set trigger(newValue) {
        !String.isNullOrEmpty(newValue) && this.#trigger !== newValue
            && (this.#trigger = newValue);
    }
    //#endregion trigger
    //#region prepareBeforePaint
    /**
     * Get the prepareBeforePaint property
     */
    get prepareBeforePaint() {
        return this.#prepareBeforePaint;
    }
    /**
     * Set the prepareBeforePaint property
     */
    set prepareBeforePaint(newValue) {
        core.tools.isBool(newValue) && this.#prepareBeforePaint !== newValue
            (this.#prepareBeforePaint = newValue);
    }
    //#endregion prepareBeforePaint
    //#region applyOnChilds
    /**
     * Get the applyOnChilds property
     */
    get applyOnChilds() {
        return this.#applyOnChilds;
    }
    /**
     * Set the applyOnChilds property
     */
    set applyOnChilds(newValue) {
        core.tools.isBool(newValue) && this.#applyOnChilds !== newValue
            && (this.#applyOnChilds = newValue);
    }
    //#endregion applyOnChilds
    //#region disablePaint
    /**
     * Get the disablePaint property
     * @return  {Boolean}
     */
    get disablePaint() {
        return this.#disablePaint;
    }
    /**
     * Set the disablePaint property
     * @param   {Boolean}  newValue    -
     */
    set disablePaint(newValue) {
        core.tools.isBool(newValue) && this.#disablePaint !== newValue
            && (this.#disablePaint = newValue);
    }
    //#endregion disablePaint
    //#endregion Getters / Setters
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
            line = this.trigger;
            let setter = null;
            setter = line.split(";");
            let startValue = !1;
            startValue = !1;
            while (setter.length > 0) {
                prop = setter[0].split("=")[0];
                value = setter[0].split("=")[1];
                instance.hasOwnProperty(prop)
                    && (startValue = instance[prop].toString().toLowerCase() === value.toLowerCase());
                setter.removeAt(0);
            }
            this.enabled = startValue;
        }
    }
    //#endregion
}
//#endregion
core.classes.register(core.types.CATEGORIES.INTERNAL, BaseEffect);
export { BaseEffect };