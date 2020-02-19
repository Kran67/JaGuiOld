//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
import { Convert } from '/scripts/core/convert.js';
import { Tools } from '/scripts/core/tools.js';
import { Component } from '/scripts/core/component.js';
//import { NotifyEvent } from '/scripts/core/events.js';
import { Css } from '/scripts/core/css.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#region Animation
/**
 * Class representing an Animation.
 * @extends Component
 */
const _animationTypes = Object.freeze({
    IN: 'in',
    INOUT: 'inOut',
    OUT: 'out'
});
const Animation = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Animation extends Component {
        /**
         * Create a new instance of Animation.
         * @param   {Object}    owner       Owner of the Animation.
         * @param   {Object}    props       Properties to initialize the Animation.
         * @param   {Boolean}   autoStart   Start the animation after creation.
         */
        constructor(owner, props, autoStart) {
            props = !props ? {} : props;
            super(owner, props);
            const priv = internal(this);
            priv.delayTime = 0;
            priv.time = 0;
            priv.initialValue = 0;
            priv.pause = false;
            priv.animationType = Animation.ANIMATIONTYPES.IN;
            priv.autoReverse = false;
            priv.enabled = true;
            priv.delay = 0;
            priv.duration = 0.2;
            priv.interpolation = Interpolation.INTERPOLATIONTYPES.LINEAR;
            priv.inverse = false;
            priv.hideOnFinish = false;
            priv.loop = false;
            priv.trigger = String.EMPTY;
            priv.triggerInverse = String.EMPTY;
            priv.propertyName = String.EMPTY;
            priv.control = null;
            priv.startFromCurrent = false;
            priv.startValue = null;
            priv.stopValue = null;
            priv.autoStart = autoStart ? true : false;
            priv.running = false;
            priv.convertToCSS = Core.isHTMLRenderer;
            //#region Events
            this.onProcess = new Core.classes.NotifyEvent(this);
            this.onFinish = new Core.classes.NotifyEvent(this);
            //#endregion
        }
        //#region Getters/Setters
        get delayTime() {
            return internal(this).delayTime;
        }
        set delayTime(newValue) {
            internal(this).delayTime = newValue;
        }
        get time() {
            return internal(this).time;
        }
        set time(newValue) {
            internal(this).time = newValue;
        }
        get initialValue() {
            return internal(this).initialValue;
        }
        set initialValue(newValue) {
            internal(this).initialValue = newValue;
        }
        /**
         * @return {Boolean} the pause property
         */
        get pause() {
            return internal(this).pause;
        }
        /**
         * Set the pause property
         * @param   {Boolean}   newValue    the new value
         */
        set pause(newValue) {
            const priv = internal(this);
            let pause = priv.pause;
            const jsCssProperties = Types.JSCSSPROPERTIES;
            const owner = priv.owner;
            const form = priv.form;
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== pause) {
                    pause = priv.pause = newValue;
                    if (pause) {
                        if (priv.running) {
                            if (!Core.isHTMLRenderer /*|| this instanceof Core.classes.PathAnimation*/ || owner.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                                this.stopAtCurrent();
                            } else if (!priv.loading && !form.loading) {
                                Core.isHTMLRenderer && Css.updateInlineCSS(this, jsCssProperties.ANIMATIONSTATE);
                            }
                        }
                        else {
                            this.stop();
                        }
                    } else if (!priv.loading && !form.loading && Core.isHTMLRenderer) {
                        Css.updateInlineCSS(owner, jsCssProperties.ANIMATIONSTATE, String.EMPTY);
                    }
                }
            }
        }

        /**
         * @return {String} the animationType property
         */
        get animationType() {
            return internal(this).animationType;
        }
        /**
         * Set the animationType property
         * @param   {String}    newValue    the new value
         */
        set animationType(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Animation.ANIMATIONTYPES)) {
                if (newValue !== priv.animationType) {
                    priv.animationType = newValue;
                }
            }
        }
        /**
         * @return {Boolean} the autoReverse property
         */
        get autoReverse() {
            return internal(this).autoReverse;
        }
        /**
         * Set the autoReverse property
         * @param   {Boolean}   newValue    the new value
         */
        set autoReverse(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.autoReverse) {
                    priv.autoReverse = newValue;
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
         * @param   {Boolean}   newValue    the new value
         */
        set enabled(newValue) {
            const priv = internal(this);
            let enabled = priv.enabled;
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== enabled) {
                    enabled = priv.enabled = newValue;
                    if (enabled) {
                        this.start();
                    } else {
                        this.stop();
                    }
                }
            }
        }
        /**
         * @return  {Number}    the delay property
         */
        get delay() {
            return internal(this).delay;
        }
        /**
         * Set the delay property
         * @param   {Number}    newValue    the new value
         */
        set delay(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.delay) {
                    priv.delay = newValue;
                }
            }
        }
        /**
         * @return  {Number}    the duration property
         */
        get duration() {
            return internal(this).duration;
        }
        /**
         * Set the duration property
         * @param   {Number}    newValue    the new value
         */
        set duration(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue !== priv.duration) {
                    priv.duration = newValue;
                }
            }
        }
        /**
         * @return  {String}    the interpolation property
         */
        get interpolation() {
            return internal(this).interpolation;
        }
        /**
         * Set the interpolation property
         * @param   {String}    newValue    the new value
         */
        set interpolation(newValue) {
            const priv = internal(this);
            if (Tools.valueInSet(newValue, Interpolation.INTERPOLATIONTYPES)) {
                if (newValue !== priv.interpolation) {
                    priv.interpolation = newValue;
                }
            }
        }
        /**
         * @return  {Boolean}   the inverse property
         */
        get inverse() {
            return internal(this).inverse;
        }
        /**
         * Set the inverse property
         * @param   {Boolean}   newValue    the new value
         */
        set inverse(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.inverse) {
                    priv.inverse = newValue;
                }
            }
        }
        /**
         * @return  {Boolean}   the hideOnFinish property
         */
        get hideOnFinish() {
            return internal(this).hideOnFinish;
        }
        /**
         * Set the hideOnFinish property
         * @param   {Boolean}   newValue    the new value
         */
        set hideOnFinish(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.hideOnFinish) {
                    priv.hideOnFinish = newValue;
                }
            }
        }
        /**
         * @return  {Boolean}   the loop property
         */
        get loop() {
            return internal(this).loop;
        }
        /**
         * Set the loop property
         * @param   {Boolean}   newValue    the new value
         */
        set loop(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.loop) {
                    priv.loop = newValue;
                }
            }
        }
        /**
         * @return  {String}    the trigger property
         */
        get trigger() {
            return internal(this).trigger;
        }
        /**
         * Set the trigger property
         * @param   {String}    newValue    the new value
         */
        set trigger(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (newValue !== priv.trigger) {
                    priv.trigger = newValue;
                }
            }
        }
        /**
         * @return  {Boolean}   the triggerInverse property
         */
        get triggerInverse() {
            return internal(this).triggerInverse;
        }
        /**
         * Set the triggerInverse property
         * @param   {Boolean}   newValue    the new value
         */
        set triggerInverse(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.triggerInverse) {
                    priv.triggerInverse = newValue;
                }
            }
        }
        /**
         * @return  {String}    the propertyName property
         */
        get propertyName() {
            return internal(this).propertyName;
        }
        /**
         * Set the propertyName property
         * @param   {String}    newValue    the new value
         */
        set propertyName(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (newValue !== priv.propertyName) {
                    priv.propertyName = newValue;
                    this.updateCSS();
                }
            }
        }
        get control() {
            return internal(this).control;
        }
        set control(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Control) {
                if (priv.control !== newValue) {
                    this.stop();
                    priv.control = newValue;
                    if (priv.autoStart) {
                        this.start();
                    }
                }
            }
        }
        /**
         * @return  {Boolean}    the startFromCurrent property
         */
        get startFromCurrent() {
            return internal(this).startFromCurrent;
        }
        /**
         * Set the startFromCurrent property
         * @param   {Boolean}    newValue    the new value
         */
        set startFromCurrent(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.startFromCurrent) {
                    priv.startFromCurrent = newValue;
                }
            }
        }
        /**
         * @return  {Any}    the startValue property
         */
        get startValue() {
            return internal(this).startValue;
        }
        /**
         * Set the stopValue property
         * @param   {Any}       newValue    the new value
         */
        set startValue(newValue) {
            const priv = internal(this);
            if (newValue !== priv.startValue) {
                priv.startValue = newValue;
            }
        }
        /**
         * @return  {Any}    the stopValue property
         */
        get stopValue() {
            return internal(this).stopValue;
        }
        /**
         * Set the stopValue property
         * @param   {Any}       newValue    the new value
         */
        set stopValue(newValue) {
            const priv = internal(this);
            if (newValue !== priv.stopValue) {
                priv.stopValue = newValue;
            }
        }
        /**
         * @return  {Boolean}    the autoStart property
         */
        get autoStart() {
            return internal(this).autoStart;
        }
        /**
         * Set the convertToCSS property
         * @param   {Boolean}   newValue    the new value
         */
        set autoStart(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.autoStart) {
                    priv.autoStart = newValue;
                }
            }
        }
        /**
         * @return  {Boolean}    the running property
         */
        get running() {
            return internal(this).running;
        }
        /**
         * Set the running property
         * @param   {Boolean}   newValue    the new value
         */
        set running(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.running) {
                    priv.running = newValue;
                }
            }
        }
        /**
         * @return  {Boolean}    the convertToCSS property
         */
        get convertToCSS() {
            return internal(this).convertToCSS;
        }
        /**
         * Set the convertToCSS property
         * @param   {Boolean}   newValue    the new value
         */
        set convertToCSS(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== priv.convertToCSS) {
                    priv.convertToCSS = newValue;
                }
            }
        }
        /**
         * @type    {Object}
         */
        static get ANIMATIONTYPES() {
            return _animationTypes;
        }
        //#endregion
        //#region Methods
        /**
         * Start the animation
         */
        start() {
            const inverse = this.inverse;
            const priv = internal(this);
            if (this.control) {
                if (!this.convertToCSS /*|| this instanceof Core.classes.PathAnimation*/ || this.owner.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                    if (Core.disableAnimation) {
                        priv.duration = 0.001;
                    }
                    if (Math.abs(priv.duration) < 0.001) {
                        priv.delayTime = 0;
                        if (inverse) {
                            priv.time = 0;
                            priv.duration = 1;
                        } else {
                            priv.time = 1;
                            priv.duration = 1;
                        }
                        priv.running = true;
                        this.processAnimation();
                        priv.running = false;
                        priv.time = 0;
                        priv.duration = 0.00001;
                        this.onFinish.invoke();
                        priv.enabled = false;
                    } else {
                        priv.delayTime = priv.delay;
                        priv.running = true;
                        if (inverse) {
                            priv.time = priv.duration;
                        } else {
                            priv.time = 0;
                        }
                        if (priv.delay === 0) {
                            this.processAnimation();
                        }
                        priv.enabled = true;
                    }
                    Core.looper.addListener(this, 'animate');
                } else {
                    priv.running = true;
                    Core.isHTMLRenderer && Css.updateInlineCSS(this, Types.JSCSSPROPERTIES.ANIMATION);
                }
            }
        }
        /**
         * Stop the animation
         */
        stop() {
            const priv = internal(this);
            const htmlElements = Types.HTMLELEMENTS;
            //if (!this.running || !this.control) {
            //    return;
            //}
            const htmlElement = this.control ? this.control.HTMLElement : null;
            if (!this.convertToCSS /*|| this instanceof Core.classes.PathAnimation*/ || htmlElement === htmlElements.CANVAS) {
                if (priv.inverse) {
                    priv.time = 0;
                } else {
                    priv.time = priv.duration;
                }
                this.processAnimation();
            }
            priv.running = false;
            priv.enabled = false;
            this.onFinish.invoke();
            if (!this.convertToCSS /*|| this instanceof Core.classes.PathAnimation*/ || htmlElement === htmlElements.CANVAS) {
                //renderer.removeListener(this);
                Core.looper.removeListener(this);
            } else if (!this.loading && !this.form.loading) {
                Core.isHTMLRenderer && Css.updateInlineCSS(this.control, Types.JSCSSPROPERTIES.ANIMATION, String.EMPTY);
            }
        }
        /**
         * When the class is loaded
         * @override
         */
        loaded() {
            super.loaded();
            if (!Core.isHTMLRenderer /*|| this instanceof Core.classes.PathAnimation*/ || this.control && this.control.HTMLElement === Types.HTMLELEMENTS.CANVAS) {
                if (this.startFromCurrent) {
                    this.initialValue = this.startValue;
                }
            } else {
                this.updateCSS();
            }
            //if(this._enabled&&!this._running&&this._autoStart) this.start();
        }
        /**
         * Update css with properties
         */
        updateCSS() {
            const priv = internal(this);
            if (Core.isHTMLRenderer) {
                Css.removeCSSRule(`@${Core.browser.getVendorPrefix('keyframes')}keyframes${this.priv}, Types.CSSRULETYPES.KEYFRAMES_RULE}`);
                if (priv.propertyName !== String.EMPTY) {
                    cssProp = `0% { ${Convert.propertyToCssProperty(this)} }
                       100% { ${Convert.propertyToCssProperty(this, true)} } `;
                    Css.addCSSRule(`@${Core.browser.getVendorPrefix('keyframes')}keyframes ${this.priv}`, cssProp);
                }
            }
        }
        /**
         * process animation on each tick
         * @abstract
         */
        processAnimation() { }
        /**
         * Determine if the animation stop at the current value
         */
        stopAtCurrent() {
            const priv = internal(this);
            if (priv.running) {
                if (priv.inverse) {
                    priv.time = 0;
                } else {
                    priv.time = priv.duration;
                }
                priv.running = false;
                this.enabled = false;
                this.onFinish.invoke();
            }
        }
        /**
         * Start the animation with a trigger
         * @param   {Control}   control     the control who want the animation start
         * @param   {String}    trigger     the trigger to launche the animation
         */
        startTrigger(control, trigger) {
            const priv = internal(this);
            const triggerInverse = priv.triggerInverse;
            const thisTrigger = priv.trigger;
            if (control) {
                let startValue = false;
                let line = null;
                let setter = null;
                let prop = null;
                let value = null;
                if (triggerInverse !== String.EMPTY && triggerInverse.toLowerCase().indexOf(trigger.toLowerCase()) > -1) {
                    line = triggerInverse;
                    setter = line.split(';');
                    startValue = false;
                    while (setter.length > 0) {
                        prop = setter[0].split('=');
                        value = prop.last;
                        prop = prop.first;
                        if (control.hasOwnProperty(prop)) {
                            startValue = control[prop].toString().toLowerCase() === value.toLowerCase();
                            if (!startValue) {
                                break;
                            }
                        }
                        setter.removeAt(0);
                    }
                    if (startValue) {
                        priv.inverse = true;
                        this.start();
                        return;
                    }
                }
                if (thisTrigger !== String.EMPTY && thisTrigger.toLowerCase().indexOf(trigger.toLowerCase()) > -1) {
                    line = thisTrigger;
                    setter = line.split(';');
                    startValue = false;
                    while (setter.length > 0) {
                        prop = setter[0].split('=').first;
                        value = setter[0].split('=').last;
                        if (control.hasOwnProperty(prop)) {
                            startValue = control[prop].toString().toLowerCase() === value.toLowerCase();
                            if (!startValue) {
                                break;
                            }
                        }
                        setter.removeAt(0);
                    }
                    if (startValue) {
                        if (triggerInverse !== String.EMPTY) {
                            priv.inverse = false;
                        }
                        this.start();
                    }
                }
            }
        }
        /**
         * Normalize the time of the animation with the duration
         * @return {Number}     a normalized time
         */
        normalizedTime() {
            const priv = internal(this);
            const interpolation = priv.interpolation;
            const time = priv.time;
            const duration = priv.duration;
            const animationType = priv.animationType;
            const interpolationTypes = Interpolation.INTERPOLATIONTYPES;
            const fiveProps = {
                t: time,
                b: 0,
                c: 1,
                d: duration,
                a: animationType
            };
            if (duration > 0 && priv.delayTime <= 0) {
                if (!Tools.valueInSet(interpolation, interpolationTypes)) {
                    return 0;
                } if (interpolation === interpolationTypes.LINEAR) {
                    return Interpolation.linear(time, 0, 1, duration);
                } else if (interpolation === interpolationTypes.ELASTIC) {
                    return Interpolation.elastic({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        a1: 0,
                        p: 0,
                        a: animationType
                    });
                } else if (interpolation === interpolationTypes.BACK) {
                    return Interpolation.back({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        s: 0,
                        a: animationType
                    });
                } else return Interpolation[interpolation](fiveProps);
                /*if (interpolation === interpolationTypes.LINEAR) {
                    return Interpolation.linear(time, 0, 1, duration);
                } else if (interpolation === interpolationTypes.QUADRATIC) {
                    return Interpolation.quad(fiveProps);
                } else if (interpolation === interpolationTypes.CUBIC) {
                    return Interpolation.cubic(fiveProps);
                } else if (interpolation === interpolationTypes.QUARTIC) {
                    return Interpolation.quart(fiveProps);
                } else if (interpolation === interpolationTypes.QUINTIC) {
                    return Interpolation.quint(fiveProps);
                } else if (interpolation === interpolationTypes.SINUSOIDAL) {
                    return Interpolation.sine(fiveProps);
                } else if (interpolation === interpolationTypes.EXPONENTIAL) {
                    return Interpolation.expo(fiveProps);
                } else if (interpolation === interpolationTypes.CIRCULAR) {
                    return Interpolation.circ(fiveProps);
                } else if (interpolation === interpolationTypes.ELASTIC) {
                    return Interpolation.elastic({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        a1: 0,
                        p: 0,
                        a: animationType
                    });
                } else if (interpolation === interpolationTypes.BACK) {
                    return Interpolation.back({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        s: 0,
                        a: animationType
                    });
                } else if (interpolation === interpolationTypes.BOUNCE) {
                    return Interpolation.bounce(fiveProps);
                } else {
                    return 0;
                }*/
            }
        }
        /**
         * Run the animation
         * @param   {Number}    elapsedTime     time elapsed since last animation tick
         */
        animate(elapsedTime) {
            const priv = internal(this);
            const owner = priv.owner;
            let running = priv.running;
            let delayTime = priv.delayTime;
            const autoReverse = priv.autoReverse;
            const duration = priv.duration;
            const loop = priv.loop;
            elapsedTime /= 1000;
            if (running && priv.pause) {
                if (owner) {
                    if (!Core.isHTMLRenderer) {
                        if (!owner.isVisible) {
                            //this.pause = true;
                            this.stop();
                        } else if (running) {
                            this.pause = false;
                        }
                    } else {
                        if (!owner.isVisible) {
                            //this.pause = true;
                            this.stop();
                        } else if (running) {
                            this.pause = false;
                        }
                    }
                }
                if (priv.delay > 0 && delayTime !== 0) {
                    if (delayTime > 0) {
                        delayTime = priv.delayTime = delayTime - elapsedTime;
                        if (delayTime <= 0) {
                            this.start();
                            delayTime = this.delayTime = 0;
                        }
                    }
                    return;
                }
                if (priv.inverse) {
                    priv.time -= elapsedTime;
                } else {
                    priv.time += elapsedTime;
                }
                if (priv.time >= duration) {
                    if (priv.startFromCurrent) {
                        priv.startValue = priv.initialValue;
                    }
                    priv.time = duration;
                    if (loop) {
                        if (autoReverse) {
                            priv.inverse = true;
                            priv.time = duration;
                        } else {
                            priv.time = 0;
                        }
                    } else {
                        running = priv.running = false;
                    }
                } else if (priv.time <= 0) {
                    priv.time = 0;
                    if (loop) {
                        if (autoReverse) {
                            priv.inverse = false;
                            priv.time = 0;
                        } else {
                            priv.time = duration;
                        }
                    } else {
                        running = priv.running = false;
                    }
                }
                this.processAnimation();
                this.onProcess.invoke();
                if (!running) {
                    //this.onFinish.invoke();
                    this.stop();
                }
            }
        }
        /**
         * Convert animation properties to CSS
         * @param   {Number}    aniName     Name of the animation in CSS
         * @return  {String}                the css description of the animation
         */
        toCSS(aniName) {
            const priv = internal(this);
            const interpolationTypes = Interpolation.INTERPOLATIONTYPES;
            const animationTypes = Animation.ANIMATIONTYPES;
            let ani = String.EMPTY;
            const interpolation = priv.interpolation;
            const animationType = priv.animationType;
            const inverse = priv.inverse;
            const autoReverse = priv.autoReverse;
            if (!this.convertToCSS) {
                return String.EMPTY;
            }
            if (interpolation === interpolationTypes.BOUNCE || interpolation === interpolationTypes.ELASTIC) {
                return ani;
            }
            // animation-name + animation-duration
            ani += (aniName ? aniName : priv.name) + String.SPACE + priv.duration + 's ';
            // animation-timing-function
            switch (interpolation) {
                case interpolationTypes.BACK:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            break;
                    }
                    break;
                    //case types.interpolationType.BOUNCE:
                    //  switch (this._animationType) {
                    //    case types.animationType.IN:
                    //      ani+="";
                    //      break;
                    //    case types.animationType.OUT:
                    //      ani+="";
                    //      break;
                    //    case types.animationType.INOUT:
                    //      ani+="";
                    //      break;
                    //  }
                    //  break;
                case interpolationTypes.CIRCULAR:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.075, 0.82, 0.165, 1)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';
                            break;
                    }
                    break;
                case interpolationTypes.CUBIC:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.215, 0.61, 0.355, 1)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(0.645, 0.045, 0.355, 1)';
                            break;
                    }
                    break;
                    //case types.interpolationType.ELASTIC:
                    //  switch (this._animationType) {
                    //    case types.animationType.IN:
                    //      ani+="";
                    //      break;
                    //    case types.animationType.OUT:
                    //      ani+="";
                    //      break;
                    //    case types.animationType.INOUT:
                    //      ani+="";
                    //      break;
                    //  }
                    //  break;
                case interpolationTypes.EXPONENTIAL:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.19, 1, 0.22, 1)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(1, 0, 0, 1)';
                            break;
                    }
                    break;
                case interpolationTypes.LINEAR:
                    ani += 'linear ';
                    break;
                case interpolationTypes.QUADRATIC:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';
                            break;
                    }
                    break;
                case interpolationTypes.QUARTIC:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.165, 0.84, 0.44, 1)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(0.77, 0, 0.175, 1)';
                            break;
                    }
                    break;
                case interpolationTypes.QUINTIC:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.23, 1, 0.32, 1)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(0.86, 0, 0.07, 1)';
                            break;
                    }
                    break;
                case interpolationTypes.SINUSOIDAL:
                    switch (animationType) {
                        case animationTypes.IN:
                            ani += 'cubic-bezier(0.47, 0, 0.745, 0.715)';
                            break;
                        case animationTypes.OUT:
                            ani += 'cubic-bezier(0.39, 0.575, 0.565, 1)';
                            break;
                        case animationTypes.INOUT:
                            ani += 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
                            break;
                    }
                    break;
            }
            // animation-delay
            ani += priv.delay + 's ';
            // animation-iteration-count
            if (this.loop) {
                ani += 'infinite ';
            } else {
                ani += '1 ';
            }
            // animation-direction
            if (autoReverse && !inverse) {
                ani += 'alternate ';
            } else if (!autoReverse && inverse) {
                ani += 'reverse ';
            } else if (autoReverse && inverse) {
                ani += 'alternate-reverse ';
            } else {
                ani += 'normal ';
            }
            // animation-fill-mode
            ani += 'forwards ';
            return ani;
        }
        /**
         * Assign properties from another animation
         * @param   {Animation}     source      The animation source
         * @override
         */
        assign(source) {
            if (source instanceof Core.classes.Animation) {
                const priv = internal(this);
                priv.running = source.running;
                priv.pause = source.pause;
                priv.animationType = source.animationType;
                priv.autoReverse = source.autoReverse;
                priv.enabled = source.enabled;
                priv.delay = source.delay;
                priv.duration = source.duration;
                priv.interpolation = source.interpolation;
                priv.inverse = source.inverse;
                priv.hideOnFinish = source.hideOnFinish;
                priv.loop = source.loop;
                priv.trigger = source.trigger;
                priv.triggerInverse = source.triggerInverse;
                priv.propertyName = source.propertyName;
            }
        }
        /**
         * Destroy all properties of the instance
         * @override
         */
        destroy() {
            const priv = internal(this);
            const startValue = priv.startValue;
            const stopValue = priv.stopValue;
            this.onProcess.destroy();
            this.onFinish.destroy();
            if (startValue) {
                if (startValue.destroy) {
                    startValue.destroy();
                }
            }
            if (stopValue) {
                if (stopValue.destroy) {
                    stopValue.destroy();
                }
            }
        }
        //#endregion
    }
    return Animation;
})();
Object.defineProperties(Animation, {
    'animationType': {
        enumerable: true
    },
    'autoReverse': {
        enumerable: true
    },
    'enabled': {
        enumerable: true
    },
    'delay': {
        enumerable: true
    },
    'duration': {
        enumerable: true
    },
    'interpolation': {
        enumerable: true
    },
    'inverse': {
        enumerable: true
    },
    'hideOnFinish': {
        enumerable: true
    },
    'loop': {
        enumerable: true
    },
    'trigger': {
        enumerable: true
    },
    'triggerInverse': {
        enumerable: true
    },
    'propertyName': {
        enumerable: true
    },
    'control': {
        enumerable: true
    },
    'startFromCurrent': {
        enumerable: true
    },
    'startValue': {
        enumerable: true
    },
    'stopValue': {
        enumerable: true
    },
    'autoStart': {
        enumerable: true
    },
    'convertToCSS': {
        enumerable: true
    }
});
//#endregion



