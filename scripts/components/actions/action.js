//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion
//#region Action
/**
 * Class representing an Action.
 * @extends {Component}
 */
const Action = (() => {
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
    //#region Action
    class Action extends BaseClass {
        /**
         * Create a new instance of Action.
         * @param    {object}    owner  Owner of the Action.
         * @param    {object}    props  Properties to initialize the Action.
         */
        //#region constructor
        constructor( props) {
            props = !props ? {} : props;
            if (owner) {
                super(props);
                const priv = internal(this);
                priv.propertiesToUpdate = ['caption', 'isChecked', 'enabled', 'groupIndex', 'hint', 'imageIndex', 'shortCut', 'visible', 'autoCheck'];
                priv.caption = String.EMPTY;
                priv.isChecked = !1;
                priv.enabled = !0;
                priv.groupIndex = 0;
                priv.hint = String.EMPTY;
                priv.imageIndex = -1;
                priv.shortCut = String.EMPTY;
                priv.autoCheck = !1;
                priv.targets = [];
                priv.owner = owner;
                priv.visible = !1;
            }
        }
        //#endregion constructor
        //#region Getter / Setters
        //#region targets
        get targets() {
            return internal(this).targets;
        }
        //#endregion targets
        //#region propertiesToUpdate
        get propertiesToUpdate() {
            return internal(this).propertiesToUpdate;
        }
        //#endregion propertiesToUpdate
        /**
         * @return  {String}    the caption property
         */
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        /**
         * Set the caption property
         * @param   {String}    newValue    the new value
         */
        set caption(newValue) {
            const priv = internal(this);
            if (core.core.tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    this.change();
                }
            }
        }
        //#endregion caption
        /**
         * @return  {Boolean}   the isChecked property
         */
        //#region isChecked
        get isChecked() {
            return internal(this).isChecked;
        }
        /**
         * Set the isChecked property
         * @param   {String}    newValue    the new value
         */
        set isChecked(newValue) {
            const priv = internal(this);
            if (core.core.tools.isBool(newValue)) {
                if (priv.isChecked !== newValue) {
                    priv.isChecked = newValue;
                    this.change();
                }
            }
        }
        //#endregion isChecked
        /**
         * @return  {Boolean}   the enabled property
         */
        //#region enabled
        get enabled() {
            return internal(this).enabled;
        }
        /**
         * Set the enabled property
         * @param   {String}    newValue    the new value
         */
        set enabled(newValue) {
            const priv = internal(this);
            if (core.core.tools.isBool(newValue)) {
                if (priv.enabled !== newValue) {
                    priv.enabled = newValue;
                    this.change();
                }
            }
        }
        //#endregion enabled
        /**
         * @return  {Number}    the groupIndex property
         */
        //#region groupIndex
        get groupIndex() {
            return internal(this).groupIndex;
        }
        /**
         * Set the groupIndex property
         * @param   {String}    newValue    the new value
         */
        set groupIndex(newValue) {
            const priv = internal(this);
            if (core.core.tools.isNumber(newValue)) {
                if (priv.groupIndex !== newValue) {
                    priv.groupIndex = newValue;
                    this.change();
                }
            }
        }
        //#endregion groupIndex
        /**
         * @return  {String}    the hint property
         */
        //#region hint
        get hint() {
            return internal(this).hint;
        }
        /**
         * Set the hint property
         * @param   {String}    newValue    the new value
         */
        set hint(newValue) {
            const priv = internal(this);
            if (core.core.tools.isString(newValue)) {
                if (priv.hint !== newValue) {
                    priv.hint = newValue;
                    this.change();
                }
            }
        }
        //#endregion hint
        /**
         * @return  {Number}    the imageIndex property
         */
        //#region imageIndex
        get imageIndex() {
            return internal(this).imageIndex;
        }
        /**
         * Set the imageIndex property
         * @param   {String}    newValue    the new value
         */
        set imageIndex(newValue) {
            const priv = internal(this);
            if (core.core.tools.isNumber(newValue)) {
                if (priv.imageIndex !== newValue) {
                    priv.imageIndex = newValue;
                    this.change();
                }
            }
        }
        //#endregion imageIndex
        /**
         * @return  {String}    the shortCut property
         */
        //#region shortCut
        get shortCut() {
            return internal(this).shortCut;
        }
        /**
         * Set the shortCut property
         * @param   {String}    newValue    the new value
         */
        set shortCut(newValue) {
            const priv = internal(this);
            if (core.core.tools.isString(newValue)) {
                if (priv.shortCut !== newValue) {
                    priv.shortCut = newValue;
                    this.change();
                }
            }
        }
        //#endregion shortCut
        /**
         * @return  {Boolean}   the autoCheck property
         */
        //#region autoCheck
        get autoCheck() {
            return internal(this).autoCheck;
        }
        /**
         * Set the autoCheck property
         * @param   {String}    newValue    the new value
         */
        set autoCheck(newValue) {
            const priv = internal(this);
            if (core.tools.isBool(newValue)) {
                if (priv.autoCheck !== newValue) {
                    priv.autoCheck = newValue;
                    this.change();
                }
            }
        }
        //#endregion autoCheck
        /**
         * @return  {Boolean}   the visible property
         */
        //#region visible
        get visible() {
            return internal(this).visible;
        }
        /**
         * Set the visible property
         * @param   {String}    newValue    the new value
         */
        set visible(newValue) {
            const priv = internal(this);
            if (core.tools.isBool(newValue)) {
                if (priv.visible !== newValue) {
                    priv.visible = newValue;
                    this.change();
                }
            }
        }
        //#endregion visible
        //#endregion Getter / Setter
        //#region Methods
        /**
         * Execute all events associated with the Action
         */
        //#region execute
        execute() {
            this.onExecute.invoke();
        }
        //#endregion execute
        /**
         * Register a component to update when Action is updated
         * @param   {Component} component   the component to register
         */
        //#region registerChanges
        registerChanges(component) {
            const targets = priv.targets;
            if (targets.indexOf(component) === -1) {
                targets.push(component);
                this.updateTarget(component);
            }
        }
        //#endregion registerChanges
        /**
         * Unregister a component
         * @param   {Component} component   the component to unregister
         */
        //#region unRegisterChanges
        unRegisterChanges(component) {
            const targets = priv.targets;
            if (targets.indexOf(component) > -1) {
                targets.remove(component);
            }
        }
        //#endregion unRegisterChanges
        /**
         * Update all components registered
         * @param   {HTMLElement}   target  the HTMLElement to update
         */
        //#region updateTarget
        updateTarget(target) {
            priv.propertiesToUpdate.forEach(prop => {
                if (target.hasOwnProperty(prop)) {
                    /*if (typeof target[this._propertiesToUpdate[j].firstCharUpper()] === _const.FUNCTION)*/
                    target[prop.firstCharUpper()] = this[prop];
                }
            });
        }
        //#endregion updateTarget
        /**
         * A property has changed, call updateTarget
         */
        //#region change
        change() {
            priv.targets.forEach(target => {
                this.updateTarget(target);
            });
        }
        //#endregion change
        /**
         * Destroy all properties of the instance
         * @override
         */
        //#region destroy
        destroy() {
            priv.targets.forEach(target => {
                target.action = null;
            });
            targets.clear();
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Action;
    //#region Action
})();
//#region Action defineProperties
Object.defineProperties(Action, {
    'caption': {
        enumerable: !0
    },
    'isChecked': {
        enumerable: !0
    },
    'enabled': {
        enumerable: !0
    },
    'groupIndex': {
        enumerable: !0
    },
    'hint': {
        enumerable: !0
    },
    'imageIndex': {
        enumerable: !0
    },
    'shortCut': {
        enumerable: !0
    },
    'autoCheck': {
        enumerable: !0
    }
});
//#endregion Action defineProperties
//#endregion Action
core.classes.register(core.types.CATEGORIES.ACTIONS, Action);
export { Action };