//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { Window } from '/scripts/components/containers/window.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class CustomButton
class CustomButton extends CaptionControl {
    //#region Private fields
    #pressing = !1;
    #repeatTimer = null;
    #staysPressed;
    #repeatClick;
    #action = null;
    #borderRadius;
    #modalResult;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        //#region Variables déclaration
        const modalResult = Window.MODALRESULTBUTTONS;
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            if (!core.isHTMLRenderer) {
                !props.hasOwnProperty('width') && core.tools.isNumber(props.width) && (props.width = 75);
                !props.hasOwnProperty('height') && core.tools.isNumber(props.height) && (props.height = 25);
            }
            props.autoCapture = !0;
            props.horizAlign = props.hasOwnProperty('horizAlign') ? props.horizAlign : core.types.TEXTALIGNS.CENTER;
            props.vertAlign = props.hasOwnProperty('vertAlign') ? props.vertAlign : core.types.VERTTEXTALIGNS.MIDDLE;
            props.autoSize = !1;
            super(owner, props);
            this.#staysPressed = props.hasOwnProperty('staysPressed') ? props.staysPressed : !1;
            this.#repeatClick = props.hasOwnProperty('repeatClick') ? props.repeatClick : !1;
            this.#borderRadius = props.hasOwnProperty('borderRadius') && core.tools.isNumber(props.borderRadius)
                    || core.tools.isObject(props.borderRadius) ? props.borderRadius : null;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'modalResult',
                enum: modalResult,
                value: props.hasOwnProperty('modalResult') ? props.modalResult : modalResult.NONE
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region pressing
    set pressing(newValue) {
        //#region Variables déclaration
        let pressing = this.#pressing;
        const htmlElement = this.HTMLElement;
        const textObj = this.textObj;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && pressing !== newValue) {
            pressing = this.#pressing = newValue;
            this.isPressed = pressing;
            if (core.isHTMLRenderer) {
                htmlElement.classList.remove('pressed');
                textObj.classList.remove('paddingDownText');
                if (pressing) {
                    htmlElement.classList.add('pressed');
                    textObj.classList.add('paddingDownText');
                }
            }
        }
    }
    //#endregion pressing
    //#region action
    get action() {
        return this.#action;
    }
    set action(newValue) {
        if (newValue instanceof core.classes.Action && this.#action !== newValue) {
            this.#action instanceof core.classes.Action && this.#action.unRegisterChanges(this);
            this.#action = newValue;
            this.#action.registerChanges(this);
            this.#action.updateTarget(this);
        }
    }
    //#endregion action
    //#region enabled
    get enabled() {
        return super.enabled;
    }
    set enabled(newValue) {
        if (core.tools.isBool(newValue) && newValue !== this.enabled) {
            this.resetTimer();
            super.enabled = newValue;
        }
    }
    //#endregion
    //#region borderRadius
    get borderRadius() {
        return this.#borderRadius;
    }
    set borderRadius(newValue) {
        if (this.#borderRadius !== newValue && core.tools.isNumber(newValue) || core.tools.isObject(newValue)) {
            this.#borderRadius = newValue;
            this.update();
        }
    }
    //#endregion borderRadius
    //#region repeatClick
    get repeatClick() {
        return this.#repeatClick;
    }
    set repeatClick(newValue) {
        core.tools.isBool(newValue) && this.#repeatClick !== newValue && (this.#repeatClick = newValue);
    }
    //#endregion repeatClick
    //#region staysPressed
    get staysPressed() {
        return this.#staysPressed;
    }
    set staysPressed(newValue) {
        if (core.tools.isBool(newValue) && this.#staysPressed !== newValue) {
            this.#staysPressed = newValue;
            this.update();
        }
    }
    //#endregion repeatClick
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        if (this.props.hasOwnProperty('action') && this.form[this.props.action]) {
            this.action = this.form[this.props.action];
        }
    }
    //#endregion loaded
    //#region update
    update() {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        super.update();
        if (htmlElement) {
            htmlElementStyle.borderRadius = this.#borderRadius ? `${this.#borderRadius}${PX}` : null;
            htmlElement.classList.remove('stayspressed');
            this.#staysPressed && htmlElement.classList.add('stayspressed');
        }
    }
    //#endregion update
    //#region click
    click() {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        super.click();
        if (this.#modalResult !== Window.MODALRESULTS.NONE) {
            form.modalResult = this.#modalResult;
            form.close();
        }
    }
    //#endregion update
    //#region mouseDown
    mouseDown() {
        if (this.enabled) {
            if (this.#action) {
                this.#action.execute();
            }
            super.mouseDown();
            core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this._down();
        }
    }
    //#endregion mouseDown
    //#region keyDown
    keyDown() {
        super.keyDown();
        core.keyboard.key === Keyboard.VKEYSCODES.VK_SPACE && this._down();
    }
    //#endregion keyDown
    //#region keyUp
    keyUp() {
        super.keyUp();
        core.keyboard.key === Keyboard.VKEYSCODES.VK_SPACE && this._up();
    }
    //#endregion keyUp
    //#region _down
    _down() {
        if (this.#staysPressed) {
            this.pressing = !0;
        } else if (this.#repeatClick && this.#repeatTimer === null) {
            this.#repeatTimer = setInterval(this.onTimer.bind(this), 200);
        }
        if (core.isHTMLRenderer) {
            if (this instanceof core.classes.ButtonGlyph) {
                this.textObj.classList.add('paddingDownText');
                this.glyph.classList.add('marginDownText');
            } else {
                this.HTMLElement.classList.add('buttonPaddingDownText');
            }
        }
    }
    //#endregion _down
    //#region mouseEnter
    mouseEnter() {
        super.mouseEnter();
        this.isPressed && this._down();
    }
    //#endregion mouseEnter
    //#region mouseLeave
    mouseLeave() {
        this.resetTimer();
        if (!this.#staysPressed) {
            super.mouseLeave();
            this._up();
        }
    }
    //#endregion mouseLeave
    //#region mouseUp
    mouseUp() {
        this.resetTimer();
        super.mouseUp();
        if (this.#staysPressed) {
            this.isPressed = !0;
            return;
        }
        this._up();
    }
    //#endregion mouseUp
    //#region _up
    _up() {
        this.resetTimer();
        if (core.isHTMLRenderer) {
            if (this instanceof core.classes.ButtonGlyph) {
                this.textObj.classList.remove('paddingDownText');
                this.glyph.classList.remove('marginDownText');
            } else {
                this.HTMLElement.classList.remove('buttonPaddingDownText');
            }
        } else {
            core.canvas.needRedraw = !0;
        }
    }
    //#endregion _up
    //#region resetTimer
    resetTimer() {
        clearInterval(this.#repeatTimer);
        this.#repeatTimer = null;
    }
    //#endregion resetTimer
    //#region assign
    assign(source) {
        if (source instanceof core.classes.CustomButton) {
            this.#staysPressed = source.staysPressed;
            this.isPressed = source.isPressed;
            this.#modalResult = source.modalResult;
            this.#repeatClick = source.repeatClick;
        }
    }
    //#endregion assign
    //#region onTimer
    onTimer() {
        this.enabled && this.mouseDown();
    }
    //#endregion onTimer
    //#region destroy
    destroy() {
        this.#action && this.#action.removeTarget(this);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(CustomButton.prototype, {
    'horizAlign': {
        enumerable: !0
    },
    'vertAlign': {
        enumerable: !0
    },
    'autoSize': {
        enumerable: !0
    },
    'staysPressed': {
        enumerable: !0
    },
    'repeatClick': {
        enumerable: !0
    },
    'borderRadius': {
        enumerable: !0
    },
    'action': {
        enumerable: !0
    }
});
//#endregion CustomButton
//#region Class Button
class Button extends CustomButton {
    //#region Private fields
    #isDefault;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            !props.hasOwnProperty('canFocused') && (props.canFocused = !0);
            props.autoCapture = !0;
            super(owner, props);
            this.#isDefault = props.hasOwnProperty('isDefault') && core.tools.isBool(props.isDefault)
                    ? props.isDefault : !1;
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region isDefault
    get isDefault() {
        return this.#isDefault;
    }
    set isDefault(newValue) {
        core.tools.isBool(newValue) && this.#isDefault !== newValue && (this.#isDefault = newValue);
    }
    //#endregion isDefault
    //#endregion Getters / Setters
    //#region Methods
    //#region assign
    assign(source) {
        if (source instanceof core.classes.Button) {
            this.#isDefault = source.isDefault;
            this.borderRadius = source.borderRadius;
        }
    }
    //#endregion assign
    //#region destroy
    destroy() {
        this.#isDefault = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(CustomButton.prototype, {
    'isDefault': {
        enumerable: !0
    }
});
//#endregion Button
//#region TextButton
//const TextButton = (function () {
//    //#region Class TextButton
//    class TextButton extends Button {
//        //#region Constructor
//        constructor(owner, props) {
//            props = !props ? {} : props;
//            if (owner) {
//                super(owner, props);
//            }
//        }
//        //#endregion Constructor
//    }
//    return TextButton;
//    //#endregion Class TextButton
//})();
//#endregion
core.classes.register(core.types.CATEGORIES.COMMON, Button);
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomButton/*, TextButton*/);
//#region Template
if (core.isHTMLRenderer) {
    const ButtonTpl = ['<jagui-button id="{internalId}" data-class="Button" class="Control Button {theme} csr_default">',
        '<properties>{ "name": "{name}", "caption": "{caption}" }</properties></jagui-button>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Button, template: ButtonTpl }]);
}
//#endregion Template
export { CustomButton, /*TextButton, */Button };