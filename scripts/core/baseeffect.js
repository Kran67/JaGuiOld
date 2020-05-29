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
    /**
     * Create a new instance of BaseEffect.
     * @param   {owner}     owner   the owner of the effect
     */
    //#region constructor
    constructor(owner) {
        super(owner);
        core.private(this, { enabled: !1, trigger: String.EMPTY, prepareBeforePaint: !1, applyOnChilds: !1, disablePaint: !1 });
    }
    //#region constructor
    //#region Getters / Setters
    //#region enabled
    /**
     * Get the enabled property
     */
    get enabled() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    /**
     * Set the enabled property
     */
    set enabled(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        const owner = priv.owner;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv[propName] !== newValue) {
            //let lastRect = owner.screenRect();
            core.private(this, { [propName]: newValue });
            owner.form.addControlToRedraw(owner);
        }
    }
    //#endregion enabled
    //#region trigger
    /**
     * Get the trigger property
     */
    get trigger() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    /**
     * Set the trigger property
     */
    set trigger(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        !String.isNullOrEmpty(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion trigger
    //#region prepareBeforePaint
    /**
     * Get the prepareBeforePaint property
     */
    get prepareBeforePaint() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    /**
     * Set the prepareBeforePaint property
     */
    set prepareBeforePaint(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion prepareBeforePaint
    //#region applyOnChilds
    /**
     * Get the applyOnChilds property
     */
    get applyOnChilds() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    /**
     * Set the applyOnChilds property
     */
    set applyOnChilds(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
    }
    //#endregion applyOnChilds
    //#region disablePaint
    /**
     * Get the disablePaint property
     * @return  {Boolean}
     */
    get disablePaint() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    /**
     * Set the disablePaint property
     * @param   {Boolean}  newValue    -
     */
    set disablePaint(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue
            && core.private(this, { [propName]: newValue });
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