//Classes.register(categories.ANIMATIONS,ColorAnimation,GradientAnimation,FloatAnimation,RectAnimation,BitmapAnimation,PathAnimation);
//#region Templates
/*let ColorAnimationTpl = `<div id='{internalId}' data-name='{name}' data-class='ColorAnimation' class='ColorAnimation ShortCutIcon'>
                         <div class='ShortCutIconImg coloranimation'></div>
                         <div class='ShortCutIconCaption'>{name}</div>
                         </div>`,
    GradientAnimationTpl = `<div id='{internalId}' data-name='{name}' data-class='GradientAnimation' class='GradientAnimation ShortCutIcon'>
                            <div class='ShortCutIconImg gradientanimation'></div>
                            <div class='ShortCutIconCaption'>{name}</div>
                            </div>`,
    FloatAnimationTpl = `<div id='{internalId}' data-name='{name}' data-class='FloatAnimation' class='FloatAnimation ShortCutIcon'>
                         <div class='ShortCutIconImg floatanimation'></div>
                         <div class='ShortCutIconCaption'>{name}</div>
                         </div>`,
    RectAnimationTpl = `<div id='{internalId}' data-name='{name}' data-class='RectAnimation' class='RectAnimation ShortCutIcon'>
                        <div class='ShortCutIconImg rectanimation'></div>
                        <div class='ShortCutIconCaption'>{name}</div>
                        </div>`,
                        BitmapAnimationTpl = `<div id='{internalId}' data-name='{name}' data-class='BitmapAnimation' class='BitmapAnimation ShortCutIcon'>
                          <div class='ShortCutIconImg bitmapanimation'></div>
                          <div class='ShortCutIconCaption'>{name}</div>
                          </div>`,
    PathAnimationTpl = `<div id='{internalId}' data-name='{name}' data-class='PathAnimation' class='PathAnimation ShortCutIcon'>
                        <div class='ShortCutIconImg pathanimation'></div>
                        <div class='ShortCutIconCaption'>{name}</div>
                        </div>`,
    PathSwitcherTpl = `<div id='{internalId}' data-name='{name}' data-class='PathSwitcher' class='PathSwitcher ShortCutIcon'>
                       <div class='ShortCutIconImg pathswitcher'></div>
                       <div class='ShortCutIconCaption'>{name}</div>
                       </div>`;
Classes.registerTemplates([{ Class: ColorAnimation,template: ColorAnimationTpl },{ Class: GradientAnimation,template: GradientAnimationTpl },{ Class: FloatAnimation,template: FloatAnimationTpl },
                              { Class: RectAnimation,template: RectAnimationTpl },{ Class: BitmapAnimation,template: BitmapAnimationTpl },{ Class: PathAnimation,template: PathAnimationTpl },
                              { Class: PathSwitcher,template: PathSwitcherTpl }]);*/
//#endregion
Core.classes.register(Types.CATEGORIES.ANIMATIONS, Animation);
export { Animation };