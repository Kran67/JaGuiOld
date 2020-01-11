//#region Imports
import { Component } from "/scripts/core/component.js";
//import { NotifyEvent } from "/scripts/core/events.js";
//#endregion
//#region Action
/**
 * Class representing an Action.
 * @extends {Component}
 */
const Action = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Action extends Component {
        /**
         * Create a new instance of Action.
         * @param    {object}    owner  Owner of the Action.
         * @param    {object}    props  Properties to initialize the Action.
         */
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.propertiesToUpdate = ["caption", "isChecked", "enabled", "groupIndex", "hint", "imageIndex", "shortCut", "visible", "autoCheck"];
                priv.caption = String.EMPTY;
                priv.isChecked = false;
                priv.enabled = true;
                priv.groupIndex = 0;
                priv.hint = String.EMPTY;
                priv.imageIndex = -1;
                priv.shortCut = String.EMPTY;
                priv.autoCheck = false;
                priv.targets = [];
                const form = this.form;
                this.visible = true;
                this.addBindableProperties(["caption", "isChecked", "enabled", "imageIndex", "visible", "autoCheck"]);
                this.onHint = new Core.classes.NotifyEvent(this);
                this.onChange = new Core.classes.NotifyEvent(this);
                this.onExecute = new Core.classes.NotifyEvent(this);
                if (props.onExecute) {
                    if (form[props.onExecute]) {
                        this.onExecute.addListener(form[props.onExecute]);
                    } else if (typeof props.onExecute === Types.CONSTANTS.STRING) {
                        this.onExecute.addListener(new Function(props.onExecute));
                    }
                }
                this.onUpdate = new Core.classes.NotifyEvent(this);
            }
        }
        //#region Setters
        get targets() {
            return internal(this).targets;
        }
        get propertiesToUpdate() {
            return internal(this).propertiesToUpdate;
        }
        /**
         * @return  {String}    the caption property
         */
        get caption() {
            return internal(this).caption;
        }
        /**
         * Set the caption property
         * @param   {String}    newValue    the new value
         */
        set caption(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {Boolean}   the isChecked property
         */
        get isChecked() {
            return internal(this).isChecked;
        }
        /**
         * Set the isChecked property
         * @param   {String}    newValue    the new value
         */
        set isChecked(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.isChecked !== newValue) {
                    priv.isChecked = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {Boolean}   the enabled property
         */
        get enabled() {
            return internal(this).enabled;
        }
        /**
         * Set the enabled property
         * @param   {String}    newValue    the new value
         */
        set enabled(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.enabled !== newValue) {
                    priv.enabled = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {Number}    the groupIndex property
         */
        get groupIndex() {
            return internal(this).groupIndex;
        }
        /**
         * Set the groupIndex property
         * @param   {String}    newValue    the new value
         */
        set groupIndex(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.groupIndex !== newValue) {
                    priv.groupIndex = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {String}    the hint property
         */
        get hint() {
            return internal(this).hint;
        }
        /**
         * Set the hint property
         * @param   {String}    newValue    the new value
         */
        set hint(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.hint !== newValue) {
                    priv.hint = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {Number}    the imageIndex property
         */
        get imageIndex() {
            return internal(this).imageIndex;
        }
        /**
         * Set the imageIndex property
         * @param   {String}    newValue    the new value
         */
        set imageIndex(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.imageIndex !== newValue) {
                    priv.imageIndex = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {String}    the shortCut property
         */
        get shortCut() {
            return internal(this).shortCut;
        }
        /**
         * Set the shortCut property
         * @param   {String}    newValue    the new value
         */
        set shortCut(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.shortCut !== newValue) {
                    priv.shortCut = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {Boolean}   the autoCheck property
         */
        get autoCheck() {
            return internal(this).autoCheck;
        }
        /**
         * Set the autoCheck property
         * @param   {String}    newValue    the new value
         */
        set autoCheck(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.autoCheck !== newValue) {
                    priv.autoCheck = newValue;
                    this.change();
                }
            }
        }
        /**
         * @return  {Boolean}   the visible property
         */
        get visible() {
            return internal(this).visible;
        }
        /**
         * Set the visible property
         * @param   {String}    newValue    the new value
         */
        set visible(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.visible !== newValue) {
                    priv.visible = newValue;
                    this.change();
                }
            }
        }
        //#endregion
        //#region Methods
        /**
         * Execute all events associated with the Action
         */
        execute() {
            this.onExecute.invoke();
        }
        /**
         * Register a component to update when Action is updated
         * @param   {Component} component   the component to register
         */
        registerChanges(component) {
            const targets = this.targets;
            if (targets.indexOf(component) === -1) {
                targets.push(component);
                this.updateTarget(component);
            }
        }
        /**
         * Unregister a component
         * @param   {Component} component   the component to unregister
         */
        unRegisterChanges(component) {
            const targets = this.targets;
            if (targets.indexOf(component) > -1) {
                targets.remove(component);
            }
        }
        /**
         * Update all components registered
         * @param   {HTMLElement}   target  the HTMLElement to update
         */
        updateTarget(target) {
            this.propertiesToUpdate.forEach(prop => {
                if (target.hasOwnProperty(prop)) {
                    /*if (typeof target[this._propertiesToUpdate[j].firstCharUpper()] === _const.FUNCTION)*/
                    target[prop.firstCharUpper()] = this[prop];
                }
            });
        }
        /**
         * A property has changed, call updateTarget
         */
        change() {
            this.targets.forEach(target => {
                this.updateTarget(target);
            });
        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            this.targets.forEach(target => {
                target.action = null;
            });
            targets.clear();
            super.destroy();
        }
        //#endregion
    }
    return Action;
})();
Object.defineProperties(Action, {
    "caption": {
        enumerable: true
    },
    "isChecked": {
        enumerable: true
    },
    "enabled": {
        enumerable: true
    },
    "groupIndex": {
        enumerable: true
    },
    "hint": {
        enumerable: true
    },
    "imageIndex": {
        enumerable: true
    },
    "shortCut": {
        enumerable: true
    },
    "autoCheck": {
        enumerable: true
    }
});
//#endregion
Core.classes.register(Types.CATEGORIES.ACTIONS, Action);
export { Action };