//#region Events
class Events {
    //#region Methods
    //#region bind
    static bind(object, eventName, callBack) {
        core.tools.isFunc(callBack) && object && core.tools.isString(eventName)
            && object.addEventListener(eventName, callBack, !1);
    }
    //#endregion bind
    //#region unBind
    static unBind(object, eventName, callBack) {
        core.tools.isFunc(callBack) && object && core.tools.isString(eventName)
            && object.removeEventListener(eventName, callBack, !1);
    }
    //#endregion unBind
    //#region stop
    static stop(eventArg) {
        eventArg.cancelBubble = !0;
        eventArg.stopPropagation();
        eventArg.preventDefault();
    }
    //#endregion stop
    //#region whichTransitionEvent
    static whichTransitionEvent() {
        //#region Variables déclaration
        const el = document.createElement('fakeelement'), transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };
        const props = Object.keys(transitions);
        //#endregion Variables déclaration
        for (let i = 0; i < props.length; i++) {
            if (el.style[props[i]] !== undefined) {
                return transitions[props[i]];
            }
        }
    }
    //#endregion whichTransitionEvent
    //#region whichAnimationEvent
    static whichAnimationEvent() {
        //#region Variables déclaration
        const el = document.createElement('fakeelement'), transitions = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'animationend',
            WebkitAnimation: 'webkitAnimationEnd'
        };
        const props = Object.keys(transitions);
        //#endregion Variables déclaration
        for (let i = 0; i < props.length; i++) {
            if (el.style[props[i]] !== undefined) {
                return transitions[props[i]];
            }
        }
    }
    //#endregion whichAnimationEvent
    //#endregion Methods
}
//#endregion Events
/**
 * Class representing a NotifyEvent.
 */
//#region NotifyEvent
class NotifyEvent {
    //#region Private fields
    #listeners = [];
    #sender;
    //#endregion Private fields
    /**
     * Create a new instance of NotifyEvent.
     * @param       {Component}     sender      The component can invoke the event
     */
    //#region constructor
    constructor(sender) {
        this.#sender = sender;
    }
    //#endregion constructor
    //#region Getters / Setters
    /**
     * Check if the notifyEvent has listeners
     */
    //#region hasListener
    get hasListener() {
        return this.#listeners.length > 0;
    }
    //#endregion hasListener
    //#endregion Getters / Setters
    //#region Methods
    /**
     * Add a listener to the event
     * @param       {Function}      f       The fonction to execute when component invoke the event
     * @param       {Number}        d       The delay before executing the function
     */
    //#region addListener
    addListener(f, d) {
        if (core.tools.isFunc(f)) {
            d = d | 0;
            this.#listeners.push({ func: f, delay: d });
        }
    }
    //#endregion addListener
    /**
     * Remove a listener to the event
     * @param       {Function}      f       The fonction to execute when component invoke the event
     */
    //#region removeListener
    removeListener(f) {
        if (core.tools.isFunc(f)) {
            const index = this.#listeners.findIndex(elem => {
                return elem.func === f;
            });
            if (index > -1) {
                this.#listeners[index].func = null;
                this.#listeners.removeAt(index);
            }
        }
    }
    //#endregion removeListener
    /**
     * Copy all listeners to another NotifyEvent
     * @param       {Array}      notifyEvent        The notifyEvent to add listeners
     */
    //#region copyListenerTo
    copyListenerTo(notifyEvent) {
        if (notifyEvent && notifyEvent instanceof core.classes.NotifyEvent) {
            this.#listeners.forEach(listener => {
                core.tools.isFunc(this.#listeners[i].func)
                    && notifyEvent.addListener(listener.func, listener.delay);
            });
        }
    }
    //#endregion copyListenerTo
    /**
     * Execute all listeners
     */
    //#region invoke
    invoke() {
        if (this.hasListener/* && this.stopPropagation*/) {
            this.#listeners.forEach(listener => {
                const func = listener.func;
                const delay = listener.delay;
                if (delay > 0) {
                    setTimeout(((sender, args) => {
                        func.apply(sender, args);
                    })(this.#sender, arguments), delay);
                } else {
                    func.apply(this.#sender, arguments);
                }
            });
        }
    }
    //#endregion invoke
    /**
     * Clear the listeners
     */
    //#region clearListeners
    clearListeners() {
        this.#listeners.length = 0;
    }
    //#endregion clearListeners
    /**
     * Destroy all properties of the instance
     */
    //#region destroy
    destroy() {
        this.clearListeners();
        this.#listeners.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion NotifyEvent
/**
 * Class representing a TimerEvent.
 */
//#region TimerEvent
class TimerEvent {
    /**
     * Create a new instance of TimerEvent.
     * @param       {Component}     sender      The component can invoke the event
     */
    //#region constructor
    constructor() {
        core.looper.addListener(this, '_onTimerEvent');
    }
    //#region constructor
    //#region Methods
    /**
     * Function to execute when the timer tick
     * @override
     */
    //#region _onTimerEvent
    _onTimerEvent() { }
    //#endregion _onTimerEvent
    //#endregion
}
//#endregion TimerEvent
core.classes.register(core.types.CATEGORIES.INTERNAL, NotifyEvent, TimerEvent);
export { Events, NotifyEvent, TimerEvent };