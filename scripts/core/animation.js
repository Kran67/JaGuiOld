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
class Animation extends Component {
    //#region Private fields
    #delayTime = 0;
    #time = 0;
    #initialValue = 0;
    #pause = !1;
    #animationType = ANIMATIONTYPES.IN;
    #autoReverse = !1;
    #enabled = !0;
    #delay = 0;
    #duration = 0.2;
    #interpolation = Interpolation.INTERPOLATIONTYPES.LINEAR;
    #inverse = !1;
    #hideOnFinish = !1;
    #loop = !1;
    #trigger = String.EMPTY;
    #triggerInverse = String.EMPTY;
    #propertyName = String.EMPTY;
    #control = null;
    #startFromCurrent = !1;
    #startValue = null;
    #stopValue = null;
    #autoStart = !1;
    #running = !1;
    #convertToCSS = core.isHTMLRenderer;
    //#endregion Private fields
    /**
     * Create a new instance of Animation.
     * @param   {Object}    owner       Owner of the Animation.
     * @param   {Object}    props       Properties to initialize the Animation.
     * @param   {Boolean}   autoStart   Start the animation after creation.
     */
    constructor(owner, props, autoStart) {
        props = !props ? {} : props;
        super(owner, props);
        this.#autoStart = autoStart ? !0 : !1;
        this.createEventsAndBind(['onProcess', 'onFinish'], props);
    }
    //#region Getters / Setters
    //#region delayTime
    get delayTime() {
        return this.#delayTime;
    }
    set delayTime(newValue) {
        this.#delayTime = newValue;
    }
    //#endregion delayTime
    //#region time
    get time() {
        return this.#time;
    }
    set time(newValue) {
        this.#time = newValue;
    }
    //#endregion time
    //#region initialValue
    get initialValue() {
        return this.#initialValue;
    }
    set initialValue(newValue) {
        this.#initialValue = newValue;
    }
    //#endregion initialValue
    //#region pause
    get pause() {
        return this.#pause;
    }
    set pause(newValue) {
        //#region Variables déclaration
        let pause = this.#pause;
        const jsCssProperties = core.types.JSCSSPROPERTIES;
        const owner = this.owner;
        const form = this.form;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && newValue !== pause) {
            pause = this.#pause = newValue;
            if (pause) {
                if (this.#running) {
                    if (!core.isHTMLRenderer || owner.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
                        this.stopAtCurrent();
                    } else if (!this.loading && !form.loading) {
                        core.isHTMLRenderer && Css.updateInlineCSS(this, jsCssProperties.ANIMATIONSTATE);
                    }
                }
                else {
                    this.stop();
                }
            } else if (!this.loading && !form.loading && core.isHTMLRenderer) {
                Css.updateInlineCSS(owner, jsCssProperties.ANIMATIONSTATE, String.EMPTY);
            }
        }
    }
    //#endregion pause
    //#region animationType
    get animationType() {
        return this.#animationType;
    }
    set animationType(newValue) {
        core.tools.valueInSet(newValue, Animation.ANIMATIONTYPES) && newValue !== this.#animationType
            && (this.#animationType = newValue);
    }
    //#endregion animationType
    //#region autoReverse
    get autoReverse() {
        return this.#autoReverse;
    }
    set autoReverse(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#autoReverse
            && (this.#autoReverse = newValue);
    }
    //#endregion autoReverse
    //#region enabled
    get enabled() {
        return this.#enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        let enabled = this.#enabled;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && newValue !== enabled) {
            enabled = this.#enabled = newValue;
            enabled ? this.start() : this.stop();
        }
    }
    //#endregion enabled
    //#region delay
    get delay() {
        return this.#delay;
    }
    set delay(newValue) {
        core.tools.isNumber(newValue) && newValue !== this.#delay
            && (this.#delay = newValue);
    }
    //#endregion delay
    //#region duration
    get duration() {
        return this.#duration;
    }
    set duration(newValue) {
        core.tools.isNumber(newValue) && newValue !== this.#duration
            && (this.#duration = newValue);
    }
    //#endregion duration
    //#region interpolation
    get interpolation() {
        return this.#interpolation;
    }
    set interpolation(newValue) {
        core.tools.valueInSet(newValue, Interpolation.INTERPOLATIONTYPES) && newValue !== this.#interpolation
            && (this.#interpolation = newValue);
    }
    //#endregion interpolation
    //#region inverse
    get inverse() {
        return this.#inverse;
    }
    set inverse(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#inverse
            && (this.#inverse = newValue);
    }
    //#endregion inverse
    //#region hideOnFinish
    get hideOnFinish() {
        return this.#hideOnFinish;
    }
    set hideOnFinish(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#hideOnFinish
            && (this.#hideOnFinish = newValue);
    }
    //#endregion hideOnFinish
    //#region loop
    get loop() {
        return this.#loop;
    }
    set loop(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#loop
            && (this.#loop = newValue);
    }
    //#endregion loop
    //#region trigger
    get trigger() {
        return this.#trigger;
    }
    set trigger(newValue) {
        core.tools.isString(newValue) && newValue !== this.#trigger
            && (this.#trigger = newValue);
    }
    //#endregion trigger
    //#region triggerInverse
    get triggerInverse() {
        return this.#triggerInverse;
    }
    set triggerInverse(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#triggerInverse
            && (this.#triggerInverse = newValue);
    }
    //#endregion triggerInverse
    //#region propertyName
    get propertyName() {
        return this.#propertyName;
    }
    set propertyName(newValue) {
        if (core.tools.isString(newValue) && newValue !== this.#propertyName) {
            this.#propertyName = newValue;
            this.updateCSS();
        }
    }
    //#endregion propertyName
    //#region control
    get control() {
        return this.#control;
    }
    set control(newValue) {
        if (newValue instanceof core.classes.Control && this.#control !== newValue) {
            this.stop();
            this.#control = newValue;
            this.#autoStart && this.start();
        }
    }
    //#endregion control
    //#region startFromCurrent
    get startFromCurrent() {
        return this.#startFromCurrent;
    }
    set startFromCurrent(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#startFromCurrent
            && (this.#startFromCurrent = newValue);
    }
    //#endregion startFromCurrent
    //#region startValue
    get startValue() {
        return this.#startValue;
    }
    set startValue(newValue) {
        typeof this.#startValue === typeof newValue && newValue !== this.#startValue
            && (this.#startValue = newValue);
    }
    //#endregion startValue
    //#region stopValue
    get stopValue() {
        return this.#stopValue;
    }
    set stopValue(newValue) {
        typeof this.#stopValue === typeof newValue && newValue !== this.#stopValue
            && (this.#stopValue = newValue);
    }
    //#endregion stopValue
    //#region autoStart
    get autoStart() {
        return this.#autoStart;
    }
    set autoStart(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#autoStart
            && (this.#autoStart = newValue);
    }
    //#endregion autoStart
    //#region running
    get running() {
        return this.#running;
    }
    set running(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#running
            && (this.#running = newValue);
    }
    //#endregion running
    //#region convertToCSS
    get convertToCSS() {
        return this.#convertToCSS;
    }
    set convertToCSS(newValue) {
        core.tools.isBool(newValue) && newValue !== this.#convertToCSS
            && (this.#convertToCSS = newValue);
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
        //#region Variables déclaration
        const inverse = this.inverse;
        //#endregion Variables déclaration
        if (this.control) {
            if (!this.convertToCSS /*|| this instanceof core.classes.PathAnimation*/ || this.owner.HTMLElement === core.types.HTMLELEMENTS.CANVAS) {
                core.disableAnimation && (this.#duration = 0.001);
                if (Math.abs(this.#duration) < 0.001) {
                    this.#delayTime = 0;
                    if (inverse) {
                        this.#time = 0;
                        this.#duration = 1;
                    } else {
                        this.#time = 1;
                        this.#duration = 1;
                    }
                    this.#running = !0;
                    this.processAnimation();
                    this.#running = !1;
                    this.#time = 0;
                    this.#duration = 0.00001;
                    this.onFinish.invoke();
                    this.#enabled = !1;
                } else {
                    this.#delayTime = this.#delay;
                    this.#running = !0;
                    this.#time = inverse ? this.#duration : 0;
                    this.#delay === 0 && this.processAnimation();
                    this.#enabled = !0;
                }
                core.looper.addListener(this, 'animate');
            } else {
                this.#running = !0;
                core.isHTMLRenderer && Css.updateInlineCSS(this, core.types.JSCSSPROPERTIES.ANIMATION);
            }
        }
    }
    /**
     * Stop the animation
     */
    stop() {
        //#region Variables déclaration
        const htmlElements = core.types.HTMLELEMENTS;
        const htmlElement = this.control ? this.control.HTMLElement : null;
        //#endregion Variables déclaration
        if (!this.convertToCSS || htmlElement === htmlElements.CANVAS) {
            this.#time = this.#inverse ? 0 : this.#duration;
            this.processAnimation();
        }
        this.#running = !1;
        this.#enabled = !1;
        this.onFinish.invoke();
        !this.convertToCSS || htmlElement === htmlElements.CANVAS;
        core.looper.removeListener(this) && !this.loading && !this.form.loading && core.isHTMLRenderer
            && Css.updateInlineCSS(this.control, core.types.JSCSSPROPERTIES.ANIMATION, String.EMPTY);
    }
    /**
     * When the class is loaded
     * @override
     */
    loaded() {
        super.loaded();
        !core.isHTMLRenderer || this.control && this.control.HTMLElement === core.types.HTMLELEMENTS.CANVAS
            ? this.startFromCurrent && (this.initialValue = this.startValue) : this.updateCSS();
    }
    /**
     * Update css with properties
     */
    updateCSS() {
        if (core.isHTMLRenderer) {
            Css.removeCSSRule(`@${core.browser.getVendorPrefix('keyframes')}keyframes${this.priv}, core.types.CSSRULEcore.types.KEYFRAMES_RULE}`);
            if (this.#propertyName !== String.EMPTY) {
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
        if (this.#running) {
            this.#time = this.#inverse ? 0 : this.#duration;
            this.#running = !1;
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
        //#region Variables déclaration
        const triggerInverse = this.#triggerInverse;
        const thisTrigger = this.#trigger;
        //#endregion Variables déclaration
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
                    this.#inverse = !0;
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
                    !String.isNullOrEmpty(triggerInverse) && (this.#inverse = !1);
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
        //#region Variables déclaration
        const interpolation = this.#interpolation;
        const time = this.#time;
        const duration = this.#duration;
        const animationType = this.#animationType;
        const interpolationTypes = Interpolation.INTERPOLATIONTYPES;
        const fiveProps = {
            t: time,
            b: 0,
            c: 1,
            d: duration,
            a: animationType
        };
        //#endregion Variables déclaration
        if (duration > 0 && this.#delayTime <= 0) {
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
        //#region Variables déclaration
        const owner = this.owner;
        let running = this.#running;
        let delayTime = this.#delayTime;
        const autoReverse = this.#autoReverse;
        const duration = this.#duration;
        const loop = this.#loop;
        //#endregion Variables déclaration
        elapsedTime /= 1000;
        if (running && this.#pause) {
            if (owner) {
                if (!core.isHTMLRenderer) {
                    if (!owner.isVisible) {
                        this.stop();
                    } else if (running) {
                        this.pause = !1;
                    }
                } else {
                    if (!owner.isVisible) {
                        this.stop();
                    } else if (running) {
                        this.pause = !1;
                    }
                }
            }
            if (this.#delay > 0 && delayTime !== 0) {
                if (delayTime > 0) {
                    delayTime = this.#delayTime = delayTime - elapsedTime;
                    if (delayTime <= 0) {
                        this.start();
                        delayTime = this.delayTime = 0;
                    }
                }
                return;
            }
            this.#inverse ? this.#time -= elapsedTime : this.#time += elapsedTime;
            if (this.#time >= duration) {
                this.#startFromCurrent && (this.#startValue = this.#initialValue);
                this.#time = duration;
                if (loop) {
                    if (autoReverse) {
                        this.#inverse = !0;
                        this.#time = duration;
                    } else {
                        this.#time = 0;
                    }
                } else {
                    running = this.#running = !1;
                }
            } else if (this.#time <= 0) {
                this.#time = 0;
                if (loop) {
                    if (autoReverse) {
                        this.#inverse = !1;
                        this.#time = 0;
                    } else {
                        this.#time = duration;
                    }
                } else {
                    running = this.#running = !1;
                }
            }
            this.processAnimation();
            this.onProcess.invoke();
            !running && this.stop();
        }
    }
    /**
     * Convert animation properties to CSS
     * @param   {Number}    aniName     Name of the animation in CSS
     * @return  {String}                the css description of the animation
     */
    toCSS(aniName) {
        //#region Variables déclaration
        const interpolationTypes = Interpolation.INTERPOLATIONTYPES;
        let ani = String.EMPTY;
        const interpolation = this.#interpolation;
        const animationType = this.#animationType;
        const inverse = this.#inverse;
        const autoReverse = this.#autoReverse;
        //#endregion Variables déclaration
        if (!this.convertToCSS) {
            return String.EMPTY;
        }
        if (interpolation === interpolationTypes.BOUNCE || interpolation === interpolationTypes.ELASTIC) {
            return ani;
        }
        // animation-name + animation-duration
        ani += (aniName ? aniName : this.name) + String.SPACE + this.#duration + 's ';
        // animation-timing-function
        switch (interpolation) {
            case interpolationTypes.BACK:
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
            case interpolationTypes.CIRCULAR:
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
            case interpolationTypes.CUBIC:
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
            case interpolationTypes.EXPONENTIAL:
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
            case interpolationTypes.LINEAR:
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
            case interpolationTypes.QUARTIC:
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
            case interpolationTypes.QUINTIC:
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
            case interpolationTypes.SINUSOIDAL:
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
        ani += this.#delay + 's ';
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
            this.#running = source.running;
            this.#pause = source.pause;
            this.#animationType = source.animationType;
            this.#autoReverse = source.autoReverse;
            this.#enabled = source.enabled;
            this.#delay = source.delay;
            this.#duration = source.duration;
            this.#interpolation = source.interpolation;
            this.#inverse = source.inverse;
            this.#hideOnFinish = source.hideOnFinish;
            this.#loop = source.loop;
            this.#trigger = source.trigger;
            this.#triggerInverse = source.triggerInverse;
            this.#propertyName = source.propertyName;
        }
    }
    /**
     * Destroy all properties of the instance
     * @override
     */
    destroy() {
        this.#startValue && core.tools.isFunc(this.#startValue.destroy) ? this.#startValue.destroy() : 1;
        this.#stopValue && core.tools.isFunc(this.#stopValue.destroy) ? this.#stopValue.destroy() : 1;
        this.unBindAndDestroyEvents(['onProcess', 'onFinish']);
        super.destroy();
    }
    //#endregion
}
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