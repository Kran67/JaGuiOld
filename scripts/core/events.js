//#region Imports
//#endregion
class Events {
    //#region Methods
    static bind(object, eventName, callBack) {
        const CONSTANTS = Types.CONSTANTS;
        if (typeof callBack === CONSTANTS.FUNCTION && object && typeof eventName === CONSTANTS.STRING) {
            object.addEventListener(eventName, callBack, true);
        }
    }
    static unBind(object, eventName, callBack) {
        const CONSTANTS = Types.CONSTANTS;
        if (typeof callBack === CONSTANTS.FUNCTION && object && typeof eventName === CONSTANTS.STRING) {
            object.removeEventListener(eventName, callBack, true);
        }
    }
    static stop(eventArg) {
        eventArg.cancelBubble = true;
        eventArg.stopPropagation();
        eventArg.preventDefault();
    }
    static whichTransitionEvent() {
        const el = document.createElement('fakeelement'), transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };
        const props = Object.keys(transitions);
        for (let i = 0; i < props.length; i++) {
            if (el.style[props[i]] !== undefined) {
                return transitions[props[i]];
            }
        }
    }
    static whichAnimationEvent() {
        const el = document.createElement('fakeelement'), transitions = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'animationend',
            WebkitAnimation: 'webkitAnimationEnd'
        };
        const props = Object.keys(transitions);
        for (let i = 0; i < props.length; i++) {
            if (el.style[props[i]] !== undefined) {
                return transitions[props[i]];
            }
        }
    }
    //#endregion Methods
}
/**
 * Class representing a NotifyEvent.
 */
//#region NotifyEvent
class NotifyEvent {
    /**
     * Create a new instance of NotifyEvent.
     * @param       {Component}     sender      The component can invoke the event
     */
    constructor(sender) {
        //let _stopPropagation = false;
        const _listeners = [];
        const _sender = sender;
        Object.defineProperties(this, {
            //"stopPropagation": {
            //    get: () => {
            //        return _stopPropagation;
            //    },
            //    set: (newValue) => {
            //        if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
            //            if (_stopPropagation !== newValue) {
            //                _stopPropagation = newValue;
            //            }
            //        }
            //    }
            //},
            "listeners": {
                get: () => {
                    return _listeners;
                }
            },
            "sender": {
                get: () => {
                    return _sender;
                }
            }
        });
    }
    /**
        * Check if the notifyEvent has listeners
        */
    get hasListener() {
        return this.listeners.length > 0;
    }
    //#region Methods
    /**
     * Add a listener to the event
     * @param       {Function}      f       The fonction to execute when component invoke the event
     * @param       {Number}        d       The delay before executing the function
     */
    addListener(f, d) {
        const CONSTANTS = Types.CONSTANTS;
        if (typeof f === CONSTANTS.FUNCTION) {
            d = d | 0;
            this.listeners.push({ func: f, delay: d });
        }
    }
    /**
     * Remove a listener to the event
     * @param       {Function}      f       The fonction to execute when component invoke the event
     */
    removeListener(f) {
        if (typeof f === Types.CONSTANTS.FUNCTION) {
            const index = this.listeners.findIndex(elem => {
                return elem.func === f;
            });
            if (index > -1) {
                this.listeners[index].func = null;
                this.listeners.removeAt(index);
            }
        }
    }
    /**
     * Copy all listeners to another NotifyEvent
     * @param       {Array}      notifyEvent        The notifyEvent to add listeners
     */
    copyListenerTo(notifyEvent) {
        if (notifyEvent && notifyEvent instanceof Core.classes.NotifyEvent) {
            this.listeners.forEach(listener => {
                if (typeof this.listeners[i].func === Types.CONSTANTS.FUNCTION) {
                    notifyEvent.addListener(listener.func, listener.delay);
                }
            });
        }
    }
    /**
     * Execute all listeners
     */
    invoke() {
        if (this.hasListener/* && this.stopPropagation*/) {
            this.listeners.forEach(listener => {
                const func = listener.func;
                const delay = listener.delay;
                if (delay > 0) {
                    setTimeout(((sender, args) => {
                        func.apply(sender, args);
                    })(this.sender, arguments), delay);
                } else {
                    func.apply(this.sender, arguments);
                }
            });
        }
    }
    /**
     * Clear the listeners
     */
    clearListeners() {
        //for (let i = 0, l = this.listeners.length; i < l; i++) {
        //    if (this.listeners[i] && this.listeners[i].func) {
        //        if (typeof this.listeners[i].func === Types.CONSTANTS.FUNCTION) this.removeListener(this.listeners[i].func);
        //    }
        //}
        this.listeners.length = 0;
    }
    /**
     * Destroy all properties of the instance
     */
    destroy() {
        this.listeners.destroy();
    }
    //#endregion
}
//#endregion
/**
 * Class representing a TimerEvent.
 */
//#region TimerEvent
class TimerEvent {
    /**
     * Create a new instance of TimerEvent.
     * @param       {Component}     sender      The component can invoke the event
     */
    constructor() {
        Core.looper.addListener(this, "_onTimerEvent");
    }
    //#region Methods
    /**
     * Function to execute when the timer tick
     * @override
     */
    _onTimerEvent() { }
    //#endregion
}
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, NotifyEvent, TimerEvent);
export { Events, NotifyEvent, TimerEvent };