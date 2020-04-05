//#region Import
import { CustomTextBoxBtn } from '/scripts/core/customtextboxbtn.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region PasswordTextBox
const PasswordTextBox = (() => {
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
    //#region Class PasswordTextBox
    class PasswordTextBox extends CustomTextBoxBtn {
        //#region constructor
        constructor(owner, props) {
            const HTMLInputTypes = Types.HTMLINPUTTYPES;
            props = !props ? {} : props;
            if (owner) {
                props.type = HTMLInputTypes.PASSWORD;
                props.autoHideButtons = true;
                super(owner, props);
                if (!Core.isHTMLRenderer) {
                    this.width = 121;
                    this.height = 21;
                }
                const priv = internal(this);
                priv.showComplexityIndicator = props.hasOwnProperty('showComplexityIndicator') && Tools.isBool(props.showComplexityIndicator) ? props.showComplexityIndicator : false;
                priv.checkPassword = function (complexityIndicator) {
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
                    score += ~~((variationCount - 1) * 10);
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
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region showComplexityIndicator
        get showComplexityIndicator() {
            return internal(this).showComplexityIndicator;
        }
        set showComplexityIndicator(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showComplexityIndicator !== newValue) {
                    priv.showComplexityIndicator = newValue;
                    this.update();
                }
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
            if (Tools.isBool(newValue)) {
                if (this.enabled !== newValue) {
                    super.enabled = newValue;
                    if (this.enabled) {
                        btnHtmlElment.removeAttribute("disabled");
                    } else {
                        btnHtmlElment.setAttribute("disabled", "disabled");
                    }
                }
            }
        }
        //#endregion enabled
        //#endregion Getters / Setters
        //#region Methods
        //#region revealPassword
        revealPassword() {
            //#region Variables déclaration
            const HTMLInputTypes = Types.HTMLINPUTTYPES;
            const inputObj = this.owner.inputObj;
            //#endregion Variables déclaration
            if (this.isEnabled) {
                if (Core.isHTMLRenderer) {
                    if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && Core.mouse.eventType === Mouse.MOUSEEVENTS.DOWN) {
                        inputObj.setAttribute("type", HTMLInputTypes.TEXT);
                    } else {
                        inputObj.setAttribute("type", HTMLInputTypes.PASSWORD);
                        inputObj.focus();
                    }
                }
            }
        }
        //#endregion revealPassword
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.type = null;
            super.destroy();
        }
        //#ndregion destroy
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            let btnHtmlElment;
            let button;
            const TAG = `${Core.name.toLowerCase()}-`;
            //#endregion Variables déclaration
            priv.complexityIndicator = document.createElement(`${TAG}complexityindicator`);
            priv.complexityIndicator.classList.add('Control', 'ComplexityIndicator');
            this.HTMLElement.appendChild(priv.complexityIndicator);
            super.loaded();
            priv.inputObj = this.inputObj;
            button = this.btns.first;
            button.caption = '0';
            button.fontFamily = 'JaGui';
            button.canFocused = false;
            btnHtmlElment = button.HTMLElement;
            btnHtmlElment.classList.add('PasswordTextBoxButton');
            button.onMouseDown.addListener(this.revealPassword);
            button.onMouseUp.addListener(this.revealPassword);
            button.onMouseLeave.addListener(this.revealPassword);
        }
        //#endregion loaded
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.update();
            htmlElement.classList.remove('showComplexityIndicator');
            if (priv.showComplexityIndicator) {
                priv.checkPassword(priv.complexityIndicator);
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
    return PasswordTextBox;
    //#endregion PasswordTextBox
})();
Core.classes.register(Types.CATEGORIES.COMMON, PasswordTextBox);
//#endregion PasswordTextBox
//#region Templates
if (Core.isHTMLRenderer) {
    const PasswordTextBoxTpl = ['<jagui-passwordtextbox id="{internalId}" data-class="PasswordTextBox" ',
        'class="Control TextBox PasswordTextBox {theme}"><properties>{ "name": "{name}", "width": 135, "height": 20 }',
        '</properties></jagui-passwordtextbox>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: PasswordTextBox, template: PasswordTextBoxTpl }]);
}
//#endregion