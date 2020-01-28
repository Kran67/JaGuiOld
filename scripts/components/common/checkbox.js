//#region Imports
import { CaptionControl } from "/scripts/core/captioncontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Keyboard } from "/scripts/core/keyboard.js";
//#endregion Imports
//#region CHECKBOXSTATES
/**
 * @type    {Object}        CHECKBOXSTATES
 */
const CHECKBOXSTATES = Object.freeze({
    UNCHECKED: "unchecked",
    GRAYED: "grayed",
    CHECKED: "checked"
});
//#endregion
//#region Checkbox
const Checkbox = (() => {
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
    //#region Class Checkbox
    class Checkbox extends CaptionControl {
        //#region CHECKBOXSTATES
        /**
         * @type    {Object}        CHECKBOXSTATES
         */
        static get CHECKBOXSTATES() {
            return CHECKBOXSTATES;
        }
        //#endregion
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.input = null;
                priv.check = null;
                this.autoCapture = true;
                priv.isChecked = props.hasOwnProperty("isChecked") ? props.isChecked : false;
                priv.autoWidth = props.hasOwnProperty("autoWidth") ? props.autoWidth : true;
                this.onChange = new Core.classes.NotifyEvent(this);
                if (!Core.isHTMLRenderer) {
                    this.width = 120;
                    this.height = 19;
                }
                this.canFocused = true;
                this.hitTest.mouseDown = true;
                this.hitTest.mouseUp = true;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "state",
                    enum: CHECKBOXSTATES,
                    variable: priv,
                    value: props.hasOwnProperty("state") ? props.state : CHECKBOXSTATES.UNCHECKED
                });
                priv.allowGrayed = props.hasOwnProperty("allowGrayed") ? props.allowGrayed : false;
                priv.action = null;
                this.autoSize = false;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region check
        get check() {
            return internal(this).check;
        }
        //#endregion check
        //#region isChecked
        get isChecked() {
            return internal(this).isChecked;
        }
        set isChecked(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.allowGrayed) {
                    switch (priv.state) {
                        case CHECKBOXSTATES.UNCHECKED:
                            priv.state = CHECKBOXSTATES.GRAYED;
                            newValue = false;
                            break;
                        case CHECKBOXSTATES.GRAYED:
                            priv.state = CHECKBOXSTATES.CHECKED;
                            newValue = true;
                            break;
                        case CHECKBOXSTATES.CHECKED:
                            priv.state = CHECKBOXSTATES.UNCHECKED;
                            newValue = false;
                            break;
                    }
                }
                else if (newValue) {
                    priv.state = CHECKBOXSTATES.CHECKED;
                }
                else {
                    priv.state = CHECKBOXSTATES.UNCHECKED;
                }
                if (priv.isChecked !== newValue) {
                    priv.isChecked = newValue;
                    if (!this.loading && !this.form.loading) {
                        if (!Core.isHTMLRenderer) {
                            if (this.allowUpdate) {
                                this.update();
                            }
                            this.redraw();
                        } else {
                            this.update();
                        }
                        if (!this.updating) {
                            this.onChange.invoke();
                        }
                    }
                }
            }
        }
        //#endregion isChecked
        //#region allowGrayed
        get allowGrayed() {
            return internal(this).allowGrayed;
        }
        set allowGrayed(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.allowGrayed !== newValue) {
                    priv.allowGrayed = newValue;
                }
            }
        }
        //#endregion allowGrayed
        //#region action
        get action() {
            return internal(this).action;
        }
        set action(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Action) {
                if (priv.action !== newValue) {
                    if (priv.action instanceof Action) {
                        priv.action.unRegisterChanges(this);
                    }
                    priv.action = newValue;
                    priv.action.registerChanges(this);
                    priv.action.updateTarget(this);
                }
            }
        }
        //#endregion action
        //#region autoWidth
        get autoWidth() {
            return internal(this).autoWidth;
        }
        set autoWidth(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoWidth !== newValue) {
                    priv.autoWidth = newValue;
                    this.update();
                }
            }
        }
        //#endregion autoWidth
        //#endregion Getter / Setter
        //#region Methods
        //#region mouseDown
        mouseDown() {
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                this.pressing = true;
                this.isPressed = true;
            }
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseUp();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.pressing) {
                this.pressing = false;
                this.isPressed = false;
                this.isChecked = !priv.isChecked;
                this.update();
            }
        }
        //#endregion mouseUp
        //#region keyUp
        keyUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.keyUp();
            if (Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_RETURN || Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                this.isChecked = !priv.isChecked;
                this.update();
            }
        }
        //#endregion keyUp
        //#region realign
        realign() { }
        //#endregion realign
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                priv.check.classList.remove("checked", "grayed");
                if (priv.isChecked) {
                    priv.check.classList.add("checked");
                } else if (priv.allowGrayed && priv.state === CHECKBOXSTATES.GRAYED) {
                    priv.check.classList.add("grayed");
                }
                if (priv.state) {
                    if (priv.state !== CHECKBOXSTATES.UNCHECKED) {
                        priv.input.setAttribute("checked", "checked");
                    } else {
                        priv.input.removeAttribute("checked");
                    }
                } else if (priv.isChecked) {
                    priv.input.setAttribute("checked", "checked");
                } else {
                    priv.input.removeAttribute("checked");
                }
                if (priv.autoWidth) {
                    this.HTMLElementStyle.width = "auto";
                }
            }
        }
        //#endregion update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.isChecked = null;
            priv.autoWidth = null;
            this.onChange.destroy();
            this.onChange = null;
            priv.state = null;
            priv.allowGrayed = null;
            if (priv.action) {
                priv.action.removeTarget(this);
            }
            priv.action = null;
            priv.check = null;
            priv.input = null;
            super.destroy();
        }
        //#endregion destroy
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (!priv.input) {
                priv.input = htmlElement.querySelector("input");
                priv.input.jsObj = this;
                priv.input.name = this.name;
                priv.input.id = this.name;
            }
            if (!priv.check) {
                priv.check = htmlElement.lastElementChild;
                priv.check.jsObj = this;
            }
        }
        //#endregion getHTMLElement
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#region loaded
        //#endregion Checkbox
    }
    return Checkbox;
    //#endregion Checkbox
})();
//#endregion Checkbox
Core.classes.register(Types.CATEGORIES.COMMON, Checkbox);
//#region Templates
if (Core.isHTMLRenderer) {
    const CheckboxTpl = ["<jagui-checkbox id=\"{internalId}\" data-class=\"Checkbox\" class=\"Control Checkbox {theme}\">",
        "<properties>{ \"name\": \"{name}\", \"height\": 15 }</properties><input type=\"checkbox\" class=\"Control CheckboxInput\" />",
        "<div class=\"Control {theme} CheckboxCheck\"></div>{caption}</jagui-checkbox>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Checkbox, template: CheckboxTpl }]);
}
//endregion
export { Checkbox };
