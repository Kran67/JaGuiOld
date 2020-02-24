//#region Import
import { Bindable } from '/scripts/core/bindable.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
import { Css } from '/scripts/core/css.js';
//#endregion Import
//#region BUSYINDICATORSTYLES
/**
 * @type    {Object}        BUSYINDICATORSTYLES
 */
const BUSYINDICATORSTYLES = Object.freeze({
    SPIN: 'spin',
    WIN8CIRCLE: 'win8Circle',
    BALL: 'ball',
    CIRCLE: 'circle'
});
Object.seal(BUSYINDICATORSTYLES);
//#endregion BUSYINDICATORSTYLES
//#region BusyIndicatorSpinOptions
const BusyIndicatorSpinOptions = (() => {
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
    //#region Class BusyIndicatorSpinOptions
    class BusyIndicatorSpinOptions extends Bindable {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                // The number of lines to draw
                priv.lines = props.hasOwnProperty('lines')?props.lines:12;
                // The length of each line
                priv.length = props.hasOwnProperty('length')?props.length:7;
                // The line thickness
                priv.lWidth = props.hasOwnProperty('lWidth')?props.lWidth:4;
                // Roundness (0..1)
                priv.corners = props.hasOwnProperty('corners')?props.corners:0;
                // 1: clockwise, -1: counterclockwise
                priv.direction = props.hasOwnProperty('direction')?props.direction:1;
                // Rounds per second
                priv.speed = props.hasOwnProperty('speed')?props.speed:1;
                // Afterglow percentage
                priv.trail = props.hasOwnProperty('trail')?props.trail:100;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region lines
        get lines() {
            return internal(this).lines;
        }
        set lines(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < 5 || newValue > 17) {
                    newValue = 12;
                }
                if (priv.lines !== newValue) {
                    priv.lines = newValue;
                    this.propertyChanged('lines');
                    if (Core.isHTMLRenderer) {
                        this.owner.update();
                    }
                }
            }
        }
        //#endregion lines
        //#region length
        get length() {
            return internal(this).length;
        }
        set length(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < 0 || newValue > 40) {
                    newValue = 7;
                }
                if (priv.length !== newValue) {
                    priv.length = newValue;
                    this.propertyChanged('length');
                    if (Core.isHTMLRenderer) {
                        this.owner.update();
                    }
                }
            }
        }
        //#endregion length
        //#region width
        get lWidth() {
            return internal(this).lWidth;
        }
        set lWidth(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < 2 || newValue > 30) {
                    newValue = 4;
                }
                if (priv.lWidth !== newValue) {
                    priv.lWidth = newValue;
                    this.propertyChanged('width');
                    if (Core.isHTMLRenderer) {
                        this.owner.update();
                    }
                }
            }
        }
        //#endregion width
        //#region corners
        get corners() {
            return internal(this).corners;
        }
        set corners(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < 0 || newValue > 1) {
                    newValue = 0;
                }
                if (priv.corners !== newValue) {
                    priv.corners = newValue;
                    this.propertyChanged('corners');
                    if (Core.isHTMLRenderer) {
                        this.owner.update();
                    }
                }
            }
        }
        //#endregion corners
        //#region direction
        get direction() {
            return internal(this).direction;
        }
        set direction(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < -1 || newValue > 1) {
                    newValue = 1;
                }
                if (priv.direction !== newValue) {
                    priv.direction = newValue;
                    this.propertyChanged('direction');
                    if (Core.isHTMLRenderer) {
                        this.owner.update();
                    }
                }
            }
        }
        //#endregion direction
        //#region speed
        get speed() {
            return internal(this).speed;
        }
        set speed(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < 0.5 || newValue > 2.2) {
                    newValue = 1;
                }
                if (priv.speed !== newValue) {
                    priv.speed = newValue;
                    this.propertyChanged('speed');
                    if (Core.isHTMLRenderer) {
                        this.owner.update();
                    }
                }
            }
        }
        //#endregion speed
        //#region trail
        get trail() {
            return internal(this).trail;
        }
        set trail(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue < 10 || newValue > 100) {
                    newValue = 100;
                }
                if (this.trail !== newValue) {
                    priv.properties.trail = newValue;
                    priv.propertyChanged('trail');
                    if (Core.isHTMLRenderer) {
                        this.owner.update();
                    }
                }
            }
        }
        //#endregion trail
        //#endregion Getters / Setters
        //#region Methods
        //#region destroy
        destroy() {
            super.destroy();
            priv.lines = null;
            priv.length = null;
            priv.width = null;
            priv.corners = null;
            priv.direction = null;
            priv.speed = null;
            priv.trail = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return BusyIndicatorSpinOptions;
    //#endregion BusyIndicatorSpinOptions
})();
//#endregion BusyIndicatorSpinOptions
Object.seal(BusyIndicatorSpinOptions);
//#region BusyIndicator
const BusyIndicator = (() => {
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
    //#region Class BusyIndicator
    class BusyIndicator extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'indicatorStyle',
                    enum: BUSYINDICATORSTYLES,
                    variable: priv,
                    value: props.hasOwnProperty('indicatorStyle') ? props.indicatorStyle : BUSYINDICATORSTYLES.SPIN
                });
                priv.spinIndicatorOptions = new BusyIndicatorSpinOptions(this,  props);
                delete this.tabOrder;
                this.allowUpdateOnResize = true;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region indicatorStyle
        get indicatorStyle() {
            return internal(this).indicatorStyle;
        }
        set indicatorStyle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, BUSYINDICATORSTYLES)) {
                if (priv.indicatorStyle !== newValue) {
                    priv.indicatorStyle = newValue;
                    if(core.isHTMLRenderer) {
                        this.update();
                    }
                }
            }
        }
        //#endregion indicatorStyle
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
            this.addAnimations();
        }
        //#endregion loaded
        //#region addAnimations
        addAnimations() {
            //#region Variables déclaration
            const priv = internal(this);
            let cssProp;
            const browser = Core.browser;
            const transform = browser.getVendorPrefix('transform');
            const atf = browser.getVendorPrefix('animation-timing-function');
            //#endregion Variables déclaration
            switch (priv.indicatorStyle) {
                case BUSYINDICATORSTYLES.WIN8CIRCLE:
                    if (!Css.isCSSRuleExist(`@${browser.getVendorPrefix('keyframes')}keyframes orbit`)) {
                        cssProp = ['0% { ', transform, 'transform: rotate(225deg);opacity: 1;', atf, 'animation-timing-function: ease-out; } ',
                                 '7% { ', transform, 'transform: rotate(345deg);', atf, 'animation-timing-function: linear; } ',
                                 '30% { ', transform, 'transform: rotate(455deg);', atf, 'animation-timing-function: ease-in-out; } ',
                                 '39% { ', transform, 'transform: rotate(690deg);', atf, 'animation-timing-function: linear; } ',
                                 '70% { ', transform, 'transform: rotate(815deg);opacity: 1;', atf, 'animation-timing-function: ease-out; } ',
                                 '75% { ', transform, 'transform: rotate(945deg);', atf, 'animation-timing-function: ease-out; } ',
                                 '76% { ', transform, 'transform: rotate(945deg);opacity: 0; } ',
                                 '100% { ', transform, 'transform: rotate(945deg);opacity: 0; } '].join(String.EMPTY);
                        Css.addCSSRule(`@${browser.getVendorPrefix('keyframes')}keyframes orbit`, cssProp);
                    }
                    break;
                case BUSYINDICATORSTYLES.BALL:
                    if (!Css.isCSSRuleExist(`@${browser.getVendorPrefix('keyframes')}keyframes spinoff`)) {
                        cssProp = ['0% { ', transform, 'transform: rotate(0deg); }', 
                                   '100% { ', transform, 'transform: rotate(360deg); }'].join(String.EMPTY);
                        Css.addCSSRule(`@${browser.getVendorPrefix('keyframes')}keyframes spin`, cssProp);
                        cssProp = ['0% { ', transform, 'transform: rotate(0deg); }', 
                                    '100% { ', transform, 'transform: rotate(-360deg); }'].join(String.EMPTY);
                        Css.addCSSRule(`@${browser.getVendorPrefix('keyframes')}keyframes spinoff`, cssProp);
                    }
                    break;
                case BUSYINDICATORSTYLES.CIRCLE:
                    if (!Css.isCSSRuleExist(`@${browser.getVendorPrefix('keyframes')}keyframes spinoffPulse`)) {
                        cssProp = ['50% { ', transform, 'transform: rotate(145deg);opacity: 1; } ', 
                                    '100% { ', transform, 'transform: rotate(-320deg);opacity: 0; }; '].join(String.EMPTY);
                        Css.addCSSRule(`@${browser.getVendorPrefix('keyframes')}keyframes spinPulse`, cssProp);
                        cssProp = ['0% { ', transform, 'transform: rotate(0deg); } ', 
                                    '100% { ', transform, 'transform: rotate(360deg); }; '].join(String.EMPTY);
                        Css.addCSSRule(`@${browser.getVendorPrefix('keyframes')}keyframes spinoffPulse`, cssProp);
                    }
                    break;
            }
        }
        //#endregion addAnimations
        //#region removeCssRules
        removeCssRules() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            switch (priv.indicatorStyle) {
                case BUSYINDICATORSTYLES.SPIN:
                    break;
                case BUSYINDICATORSTYLES.WIN8CIRCLE:
                    Css.removeCSSRule(`#${this.internalId} .${this.themeName}.win8circle${Types.PSEUDOCSSCLASS.AFTER}`);
                    Css.removeCSSRule(`#${this.internalId} .win8circle`);
                    break;
                case BUSYINDICATORSTYLES.BALL:
                    break;
                case BUSYINDICATORSTYLES.CIRCLE:
                    break;
            }
        }
        //#endregion removeCssRules
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const PX = Types.CSSUNITS.PX;
            const browser = Core.browser;
            let TAG = `${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
            let child = null;
            let child1 = null;
            let child2 = null;
            let i = 0;
            let style = String.EMPTY;
            let sio = null;
            let start = null;
            let z = null;
            let rule = null;
            //#endregion Variables déclaration
            if (htmlElement) {
                htmlElement.innerHTML = String.EMPTY;
                switch (priv.indicatorStyle) {
                    case BUSYINDICATORSTYLES.SPIN:
                        // based on http://fgnass.github.io/spin.js/
                        sio = priv.spinIndicatorOptions;
                        child = document.createElement(`${TAG}spincontainer`);
                        child.classList.add('spinContainer');
                        for (; i < sio.lines; i++) {
                            child1 = document.createElement(`${TAG}spinc`);
                            style = `top:${(1 + ~(sio.lWidth / 2))}${PX};opacity:0;`;
                            child1.setAttribute('id', `${this.internalId}_${(i + 1)}`);
                            start = 0.01 + i / sio.lines * 100;
                            z = Math.max(1 - 1 / sio.trail * (100 - start), 0);
                            style += `${browser.getVendorPrefix('animation')}animation:${child1.id} ${1 / sio.speed}s linear infinite`;
                            rule = `@${browser.getVendorPrefix('keyframes')}keyframes ${child1.id}`;
                            Css.removeCSSRule(rule);
                            Css.addCSSRule(rule,
                              ['0%{opacity:', z + '}',
                              start, '%{opacity:0}',
                              (start + 0.01), '%{opacity:1}',
                              (start + sio.trail) % 100, '%{opacity:0}',
                              '100%{opacity:', z, '}'].join(String.EMPTY)
                            );
                            child1.setAttribute('style', style);
                            child1.jsObj = this;
                            child1.classList.add('Control', 'spinC');
                            child2 = document.createElement(`${TAG}spinindic`);
                            style = ['width:', (sio.length + sio.lWidth), PX, ';',
                                    'height:', sio.lWidth, PX, ';',
                                    browser.getVendorPrefix('transform-origin'), 'transform-origin:left;',
                                    browser.getVendorPrefix('transform'), 'transform:rotate(', ~~(360 / sio.lines * i) + 'deg) ',
                                    browser.getVendorPrefix('translate'), 'translate(', sio.length, PX, ',0);',
                                    'border-radius:', (sio.corners * sio.lWidth >> 1), PX, ';'].join(String.EMPTY);
                            child2.setAttribute('style', style);
                            child2.classList.add('spinIndic', this.themeName);
                            child2.jsObj = this;
                            child1.appendChild(child2);
                            child.appendChild(child1);
                            htmlElement.appendChild(child);
                        }
                        break;
                    case BUSYINDICATORSTYLES.WIN8CIRCLE:
                        // based on http://codepen.io/janrubio/pen/DusIE
                        Css.removeCSSRule(`#${this.internalId} .win8circle${Types.PSEUDOCSSCLASS.AFTER}`);
                        for (i = 0; i < 5; i++) {
                            child = document.createElement(`${TAG}win8circle`);
                            child.classList.add('win8circle');
                            child.jsObj = this;
                            style = child.style;
                            switch (i) {
                                case 1:
                                    style.mozAnimationDelay = '240ms';
                                    style.oAnimationDelay = '240ms';
                                    style.msAnimationDelay = '240ms';
                                    style.webkitAnimationDelay = '240ms';
                                    style.animationDelay = '240ms';
                                    break;
                                case 2:
                                    style.mozAnimationDelay = '480ms';
                                    style.oAnimationDelay = '480ms';
                                    style.msAnimationDelay = '480ms';
                                    style.webkitAnimationDelay = '480ms';
                                    style.animationDelay = '480ms';
                                    break;
                                case 3:
                                    style.mozAnimationDelay = '720ms';
                                    style.oAnimationDelay = '720ms';
                                    style.msAnimationDelay = '720ms';
                                    style.webkitAnimationDelay = '720ms';
                                    style.animationDelay = '720ms';
                                    break;
                                case 4:
                                    style.mozAnimationDelay = '960ms';
                                    style.oAnimationDelay = '960ms';
                                    style.msAnimationDelay = '960ms';
                                    style.webkitAnimationDelay = '960ms';
                                    style.animationDelay = '960ms';
                                    break;
                            }
                            htmlElement.appendChild(child);
                        }
                        break;
                    case BUSYINDICATORSTYLES.BALL:
                        // based on http://www.alessioatzeni.com/wp-content/tutorials/html-css/CSS3-loading-animation-loop/index.html
                        child = document.createElement(`${TAG}ballindic`);
                        child.classList.add('Control', 'ballIndic', this.themeName);
                        child.jsObj = this;
                        htmlElement.appendChild(child);
                        child = document.createElement(`${TAG}ball1indic`);
                        child.classList.add('Control', 'ball1Indic', this.themeName);
                        child.jsObj = this;
                        htmlElement.appendChild(child);
                        break;
                    case BUSYINDICATORSTYLES.CIRCLE:
                        // based on http://www.alessioatzeni.com/wp-content/tutorials/html-css/CSS3-loading-animation-loop/index.html
                        child = document.createElement(`${TAG}circleindic`);
                        child.classList.add('Control', 'circleIndic', this.themeName);
                        child.jsObj = this;
                        htmlElement.appendChild(child);
                        child = document.createElement(`${TAG}circle1indic`);
                        child.classList.add('Control', 'circle1Indic', this.themeName);
                        child.jsObj = this;
                        htmlElement.appendChild(child);
                        break;
                }
            }
        }
        //#endregion update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.indicatorStyle = null;
            priv.spinIndicatorOptions.destroy();
            priv.spinIndicatorOptions = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return BusyIndicator;
    //#endregion BusyIndicator
})();
//#endregion BusyIndicator
Object.seal(BusyIndicator);
Core.classes.register(Types.CATEGORIES.INTERNAL, BusyIndicatorSpinOptions);
Core.classes.register(Types.CATEGORIES.COMMON, BusyIndicator);
export { BusyIndicator };
//#region Templates
if (Core.isHTMLRenderer) {
    const BusyIndicatorTpl = ['<jagui-busyindicator id="{internalId}" data-class="BusyIndicator" class="Control BusyIndicator {theme}">',
        '<properties>{ "name": "{name}", "width": 45, "height": 45 }</properties></jagui-busyindicator>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: BusyIndicator, template: BusyIndicatorTpl }]);
}
//#endregion