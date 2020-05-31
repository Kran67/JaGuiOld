//#region Import
import { CaptionControl } from '/scripts/core/captioncontrol.js';
import { Window } from '/scripts/components/containers/window.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class CustomButton
class CustomButton extends CaptionControl {
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
            core.private(this, {
                pressing: !1,
                repeatTimer: null,
                staysPressed: props.hasOwnProperty('staysPressed') ? props.staysPressed : !1,
                repeatClick: props.hasOwnProperty('repeatClick') ? props.repeatClick : !1,
                action: null,
                borderRadius: props.hasOwnProperty('borderRadius') && core.tools.isNumber(props.borderRadius)
                    || core.tools.isObject(props.borderRadius) ? props.borderRadius : null
            });
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
        const priv = core.private(this);
        let pressing = priv.pressing;
        const htmlElement = this.HTMLElement;
        const textObj = this.textObj;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && pressing !== newValue) {
            pressing = priv.pressing = newValue;
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
    set action(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Action && priv.action !== newValue) {
            priv.action instanceof core.classes.Action && priv.action.unRegisterChanges(this);
            priv.action = newValue;
            priv.action.registerChanges(this);
            priv.action.updateTarget(this);
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
        return core.private(this).borderRadius;
    }
    set borderRadius(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (priv.borderRadius !== newValue && core.tools.isNumber(newValue) || core.tools.isObject(newValue)) {
            priv.borderRadius = newValue;
            this.update();
        }
    }
    //#endregion borderRadius
    //#region repeatClick
    get repeatClick() {
        return core.private(this).repeatClick;
    }
    set repeatClick(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.repeatClick !== newValue && (priv.repeatClick = newValue);
    }
    //#endregion repeatClick
    //#region staysPressed
    get staysPressed() {
        return core.private(this).staysPressed;
    }
    set staysPressed(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.staysPressed !== newValue) {
            priv.staysPressed = newValue;
            this.update();
        }
    }
    //#endregion repeatClick
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const PX = core.types.CSSUNITS.PX;
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        super.update();
        if (htmlElement) {
            htmlElementStyle.borderRadius = priv.borderRadius ? `${priv.borderRadius}${PX}` : null;
            htmlElement.classList.remove('stayspressed');
            priv.staysPressed && htmlElement.classList.add('stayspressed');
        }
    }
    //#endregion update
    //#region click
    click() {
        //#region Variables déclaration
        const priv = core.private(this);
        const form = this.form;
        //#endregion Variables déclaration
        super.click();
        if (priv.modalResult !== Window.MODALRESULTS.NONE) {
            form.modalResult = priv.modalResult;
            form.close();
        }
    }
    //#endregion update
    //#region mouseDown
    mouseDown() {
        if (this.enabled) {
            super.mouseDown();
            core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this._down();
        }
    }
    //#endregion mouseDown
    //#region keyDown
    keyDown() {
        super.keyDown();
        core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE && this._down();
    }
    //#endregion keyDown
    //#region keyUp
    keyUp() {
        super.keyUp();
        core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE && this._up();
    }
    //#endregion keyUp
    //#region _down
    _down() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (priv.staysPressed) {
            this.pressing = !0;
        } else if (priv.repeatClick && priv.repeatTimer === null) {
            priv.repeatTimer = setInterval(this.onTimer.bind(this), 200);
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.resetTimer();
        if (!priv.staysPressed) {
            super.mouseLeave();
            this._up();
        }
    }
    //#endregion mouseLeave
    //#region mouseUp
    mouseUp() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.resetTimer();
        super.mouseUp();
        if (priv.staysPressed) {
            priv.isPressed = !0;
            return;
        }
        this._up();
    }
    //#endregion mouseUp
    //#region _up
    _up() {
        //#region Variables déclaration
        //#endregion Variables déclaration
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        clearInterval(priv.repeatTimer);
        priv.repeatTimer = null;
    }
    //#endregion resetTimer
    //#region assign
    assign(source) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (source instanceof core.classes.CustomButton) {
            priv.staysPressed = source.staysPressed;
            priv.isPressed = source.isPressed;
            priv.modalResult = source.modalResult;
            priv.repeatClick = source.repeatClick;
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.action && priv.action.removeTarget(this);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion CustomButton
//#region Class Button
class Button extends CustomButton {
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        if (owner) {
            !props.hasOwnProperty('canFocused') && (props.canFocused = !0);
            props.autoCapture = !0;
            super(owner, props);
            core.private(this, {
                isDefault: props.hasOwnProperty('isDefault') && core.tools.isBool(props.isDefault)
                    ? props.isDefault : !1
            });
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region isDefault
    get isDefault() {
        return core.private(this).isDefault;
    }
    set isDefault(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.isDefault !== newValue && (priv.isDefault = newValue);
    }
    //#endregion isDefault
    //#endregion Getters / Setters
    //#region Methods
    //#region assign
    assign(source) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (source instanceof core.classes.Button) {
            priv.isDefault = source.isDefault;
            priv.borderRadius = source.borderRadius;
        }
    }
    //#endregion assign
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.isDefault = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
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