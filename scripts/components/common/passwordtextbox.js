﻿//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class PasswordTextBox
class PasswordTextBox extends CustomTextBoxBtn {
    //#region Private fields
    #showComplexityIndicator;
    #checkPassword = function (complexityIndicator) {
        //#region Variables déclaration
        let score = 0;
        const pass = this.inputObj ? this.inputObj.value : String.EMPTY;
        // award every unique letter until 5 repetitions
        let letters = {};
        let variationCount = 0;
        // bonus points for mixing it up
        let variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass),
        };
        const colors = ['#E9E9E9', '#D41A1D', '#F8AC1B', '#A4BD6A', '#11AA11'];
        let idx = 0;
        //#endregion Variables déclaration
        for (let i = 0; i < pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }

        for (let check in variations) {
            variationCount += (variations[check]) ? 1 : 0;
        }
        score += int((variationCount - 1) * 10);
        complexityIndicator.style.backgroundSize = `${score <= 0 ? 100 : score}% 100%`;
        if (score > 90 || score <= 0) {
            idx = score <= 0 ? 0 : 4;
        } else if (score > 70) {
            idx = 3;
        } else if (score >= 40) {
            idx = 2;
        } else if (score >= 20) {
            idx = 1;
        }
        complexityIndicator.style.backgroundImage = `linear-gradient(to right, ${colors[idx]}, ${colors[idx]})`;
    };
    #complexityIndicator;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.type = core.types.HTMLINPUTTYPES.PASSWORD;
            props.autoHideButtons = !0;
            if (!core.isHTMLRenderer) {
                props.width = 121;
                props.height = 21;
            }
            super(owner, props);
            this.#showComplexityIndicator = props.hasOwnProperty('showComplexityIndicator')
                    && core.tools.isBool(props.showComplexityIndicator) ? props.showComplexityIndicator : !1;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region showComplexityIndicator
    get showComplexityIndicator() {
        return this.#showComplexityIndicator;
    }
    set showComplexityIndicator(newValue) {
        if (core.tools.isBool(newValue) && this.#showComplexityIndicator !== newValue) {
            this.#showComplexityIndicator = newValue;
            this.update();
        }
    }
    //#endregion enabled
    //#region enabled
    get enabled() {
        return super.enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const btnHtmlElment = this.btns.first.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.enabled !== newValue) {
            super.enabled = newValue;
            this.enabled
                ? btnHtmlElment.removeAttribute('disabled')
                : btnHtmlElment.setAttribute('disabled', 'disabled');
        }
    }
    //#endregion enabled
    //#endregion Getters / Setters
    //#region Methods
    //#region revealPassword
    revealPassword() {
        //#region Variables déclaration
        const inputObj = this.owner.inputObj;
        const HTMLINPUTTYPES = core.types.HTMLINPUTTYPES;
        //#endregion Variables déclaration
        if (this.isEnabled && core.isHTMLRenderer) {
            if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && core.mouse.eventType === Mouse.MOUSEEVENTS.DOWN) {
                inputObj.setAttribute('type', HTMLINPUTTYPES.TEXT);
            } else {
                inputObj.setAttribute('type', HTMLINPUTTYPES.PASSWORD);
                inputObj.focus();
            }
        }
    }
    //#endregion revealPassword
    //#region loaded
    loaded() {
        //#region Variables déclaration
        let btnHtmlElment;
        let button;
        const TAG = `${core.name.toLowerCase()}-`;
        //#endregion Variables déclaration
        this.#complexityIndicator = document.createElement(`${TAG}complexityindicator`);
        this.#complexityIndicator.classList.add('ComplexityIndicator');
        this.HTMLElement.appendChild(this.#complexityIndicator);
        super.loaded();
        //this.#inputObj = this.inputObj;
        button = this.btns.first;
        button.caption = '0';
        button.fontFamily = 'JaGui';
        button.canFocused = !1;
        btnHtmlElment = button.HTMLElement;
        btnHtmlElment.classList.add('PasswordTextBoxButton');
        button.onMouseDown.addListener(this.revealPassword);
        button.onMouseUp.addListener(this.revealPassword);
        //button.onMouseLeave.addListener(this.revealPassword);
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.update();
        htmlElement.classList.remove('showComplexityIndicator');
        if (this.#showComplexityIndicator) {
            this.#checkPassword(this.#complexityIndicator);
            htmlElement.classList.add('showComplexityIndicator');
        }
    }
    //#endregion update
    //#region keyPress
    keyPress() {
        super.keyPress();
        this.update();
    }
    //#endregion keyPress
    //#region keyUp
    keyUp() {
        super.keyUp();
        this.update();
    }
    //#endregion keyUp
    //#endregion Methods
}
Object.defineProperties(PasswordTextBox.prototype, {
    'showComplexityIndicator': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.COMMON, PasswordTextBox);
//#endregion PasswordTextBox
//#region Templates
if (core.isHTMLRenderer) {
    const PasswordTextBoxTpl = ['<jagui-passwordtextbox id="{internalId}" data-class="PasswordTextBox" ',
        'class="Control TextBox PasswordTextBox {theme}"><properties>{ "name": "{name}", "width": 135, "height": 20 }',
        '</properties></jagui-passwordtextbox>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: PasswordTextBox, template: PasswordTextBoxTpl }]);
}
//#endregion
export { PasswordTextBox };