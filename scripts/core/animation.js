//#region Imports
import { Convert } from '/scripts/core/convert.js';
import { Component } from '/scripts/core/component.js';
//import { NotifyEvent } from '/scripts/core/events.js';
import { Css } from '/scripts/core/css.js';
import { Interpolation } from '/scripts/core/interpolations.js';
//#region Animation
/**
 * Class representing an Animation.
 * @extends Component
 */
const ANIMATIONTYPES = Object.freeze(Object.seal({
    IN: 'in',
    INOUT: 'inOut',
    OUT: 'out'
}));
const Animation = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
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
            priv.pause = !1;
            priv.animationType = ANIMATIONTYPES.IN;
            priv.autoReverse = !1;
            priv.enabled = !0;
            priv.delay = 0;
            priv.duration = 0.2;
            priv.interpolation = Interpolation.INTERPOLATIONTYPES.LINEAR;
            priv.inverse = !1;
            priv.hideOnFinish = !1;
            priv.loop = !1;
            priv.trigger = String.EMPTY;
            priv.triggerInverse = String.EMPTY;
            priv.propertyName = String.EMPTY;
            priv.control = null;
            priv.startFromCurrent = !1;
            priv.startValue = null;
            priv.stopValue = null;
            priv.autoStart = autoStart ? !0 : !1;
            priv.running = !1;
            priv.convertToCSS = core.isHTMLRenderer;
            this.createEventsAndBind(['onProcess', 'onFinish'], props);
        }
        //#region Getters / Setters
        //#region delayTime
        get delayTime() {
            return internal(this).delayTime;
        }
        set delayTime(newValue) {
            internal(this).delayTime = newValue;
        }
        //#endregion delayTime
        //#region time
        get time() {
            return internal(this).time;
        }
        set time(newValue) {
            internal(this).time = newValue;
        }
        //#endregion time
        //#region initialValue
        get initialValue() {
            return internal(this).initialValue;
        }
        set initialValue(newValue) {
            internal(this).initialValue = newValue;
        }
        //#endregion initialValue
        //#region pause
        get pause() {
            return internal(this).pause;
        }
        set pause(newValue) {
            const priv = internal(this);
            let pause = priv.pause;
            const jsCssProperties = core.types.JSCSSPROPERTIES;
            const owner = priv.owner;
            const form = priv.form;
            if (core.tools.isBool(newValue) && newValue !== pause) {
                pause = priv.pause = newValue;
                if (pause) {
                    if (priv.running) {
                        if (!core.isHTMLRenderer || owner.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
                            this.stopAtCurrent();
                        } else if (!priv.loading && !form.loading) {
                            core.isHTMLRenderer && Css.updateInlineCSS(this, jsCssProperties.ANIMATIONSTATE);
                        }
                    }
                    else {
                        this.stop();
                    }
                } else if (!priv.loading && !form.loading && core.isHTMLRenderer) {
                    Css.updateInlineCSS(owner, jsCssProperties.ANIMATIONSTATE, String.EMPTY);
                }
            }
        }
        //#endregion pause
        //#region animationType
        get animationType() {
            return internal(this).animationType;
        }
        set animationType(newValue) {
            const priv = internal(this);
            core.tools.valueInSet(newValue, Animation.ANIMATIONTYPES) && newValue !== priv.animationType
                ? priv.animationType = newValue : 1;
        }
        //#endregion animationType
        //#region autoReverse
        get autoReverse() {
            return internal(this).autoReverse;
        }
        set autoReverse(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.autoReverse
                ? priv.autoReverse = newValue : 1;
        }
        //#endregion autoReverse
        //#region enabled
        get enabled() {
            return internal(this).enabled;
        }
        set enabled(newValue) {
            const priv = internal(this);
            let enabled = priv.enabled;
            if (core.tools.isBool(newValue) && newValue !== enabled) {
                enabled = priv.enabled = newValue;
                enabled ? this.start() : this.stop();
            }
        }
        //#endregion enabled
        //#region delay
        get delay() {
            return internal(this).delay;
        }
        set delay(newValue) {
            const priv = internal(this);
            core.tools.isNumber(newValue) && newValue !== priv.delay
                ? priv.delay = newValue : 1;
        }
        //#endregion delay
        //#region duration
        get duration() {
            return internal(this).duration;
        }
        set duration(newValue) {
            const priv = internal(this);
            core.tools.isNumber(newValue) && newValue !== priv.duration
                ? priv.duration = newValue : 1;
        }
        //#endregion duration
        //#region interpolation
        get interpolation() {
            return internal(this).interpolation;
        }
        set interpolation(newValue) {
            const priv = internal(this);
            core.tools.valueInSet(newValue, Interpolation.INTERPOLATIONTYPES) && newValue !== priv.interpolation
                ? priv.interpolation = newValue : 1;
        }
        //#endregion interpolation
        //#region inverse
        get inverse() {
            return internal(this).inverse;
        }
        set inverse(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.inverse
                ? priv.inverse = newValue : 1;
        }
        //#endregion inverse
        //#region hideOnFinish
        get hideOnFinish() {
            return internal(this).hideOnFinish;
        }
        set hideOnFinish(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.hideOnFinish
                ? priv.hideOnFinish = newValue : 1;
        }
        //#endregion hideOnFinish
        //#region loop
        get loop() {
            return internal(this).loop;
        }
        set loop(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.loop
                ? priv.loop = newValue : 1;
        }
        //#endregion loop
        //#region trigger
        get trigger() {
            return internal(this).trigger;
        }
        set trigger(newValue) {
            const priv = internal(this);
            core.tools.isString(newValue) && newValue !== priv.trigger
                ? priv.trigger = newValue : 1;
        }
        //#endregion trigger
        //#region triggerInverse
        get triggerInverse() {
            return internal(this).triggerInverse;
        }
        set triggerInverse(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.triggerInverse
                ? priv.triggerInverse = newValue : 1;
        }
        //#endregion triggerInverse
        //#region propertyName
        get propertyName() {
            return internal(this).propertyName;
        }
        set propertyName(newValue) {
            const priv = internal(this);
            if (core.tools.isString(newValue) && newValue !== priv.propertyName) {
                priv.propertyName = newValue;
                this.updateCSS();
            }
        }
        //#endregion propertyName
        //#region control
        get control() {
            return internal(this).control;
        }
        set control(newValue) {
            const priv = internal(this);
            if (newValue instanceof core.classes.Control && priv.control !== newValue) {
                this.stop();
                priv.control = newValue;
                priv.autoStart ? this.start() : 1;
            }
        }
        //#endregion control
        //#region startFromCurrent
        get startFromCurrent() {
            return internal(this).startFromCurrent;
        }
        set startFromCurrent(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.startFromCurrent
                ? priv.startFromCurrent = newValue : 1;
        }
        //#endregion startFromCurrent
        //#region startValue
        get startValue() {
            return internal(this).startValue;
        }
        set startValue(newValue) {
            const priv = internal(this);
            typeof priv.startValue === typeof newValue && newValue !== priv.startValue
                ? priv.startValue = newValue : 1;
        }
        //#endregion startValue
        //#region stopValue
        get stopValue() {
            return internal(this).stopValue;
        }
        set stopValue(newValue) {
            const priv = internal(this);
            typeof priv.stopValue === typeof newValue && newValue !== priv.stopValue
                ? priv.stopValue = newValue : 1;
        }
        //#endregion stopValue
        //#region autoStart
        get autoStart() {
            return internal(this).autoStart;
        }
        set autoStart(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.autoStart
                ? priv.autoStart = newValue : 1;
        }
        //#endregion autoStart
        //#region running
        get running() {
            return internal(this).running;
        }
        set running(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.running
                ? priv.running = newValue : 1;
        }
        //#endregion running
        //#region convertToCSS
        get convertToCSS() {
            return internal(this).convertToCSS;
        }
        set convertToCSS(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && newValue !== priv.convertToCSS
                ? priv.convertToCSS = newValue : 1;
        }
        //#endregion convertToCSS
        //#region ANIMATIONTYPES
        static get ANIMATIONTYPES() {
            return _animationTypes;
        }
        //#endregion ANIMATIONTYPES
        //#endregion Getters / Setters
        //#region Methods
        /**
         * Start the animation
         */
        start() {
            const inverse = this.inverse;
            const priv = internal(this);
            if (this.control) {
                if (!this.convertToCSS /*|| this instanceof core.classes.PathAnimation*/ || this.owner.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
                    core.disableAnimation ? priv.duration = 0.001 : 1;
                    if (Math.abs(priv.duration) < 0.001) {
                        priv.delayTime = 0;
                        if (inverse) {
                            priv.time = 0;
                            priv.duration = 1;
                        } else {
                            priv.time = 1;
                            priv.duration = 1;
                        }
                        priv.running = !0;
                        this.processAnimation();
                        priv.running = !1;
                        priv.time = 0;
                        priv.duration = 0.00001;
                        this.onFinish.invoke();
                        priv.enabled = !1;
                    } else {
                        priv.delayTime = priv.delay;
                        priv.running = !0;
                        priv.time = inverse ? priv.duration : 0;
                        priv.delay === 0 ? this.processAnimation() : 1;
                        priv.enabled = !0;
                    }
                    core.looper.addListener(this, 'animate');
                } else {
                    priv.running = !0;
                    core.isHTMLRenderer && Css.updateInlineCSS(this, core.types.JSCSSPROPERTIES.ANIMATION);
                }
            }
        }
        /**
         * Stop the animation
         */
        stop() {
            const priv = internal(this);
            const htmlElements = core.types.HTMLELEMENTS;
            const htmlElement = this.control ? this.control.HTMLElement : null;
            if (!this.convertToCSS || htmlElement === htmlElements.CANVAS) {
                priv.time = priv.inverse ? 0 : priv.duration;
                this.processAnimation();
            }
            priv.running = !1;
            priv.enabled = !1;
            this.onFinish.invoke();
            !this.convertToCSS || htmlElement === htmlElements.CANVAS
                ? core.looper.removeListener(this)
                    ? !this.loading && !this.form.loading
                    : core.isHTMLRenderer && Css.updateInlineCSS(this.control, core.types.JSCSSPROPERTIES.ANIMATION, String.EMPTY)
                : 1;
        }
        /**
         * When the class is loaded
         * @override
         */
        loaded() {
            super.loaded();
            !core.isHTMLRenderer || this.control && this.control.HTMLElement === core.types.HTMLELEMENTS.CANVAS
                ? this.startFromCurrent
                    ? this.initialValue = this.startValue : 1
                : this.updateCSS();
            //if(this._enabled&&!this._running&&this._autoStart) this.start();
        }
        /**
         * Update css with properties
         */
        updateCSS() {
            const priv = internal(this);
            if (core.isHTMLRenderer) {
                Css.removeCSSRule(`@${core.browser.getVendorPrefix('keyframes')}keyframes${this.priv}, core.types.CSSRULEcore.types.KEYFRAMES_RULE}`);
                if (priv.propertyName !== String.EMPTY) {
                    cssProp = `0% { ${Convert.propertyToCssProperty(this)} }
                       100% { ${Convert.propertyToCssProperty(this, !0)} } `;
                    Css.addCSSRule(`@${core.browser.getVendorPrefix('keyframes')}keyframes ${this.priv}`, cssProp);
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
                priv.time = priv.inverse ? 0 : priv.duration;
                priv.running = !1;
                this.enabled = !1;
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
                let startValue = !1;
                let line = null;
                let setter = null;
                let prop = null;
                let value = null;
                if (triggerInverse !== String.EMPTY && triggerInverse.toLowerCase().indexOf(trigger.toLowerCase()) > -1) {
                    line = triggerInverse;
                    setter = line.split(';');
                    startValue = !1;
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
                        priv.inverse = !0;
                        this.start();
                        return;
                    }
                }
                if (thisTrigger !== String.EMPTY && thisTrigger.toLowerCase().indexOf(trigger.toLowerCase()) > -1) {
                    line = thisTrigger;
                    setter = line.split(';');
                    startValue = !1;
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
                        !String.isNullOrEmpty(triggerInverse) ? priv.inverse = !1 : 1;
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
                if (!core.tools.valueInSet(interpolation, interpolationTypes)) {
                    return 0;
                } if (interpolation === INTERPOLATIONTYPES.LINEAR) {
                    return Interpolation.linear(time, 0, 1, duration);
                } else if (interpolation === INTERPOLATIONTYPES.ELASTIC) {
                    return Interpolation.elastic({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        a1: 0,
                        p: 0,
                        a: animationType
                    });
                } else if (interpolation === INTERPOLATIONTYPES.BACK) {
                    return Interpolation.back({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        s: 0,
                        a: animationType
                    });
                } else return Interpolation[interpolation](fiveProps);
                /*if (interpolation === INTERPOLATIONTYPES.LINEAR) {
                    return Interpolation.linear(time, 0, 1, duration);
                } else if (interpolation === INTERPOLATIONTYPES.QUADRATIC) {
                    return Interpolation.quad(fiveProps);
                } else if (interpolation === INTERPOLATIONTYPES.CUBIC) {
                    return Interpolation.cubic(fiveProps);
                } else if (interpolation === INTERPOLATIONTYPES.QUARTIC) {
                    return Interpolation.quart(fiveProps);
                } else if (interpolation === INTERPOLATIONTYPES.QUINTIC) {
                    return Interpolation.quint(fiveProps);
                } else if (interpolation === INTERPOLATIONTYPES.SINUSOIDAL) {
                    return Interpolation.sine(fiveProps);
                } else if (interpolation === INTERPOLATIONTYPES.EXPONENTIAL) {
                    return Interpolation.expo(fiveProps);
                } else if (interpolation === INTERPOLATIONTYPES.CIRCULAR) {
                    return Interpolation.circ(fiveProps);
                } else if (interpolation === INTERPOLATIONTYPES.ELASTIC) {
                    return Interpolation.elastic({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        a1: 0,
                        p: 0,
                        a: animationType
                    });
                } else if (interpolation === INTERPOLATIONTYPES.BACK) {
                    return Interpolation.back({
                        t: time,
                        b: 0,
                        c: 1,
                        d: duration,
                        s: 0,
                        a: animationType
                    });
                } else if (interpolation === INTERPOLATIONTYPES.BOUNCE) {
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
                    if (!core.isHTMLRenderer) {
                        !owner.isVisible
                            ? this.stop()
                                ? running : this.pause = !1
                            : 1;
                    }
                } else {
                    !owner.isVisible
                        ? this.stop()
                            ? running : this.pause = !1
                        : 1;
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
                priv.inverse ? priv.time -= elapsedTime : priv.time += elapsedTime;
                if (priv.time >= duration) {
                    priv.startFromCurrent ? priv.startValue = priv.initialValue : 1;
                }
                priv.time = duration;
                if (loop) {
                    if (autoReverse) {
                        priv.inverse = !0;
                        priv.time = duration;
                    } else {
                        priv.time = 0;
                    }
                } else {
                    running = priv.running = !1;
                }
            } else if (priv.time <= 0) {
                priv.time = 0;
                if (loop) {
                    if (autoReverse) {
                        priv.inverse = !1;
                        priv.time = 0;
                    } else {
                        priv.time = duration;
                    }
                } else {
                    running = priv.running = !1;
                }
            }
            this.processAnimation();
            this.onProcess.invoke();
            !running ? this.stop() : 1;
        }
        /**
         * Convert animation properties to CSS
         * @param   {Number}    aniName     Name of the animation in CSS
         * @return  {String}                the css description of the animation
         */
        toCSS(aniName) {
            const priv = internal(this);
            const interpolationTypes = Interpolation.INTERPOLATIONTYPES;
            let ani = String.EMPTY;
            const interpolation = priv.interpolation;
            const animationType = priv.animationType;
            const inverse = priv.inverse;
            const autoReverse = priv.autoReverse;
            if (!this.convertToCSS) {
                return String.EMPTY;
            }
            if (interpolation === INTERPOLATIONTYPES.BOUNCE || interpolation === INTERPOLATIONTYPES.ELASTIC) {
                return ani;
            }
            // animation-name + animation-duration
            ani += (aniName ? aniName : priv.name) + String.SPACE + priv.duration + 's ';
            // animation-timing-function
            switch (interpolation) {
                case INTERPOLATIONTYPES.BACK:
                    switch (animationType) {
                        case ANIMATIONTYPES.types.IN:
                            ani += 'cubic-bezier(0.6, -0.28, 0.735, 0.045)';
                            break;
                        case ANIMATIONTYPES.types.OUT:
                            ani += 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            break;
                        case ANIMATIONTYPES.types.INOUT:
                            ani += 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                            break;
                    }
                    break;
                //case core.types.interpolationType.BOUNCE:
                //  switch (this._animationType) {
                //    case core.types.animationType.IN:
                //      ani+="";
                //      break;
                //    case core.types.animationType.OUT:
                //      ani+="";
                //      break;
                //    case core.types.animationType.INOUT:
                //      ani+="";
                //      break;
                //  }
                //  break;
                case INTERPOLATIONTYPES.CIRCULAR:
                    switch (animationType) {
                        case ANIMATIONTYPES.IN:
                            ani += 'cubic-bezier(0.6, 0.04, 0.98, 0.335)';
                            break;
                        case ANIMATIONTYPES.OUT:
                            ani += 'cubic-bezier(0.075, 0.82, 0.165, 1)';
                            break;
                        case ANIMATIONTYPES.INOUT:
                            ani += 'cubic-bezier(0.785, 0.135, 0.15, 0.86)';
                            break;
                    }
                    break;
                case INTERPOLATIONTYPES.CUBIC:
                    switch (animationType) {
                        case ANIMATIONTYPES.IN:
                            ani += 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
                            break;
                        case ANIMATIONTYPES.OUT:
                            ani += 'cubic-bezier(0.215, 0.61, 0.355, 1)';
                            break;
                        case ANIMATIONTYPES.INOUT:
                            ani += 'cubic-bezier(0.645, 0.045, 0.355, 1)';
                            break;
                    }
                    break;
                //case core.types.interpolationType.ELASTIC:
                //  switch (this._animationType) {
                //    case core.types.animationType.IN:
                //      ani+="";
                //      break;
                //    case core.types.animationType.OUT:
                //      ani+="";
                //      break;
                //    case core.types.animationType.INOUT:
                //      ani+="";
                //      break;
                //  }
                //  break;
                case INTERPOLATIONTYPES.EXPONENTIAL:
                    switch (animationType) {
                        case ANIMATIONTYPES.IN:
                            ani += 'cubic-bezier(0.95, 0.05, 0.795, 0.035)';
                            break;
                        case ANIMATIONTYPES.OUT:
                            ani += 'cubic-bezier(0.19, 1, 0.22, 1)';
                            break;
                        case ANIMATIONTYPES.INOUT:
                            ani += 'cubic-bezier(1, 0, 0, 1)';
                            break;
                    }
                    break;
                case INTERPOLATIONTYPES.LINEAR:
                    ani += 'linear ';
                    break;
                case INTERPOLATIONTYPES.QUADRATIC:
                    switch (animationType) {
                        case ANIMATIONTYPES.IN:
                            ani += 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
                            break;
                        case ANIMATIONTYPES.OUT:
                            ani += 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            break;
                        case ANIMATIONTYPES.INOUT:
                            ani += 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';
                            break;
                    }
                    break;
                case INTERPOLATIONTYPES.QUARTIC:
                    switch (animationType) {
                        case ANIMATIONTYPES.IN:
                            ani += 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
                            break;
                        case ANIMATIONTYPES.OUT:
                            ani += 'cubic-bezier(0.165, 0.84, 0.44, 1)';
                            break;
                        case ANIMATIONTYPES.INOUT:
                            ani += 'cubic-bezier(0.77, 0, 0.175, 1)';
                            break;
                    }
                    break;
                case INTERPOLATIONTYPES.QUINTIC:
                    switch (animationType) {
                        case ANIMATIONTYPES.IN:
                            ani += 'cubic-bezier(0.755, 0.05, 0.855, 0.06)';
                            break;
                        case ANIMATIONTYPES.OUT:
                            ani += 'cubic-bezier(0.23, 1, 0.32, 1)';
                            break;
                        case ANIMATIONTYPES.INOUT:
                            ani += 'cubic-bezier(0.86, 0, 0.07, 1)';
                            break;
                    }
                    break;
                case INTERPOLATIONTYPES.SINUSOIDAL:
                    switch (animationType) {
                        case ANIMATIONTYPES.IN:
                            ani += 'cubic-bezier(0.47, 0, 0.745, 0.715)';
                            break;
                        case ANIMATIONTYPES.OUT:
                            ani += 'cubic-bezier(0.39, 0.575, 0.565, 1)';
                            break;
                        case ANIMATIONTYPES.INOUT:
                            ani += 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';
                            break;
                    }
                    break;
            }
            // animation-delay
            ani += priv.delay + 's ';
            // animation-iteration-count
            this.loop ? ani += 'infinite ' : ani += '1 ';
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
            if (source instanceof core.classes.Animation) {
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
            this.onProcess.destroy();
            this.onProcess=null;
            delete this.onProcess;
            this.onFinish.destroy();
            this.onFinish = null;
            delete this.onFinish;
            priv.delayTime = null;
            priv.time = null;
            priv.initialValue = null;
            priv.pause = null;
            priv.animationType = null;
            priv.autoReverse = null;
            priv.enabled = null;
            priv.delay = null;
            priv.duration = null;
            priv.interpolation = null;
            priv.inverse = null;
            priv.hideOnFinish = null;
            priv.loop = null;
            priv.trigger = null;
            priv.triggerInverse = null;
            priv.propertyName = null;
            priv.control = null;
            priv.startFromCurrent = null;
            priv.startValue && core.tools.isFunc(priv.startValue.destroy) ? priv.startValue.destroy() : 1;
            priv.startValue = null;
            priv.stopValue && core.tools.isFunc(priv.stopValue.destroy) ? priv.stopValue.destroy() : 1;
            priv.stopValue = null;
            priv.autoStart = null;
            priv.running = null;
            priv.convertToCSS = null;
            super.destroy();
        }
        //#endregion
    }
    return Animation;
})();
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
core.classes.register(core.types.CATEGORIES.ANIMATIONS, Animation);
export { Animation };