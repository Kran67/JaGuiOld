//#region Import
import { CaptionControl } from "/scripts/core/captioncontrol.js";
import { Window } from "/scripts/components/containers/window.js";
import { Keyboard } from "/scripts/core/keyboard.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import

//#region CustomButton
const CustomButton = (() => {
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
    //#region Class CustomButton
    class CustomButton extends CaptionControl {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const modalResult = Window.MODALRESULTBUTTONS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                if (!Core.isHTMLRenderer) {
                    if (!props.hasOwnProperty("width") && Tools.isNumber(props.width)) {
                        props.width = 75;
                    }
                    if (!props.hasOwnProperty("height") && Tools.isNumber(props.height)) {
                        props.height = 25;
                    }
                }
                super(owner, props);
                this.addBindableProperties(["staysPressed", "repeatClick"]);
                const priv = internal(this);
                priv.pressing = false;
                priv.repeatTimer = null;
                priv.staysPressed = props.hasOwnProperty("staysPressed")?props.staysPressed:false;
                priv.repeatClick = props.hasOwnProperty("repeatClick")?props.repeatClick:false;
                priv.action = null;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "modalResult",
                    enum: modalResult,
                    variable: priv,
                    value: props.hasOwnProperty("modalResult")?props.modalResult:modalResult.NONE
                });
                this.hitTest.all = true;
                this.autoCapture = true;
                this.horizAlign = props.hasOwnProperty("horizAlign")?props.horizAlign:Types.TEXTALIGNS.CENTER;
                this.vertAlign = props.hasOwnProperty("vertAlign")?props.vertAlign:Types.VERTTEXTALIGNS.MIDDLE;
                this.autoSize = false;
                priv.borderRadius = props.hasOwnProperty("borderRadius") && Tools.isNumber(props.borderRadius) || Tools.isObject(props.borderRadius) ? props.borderRadius : null;
            }
        }
        //#endregion
        //#region getters / setters
        //#region pressing
        set pressing(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            let pressing = priv.pressing;
            const htmlElement = this.HTMLElement;
            const textObj = this.textObj;
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (pressing !== newValue) {
                    pressing = priv.pressing = newValue;
                    this.isPressed = pressing;
                    if (Core.isHTMLRenderer) {
                        htmlElement.classList.remove("pressed");
                        textObj.classList.remove("paddingDownText");
                        if (pressing) {
                            htmlElement.classList.add("pressed");
                            textObj.classList.add("paddingDownText");
                        }
                    }
                }
            }
        }
        //#endregion pressing
        //#region action
        set action(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            let action = priv.action;
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Action) {
                if (action !== newValue) {
                    if (action instanceof Core.classes.Action) {
                        action.unRegisterChanges(this);
                    }
                    action = priv.action = newValue;
                    action.registerChanges(this);
                    action.updateTarget(this);
                }
            }
        }
        //#endregion action
        //#region enabled
        get enabled() {
            return super.enabled;
        }
        set enabled(newValue) {
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (newValue !== this.enabled) {
                    this.resetTimer();
                    super.enabled = newValue;
                }
            }
        }
        //#endregion
        //#region borderRadius
        get borderRadius() {
            return internal(this).borderRadius;
        }
        set borderRadius(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.borderRadius !== newValue) {
                if (typeof newValue === Types.CONSTANTS.NUMBER || typeof newValue === Types.CONSTANTS.OBJECT) {
                    priv.borderRadius = newValue;
                    this.update();
                }
            }
        }
        //#endregion borderRadius
        //#endregion
        //#region Methods
        //#region update
        update() {
            if (!this.loading && !this.form.loading) {
                if (Core.isHTMLRenderer) {
                    super.update();
                }
            }
        }
        //#endregion update
        updateCssProperties() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            super.updateCssProperties();
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            htmlElementStyle.borderRadius = priv.borderRadius ? `${priv.borderRadius}${PX}` : null;
            htmlElement.classList.remove("stayspressed");
            if (priv.staysPressed) {
                htmlElement.classList.add("stayspressed");
            }
        }
        //#region click
        click() {
            //#region Variables déclaration
            const priv = internal(this);
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
                if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                    this._down();
                }
            }
        }
        //#endregion mouseDown
        //#region keyDown
        keyDown() {
            super.keyDown();
            if (Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                this._down();
            }
        }
        //#endregion keyDown
        //#region keyUp
        keyUp() {
            super.keyUp();
            if (Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                this._up();
            }
        }
        //#endregion keyUp
        //#region _down
        _down() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.staysPressed) {
                this.pressing = true;
            } else if (priv.repeatClick && priv.repeatTimer === null) {
                priv.repeatTimer = setInterval(this.onTimer.bind(this), 200);
            }
            if (Core.isHTMLRenderer) {
                if (this instanceof Core.classes.ButtonGlyph) {
                    this.textObj.classList.add("paddingDownText");
                    this.glyph.classList.add("marginDownText");
                } else {
                    this.HTMLElement.classList.add("buttonPaddingDownText");
                }
            }
        }
        //#endregion _down
        //#region mouseEnter
        mouseEnter() {
            super.mouseEnter();
            if (this.isPressed) {
                this._down();
            }
        }
        //#endregion mouseEnter
        //#region mouseLeave
        mouseLeave() {
            //#region Variables déclaration
            const priv = internal(this);
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
            const priv = internal(this);
            //#endregion Variables déclaration
            this.resetTimer();
            super.mouseUp();
            if (priv.staysPressed) {
                priv.isPressed = true;
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
            if (Core.isHTMLRenderer) {
                if (this instanceof Core.classes.ButtonGlyph) {
                    this.textObj.classList.remove("paddingDownText");
                    this.glyph.classList.remove("marginDownText");
                } else {
                    this.HTMLElement.classList.remove("buttonPaddingDownText");
                }
            } else {
                Core.canvas.needRedraw = true;
            }
        }
        //#endregion _up
        //#region resetTimer
        resetTimer() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            clearInterval(priv.repeatTimer);
            priv.repeatTimer = null;
        }
        //#endregion resetTimer
        //#region assign
        assign(source) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (source instanceof Core.classes.CustomButton) {
                priv.staysPressed = source.staysPressed;
                priv.isPressed = source.isPressed;
                priv.modalResult = source.modalResult;
                priv.repeatClick = source.repeatClick;
            }
        }
        //#endregion assign
        //#region onTimer
        onTimer() {
            if (this.enabled) {
                this.mouseDown();
            }
        }
        //#endregion onTimer
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const action = priv.action;
            //#endregion Variables déclaration
            super.destroy();
            priv.pressing = null;
            priv.repeatTimer = null;
            priv.modalResult = null;
            priv.staysPressed = null;
            priv.repeatClick = null;
            if (action) {
                action.removeTarget(this);
            }
            priv.action = null;
        }
        //#endregion destroy
        //#region loaded
        loaded() {
            super.loaded();
            if (Core.isHTMLRenderer) {
                if (this.form.loaded && this.loaded) {
                    this.update();
                }
            }
        }
        //#endregion
        //#endregion
    }
    return CustomButton;
    //#endregion
})();
//#endregion
//#region Button
const Button = (() => {
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
    //#region Class Button
    class Button extends CustomButton {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                this.addBindableProperties(["isDefault"]);
                this.canFocused = true;
                this.autoCapture = true;
                priv.isDefault = props.hasOwnProperty("isDefault") && Tools.isBool(props.isDefault) ? props.isDefault : false;
            }
        }
        //#endregion
        //#region getter / setter
        //#region isDefault
        get isDefault() {
            return internal(this).isDefault;
        }
        set isDefault(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.isDefault !== newValue) {
                    priv.isDefault = newValue;
                }
            }
        }
        //#endregion isDefault
        //#region Caption
        //get caption() {
        //    return super.caption;
        //}
        //set caption(newValue) {
        //    //#region Variables déclaration
        //    //#endregion Variables déclaration
        //    if (typeof newValue === Types.CONSTANTS.STRING) {
        //        if (this.caption !== newValue) {
        //            newValue = Text.replace(newValue, Types.CONSTANTS.HOTKEYPREFIX, String.EMPTY);
        //            if (Core.isHTMLRenderer) {
        //                this.HTMLElement.innerHTML = newValue;
        //            }
        //        }
        //    }
        //}
        //#endregion
        //#endregion
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                if (Core.isHTMLRenderer) {
                    super.update();
                }
            }
        }
        //#endregion update
        //#region assign
        assign(source) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (source instanceof Core.classes.Button) {
                priv.isDefault = source.isDefault;
                priv.borderRadius = source.borderRadius;
            }
        }
        //#endregion assign
        //#endregion
    }
    return Button;
    //#endregion
})();
//#endregion
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
Core.classes.register(Types.CATEGORIES.COMMON, Button);
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomButton/*, TextButton*/);
export { CustomButton, /*TextButton, */Button };