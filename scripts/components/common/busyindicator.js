//#region Import
import { Bindable } from '/scripts/core/bindable.js';
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Css } from '/scripts/core/css.js';
//#endregion Import
//#region BUSYINDICATORSTYLES
/**
 * @type    {Object}        BUSYINDICATORSTYLES
 */
const BUSYINDICATORSTYLES = Object.freeze(Object.seal({
    SPIN: 'spin',
    WIN8CIRCLE: 'win8Circle',
    BALL: 'ball',
    CIRCLE: 'circle'
}));
//#endregion BUSYINDICATORSTYLES
//#region Class BusyIndicatorSpinOptions
class BusyIndicatorSpinOptions extends Bindable {
    //#region Private fields
    #lines;
    #length;
    #width;
    #corners;
    #direction;
    #speed;
    #trail;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            // The number of lines to draw
            this.#lines = props.hasOwnProperty('lines') ? props.lines : 12;
            // The length of each line
            this.#length = props.hasOwnProperty('length') ? props.length : 7;
            // The line thickness
            this.#width = props.hasOwnProperty('width') ? props.width : 4;
            // Roundness (0..1)
            this.#corners = props.hasOwnProperty('corners') ? props.corners : 0;
            // 1: clockwise, -1: counterclockwise
            this.#direction = props.hasOwnProperty('direction') ? props.direction : 1;
            // Rounds per second
            this.#speed = props.hasOwnProperty('speed') ? props.speed : 1;
            // Afterglow percentage
            this.#trail = props.hasOwnProperty('trail') ? props.trail : 100;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region lines
    get lines() {
        return this.#lines;
    }
    set lines(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue < 5 || newValue > 17 && (newValue = 12);
            if (this.#lines !== newValue) {
                this.#lines = newValue;
                this.propertyChanged('lines');
                core.isHTMLRenderer && this.owner.update();
            }
        }
    }
    //#endregion lines
    //#region length
    get length() {
        return this.#length;
    }
    set length(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue < 0 || newValue > 40 && (newValue = 7);
            if (this.#length !== newValue) {
                this.#length = newValue;
                this.propertyChanged('length');
                core.isHTMLRenderer && this.owner.update();
            }
        }
    }
    //#endregion length
    //#region width
    get width() {
        return this.#width;
    }
    set width(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue < 2 || newValue > 30 && (newValue = 4);
            if (this.#width !== newValue) {
                this.#width = newValue;
                this.propertyChanged('width');
                core.isHTMLRenderer && this.owner.update();
            }
        }
    }
    //#endregion width
    //#region corners
    get corners() {
        return this.#corners;
    }
    set corners(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue < 0 || newValue > 1 && (newValue = 0);
            if (this.#corners !== newValue) {
                this.#corners = newValue;
                this.propertyChanged('corners');
                core.isHTMLRenderer && this.owner.update();
            }
        }
    }
    //#endregion corners
    //#region direction
    get direction() {
        return this.#direction;
    }
    set direction(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue < -1 || newValue > 1 && (newValue = 1);
            if (this.#direction !== newValue) {
                this.#direction = newValue;
                this.propertyChanged('direction');
                core.isHTMLRenderer && this.owner.update();
            }
        }
    }
    //#endregion direction
    //#region speed
    get speed() {
        return this.#speed;
    }
    set speed(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue < 0.5 || newValue > 2.2 && (newValue = 1);
            if (this.#speed !== newValue) {
                this.#speed = newValue;
                this.propertyChanged('speed');
                core.isHTMLRenderer && this.owner.update();
            }
        }
    }
    //#endregion speed
    //#region trail
    get trail() {
        return this.#trail;
    }
    set trail(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue < 10 || newValue > 100 && (newValue = 100);
            if (this.#trail !== newValue) {
                this.#trail = newValue;
                this.#propertyChanged('trail');
                core.isHTMLRenderer && this.owner.update();
            }
        }
    }
    //#endregion trail
    //#endregion Getters / Setters
    //#region Methods
    //#endregion Methods
}
Object.defineProperties(BusyIndicatorSpinOptions.prototype, {
    'lines': {
        enumerable: !0
    },
    'length': {
        enumerable: !0
    },
    'width': {
        enumerable: !0
    },
    'width': {
        enumerable: !0
    },
    'direction': {
        enumerable: !0
    },
    'speed': {
        enumerable: !0
    },
    'trail': {
        enumerable: !0
    }
});
Object.seal(BusyIndicatorSpinOptions);
//#endregion BusyIndicatorSpinOptions
//#region Class BusyIndicator
class BusyIndicator extends ThemedControl {
    //#region Private fields
    #indicatorStyle;
    #spinIndicatorOptions;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowUpdateOnResize = !0;
            props.mouseEvents = { mousedown: !1, mouseup: !1, click: !1 };
            super(owner, props);
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'indicatorStyle',
                enum: BUSYINDICATORSTYLES,
                value: props.hasOwnProperty('indicatorStyle')
                    ? props.indicatorStyle : BUSYINDICATORSTYLES.SPIN
            });
            this.#spinIndicatorOptions = new BusyIndicatorSpinOptions(this, props.options);
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region indicatorStyle
    get indicatorStyle() {
        return this.#indicatorStyle;
    }
    set indicatorStyle(newValue) {
        if (core.tools.valueInSet(newValue, BUSYINDICATORSTYLES) && this.#indicatorStyle !== newValue) {
            this.#indicatorStyle = newValue;
            core.isHTMLRenderer && this.update();
            this.propertyChanged('indicatorStyle');
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
        let cssProp;
        //#endregion Variables déclaration
        switch (this.#indicatorStyle) {
            case BUSYINDICATORSTYLES.WIN8CIRCLE:
                if (!Css.isCSSRuleExist('@keyframes orbit')) {
                    cssProp = ['0% { transform: rotate(225deg);opacity: 1; animation-timing-function: ease-out; } ',
                        '7% { transform: rotate(345deg); animation-timing-function: linear; } ',
                        '30% { transform: rotate(455deg); animation-timing-function: ease-in-out; } ',
                        '39% { transform: rotate(690deg); animation-timing-function: linear; } ',
                        '70% { transform: rotate(815deg);opacity: 1; animation-timing-function: ease-out; } ',
                        '75% { transform: rotate(945deg); animation-timing-function: ease-out; } ',
                        '76% { transform: rotate(945deg);opacity: 0; } ',
                        '100% { transform: rotate(945deg);opacity: 0; } '].join(String.EMPTY);
                    Css.addCSSRule('@keyframes orbit', cssProp);
                }
                break;
            case BUSYINDICATORSTYLES.BALL:
                if (!Css.isCSSRuleExist('@keyframes spinoff')) {
                    cssProp = ['0% { transform: rotate(0deg); }',
                        '100% { transform: rotate(360deg); }'].join(String.EMPTY);
                    Css.addCSSRule('@keyframes spin', cssProp);
                    cssProp = ['0% { transform: rotate(0deg); }',
                        '100% { transform: rotate(-360deg); }'].join(String.EMPTY);
                    Css.addCSSRule('@keyframes spinoff', cssProp);
                }
                break;
            case BUSYINDICATORSTYLES.CIRCLE:
                if (!Css.isCSSRuleExist('@keyframes spinoffPulse')) {
                    cssProp = ['50% { transform: rotate(145deg);opacity: 1; } ',
                        '100% { transform: rotate(-320deg);opacity: 0; }; '].join(String.EMPTY);
                    Css.addCSSRule('@keyframes spinPulse', cssProp);
                    cssProp = ['0% { transform: rotate(0deg); } ',
                        '100% { transform: rotate(360deg); }; '].join(String.EMPTY);
                    Css.addCSSRule('@keyframes spinoffPulse', cssProp);
                }
                break;
        }
    }
    //#endregion addAnimations
    //#region removeCssRules
    removeCssRules() {
        switch (this.#indicatorStyle) {
            case BUSYINDICATORSTYLES.SPIN:
                break;
            case BUSYINDICATORSTYLES.WIN8CIRCLE:
                Css.removeCSSRule(`#${this.internalId} .${this.themeName}.win8circle${core.types.PSEUDOCSSCLASS.AFTER}`);
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
        const htmlElement = this.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        const TAG = `${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}`;
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
            switch (this.#indicatorStyle) {
                case BUSYINDICATORSTYLES.SPIN:
                    // based on http://fgnass.github.io/spin.js/
                    sio = this.#spinIndicatorOptions;
                    child = document.createElement(`${TAG}spincontainer`);
                    child.classList.add('spinContainer');
                    for (; i < sio.lines; i++) {
                        child1 = document.createElement(`${TAG}spinc`);
                        style = `top:${(1 + ~(sio.width / 2))}${PX};opacity:0;`;
                        child1.setAttribute('id', `${this.internalId}_${(i + 1)}`);
                        start = 0.01 + i / sio.lines * 100;
                        z = Math.max(1 - 1 / sio.trail * (100 - start), 0);
                        style += `animation:${child1.id} ${1 / sio.speed}s linear infinite`;
                        rule = `@keyframes ${child1.id}`;
                        Css.removeCSSRule(rule);
                        Css.addCSSRule(rule,
                            ['0%{opacity:', z + '}',
                                start, '%{opacity:0}',
                                (start + 0.01), '%{opacity:1}',
                                (start + sio.trail) % 100, '%{opacity:0}',
                                '100%{opacity:', z, '}'].join(String.EMPTY)
                        );
                        child1.setAttribute('style', style);
                        child1.classList.add('spinC');
                        child2 = document.createElement(`${TAG}spinindic`);
                        style = ['width:', (sio.length + sio.width), PX, ';',
                            'height:', sio.width, PX, '; transform-origin:left;',
                            'transform:rotate(', int(360 / sio.lines * i) + 'deg) ',
                            'translate(', sio.length, PX, ',0);',
                            'border-radius:', (sio.corners * sio.width >> 1), PX, ';'].join(String.EMPTY);
                        child2.setAttribute('style', style);
                        child2.classList.add('spinIndic', this.themeName);
                        child1.appendChild(child2);
                        child.appendChild(child1);
                        htmlElement.appendChild(child);
                    }
                    break;
                case BUSYINDICATORSTYLES.WIN8CIRCLE:
                    // based on http://codepen.io/janrubio/pen/DusIE
                    Css.removeCSSRule(`#${this.internalId} .win8circle${core.types.PSEUDOCSSCLASS.AFTER}`);
                    for (i = 0; i < 5; i++) {
                        child = document.createElement(`${TAG}win8circle`);
                        child.classList.add('win8circle');
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
                    child.classList.add('ballIndic', this.themeName);
                    htmlElement.appendChild(child);
                    child = document.createElement(`${TAG}ball1indic`);
                    child.classList.add('ball1Indic', this.themeName);
                    htmlElement.appendChild(child);
                    break;
                case BUSYINDICATORSTYLES.CIRCLE:
                    // based on http://www.alessioatzeni.com/wp-content/tutorials/html-css/CSS3-loading-animation-loop/index.html
                    child = document.createElement(`${TAG}circleindic`);
                    child.classList.add('circleIndic', this.themeName);
                    htmlElement.appendChild(child);
                    child = document.createElement(`${TAG}circle1indic`);
                    child.classList.add('circle1Indic', this.themeName);
                    htmlElement.appendChild(child);
                    break;
            }
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.#spinIndicatorOptions.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(BusyIndicator.prototype, {
    'spinIndicatorOptions': {
        enumerable: !0
    }
});
Object.seal(BusyIndicator);
core.classes.register(core.types.CATEGORIES.INTERNAL, BusyIndicatorSpinOptions);
core.classes.register(core.types.CATEGORIES.COMMON, BusyIndicator);
//#endregion BusyIndicator
//#region Templates
if (core.isHTMLRenderer) {
    const BusyIndicatorTpl = ['<jagui-busyindicator id="{internalId}" data-class="BusyIndicator" class="Control BusyIndicator {theme}">',
        '<properties>{ "name": "{name}", "width": 45, "height": 45 }</properties></jagui-busyindicator>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: BusyIndicator, template: BusyIndicatorTpl }]);
}
//#endregion
export { BusyIndicator };